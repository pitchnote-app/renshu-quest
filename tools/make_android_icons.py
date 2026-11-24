"""Android 用のアイコン（ランチャーアイコン・アダプティブアイコン）とスプラッシュを作る。
使い方: python tools/make_android_icons.py   （android/ フォルダができてから実行）
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_icons import png, render, color, NAVY_E

RES = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'android', 'app', 'src', 'main', 'res')
DENS = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}

def round_mask(px, size):
    """丸アイコン用：円の外を透明にする"""
    c = size / 2
    for j in range(size):
        for i in range(size):
            if (i + .5 - c) ** 2 + (j + .5 - c) ** 2 > c * c:
                px[(j*size + i)*4 + 3] = 0
    return px

def splash(size_w, size_h):
    """スプラッシュ：紺の背景の中央にアイコン"""
    px = bytearray(bytes([NAVY_E[0], NAVY_E[1], NAVY_E[2], 255]) * (size_w*size_h))
    icon = int(min(size_w, size_h) * 0.42)
    ip = render(icon, 1.0, ss=1)
    ox, oy = (size_w - icon) // 2, (size_h - icon) // 2
    for j in range(icon):
        o = ((oy + j)*size_w + ox)*4
        px[o:o + icon*4] = ip[j*icon*4:(j+1)*icon*4]
    return px

def main():
    for d, k in DENS.items():
        folder = os.path.join(RES, f'mipmap-{d}')
        s = int(48 * k)
        png(os.path.join(folder, 'ic_launcher.png'), s, s, render(s, 1.0))
        png(os.path.join(folder, 'ic_launcher_round.png'), s, s, round_mask(render(s, 1.0), s))
        f = int(108 * k)          # アダプティブアイコンの前景（中央66%が見える範囲）
        png(os.path.join(folder, 'ic_launcher_foreground.png'), f, f, render(f, 0.62))
        print('icons', d)
    # スプラッシュ（縦向き・横向きの各密度）
    for orient in ('port', 'land'):
        for d, k in DENS.items():
            w, h = (int(320*k), int(480*k)) if orient == 'port' else (int(480*k), int(320*k))
            folder = os.path.join(RES, f'drawable-{orient}-{d}')
            if os.path.isdir(folder):
                png(os.path.join(folder, 'splash.png'), w, h, splash(w, h))
    png(os.path.join(RES, 'drawable', 'splash.png'), 480, 720, splash(480, 720))
    print('splash done')

if __name__ == '__main__':
    main()
