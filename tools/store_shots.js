/* ストア用の画像をまとめて作るスクリプト（Edge か Chrome を画面なしで動かして撮影する）
   使い方: node tools/store_shots.js
   → store/ に出力
     - iphone/   App Store 用（6.9インチ 1320×2868）
     - android/  Google Play 用（1080×2160）
     - icon-1024.png（App Store のアイコン）／feature-graphic.png（Google Play の横長バナー 1024×500）
   サンプルの選手データ（tools/store/demo.js）を入れた状態で撮るので、自分の記録は使わない */
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'store');
const BROWSERS = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };

// 撮る画面と、上にのせる説明文
const SHOTS = [
  { tab: 'home', file: '1-home', cap: '練習するほど<br><em>自分の選手が強くなる</em>' },
  { tab: 'status', file: '2-status', cap: '能力ランクと階級で<br><em>成長がひと目でわかる</em>' },
  { tab: 'practice', file: '3-practice', cap: '52種類の練習メニューを<br><em>イラストでわかりやすく</em>' },
  { tab: 'skill', file: '4-skill', cap: '練習を続けて<br><em>個人技スキルを習得</em>', js: "document.querySelector('.skhead').scrollIntoView()" },
  { tab: 'log', file: '5-log', cap: 'カレンダーで<br><em>続けた日がひと目でわかる</em>' },
  { tab: 'shop', file: '6-shop', cap: 'コインをためて<br><em>ボールやスパイクを着せ替え</em>' },
];
const DEVICES = [
  { dir: 'iphone', w: 440, h: 956, dpr: 3 },   // 1320×2868
  { dir: 'android', w: 360, h: 720, dpr: 3 },  // 1080×2160
];

function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(ROOT, p);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rsp.writeHead(404); rsp.end(); return; }
      rsp.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rsp);
    }).listen(0, '127.0.0.1', () => res(srv));
  });
}

async function launch() {
  const exe = BROWSERS.find(b => fs.existsSync(b));
  if (!exe) throw new Error('Edge か Chrome が見つかりません');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rq-shots-'));
  const proc = spawn(exe, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${dir}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((res, rej) => {
    let buf = ''; proc.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\S+)/); if (m) res(m[1]); });
    setTimeout(() => rej(new Error('ブラウザが起動しませんでした')), 20000);
  });
  return { proc, wsUrl, dir };
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl); let id = 0; const wait = new Map(), events = [];
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { const w = wait.get(m.id); wait.delete(m.id); m.error ? w.rej(new Error(m.error.message)) : w.res(m.result); } else events.push(m); };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const i = ++id; wait.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
  return new Promise(r => ws.onopen = () => r({ send, close: () => ws.close() }));
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const srv = await serve(), base = `http://127.0.0.1:${srv.address().port}`;
  const { proc, wsUrl, dir } = await launch();
  const c = await cdp(wsUrl);
  try {
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId: s } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    const ev = (code) => c.send('Runtime.evaluate', { expression: code, awaitPromise: true, returnByValue: true }, s).then(r => { if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'JSエラー'); return r.result.value; });
    const shot = async (file, clip) => {
      const r = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, ...(clip ? { clip } : {}) }, s);
      fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, Buffer.from(r.data, 'base64')); console.log('  ' + path.relative(ROOT, file));
    };
    const size = (w, h, dpr) => c.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile: true }, s);
    await c.send('Page.enable', {}, s);
    const demo = fs.readFileSync(path.join(__dirname, 'store', 'demo.js'), 'utf8');

    for (const D of DEVICES) {
      console.log(D.dir);
      await size(D.w, D.h, D.dpr);
      await c.send('Page.navigate', { url: base + '/index.html' }, s); await sleep(1500);
      await ev(demo); await sleep(300);
      await c.send('Page.navigate', { url: base + '/index.html' }, s); await sleep(2000);
      const raw = [];
      for (const S of SHOTS) {
        await ev(`document.getElementById('ov').classList.remove('show');go('${S.tab}');window.scrollTo(0,0);${S.js||''};1`); await sleep(900);
        const f = path.join(OUT, D.dir, 'raw', S.file + '.png'); await shot(f); raw.push({ ...S, f });
      }
      // 説明文つきのストア画像
      for (const S of raw) {
        const img = 'data:image/png;base64,' + fs.readFileSync(S.f).toString('base64');
        await c.send('Page.navigate', { url: base + '/tools/store/frame.html' }, s); await sleep(600);
        await ev(`setShot(${JSON.stringify(img)}, ${JSON.stringify(S.cap)}); document.fonts.ready.then(()=>1)`); await sleep(500);
        await shot(path.join(OUT, D.dir, S.file + '.png'));
      }
    }
    // Google Play の横長バナー（1024×500）とアイコン（1024×1024）
    await size(1024, 500, 1);
    await c.send('Page.navigate', { url: base + '/tools/store/feature.html' }, s); await sleep(1500);
    await ev('document.fonts.ready.then(()=>1)'); await shot(path.join(OUT, 'feature-graphic.png'));
    await size(1024, 1024, 1);
    await c.send('Page.navigate', { url: base + '/icons/icon-512.png' }, s); await sleep(300);
    await ev(`document.body.style.margin=0;document.body.style.background='#000';const i=document.querySelector('img');i.style.cssText='width:1024px;height:1024px;image-rendering:auto';1`);
    await shot(path.join(OUT, 'icon-1024.png'));
  } finally {
    c.close(); proc.kill(); srv.close();
    setTimeout(() => { try { fs.rmSync(dir, { recursive: true, force: true }) } catch (e) {} }, 1500);
  }
}
main().catch(e => { console.error(e.message); process.exit(1); });
