/* ストア用スクリーンショットのための サンプル選手（実在の子どものデータではない） */
(() => {
  const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const R = { speed: 72, agility: 66, power: 55, stamina: 61, balance: 58, touch: 78, dribble: 81, kick: 67, iq: 62 };
  S = { c: norm({ name: 'ハルト', age: 10, v: 2, avatar: 'idea-1', num: 10 }), xp: 3180, coin: 1280, hp: 85, charm: 2, job: 'wg',
    stats: Object.fromEntries(SPORT.stats.map(x => [x.id, (R[x.id] - 40) * 3])), best: { lift: 64 }, logs: [], titles: [], skills: [], eq: null, tut: 1, sound: false };
  const pick = ['dribble', 'touch', 'lift', 'shoot', 'pass', 'speed'];
  for (let d = 45; d >= 0; d--) {
    if (d > 0 && [2, 5].includes(d % 7)) continue;
    const dt = new Date(); dt.setDate(dt.getDate() - d);
    const grp = MENUS.filter(m => m.grp === pick[d % pick.length]);
    const m = (grp.length ? grp : MENUS)[d % (grp.length || MENUS.length)];
    S.logs.unshift({ date: ymd(dt), menu: m.id, min: 15 + (d % 3) * 10, rec: '', xp: 70 });
  }
  wear(S); S.inv.push('b2', 's3', 'k4'); S.wear = { ball: 'b2', boot: 's3', kit: 'k4', bg: 'g0' };
  S.titles = TITLES.filter(t => { try { return t.ok(S) } catch (e) { return false } }).map(t => t.id);
  S.skills = SKILLS.filter(k => { try { return k.ok(S) } catch (e) { return false } }).map(k => k.name);
  S.hpDay = ymd(new Date()); S.chestOpened = Math.max(0, Math.floor(totalMin() / 60) - 1);
  save(); return 1;
})()
