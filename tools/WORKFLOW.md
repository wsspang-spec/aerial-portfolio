# Spang Aerials: editing workflow

Handoff notes so any new Claude session can pick up the work. Read this first.

## The project
- Site "Rivers and Roads" (brand: Spang Aerials). Repo wsspang-spec/aerial-portfolio, GitHub Pages: https://wsspang-spec.github.io/aerial-portfolio/
- Concept: one trip, one friend from each chapter of life. Scotland with Louie (Holy Cross), The West with Bailey (Dover-Sherborn), Porto with Rodrigo.
- Thesis: impermanence. Get out and do things.
- Will's taste: direct, honest feedback, no yes-man, no em dashes. He rejects edits bluntly; when he does, revert exactly to the previous version.

## Site structure
- `content.js` holds all copy and media paths (`window.SITE`). `site.js` renders it.
- Films are self-hosted MP4s in `media/`: `video` (720p, phones) and `video4k` (1080p or 1440p, picked when innerWidth*DPR > 1400). Autoplay muted, loop while on screen.
- `silent: true` hides the sound button (Porto). Add `?v=N` to video paths when replacing a file so browsers refetch.
- Web encodes: H.264 High, yuv420p, bt709 tags, `-movflags +faststart -an`. Porto: 1440p at 9M, 720p at 3.4M.

## Footage on Will's Mac
- `~/Library/Mobile Documents/com~apple~CloudDocs/Documents/Drone Clips/<Trip>/Drone/`
  - `4K 100Mbps Originals` (straight off the card, the good stuff)
  - `1080p QuickShots (only copy)`, `App Trims (only copy)`, `_Deletable`
- iCloud: cloud-only files cannot be read by device_bash. Use device_stage_files with acknowledge_cloud_downloads, one call at a time (parallel calls hang iCloud). Limit 400MB per file.
- The Claude bridge cannot see SD cards under /Volumes, even with Full Disk Access. Will copies DCIM/100MEDIA from the card into the trip folder in Finder.
- Prefer 4K originals over Photos exports (exports are ~25Mbps).

## Grading and editing pipeline (this folder)
- `porto_grade.py`: `porto(bgr, dehaze, warm, orange_boost, sat, curve)`. Warm WB, S-curve, terracotta (hue ~18) saturation boost, warm highlights.
  - Day: `dehaze=0.06 warm=1.0 orange_boost=1.38 sat=1.05 curve=0.05`
  - Evening: `dehaze=0.04 warm=0.6 orange_boost=1.2 sat=1.04 curve=0.05`
  - Hazy distant shots: raise dehaze to ~0.12 and sat 1.10, then lift shadows slightly.
- `porto_video.py SRC START DUR OUT key=val...` renders a graded 2560x1440 segment (crf 10). Optional `CROP=crop=w:h:x:y` env var for reframing.
- `statue_video.py`: same, plus `statue_fx.detail()` (masked shadow lift, CLAHE, sharpening, chroma) for dark backlit subjects.
- `dehaze_q.py`: removes green veil from DJI QuickShots.
- `assemble.py`: xfade chain, 3.2s segments, 0.5s crossfades, seamless loop. Edit the `order=[...]` list; a third tuple value overrides the duration.
- `prof.py`: per-second motion speed/jerk, to pick smooth windows. `stats.py`: brightness/sat/color per clip, to match grades.
- Run renders one at a time. Parallel 4K jobs get OOM-killed.
- Always send a 1080p preview (under 32MB) before posting. Only post to the site when Will says so.

## Current state (Oct 4, 2026)
- Porto v8 is live: q01 (Will and Rodrigo) > q02c > bridge hero (NEW CLIP #2) > cable cars > boat (120428 at 1.6s) > park lake > monastery dome > rooftops > statue (113716 trim at 3.9s, detail-enhanced) > train on bridge > Arrabida > Ribeira. 32.4s, silent.
- Rejected ideas: the tree-rise reveal, a long statue hold, the boat cropped to hide the ruin, a Scotland rebuild, SA monogram favicons.
- Open ideas: 9:16 Instagram cut of Porto, cutting films to music, favicon (river-and-road mark favored).
