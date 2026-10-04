import cv2, numpy as np
from PIL import Image

def porto(bgr, dehaze=0.06, warm=1.0, orange_boost=1.45, sat=1.08, curve=0.05):
    im = bgr.astype(np.float32)/255
    # dehaze: per-channel black point from 0.5th percentile, scaled
    lo = np.percentile(im.reshape(-1,3), 0.5, axis=0)
    im = np.clip((im - lo*dehaze/0.06*0.9)/(1 - lo*dehaze/0.06*0.9), 0, 1)
    # warm white balance (BGR): lift R, trim B
    im[...,2] *= 1 + 0.06*warm
    im[...,1] *= 1 + 0.015*warm
    im[...,0] *= 1 - 0.07*warm
    im = np.clip(im, 0, 1)
    # S-curve
    im = im - curve*np.sin(2*np.pi*im)
    im = np.clip(im, 0, 1).astype(np.float32)
    # selective saturation: oranges/reds (terracotta roofs)
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)  # H 0..360, S 0..1
    H, S, V = cv2.split(hsv)
    d = np.minimum(np.abs(H - 18), 360 - np.abs(H - 18))      # center ~18deg
    w = np.clip(1 - d/22, 0, 1) ** 1.2                           # soft band ~0-40deg
    w *= np.clip((S - 0.08)/0.15, 0, 1)                          # skip greys
    S = S * (sat + (orange_boost - 1) * w)
    V = V * (1 + 0.04*w)                                         # tiny lift so they glow
    hsv = cv2.merge([H, np.clip(S, 0, 1), np.clip(V, 0, 1)])
    im = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
    # warm highlights / slightly teal shadows via LAB
    lab = cv2.cvtColor(np.clip(im,0,1).astype(np.float32), cv2.COLOR_BGR2LAB)
    L, A, B = cv2.split(lab)
    t = L/100
    B = B + 4*warm*t - 2*(1-t)
    A = A + 1.5*warm*t
    im = cv2.cvtColor(cv2.merge([L, A, B]), cv2.COLOR_LAB2BGR)
    return (np.clip(im, 0, 1)*255).astype(np.uint8)

def export(bgr, name, size):
    rgb = Image.fromarray(bgr[..., ::-1])
    rgb.save(name + '-full.jpg', quality=95)
    rgb.resize(size, Image.LANCZOS).save(f'/home/claude/aerial-portfolio/images/{name}.jpg', quality=82, optimize=True, progressive=True)
    return rgb

def compare(src, out, fn):
    o = Image.fromarray(src[..., ::-1]); w = 960; h = int(o.height*w/o.width)
    c = Image.new('RGB', (w*2, h)); c.paste(o.resize((w, h)), (0, 0)); c.paste(out.resize((w, h)), (w, 0)); c.save(fn, quality=88)

a = cv2.imread('a/f_003.png')
ra = export(porto(a, dehaze=0.06, warm=1.0, orange_boost=1.5, sat=1.06, curve=0.05), 'porto-bridge', (2400, 1350))
compare(a, ra, 'ba_a.jpg')
Image.fromarray(np.asarray(ra)).crop((0, 300, 1600, 1200)).save('ra_detail.jpg', quality=90)

b = cv2.imread('b/f_025.png')
rb = export(porto(b, dehaze=0.03, warm=0.8, orange_boost=1.35, sat=1.05, curve=0.04), 'porto-river', (2400, 1350))
compare(b, rb, 'ba_b.jpg')
