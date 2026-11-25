"""公開用のファイルを dist/ にまとめるスクリプト。
- アプリに必要なファイルだけをコピー（docs や tools は入れない）
- sw.js のキャッシュ名に中身のハッシュを入れて、更新が確実に届くようにする
使い方: python tools/build.py
→ dist/ フォルダを、そのまま公開サービス（GitHub Pages / Cloudflare Pages / Netlify など）にアップロード
→ 将来のアプリ化（Capacitor）でも、この dist/ を web フォルダとして使える
"""
import hashlib, os, re, shutil

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = os.path.join(ROOT, 'dist')
FILES = ['index.html', 'privacy.html', 'support.html', 'app.css', 'app.js', 'sw.js', 'manifest.webmanifest']
DIRS = ['icons', 'img', 'fonts']

def main():
    if os.path.isdir(DIST):
        shutil.rmtree(DIST)
    os.makedirs(DIST)
    h = hashlib.sha256()
    for f in FILES:
        with open(os.path.join(ROOT, f), 'rb') as fp:
            data = fp.read()
        h.update(data)
        with open(os.path.join(DIST, f), 'wb') as fp:
            fp.write(data)
    for d in DIRS:
        src = os.path.join(ROOT, d)
        if os.path.isdir(src) and os.listdir(src):
            shutil.copytree(src, os.path.join(DIST, d), ignore=shutil.ignore_patterns('sheets'))  # 元のシート画像は公開しない
    ver = re.search(r"APP_VERSION='([^']+)'", open(os.path.join(ROOT, 'app.js'), encoding='utf-8').read()).group(1)
    tag = f'rq-{ver}-{h.hexdigest()[:8]}'
    sw = os.path.join(DIST, 'sw.js')
    text = open(sw, encoding='utf-8').read()
    text = re.sub(r"const VERSION = '[^']*';", f"const VERSION = '{tag}';", text)
    open(sw, 'w', encoding='utf-8', newline='\n').write(text)
    open(os.path.join(DIST, '.nojekyll'), 'w').close()   # GitHub Pages 用
    n = sum(len(fs) for _, _, fs in os.walk(DIST))
    print(f'dist/ を作りました（{n} ファイル、キャッシュ名 {tag}）')

if __name__ == '__main__':
    main()
