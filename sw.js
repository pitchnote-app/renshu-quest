/* オフラインでも起動できるようにする Service Worker
   アプリを更新したら VERSION を上げると、古いキャッシュが入れかわる */
const VERSION = 'rq-0.27.0';
const CORE = ['./', './index.html', './app.css', './app.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './fonts/fonts.css'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 同梱フォント（中身が変わらない）は キャッシュを先に使う
  if (url.origin === location.origin && url.pathname.includes('/fonts/')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  // アプリ本体：ネットを先に見て、つながらなければ キャッシュ
  // ブラウザの控え（GitHub Pages は10分）は使わず、毎回「新しくなった？」と確かめる。画像は重いので対象外
  const fresh = !/\.(webp|png|jpe?g|svg)$/i.test(url.pathname);
  e.respondWith(fetch(req, fresh ? { cache: 'no-cache' } : {}).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
});
