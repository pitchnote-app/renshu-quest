"""アプリアイコン（PNG）を作るスクリプト。外部ライブラリ不要。
使い方: python tools/make_icons.py   → icons/ に出力
"""
import math, os, struct, zlib

def png(path, w, h, px):
    raw = b''.join(b'\x00' + bytes(px[y*w*4:(y+1)*w*4]) for y in range(h))
    def chunk(t, d):
        c = struct.pack('>I', len(d)) + t + d
        return c + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    with open(path, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
                + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))

def mix(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(len(a)))

def hexc(h):
    return tuple(int(h[i:i+2], 16) for i in (1, 3, 5))

NAVY_C, NAVY_E = hexc('#1a3f86'), hexc('#05070d')
G1, G2 = hexc('#f6e3a1'), hexc('#b8901f')
PENT = [(0.5 + 0.105*math.cos(-math.pi/2 + k*2*math.pi/5), 0.5 + 0.105*math.sin(-math.pi/2 + k*2*math.pi/5)) for k in range(5)]
SPOKES = [((x, y), (0.5 + (x-0.5)/0.105*0.30, 0.5 + (y-0.5)/0.105*0.30)) for x, y in PENT]

def in_poly(x, y, poly):
    inside = False
    j = len(poly) - 1
    for i in range(len(poly)):
        xi, yi = poly[i]; xj, yj = poly[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside

def seg_d(px, py, a, b):
    (ax, ay), (bx, by) = a, b
    dx, dy = bx-ax, by-ay
    t = max(0, min(1, ((px-ax)*dx + (py-ay)*dy) / (dx*dx + dy*dy)))
    return math.hypot(px - ax - t*dx, py - ay - t*dy)

def color(x, y, scale):
    """x,y は 0..1。scale<1 で 中身を小さく（maskable 用の余白）"""
    r = math.hypot(x-0.5, y-0.5)
    c = mix(NAVY_C, NAVY_E, min(1, r/0.72))
    # 中身を縮小
    x = 0.5 + (x-0.5)/scale; y = 0.5 + (y-0.5)/scale; r = math.hypot(x-0.5, y-0.5)
    if 0.355 <= r <= 0.405:                          # 金のリング
        c = mix(G1, G2, y)
    if r < 0.30:                                     # ボール
        shade = max(0, (x-0.5)*0.9 + (y-0.5)*0.9)
        c = mix((250, 250, 252), (170, 178, 196), min(1, shade*2.2))
        if in_poly(x, y, PENT) or any(seg_d(x, y, a, b) < 0.012 for a, b in SPOKES):
            c = (18, 20, 28)
        if r > 0.29:
            c = (20, 22, 30)
    return c

def render(size, scale=1.0, ss=2):
    px = bytearray(size*size*4)
    for j in range(size):
        for i in range(size):
            acc = [0, 0, 0]
            for sy in range(ss):
                for sx in range(ss):
                    cc = color((i + (sx+.5)/ss)/size, (j + (sy+.5)/ss)/size, scale)
                    for k in range(3): acc[k] += cc[k]
            o = (j*size + i)*4
            px[o:o+4] = bytes([round(acc[0]/ss/ss), round(acc[1]/ss/ss), round(acc[2]/ss/ss), 255])
    return px

if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), '..', 'icons')
    os.makedirs(out, exist_ok=True)
    for name, size, scale in [('icon-192.png', 192, 1.0), ('icon-512.png', 512, 1.0),
                              ('icon-maskable-512.png', 512, 0.8), ('apple-touch-icon.png', 180, 0.9)]:
        png(os.path.join(out, name), size, size, render(size, scale))
        print('wrote', name)
