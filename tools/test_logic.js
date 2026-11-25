/* 計算ロジックの自動テスト（ブラウザなしで動く）
   使い方: node tools/test_logic.js
   経験値・レベル・能力・クエスト・宝箱・お守り・データ移行などが正しく動くかを確認する */
const fs = require('fs'), path = require('path'), vm = require('vm');

function el() {
  return new Proxy({ classList: { add() {}, remove() {}, toggle() {}, contains() { return false } }, style: {}, dataset: {}, value: '',
    querySelectorAll: () => [], querySelector: () => null, appendChild() {}, remove() {}, click() {}, addEventListener() {} },
    { get: (t, k) => (k in t ? t[k] : undefined), set: (t, k, v) => { t[k] = v; return true } });
}
function makeContext(extra) {
  const store = new Map();
  const doc = { getElementById: () => el(), querySelectorAll: () => [], querySelector: () => null, createElement: () => el(), body: el() };
  const ctx = {
    console, Math, Date, JSON, Promise, setTimeout: () => 0, clearTimeout() {}, requestAnimationFrame: () => 0, setInterval: () => 0, clearInterval() {}, Set, Map, Object, Array, Number, String, Proxy, Blob: function () {},
    URL: { createObjectURL: () => '', revokeObjectURL() {} },
    document: doc, navigator: {}, location: { reload() {} }, matchMedia: () => ({ matches: true }),
    localStorage: { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    addEventListener() {}, isSecureContext: false, scrollTo() {}, scrollY: 0,
  };
  Object.assign(ctx, extra || {});
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
  // はじめての練習ボーナスの宝箱とまざらないよう、すでに1回練習したことにしておく
  run(c, newPlayer + "S.logs.push({date:'2026-01-01',menu:'run',min:0,xp:0});draft={menu:'run',min:90,rec:''};doPractice();"); eq(run(c, 'chestsPending()'), 1);
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

test('キャラはイラストだけ：カードはイラストで表示。前に「自分で作る」だった選手もイラストに切りかわる', c => {
  run(c, newPlayer + "S.c.avatar='idea-3';");
  ok(run(c, "cardView(S,1,0).includes('img/chars/idea-3_1.webp')"), 'イラスト');
  run(c, "S.c.avatar='';"); ok(run(c, "cardView(S,1,0).includes('img/chars/idea-1_1.webp')"), '男の子はツンツンに');
  run(c, "S.c.sex='f';"); ok(run(c, "cardView(S,1,0).includes('img/chars/idea-6_1.webp')"), '女の子はポニーテールに');
  run(c, "S.c.avatar='';save();load();"); eq(run(c, 'S.c.avatar'), 'idea-6', '読みこみ時にイラストへ移行');
  ok(run(c, "typeof charSVG==='undefined'"), '自分で作るキャラの絵は消えている');
  eq(run(c, 'AVATARS.length'), 11);
  const ids = JSON.parse(run(c, 'JSON.stringify(AVATARS.map(a=>a.id))'));
  eq(new Set(ids).size, ids.length);
  for (const id of ids) ok(require('fs').existsSync(require('path').join(__dirname, '../img/chars', id + '.webp')), id + ' の画像がある');
});

test('背番号は1〜999だけ（全角も読み取る）。最初の設定に入力欄がある', c => {
  eq(run(c, "parseNum('7')"), 7); eq(run(c, "parseNum('１０')"), 10); eq(run(c, "parseNum(99)"), 99); eq(run(c, "parseNum('100')"), 100); eq(run(c, "parseNum('９９９')"), 999);
  for (const v of ["''", "'0'", "'00'", "'abc'", 'null', 'undefined']) eq(run(c, `parseNum(${v})`), null);
  run(c, "S=null;ed=norm({name:''});");
  const v = run(c, 'editView()');
  ok(v.includes('id="cnum"'), '入力欄'); ok(!v.includes('自分で作る'), '「自分で作る」はない'); ok(v.includes('img/chars/idea-1.webp'), 'イラストから選ぶ');
});

test('ボルトの一言：名前は「〇〇選手」と呼び、記号は安全な形にする', c => {
  run(c, newPlayer + "S.c.name='か';S.logs=[{date:today(),min:10,menu:MENUS[0].id}];");
  ok(run(c, "buddyLines().some(x=>x.t.startsWith('か選手、今日もナイス練習！'))"), '名前と分かる');
  run(c, "S.c.name='A<b>';");
  ok(run(c, "buddyLines().every(x=>!x.t.includes('<b>'))"), 'タグがそのまま入らない');
});

test('階級：成長ステージと同じレベルで昇格する（Lv1 ビギナー → Lv36 レジェンド）', c => {
  eq(run(c, 'rankOf(1)'), 'ビギナー'); eq(run(c, 'rankOf(10)'), 'レギュラー'); eq(run(c, 'rankOf(36)'), 'レジェンド');
  eq(run(c, 'RANKS.length'), run(c, 'STAGES.length')); eq(run(c, 'RANK_COL.length'), run(c, 'RANKS.length'));
});
test('二つ名：14分野×8段階、名前の重複なし。能力はランク、練習は回数で上がる', c => {
  run(c, newPlayer);
  eq(run(c, 'NICKS.length'), 14);
  ok(run(c, 'NICKS.every(N=>N.t.length===8)'), '8段階');
  const all = run(c, 'NICKS.flatMap(N=>N.t)'); eq(new Set(all).size, all.length, '名前の重複');
  eq(run(c, "nickOf(S,NICKS.find(N=>N.id==='dribble')).t"), 'ドリブル見習い');
  run(c, "S.stats.dribble=(81-40)*3");
  eq(run(c, "nickOf(S,NICKS.find(N=>N.id==='dribble')).t"), '突破の魔術師');
  run(c, "for(let i=0;i<7;i++)S.logs.push({date:'2026-01-01',menu:'df_1v1',min:10,xp:5})");
  eq(run(c, "nickOf(S,NICKS.find(N=>N.id==='df')).t"), 'ディフェンダー');
  run(c, 'nickUps()'); run(c, "for(let i=0;i<8;i++)S.logs.push({date:'2026-01-01',menu:'df_step',min:10,xp:5})");
  eq(run(c, 'nickUps().map(u=>u.x.t)'), ['ボールハンター'], '上がったときだけ知らせる');
});
test('守備の練習メニューがあり、図解が描ける', c => {
  run(c, newPlayer);
  ok(run(c, "MENUS.filter(m=>m.grp==='df').length") >= 5, '5種類以上');
  ok(run(c, "MENUS.filter(m=>m.grp==='df').every(m=>diag(m.d).includes('<svg'))"), '図解');
});
test('能力ランク：40はG、55はD、70はB、90以上はS（メダルの色つき）', c => {
  eq(run(c, 'grade(40).g'), 'G'); eq(run(c, 'grade(55).g'), 'D'); eq(run(c, 'grade(70).g'), 'B'); eq(run(c, 'grade(99).g'), 'S');
  eq(run(c, 'grade(70).m.name'), 'ゴールド'); eq(run(c, 'grade(99).m.name'), 'ダイヤ');
});
test('熟練度：同じ練習の回数でビギナー→ブロンズ→…とメダルが上がる', c => {
  run(c, newPlayer);
  eq(run(c, "mastery(S,'sole_roll').i"), -1);
  run(c, "for(let i=0;i<7;i++)S.logs.push({date:'2026-01-0'+(i%9+1),menu:'sole_roll',min:10,xp:5})");
  eq(run(c, "mastery(S,'sole_roll').m.name"), 'シルバー'); eq(run(c, "mastery(S,'sole_roll').next"), 15);
});
test('個人技スキル：練習回数で習得し、名前の重複がない・30種類以上', c => {
  run(c, newPlayer);
  ok(run(c, 'SKILLS.length') >= 30, 'スキルが30種類以上');
  eq(run(c, 'new Set(SKILLS.map(k=>k.name)).size'), run(c, 'SKILLS.length'), '名前の重複');
  ok(run(c, "SKILLS.every(k=>['gold','blue','green'].includes(k.tier))"), '札の色');
  run(c, "for(let i=0;i<7;i++)S.logs.push({date:'2026-01-01',menu:'sole_roll',min:10,xp:5})");
  ok(run(c, "unlocks().newS.some(k=>k.name==='足裏コントロール')"), '足裏コントロールを習得');
  ok(run(c, "statusView().includes('足裏コントロール')"), 'つよさ画面に表示');
});

test('部屋：階級と同じ8段階で、広い部屋ほど飾れる数が多い。トロフィー・メダルが増える', c => {
  run(c, newPlayer);
  eq(run(c, 'ROOMS.length'), run(c, 'STAGES.length'));
  ok(run(c, 'ROOMS.every((r,i)=>i===0||r.cap>=ROOMS[i-1].cap)'), '飾れる数');
  eq(run(c, 'roomItems(S).trophies.length'), 0);
  run(c, "S.bossWins=2; for(let i=0;i<15;i++)S.logs.push({date:'2026-01-'+String(i+1).padStart(2,'0'),menu:'sole_roll',min:10,xp:5})");
  eq(run(c, 'roomItems(S).trophies.length'), 3, 'ライバル2＋10日達成');
  eq(run(c, 'roomItems(S).medals.length'), 1, 'ゴールドの熟練度');
  ok(run(c, "roomView(S).includes('せまい物置部屋')"), '部屋の名前');
  ok(run(c, "stageScene(S).includes('家の庭')"), '練習場所');
});

test('練習タイマー：経過時間は始めた時刻から計算し、一時停止中は増えない', c => {
  run(c, newPlayer);
  eq(run(c, 'tElapsed({acc:60000,run:false,start:0})'), 60000);
  ok(run(c, 'tElapsed({acc:0,run:true,start:Date.now()-120000})') >= 120000, '動いている間は増える');
  run(c, "S.timer={menu:'sole_roll',goal:15,start:Date.now(),acc:0,run:true}");
  ok(run(c, "timerView().includes('足裏コロコロ')"), 'タイマー画面');
});

test('兄弟で使える：選手ごとに別々に保存され、切りかえても記録がまざらない', c => {
  run(c, newPlayer + "S.coin=500; save();");
  eq(run(c, 'profMeta().list.length'), 1);
  eq(run(c, 'KEY'), 'renshu-quest-v1', '1人目は昔からのキー');
  run(c, 'addProfile()');
  eq(run(c, 'S'), null, '2人目は新しく作る');
  eq(run(c, 'KEY'), 'renshu-quest-v1-p1');
  run(c, "S={c:norm({name:'いもうと',age:8,v:2}),xp:0,coin:0,stats:freshStats(),best:{},logs:[],titles:[],eq:null,tut:1}; save();");
  run(c, 'switchProfile(0)');
  eq(run(c, 'S.c.name'), 'テスト'); eq(run(c, 'S.coin'), 500);
  run(c, 'switchProfile(1)');
  eq(run(c, 'S.c.name'), 'いもうと'); eq(run(c, 'S.coin'), 0);
  eq(run(c, 'profMeta().list.map(x=>x.name)'), ['テスト','いもうと']);
});

test('場所のライバル：その場所で練習を重ね、能力が届くと勝てる。勝つとトロフィー', c => {
  run(c, newPlayer);
  eq(run(c, 'PLACE_RIVALS.length'), run(c, 'STAGES.length'));
  eq(run(c, 'placeRival().R.name'), '庭に来たネコ「ミケ」');
  const notes = [];
  run(c, "for(let i=0;i<3;i++)S.logs.unshift({date:'2026-01-01',menu:'sole_roll',min:10,xp:5})");
  eq(run(c, 'placeCheck([])'), 0, 'ボールタッチが足りない');
  run(c, "S.stats.touch=(45-40)*3");
  eq(run(c, 'placeCheck([])'), 200, '勝てる');
  eq(run(c, 'S.placeWins'), [0]);
  ok(run(c, "roomItems(S).trophies.some(t=>t.ic==='🎖️')"), '部屋にトロフィー');
  eq(run(c, 'placeCheck([])'), 0, '2回は勝たない');
});

test('はじめての練習：ホームに案内が出て、最初の1回だけボーナス（+100 EXP・宝箱）', c => {
  run(c, newPlayer);
  ok(run(c, "firstCard().includes('はじめての練習')"), '案内');
  run(c, "draft={menu:'sole_roll',min:10,rec:''}; doPractice()");
  ok(run(c, 'S.xp') >= 120, `ボーナス込み（${run(c, 'S.xp')}）`);
  eq(run(c, 'S.bonusChest'), 1);
  eq(run(c, 'firstCard()'), '', '2回目からは出ない');
  const x = run(c, 'S.xp'); run(c, "draft={menu:'sole_roll',min:10,rec:''}; doPractice()");
  ok(run(c, 'S.xp') - x < 100, '2回目はボーナスなし');
});

test('更新の読みこみ直しは ホームか設定だけ（入力中・お知らせ中・最初の設定ではしない）', c => {
  run(c, newPlayer + "ed=null;tab='home';");
  eq(run(c, 'canReload()'), true); run(c, "tab='settings'"); eq(run(c, 'canReload()'), true);
  run(c, "tab='practice';"); eq(run(c, 'canReload()'), false);
  run(c, "tab='home';ed=norm(S.c);"); eq(run(c, 'canReload()'), false);
  run(c, "ed=null;S=null;"); eq(run(c, 'canReload()'), false);
});

/* アプリ版（Capacitor）の機能：通知の予約と 端末への二重保存 */
async function nativeTests() {
  const scheduled = [], prefs = new Map();
  const Plugins = {
    LocalNotifications: { cancel: async () => {}, schedule: async o => { scheduled.push(...o.notifications) }, requestPermissions: async () => ({ display: 'granted' }) },
    Preferences: { get: async o => ({ value: prefs.get(o.key) ?? null }), set: async o => { prefs.set(o.key, o.value) }, remove: async o => { prefs.delete(o.key) } },
  };
  const c = makeContext({ Capacitor: { isNativePlatform: () => true, Plugins } });
  const name = 'アプリ版：リマインダーは7日分まで予約し、今日練習した日は今日の分を出さない';
  try {
    run(c, newPlayer + "S.remind='23:59';");
    await run(c, 'remindSchedule()');
    ok(scheduled.length === 7, `7件のはず（${scheduled.length}件）`);
    scheduled.length = 0;
    run(c, "S.logs.unshift({date:today(),menu:'x',min:10,xp:5})");
    await run(c, 'remindSchedule()');
    ok(scheduled.length === 6 && !scheduled.some(n => n.id === 1), '今日の分が残っている');
    scheduled.length = 0;
    run(c, 'S.remind=null'); await run(c, 'remindSchedule()');
    eq(scheduled.length, 0, 'オフなら予約しない');
    run(c, 'save()'); await new Promise(r => setImmediate(r));
    ok(JSON.parse(prefs.get('renshu-quest-v1')).c.name === 'テスト', '端末の保存領域にも保存される');
    pass++; console.log('  ✔ ' + name);
  } catch (e) { fail++; console.log('  ✘ ' + name + '\n      ' + e.message); }
}

nativeTests().then(() => {
  console.log(`\n結果：${pass} 件成功 / ${fail} 件失敗`);
  process.exit(fail ? 1 : 0);
});
