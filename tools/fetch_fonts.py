"""Google Fonts からフォントを取得して fonts/ に同梱するスクリプト（最初の1回だけ実行すればよい）
- Noto Sans JP（太さ 400〜900 の可変フォント）と Dela Gothic One
- どちらも SIL Open Font License 1.1（同梱・再配布OK）
- 文字の範囲ごとに分割されたファイル（unicode-range）なので、端末は必要な文字のファイルだけを読む
使い方: python tools/fetch_fonts.py
"""
import os, re, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'fonts')
CSS_URL = 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Noto+Sans+JP:wght@400..900&display=swap'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()

def main():
    os.makedirs(OUT, exist_ok=True)
    css = get(CSS_URL).decode('utf-8')
    blocks = re.findall(r'(/\*[^*]*\*/\s*)?(@font-face\s*\{[^}]*\})', css)
    out_css, total, n = [], 0, 0
    for _, block in blocks:
        fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
        url = re.search(r'url\((https://[^)]+)\)', block).group(1)
        if not url.startswith('https://fonts.gstatic.com/'):
            raise SystemExit('想定外の配信元: ' + url)
        slug = 'dela' if 'Dela' in fam else 'noto'
        name = f'{slug}-{n:03d}.woff2'
        data = get(url)
        if data[:4] != b'wOF2':
            raise SystemExit('woff2 ではないファイル: ' + url)
        with open(os.path.join(OUT, name), 'wb') as f:
            f.write(data)
        total += len(data); n += 1
        out_css.append(block.replace(url, name))
    header = ('/* 同梱フォント（tools/fetch_fonts.py で取得）\n'
              '   Noto Sans JP / Dela Gothic One — SIL Open Font License 1.1 （fonts/OFL.txt） */\n')
    with open(os.path.join(OUT, 'fonts.css'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(header + '\n'.join(out_css) + '\n')
    print(f'{n} ファイル / 合計 {total/1024/1024:.1f} MB を fonts/ に保存しました')

if __name__ == '__main__':
    main()
