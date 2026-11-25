/* 計算ロジックの自動テスト（ブラウザなしで動く）
   使い方: node tools/test_logic.js
   経験値・レベル・能力・クエスト・宝箱・お守り・データ移行などが正しく動くかを確認する */
const fs = require('fs'), path = require('path'), vm = require('vm');

function el() {
  return new Proxy({ classList: { add() {}, remove() {}, toggle() {}, contains() { return false } }, style: {}, dataset: {}, value: '',
    querySelectorAll: () => [], querySelector: () => null, appendChild() {}, remove() {}, click() {}, addEventListener() {} },
    { get: (t, k) => (k in t ? t[k] : undefined), set: (t, k, v) => { t[k] = v; return true } });
}
function makeContext() {
  const store = new Map();
  const doc = { getElementById: () => el(), querySelectorAll: () => [], querySelector: () => null, createElement: () => el(), body: el() };
  const ctx = {
    console, Math, Date, JSON, Promise, setTimeout: () => 0, Set, Map, Object, Array, Number, String, Proxy, Blob: function () {},
    URL: { createObjectURL: () => '', revokeObjectURL() {} },
    document: doc, navigator: {}, location: { reload() {} }, matchMedia: () => ({ matches: true }),
    localStorage: { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    addEventListener() {}, isSecureContext: false, scrollTo() {}, scrollY: 0,
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'), ctx, { filename: 'app.js' });
  return ctx;
}

let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(makeContext()); pass++; console.log('  ✔ ' + name); }
  catch (e) { fail++; console.log('  ✘ ' + name + '\n      ' + e.message); }
}
function eq(a, b, msg) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${msg || ''} 期待 ${JSON.stringify(b)} / 実際 ${JSON.stringify(a)}`); }
function ok(v, msg) { if (!v) throw new Error(msg || '条件を満たしていない'); }
const run = (c, code) => vm.runInContext(code, c);
const newPlayer = `S={c:norm({name:'テスト',age:10,v:2}),xp:0,coin:0,stats:freshStats(),best:{},logs:[],titles:[],eq:null,tut:1};`;

console.log('れんしゅうクエスト ロジックテスト');

test('レベル計算：0 EXP は Lv1、60 EXP で Lv2', c => {
  eq(run(c, 'lv(0).L'), 1); eq(run(c, 'lv(59).L'), 1); eq(run(c, 'lv(60).L'), 2);
});
test('能力値：40 から始まり 3ポイントで +1、99 が上限', c => {
  run(c, newPlayer);
  eq(run(c, "rt(S,'touch')"), 40);
  run(c, "S.stats.touch=3"); eq(run(c, "rt(S,'touch')"), 41);
  run(c, "S.stats.touch=9999"); eq(run(c, "rt(S,'touch')"), 99);
});
test('練習メニューは 50種類以上、すべて ジャンル・能力・図解・手順つき', c => {
  ok(run(c, 'MENUS.length') >= 50);
  eq(run(c, 'MENUS.filter(m=>!m.grp||!Object.keys(m.gain).length||!m.d||m.how.length<2).length'), 0);
  eq(run(c, 'MENUS.filter(m=>diag(m.d).length<300).length'), 0, '図解が描けないメニュー');
  eq(run(c, 'new Set(MENUS.map(m=>m.id)).size'), run(c, 'MENUS.length'), 'IDの重複');
});
test('練習を記録すると EXP・コイン・能力・ログが増える', c => {
  run(c, newPlayer + "draft={menu:'lift',min:30,rec:''};doPractice();");
  ok(run(c, 'S.xp') >= 60, 'EXP'); ok(run(c, 'S.coin') >= 30, 'コイン');
  ok(run(c, 'S.stats.touch') > 0, '能力'); eq(run(c, 'S.logs.length'), 1);
  ok(run(c, 'S.hp') < 100, 'HPが減る');
});
test('のびどきボーナス：10歳はボールタッチが1.5倍', c => {
  run(c, newPlayer + "draft={menu:'lift',min:30,rec:''};doPractice();");
  eq(run(c, 'S.stats.touch'), 6 * 1 * 1.5);
});
test('職業ボーナス：フォワードはキックが1.1倍', c => {
  run(c, newPlayer + "S.c.age=16;S.job='fw';draft={menu:'shoot',min:25,rec:''};doPractice();");
  eq(Math.round(run(c, 'S.stats.kick') * 100) / 100, 5.5);
});
test('自己ベスト：初回は記録だけ、更新でボーナス', c => {
  run(c, newPlayer + "draft={menu:'lift',min:10,rec:'10'};doPractice();");
  eq(run(c, 'S.best.lift'), 10);
  const before = run(c, 'S.xp');
  run(c, "draft={menu:'lift',min:10,rec:'15'};doPractice();");
  eq(run(c, 'S.best.lift'), 15); ok(run(c, 'S.xp') - before >= 20 + 30, '更新ボーナス');
});
test('タイム系（小さいほど良い）の自己ベスト', c => {
  run(c, newPlayer + "draft={menu:'dash',min:10,rec:'10.5'};doPractice();draft={menu:'dash',min:10,rec:'11'};doPractice();");
  eq(run(c, 'S.best.dash'), 10.5);
  run(c, "draft={menu:'dash',min:10,rec:'9.8'};doPractice();"); eq(run(c, 'S.best.dash'), 9.8);
});
test('デイリークエスト：日付ごとに同じ3つ、重複なし', c => {
  const a = run(c, "quests('2026-11-25').map(q=>q.id)"), b = run(c, "quests('2026-11-25').map(q=>q.id)");
  eq(a, b); eq(new Set(a).size, 3);
});
test('宿屋：HPが全回復', c => {
  run(c, newPlayer + "S.hp=10;S.hpDay=today();doRest();"); eq(run(c, 'S.hp'), 100);
});
test('宝箱：練習60分ごとに1個', c => {
  run(c, newPlayer + "draft={menu:'run',min:90,rec:''};doPractice();"); eq(run(c, 'chestsPending()'), 1);
  run(c, "openChest();"); eq(run(c, 'chestsPending()'), 0);
});
test('チャレンジロード：120 EXPごとに段階が進む', c => {
  run(c, newPlayer + "const n=[];roadGain(250,n);"); eq(run(c, 'season().tier'), 2);
});
test('お守り：1日休んでも 連続記録が切れない', c => {
  run(c, newPlayer + "const d=n=>{const x=new Date();x.setDate(x.getDate()-n);return ds(x)};S.logs=[{date:d(2),menu:'lift',min:20,xp:40},{date:d(3),menu:'lift',min:20,xp:40}];S.charm=1;dailyCheck();");
  eq(run(c, 'S.charm'), 0); eq(run(c, 'streak()'), 3);
});
test('古いデータ（旧5能力）から 新しい9能力へ移行', c => {
  run(c, "localStorage.setItem(KEY,JSON.stringify({c:{name:'旧',sex:'m',hair:0},xp:100,stats:{dribble:9,lift:6,shoot:3,pass:3,stamina:3},best:{},logs:[],titles:[]}));load();");
  eq(run(c, 'S.stats.touch'), 6); eq(run(c, 'S.stats.kick'), 6); eq(run(c, 'S.stats.dribble'), 9); eq(run(c, 'S.stats.speed'), 0);
});
test('ライバル：目標を超えると撃破', c => {
  run(c, newPlayer + "const B=boss();B.idx=0;B.target=20;");
  run(c, "draft={menu:'lift',min:10,rec:'25'};doPractice();"); eq(run(c, 'S.boss.beaten'), true); eq(run(c, 'S.bossWins'), 1);
});
test('すべての画面が エラーなく作れる', c => {
  run(c, newPlayer);
  for (const v of ['homeView', 'practiceView', 'titlesView', 'logView', 'settingsView', 'shopView', 'wardrobeView', 'reportView', 'editView'])
    run(c, (v === 'editView' ? 'ed=norm(S.c);' : '') + `${v}()`);
});
test('ショップのアイテムは すべてアイコンが描ける', c => {
  run(c, newPlayer);
  eq(run(c, "SHOP.flatMap(x=>x.items.map(it=>itemIcon(x.cat,it))).filter(h=>!h||h.length<40).length"), 0);
});

test('イラストのキャラを選ぶと カードはイラストで表示（自分で作るときはコードの絵）', c => {
  run(c, newPlayer + "S.c.avatar='idea-3';");
  ok(run(c, "cardView(S,1,0).includes('img/chars/idea-3_1.webp')"), 'イラスト');
  run(c, "S.c.avatar='';"); ok(run(c, `cardView(S,1,0).includes('<svg class="char"')`), 'コードの絵');
  eq(run(c, 'AVATARS.length'), 11);
  const ids = JSON.parse(run(c, 'JSON.stringify(AVATARS.map(a=>a.id))'));
  eq(new Set(ids).size, ids.length);
  for (const id of ids) ok(require('fs').existsSync(require('path').join(__dirname, '../img/chars', id + '.webp')), id + ' の画像がある');
});

test('背番号は1〜999だけ（全角も読み取る）。最初の設定に入力欄がある', c => {
  eq(run(c, "parseNum('7')"), 7); eq(run(c, "parseNum('１０')"), 10); eq(run(c, "parseNum(99)"), 99); eq(run(c, "parseNum('100')"), 100); eq(run(c, "parseNum('９９９')"), 999);
  for (const v of ["''", "'0'", "'00'", "'abc'", 'null', 'undefined']) eq(run(c, `parseNum(${v})`), null);
  run(c, "S=null;ed=norm({name:''});edTab=0;");
  ok(run(c, `editView().includes('id="cnum"')`), '入力欄');
  ok(run(c, "!ED.flatMap(t=>t.items).some(i=>i.k==='num')"), 'ユニフォームのタブには重ねて出さない');
});

test('ボルトの一言：名前は「〇〇選手」と呼び、記号は安全な形にする', c => {
  run(c, newPlayer + "S.c.name='か';S.logs=[{date:today(),min:10,menu:MENUS[0].id}];");
  ok(run(c, "buddyLines().some(x=>x.t.startsWith('か選手、今日もナイス練習！'))"), '名前と分かる');
  run(c, "S.c.name='A<b>';");
  ok(run(c, "buddyLines().every(x=>!x.t.includes('<b>'))"), 'タグがそのまま入らない');
});

test('更新の読みこみ直しは ホームか設定だけ（入力中・お知らせ中・最初の設定ではしない）', c => {
  run(c, newPlayer + "ed=null;tab='home';");
  eq(run(c, 'canReload()'), true); run(c, "tab='settings'"); eq(run(c, 'canReload()'), true);
  run(c, "tab='practice';"); eq(run(c, 'canReload()'), false);
  run(c, "tab='home';ed=norm(S.c);"); eq(run(c, 'canReload()'), false);
  run(c, "ed=null;S=null;"); eq(run(c, 'canReload()'), false);
});

console.log(`\n結果：${pass} 件成功 / ${fail} 件失敗`);
process.exit(fail ? 1 : 0);
