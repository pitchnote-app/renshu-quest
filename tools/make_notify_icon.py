"""Android の通知用アイコン（白一色のボール）を作る。python tools/make_notify_icon.py"""
import math, os
from PIL import Image, ImageDraw
RES = os.path.join(os.path.dirname(__file__), '..', 'android', 'app', 'src', 'main', 'res')
for d, px in [('mdpi', 24), ('hdpi', 36), ('xhdpi', 48), ('xxhdpi', 72), ('xxxhdpi', 96)]:
    S = px * 8
    im = Image.new('L', (S, S), 0); g = ImageDraw.Draw(im)
    c, r = S / 2, S * 0.44
    g.ellipse((c - r, c - r, c + r, c + r), fill=255)
    pent = lambda cx, cy, rr, rot: [(cx + rr * math.cos(rot + k * 2 * math.pi / 5), cy + rr * math.sin(rot + k * 2 * math.pi / 5)) for k in range(5)]
    g.polygon(pent(c, c, r * 0.36, -math.pi / 2), fill=0)
    for k in range(5):
        a = -math.pi / 2 + k * 2 * math.pi / 5
        g.polygon(pent(c + r * 0.98 * math.cos(a + math.pi / 5), c + r * 0.98 * math.sin(a + math.pi / 5), r * 0.3, a + math.pi / 5 + math.pi), fill=0)
    g.ellipse((c - r, c - r, c + r, c + r), outline=0, width=0)
    mask = Image.new('L', (S, S), 0); ImageDraw.Draw(mask).ellipse((c - r, c - r, c + r, c + r), fill=255)
    a = Image.composite(im, Image.new('L', (S, S), 0), mask).resize((px, px), Image.LANCZOS)
    out = Image.new('RGBA', (px, px), (255, 255, 255, 0)); out.putalpha(a)
    os.makedirs(os.path.join(RES, f'drawable-{d}'), exist_ok=True)
    out.save(os.path.join(RES, f'drawable-{d}', 'ic_stat_rq.png'))
    print(d, px)
