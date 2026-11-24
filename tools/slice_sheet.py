"""AIで作った「格子状のシート画像」を1つずつの画像（WebP）に切り出す（Pillow が必要：pip install pillow）
- 背景（四すみとつながった単色部分）だけを透明にする → イラストの中の似た色は消さない
- 余白を切り落とし、正方形に整える
使い方:
  python tools/slice_sheet.py 入力画像 列数 行数 出力フォルダ 名前1,名前2,...  [--size 512] [--tol 40]
例:
  python tools/slice_sheet.py img/sheets/characters-idea.webp 5 2 img/chars idea-1,idea-2,...
"""
import argparse, os
from PIL import Image, ImageDraw, ImageFilter

def remove_bg(im, tol):
    im = im.convert('RGBA')
    w, h = im.size
    # 四すみ＋四辺の中点から、背景を塗りつぶして透明にする（つながっている部分だけ）
    seeds = [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1), (w//2, 0), (w//2, h-1), (0, h//2), (w-1, h//2)]
    marker = (255, 0, 255, 0)
    for s in seeds:
        r, g, b, a = im.getpixel(s)
        if a == 0:
            continue
        ImageDraw.floodfill(im, s, marker, thresh=tol)
    px = im.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == marker:
                px[x, y] = (0, 0, 0, 0)
    # ふちを少しなめらかに（アルファを1px ぼかして、元の不透明部分は保つ）
    alpha = im.getchannel('A')
    soft = alpha.filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(Image.eval(soft, lambda v: v))
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
    a = ap.parse_args()
    names = [n.strip() for n in a.names.split(',') if n.strip()]
    sheet = Image.open(a.src).convert('RGBA')
    W, H = sheet.size
    x0, y0 = W*a.pad, H*a.pad
    cw, ch = (W-2*x0)/a.cols, (H-2*y0)/a.rows
    os.makedirs(a.out, exist_ok=True)
    k = 0
    for j in range(a.rows):
        for i in range(a.cols):
            box = (round(x0+i*cw), round(y0+j*ch), round(x0+(i+1)*cw), round(y0+(j+1)*ch))
            cell = trim_square(drop_fragments(remove_bg(sheet.crop(box), a.tol), a.keep))
            if cell.width > a.size:
                cell = cell.resize((a.size, a.size), Image.LANCZOS)
            name = names[k] if k < len(names) else f'item-{k+1}'
            cell.save(os.path.join(a.out, name + '.webp'), 'WEBP', quality=86, method=6)  # 軽い WebP で保存
            print(f'{name}.webp  {cell.width}px')
            k += 1

if __name__ == '__main__':
    main()
