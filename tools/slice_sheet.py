"""AIで作った「格子状のシート画像」を1つずつの画像（WebP）に切り出す（Pillow が必要：pip install pillow）
- 背景（四すみとつながった単色部分）だけを透明にする → イラストの中の似た色は消さない
- 余白を切り落とし、正方形に整える
使い方:
  python tools/slice_sheet.py 入力画像 列数 行数 出力フォルダ 名前1,名前2,...  [--size 512] [--tol 40]
  （1人だけの画像は 列数1 行数1。--holes と --shadow は -h で説明）
例:
  python tools/slice_sheet.py img/sheets/characters-idea.webp 5 2 img/chars idea-1,idea-2,...
"""
import argparse, os
from PIL import Image, ImageDraw, ImageFilter

def remove_bg(im, tol, holes=(), shadow=0, band=3, auto=0, auto_area=300):
    im = im.convert('RGBA')
    w, h = im.size
    # 四すみ＋四辺の中点から、背景を塗りつぶして透明にする（つながっている部分だけ）
    seeds = [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1), (w//2, 0), (w//2, h-1), (0, h//2), (w-1, h//2)]
    marker = (255, 0, 255, 0)
    bgs = [im.getpixel(s) for s in seeds]   # 塗りつぶす前に 背景の色を記録
    for s in seeds:
        r, g, b, a = im.getpixel(s)
        if a == 0:
            continue
        ImageDraw.floodfill(im, s, marker, thresh=tol)
    # 外側とつながっていない背景（腕の内側のすき間など）は、場所を指定して消す
    for x, y in holes:
        c = im.getpixel((x, y))
        if c[3] and max(abs(c[k] - bgs[0][k]) for k in range(3)) > tol:
            raise SystemExit(f'--holes の {x},{y} は背景の色ではありません（{c[:3]}）')
        if c[3]:
            ImageDraw.floodfill(im, (x, y), marker, thresh=tol)
    if auto:
        auto_holes(im, bgs, marker, auto, auto_area)
    px = im.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == marker:
                px[x, y] = (0, 0, 0, 0)
    if shadow:
        drop_shadow(im, shadow)
    return defringe(im, bgs, band)

def auto_holes(im, bgs, marker, tol, min_area):
    """囲まれた背景を自動で探して消す（格子状のシート向け）。
    ① 背景の色とほぼ完全に同じ（±2）広い部分を「背景のかたまり」として見つける
    ② そこから ±tol までの色に広げて消す（白い服・くつ下などの かげのある色は残る）"""
    cols = [c[:3] for c in bgs if c[3] and c[:3] != marker[:3]]
    if not cols:
        return
    B = tuple(sorted(c[k] for c in cols)[len(cols)//2] for k in range(3))   # 中央値（四すみの1つが絵にかかっていても大丈夫）
    w, h = im.size; px = im.load()
    def comp(x, y, ok, seen):
        stack = [(x, y)]; seen[y*w+x] = 1; pts = []
        while stack:
            cx, cy = stack.pop(); pts.append((cx, cy))
            for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                if 0 <= nx < w and 0 <= ny < h and not seen[ny*w+nx] and ok(px[nx, ny]):
                    seen[ny*w+nx] = 1; stack.append((nx, ny))
        return pts
    exact = lambda c: c[3] and c != marker and all(abs(c[k]-B[k]) <= 2 for k in range(3))
    near = lambda c: c[3] and c != marker and all(abs(c[k]-B[k]) <= tol for k in range(3))
    seen = bytearray(w*h); cores = []
    for y in range(h):
        for x in range(w):
            if not seen[y*w+x] and exact(px[x, y]):
                pts = comp(x, y, exact, seen)
                if len(pts) >= min_area:
                    cores.append(pts[0])
    seen = bytearray(w*h)
    for x, y in cores:
        if not seen[y*w+x]:
            for q in comp(x, y, near, seen):
                px[q] = marker

def drop_shadow(im, top):
    """足元の影：高さ top（割合）より下で、透明部分とつながった灰色だけを消す（輪郭線で止まる）"""
    w, h = im.size
    px = im.load()
    y0 = int(h * top)
    stack = [(x, y) for y in range(y0, h) for x in range(w) if px[x, y][3] == 0]
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
            if 0 <= nx < w and y0 <= ny < h:
                r, g, b, a = px[nx, ny]
                if a and min(r, g, b) > 90 and max(r, g, b) - min(r, g, b) < 45:
                    px[nx, ny] = (0, 0, 0, 0)
                    stack.append((nx, ny))

def clear_rect(im, rect, everything):
    """四角の中の 白〜明るい灰色（消し残り）だけを消す。everything なら 中身を全部消す"""
    x0, y0, x1, y1 = rect
    px = im.load()
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b, a = px[x, y]
            if a and (everything or (min(r, g, b) >= 150 and max(r, g, b) - min(r, g, b) < 45)):
                px[x, y] = (0, 0, 0, 0)

def defringe(im, seed_colors, band=3, full=60):
    """ふちの色戻し：背景（灰色）と混ざった ふちの画素から背景の色を取りのぞき、
    本来の絵の色と なめらかな透明度に戻す（白っぽいフチ・ガビガビを消す）"""
    cols = [c[:3] for c in seed_colors if c[3] and c[:3] != (255, 0, 255)]
    if not cols:
        return im
    B = tuple(sum(c[k] for c in cols) / len(cols) for k in range(3))
    w, h = im.size
    px = im.load()
    # ① 輪郭線の外側にある「白っぽい無彩色のふち」（AIのシール風のフチ）を背景として消す。数回くり返して内側へ
    Bl = sum(B) / 3
    for _ in range(10):
        trans = im.getchannel('A').point(lambda v: 255 if v == 0 else 0)
        edge = trans.filter(ImageFilter.MaxFilter(3)).load()
        hit = 0
        for y in range(h):
            for x in range(w):
                r, g, b, a = px[x, y]
                if a and edge[x, y] and max(r, g, b) - min(r, g, b) < 28 and min(r, g, b) > Bl - 18:
                    px[x, y] = (0, 0, 0, 0); hit += 1
        if not hit:
            break
    # ② 残ったふちの画素から 背景の色を取りのぞく
    trans = im.getchannel('A').point(lambda v: 255 if v == 0 else 0)
    near = trans.filter(ImageFilter.MaxFilter(band*2 + 1)).load()   # 透明部分から band px 以内
    src = im.copy().load()
    def dist2(c):
        return (c[0]-B[0])**2 + (c[1]-B[1])**2 + (c[2]-B[2])**2
    for y in range(h):
        for x in range(w):
            r, g, b, a = src[x, y]
            if a == 0 or near[x, y] == 0:
                continue
            # すぐ内側の「背景から一番遠い色」（＝輪郭線などの本来の色）を探す
            F, fd = None, 0
            for yy in range(max(0, y-2), min(h, y+3)):
                for xx in range(max(0, x-2), min(w, x+3)):
                    c = src[xx, yy]
                    if c[3]:
                        d2 = dist2(c)
                        if d2 > fd:
                            fd, F = d2, c
            if F is None or fd < 400:
                continue
            # 背景と本来の色が どれだけ混ざっているか（アルファ）を計算して、本来の色＋透明度に置きかえる
            al = ((r-B[0])*(F[0]-B[0]) + (g-B[1])*(F[1]-B[1]) + (b-B[2])*(F[2]-B[2])) / fd
            al = max(0.0, min(1.0, al))
            if al < 0.12:
                px[x, y] = (0, 0, 0, 0)
            elif al < 0.97:
                px[x, y] = (F[0], F[1], F[2], round(al*255))
    return im

def drop_fragments(im, keep_ratio=0.03):
    """本体から離れた小さなかけら（隣のマスからはみ出した炎など）を消す"""
    a = im.getchannel('A'); w, h = im.size; ap = a.load()
    seen = bytearray(w*h); comps = []
    for y in range(h):
        for x in range(w):
            if ap[x, y] > 12 and not seen[y*w+x]:
                stack = [(x, y)]; seen[y*w+x] = 1; pts = []
                while stack:
                    cx, cy = stack.pop(); pts.append((cx, cy))
                    for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                        if 0 <= nx < w and 0 <= ny < h and not seen[ny*w+nx] and ap[nx, ny] > 12:
                            seen[ny*w+nx] = 1; stack.append((nx, ny))
                comps.append(pts)
    if not comps:
        return im
    big = max(len(c) for c in comps)
    px = im.load()
    for c in comps:
        edge = any(x == 0 or x == w-1 or y == 0 or y == h-1 for x, y in c)   # マスの端に接している＝隣からのはみ出し
        if len(c) < big * keep_ratio or (edge and len(c) < big * 0.15):
            for x, y in c:
                px[x, y] = (0, 0, 0, 0)
    return im

def trim_square(im, margin=0.04):
    bbox = im.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
    if not bbox:
        return im
    im = im.crop(bbox)
    w, h = im.size
    s = int(max(w, h) * (1 + margin*2))
    out = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    out.paste(im, ((s-w)//2, s-h - int(s*margin)) if h >= w else ((s-w)//2, (s-h)//2), im)
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('cols', type=int); ap.add_argument('rows', type=int)
    ap.add_argument('out'); ap.add_argument('names')
    ap.add_argument('--size', type=int, default=512); ap.add_argument('--tol', type=int, default=40)
    ap.add_argument('--pad', type=float, default=0.0, help='外側の余白（割合）')
    ap.add_argument('--keep', type=float, default=0.03, help='これより小さい かけら（本体比）を消す。記号を残したいときは小さく')
    ap.add_argument('--holes', default='', help='外側とつながっていない背景を消す。マス内の座標を "x,y;x,y" で。何人も並ぶシートは "マス番号:x,y"（例 2:243,161）')
    ap.add_argument('--shadow', type=float, default=0.0, help='足元の影を消す。この高さ（割合。例 0.92）より下の灰色が対象')
    ap.add_argument('--clear', default='', help='四角の中の白い消し残りを消す。"マス番号:x0,y0,x1,y1" を ; で。最後に ! を付けると中身を全部消す')
    ap.add_argument('--band', type=int, default=3, help='ふちの色戻しの幅（px）。大きな1人絵で輪郭線の内側が欠けるときは 1 に')
    ap.add_argument('--auto-holes', type=int, default=0, help='囲まれた背景を自動で消す（背景色からの許容差。例 4）。格子状のシート向け')
    ap.add_argument('--hole-area', type=int, default=300, help='--auto-holes で消す最小の広さ（画素数）')
    ap.add_argument('--raw', action='store_true', help='背景の絵（風景・部屋）用：透明にせず、そのまま切り分けるだけ')
    ap.add_argument('--xs', default='', help='列の区切り位置（px）を手で指定。エフェクトがとなりのマスにはみ出すとき。例 0,390,880,1215,1774')
    ap.add_argument('--ys', default='', help='行の区切り位置（px）を手で指定')
    a = ap.parse_args()
    clears = []  # (マスの番号, x0, y0, x1, y1, 全部消すか)
    for e in a.clear.split(';'):
        if e:
            no, _, v = e.rpartition(':')
            everything = v.endswith('!')
            clears.append((int(no) if no else 0, *(int(n) for n in v.rstrip('!').split(',')), everything))
    holes = []   # (マスの番号 1〜, x, y)。番号なしは 全部のマス
    for e in a.holes.split(';'):
        if e:
            no, _, xy = e.rpartition(':')
            holes.append((int(no) if no else 0, *(int(n) for n in xy.split(','))))
    names = [n.strip() for n in a.names.split(',') if n.strip()]
    sheet = Image.open(a.src).convert('RGBA')
    W, H = sheet.size
    x0, y0 = W*a.pad, H*a.pad
    cw, ch = (W-2*x0)/a.cols, (H-2*y0)/a.rows
    os.makedirs(a.out, exist_ok=True)
    k = 0
    xs = [int(v) for v in a.xs.split(',')] if a.xs else [round(x0+i*cw) for i in range(a.cols+1)]
    ys = [int(v) for v in a.ys.split(',')] if a.ys else [round(y0+j*ch) for j in range(a.rows+1)]
    for j in range(a.rows):
        for i in range(a.cols):
            box = (xs[i], ys[j], xs[i+1], ys[j+1])
            if a.raw:
                cell = sheet.crop(box).convert('RGB')
                if cell.width > a.size:
                    cell = cell.resize((a.size, round(cell.height * a.size / cell.width)), Image.LANCZOS)
            else:
                cut = remove_bg(sheet.crop(box), a.tol, [(x, y) for no, x, y in holes if no in (0, k+1)], a.shadow, a.band, a.auto_holes, a.hole_area)
                for no, *rect, everything in clears:
                    if no in (0, k+1):
                        clear_rect(cut, rect, everything)
                cell = trim_square(drop_fragments(cut, a.keep))
                if cell.width > a.size:
                    cell = cell.resize((a.size, a.size), Image.LANCZOS)
            name = names[k] if k < len(names) else f'item-{k+1}'
            cell.save(os.path.join(a.out, name + '.webp'), 'WEBP', quality=86, method=6)  # 軽い WebP で保存
            print(f'{name}.webp  {cell.width}px')
            k += 1

if __name__ == '__main__':
    main()
