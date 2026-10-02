(function () {
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var validId = function (id) { return /^[A-Za-z0-9_-]{6,20}$/.test(id || ""); };

  function embed(id, opts) {
    var p = "autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=" + (opts.controls ? 1 : 0) +
      "&playsinline=1&rel=0&modestbranding=1";
    return '<iframe src="https://www.youtube-nocookie.com/embed/' + id + "?" + p +
      '" title="' + esc(opts.title) + '" loading="' + (opts.lazy ? "lazy" : "eager") +
      '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }
  function placeholder(text) {
    return '<span class="ph">[ ' + esc(text) + " ]</span>";
  }

  // Name
  if (S.name) { $("brand-name").textContent = S.name; $("footer-name").textContent = S.name; }
  $("year").textContent = new Date().getFullYear();

  // Hero reel: sharper file on large screens, lighter file on phones / data saver
  var films = S.films || [];
  var hv = $("hero-video");
  if (hv) {
    var c = navigator.connection || {};
    var big = window.innerWidth * (window.devicePixelRatio || 1) > 1400 && !c.saveData;
    if (big) { hv.querySelector("source").src = "media/hero-1440.mp4"; hv.load(); }
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { hv.removeAttribute("autoplay"); hv.pause(); }
    var p = hv.play && hv.play(); if (p && p.catch) p.catch(function () {});
  }

  // Films: self-hosted (autoplay muted loop + sound toggle) when a video file is set, else YouTube embed
  var bigScreen = window.innerWidth * (window.devicePixelRatio || 1) > 1400 && !(navigator.connection || {}).saveData;
  $("film-list").innerHTML = films.map(function (f, i) {
    var num = String(i + 1).padStart(2, "0");
    var media, sound = "";
    if (f.video) {
      var src = bigScreen && f.video4k ? f.video4k : f.video;
      media = '<video class="film-video" muted loop playsinline preload="metadata"' +
        (f.poster ? ' poster="' + esc(f.poster) + '"' : "") + ' aria-label="' + esc(f.place) + ' film">' +
        '<source src="' + esc(src) + '" type="video/mp4"></video>';
      sound = '<button type="button" class="sound-btn" aria-pressed="false">Sound on</button>';
    } else if (validId(f.youtubeId)) {
      media = embed(f.youtubeId, { title: f.place + " aerial film", controls: true, lazy: true });
    } else {
      media = placeholder(f.place + " film");
    }
    return '<article class="film' + (i % 2 ? " flip" : "") + '">' +
      '<div class="frame">' + media + sound + "</div>" +
      '<div class="film-text">' +
      '<span class="num">' + num + "</span>" +
      "<h3>" + esc(f.place) + "</h3>" +
      '<p class="label">' + esc([f.country, f.when, f.runtime].filter(Boolean).join(" · ")) + "</p>" +
      '<p class="blurb">' + esc(f.blurb) + "</p>" +
      "</div></article>";
  }).join("");

  // Play films only while on screen; one with sound at a time
  var vids = [].slice.call(document.querySelectorAll(".film-video"));
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { v.preload = "auto"; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { io.observe(v); });
  }
  [].forEach.call(document.querySelectorAll(".sound-btn"), function (btn) {
    btn.addEventListener("click", function () {
      var v = btn.parentNode.querySelector("video"), turnOn = v.muted;
      vids.forEach(function (o) { o.muted = true; });
      [].forEach.call(document.querySelectorAll(".sound-btn"), function (b) { b.textContent = "Sound on"; b.setAttribute("aria-pressed", "false"); });
      if (turnOn) { v.muted = false; v.play(); btn.textContent = "Sound off"; btn.setAttribute("aria-pressed", "true"); }
    });
  });

  // Coming soon
  var c = S.comingSoon || {};
  $("coming-num").textContent = String(films.length + 1).padStart(2, "0") + " · Coming soon";
  if (c.place) $("coming-place").textContent = c.place;
  if (c.when) $("coming-when").textContent = c.when;

  // Stills (click to open full screen)
  var stills = (S.stills || []).filter(function (s) { return s.src; });
  $("stills-grid").innerHTML = stills.map(function (s, i) {
    return '<figure class="still ' + esc(s.shape || "wide") + '"><button type="button" class="still-btn" data-i="' + i +
      '" aria-label="View full screen: ' + esc(s.place) + '"><div class="frame"><img src="' + esc(s.src) +
      '" alt="Aerial photo, ' + esc(s.place) + '" loading="lazy"></div></button><figcaption>' +
      esc(s.place) + " · Summer 2026</figcaption></figure>";
  }).join("");

  var lb = document.createElement("div");
  lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
  lb.innerHTML = '<button type="button" class="lb-close" aria-label="Close">×</button>' +
    '<button type="button" class="lb-prev lb-nav" aria-label="Previous photo">‹</button>' +
    '<img alt=""><p class="lb-cap"></p>' +
    '<button type="button" class="lb-next lb-nav" aria-label="Next photo">›</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector("img"), lbCap = lb.querySelector(".lb-cap"), cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + stills.length) % stills.length;
    lbImg.src = stills[cur].src; lbImg.alt = "Aerial photo, " + stills[cur].place;
    lbCap.textContent = stills[cur].place + " · " + (cur + 1) + " / " + stills.length;
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add("open"); document.body.classList.add("lb-lock"); lb.querySelector(".lb-close").focus(); }
  function close() { lb.classList.remove("open"); document.body.classList.remove("lb-lock"); if (lastFocus) lastFocus.focus(); }
  $("stills-grid").addEventListener("click", function (e) {
    var b = e.target.closest(".still-btn"); if (b) open(+b.getAttribute("data-i"));
  });
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = function () { show(cur - 1); };
  lb.querySelector(".lb-next").onclick = function () { show(cur + 1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(cur - 1);
    else if (e.key === "ArrowRight") show(cur + 1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });

  // About + gear
  if (S.about) $("about-text").textContent = S.about;
  $("gear").innerHTML = (S.gear || []).map(function (g) {
    return "<div><dt>" + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd></div>";
  }).join("");

  // Contact
  var L = S.links || {};
  var btns = [];
  if (L.email) btns.push('<a class="btn btn-solid" href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a>");
  if (L.instagram) btns.push('<a class="btn" href="' + esc(L.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
  if (L.youtube) btns.push('<a class="btn" href="' + esc(L.youtube) + '" target="_blank" rel="noopener">YouTube</a>');
  if (!btns.length) btns.push('<span class="btn btn-solid">[EMAIL]</span><span class="btn">Instagram</span><span class="btn">YouTube</span>');
  $("contact-links").innerHTML = btns.join("");
  if (L.instagram) $("coming-link").href = L.instagram;
})();
