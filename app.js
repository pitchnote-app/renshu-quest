/* ===== 競技の設定（ここを入れ替えれば他のスポーツにも使える） ===== */
/* ===== 練習メニュー（ジャンル別・図解つき） ===== */
const GRPS=[
  {id:'touch',  name:'ボールタッチ',     ic:'🦶', cat:'tec'},
  {id:'dribble',name:'ドリブル',         ic:'⚡', cat:'tec'},
  {id:'lift',   name:'リフティング',     ic:'🔁', cat:'tec'},
  {id:'kick',   name:'キック・シュート', ic:'🎯', cat:'tec'},
  {id:'agi',    name:'スピード・アジリティ', ic:'💨', cat:'phy'},
  {id:'power',  name:'パワー',           ic:'💥', cat:'phy'},
  {id:'stamina',name:'スタミナ',         ic:'❤️', cat:'phy'},
  {id:'core',   name:'体幹・バランス',   ic:'🧘', cat:'phy'},
  {id:'iq',     name:'頭のトレーニング', ic:'🧠', cat:'iq'},
  {id:'game',   name:'試合・チーム',     ic:'🏟️', cat:'game'},
];
const M=(id,grp,name,lv,gain,d,how,rec)=>Object.assign({id,grp,cat:GRPS.find(g=>g.id===grp).cat,name,lv,gain,d,how,rec:null},rec||{});
const MENUS=[
  // ボールタッチ
  M('sole_roll','touch','足裏コロコロ',1,{touch:1,balance:.3},'f_roll',['足の裏でボールを前後に転がす','右足・左足を交互に','慣れたら目線を上げて、ボールを見ないで'],{rec:'30秒で何回？',unit:'回'}),
  M('toetap','touch','トントン（足裏タッチ）',1,{touch:1,agility:.3},'f_tap',['ボールの上に左右の足裏を交互に軽くのせる','ボールは動かさないように','リズムよくテンポを上げていく'],{rec:'30秒で何回？',unit:'回'}),
  M('inside_tap','touch','インサイドタッチ',1,{touch:1,agility:.3},'f_lr',['両足のインサイドでボールを左右に行ったり来たり','ボールは足の幅の中で小さく','ひざを軽く曲げて、つま先立ちで'],{rec:'30秒で何回？',unit:'回'}),
  M('inout','touch','インアウト',2,{touch:1,dribble:.3},'f_inout',['片足のインサイドとアウトサイドで交互にさわる','右足が終わったら左足も','速く・小さく・正確に'],{rec:'30秒で何回？',unit:'回'}),
  M('l_drag','touch','L字（引いて横へ）',2,{touch:1,dribble:.3},'f_l',['足裏でボールを手前に引く','反対の足のインサイドで横に押し出す','左右両方やってみよう']),
  M('v_turn','touch','Vターン',2,{touch:.8,dribble:.5},'f_v',['足裏でボールを手前に引く','同じ足のインサイドで斜め前に押し出す','「引く→出す」でVの字を描く']),
  M('scissors','touch','またぎ（シザース）',2,{dribble:1,touch:.3,balance:.2},'f_sc',['ボールの前で足を外側にまたぐ','またいだ足と反対の足のアウトで逆に運ぶ','上半身も大きく動かして相手をだます']),
  M('cruyff','touch','クライフターン',2,{dribble:1,agility:.3},'f_cr',['キックするふりをする','インサイドで軸足のうしろを通して切り返す','すぐに反対方向へ加速']),
  M('double_touch','touch','ダブルタッチ',3,{dribble:1,touch:.5},'f_dt',['右足インサイドで左へ小さく運ぶ','すぐ左足インサイドで前に運ぶ','2回のタッチをすばやく連続で']),
  M('elastico','touch','エラシコ',3,{touch:1,dribble:.5},'f_el',['アウトサイドで外に押し出す','足首を返してインサイドで内側へ','1回のタッチで「外→内」とボールをはじく']),
  // ドリブル
  M('dribble','dribble','ジグザグドリブル',1,{dribble:1,agility:.4,touch:.3},'c_zig',['コーンを1mおきに6本ならべる','コーンの間をジグザグに抜けて、最後で折り返す','タイムを計って記録しよう'],{rec:'ジグザグドリブルのタイム',unit:'秒',lower:true,dec:true}),
  M('out_zig','dribble','アウトサイドだけでジグザグ',2,{dribble:1,agility:.3},'c_zig',['アウトサイドだけでコーンの間を抜ける','右足だけ・左足だけでも','細かいタッチでスピードを落とさない']),
  M('figure8','dribble','8の字ドリブル',1,{dribble:1,touch:.3},'c_8',['コーンを2本、2mはなして置く','8の字を描くようにドリブル','インサイド・アウトサイド・足裏を全部使う'],{rec:'1分で何周？',unit:'周'}),
  M('speed_drib','dribble','スピードドリブル',1,{dribble:.8,speed:.6},'c_line',['20mの直線をドリブルで全力ダッシュ','ボールを大きく蹴り出しすぎない','タイムを計って記録'],{rec:'20mのタイム',unit:'秒',lower:true,dec:true}),
  M('stop_go','dribble','ストップ＆ゴー',2,{dribble:1,agility:.4},'c_stop',['ドリブル中に足裏でピタッと止める','すぐに急発進','止まる→走るの切り替えを速く']),
  M('turn_drill','dribble','ターン練習',2,{dribble:1,agility:.4,balance:.2},'c_turn',['コーンまでドリブルしてターン','インサイド・アウトサイド・足裏の3種類で','ターンしたらすぐ加速']),
  M('cone_1v1','dribble','コーン相手の1対1',3,{dribble:1,iq:.3},'c_1v1',['大きなコーンを相手だと思って置く','フェイントを入れて横を抜く','またぎ・ダブルタッチなど覚えた技で']),
  // リフティング
  M('lift_hand','lift','手から落としてワンタッチ',1,{touch:1},'l_foot',['ボールを手に持ち、前に落とす','足の甲で1回けり上げてキャッチ','ボールの真ん中をけるのがコツ'],{rec:'10回中何回キャッチ？',unit:'回',max:10}),
  M('lift_bounce','lift','ワンバウンドリフティング',1,{touch:1,balance:.2},'l_bounce',['1回地面にバウンドさせてからける','けったらまたバウンド','慣れたらバウンドなしに挑戦'],{rec:'連続で何回？',unit:'回'}),
  M('lift','lift','リフティング（インステップ）',2,{touch:1,balance:.3},'l_foot',['足の甲（インステップ）でける','ひざから下を振るイメージ','高さは胸くらいまで'],{rec:'連続で何回できた？',unit:'回'}),
  M('lift_alt','lift','両足交互リフティング',2,{touch:1,balance:.4},'l_foot',['右・左・右・左と交互にける','苦手な足もたくさん使おう','ボールの高さをそろえる'],{rec:'連続で何回？',unit:'回'}),
  M('lift_thigh','lift','ももリフティング',1,{touch:.8,balance:.4},'l_thigh',['ももを地面と平行に上げてボールに当てる','強く当てすぎない','左右交互にも挑戦'],{rec:'連続で何回？',unit:'回'}),
  M('lift_head','lift','ヘディングリフティング',3,{touch:.8,balance:.3,power:.2},'l_head',['おでこでボールをまっすぐ上に','ひざを使ってリズムよく','目はボールから離さない'],{rec:'連続で何回？',unit:'回'}),
  M('lift_walk','lift','歩きながらリフティング',3,{touch:1,balance:.5},'l_walk',['リフティングしながら前へ進む','ボールを少し前に上げるのがコツ','何m進めたか記録'],{rec:'何m進めた？',unit:'m'}),
  // キック・シュート
  M('pass','kick','壁パス（インサイド）',1,{kick:1,iq:.3},'k_wall',['壁から3〜5mはなれる','インサイドで壁にけって、返ってきたボールを止める','左右両方の足で'],{rec:'壁パスが連続で何回？',unit:'回'}),
  M('wall_1t','kick','壁パス ワンタッチ',2,{kick:1,iq:.3,agility:.2},'k_wall',['返ってきたボールを止めずにそのままける','体の向きを早めに準備','強さをそろえる'],{rec:'連続で何回？',unit:'回'}),
  M('trap','kick','トラップ（止めて蹴る）',1,{touch:.6,kick:.6,iq:.2},'k_trap',['転がってきたボールをインサイドで止める','次にけりやすい場所に置く','止めたらすぐキック']),
  M('air_trap','kick','浮き球トラップ',2,{touch:1,balance:.3},'k_air',['高く投げ上げたボールを足・もも・胸で止める','体の力をぬいてクッションのように','足元にピタッと落とす']),
  M('shoot','kick','シュート',1,{kick:1,power:.4},'k_goal',['ゴールに向かってシュートを10本','インステップでしっかりける','入った本数を記録'],{rec:'10本中、何本決まった？',unit:'本',max:10}),
  M('target','kick','四すみねらい（的当て）',2,{kick:1,iq:.2},'k_target',['ゴールの四すみに目印を置く','ねらった場所にけり分ける','強さより正確さを大事に'],{rec:'10本中何本当てた？',unit:'本',max:10}),
  M('long_kick','kick','ロングキック',2,{kick:.8,power:.6},'k_long',['助走をつけて遠くへける','ボールの少し下をけって高く','どこまで飛んだか記録'],{rec:'何m飛んだ？',unit:'m'}),
  // スピード・アジリティ
  M('dash','agi','ダッシュ',1,{speed:1,power:.3},'a_dash',['スタートの合図で全力で走る','腕を大きく振る','50m走のタイムを計ろう'],{rec:'50m走のタイム',unit:'秒',lower:true,dec:true}),
  M('side','agi','反復横跳び',1,{agility:1,speed:.3},'a_side',['1mおきに3本の線を引く','真ん中から左右の線をまたいで行き来','20秒で何回できるか数える'],{rec:'20秒で何回？',unit:'回'}),
  M('ladder','agi','ラダー',1,{agility:1,balance:.4},'a_ladder',['ラダー（地面にかいたはしごでもOK）を置く','1マスに1歩→2歩→横向き…と変えていく','速さより正確さ。慣れたらスピードアップ']),
  M('react','agi','反応ダッシュ',2,{speed:.6,agility:.6,iq:.2},'a_react',['家族に「右」「左」などの合図をしてもらう','合図の方向へすばやくダッシュ','音や手の合図など変えてみよう']),
  M('cone_shuttle','agi','コーンタッチ往復走',2,{agility:1,stamina:.3},'a_shuttle',['コーンを5mおきに3本置く','1本目→戻る→2本目→戻る…とタッチして往復','向きを変えるとき低い姿勢で'],{rec:'タイム',unit:'秒',lower:true,dec:true}),
  // パワー
  M('jump','power','なわとび（二重跳び）',1,{power:1,stamina:.4},'p_rope',['手首でなわを回す','高く跳んで二重跳び','つま先で着地'],{rec:'二重跳び 連続何回？',unit:'回'}),
  M('squat','power','スクワット',1,{power:1,balance:.3},'p_squat',['足を肩幅に開く','いすに座るようにお尻を下げる','ひざがつま先より前に出ないように'],{rec:'何回できた？',unit:'回'}),
  M('broad_jump','power','立ち幅跳び',1,{power:1},'p_jump',['両足で踏み切って前へ跳ぶ','腕を大きく振って勢いをつける','何cm跳べたか記録'],{rec:'何cm跳べた？',unit:'cm'}),
  M('hop','power','ケンケン',2,{power:.8,balance:.5},'p_hop',['片足でケンケンして前に進む','左右の足を両方','着地でふらつかないように']),
  // スタミナ
  M('run','stamina','ランニング',1,{stamina:1,speed:.2},'s_run',['話ができるくらいのペースで走る','15分以上続ける','シャトルランの回数を記録してもOK'],{rec:'シャトルラン 何回？',unit:'回'}),
  M('interval','stamina','インターバル走',2,{stamina:1,speed:.5},'s_interval',['ダッシュ30秒→ゆっくりジョグ30秒','これを5〜10回くり返す','試合で走り続ける力がつく']),
  M('rope_long','stamina','なわとび（長く跳ぶ）',1,{stamina:1,power:.3},'p_rope',['前跳びをリズムよく','止まらずに続ける','何分続いたか記録'],{rec:'何分続いた？',unit:'分'}),
  // 体幹・バランス
  M('core','core','プランク',1,{balance:1,power:.3},'b_plank',['ひじとつま先で体を支える','頭からかかとまでまっすぐ','お腹に力を入れて'],{rec:'何秒キープ？',unit:'秒'}),
  M('side_plank','core','サイドプランク',2,{balance:1,power:.3},'b_side',['横向きになり、片ひじで体を支える','体を一直線に','左右両方'],{rec:'何秒キープ？',unit:'秒'}),
  M('one_leg','core','片足立ち',1,{balance:1},'b_one',['片足で立って両手を広げる','慣れたら目を閉じて','左右両方'],{rec:'目を閉じて何秒？',unit:'秒'}),
  M('stretch','core','ストレッチ',1,{balance:.6,stamina:.2},'b_stretch',['練習の前後に体を伸ばす','反動をつけずにゆっくり20秒','ケガの予防になる大事な練習']),
  // 頭のトレーニング
  M('note','iq','練習ノート',1,{iq:1},'i_note',['今日できたこと・できなかったことを書く','次にやることを決める','コーチに言われたことも書いておく']),
  M('watch','iq','試合を見て学ぶ',1,{iq:1,kick:.2},'i_tv',['プロや上手な選手の試合を見る','1人の選手だけを目で追ってみる','まねしたいプレーを見つける']),
  M('image','iq','イメージトレーニング',1,{iq:1},'i_image',['目を閉じて、上手なプレーを想像する','自分がゴールを決める場面を思いうかべる','試合の前にやると効果的']),
  // 試合・チーム
  M('game','game','試合・ミニゲーム',1,{iq:.6,stamina:.5,dribble:.3,kick:.3},'g_game',['試合やミニゲームに参加','練習したことを試してみる','うまくいったことをノートに書こう']),
  M('team','game','チーム練習',1,{iq:.4,stamina:.4,dribble:.3,kick:.3,touch:.3},'g_team',['チームの練習に参加','コーチの話をよく聞く','仲間と声をかけ合う']),
];

/* ===== 図解イラスト（自分のキャラの色で描く・詳しい画面ではボールが動く） ===== */
function diag(k,u,anim){
  u=u||('d'+(UID++));
  const C0=(typeof S!=='undefined'&&S&&S.c)?norm(S.c):norm({});
  const sk=C0.skin, jer=C0.color, j2=C0.color2, hair=C0.hairColor, boot=C0.bootCol==='#2d2d35'?'#1d1d26':C0.bootCol;
  const OL='#1a1020', Y='#ffd84a', W='#ffffff';
  let mp=null; // ボールが動く道すじ
  const defs=`<defs>
    <marker id="${u}w" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${W}"/></marker>
    <marker id="${u}y" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${Y}"/></marker>
    <pattern id="${u}g" width="32" height="100" patternUnits="userSpaceOnUse"><rect width="16" height="100" fill="#2f8a47"/><rect x="16" width="16" height="100" fill="#2a7c40"/></pattern>
    <radialGradient id="${u}b" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c9d1e2"/></radialGradient>
    <radialGradient id="${u}v" cx="50%" cy="45%" r="70%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
    <linearGradient id="${u}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2f5e"/><stop offset="1" stop-color="#0f1a38"/></linearGradient></defs>`;
  // 矢印：ボール＝黄色（太い・ふち取り）、人＝白の点線
  const ar=(d,c,dash,both)=>{if(c==='y'&&!mp)mp=d;
    return (c==='y'?`<path d="${d}" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="5" stroke-linecap="round"/>`:'')+
      `<path d="${d}" fill="none" stroke="${c==='y'?Y:W}" stroke-width="${c==='y'?3:2.4}" ${dash||c!=='y'?'stroke-dasharray="5 4"':''} stroke-linecap="round" marker-end="url(#${u}${c})" ${both?`marker-start="url(#${u}${c})"`:''}/>`};
  const ball=(x,y,r=5)=>`<g transform="translate(${x} ${y})"><ellipse cx="1" cy="${r*.9}" rx="${r*.9}" ry="${r*.3}" fill="#000" opacity=".25"/><circle r="${r}" fill="url(#${u}b)" stroke="#1a1a22" stroke-width="1"/><path d="M0 ${-r*.42} l${r*.4} ${r*.29} -${r*.15} ${r*.47} h-${r*.5} l-${r*.15} -${r*.47}z" fill="#1a1a22"/><path d="M${-r*.95} ${-r*.1} l${r*.3} ${r*.05} M${r*.95} ${-r*.1} l-${r*.3} ${r*.05} M${-r*.5} ${r*.85} l${r*.15} -${r*.3} M${r*.5} ${r*.85} l-${r*.15} -${r*.3}" stroke="#1a1a22" stroke-width="${r*.22}" stroke-linecap="round"/></g>`;
  const cone=(x,y)=>`<g transform="translate(${x} ${y})"><ellipse cy="5" rx="7" ry="2.6" fill="#000" opacity=".3"/><path d="M-6.5 4 L-1.6 -9 Q0 -11 1.6 -9 L6.5 4 Q0 6.5 -6.5 4Z" fill="#ff8a1a" stroke="#7a3300" stroke-width="1"/><path d="M-4 -2.5 Q0 -1 4 -2.5 L4.9 0 Q0 1.8 -4.9 0Z" fill="#fff"/><path d="M-1 -8 L-3.5 3" stroke="#ffd2a0" stroke-width="1.2" stroke-linecap="round"/></g>`;
  // 上から見た選手（自分のキャラの色）
  const pl=(x,y,c)=>`<g transform="translate(${x} ${y})"><ellipse cy="2" rx="10" ry="6.5" fill="#000" opacity=".25"/><ellipse rx="10" ry="6" fill="${c||jer}" stroke="${OL}" stroke-width="1.4"/><path d="M-10 0 h20" stroke="${j2}" stroke-width="1.5" opacity=".8"/><circle r="5.6" fill="${hair}" stroke="${OL}" stroke-width="1.4"/><path d="M-3 -2 Q0 -4 3 -2" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" fill="none"/></g>`;
  const num=(x,y,n)=>`<g transform="translate(${x} ${y})"><circle r="6.5" fill="#f3dc8f" stroke="#7a5a10" stroke-width="1.2"/><text y="3.6" text-anchor="middle" font-size="9.5" font-weight="900" fill="#1c1405" font-family="sans-serif">${n}</text></g>`;
  const lbl=(x,y,t,c)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="9" font-weight="900" fill="${c||W}" stroke="rgba(0,0,0,.55)" stroke-width="2.4" paint-order="stroke" font-family="sans-serif">${t}</text>`;
  const field=`<rect width="160" height="100" rx="10" fill="url(#${u}g)"/><rect x="4" y="4" width="152" height="92" rx="7" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/><rect width="160" height="100" rx="10" fill="url(#${u}v)"/>`;
  const dark=`<rect width="160" height="100" rx="10" fill="url(#${u}d)"/><path d="M0 90 H160 V100 H0Z" fill="#2a7c40"/><path d="M0 90 H160" stroke="#3f9e58" stroke-width="2"/>`;
  const room=`<rect width="160" height="100" rx="10" fill="url(#${u}d)"/><path d="M0 90 H160 V100 H0Z" fill="#6b4f3a"/><rect x="34" y="86" width="92" height="6" rx="2" fill="#8a5a9a"/>`;
  // 上から見たスパイク（ひも・ポイント付き）
  const shoe=(x,y,r,flip)=>`<g transform="translate(${x} ${y}) rotate(${r||0}) ${flip?'scale(-1 1)':''}"><path d="M0 -17 C9 -17 9 2 7 11 C6 17 -6 17 -7 11 C-9 2 -9 -17 0 -17Z" fill="${boot}" stroke="${OL}" stroke-width="1.4"/><path d="M-7 -2 C-3 0 3 0 7 -2" stroke="${j2}" stroke-width="2"/><path d="M-3 -12 h6 M-3.5 -8 h7 M-3.5 -4 h7" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/></g>`;
  const feet=shoe(60,74,-6)+shoe(100,74,6,1);
  // 横から見た選手（太い手足・ユニフォームの色）
  const line=(d,col,w)=>`<path d="${d}" fill="none" stroke="${OL}" stroke-width="${w+2.6}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const FIG=f=>{let g='';
    f.l.forEach(d=>g+=line(d,sk,6.5));
    (f.sh||[]).forEach(([x,y,r])=>g+=`<ellipse cx="${x}" cy="${y}" rx="6" ry="3.4" transform="rotate(${r||0} ${x} ${y})" fill="${boot}" stroke="${OL}" stroke-width="1.4"/>`);
    (f.sp||[]).forEach(d=>g+=line(d,C0.pants,8));
    g+=line(f.t,jer,12);
    f.a.forEach(d=>g+=line(d,sk,5.5));
    const [hx,hy]=f.h;
    g+=`<circle cx="${hx}" cy="${hy}" r="7.6" fill="${sk}" stroke="${OL}" stroke-width="1.6"/><path d="M${hx-7.8} ${hy-.5} C${hx-8} ${hy-11} ${hx+8} ${hy-11} ${hx+7.8} ${hy-.5} C${hx+5} ${hy-4} ${hx-5} ${hy-4} ${hx-7.8} ${hy-.5}Z" fill="${hair}" stroke="${OL}" stroke-width="1.2"/><circle cx="${hx+(f.e||3)}" cy="${hy+1}" r="1.2" fill="${OL}"/>`;
    return g};
  const fig={
    kick:{h:[70,30],t:'M71 39 L74 58',sp:['M74 58 L73 63','M74 58 L79 62'],a:['M72 44 L60 52','M72 44 L86 48'],l:['M74 60 L70 87','M74 60 L88 70 L96 66'],sh:[[71,89],[99,66,-20]]},
    thigh:{h:[70,30],t:'M71 39 L74 58',sp:['M74 58 L73 63','M74 58 L80 60'],a:['M72 44 L61 53','M72 44 L84 53'],l:['M74 60 L71 87','M74 60 L90 59 L90 76'],sh:[[72,89],[92,78]]},
    head:{h:[76,32],e:2,t:'M76 41 L76 60',sp:['M76 60 L73 65','M76 60 L79 65'],a:['M76 46 L63 52','M76 46 L89 52'],l:['M76 62 L71 87','M76 62 L81 87'],sh:[[70,89],[83,89]]},
    walk:{h:[68,30],t:'M69 39 L72 58',sp:['M72 58 L69 63','M72 58 L78 62'],a:['M70 44 L59 52','M70 44 L83 49'],l:['M72 60 L63 86','M72 60 L86 70 L94 66'],sh:[[62,88],[97,66,-20]]},
    plank:{h:[40,58],t:'M48 63 L98 73',sp:['M96 72 L104 75'],a:['M50 65 L50 84 L62 84'],l:['M104 75 L126 84'],sh:[[129,86]]},
    side:{h:[40,48],t:'M47 55 L96 72',sp:['M94 71 L102 75'],a:['M48 57 L48 86','M53 58 L53 34'],l:['M102 75 L126 86'],sh:[[129,88]]},
    squat:{h:[74,34],t:'M74 43 L70 60',sp:['M70 60 L78 63'],a:['M73 49 L96 53'],l:['M76 63 L89 66 L85 86'],sh:[[87,89]]},
    jump:{h:[60,22],t:'M60 31 L61 49',sp:['M61 49 L57 54','M61 49 L66 54'],a:['M60 35 L49 22','M60 35 L72 23'],l:['M58 53 L53 68','M64 53 L69 68'],sh:[[52,70],[71,70]]},
    one:{h:[80,24],t:'M80 33 L80 54',sp:['M80 54 L77 59','M80 54 L84 59'],a:['M80 39 L60 41','M80 39 L100 41'],l:['M78 59 L79 86','M84 59 L92 69 L86 78'],sh:[[79,89],[84,80]]},
    stretch:{h:[98,58],t:'M62 82 L92 65',sp:['M60 84 L70 84'],a:['M88 68 L114 82'],l:['M70 85 L122 86'],sh:[[125,85,90]]},
    run:{h:[78,28],t:'M78 37 L76 56',sp:['M76 56 L80 61','M76 56 L71 61'],a:['M77 42 L66 52','M77 42 L90 48'],l:['M80 61 L88 72 L86 86','M71 61 L64 70 L55 72'],sh:[[87,89],[52,72,-30]]},
    rope:{h:[80,24],t:'M80 33 L80 52',sp:['M80 52 L77 57','M80 52 L83 57'],a:['M80 38 L68 50','M80 38 L92 50'],l:['M77 57 L76 76','M83 57 L84 76'],sh:[[75,79],[85,79]]},
  };
  let g='';
  switch(k){
    case 'f_roll': g=field+feet+ar('M80 26 L80 58','y',0,1)+ball(80,44,8)+num(100,30,1)+num(100,58,2)+lbl(80,12,'足の裏で 前後にコロコロ',Y); break;
    case 'f_tap': g=field+feet+ball(80,46,9)+ar('M62 54 L72 47','w')+ar('M98 54 L88 47','w')+num(52,46,1)+num(108,46,2)+lbl(80,14,'右・左・右・左と 交互にタッチ',Y); break;
    case 'f_lr': g=field+feet+ar('M64 40 L96 40','y',0,1)+ball(80,40,8)+num(48,40,1)+num(112,40,2)+lbl(80,14,'インサイドで 左右に パス交換',Y); break;
    case 'f_inout': g=field+feet+ar('M88 36 L114 36','y',0,1)+ball(100,36,7)+lbl(80,14,'片足の イン ⇄ アウト',Y)+lbl(88,54,'イン')+lbl(118,54,'アウト'); break;
    case 'f_l': g=field+feet+ar('M100 30 L100 52 L66 52','y')+ball(100,30,7)+num(112,40,1)+num(82,64,2)+lbl(80,14,'①足裏で引く → ②横へ',Y); break;
    case 'f_v': g=field+feet+ar('M100 26 L100 50 L126 24','y')+ball(100,26,7)+num(90,40,1)+num(124,42,2)+lbl(70,14,'①引いて ②ななめ前へ',Y); break;
    case 'f_sc': g=field+feet+ar('M102 60 C116 30 76 18 66 34','w',1)+ar('M80 40 L40 26','y')+ball(80,40,8)+num(118,40,1)+num(48,40,2)+lbl(80,94,'①足でまたぐ ②反対へ運ぶ',Y); break;
    case 'f_cr': g=field+feet+ar('M100 40 C96 66 60 66 38 48','y')+ball(100,40,7)+num(116,30,1)+num(70,72,2)+lbl(124,22,'けるふり',Y)+lbl(70,94,'軸足のうしろを通す',Y); break;
    case 'f_dt': g=field+feet+ar('M98 34 L66 34 L66 10','y')+ball(98,34,7)+num(84,24,1)+num(56,18,2)+lbl(108,94,'右イン→左イン',Y); break;
    case 'f_el': g=field+feet+ar('M104 34 L128 28 C118 16 92 12 70 22','y')+ball(100,34,7)+num(128,40,1)+num(82,12,2)+lbl(80,94,'①外へ ②すぐ内へ',Y); break;
    case 'c_zig': g=field+[36,56,76,96,116,136].map(x=>cone(x,52)).join('')+ar('M24 50 C30 30 40 30 46 50 C52 70 60 70 66 50 C72 30 80 30 86 50 C92 70 100 70 106 50 C112 30 120 30 126 50 C132 70 142 70 148 56','y')+pl(14,50)+ball(24,50,4)+num(46,26,1)+num(146,74,2)+lbl(80,94,'コーンの間を ジグザグに',Y); break;
    case 'c_8': g=field+cone(56,52)+cone(104,52)+ar('M56 32 C34 32 34 70 56 70 C78 70 82 32 104 32 C126 32 126 70 104 70 C82 70 78 32 58 32','y')+pl(30,24)+ball(56,32,4)+lbl(80,94,'8の字を えがく',Y); break;
    case 'c_line': g=field+cone(22,38)+cone(22,64)+cone(140,38)+cone(140,64)+ar('M34 52 L130 52','y')+pl(12,52)+ball(28,52,4)+'<path d="M22 46 V58 M140 46 V58" stroke="#fff" stroke-width="2"/>'+lbl(80,40,'20m',W)+lbl(22,86,'スタート')+lbl(140,86,'ゴール'); break;
    case 'c_stop': g=field+[52,92,132].map(x=>cone(x,30)).join('')+ar('M26 62 L48 62','y')+ar('M60 62 L88 62','y')+ar('M100 62 L136 62','y')+pl(14,62)+ball(24,62,4)+lbl(54,80,'ピタッ',Y)+lbl(94,80,'ピタッ',Y)+lbl(80,94,'止まる → すぐダッシュ'); break;
    case 'c_turn': g=field+cone(130,52)+ar('M28 44 L116 44 C134 44 134 60 116 60 L30 60','y')+pl(16,44)+ball(26,44,4)+num(70,34,1)+num(140,52,2)+num(70,72,3)+lbl(80,94,'行って ターンして 戻る',Y); break;
    case 'c_1v1': g=field+`<g transform="translate(88 50)"><ellipse cy="14" rx="15" ry="4" fill="#000" opacity=".3"/><path d="M-13 12 L-3 -14 Q0 -18 3 -14 L13 12 Q0 16 -13 12Z" fill="#ff8a1a" stroke="#7a3300"/><path d="M-8 -1 Q0 2 8 -1 L10 4 Q0 7 -10 4Z" fill="#fff"/></g>`+ar('M32 52 L66 52 C74 52 72 24 92 24 L140 26','y')+pl(22,52)+ball(30,52,4)+lbl(88,80,'あいて役')+num(66,62,1)+num(120,16,2); break;
    case 'l_foot': g=dark+FIG(fig.kick)+ar('M99 60 L99 38','y',0,1)+ball(99,34,6)+lbl(128,28,'足の甲で',Y)+lbl(128,40,'インステップ',Y); break;
    case 'l_bounce': g=dark+FIG(fig.kick)+ar('M96 62 L104 88 L108 46','y')+ball(108,40,6)+num(92,80,1)+num(120,60,2)+lbl(132,20,'1回バウンド',Y); break;
    case 'l_thigh': g=dark+FIG(fig.thigh)+ar('M91 52 L91 30','y',0,1)+ball(91,26,6)+lbl(122,52,'もも',Y); break;
    case 'l_head': g=dark+FIG(fig.head)+ar('M76 20 L76 6','y',0,1)+ball(76,14,6)+lbl(108,20,'おでこ',Y); break;
    case 'l_walk': g=dark+FIG(fig.walk)+ar('M97 60 L97 40','y',0,1)+ball(97,36,6)+ar('M30 96 L140 96','w')+lbl(128,84,'前へ進む',W); break;
    case 'k_wall': g=field+`<rect x="142" y="8" width="12" height="84" rx="2" fill="#b9c3d6" stroke="#5b6680"/><path d="M142 20 h12 M142 36 h12 M142 52 h12 M142 68 h12 M142 84 h12" stroke="#8a95ab"/>`+ar('M44 46 L138 38','y')+ar('M138 60 L46 56','y',1)+pl(30,52)+ball(40,52,4)+num(90,32,1)+num(90,68,2)+lbl(70,92,'①ける ②止める',Y); break;
    case 'k_trap': g=field+ar('M142 28 L52 50','y')+ar('M54 58 L124 80','y')+pl(40,52)+ball(48,52,4)+num(100,30,1)+num(44,72,2)+num(108,84,3)+lbl(36,30,'止めて',Y)+lbl(130,62,'けりだす',Y); break;
    case 'k_air': g=dark+FIG(fig.thigh)+ar('M146 6 C126 -2 104 8 94 26','y')+ball(91,44,6)+lbl(130,28,'高いボールを',Y)+lbl(130,40,'やさしく止める',Y); break;
    case 'k_goal': g=field+`<rect x="128" y="20" width="24" height="60" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3"/><path d="M134 20 V80 M140 20 V80 M146 20 V80 M128 32 H152 M128 44 H152 M128 56 H152 M128 68 H152" stroke="rgba(255,255,255,.35)"/>`+ar('M54 52 L124 44','y')+pl(36,52)+ball(48,52,4)+lbl(80,92,'インステップで シュート',Y); break;
    case 'k_target': g=field+`<rect x="128" y="20" width="24" height="60" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3"/>`+[[134,27],[146,27],[134,73],[146,73]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="#ff4d4d" stroke-width="2.2"/><circle cx="${x}" cy="${y}" r="1.6" fill="#ff4d4d"/>`).join('')+ar('M54 50 L128 30','y')+ar('M54 54 L128 70','y',1)+pl(36,52)+ball(48,52,4)+lbl(80,94,'四すみを ねらう',Y); break;
    case 'k_long': g=field+ar('M30 72 C62 -4 112 -4 146 68','y')+pl(16,72)+ball(26,72,4)+lbl(84,92,'遠くへ高く！',Y); break;
    case 'a_dash': g=field+'<path d="M24 8 V92 M140 8 V92" stroke="#fff" stroke-width="3"/>'+ar('M30 52 L134 52','w')+pl(16,52)+lbl(24,98,'スタート')+lbl(140,98,'ゴール')+lbl(82,44,'全力ダッシュ',Y); break;
    case 'a_side': g=field+'<path d="M40 12 V88 M80 12 V88 M120 12 V88" stroke="#fff" stroke-width="3"/>'+ar('M46 66 L114 66','w',0,1)+pl(80,46)+lbl(60,28,'1m')+lbl(100,28,'1m')+num(30,66,1)+num(130,66,2)+lbl(80,94,'線を またいで 左右に',Y); break;
    case 'a_ladder': g=field+'<rect x="16" y="38" width="128" height="26" fill="none" stroke="#ffd84a" stroke-width="2.6"/>'+[37,58,80,101,122].map(x=>`<path d="M${x} 38V64" stroke="#ffd84a" stroke-width="2.6"/>`).join('')+[26,47,69,90,111,133].map((x,i)=>`<ellipse cx="${x+(i%2?3:-3)}" cy="${i%2?57:45}" rx="3.2" ry="5" fill="#fff" stroke="${OL}" stroke-width=".8"/>`).join('')+ar('M16 78 L144 78','w')+lbl(80,94,'1マスに1歩ずつ すばやく',Y)+lbl(80,26,'ラダー'); break;
    case 'a_react': g=field+ar('M92 50 L132 50','w')+ar('M68 50 L28 50','w')+ar('M80 38 L80 12','w')+ar('M80 62 L80 88','w')+pl(80,50)+`<g transform="translate(118 22)"><circle r="10" fill="#ffd84a" stroke="#7a5a10"/><text y="5" text-anchor="middle" font-size="14" font-weight="900" fill="#1c1405">!</text></g>`+lbl(32,24,'合図で',Y)+lbl(32,36,'ダッシュ',Y); break;
    case 'a_shuttle': g=field+[22,62,102,142].map(x=>cone(x,26)).join('')+ar('M28 54 L58 54','w')+ar('M58 62 L28 62','w')+ar('M28 72 L98 72','w')+pl(16,62)+num(44,44,1)+num(44,84,2)+num(84,84,3)+lbl(80,98,'タッチして 往復'); break;
    case 'p_rope': g=room+FIG(fig.rope)+`<ellipse cx="80" cy="50" rx="17" ry="40" fill="none" stroke="${Y}" stroke-width="2.2" stroke-dasharray="5 3"/>`+lbl(124,30,'リズムよく',Y); break;
    case 'p_squat': g=room+FIG(fig.squat)+ar('M120 30 L120 78','w',0,1)+lbl(136,56,'上下',Y)+lbl(44,30,'いすに座る',Y)+lbl(44,42,'ように',Y); break;
    case 'p_jump': g=dark+FIG(fig.jump)+ar('M74 80 C92 40 112 40 128 80','w')+'<path d="M44 90 H70 M118 90 H144" stroke="#ffd84a" stroke-width="3"/>'+lbl(56,98,'ふみきり')+lbl(130,98,'着地'); break;
    case 'p_hop': g=dark+FIG(fig.one)+ar('M102 80 C112 60 124 60 136 80','w')+ar('M136 80 C142 66 150 66 156 80','w')+lbl(40,30,'片足で',Y)+lbl(40,42,'ケンケン',Y); break;
    case 's_run': g=`<rect width="160" height="100" rx="10" fill="url(#${u}g)"/><rect x="16" y="16" width="128" height="68" rx="34" fill="none" stroke="#c9634a" stroke-width="12"/><rect x="16" y="16" width="128" height="68" rx="34" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 3"/>`+ar('M92 16 L124 18','w')+pl(80,16)+lbl(80,54,'話せるくらいの',Y)+lbl(80,66,'ペースで15分',Y); break;
    case 's_interval': g=`<rect width="160" height="100" rx="10" fill="url(#${u}g)"/><path d="M50 16 H110 A34 34 0 0 1 110 84 H50 A34 34 0 0 1 50 16Z" fill="none" stroke="#c9634a" stroke-width="12"/><path d="M50 16 H110" stroke="#ffd84a" stroke-width="5"/><path d="M110 84 H50" stroke="#ffd84a" stroke-width="5"/>`+lbl(80,40,'ダッシュ30秒',Y)+lbl(80,64,'ジョグ30秒')+lbl(80,52,'⇅ くり返す'); break;
    case 'b_plank': g=room+FIG(fig.plank)+'<path d="M40 50 L126 72" stroke="#ffd84a" stroke-width="1.6" stroke-dasharray="4 3"/>'+lbl(84,40,'頭からかかとまで まっすぐ',Y); break;
    case 'b_side': g=room+FIG(fig.side)+lbl(104,40,'横向きで',Y)+lbl(104,52,'体を一直線に',Y); break;
    case 'b_one': g=room+FIG(fig.one)+lbl(124,64,'片足で',Y)+lbl(124,76,'ぐらぐらしない',Y); break;
    case 'b_stretch': g=room+FIG(fig.stretch)+ar('M102 48 L120 66','y')+lbl(40,40,'ゆっくり',Y)+lbl(40,52,'20秒のばす',Y); break;
    case 'i_note': g=`<rect width="160" height="100" rx="10" fill="#f2e8d0"/><rect x="40" y="12" width="70" height="80" rx="4" fill="#fffdf6" stroke="#b9a77a" stroke-width="1.5"/><path d="M48 28H102M48 40H102M48 52H98M48 64H92M48 76H96" stroke="#c9d4e8" stroke-width="2"/>`+lbl(70,26,'できたこと','#2b59c3')+`<path d="M108 82 L134 40 L142 45 L116 87Z" fill="#ffd84a" stroke="#7a5a00" stroke-width="1.2"/><path d="M116 87 L112 92 L108 82Z" fill="#3a2a10"/>`; break;
    case 'i_tv': g=`<rect width="160" height="100" rx="10" fill="#2a2140"/><rect x="28" y="12" width="104" height="66" rx="8" fill="#0a1124" stroke="#9aa7bd" stroke-width="3"/><rect x="34" y="18" width="92" height="54" fill="url(#${u}g)"/><path d="M80 18V72" stroke="rgba(255,255,255,.5)"/><circle cx="80" cy="45" r="9" fill="none" stroke="rgba(255,255,255,.5)"/>`+pl(58,36)+pl(100,56,'#e63946')+ball(78,48,3)+'<path d="M66 78 L58 92 M94 78 L102 92" stroke="#9aa7bd" stroke-width="3"/>'+lbl(80,98,'1人の選手を 目で追う',Y); break;
    case 'i_image': g=dark+`<g transform="translate(52 62)"><circle r="18" fill="${sk}" stroke="${OL}" stroke-width="1.6"/><path d="M-18 -2 C-18 -24 18 -24 18 -2 C12 -9 -12 -9 -18 -2Z" fill="${hair}" stroke="${OL}" stroke-width="1.2"/><path d="M-8 4 q3 -3 6 0 M2 4 q3 -3 6 0" stroke="${OL}" stroke-width="1.6" fill="none"/></g><circle cx="80" cy="40" r="3.5" fill="#fff" opacity=".7"/><circle cx="90" cy="30" r="5" fill="#fff" opacity=".85"/><ellipse cx="122" cy="26" rx="30" ry="20" fill="#fff"/><g transform="translate(108 20)">${'<path d="M0 10 L20 10" stroke="#2f8a47" stroke-width="6"/>'}</g>`+ball(116,24,6)+`<path d="M126 20 L138 14" stroke="#ffd84a" stroke-width="2"/>`+lbl(110,94,'ゴールを決める自分を想像',Y); break;
    case 'g_game': g=field+'<rect x="4" y="36" width="8" height="28" fill="#fff"/><rect x="148" y="36" width="8" height="28" fill="#fff"/><path d="M80 4V96" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/><circle cx="80" cy="50" r="13" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/>'+[[40,28],[48,66],[68,46]].map(([x,y])=>pl(x,y)).join('')+[[110,32],[100,66],[126,50]].map(([x,y])=>pl(x,y,'#e63946')).join('')+ball(84,52,4); break;
    case 'g_team': g=field+[[36,28],[36,72],[80,50],[124,28],[124,72]].map(([x,y])=>pl(x,y)).join('')+ar('M44 32 L72 46','y')+ar('M88 46 L116 32','y')+cone(146,50)+lbl(80,96,'声をかけ合って パス',Y); break;
  }
  if(anim&&mp) g+=`<g>${ball(0,0,4.6)}<animateMotion dur="${k.startsWith('l_')?'1.2s':'3s'}" repeatCount="indefinite" path="${mp}"/></g>`;
  return `<svg viewBox="0 0 160 100" class="diag">${defs}${g}</svg>`;
}

/* ===== サッカーの 能力（スポーツ科学の 体力要素で 分類） ===== */
const CATS=[{id:'phy',name:'フィジカル'},{id:'tec',name:'テクニック'},{id:'iq',name:'インテリジェンス'},{id:'game',name:'試合'}];
const SPORT = {
  stats: [
    {id:'speed',  name:'スピード',   g:'phy'},
    {id:'agility',name:'アジリティ', g:'phy'},
    {id:'power',  name:'パワー',     g:'phy'},
    {id:'stamina',name:'スタミナ',   g:'phy'},
    {id:'balance',name:'バランス',   g:'phy'},
    {id:'touch',  name:'ボールタッチ',g:'tec'},
    {id:'dribble',name:'ドリブル',   g:'tec'},
    {id:'kick',   name:'キック',     g:'tec'},
    {id:'iq',     name:'判断力',     g:'iq'},
  ],
  menus: MENUS,
};
const menuOf=id=>SPORT.menus.find(x=>x.id===id);
const statName=id=>(SPORT.stats.find(x=>x.id===id)||{}).name;
const freshStats=()=>Object.fromEntries(SPORT.stats.map(x=>[x.id,0]));
/* のびどき（スキャモンの発育曲線・ゴールデンエイジ）：年齢で 伸びやすい能力が ちがう */
function boostStats(){const a=(S&&S.c&&S.c.age)||10;return a<=12?['touch','dribble','agility','balance']:a<=15?['stamina','speed','kick']:['power','stamina']}

/* ===== 職業（ドラクエの 転職） ===== */
const JOBS=[
  {id:'none',name:'見習い',        short:'—',  stats:[]},
  {id:'fw',  name:'フォワード',    short:'FW', stats:['kick','power','speed']},
  {id:'mf',  name:'ミッドフィルダー',short:'MF', stats:['iq','kick','stamina']},
  {id:'df',  name:'ディフェンダー',short:'DF', stats:['balance','power','stamina']},
  {id:'gk',  name:'ゴールキーパー',short:'GK', stats:['agility','power','balance']},
  {id:'st',  name:'ストライカー',  short:'ST', up:1, stats:['kick','power','speed'],    how:'キック60・パワー55',            ok:s=>rt(s,'kick')>=60&&rt(s,'power')>=55},
  {id:'wg',  name:'ウイング',      short:'WG', up:1, stats:['speed','dribble','agility'],how:'スピード60・ドリブル60',        ok:s=>rt(s,'speed')>=60&&rt(s,'dribble')>=60},
  {id:'fan', name:'ファンタジスタ',short:'FAN',up:1, stats:['touch','dribble','iq'],    how:'ボールタッチ65・ドリブル65・判断力55', ok:s=>rt(s,'touch')>=65&&rt(s,'dribble')>=65&&rt(s,'iq')>=55},
  {id:'cm',  name:'司令塔',        short:'CM', up:1, stats:['iq','kick','touch'],       how:'判断力65・キック60',            ok:s=>rt(s,'iq')>=65&&rt(s,'kick')>=60},
  {id:'dm',  name:'ボランチ',      short:'DM', up:1, stats:['stamina','iq','balance'],  how:'スタミナ60・判断力55・バランス55',ok:s=>rt(s,'stamina')>=60&&rt(s,'iq')>=55&&rt(s,'balance')>=55},
  {id:'cb',  name:'鉄壁ディフェンダー',short:'CB',up:1,stats:['balance','power','iq'], how:'バランス65・パワー60',          ok:s=>rt(s,'balance')>=65&&rt(s,'power')>=60},
  {id:'sg',  name:'守護神',        short:'GK', up:1, stats:['agility','power','balance'],how:'アジリティ65・パワー60・バランス60',ok:s=>rt(s,'agility')>=65&&rt(s,'power')>=60&&rt(s,'balance')>=60},
  {id:'ar',  name:'オールラウンダー',short:'ALL',up:1,all:1,stats:[],                   how:'すべての能力55以上',            ok:s=>SPORT.stats.every(x=>rt(s,x.id)>=55)},
];
const jobOf=s=>JOBS.find(j=>j.id===(s.job||'none'))||JOBS[0];
function jobMult(J,id){if(J.all)return 1.1;return J.stats.includes(id)?(J.up?1.25:1.1):1}

const TITLES = [
  {id:'first',  ic:'👟', name:'はじめの一歩',     how:'初めて練習を記録する',         ok:s=>s.logs.filter(l=>!l.rest).length>=1},
  {id:'lift1',  ic:'🔁', name:'リフティング見習い', how:'リフティング連続10回',         ok:s=>(s.best.lift||0)>=10},
  {id:'lift2',  ic:'🌀', name:'リフティング名人',   how:'リフティング連続50回',         ok:s=>(s.best.lift||0)>=50},
  {id:'lift3',  ic:'👑', name:'リフティング王',     how:'リフティング連続100回',        ok:s=>(s.best.lift||0)>=100},
  {id:'drib1',  ic:'⚡', name:'ドリブラー',        how:'ドリブルが60になる',            ok:s=>rt(s,'dribble')>=60},
  {id:'drib2',  ic:'🌪️', name:'スーパードリブラー', how:'ドリブルが75になる',            ok:s=>rt(s,'dribble')>=75},
  {id:'speed1', ic:'💨', name:'スピードスター',     how:'スピードが60になる',            ok:s=>rt(s,'speed')>=60},
  {id:'agi1',   ic:'🥷', name:'忍者ステップ',       how:'アジリティが60になる',          ok:s=>rt(s,'agility')>=60},
  {id:'pow1',   ic:'💥', name:'パワーキッカー',     how:'パワーが60になる',              ok:s=>rt(s,'power')>=60},
  {id:'run1',   ic:'🦵', name:'鉄の足',            how:'スタミナが60になる',            ok:s=>rt(s,'stamina')>=60},
  {id:'bal1',   ic:'🗿', name:'体幹マスター',       how:'バランスが60になる',            ok:s=>rt(s,'balance')>=60},
  {id:'kick1',  ic:'🎯', name:'キックの名手',       how:'キックが60になる',              ok:s=>rt(s,'kick')>=60},
  {id:'shoot2', ic:'🥅', name:'エースストライカー', how:'シュート10本中8本以上決める',   ok:s=>(s.best.shoot||0)>=8},
  {id:'iq1',    ic:'🧠', name:'ゲームメーカー',     how:'判断力が60になる',              ok:s=>rt(s,'iq')>=60},
  {id:'ovr70',  ic:'💎', name:'ゴールドプレイヤー', how:'総合値が70になる',              ok:s=>ovr(s)>=70},
  {id:'days7',  ic:'📅', name:'コツコツ名人',      how:'合計7日練習する（連続でなくてOK）', ok:s=>practiceDays(s)>=7},
  {id:'days30', ic:'🔥', name:'練習の鬼',          how:'合計30日練習する',              ok:s=>practiceDays(s)>=30},
  {id:'rest',   ic:'🏨', name:'休むのも実力',      how:'宿屋に3回泊まる',               ok:s=>s.logs.filter(l=>l.rest).length>=3},
  {id:'quest10',ic:'📜', name:'クエストハンター',   how:'クエストを10回クリア',          ok:s=>(s.qcount||0)>=10},
  {id:'boss1',  ic:'⚔️', name:'ライバルキラー',     how:'ライバルを1回撃破',             ok:s=>(s.bossWins||0)>=1},
  {id:'boss5',  ic:'🏆', name:'ライバルハンター',   how:'ライバルを5回撃破',             ok:s=>(s.bossWins||0)>=5},
  {id:'fanta',  ic:'✨', name:'魔法の足',          how:'「リフティング名人」と「スーパードリブラー」を取る', ok:s=>has(s,'lift2')&&has(s,'drib2')},
  {id:'ace',    ic:'⭐', name:'チームのエース',     how:'レベル10になる',                ok:s=>lv(s.xp).L>=10},
  {id:'legend', ic:'🐉', name:'レジェンド',        how:'レベル20になる',                ok:s=>lv(s.xp).L>=20},
];
const GEAR = [
  {lv:3,  name:'ヘアバンド'}, {lv:5, name:'ヒーローマント'}, {lv:7, name:'金のスパイク'},
  {lv:10, name:'オーラ'}, {lv:15, name:'王冠'}, {lv:20, name:'翼'},
];
/* スキル＝呪文。条件にコーディネーション能力（定位・変換・連結・反応・識別・リズム・バランス）の考え方を使う */
const SKILLS = [
  {name:'またぎフェイント',  how:'ドリブルを3回練習（リズム）',            ok:s=>cnt(s,'dribble')>=3},
  {name:'ダブルタッチ',      how:'ドリブル60（連結）',                    ok:s=>rt(s,'dribble')>=60},
  {name:'クライフターン',    how:'アジリティ60・ドリブル55（変換）',       ok:s=>rt(s,'agility')>=60&&rt(s,'dribble')>=55},
  {name:'ルーレット',        how:'ドリブル75・ボールタッチ65・バランス60（バランス）', ok:s=>rt(s,'dribble')>=75&&rt(s,'touch')>=65&&rt(s,'balance')>=60},
  {name:'ヒールリフト',      how:'リフティング連続50回（識別）',           ok:s=>(s.best.lift||0)>=50},
  {name:'高速カットイン',    how:'スピード65・アジリティ60（反応）',       ok:s=>rt(s,'speed')>=65&&rt(s,'agility')>=60},
  {name:'インステップキック',how:'シュートを3回練習',                      ok:s=>cnt(s,'shoot')>=3},
  {name:'コントロールシュート',how:'キック65（識別）',                      ok:s=>rt(s,'kick')>=65},
  {name:'ボレーシュート',    how:'キック60・バランス60（連結）',           ok:s=>rt(s,'kick')>=60&&rt(s,'balance')>=60},
  {name:'ワンタッチパス',    how:'パスを5回練習（反応）',                  ok:s=>cnt(s,'pass')>=5},
  {name:'スルーパス',        how:'キック60・判断力65（定位）',             ok:s=>rt(s,'kick')>=60&&rt(s,'iq')>=65},
  {name:'ハードワーカー',    how:'スタミナ65',                            ok:s=>rt(s,'stamina')>=65},
];

/* ===== デイリークエスト ===== */
const QPOOL=[
  {id:'q1', t:'合計30分練習する',          ok:L=>L.reduce((a,l)=>a+l.min,0)>=30},
  {id:'q2', t:'2種類以上の練習をする',      ok:L=>new Set(L.map(l=>l.menu)).size>=2},
  {id:'q3', t:'リフティングの記録をつける', ok:L=>L.some(l=>(menuOf(l.menu)||{}).grp==='lift'&&l.rec!=null)},
  {id:'q4', t:'ドリブルの練習をする',         ok:L=>L.some(l=>(menuOf(l.menu)||{}).grp==='dribble')},
  {id:'q5', t:'フィジカルの練習をする',     ok:L=>L.some(l=>(menuOf(l.menu)||{}).cat==='phy')},
  {id:'q6', t:'体幹・バランスの練習をする',     ok:L=>L.some(l=>(menuOf(l.menu)||{}).grp==='core')},
  {id:'q7', t:'自己ベストを更新する',       ok:L=>L.some(l=>l.pb)},
  {id:'q8', t:'キック・シュートの練習をする',ok:L=>L.some(l=>(menuOf(l.menu)||{}).grp==='kick')},
  {id:'q9', t:'練習ノートを書く',           ok:L=>L.some(l=>l.menu==='note')},
  {id:'q10',t:'スピード・アジリティの練習をする',     ok:L=>L.some(l=>(menuOf(l.menu)||{}).grp==='agi')},
];
function quests(d){let seed=[...d].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);const pool=[...QPOOL],out=[];
  for(let i=0;i<3;i++){seed=(seed*1103515245+12345)>>>0;out.push(pool.splice(seed%pool.length,1)[0])}return out}

/* ===== 今週のライバル（ボス戦） ===== */
const BOSSES=[
  {name:'リフティング魔人',ic:'👹',menu:'lift',   def:20},
  {name:'ドリブルゴーレム',ic:'🗿',menu:'dribble',def:20},
  {name:'シュート竜',      ic:'🐲',menu:'shoot',  def:5},
  {name:'ヨコトビ忍者',    ic:'🥷',menu:'side',   def:30},
  {name:'スピード狼',      ic:'🐺',menu:'dash',   def:10},
  {name:'タイカン巨人',    ic:'🗻',menu:'core',   def:45},
];
const COLORS = ['#e63946','#2b59c3','#21a366','#f28c28','#8e44ad','#222831'];
const SKINS  = ['#ffe0c2','#f1c27d','#c68642','#8d5524'];
const HAIRS  = {m:['さっぱり','ツンツン'], f:['ポニーテール','ボブ']};
const HAIRCOLS = ['#2b1d16','#6b4226','#c98b3c','#1e2a4a'];

/* ===== ショップの アイテム（price＝コイン） ===== */
const BALLS=[
  {id:'b0',name:'クラシック',price:0,base:'#ffffff',pat:'#2d2d35'},
  {id:'b1',name:'レッドボール',price:100,base:'#e63946',pat:'#ffffff'},
  {id:'b2',name:'ネオンボール',price:200,base:'#d7ff3a',pat:'#1d2540',glow:'#d7ff3a'},
  {id:'b3',name:'ブルーフレイム',price:400,base:'#ffffff',pat:'#1f6bff',fire:'#3ad6ff'},
  {id:'b4',name:'ファイアボール',price:400,base:'#ffffff',pat:'#c1121f',fire:'#ff8a00'},
  {id:'b5',name:'ゴールドボール',price:800,base:'#f5c542',pat:'#8a5a00',glow:'#ffd84a'},
];
const BOOTS=[
  {id:'s0',name:'ベーシック',price:0},
  {id:'s1',name:'ホワイト',price:150,col:'#ffffff',acc:'#2b59c3'},
  {id:'s2',name:'レッド',price:150,col:'#e63946',acc:'#ffffff'},
  {id:'s3',name:'ネオングリーン',price:250,col:'#7dff3a',acc:'#1d2540'},
  {id:'s4',name:'ブラック×ゴールド',price:500,col:'#111111',acc:'#f5b301'},
  {id:'s5',name:'ゴールド',price:900,col:'#f5b301',acc:'#ffffff'},
];
const KITS=[
  {id:'k0',name:'マイユニフォーム',price:0},
  {id:'k1',name:'ライトニング',price:300,color:'#111827',color2:'#ffd84a',pattern:5},
  {id:'k2',name:'オーシャン',price:300,color:'#0077b6',color2:'#90e0ef',pattern:6},
  {id:'k3',name:'スターナイト',price:500,color:'#1d2540',color2:'#ffd84a',pattern:7,pants:'#1d2540'},
  {id:'k4',name:'ファイア',price:500,color:'#1a1a1a',color2:'#ff6a00',pattern:8,pants:'#1a1a1a'},
  {id:'k5',name:'ギャラクシー',price:900,color:'#2a0d5e',color2:'#ff7ad9',pattern:6,pants:'#2a0d5e',sock:'#2a0d5e'},
];
const BGS=[
  {id:'g0',name:'ステージの背景',price:0},
  {id:'g1',name:'ナイトスタジアム',price:300,bg:'radial-gradient(circle at 20% 5%,rgba(255,255,255,.6),transparent 20%),radial-gradient(circle at 80% 5%,rgba(255,255,255,.6),transparent 20%),linear-gradient(180deg,#02040c 0%,#0b1d4a 50%,#1f7a3a 50%,#0d3d1c 100%)'},
  {id:'g2',name:'サンセット',price:300,bg:'linear-gradient(180deg,#2b1055 0%,#d53369 40%,#ffb347 60%,#3b2a1a 60%,#120a05 100%)'},
  {id:'g3',name:'さくら',price:400,bg:'radial-gradient(circle at 30% 30%,#ffd1e8 0,transparent 30%),radial-gradient(circle at 75% 20%,#ffb8d9 0,transparent 25%),linear-gradient(180deg,#ffe3f1,#ff8fc2 60%,#a8336b)'},
  {id:'g4',name:'ブルーフレイム',price:600,bg:'repeating-conic-gradient(from 0deg at 50% 40%,rgba(58,214,255,.25) 0 5deg,transparent 5deg 15deg),radial-gradient(circle at 50% 40%,#3ad6ff 0,#0a2470 45%,#02061a 100%)'},
  {id:'g5',name:'ギャラクシー',price:800,bg:'radial-gradient(1.5px 1.5px at 20% 30%,#fff,transparent),radial-gradient(1.5px 1.5px at 70% 20%,#fff,transparent),radial-gradient(2px 2px at 40% 70%,#fff,transparent),radial-gradient(1.5px 1.5px at 85% 60%,#fff,transparent),radial-gradient(circle at 60% 40%,#c86dd7 0,#3a0d6e 40%,#07021a 100%)'},
  {id:'g6',name:'ゴールドラッシュ',price:1200,bg:'repeating-conic-gradient(from 0deg at 50% 40%,rgba(255,255,255,.25) 0 4deg,transparent 4deg 12deg),radial-gradient(circle at 50% 40%,#fff6b0 0,#f5b301 40%,#7a4a00 100%)'},
];
const SHOP=[{cat:'ball',name:'ボール',items:BALLS},{cat:'boot',name:'スパイク',items:BOOTS},{cat:'kit',name:'ユニフォーム',items:KITS},{cat:'bg',name:'背景',items:BGS}];
function wear(s){s.wear=s.wear||{ball:'b0',boot:'s0',kit:'k0',bg:'g0'};s.inv=s.inv||['b0','s0','k0','g0'];return s.wear}
/* 着せ替えを キャラに 反映（over＝試着） */
function dressed(s,over){
  const w={...wear(s),...(over||{})}, c=norm(s.c);
  const k=KITS.find(x=>x.id===w.kit);
  if(k&&k.pattern!=null){c.color=k.color;c.color2=k.color2;c.pattern=k.pattern;if(k.pants)c.pants=k.pants;if(k.sock)c.sock=k.sock}
  const b=BOOTS.find(x=>x.id===w.boot); if(b&&b.col)c.bootOv=b;
  c.ballT=BALLS.find(x=>x.id===w.ball)||BALLS[0];
  return c;
}

/* ===== アプリ内ダイアログ（ブラウザ標準の alert/confirm は使わない） ===== */
const APP_VERSION='0.6.7';
function closeOv(){document.getElementById('ov').classList.remove('show')}
function dialog({icon='',title,msg='',ok='OK',cancel=null,danger=false}){
  return new Promise(res=>{
    const box=document.getElementById('ovbox');
    box.innerHTML=`${icon?`<div class="star">${icon}</div>`:''}<h2 style="font-size:22px">${title}</h2>${msg?`<p class="sub" style="line-height:1.7">${msg}</p>`:''}
      <button class="btn ${danger?'danger':'gold'}" id="dlok">${ok}</button>${cancel?`<button class="btn ghost" id="dlno" style="margin-top:10px">${cancel}</button>`:''}`;
    document.getElementById('ov').classList.add('show');
    document.getElementById('dlok').onclick=()=>{closeOv();res(true)};
    if(cancel)document.getElementById('dlno').onclick=()=>{closeOv();res(false)};
  });
}
/* 保護者の確認（子ども向けアプリのストア審査で必要。データ操作・外部リンク・購入の前に使う） */
function parentGate(){
  const a=6+Math.floor(Math.random()*4), b=6+Math.floor(Math.random()*4);
  return new Promise(res=>{
    const box=document.getElementById('ovbox');
    box.innerHTML=`<div class="star">🔐</div><h2 style="font-size:20px">保護者の方へ</h2><p class="sub" style="line-height:1.7">この先は保護者の方が操作してください。<br>次の答えを入力してください。</p>
      <p style="font-size:30px;font-weight:900;margin:8px 0">${a} × ${b} ＝ ？</p><input type="number" id="pgv" inputmode="numeric" style="margin-bottom:12px">
      <button class="btn gold" id="pgok">確認</button><button class="btn ghost" id="pgno" style="margin-top:10px">やめる</button><p class="sub" id="pgmsg" style="color:#ff8a8a;min-height:1em"></p>`;
    document.getElementById('ov').classList.add('show');
    document.getElementById('pgok').onclick=()=>{if(+document.getElementById('pgv').value===a*b){closeOv();res(true)}else document.getElementById('pgmsg').textContent='答えがちがいます'};
    document.getElementById('pgno').onclick=()=>{closeOv();res(false)};
  });
}

/* ===== はじめての人向けの 遊び方 ===== */
const TUT=[
  {ic:'⚽',b:'smile',t:'練習を記録しよう',m:'ボクは相棒のボルト！ 練習したら「れんしゅう」から記録。経験値（EXP）がたまってレベルが上がり、能力が伸びていくよ。'},
  {ic:'🏟️',b:'joy',t:'カードが進化する',m:'レベルが上がると、おうちの庭 → 公園 → チーム → トレセン …そしてワールドクラスへ！'},
  {ic:'📜',b:'serious',t:'クエストとライバル',m:'毎日3つのクエストと、週替わりのライバルに挑戦。クリアするとボーナスがもらえるよ。'},
  {ic:'🪙',b:'chest',t:'コインでショップ',m:'練習するとコインがたまる。ショップでボールやスパイクと交換して、着せ替えしよう。'},
  {ic:'🏨',b:'sleep',t:'休むのも練習',m:'HPが減ったら宿屋で休もう。体は休んでいる間に強くなる。目標は週4日の練習だよ。'},
];
function showTutorial(i=0){
  const T=TUT[i], box=document.getElementById('ovbox');
  box.innerHTML=`<div class="star">${boltImg(T.b,'big')}</div><h2 style="font-size:22px">${T.ic} ${T.t}</h2><p style="line-height:1.8">${T.m}</p>
    <div class="tutdots">${TUT.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
    <button class="btn gold" id="tutnext">${i<TUT.length-1?'つぎへ':'はじめる！'}</button>`;
  document.getElementById('ov').classList.add('show');
  document.getElementById('tutnext').onclick=()=>{if(i<TUT.length-1)showTutorial(i+1);else{closeOv();S.tut=1;save()}};
}

/* ===== バックアップ（機種変更やブラウザのデータ消去に備える） ===== */
async function exportData(){
  if(!await parentGate())return;
  const blob=new Blob([JSON.stringify({app:'renshu-quest',v:1,date:new Date().toISOString(),data:S})],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`renshu-quest-backup-${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  dialog({icon:'💾',title:'バックアップを保存しました',msg:'ファイルは大切に保管してください。'});
}
async function importData(){
  if(!await parentGate())return;
  const inp=document.createElement('input'); inp.type='file'; inp.accept='application/json,.json';
  inp.onchange=async()=>{
    const f=inp.files[0]; if(!f)return;
    try{
      const j=JSON.parse(await f.text());
      if(j.app!=='renshu-quest'||!j.data||!j.data.c)throw 0;
      if(!await dialog({icon:'📥',title:'バックアップを読みこむ？',msg:'今の記録は上書きされます。元には戻せません。',ok:'読みこむ',cancel:'やめる',danger:true}))return;
      S=j.data; save(); load(); go('home'); dialog({icon:'✅',title:'読みこみました'});
    }catch(e){dialog({icon:'⚠️',title:'読みこめませんでした',msg:'れんしゅうクエストのバックアップファイルを選んでね。'})}
  };
  inp.click();
}

/* ===== 効果音・振動（音声ファイルなし。Web Audio で その場で鳴らす） ===== */
let AC=null;
function sfx(kind){
  if(!S||S.sound===false)return;
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    const N={ok:[[660,.08],[880,.12]],coin:[[988,.06],[1319,.14]],level:[[523,.1],[659,.1],[784,.1],[1047,.3]],stage:[[392,.12],[523,.12],[659,.12],[784,.12],[1047,.45]]}[kind]||[[880,.05]];
    let t=AC.currentTime;
    N.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;
      g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
      o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.03);t+=d*.9});
    if(navigator.vibrate)navigator.vibrate(kind==='level'||kind==='stage'?[30,40,70]:15);
  }catch(e){}
}
async function openPrivacy(){if(await parentGate())location.href='privacy.html'}

/* ===== 宝箱でしか手に入らない レアアイテム ===== */
BALLS.push({id:'b6',name:'レインボーボール',price:-1,rare:1,base:'#ff8ad8',pat:'#ffffff',glow:'#7be3ff'});
BOOTS.push({id:'s6',name:'クリスタル',price:-1,rare:1,col:'#a8e6ff',acc:'#ffffff'});
KITS.push({id:'k6',name:'レジェンド',price:-1,rare:1,color:'#0b0b0b',color2:'#f5b301',pattern:6,pants:'#0b0b0b'});
BGS.push({id:'g7',name:'オーロラ',price:-1,rare:1,bg:'radial-gradient(1.5px 1.5px at 25% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 75% 30%,#fff,transparent),linear-gradient(170deg,#04101f 0%,#0b4d4a 35%,#3ee08f 50%,#7b5cff 70%,#04101f 100%)'});
const CHEST_ITEMS=[['ball','b6'],['boot','s6'],['kit','k6'],['bg','g7']];
/* AIイラストの新商品（img/items/ に画像） */
BALLS.push({id:'b7',name:'ナイトスカイ',price:600,base:'#2a1f6b',pat:'#ffd84a',glow:'#8a7bff'},
           {id:'b8',name:'サンダーボール',price:600,base:'#1d2540',pat:'#7be3ff',glow:'#3ad6ff'},
           {id:'b9',name:'アイスクリスタル',price:700,base:'#bfe9ff',pat:'#5aa8d8',glow:'#bfe9ff'});
BOOTS.push({id:'s7',name:'ブルーフレイム',price:600,col:'#1f5fd6',acc:'#7be3ff'},
           {id:'s8',name:'サンダー',price:600,col:'#1d2540',acc:'#7be3ff'},
           {id:'s9',name:'レインボー',price:800,col:'#ff5fd2',acc:'#ffd84a'});
KITS.push({id:'k7',name:'チームカラー',price:200,color:'#1d2a6b',color2:'#5fb3ff',pattern:4},
          {id:'k8',name:'白×赤たすき',price:300,color:'#ffffff',color2:'#e63946',pattern:4},
          {id:'k9',name:'赤白ストライプ',price:300,color:'#e63946',color2:'#ffffff',pattern:1},
          {id:'k10',name:'グリーンボーダー',price:300,color:'#21a366',color2:'#ffffff',pattern:2});
const ITEM_IMG={b0:'ball-1',b1:'ball-2',b2:'ball-3',b3:'ball-4',b4:'ball-5',b5:'ball-6',b6:'ball-7',b7:'ball-8',b8:'ball-9',b9:'ball-10',
  s0:'boot-1',s1:'boot-2',s2:'boot-3',s3:'boot-4',s4:'boot-5',s5:'boot-6',s6:'boot-7',s7:'boot-8',s8:'boot-9',s9:'boot-10',
  k1:'kit-2',k2:'kit-3',k3:'kit-4',k4:'kit-5',k5:'kit-6',k6:'kit-9',k7:'kit-1',k8:'kit-7',k9:'kit-8',k10:'kit-10'};
[...BALLS,...BOOTS,...KITS].forEach(it=>{if(ITEM_IMG[it.id])it.img=`img/items/${ITEM_IMG[it.id]}.webp`});
BOOTS.find(x=>x.id==='s1').name='ホワイト×ブルー';
/* 月間チャレンジロードの 限定背景（毎月ちがう） */
const MONTH_BG=[
  ['お正月','linear-gradient(180deg,#b3001b,#ffcf5a 55%,#7a0010)'],['ゆきぐに','linear-gradient(180deg,#a9c9ff,#ffffff 60%,#c7d7ef)'],
  ['ひなまつり','linear-gradient(180deg,#ffb3d1,#fff0f5 55%,#7bbf6a)'],['はるかぜ','linear-gradient(180deg,#9fe0ff,#fff7c2 55%,#8fd36b)'],
  ['しんりょく','linear-gradient(180deg,#5fd38b,#e6ffd9 55%,#2e8b57)'],['あじさい','linear-gradient(180deg,#6a7bd8,#c9a7ff 55%,#3c4a99)'],
  ['なつまつり','radial-gradient(circle at 50% 30%,#ffd84a 0,#ff6a00 35%,#2b0a3d 75%)'],['はなび','radial-gradient(circle at 30% 30%,#ff5fd2 0,transparent 25%),radial-gradient(circle at 70% 25%,#7be3ff 0,transparent 25%),linear-gradient(180deg,#05061a,#1b1450)'],
  ['おつきみ','radial-gradient(circle at 70% 25%,#fff6c2 0,#ffd84a 10%,transparent 12%),linear-gradient(180deg,#0b1030,#27306b 60%,#3a2a10)'],['ハロウィン','radial-gradient(circle at 50% 35%,#ff8a00 0,#5a1a6b 55%,#0b0410)'],
  ['もみじ','linear-gradient(180deg,#ffb347,#e2532d 55%,#5a1a0b)'],['クリスマス','radial-gradient(1.5px 1.5px at 20% 30%,#fff,transparent),radial-gradient(1.5px 1.5px at 70% 20%,#fff,transparent),linear-gradient(180deg,#0b3d1f,#c1121f 70%,#f5f5f5)'],
];
MONTH_BG.forEach(([n,bg],i)=>BGS.push({id:'m'+(i+1),name:`${i+1}月限定：${n}`,price:-1,season:1,bg}));
const ROAD_STEP=120, ROAD_TIERS=10;
function roadReward(n){return n===ROAD_TIERS?{bg:'m'+(new Date().getMonth()+1)}:n===5?{chest:1}:{coin:10+n*10}}
function season(){const m=today().slice(0,7);if(!S.season||S.season.m!==m)S.season={m,xp:0,tier:0};return S.season}

/* ===== 相棒キャラ「ボルト」 ===== */
function buddySVG(){return `<svg viewBox="0 0 60 60" class="buddy"><defs><radialGradient id="bdg" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#cfd8ea"/></radialGradient></defs>
  <path d="M10 26 Q2 18 6 10 Q12 18 16 20Z M50 26 Q58 18 54 10 Q48 18 44 20Z" fill="#f3dc8f" stroke="#8a6a1b" stroke-width="1.5"/>
  <circle cx="30" cy="32" r="20" fill="url(#bdg)" stroke="#2d2d35" stroke-width="2"/><path d="M30 18 l6 4.4 -2.3 7 h-7.4 l-2.3 -7z" fill="#2d2d35"/>
  <ellipse cx="23" cy="36" rx="3.2" ry="4" fill="#1a1020"/><ellipse cx="37" cy="36" rx="3.2" ry="4" fill="#1a1020"/><circle cx="24" cy="34.5" r="1.2" fill="#fff"/><circle cx="38" cy="34.5" r="1.2" fill="#fff"/>
  <path d="M25 44 Q30 48 35 44" stroke="#1a1020" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="18" cy="42" rx="3" ry="1.8" fill="#ff8a8a" opacity=".6"/><ellipse cx="42" cy="42" rx="3" ry="1.8" fill="#ff8a8a" opacity=".6"/></svg>`}
let buddyIdx=0;
/* ボルトの表情イラスト（img/bolt/bolt-1〜10）。f＝表情番号 */
const BOLT={smile:1,joy:2,wink:3,cheer:4,wow:5,sleep:6,worry:7,serious:8,chest:9,trophy:10};
const boltImg=(f,cls)=>`<img class="boltimg ${cls||''}" src="img/bolt/bolt-${BOLT[f]||f}.webp" alt="ボルト">`;
function buddyLines(){
  const L=[], hp=Math.round(S.hp??100), td=S.logs.filter(l=>l.date===today()&&!l.rest), wd=weekDays(), st=streak(), nm=esc(norm(S.c).name);
  const rested=S.logs.some(l=>l.date===today()&&l.rest);
  const q=quests(today()).find(x=>!((S.qd&&S.qd[today()])||[]).includes(x.id));
  if(S.charmUsed===today()) L.push({f:'wink',t:'きのうはお休みだったけど、お守りが連続記録を守ってくれたよ！'});
  if(hp<25) L.push({f:'worry',t:'つかれてるみたい…。今日は宿屋でゆっくり休もう。休むのも練習だよ！'});
  if(rested) L.push({f:'sleep',t:'今日は宿屋でおやすみ…。しっかり休んで、明日またがんばろう。'});
  const pend=chestsPending(); if(pend) L.push({f:'chest',t:`宝箱が${pend}個あるよ！ 開けてみて！`});
  if(td.length) L.push({f:'joy',t:`${nm}選手、今日もナイス練習！ 明日もいっしょにがんばろう！`});
  else if(!rested) L.push({f:'serious',t:q?`今日はなにを練習する？ クエスト「${q.t}」に挑戦してみよう！`:`${nm}選手、今日はどんな練習をする？`});
  if(S.boss&&!S.boss.beaten) L.push({f:'wow',t:`今週のライバル「${BOSSES[S.boss.idx].name}」が待ってるよ！`});
  if(wd>=WEEK_GOAL) L.push({f:'trophy',t:'今週の目標達成！ キミは最高だ！'});
  else if(wd>0) L.push({f:'cheer',t:`あと${WEEK_GOAL-wd}日で今週の目標達成だよ！`});
  if(st>=3) L.push({f:'cheer',t:`${st}日連続！ その調子！`});
  const sp=season(), nxt=Math.min(ROAD_TIERS,sp.tier+1);
  if(sp.tier<ROAD_TIERS) L.push({f:'smile',t:`チャレンジロードの次の報酬まで、あと${nxt*ROAD_STEP-sp.xp} EXP！`});
  L.push({f:'smile',t:'ボクはボルト。キミの練習をずっと応援してるよ！'});
  return L;
}
function buddyNext(){
  buddyIdx++; const L=buddyLines(), x=L[buddyIdx%L.length];
  document.querySelector('.buddycard .bubble').innerHTML=x.t;   // 名前は buddyLines で esc ずみ
  const im=document.querySelector('.buddycard .boltimg'); im.src=`img/bolt/bolt-${BOLT[x.f]}.webp`;
  im.classList.remove('hop'); void im.offsetWidth; im.classList.add('hop');
}
function buddyCard(){const L=buddyLines(), x=L[buddyIdx%L.length];
  return `<div class="buddycard" onclick="buddyNext()">${boltImg(x.f,'hop')}<div class="bubble">${x.t}</div></div>`}

/* ===== 宝箱（練習60分ごとに1個。中身はランダム） ===== */
const totalMin=()=>S.logs.filter(l=>!l.rest).reduce((a,l)=>a+(l.min||0),0);
const chestsPending=()=>Math.max(0,Math.floor(totalMin()/60)+(S.bonusChest||0)-(S.chestOpened||0));
function chestCard(){
  const p=chestsPending(), rest=60-totalMin()%60;
  return `<div class="card chestcard"><div class="row"><span class="chestic ${p?'shake':''}">🎁</span><div style="flex:1"><h3>${p?`宝箱が ${p}個 あるよ！`:'宝箱'}</h3><p class="sub" style="margin:4px 0 0">${p?'タップして開けよう':`練習あと${rest}分で 宝箱をゲット`}</p></div>${p?'<button class="btn gold" id="chestopen" style="width:auto;padding:10px 18px">開ける</button>':''}</div></div>`;
}
function openChest(){
  if(!chestsPending())return;
  S.chestOpened=(S.chestOpened||0)+1; S.inv=S.inv||[];
  const r=Math.random(), notOwned=CHEST_ITEMS.filter(([c,id])=>!S.inv.includes(id));
  let html;
  if(r<.12&&notOwned.length){const [cat,id]=notOwned[Math.floor(Math.random()*notOwned.length)], it=SHOP.find(x=>x.cat===cat).items.find(x=>x.id===id);
    S.inv.push(id); html=`<div class="rare">★ レアアイテム ★</div><div class="bigicon">${itemIcon(cat,it)}</div><p><b>${it.name}</b> を手に入れた！</p><p class="sub">宝箱でしか手に入らないよ。着せ替えで使ってみよう</p>`; sfx('stage')}
  else {const c=r<.45?30+Math.floor(Math.random()*4)*10:r<.85?60+Math.floor(Math.random()*5)*10:150;
    S.coin=(S.coin||0)+c; html=`<div class="bigcoin">🪙</div><p style="font-size:26px;font-weight:900;margin:6px 0">${c} コイン</p>${c>=150?'<p class="rare">大当たり！</p>':''}`; sfx('coin')}
  save();
  const box=document.getElementById('ovbox');
  box.innerHTML=`<div class="chestopen">${boltImg('chest','big')}</div><h2>宝箱を開けた！</h2>${html}<button class="btn gold" id="chestok">${chestsPending()?'次の宝箱を開ける':'やったね！'}</button>`;
  document.getElementById('ov').classList.add('show');
  document.getElementById('chestok').onclick=()=>{if(chestsPending())openChest();else{closeOv();render()}};
}

/* ===== 月間チャレンジロード（毎月リセット。報酬は練習で必ずもらえる） ===== */
function roadCard(){
  const sp=season(), d=new Date(), left=new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate();
  const nxt=Math.min(ROAD_TIERS,sp.tier+1), rw=roadReward(nxt), bgi=BGS.find(x=>x.id==='m'+(d.getMonth()+1));
  return `<div class="card roadcard"><h3>🛣️ ${d.getMonth()+1}月のチャレンジロード <span class="sub">${sp.tier}/${ROAD_TIERS}</span></h3>
    <div class="road">${Array.from({length:ROAD_TIERS},(_,i)=>`<i class="${i<sp.tier?'on':''} ${i===ROAD_TIERS-1?'goal':''}">${i===ROAD_TIERS-1?'👑':i===4?'🎁':''}</i>`).join('')}</div>
    ${sp.tier<ROAD_TIERS?`<p class="sub" style="margin:8px 0 0">次の報酬：<b style="color:var(--gold2)">${rw.bg?'限定背景「'+bgi.name+'」':rw.chest?'宝箱':'🪙'+rw.coin}</b>（あと${nxt*ROAD_STEP-sp.xp} EXP）</p>`:'<p class="sub" style="margin:8px 0 0">🎉 今月のロード完走！ 来月も新しい限定背景が待ってるよ</p>'}
    <p class="sub" style="margin:2px 0 0">ゴールの報酬：限定背景「${bgi.name}」　（今月はあと${left}日）</p></div>`;
}
function roadGain(xp,notes){
  const sp=season(); sp.xp+=xp; let c=0;
  while(sp.tier<ROAD_TIERS&&sp.xp>=(sp.tier+1)*ROAD_STEP){
    sp.tier++; const r=roadReward(sp.tier);
    if(r.coin)c+=r.coin;
    if(r.chest){S.bonusChest=(S.bonusChest||0)+1;notes.push('🛣️ チャレンジロード報酬：宝箱 ×1')}
    if(r.bg){S.inv=S.inv||[];if(!S.inv.includes(r.bg))S.inv.push(r.bg);notes.push(`🛣️ ロード完走！ 限定背景「${BGS.find(x=>x.id===r.bg).name}」をゲット`)}
  }
  if(c)notes.push(`🛣️ チャレンジロード報酬：🪙${c}`);
  return c;
}

/* ===== お守り（1日休んでも 連続記録を守る。週の目標を達成すると +1） ===== */
function dailyCheck(){
  if(S.dcheck===today())return; S.dcheck=today();
  if(S.charm==null)S.charm=1;
  const y=new Date();y.setDate(y.getDate()-1);const y2=new Date();y2.setDate(y2.getDate()-2);
  const days=new Set([...S.logs.map(l=>l.date),...(S.frozen||[])]);
  if(!days.has(ds(y))&&days.has(ds(y2))&&S.charm>0){S.charm--;S.frozen=[...(S.frozen||[]),ds(y)];S.charmUsed=today()}
  // 週のふりかえり（月曜はじめに 先週のまとめ）
  const lastW=new Date(mondayOf(new Date()));lastW.setDate(lastW.getDate()-7);const a=ds(lastW),e=new Date(lastW);e.setDate(e.getDate()+6);const b=ds(e);
  const L=S.logs.filter(l=>l.date>=a&&l.date<=b);
  if(S.recapWeek!==weekKey()&&L.length){S.recapWeek=weekKey();S.recapPending={a,b,days:new Set(L.filter(l=>!l.rest).map(l=>l.date)).size,min:L.reduce((t,l)=>t+(l.min||0),0),xp:L.reduce((t,l)=>t+(l.xp||0),0),pb:L.filter(l=>l.pb).length,rest:L.filter(l=>l.rest).length}}
  save();
}
function showRecap(){
  const R=S.recapPending; if(!R)return; S.recapPending=null; save();
  const msg=R.days>=WEEK_GOAL?'目標の週4日を達成！ 最高の1週間だったね！':R.days>=2?'しっかり練習できたね。今週はもう1日ふやしてみよう！':'今週はクエストをひとつずつクリアしていこう！';
  const box=document.getElementById('ovbox');
  box.innerHTML=`<div class="star">${boltImg(R.days>=WEEK_GOAL?'trophy':'cheer','big')}</div><h2 style="font-size:22px">先週のふりかえり</h2><p class="sub">${R.a.slice(5).replace('-','/')} 〜 ${R.b.slice(5).replace('-','/')}</p>
    <div class="recap"><div><b>${R.days}</b><span>練習した日</span></div><div><b>${R.min}</b><span>練習（分）</span></div><div><b>${R.xp}</b><span>EXP</span></div><div><b>${R.pb}</b><span>自己ベスト</span></div></div>
    <p style="line-height:1.7">${msg}</p><button class="btn gold" id="rcok">今週もがんばる！</button>`;
  document.getElementById('ov').classList.add('show');
  document.getElementById('rcok').onclick=closeOv;
}

/* ===== 紙吹雪（レベルアップの演出） ===== */
function confetti(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const c=document.createElement('div');c.className='confetti';
  const cols=['#f3dc8f','#d4af37','#7be3ff','#ff8ad8','#7be3a6','#fff'];
  c.innerHTML=Array.from({length:40},(_,i)=>`<i style="left:${Math.random()*100}%;background:${cols[i%cols.length]};animation-delay:${Math.random()*.5}s;animation-duration:${1.6+Math.random()*1.2}s;transform:rotate(${Math.random()*360}deg)"></i>`).join('');
  document.body.appendChild(c); setTimeout(()=>c.remove(),3500);
}

/* ===== データ保存 ===== */
const KEY='renshu-quest-v1';
let S=null, tab='home', draft={menu:null,min:15,rec:''};
function load(){try{const t=localStorage.getItem(KEY);if(t)S=JSON.parse(t)}catch(e){}
  if(!S)return;
  S.ver=S.ver||2;
  const st=S.stats||{};
  if(st.lift!=null&&st.touch==null) S.stats={...freshStats(),dribble:st.dribble||0,touch:st.lift||0,kick:(st.shoot||0)+(st.pass||0),stamina:st.stamina||0};
  else S.stats={...freshStats(),...st};
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const need=L=>40+L*20;
function lv(xp){let L=1,r=xp;while(r>=need(L)){r-=need(L);L++}return{L,r,n:need(L)}}
const has=(s,id)=>s.titles.includes(id);
/* のうりょく値：40からスタート、3ポイントで +1（最大99） */
const rt=(s,id)=>Math.min(99,40+Math.floor(s.stats[id]/3));
const ovr=s=>Math.round(SPORT.stats.reduce((a,x)=>a+rt(s,x.id),0)/SPORT.stats.length);
const cnt=(s,m)=>s.logs.filter(l=>l.menu===m||(menuOf(l.menu)||{}).grp===m).length;
const ratings=s=>Object.fromEntries(SPORT.stats.map(x=>[x.id,rt(s,x.id)]));
function position(s){return jobOf(s).name}
function radar(s){
  const N=SPORT.stats.length,R=74,cx=110,cy=102;
  const pt=(i,r)=>{const a=-Math.PI/2+i*2*Math.PI/N;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]};
  let g='';
  [1,.66,.33].forEach(f=>g+=`<polygon points="${SPORT.stats.map((_,i)=>pt(i,R*f).join(',')).join(' ')}" fill="none" stroke="#22304d" stroke-width="2"/>`);
  const vals=SPORT.stats.map((x,i)=>pt(i,Math.max(.12,(rt(s,x.id)-30)/69)*R).join(','));
  g+=`<polygon points="${vals.join(' ')}" fill="rgba(0,212,255,.25)" stroke="#00d4ff" stroke-width="3" stroke-linejoin="round"/>`;
  SPORT.stats.forEach((x,i)=>{const [px,py]=pt(i,R+20);g+=`<text x="${px}" y="${py-5}" text-anchor="middle" dominant-baseline="middle" font-size="10.5" font-weight="700" fill="#cfe0ff">${x.name}</text><text x="${px}" y="${py+8}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="800" fill="#00d4ff">${rt(s,x.id)}</text>`});
  return `<svg viewBox="-30 -10 280 230" style="width:100%;max-width:340px;display:block;margin:0 auto">${g}</svg>`;
}
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const practiceDays=s=>new Set(s.logs.filter(l=>!l.rest).map(l=>l.date)).size;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===== キャラクター ===== */
const HAIRSTYLES=['さっぱり','ツンツン','マッシュ','ぼうず','ポニーテール','ツインテール','ボブ','ロング'];
const DEF={avatar:'',age:10,sex:'m',skin:'#ffe0c2',build:1,face:0,brow:0,mouth:0,cheek:0,eye:0,eyeCol:'#5a3522',eyeSize:1,lash:0,
  hair:0,hairColor:'#2b1d16',tip:'',color:'#2b59c3',color2:'#ffffff',pattern:0,num:10,pants:'#ffffff',sock:'',bootCol:'#2d2d35',acc:0};
function norm(c){
  c=c||{};
  const o={...DEF,...c};
  if(!c.v){ if(c.sex==='f'){o.hair=((c.hair||0)%2)?6:4;o.lash=1} else o.hair=(c.hair||0)%2; o.v=2 }
  return o;
}
const MIR=x=>`<g transform="translate(200 0) scale(-1 1)">${x}</g>`;

/* 成長ステージ：レベルで かいほう。ステージが上がるほど 舞台と ポーズが かっこよくなる */
const STAGES=[
  {lv:1,  name:'おうちの庭',  bg:'linear-gradient(180deg,#5fb3ff 0%,#bfe6ff 52%,#58b04a 52%,#2f7d2a 100%)'},
  {lv:3,  name:'公園', bg:'linear-gradient(180deg,#ff9a5a 0%,#ffd9a8 50%,#7cc35b 50%,#3f8a3a 100%)'},
  {lv:6,  name:'チーム入団', bg:'linear-gradient(180deg,#2a6fdb 0%,#9ccaff 48%,#c9a46a 48%,#8b6a3a 100%)'},
  {lv:10, name:'トレセン',       bg:'linear-gradient(180deg,#0e2a5a 0%,#2d5fa8 48%,#2fa84f 48%,#1d6b33 100%)'},
  {lv:15, name:'県代表',  bg:'linear-gradient(180deg,#050b1f 0%,#14306b 50%,#2f9e4f 50%,#155c2b 100%)'},
  {lv:21, name:'地方代表', bg:'linear-gradient(180deg,#0b0620 0%,#3a1f73 50%,#2f9e4f 50%,#155c2b 100%)'},
  {lv:28, name:'日本代表', bg:'radial-gradient(circle at 50% 38%,#4a8dff 0,#0b2a8a 45%,#030a2a 100%)'},
  {lv:36, name:'ワールドクラス',   bg:'radial-gradient(circle at 50% 38%,#fff3a0 0,#ff9d00 30%,#7a1f00 65%,#120400 100%)'},
];
const POSE_OF=[0,0,1,1,2,3,3,4];
function stageOf(L){let r=0;STAGES.forEach((x,i)=>{if(L>=x.lv)r=i});return r}
/* 画像（img/m1_3.png など）が あれば それを、なければ コードの イラストを ひょうじ */
/* ===== AIイラストのキャラ（選んで使う） ===== */
const AVATARS=[
  {id:'idea-1',name:'ツンツン',sex:'m'},{id:'idea-2',name:'ブロンド',sex:'m'},{id:'idea-3',name:'メガネ',sex:'m'},
  {id:'idea-4',name:'あか髪',sex:'m'},{id:'idea-5',name:'ぎん髪',sex:'m'},{id:'idea-11',name:'ちゃ髪',sex:'m'},
  {id:'idea-6',name:'ポニーテール',sex:'f'},{id:'idea-7',name:'ロング',sex:'f'},{id:'idea-8',name:'ふわふわ',sex:'f'},
  {id:'idea-9',name:'みつあみ',sex:'f'},{id:'idea-10',name:'おだんご',sex:'f'},
];
/* ステージ別の絵（img/chars/idea-1_3.png など）があればそれを、なければ基本の絵を使う。足元に装備中のボール */
function avatarView(c,L,i){
  const B=c.ballT||BALLS[0], u='av'+(UID++), O='stroke="#3d2b24" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const vb=B.fire?'100 150 80 76':'136 184 44 44';
  const av=`<div class="avwrap"><img class="avimg" src="img/chars/${c.avatar}_${i+1}.webp" onerror="this.onerror=null;this.src='img/chars/${c.avatar}.webp';this.parentNode.classList.add('base')" alt="">`;
  if(B.img)return av+`<img class="avball" src="${B.img}" alt=""></div>`;
  return av+
    `<svg class="avball ${B.fire?'fire':''}" viewBox="${vb}"><defs><filter id="${u}g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${ballSVG(B,u,O)}</svg></div>`;
}
function charView(c,L,i){
  if(c.avatar)return avatarView(c,L,i);
  const a=(c.sex==='f'?'f':'m')+'1';
  return `<img src="img/${a}_${i+1}.png" alt="" onload="this.style.display='block';if(this.nextElementSibling)this.nextElementSibling.remove()" onerror="this.remove()">${charSVG(c,L,POSE_OF[i])}`;
}
/* a:[左うで,右うで]の角度  g:[左あし,右あし]の角度  y:ジャンプ  ball:ボールの位置 */
const POSES=[
  {a:[8,-8],    g:[0,0],     y:0,   ball:[158,206]},  // N  たちポーズ
  {a:[12,-150], g:[0,0],     y:0,   ball:[44,208]},   // R  ガッツポーズ
  {a:[55,-35],  g:[0,-42],   y:0,   ball:[176,176]},  // SR シュート
  {a:[145,-145],g:[6,-6],    y:0,   ball:[40,208]},   // UR バンザイ
  {a:[75,-125], g:[28,-62],  y:-16, ball:[182,150]},  // LR ジャンプボレー
];
const EYEROT=[0,-14,14,0];
const BROWS=[{d:'M-8 1 Q0 -3 9 0',w:3},{d:'M-8 3 L9 -3',w:3.5},{d:'M-8 -2 Q0 -1 9 3',w:3},{d:'M-8 1 Q0 -4 9 0',w:6}];
let UID=0;

function charSVG(cIn,L,poseIdx){
  const c=norm(cIn), u='k'+(UID++), P=POSES[poseIdx||0];
  const O='stroke="#3d2b24" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const sk=c.skin, col=c.color, c2=c.color2, sock=c.sock||col, boot=c.bootOv?c.bootOv.col:(L>=7?'#f5b301':c.bootCol), bac=c.bootOv?c.bootOv.acc:'';
  const hf=c.tip?`url(#${u}h)`:c.hairColor;
  const bw=[0.9,1,1.12][c.build];
  let h=`<defs><radialGradient id="${u}a"><stop offset="0" stop-color="#ffe680" stop-opacity=".95"/><stop offset="1" stop-color="#ffe680" stop-opacity="0"/></radialGradient>
    <linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="${c.hairColor}"/><stop offset="1" stop-color="${c.tip||c.hairColor}"/></linearGradient>
    <filter id="${u}g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.color}"/><stop offset="1" stop-color="${c.color2}"/></linearGradient><clipPath id="${u}t"><path d="M76 120 Q100 112 124 120 L132 160 Q100 166 68 160Z"/></clipPath></defs>`;
  if(L>=10) h+=`<circle class="aura" cx="100" cy="128" r="104" fill="url(#${u}a)"/>`;
  h+=`<ellipse cx="100" cy="226" rx="${P.y?38:52}" ry="7" fill="#000" opacity=".15"/>`;
  h+=`<g transform="translate(0 ${P.y})"><g class="bob">`;
  // つばさ・マント
  if(L>=20){const w=`<path d="M80 134 C42 104 16 114 8 86 C26 98 30 80 46 92 C40 74 56 74 62 90 C64 78 78 84 82 114Z" fill="#fff" stroke="#b9c6e8" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 96 Q50 104 70 118 M50 90 Q62 102 76 120" stroke="#c9d3ee" stroke-width="2" fill="none"/>`;h+=w+MIR(w)}
  if(L>=5) h+=`<path d="M70 124 Q58 172 46 214 Q100 226 154 214 Q142 172 130 124Z" fill="#c1121f" ${O}/><path d="M100 128 Q104 180 110 220 Q130 220 154 214 Q142 172 130 124Z" fill="#000" opacity=".15"/>`;
  // うしろ髪
  h+=hairBack(c,hf,O);
  // からだ
  const leg=`<rect x="82" y="166" width="14" height="32" rx="5" fill="${sk}" ${O}/><rect x="81" y="186" width="16" height="22" rx="4" fill="${sock}" ${O}/><rect x="82" y="191" width="14" height="4" fill="${c2}"/><path d="M75 212 Q75 203 88 203 L98 205 Q101 213 97 216 L78 216 Q75 216 75 212Z" fill="${boot}" ${O}/><path d="M80 216 h2 M86 216 h2 M92 216 h2" stroke="#999" stroke-width="2"/>${bac?`<path d="M80 209 L96 206.5" stroke="${bac}" stroke-width="2.5" stroke-linecap="round"/>`:''}`;
  const arm=`<path d="M58 146 L70 149 L67 166 Q62 172 56 167Z" fill="${sk}" ${O}/>${c.acc===2?`<rect x="56" y="154" width="14" height="7" rx="2" fill="${c2}" ${O}/>`:''}<circle cx="61" cy="170" r="6.5" fill="${sk}" ${O}/><path d="M76 122 Q62 126 56 148 L71 152 Q72 138 80 132Z" fill="${col}" ${O}/><path d="M57 144 L71 148" stroke="${c2}" stroke-width="3"/>`;
  const pat=patSVG(c,u,col,c2);
  h+=`<g transform="translate(100 0) scale(${bw} 1) translate(-100 0)">`;
  h+=`<g transform="rotate(${P.g[0]} 89 166)">${leg}</g><g transform="rotate(${P.g[1]} 111 166)">${MIR(leg)}</g>`;
  h+=`<path d="M70 156 L130 156 L135 180 Q118 185 104 180 L100 170 L96 180 Q82 185 65 180Z" fill="${c.pants}" ${O}/><path d="M68 168 L67 179 M132 168 L133 179" stroke="${col}" stroke-width="4"/>`;
  h+=`<g transform="rotate(${P.a[0]} 72 126)">${arm}</g><g transform="rotate(${P.a[1]} 128 126)">${MIR(arm)}</g>`;
  h+=`<path d="M76 120 Q100 112 124 120 L132 160 Q100 166 68 160Z" fill="${col}"/>`;
  h+=`<g clip-path="url(#${u}t)">${pat}<path d="M117 110 L140 110 L140 170 L115 170Z" fill="#000" opacity=".13"/></g>`;
  h+=`<path d="M76 120 Q100 112 124 120 L132 160 Q100 166 68 160Z" fill="none" ${O}/>`;
  h+=`<path d="M88 116 L100 131 L112 116" fill="${sk}" stroke="${c2==='#ffffff'?'#fff':c2}" stroke-width="4" stroke-linejoin="round"/>`;
  h+=`<text x="100" y="155" text-anchor="middle" font-size="${String(c.num).length>2?17:20}" font-weight="800" fill="#fff" stroke="rgba(0,0,0,.45)" stroke-width="1.2" paint-order="stroke" font-family="sans-serif">${c.num}</text>`;
  h+=`</g>`;
  // あたま
  h+=`<rect x="93" y="108" width="14" height="12" fill="${sk}"/><rect x="93" y="108" width="14" height="6" fill="#000" opacity=".1"/>`;
  h+=`<circle cx="62" cy="88" r="7" fill="${sk}" ${O}/><circle cx="138" cy="88" r="7" fill="${sk}" ${O}/>`;
  const face=['M62 80 Q62 42 100 42 Q138 42 138 80 Q138 116 100 118 Q62 116 62 80Z',
              'M62 80 Q62 42 100 42 Q138 42 138 80 Q136 104 100 121 Q64 104 62 80Z',
              'M62 78 Q62 42 100 42 Q138 42 138 78 L136 102 Q128 116 100 118 Q72 116 64 102Z'][c.face];
  h+=`<path d="${face}" fill="${sk}" ${O}/>`;
  h+=eyeSVG(c,84,-1)+eyeSVG(c,116,1);
  if(L>=10&&c.eye!==3){ // かくせい：目から 光が のびる
    const glow=L>=20?'#ffd84a':'#3ad6ff';
    const trail=`<path d="M124 86 C142 80 160 80 192 66" stroke="${glow}" stroke-width="4.5" fill="none" stroke-linecap="round" opacity=".9"/><path d="M124 88 C146 86 166 90 194 84" stroke="${glow}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
    h+=`<g filter="url(#${u}g)"><circle cx="116" cy="90" r="5" fill="${glow}" opacity=".85"/>${trail}${L>=20?`<circle cx="84" cy="90" r="5" fill="${glow}" opacity=".85"/>${MIR(trail)}`:''}</g>`;
  }
  const B=BROWS[c.brow], bp=`<path d="${B.d}" stroke="${c.hairColor}" stroke-width="${B.w}" fill="none" stroke-linecap="round"/>`;
  h+=`<g transform="translate(116 ${70+(c.eyeSize-1)*-12})">${bp}</g><g transform="translate(84 ${70+(c.eyeSize-1)*-12}) scale(-1 1)">${bp}</g>`;
  if(c.cheek!==1) h+=`<ellipse cx="73" cy="103" rx="6.5" ry="3.5" fill="#ff7b7b" opacity="${c.cheek===0?.45:.25}"/><ellipse cx="127" cy="103" rx="6.5" ry="3.5" fill="#ff7b7b" opacity="${c.cheek===0?.45:.25}"/>`;
  if(c.cheek===2){const f=`<circle cx="70" cy="99" r="1.3" fill="#a0603a"/><circle cx="75" cy="101" r="1.3" fill="#a0603a"/><circle cx="79" cy="98" r="1.3" fill="#a0603a"/>`;h+=f+MIR(f)}
  if(c.cheek===3) h+=`<g transform="rotate(-20 126 101)"><rect x="117" y="97" width="18" height="8" rx="3" fill="#f6d0a6" stroke="#c99a6b" stroke-width="1.5"/><path d="M124 98 v6 M128 98 v6" stroke="#c99a6b" stroke-width="1"/></g>`;
  h+=`<path d="M99 99 Q100 101 101 99" stroke="#c98a6a" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  h+=[`<path d="M91 104 Q100 115 109 104 Z" fill="#b5413a" stroke="#3d2b24" stroke-width="2" stroke-linejoin="round"/><path d="M95 109 Q100 112 105 109 Q100 107 95 109Z" fill="#ff8f8f"/>`,
      `<path d="M88 102 Q100 122 112 102 Z" fill="#b5413a" stroke="#3d2b24" stroke-width="2" stroke-linejoin="round"/><path d="M90 103 H110 L109 106 H91Z" fill="#fff"/><path d="M94 113 Q100 117 106 113 Q100 110 94 113Z" fill="#ff8f8f"/>`,
      `<path d="M91 106 Q102 111 110 101" stroke="#3d2b24" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      `<path d="M95 106 Q100 108 105 106" stroke="#3d2b24" stroke-width="3" fill="none" stroke-linecap="round"/>`][c.mouth];
  h+=hairFront(c,hf,O);
  h+=`<path d="M78 44 Q100 36 122 44" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(c.acc===1) h+=`<g fill="#fff" fill-opacity=".15" stroke="#2d2d35" stroke-width="2.5"><circle cx="84" cy="90" r="12.5"/><circle cx="116" cy="90" r="12.5"/></g><path d="M96.5 89 Q100 86 103.5 89 M71.5 88 L63 85 M128.5 88 L137 85" stroke="#2d2d35" stroke-width="2.5" fill="none"/>`;
  if(c.acc===3) h+=`<path d="M124 42 l3 6 6.5 1 -4.8 4.5 1.2 6.5 -5.9 -3.1 -5.9 3.1 1.2 -6.5 -4.8 -4.5 6.5 -1z" fill="#ffd23f" ${O}/>`;
  if(L>=3) h+=`<path d="M59 68 Q100 52 141 68 L142 76 Q100 60 58 76Z" fill="#e63946" ${O}/>`;
  if(L>=15) h+=`<path d="M78 36 L80 10 L90 22 L100 4 L110 22 L120 10 L122 36Z" fill="#f5b301" stroke="#9a6d00" stroke-width="2.5" stroke-linejoin="round"/><circle cx="100" cy="24" r="4" fill="#e63946"/><circle cx="86" cy="30" r="2.5" fill="#4dabf7"/><circle cx="114" cy="30" r="2.5" fill="#4dabf7"/>`;
  h+=`</g></g>`;
  const [bx,by]=P.ball;
  h+=`<g transform="translate(${bx-158} ${by-206})">${(c.ballT||BALLS[0]).img?`<image href="${(c.ballT||BALLS[0]).img}" x="132" y="180" width="52" height="52"/>`:ballSVG(c.ballT||BALLS[0],u,O)}</g>`;
  return `<svg class="char" viewBox="0 -10 200 246" aria-label="マイキャラ">${h}</svg>`;
}
function patSVG(c,u,col,c2){return [``,
    `<rect x="78" y="110" width="7" height="60" fill="${c2}"/><rect x="93" y="110" width="7" height="60" fill="${c2}"/><rect x="108" y="110" width="7" height="60" fill="${c2}"/><rect x="123" y="110" width="7" height="60" fill="${c2}"/>`,
    `<rect x="60" y="126" width="80" height="6" fill="${c2}"/><rect x="60" y="139" width="80" height="6" fill="${c2}"/><rect x="60" y="152" width="80" height="6" fill="${c2}"/>`,
    `<rect x="100" y="110" width="40" height="60" fill="${c2}"/>`,
    `<path d="M68 112 L84 112 L136 166 L120 166Z" fill="${c2}"/>`,
    `<path d="M104 112 L88 138 L101 138 L90 168 L118 128 L104 128 L116 112Z" fill="${c2}"/>`,
    `<rect x="60" y="110" width="80" height="60" fill="url(#${u}k)"/>`,
    `<g fill="${c2}" font-size="10" font-family="sans-serif"><text x="76" y="132">★</text><text x="112" y="128">★</text><text x="92" y="146">★</text><text x="118" y="152">★</text><text x="74" y="158">★</text></g>`,
    `<path d="M60 170 L60 150 Q66 140 70 150 Q74 130 82 146 Q88 126 96 144 Q102 122 108 142 Q116 128 120 148 Q128 136 132 152 L140 150 L140 170Z" fill="${c2}"/>`][c.pattern]||""}
function ballSVG(B,u,O){
  let h='';
  if(B.glow) h+=`<circle cx="158" cy="206" r="20" fill="${B.glow}" opacity=".5" filter="url(#${u}g)"/>`;
  if(B.fire) h+=`<g filter="url(#${u}g)"><path d="M146 200 Q120 196 102 178 Q122 186 128 180 Q116 170 110 152 Q132 172 148 192Z" fill="${B.fire}" opacity=".9"/></g>`;
  h+=`<circle cx="158" cy="206" r="15" fill="${B.base}" ${O}/><path d="M158 199 l6.5 4.7 -2.5 7.6 h-8 l-2.5 -7.6z" fill="${B.pat}"/><path d="M158 199 v-8 M164.5 203.7 l7.5 -2.5 M162 211.3 l4.5 6.5 M154 211.3 l-4.5 6.5 M151.5 203.7 l-7.5 -2.5" stroke="${B.pat}" stroke-width="2"/>`;
  return h;
}
function itemSVG(cat,it){
  const u='i'+(UID++), O='stroke="#3d2b24" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const glow=`<filter id="${u}g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  if(cat==='ball') return `<svg viewBox="${it.fire?'100 150 80 76':it.glow?'134 182 48 48':'140 188 36 36'}"><defs>${glow}</defs>${ballSVG(it,u,O)}</svg>`;
  if(cat==='boot'){const col=it.col||norm(S.c).bootCol, acc=it.acc;
    return `<svg viewBox="70 194 36 28"><defs>${glow}</defs>${it.id==='s5'?`<ellipse cx="88" cy="210" rx="16" ry="9" fill="#ffd84a" opacity=".5" filter="url(#${u}g)"/>`:''}<path d="M75 212 Q75 203 88 203 L98 205 Q101 213 97 216 L78 216 Q75 216 75 212Z" fill="${col}" ${O}/><path d="M80 216 h2 M86 216 h2 M92 216 h2" stroke="#999" stroke-width="2"/>${acc?`<path d="M80 209 L96 206.5" stroke="${acc}" stroke-width="2.5" stroke-linecap="round"/>`:''}</svg>`}
  if(cat==='kit'){const c=it.pattern!=null?{color:it.color,color2:it.color2,pattern:it.pattern,num:norm(S.c).num}:norm(S.c), col=c.color, c2=c.color2;
    const sl=`<path d="M78 121 L58 130 L63 148 L74 144Z" fill="${col}" ${O}/><path d="M60 142 L74 138" stroke="${c2}" stroke-width="3"/>`;
    return `<svg viewBox="52 108 96 62"><defs><linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="${c2}"/></linearGradient><clipPath id="${u}t"><path d="M76 120 Q100 112 124 120 L132 160 Q100 166 68 160Z"/></clipPath></defs>
      ${sl}${MIR(sl)}<path d="M76 120 Q100 112 124 120 L132 160 Q100 166 68 160Z" fill="${col}"/><g clip-path="url(#${u}t)">${patSVG(c,u,col,c2)}</g>
      <path d="M76 120 Q100 112 124 120 L132 160 Q100 166 68 160Z" fill="none" ${O}/><path d="M88 116 L100 131 L112 116" fill="#0a1124" stroke="${c2==='#ffffff'?'#fff':c2}" stroke-width="4" stroke-linejoin="round"/>
      <text x="100" y="155" text-anchor="middle" font-size="${String(c.num).length>2?16:18}" font-weight="800" fill="#fff" stroke="rgba(0,0,0,.45)" stroke-width="1.2" paint-order="stroke" font-family="sans-serif">${c.num}</text></svg>`}
  return '';
}
function itemIcon(cat,it){
  if(it.img)return `<img class="itimg" src="${it.img}" alt="${esc(it.name)}">`;
  if(cat==='bg'){const L=lv(S.xp).L;return `<div class="bgicon" style="background:${it.bg||STAGES[stageOf(L)].bg}">${it.bg?'':'<span>ステージ</span>'}</div>`}
  return itemSVG(cat,it);
}
function eyeSVG(c,x,s){
  let g;
  if(c.eye===3) g=`<path d="M-9 2 Q0 -8 9 2" stroke="#3d2b24" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  else g=`<ellipse rx="9" ry="11" fill="#fff"/><ellipse cy="2" rx="7" ry="9" fill="${c.eyeCol}"/><ellipse cy="4" rx="4" ry="5.5" fill="#1a0f08" opacity=".85"/><ellipse cy="7.5" rx="5" ry="2.5" fill="#fff" opacity=".3"/>`
    +`<path d="M-10 -6 Q0 -14 10 -6" stroke="#3d2b24" stroke-width="${c.lash?4:3}" fill="none" stroke-linecap="round"/>`
    +(c.lash?`<path d="M${9*s} -7 l${4*s} -4 M${10*s} -4 l${4*s} -1" stroke="#3d2b24" stroke-width="2.5" stroke-linecap="round"/>`:'')
    +`<circle cx="2.5" cy="-3" r="3" fill="#fff"/><circle cx="-2.5" cy="7" r="1.6" fill="#fff"/>`;
  return `<g transform="translate(${x} 89) scale(${c.eyeSize}) rotate(${EYEROT[c.eye]*s})">${g}</g>`;
}
function hairBack(c,hf,O){
  const t=c.hair;
  if(t===2) return `<path d="M58 80 Q56 30 100 30 Q144 30 142 80 L142 96 Q138 100 134 96 L66 96 Q62 100 58 96Z" fill="${hf}" ${O}/>`;
  if(t===4) return `<path d="M126 56 Q168 60 162 112 Q158 134 140 142 Q150 116 142 96 Q136 80 122 74Z" fill="${hf}" ${O}/>`;
  if(t===5){const tail=`<path d="M128 60 Q170 66 162 122 Q158 140 146 146 Q154 120 146 100 Q140 84 124 76Z" fill="${hf}" ${O}/>`;return tail+MIR(tail)}
  if(t===6) return `<path d="M58 78 Q56 30 100 30 Q144 30 142 78 L146 116 Q134 124 122 114 L78 114 Q66 124 54 116Z" fill="${hf}" ${O}/>`;
  if(t===7) return `<path d="M56 78 Q54 28 100 28 Q146 28 144 78 L152 168 Q132 176 118 162 L82 162 Q68 176 48 168Z" fill="${hf}" ${O}/>`;
  return '';
}
function hairFront(c,hf,O){
  const t=c.hair; let h='';
  if(t===0) h=`<path d="M58 84 Q52 34 100 32 Q148 34 142 84 Q138 66 128 58 Q126 68 118 70 Q116 60 108 56 Q104 68 94 68 Q92 58 86 56 Q80 68 70 66 Q64 72 58 84Z" fill="${hf}" ${O}/>`;
  if(t===1) h=`<path d="M58 84 L46 60 L62 58 L56 36 L76 42 L78 20 L94 34 L104 10 L112 34 L128 20 L126 42 L146 36 L138 58 L154 60 L142 84 Q138 66 128 58 L120 72 L110 56 L100 70 L90 56 L80 70 L70 60 Q62 70 58 84Z" fill="${hf}" ${O}/>`;
  if(t===2) h=`<path d="M58 86 Q52 30 100 30 Q148 30 142 86 Q140 78 134 75 Q118 80 100 78 Q82 80 66 75 Q60 78 58 86Z" fill="${hf}" ${O}/><path d="M82 77 L86 58 M100 78 V56 M118 77 L114 58" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`;
  if(t===3) h=`<path d="M62 74 Q62 40 100 40 Q138 40 138 74 Q120 58 100 58 Q80 58 62 74Z" fill="${hf}" opacity=".9" ${O}/>`;
  if(t===4||t===5||t===7){h=`<path d="M60 86 Q52 34 100 32 Q148 34 140 86 Q136 64 124 56 Q112 72 90 70 Q100 62 102 52 Q88 68 72 64 Q64 72 60 86Z" fill="${hf}" ${O}/>`;
    const side=`<path d="M62 70 Q56 96 64 112 Q70 98 68 78Z" fill="${hf}" ${O}/>`;h+=side+MIR(side);
    const rib=`<circle cx="130" cy="58" r="6" fill="#ff6fa5" ${O}/><path d="M130 58 L138 48 L142 60Z M130 58 L140 66 L134 70Z" fill="#ff6fa5" ${O}/>`;
    if(t===4) h+=rib; if(t===5) h+=rib+MIR(rib)}
  if(t===6){h=`<path d="M60 86 Q54 32 100 32 Q146 32 140 86 Q138 70 130 64 L124 74 L116 64 L108 74 L100 64 L92 74 L84 64 L76 74 L70 64 Q62 72 60 86Z" fill="${hf}" ${O}/>`;
    const side=`<path d="M61 74 Q56 100 60 116 L72 114 Q66 98 69 80Z" fill="${hf}" ${O}/>`;h+=side+MIR(side)}
  return h;
}

/* ===== カード ===== */
function weapon(s){let best=null,v=0;for(const x of SPORT.stats){if(s.stats[x.id]>v){v=s.stats[x.id];best=x.name}}return best}
const POS_SHORT={'ウイング':'WG','トップ下':'OMF','ストライカー':'ST','ボランチ':'DMF','サイドバック':'SB','見習い':'—'};
function cardView(s,L,i,opt={}){
  const st=STAGES[i], c=dressed(s,opt.over), lk=opt.locked;
  const bgi=BGS.find(x=>x.id===({...wear(s),...(opt.over||{})}).bg);
  const bgStyle=bgi&&bgi.bg?`background-image:${bgi.bg}`:`background-image:url('img/bg_${i+1}.jpg'),${st.bg}`;
  return `<div class="pc s${i} ${opt.mini?'mini':''} ${lk?'locked':''}">
    <div class="pc-bg" style="${bgStyle}"></div><div class="pc-fx"></div>
    <div class="pc-num ${String(c.num).length>2?'n3':''}">${c.num}</div>
    <div class="pc-char">${charView(c,L,i)}</div>
    <div class="pc-ovr"><b>${lk?'?':ovr(s)}</b><span>${lk?'':jobOf(s).short}</span></div>
    <div class="pc-stage">${st.name}</div>
    <div class="pc-plate">${lk?`<b>Lv.${st.lv}で解放</b>`:`<b>${esc(c.name)}</b>${!opt.mini&&weapon(s)?`<i>ぶき：${weapon(s)}</i>`:''}`}</div>
    <div class="pc-frame"></div>
  </div>`;
}

/* ===== キャラメイク ===== */
const SWATCH={
  skin:['#ffe8d6','#ffe0c2','#f1c27d','#d9a066','#c68642','#8d5524'],
  eyeCol:['#5a3522','#22130b','#2f6fd6','#2a9d5c','#c0392b','#8e44ad'],
  hairColor:['#2b1d16','#6b4226','#c98b3c','#e8c872','#1e2a4a','#b0b7c3'],
  tip:['','#e63946','#2f6fd6','#f5b301','#8e44ad','#21a366'],
  color:['#e63946','#2b59c3','#21a366','#f28c28','#8e44ad','#222831'],
  color2:['#ffffff','#111111','#f5b301','#e63946','#2b59c3','#21a366'],
  pants:['#ffffff','#1d2540','#e63946','#2b59c3','#21a366','#111111'],
  sock:['','#ffffff','#1d2540','#e63946','#2b59c3','#f5b301'],
  bootCol:['#2d2d35','#ffffff','#e63946','#2b59c3','#21a366','#ff6fa5'],
};
const ED=[
  {tab:'体',items:[
    {k:'sex',label:'性別',type:'opt',opts:['男の子','女の子'],vals:['m','f']},
    {k:'skin',label:'肌の色',type:'col'},
    {k:'build',label:'体型',type:'opt',opts:['ほそめ','ふつう','がっしり']},
    {k:'age',label:'年齢（伸びやすい能力が変わるよ）',type:'num',min:6,max:18},
  ]},
  {tab:'顔',items:[
    {k:'face',label:'輪郭',type:'opt',opts:['まる','たまご','しかく']},
    {k:'brow',label:'まゆ毛',type:'opt',opts:['ふつう','きりっ','こまり','ふとい']},
    {k:'mouth',label:'口',type:'opt',opts:['にっこり','大笑い','ニヤリ','すまし']},
    {k:'cheek',label:'ほっぺ',type:'opt',opts:['ピンク','なし','そばかす','ばんそうこう']},
  ]},
  {tab:'目',items:[
    {k:'eye',label:'目の形',type:'opt',opts:['まる','つりめ','たれめ','にこにこ']},
    {k:'eyeCol',label:'目の色',type:'col'},
    {k:'eyeSize',label:'目の大きさ',type:'range',min:0.8,max:1.25,step:0.05},
    {k:'lash',label:'まつげ',type:'opt',opts:['なし','あり']},
  ]},
  {tab:'髪',items:[
    {k:'hair',label:'髪型',type:'opt',opts:HAIRSTYLES},
    {k:'hairColor',label:'髪の色',type:'col'},
    {k:'tip',label:'毛先の色（グラデーション）',type:'col'},
  ]},
  {tab:'ユニフォーム',items:[
    {k:'color',label:'メインカラー',type:'col'},
    {k:'color2',label:'サブカラー',type:'col'},
    {k:'pattern',label:'柄',type:'opt',opts:['無地','縦じま','横じま','ハーフ','たすき']},
    {k:'pants',label:'パンツの色',type:'col'},
    {k:'sock',label:'ソックスの色',type:'col'},
    {k:'bootCol',label:'スパイクの色',type:'col'},
  ]},
  {tab:'小物',items:[
    {k:'acc',label:'アクセサリー',type:'opt',opts:['なし','メガネ','リストバンド','星のピン']},
  ]},
];
/* 背番号：1〜999。全角の数字も半角にして読み取る。正しくないときは null */
const NUM_MIN=1, NUM_MAX=999;
function numText(v){return String(v==null?'':v).replace(/[０-９]/g,d=>String.fromCharCode(d.charCodeAt(0)-0xFEE0)).replace(/[^0-9]/g,'').slice(0,3)}
function parseNum(v){const t=numText(v),n=t===''?NaN:+t;return n>=NUM_MIN&&n<=NUM_MAX?n:null}
let ed=null, edTab=0, edPose=0;
function edPreview(){return ed.avatar?avatarView(norm(ed),STAGES[edPose].lv,edPose):charSVG(ed,STAGES[edPose].lv,POSE_OF[edPose])}
function editView(){
  const t=ED[edTab];
  return `<div class="edtop">
    <div class="edprev">${edPreview()}</div>
    <div class="chips" style="margin-bottom:6px"><span class="sub" style="align-self:center">進化の姿：</span>${STAGES.map((r,i)=>`<button class="chip mini ${i===edPose?'on':''}" data-ep="${i}">${i+1}</button>`).join('')}</div>
    <div class="tabs">${ED.map((x,i)=>`<button class="chip ${i===edTab?'on':''}" data-et="${i}">${x.tab}</button>`).join('')}</div>
  </div>
  <div class="wrap">
    ${edTab===0?`<div class="card"><h3>キャラクターを選ぶ</h3><p class="sub" style="margin:4px 0 10px">イラストのキャラから選ぶか、自分で作るかを選べるよ</p>
      <div class="avgrid"><button class="avopt ${!ed.avatar?'on':''}" data-av="">${charSVG({...ed,avatar:''},1,0)}<span>自分で作る</span></button>${AVATARS.map(A=>`<button class="avopt ${ed.avatar===A.id?'on':''}" data-av="${A.id}"><img src="img/chars/${A.id}.webp" alt=""><span>${A.name}</span></button>`).join('')}</div></div>`:''}
    ${edTab>0&&ed.avatar?`<div class="card hint" style="margin-bottom:14px">イラストのキャラを選んでいるときは、顔・目・髪・小物の設定は使われません（背番号はカードに使われます）。「体」タブで「自分で作る」を選ぶと使えるよ。</div>`:''}
    ${edTab===0?`<div class="card"><h3>名前</h3><input type="text" id="cname" maxlength="10" placeholder="名前を入力" value="${esc(ed.name||'')}" style="margin-top:8px"></div>
    <div class="card"><h3>背番号</h3><p class="sub" style="margin:4px 0 8px">${NUM_MIN}〜${NUM_MAX}の好きな番号を入れてね</p>
      <div class="row numrow"><button class="chip" data-nd="-1" aria-label="1つ減らす">−</button><input type="text" id="cnum" inputmode="numeric" maxlength="3" autocomplete="off" placeholder="10" aria-label="背番号" value="${esc(numText(ed.num))}"><button class="chip" data-nd="1" aria-label="1つ増やす">＋</button></div></div>`:''}
    <div class="card">${t.items.map(itemView).join('')}</div>
    <div class="row"><button class="btn ghost" id="rand" style="flex:1">おまかせ</button><button class="btn gold" id="edok" style="flex:2">${S?'決定':'このキャラで始める'}</button></div>
    ${S?'<button class="btn ghost" id="edcancel" style="margin-top:14px;font-size:15px">キャンセル</button>':''}
  </div>`;
}
function itemView(it){
  let ctl='';
  if(it.type==='opt') ctl=`<div class="chips">${it.opts.map((o,i)=>{const v=it.vals?it.vals[i]:i;return `<button class="chip ${ed[it.k]===v?'on':''}" data-k="${it.k}" data-v="${v}" data-n="${it.vals?0:1}">${o}</button>`}).join('')}</div>`;
  if(it.type==='col') ctl=`<div class="chips">${SWATCH[it.k].map(v=>`<button class="swatch ${ed[it.k]===v?'on':''}" style="background:${v||'repeating-linear-gradient(45deg,#fff 0 6px,#dde3ef 6px 12px)'}" data-k="${it.k}" data-v="${v}" data-n="0" aria-label="${v||'なし'}"></button>`).join('')}<label class="swatch picker" aria-label="自分で選ぶ">🎨<input type="color" data-ck="${it.k}" value="${ed[it.k]||'#ffffff'}"></label></div>`;
  if(it.type==='range') ctl=`<input type="range" data-rk="${it.k}" min="${it.min}" max="${it.max}" step="${it.step}" value="${ed[it.k]}">`;
  if(it.type==='num') ctl=`<div class="row" style="justify-content:center"><button class="chip" data-nk="${it.k}" data-d="-1">−</button><span class="big" style="min-width:80px">${ed[it.k]}</span><button class="chip" data-nk="${it.k}" data-d="1">＋</button></div>`;
  return `<div class="edi"><h3>${it.label}</h3>${ctl}</div>`;
}
function bindEdit(){
  const app=document.getElementById('app');
  const re=()=>{const y=window.scrollY;render();window.scrollTo(0,y)};
  const pv=()=>{app.querySelector('.edprev').innerHTML=edPreview()};
  app.querySelectorAll('[data-et]').forEach(b=>b.onclick=()=>{edTab=+b.dataset.et;re()});
  app.querySelectorAll('[data-av]').forEach(b=>b.onclick=()=>{const v=b.dataset.av;ed.avatar=v;if(v)ed.sex=AVATARS.find(x=>x.id===v).sex;re()});
  app.querySelectorAll('[data-ep]').forEach(b=>b.onclick=()=>{edPose=+b.dataset.ep;re()});
  app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ed[b.dataset.k]=b.dataset.n==='1'?+b.dataset.v:b.dataset.v;re()});
  app.querySelectorAll('[data-ck]').forEach(i=>i.oninput=()=>{ed[i.dataset.ck]=i.value;pv()});
  app.querySelectorAll('[data-rk]').forEach(i=>i.oninput=()=>{ed[i.dataset.rk]=+i.value;pv()});
  app.querySelectorAll('[data-nk]').forEach(b=>b.onclick=()=>{const k=b.dataset.nk;const it=ED.flatMap(t=>t.items).find(i=>i.k===k);ed[k]=Math.min(it.max,Math.max(it.min,ed[k]+ +b.dataset.d));re()});
  const nm=document.getElementById('cname'); if(nm) nm.oninput=()=>{ed.name=nm.value};
  const nb=document.getElementById('cnum');
  if(nb){
    const put=()=>{const t=numText(nb.value);if(nb.value!==t)nb.value=t;const n=parseNum(t);ed.num=n==null?'':n;pv()};
    nb.oninput=e=>{if(!e.isComposing)put()};   // 日本語入力の変換中は 待つ
    nb.oncompositionend=put;
    nb.onfocus=()=>nb.select();
    app.querySelectorAll('[data-nd]').forEach(b=>b.onclick=()=>{nb.value=Math.min(NUM_MAX,Math.max(NUM_MIN,(+numText(nb.value)||0)+ +b.dataset.nd));put()});
  }
  document.getElementById('rand').onclick=()=>{
    const pick=a=>a[Math.floor(Math.random()*a.length)];
    ED.forEach(t=>t.items.forEach(it=>{
      if(it.k==='sex'||it.type==='num')return;
      if(it.type==='opt') ed[it.k]=it.vals?pick(it.vals):Math.floor(Math.random()*it.opts.length);
      if(it.type==='col') ed[it.k]=pick(SWATCH[it.k]);
      if(it.type==='range') ed[it.k]=Math.round((it.min+Math.random()*(it.max-it.min))/it.step)*it.step;
    }));
    re();
  };
  document.getElementById('edok').onclick=()=>{
    const name=(ed.name||'').trim();
    if(!name){edTab=0;re();dialog({icon:'✏️',title:'名前を入力してね',msg:'「体」タブで名前を入れてから始めよう。'});return}
    const num=parseNum(ed.num);
    if(num==null){edTab=0;re();dialog({icon:'👕',title:'背番号を入力してね',msg:`「体」タブで${NUM_MIN}〜${NUM_MAX}の番号を入れてから始めよう。`});return}
    ed.name=name;ed.num=num;
    if(!S) S={c:ed,xp:0,stats:freshStats(),best:{},logs:[],titles:[],eq:null};
    else S.c=ed;
    const isNew=!S.tut;ed=null;save();go('home');if(isNew)showTutorial();
  };
  const cc=document.getElementById('edcancel'); if(cc) cc.onclick=()=>{ed=null;go('settings')};
}

/* ===== 画面 ===== */
function render(){
  const app=document.getElementById('app'), nav=document.getElementById('nav');
  if(!S||tab==='edit'){
    if(!ed){ed=norm(S?{...S.c}:{name:''});edTab=0;edPose=0}
    nav.classList.add('hide');app.innerHTML=editView();bindEdit();return;
  }
  nav.classList.remove('hide');
  nav.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
  if(S)wear(S);
  app.innerHTML={home:homeView,practice:practiceView,skill:titlesView,log:logView,settings:settingsView,shop:shopView,wardrobe:wardrobeView,report:reportView}[tab]();
  if(tab==='shop')bindShop();
  if(tab==='wardrobe')bindWardrobe();
  if(tab==='report')bindReport();
  if(tab==='home'){const co=document.getElementById('chestopen');if(co)co.onclick=openChest;if(S.recapPending&&!document.getElementById('ov').classList.contains('show'))setTimeout(showRecap,300)}
  if(tab==='home'){const pr=document.getElementById('pread');if(pr)pr.onclick=()=>{const g=S.pmsg.gift||0;S.pmsg.read=true;if(g)S.coin=(S.coin||0)+g;save();render();if(g)dialog({icon:'🪙',title:`コイン +${g}`,msg:'おうちの人からのごほうび！'})}}
  if(tab==='log')app.querySelectorAll('[data-cal]').forEach(b=>b.onclick=()=>{calOff=Math.min(0,calOff+ +b.dataset.cal);const y=window.scrollY;render();window.scrollTo(0,y)});
  if(tab==='practice')bindPractice();
  if(tab==='skill'){app.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>{S.eq=b.dataset.eq;save();render()});
    app.querySelectorAll('[data-job]').forEach(b=>b.onclick=()=>{const j=JOBS.find(x=>x.id===b.dataset.job);if((S.job||'none')===j.id)return;dialog({icon:'⚽',title:`「${j.name}」に転職する？`,msg:'職業に合った能力が伸びやすくなるよ。いつでも転職し直せます。',ok:'転職する',cancel:'やめる'}).then(y=>{if(y){S.job=j.id;save();render()}})})}
  if(tab==='home'){const r=document.getElementById('rest');if(r)r.onclick=doRest;
    app.querySelectorAll('[data-bp]').forEach(b=>b.onclick=()=>allot(b.dataset.bp))}
  window.scrollTo(0,0);
}

function recoverHP(){
  if(S.hp==null){S.hp=100;S.hpDay=today()}
  if(S.hpDay!==today()){const d=Math.round((new Date(today())-new Date(S.hpDay))/864e5);S.hp=Math.min(100,S.hp+40*Math.max(1,d));S.hpDay=today()}
}
function weekKey(){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function boss(){
  const w=weekKey();
  if(!S.boss||S.boss.week!==w){
    const idx=(S.bossN||0)%BOSSES.length, B=BOSSES[idx], m=menuOf(B.menu), b=S.best[B.menu];
    const target=b==null?B.def:m.lower?Math.round(b*0.97*10)/10:Math.min(m.max||9999,Math.max(b+1,Math.ceil(b*1.1)));
    S.boss={week:w,idx,target,beaten:false};S.bossN=(S.bossN||0)+1;save();
  }
  return S.boss;
}
function questCard(){
  const d=today(), done=(S.qd&&S.qd[d])||[];
  return `<div class="card"><h3>📜 今日のクエスト <span class="sub">${done.length}/3</span></h3>
    ${quests(d).map(q=>`<div class="quest ${done.includes(q.id)?'done':''}"><span>${done.includes(q.id)?'✔':'□'}</span>${q.t}<em>+30 EXP・🪙20</em></div>`).join('')}
    <p class="sub" style="margin:6px 0 0">3つ全部クリアで 🪙50 ボーナス！</p></div>`;
}
function bossCard(){
  const B=boss(), D=BOSSES[B.idx], m=menuOf(D.menu);
  return `<div class="card bosscard ${B.beaten?'beaten':''}"><h3>⚔️ 今週のライバル</h3>
    <div class="row" style="margin-top:8px"><span class="bossic">${D.ic}</span><div><b style="font-size:18px">${D.name}</b>
    <p class="sub" style="margin:4px 0 0">撃破条件：${m.name}の記録で <b style="color:var(--ink)">${B.target}${m.unit}${m.lower?' 以内':' 以上'}</b></p></div></div>
    <p class="sub" style="margin:8px 0 0">${B.beaten?'🎉 撃破済み！ 来週は新しいライバルが登場するよ':'ほうしゅう：100 EXP・🪙150'}</p></div>`;
}
function homeView(){
  recoverHP();dailyCheck();
  const {L,r,n}=lv(S.xp);
  const restedToday=S.logs.some(l=>l.date===today()&&l.rest);
  const next=GEAR.find(g=>g.lv>L), ns=STAGES[stageOf(L)+1];
  const bp=S.bp||0, hp=Math.round(S.hp), J=jobOf(S);
  const t=TITLES.find(x=>x.id===S.eq);
  return `<div class="top">
    <button class="coin" onclick="go('shop')" style="position:absolute;right:14px;top:12px;z-index:5">🪙 ${S.coin||0}</button>
    ${cardView(S,L,stageOf(L))}
    ${t?`<div class="title-badge" style="margin-top:10px">${t.ic} ${t.name}</div><br>`:''}
    <div class="lv">Lv. ${L}</div> <span class="jobtag">${J.name}</span>
    <div class="xpbar"><i style="width:${r/n*100}%"></i></div>
    <div class="xptext">次のレベルまで あと${n-r} EXP</div>
    <div class="hprow"><b>HP</b><div class="hpbar"><i style="width:${hp}%;background:${hp<25?'#ff4d4d':hp<50?'#ffb020':'#3ee08f'}"></i></div><span>${hp}/100</span></div>
  </div>
  <div class="wrap">
    <div class="row" style="margin:4px 0 16px"><button class="btn gold" onclick="go('practice')" style="flex:2">練習を記録する</button><button class="btn ghost" onclick="go('shop')" style="flex:1">ショップ</button></div>
    ${buddyCard()}
    ${parentMsgCard()}
    ${hp<25?`<div class="card warn">⚠ HPが少なくなっています。疲れがたまるとケガをしやすくなるよ。今日は宿屋で休もう。</div>`:''}
    ${chestCard()}
    ${weekCard()}
    ${questCard()}
    ${roadCard()}
    ${bossCard()}
    ${bp?`<div class="card" style="border:2px solid var(--gold)"><h3>育成ポイント：${bp}</h3>
      <p class="sub" style="margin:4px 0 8px">好きな能力に振り分けよう（1ポイントで+1）</p>
      ${SPORT.stats.map(s=>`<div class="stat"><span>${s.name}</span><span style="font-size:20px">${rt(S,s.id)}</span><button class="chip" data-bp="${s.id}" ${rt(S,s.id)>=99?'disabled':''}>＋</button></div>`).join('')}
    </div>`:''}
    <div class="card"><h3>能力</h3>
      ${radar(S)}
      ${CATS.filter(c=>c.id!=='game').map(c=>`<div class="grp">${c.name}</div>`+SPORT.stats.filter(x=>x.g===c.id).map(s=>{const p=S.stats[s.id]%3;return `<div class="stat"><span>${s.name}</span><div class="bar"><i style="width:${rt(S,s.id)>=99?100:p/3*100}%"></i></div><span>${rt(S,s.id)}</span></div>`}).join('')).join('')}
      <p class="sub" style="margin:6px 0 0">バーがたまると能力が+1</p>
    </div>
    ${ns?`<div class="card"><h3>次のステージ</h3><p style="margin:8px 0 0">Lv.${ns.lv} で <b>${ns.name}</b> に進出！</p></div>`:''}
    ${next?`<div class="card"><h3>次のごほうび</h3><p style="margin:8px 0 0">Lv.${next.lv} で <b>${next.name}</b> をゲット！</p></div>`:''}
    <div class="card"><h3>🏨 宿屋（休養日）</h3><p class="sub" style="margin:6px 0 12px">体を休めるのも大事な練習。筋肉は休んでいる間に強くなるよ。宿屋に泊まるとHPが全回復して、10 EXPもらえる。</p>
      <button class="btn ghost" id="rest" ${restedToday?'disabled':''}>${restedToday?'今日はゆっくり休もう':'宿屋に泊まる'}</button></div>
  </div>`;
}

let pgrp='touch';
const stars=lv=>`<span class="stars">${'★'.repeat(lv)}<i>${'★'.repeat(3-lv)}</i></span>`;
function practiceView(){
  const m=menuOf(draft.menu), boost=boostStats();
  if(!m) return `<div class="wrap">
    <h2 style="margin:8px 0 4px">何を練習した？</h2>
    <p class="sub" style="margin:0 0 12px">🌱＝今の年齢で伸びやすい練習（経験×1.5）　★＝むずかしさ</p>
    <div class="gtabs">${GRPS.map(g=>`<button class="gtab ${g.id===pgrp?'on':''}" data-g="${g.id}"><span>${g.ic}</span>${g.name}</button>`).join('')}</div>
    <div class="mlist">${SPORT.menus.filter(x=>x.grp===pgrp).map(x=>`<button class="mitem" data-m="${x.id}"><div class="mthumb">${diag(x.d)}</div>
      <div class="minfo"><b>${x.name}</b>${stars(x.lv)}<span class="sub">${Object.keys(x.gain).slice(0,2).map(statName).join('・')}</span></div>
      ${boost.includes(Object.keys(x.gain)[0])?'<em class="nobi">🌱</em>':''}</button>`).join('')}</div>
  </div>`;
  return `<div class="wrap">
    <button class="chip mini" id="mback" style="margin:4px 0 12px">‹ メニュー一覧</button>
    <div class="mdetail"><div class="mbig">${diag(m.d,null,true)}</div>
      <h2 style="margin:14px 0 6px">${m.name} ${stars(m.lv)}</h2>
      <ol class="how">${m.how.map(h=>`<li>${h}</li>`).join('')}</ol>
      <div class="legend"><span><i style="background:#ffd84a"></i>ボールの動き</span><span><i style="background:#eaf2ff"></i>人の動き</span><span><i style="background:#ff8a00"></i>コーン</span></div>
    </div>
    <div class="card"><h3>上がる能力</h3><p style="margin:6px 0 0">${Object.entries(m.gain).map(([id,w])=>`${statName(id)}<b class="gmark">${w>=1?'◎':w>=.4?'○':'△'}</b>`).join('　')}${boost.includes(Object.keys(m.gain)[0])?'　<span class="nobitag">🌱 のびどき</span>':''}</p></div>
    <div class="card"><h3>練習時間</h3>
      <div class="big"><span id="minv">${draft.min}</span> 分</div>
      <input type="range" id="min" min="5" max="90" step="5" value="${draft.min}">
    </div>
    ${m.rec?`<div class="card"><h3>記録（わかれば）</h3><p class="sub" style="margin:4px 0 8px">${m.rec}（${m.unit}）</p>
      <input type="number" id="rec" inputmode="decimal" step="${m.dec?'0.1':'1'}" min="0" ${m.max?`max="${m.max}"`:''} value="${esc(draft.rec)}" placeholder="—">
      <p class="sub" style="margin:8px 0 0">今の自己ベスト：<b>${S.best[m.id]!=null?S.best[m.id]+m.unit:'まだなし'}</b></p>
      <div class="hint">自己ベストを更新するとボーナス +30 EXP</div></div>`:''}
    <button class="btn gold" id="save">記録する　<span id="xpv">+${calcXP()}</span> EXP</button>
  </div>`;
}
function calcXP(){return draft.min*2}
function bindPractice(){
  document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{pgrp=b.dataset.g;const y=window.scrollY;render();window.scrollTo(0,y)});
  document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{draft.menu=b.dataset.m;draft.rec='';render()});
  const bk=document.getElementById('mback'); if(bk) bk.onclick=()=>{draft.menu=null;render()};
  const mi=document.getElementById('min');
  if(mi)mi.oninput=e=>{draft.min=+e.target.value;document.getElementById('minv').textContent=draft.min;document.getElementById('xpv').textContent='+'+calcXP()};
  const rc=document.getElementById('rec');
  if(rc)rc.oninput=e=>{draft.rec=e.target.value};
  const sv=document.getElementById('save');
  if(sv)sv.onclick=doPractice;
}
function checkQuests(){
  S.qd=S.qd||{}; const d=today(), done=S.qd[d]=S.qd[d]||[];
  const L=S.logs.filter(l=>l.date===d&&!l.rest); let xp=0,coin=0; const notes=[];
  quests(d).forEach(q=>{if(!done.includes(q.id)&&q.ok(L)){done.push(q.id);xp+=30;coin+=20;S.qcount=(S.qcount||0)+1;notes.push(`📜 クエストクリア：${q.t}`)}});
  if(notes.length&&done.length===3){coin+=50;notes.push('📜 今日のクエスト コンプリート！ 🪙+50')}
  return {xp,coin,notes};
}
function checkBoss(m,rec){
  const B=boss();
  if(B.beaten||rec==null||BOSSES[B.idx].menu!==m.id)return{xp:0,coin:0,notes:[]};
  if(m.lower?rec<=B.target:rec>=B.target){B.beaten=true;S.bossWins=(S.bossWins||0)+1;return{xp:100,coin:150,notes:[`⚔️ ライバル「${BOSSES[B.idx].name}」を撃破！`]}}
  return{xp:0,coin:0,notes:[`⚔️ ライバルまで あと少し！（目標 ${B.target}${m.unit}）`]};
}
function doPractice(){
  recoverHP();
  const m=menuOf(draft.menu);
  let xp=calcXP(), notes=[], coin=draft.min, pb=false;
  const rec=draft.rec===''?null:Number(draft.rec);
  if(rec!=null&&(isNaN(rec)||rec<0||(m.max&&rec>m.max))){dialog({icon:'🔢',title:'記録の数字を確かめてね',msg:m.max?`0〜${m.max}の数字で入力してね。`:'0以上の数字で入力してね。'});return}
  if(rec!=null){
    const b=S.best[m.id], better=b==null||(m.lower?rec<b:rec>b);
    if(better){if(b!=null){xp+=30;coin+=20;pb=true;notes.push('🌟 自己ベスト更新！ ボーナス +30 EXP')}S.best[m.id]=rec}
  }
  const before=ratings(S), base=Math.ceil(draft.min/5), boost=boostStats(), J=jobOf(S);
  for(const [id,w] of Object.entries(m.gain)) S.stats[id]+=base*w*(boost.includes(id)?1.5:1)*jobMult(J,id);
  const after=ratings(S);
  const ups=SPORT.stats.filter(x=>after[x.id]>before[x.id]).map(x=>`📈 ${x.name} ${before[x.id]} → <b style="color:var(--ok)">${after[x.id]}</b>`);
  notes.unshift(...(ups.length?ups:[`${statName(Object.keys(m.gain)[0])}の経験がたまった（もうすぐアップ）`]));
  if(Object.keys(m.gain).some(id=>boost.includes(id))) notes.push('🌱 のびどきボーナス ×1.5');
  if(jobMult(J,Object.keys(m.gain)[0])>1) notes.push(`⚽ ${J.name}の職業ボーナス`);
  S.logs.unshift({date:today(),menu:m.id,min:draft.min,rec,xp,pb});
  S.hp=Math.max(0,S.hp-draft.min/2);
  const q=checkQuests(); xp+=q.xp; coin+=q.coin; notes.push(...q.notes);
  const bb=checkBoss(m,rec); xp+=bb.xp; coin+=bb.coin; notes.push(...bb.notes);
  if(weekDays()>=WEEK_GOAL&&S.wgoal!==weekKey()){S.wgoal=weekKey();xp+=50;coin+=100;S.charm=Math.min(3,(S.charm??1)+1);notes.push('📅 今週の目標（4日）達成！ 50 EXP・🪙100・お守り+1')}
  S.logs[0].xp=xp;
  const tmin=S.logs.filter(l=>l.date===today()&&!l.rest).reduce((a,l)=>a+l.min,0);
  if(S.hp<25) notes.push('⚠ HPが少ないよ。疲れがたまっています。明日は宿屋で休もう');
  else if(tmin>120) notes.push('⚠ 今日はたくさん練習したね。やりすぎはケガのもと。ここまでにしよう');
  gain(xp,notes,coin);
  draft={menu:null,min:15,rec:''};
}
function doRest(){
  recoverHP();
  S.logs.unshift({date:today(),rest:true,xp:10});
  S.hp=100;
  gain(10,['🏨 宿屋に泊まった！ HPが全回復した'],5);
}
function unlocks(){
  S.skills=S.skills||[];
  const newT=TITLES.filter(t=>!has(S,t.id)&&t.ok(S));
  newT.forEach(t=>S.titles.push(t.id));
  if(newT.length&&!S.eq)S.eq=newT[newT.length-1].id;
  const newS=SKILLS.filter(k=>!S.skills.includes(k.name)&&k.ok(S));
  newS.forEach(k=>S.skills.push(k.name));
  return {newT,newS};
}
function gain(xp,notes,coin=0){
  const before=lv(S.xp).L;
  S.xp+=xp;
  const after=lv(S.xp).L;
  if(after>before){S.bp=(S.bp||0)+3*(after-before);notes.push(`育成ポイント +${3*(after-before)}`)}
  if(stageOf(after)>stageOf(before)){const R=STAGES[stageOf(after)];notes.push(`ステージアップ！ <b>${R.name}</b>に進出！`)}
  const {newT,newS}=unlocks();
  const gear=GEAR.filter(g=>g.lv>before&&g.lv<=after);
  coin+=newT.length*30+(stageOf(after)>stageOf(before)?200:0);
  coin+=roadGain(xp,notes);
  if(Math.floor((totalMin())/60)>Math.floor((totalMin()-(S.logs[0]&&!S.logs[0].rest?S.logs[0].min:0))/60)&&S.logs[0]&&!S.logs[0].rest)notes.push('🎁 宝箱をゲット！ ホームで開けよう');
  if(coin){S.coin=(S.coin||0)+coin;notes.push(`🪙 コイン +${coin}`)}
  save();tab='home';render();
  showResult(xp,before,after,newT,gear,notes,newS);
}
function allot(id){
  if(!(S.bp>0))return;
  S.stats[id]=Math.max(S.stats[id],(rt(S,id)-40)*3)+3; S.bp--;
  const {newT,newS}=unlocks();
  if(newT.length)S.coin=(S.coin||0)+newT.length*30;
  save();render();
  if(newT.length||newS.length)showResult(0,1,1,newT,[],newT.length?[`🪙 コイン +${newT.length*30}`]:[],newS);
}
function showResult(xp,b,a,newT,gear,notes,newS=[]){
  const up=a>b, awk=stageOf(a)>stageOf(b);
  sfx(awk?'stage':up?'level':'ok');
  if(up)confetti();
  let items=notes.map(n=>`<li>${n}</li>`).join('');
  gear.forEach(g=>items+=`<li>新しい装備：${g.name}</li>`);
  newS.forEach(k=>items+=`<li>スキル習得：${k.name}</li>`);
  newT.forEach(t=>items+=`<li>称号ゲット：${t.ic} ${t.name}</li>`);
  document.getElementById('ovbox').innerHTML=`
    <div class="star">${boltImg(awk?'trophy':up?'joy':newT.length||newS.length?'wow':'cheer','big')}</div>
    <h2>${awk?'ステージアップ！':up?'レベルアップ！':xp?'+'+xp+' EXP':'習得！'}</h2>
    ${up?`<p style="font-size:22px;font-weight:800;margin:0">Lv.${b} → <span style="color:var(--gold)">Lv.${a}</span></p><p class="sub">+${xp} EXP</p>`:'<p class="sub">よくがんばったね！</p>'}
    <ul>${items}</ul>
    <button class="btn" onclick="document.getElementById('ov').classList.remove('show')">やったね！</button>`;
  document.getElementById('ov').classList.add('show');
}

const TP={lift1:s=>(s.best.lift||0)/10,lift2:s=>(s.best.lift||0)/50,lift3:s=>(s.best.lift||0)/100,
  drib1:s=>(rt(s,'dribble')-40)/20,drib2:s=>(rt(s,'dribble')-40)/35,speed1:s=>(rt(s,'speed')-40)/20,agi1:s=>(rt(s,'agility')-40)/20,pow1:s=>(rt(s,'power')-40)/20,
  run1:s=>(rt(s,'stamina')-40)/20,bal1:s=>(rt(s,'balance')-40)/20,kick1:s=>(rt(s,'kick')-40)/20,iq1:s=>(rt(s,'iq')-40)/20,shoot2:s=>(s.best.shoot||0)/8,
  ovr70:s=>(ovr(s)-40)/30,days7:s=>practiceDays(s)/7,days30:s=>practiceDays(s)/30,rest:s=>s.logs.filter(l=>l.rest).length/3,quest10:s=>(s.qcount||0)/10,
  boss1:s=>(s.bossWins||0),boss5:s=>(s.bossWins||0)/5,ace:s=>lv(s.xp).L/10,legend:s=>lv(s.xp).L/20};
function collection(){
  const items=SHOP.flatMap(c=>c.items);const L=lv(S.xp).L;
  const have=S.titles.length+(S.skills||[]).length+STAGES.filter(x=>L>=x.lv).length+items.filter(x=>(S.inv||[]).includes(x.id)).length;
  const all=TITLES.length+SKILLS.length+STAGES.length+items.length;
  return {have,all,p:Math.round(have/all*100)};
}
function titlesView(){
  const got=S.titles.length, C=collection();
  return `<div class="wrap">
    <div class="card collcard"><h3>📚 コレクション率</h3><div class="row" style="margin-top:6px"><div class="xpbar" style="flex:1;margin:0"><i style="width:${C.p}%"></i></div><b style="color:var(--gold2);font-size:20px">${C.p}%</b></div>
      <p class="sub" style="margin:6px 0 0">称号・スキル・カード・アイテム　${C.have} / ${C.all}</p></div>
    <h2 style="margin:8px 0 4px">職業（転職）</h2>
    <p class="sub" style="margin:0 0 12px">職業に合った能力が伸びやすくなるよ（基本職×1.1・上級職×1.25）。上級職は条件を満たすと転職できる。</p>
    <div class="tlist">${JOBS.map(j=>{const ok=!j.ok||j.ok(S), on=(S.job||'none')===j.id;
      const grow=j.all?'すべての能力':j.stats.map(statName).join('・')||'特になし';
      return ok?`<button class="t ${on?'eq':''}" data-job="${j.id}" style="font:inherit;text-align:left;cursor:pointer;color:inherit"><span class="ic">${j.up?'👑':j.id==='none'?'🔰':'⚽'}</span><span><b>${j.name}${j.up?' <small class="upj">上級職</small>':''}</b><span class="sub">${on?'✔ 今の職業':'伸びやすい：'+grow}</span></span></button>`
      :`<div class="t lock"><span class="ic">🔒</span><span><b>${j.name} <small class="upj">上級職</small></b><span class="sub">条件：${j.how}</span></span></div>`}).join('')}</div>

    <h2 style="margin:20px 0 4px">スキル（呪文）</h2>
    <p class="sub" style="margin:0 0 12px">練習を続けると技を習得できるよ。</p>
    <div class="tlist">${SKILLS.map(k=>{const ok=(S.skills||[]).includes(k.name);return `<div class="t ${ok?'':'lock'}"><span class="ic">${ok?'🔥':'🔒'}</span><span><b>${ok?k.name:'？？？'}</b><span class="sub">${k.how}</span></span></div>`}).join('')}</div>
    <h2 style="margin:20px 0 4px">成長カード</h2>
    <p class="sub" style="margin:0 0 12px">おうちの庭からワールドクラスまで。レベルが上がると次のステージへ。</p>
    <div class="cgrid">${STAGES.map((r,i)=>cardView(S,r.lv,i,{mini:1,locked:lv(S.xp).L<r.lv})).join('')}</div>
    <h2 style="margin:20px 0 4px">称号</h2>
    <p class="sub" style="margin:0 0 12px">${got} / ${TITLES.length}  獲得。タップでカードに表示する称号を選べるよ。</p>
    <div class="tlist">${TITLES.map(t=>{const g=has(S,t.id);
      return g?`<button class="t ${S.eq===t.id?'eq':''}" data-eq="${t.id}" style="font:inherit;text-align:left;cursor:pointer;color:inherit"><span class="ic">${t.ic}</span><span><b>${t.name}</b><span class="sub">${S.eq===t.id?'✔ 表示中':t.how}</span></span></button>`
      :`<div class="t lock"><span class="ic">🔒</span><span style="flex:1"><b>？？？</b><span class="sub">${t.how}</span>${TP[t.id]?`<span class="tprog"><i style="width:${Math.max(0,Math.min(100,TP[t.id](S)*100))}%"></i></span>`:''}</span></div>`}).join('')}</div>
    <h2 style="margin:20px 0 10px">装備</h2>
    <div class="tlist">${GEAR.map(g=>{const ok=lv(S.xp).L>=g.lv;return `<div class="t ${ok?'':'lock'}"><span class="ic">${ok?'🎁':'🔒'}</span><span><b>${ok?g.name:'？？？'}</b><span class="sub">Lv.${g.lv}でゲット</span></span></div>`}).join('')}</div>
  </div>`;
}

const WEEK_GOAL=4;
const ds=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
function weekDays(){const w=weekKey(), t=today();return new Set(S.logs.filter(l=>!l.rest&&l.date>=w&&l.date<=t).map(l=>l.date)).size}
function streak(){ // 練習か 宿屋の日が 続いた日数（休養日でも 途切れない）
  const days=new Set([...S.logs.map(l=>l.date),...(S.frozen||[])]); const d=new Date(); if(!days.has(ds(d)))d.setDate(d.getDate()-1);
  let n=0; while(days.has(ds(d))){n++;d.setDate(d.getDate()-1)} return n;
}
function weekCard(){
  const n=weekDays();
  return `<div class="card"><h3>📅 今週の目標：${WEEK_GOAL}日練習する</h3>
    <div class="wdots">${Array.from({length:WEEK_GOAL},(_,i)=>`<i class="${i<n?'on':''}">${i<n?'⚽':''}</i>`).join('')}<span>${Math.min(n,WEEK_GOAL)}/${WEEK_GOAL}日</span></div>
    <p class="sub" style="margin:6px 0 0">${n>=WEEK_GOAL?'🎉 今週の目標達成！':'達成すると 50 EXP・🪙100'}　🔥 継続 ${streak()}日（宿屋の日もOK）　🧿 お守り ${S.charm??1}個</p></div>`;
}
let calOff=0;
function calendarCard(){
  const d=new Date(); d.setDate(1); d.setMonth(d.getMonth()+calOff);
  const y=d.getFullYear(), mo=d.getMonth(), first=(d.getDay()+6)%7, days=new Date(y,mo+1,0).getDate(), pre=`${y}-${String(mo+1).padStart(2,'0')}-`;
  const by={}; S.logs.forEach(l=>{if(l.date.startsWith(pre)){const k=+l.date.slice(8);by[k]=by[k]||{min:0,rest:false};if(l.rest)by[k].rest=true;else by[k].min+=l.min}});
  const pd=Object.values(by).filter(x=>x.min>0).length, tm=Object.values(by).reduce((a,x)=>a+x.min,0), td=today();
  let cells='';
  for(let i=0;i<first;i++)cells+='<span></span>';
  for(let k=1;k<=days;k++){const v=by[k], key=pre+String(k).padStart(2,'0');
    const lvl=!v||!v.min?0:v.min<30?1:v.min<60?2:3;
    cells+=`<span class="cd l${lvl} ${key===td?'today':''}">${k}${v&&v.rest?'<i>🏨</i>':''}</span>`}
  return `<div class="card"><div class="row" style="justify-content:space-between"><button class="chip mini" data-cal="-1">‹</button><h3>${y}年${mo+1}月</h3><button class="chip mini" data-cal="1" ${calOff>=0?'disabled':''}>›</button></div>
    <div class="cal"><b>月</b><b>火</b><b>水</b><b>木</b><b>金</b><b class="sat">土</b><b class="sun">日</b>${cells}</div>
    <div class="calleg"><span class="cd l1"></span>30分未満 <span class="cd l2"></span>60分未満 <span class="cd l3"></span>60分以上 🏨宿屋</div>
    <p class="sub" style="margin:6px 0 0">この月の練習：<b style="color:var(--ink)">${pd}日・${tm}分</b></p></div>`;
}
function logView(){
  const total=S.logs.filter(l=>!l.rest).reduce((a,l)=>a+l.min,0);
  return `<div class="wrap">
    <h2 style="margin:8px 0 12px">がんばりの記録</h2>
    ${weekCard()}
    ${calendarCard()}
    <div class="card row" style="justify-content:space-around;text-align:center">
      <div><div class="big">${practiceDays(S)}</div><div class="sub">練習した日</div></div>
      <div><div class="big">${total}</div><div class="sub">合計（分）</div></div>
    </div>
    <div class="card"><h3>自己ベスト</h3>
      ${SPORT.menus.filter(m=>m.rec).map(m=>`<div class="log"><span>${m.name}：${m.rec}</span><b>${S.best[m.id]!=null?S.best[m.id]+m.unit:'—'}</b></div>`).join('')}
    </div>
    <div class="card"><h3>最近の練習</h3>
      ${S.logs.length?S.logs.slice(0,30).map(l=>{const m=SPORT.menus.find(x=>x.id===l.menu);
        return `<div class="log"><span>${l.date.slice(5).replace('-','/')}　${l.rest?'🏨 休養日':(m?m.name:'練習')+' '+l.min+'分'}${l.rec!=null?'（記録 '+l.rec+'）':''}</span><span class="xpplus">+${l.xp}</span></div>`}).join('')
      :'<p class="sub">まだ記録がないよ</p>'}
    </div>
  </div>`;
}
async function resetAll(){if(!await parentGate())return;if(await dialog({icon:'⚠️',title:'本当に全部消していい？',msg:'キャラ・記録・コインがすべて消えます。元には戻せません。先にバックアップを保存しておくと安心です。',ok:'全部消す',cancel:'やめる',danger:true})){try{localStorage.removeItem(KEY)}catch(e){}S=null;ed=null;render()}}
let shopCat=0, wardCat=0;
const ITEM_DESC={ball:'練習で使うボール。カードのキャラが持つよ',boot:'足元をかっこよく',kit:'特別なデザインのユニフォーム',bg:'カードの背景が変わるよ'};
function shopView(){
  const C=SHOP[shopCat], coin=S.coin||0;
  const items=C.items.filter(x=>x.price>0);
  return `<div class="shop">
    <div class="shophead">
      <div class="awning"></div>
      <div class="sign">⚽ サッカーショップ</div>
      <div class="clerk"><span class="clerkic">🧑‍💼</span><p>いらっしゃい！ 練習でためたコインで 好きな用具と交換できるよ。</p></div>
    </div>
    <div class="wrap" style="padding-top:10px">
      <div class="row" style="justify-content:space-between;margin-bottom:10px"><button class="chip mini" onclick="go('home')">‹ ホーム</button><span class="coin">🪙 ${coin}</span></div>
      <div class="tabs" style="margin-bottom:12px">${SHOP.map((x,i)=>`<button class="chip ${i===shopCat?'on':''}" data-sc="${i}">${x.name}</button>`).join('')}</div>
      <div class="shelf">${items.map(it=>{const own=S.inv.includes(it.id);
        return `<button class="goods ${own?'sold':''}" data-buy="${it.id}"><div class="gicon">${itemIcon(C.cat,it)}</div><b>${it.name}</b>${own?'<span class="tag own">購入済み</span>':`<span class="tag ${coin<it.price?'short':''}">🪙 ${it.price}</span>`}</button>`}).join('')}</div>
      <button class="btn ghost" onclick="go('wardrobe')" style="margin-top:16px">買ったアイテムは「着せ替え」で使えるよ ›</button>
    </div>
  </div>`;
}
function bindShop(){
  const app=document.getElementById('app'), C=SHOP[shopCat];
  app.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>{shopCat=+b.dataset.sc;render()});
  app.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{
    const it=C.items.find(x=>x.id===b.dataset.buy), own=S.inv.includes(it.id), coin=S.coin||0;
    const box=document.getElementById('ovbox');
    box.innerHTML=`<div class="bigicon">${itemIcon(C.cat,it)}</div><h2 style="font-size:24px">${it.name}</h2><p class="sub">${ITEM_DESC[C.cat]}</p>
      ${own?`<p>もう持っているよ</p><button class="btn" id="ovgo">着せ替えで使う</button>`
        :coin>=it.price?`<button class="btn gold" id="ovgo">🪙 ${it.price} で交換する</button>`
        :`<p class="sub">あと <b style="color:#ffd86b">${it.price-coin}</b> コイン。練習してためよう！</p>`}
      <button class="btn ghost" id="ovno" style="margin-top:10px">やめる</button>`;
    document.getElementById('ov').classList.add('show');
    document.getElementById('ovno').onclick=()=>document.getElementById('ov').classList.remove('show');
    const g=document.getElementById('ovgo');
    if(g) g.onclick=()=>{
      if(own){document.getElementById('ov').classList.remove('show');wardCat=shopCat;go('wardrobe');return}
      S.coin-=it.price;S.inv.push(it.id);save();sfx('coin');
      box.innerHTML=`<div class="star">🛍️</div><h2>交換完了！</h2><div class="bigicon">${itemIcon(C.cat,it)}</div><p><b>${it.name}</b> を手に入れた！</p>
        <button class="btn" id="ovwear">さっそく着せ替える</button><button class="btn ghost" id="ovno2" style="margin-top:10px">ショップに戻る</button>`;
      document.getElementById('ovwear').onclick=()=>{S.wear[C.cat]=it.id;save();document.getElementById('ov').classList.remove('show');wardCat=shopCat;go('wardrobe')};
      document.getElementById('ovno2').onclick=()=>{document.getElementById('ov').classList.remove('show');render()};
    };
  });
}
function wardrobeView(){
  const C=SHOP[wardCat], w=wear(S), L=lv(S.xp).L;
  const own=C.items.filter(x=>S.inv.includes(x.id));
  return `<div class="wrap">
    <div class="row" style="justify-content:space-between;margin:4px 0 10px"><button class="chip mini" onclick="go('settings')">‹ 設定</button><h2 style="margin:0">着せ替え</h2><button class="chip mini" onclick="go('shop')">ショップ ›</button></div>
    <div class="wardprev">${cardView(S,L,stageOf(L))}</div>
    <div class="tabs" style="margin:14px 0 12px">${SHOP.map((x,i)=>`<button class="chip ${i===wardCat?'on':''}" data-wc="${i}">${x.name}</button>`).join('')}</div>
    <div class="shelf">${own.map(it=>`<button class="goods ${w[C.cat]===it.id?'wearing':''}" data-wear="${it.id}"><div class="gicon">${itemIcon(C.cat,it)}</div><b>${it.name}</b>${w[C.cat]===it.id?'<span class="tag own">装備中</span>':''}</button>`).join('')}</div>
    ${own.length<C.items.length?`<p class="sub" style="text-align:center;margin-top:12px">ほかの${C.name}は ショップで交換できるよ</p>`:''}
  </div>`;
}
function bindWardrobe(){
  const app=document.getElementById('app'), C=SHOP[wardCat];
  app.querySelectorAll('[data-wc]').forEach(b=>b.onclick=()=>{wardCat=+b.dataset.wc;render()});
  app.querySelectorAll('[data-wear]').forEach(b=>b.onclick=()=>{S.wear[C.cat]=b.dataset.wear;save();const y=window.scrollY;render();window.scrollTo(0,y)});
}
/* ===== 保護者レポート・応援メッセージ ===== */
async function openReport(){if(await parentGate())go('report')}
function mondayOf(d){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function reportView(){
  const W=[];
  for(let i=3;i>=0;i--){const st=mondayOf(new Date());st.setDate(st.getDate()-7*i);const en=new Date(st);en.setDate(en.getDate()+6);
    const a=ds(st), b=ds(en), L=S.logs.filter(l=>l.date>=a&&l.date<=b);
    W.push({label:`${st.getMonth()+1}/${st.getDate()}〜`,days:new Set(L.filter(l=>!l.rest).map(l=>l.date)).size,min:L.reduce((t,l)=>t+(l.min||0),0),rest:L.filter(l=>l.rest).length})}
  const maxM=Math.max(60,...W.map(w=>w.min));
  const from=new Date();from.setDate(from.getDate()-27);const f=ds(from);
  const R=S.logs.filter(l=>!l.rest&&l.date>=f);
  const byCat={};R.forEach(l=>{const m=menuOf(l.menu);const c=m?m.cat:'game';byCat[c]=(byCat[c]||0)+l.min});
  const tot=Object.values(byCat).reduce((a,b)=>a+b,0)||1;
  const catCol={phy:'#7be3a6',tec:'#e8c15a',iq:'#8fb4ff',game:'#ff9a7a'};
  const weak=CATS.filter(c=>!byCat[c.id]).map(c=>c.name);
  const pb=R.filter(l=>l.pb).length;
  return `<div class="wrap">
    <div class="row" style="justify-content:space-between;margin:4px 0 10px"><button class="chip mini" onclick="go('settings')">‹ 設定</button><h2 style="margin:0">保護者レポート</h2><span></span></div>
    <div class="card"><h3>直近4週間の練習</h3>
      <svg viewBox="0 0 320 150" style="width:100%;display:block;margin-top:8px">${W.map((w,i)=>{const h=w.min/maxM*100,x=20+i*76;
        return `<rect x="${x}" y="${115-h}" width="44" height="${h}" rx="4" fill="url(#rg)"/><text x="${x+22}" y="${108-h}" text-anchor="middle" font-size="11" fill="#f3dc8f" font-weight="700">${w.min}分</text><text x="${x+22}" y="132" text-anchor="middle" font-size="10" fill="#8e9ab3">${w.label}</text><text x="${x+22}" y="146" text-anchor="middle" font-size="10" fill="#eef2fa">${w.days}日${w.rest?`・休${w.rest}`:''}</text>`}).join('')}
        <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dc8f"/><stop offset="1" stop-color="#b8901f"/></linearGradient></defs><path d="M10 115H310" stroke="rgba(255,255,255,.15)"/></svg>
      <p class="sub" style="margin:4px 0 0">目安：週4日前後・1日60分程度まで。休養日も大切です。</p>
    </div>
    <div class="card"><h3>練習のバランス（直近4週間）</h3>
      <div class="balbar">${CATS.map(c=>byCat[c.id]?`<i style="width:${byCat[c.id]/tot*100}%;background:${catCol[c.id]}"></i>`:'').join('')}</div>
      <div class="legend" style="margin:8px 0 0">${CATS.map(c=>`<span><i style="background:${catCol[c.id]}"></i>${c.name} ${Math.round((byCat[c.id]||0)/tot*100)}%</span>`).join('')}</div>
      ${R.length&&weak.length?`<p class="sub" style="margin:8px 0 0">💡 最近「${weak.join('・')}」の練習がありません。声をかけてみてください。</p>`:''}
    </div>
    <div class="card"><h3>がんばりのポイント</h3>
      <div class="log"><span>自己ベスト更新（4週間）</span><b>${pb}回</b></div>
      <div class="log"><span>今週の目標（週${WEEK_GOAL}日）</span><b>${weekDays()}/${WEEK_GOAL}日</b></div>
      <div class="log"><span>継続日数（休養日を含む）</span><b>${streak()}日</b></div>
      <div class="log"><span>現在のHP（疲れ具合）</span><b>${Math.round(S.hp??100)}/100</b></div>
    </div>
    <div class="card"><h3>📣 応援メッセージを送る</h3>
      <p class="sub" style="margin:4px 0 8px">次にアプリを開いたとき、ホームに表示されます。</p>
      <textarea id="pmsg" maxlength="80" rows="3" placeholder="例：今週もよくがんばったね！ 日曜日の試合楽しみにしてるよ">${esc((S.pmsg&&!S.pmsg.read&&S.pmsg.t)||'')}</textarea>
      <label class="row" style="margin:10px 0;font-size:14px"><input type="checkbox" id="pgift" ${S.pgift===weekKey()?'disabled':''}> ごほうびに 🪙50 をつける（週1回まで）</label>
      <button class="btn gold" id="psend">送る</button>
    </div>
  </div>`;
}
function bindReport(){
  document.getElementById('psend').onclick=()=>{
    const t=document.getElementById('pmsg').value.trim();
    if(!t){dialog({icon:'✏️',title:'メッセージを入力してください'});return}
    const g=document.getElementById('pgift'); const gift=g&&g.checked&&!g.disabled;
    S.pmsg={t,date:today(),read:false,gift:gift?50:0}; if(gift)S.pgift=weekKey();
    save(); dialog({icon:'📣',title:'送りました',msg:'お子さんが次にホームを開いたときに表示されます。'}).then(()=>go('home'));
  };
}
function parentMsgCard(){
  const m=S.pmsg; if(!m||m.read)return '';
  return `<div class="card pmsgcard"><h3>📣 おうちの人から</h3><p style="margin:8px 0 12px;line-height:1.7;font-weight:700">${esc(m.t)}</p>${m.gift?`<p class="sub" style="margin:0 0 10px">ごほうび 🪙${m.gift} つき！</p>`:''}<button class="btn gold" id="pread">ありがとう！</button></div>`;
}
function settingsView(){
  return `<div class="wrap">
    <h2 style="margin:8px 0 12px">設定</h2>
    <div class="card"><h3>プロフィール</h3>
      <button class="setrow" onclick="go('edit')"><span>キャラ・名前・背番号を変える</span><span class="arr">›</span></button>
      <button class="setrow" onclick="go('wardrobe')"><span>着せ替え</span><span class="arr">›</span></button>
      <button class="setrow" onclick="go('shop')"><span>ショップ</span><span class="arr">›</span></button>
    </div>
    <div class="card"><h3>保護者の方へ</h3>
      <button class="setrow" onclick="openReport()"><span>保護者レポート・応援メッセージ</span><span class="arr">›</span></button>
      <button class="setrow" onclick="openPrivacy()"><span>プライバシーポリシー</span><span class="arr">›</span></button>
    </div>
    <div class="card"><h3>サウンド</h3>
      <button class="setrow" onclick="S.sound=S.sound===false;save();render();sfx('ok')"><span>効果音・振動</span><span class="arr">${S.sound===false?'オフ':'オン'}</span></button>
    </div>
    <div class="card"><h3>遊び方</h3>
      <button class="setrow" onclick="showTutorial()"><span>遊び方をもう一度見る</span><span class="arr">›</span></button>
    </div>
    <div class="card"><h3>データ（保護者の方へ）</h3>
      <p class="sub" style="margin:6px 0 4px;line-height:1.6">記録はこの端末の中にだけ保存され、外部には送信されません。機種変更に備えて、ときどきバックアップを保存してください。</p>
      <button class="setrow" onclick="exportData()"><span>バックアップを保存する</span><span class="arr">›</span></button>
      <button class="setrow" onclick="importData()"><span>バックアップから読みこむ</span><span class="arr">›</span></button>
      <button class="setrow danger" onclick="resetAll()"><span>最初からやり直す</span><span class="arr">›</span></button>
    </div>
    ${swReg?'<button class="btn ghost" style="font-size:15px" onclick="checkUpdate()">新しい版があるか確認する</button>':''}
    <p class="sub" style="text-align:center">れんしゅうクエスト ver ${APP_VERSION}</p>
  </div>`;
}
function go(t){tab=t;render();applyUpdate()}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>go(b.dataset.tab));
/* ===== アプリの更新 =====
   新しい版が届いたら読みこみ直す。入力中・お知らせ表示中は待って、ホームか設定にいるときだけ */
let swReg=null, updReady=false;
function canReload(){
  if(!S||ed||!['home','settings'].includes(tab))return false;
  if(document.getElementById('ov').classList.contains('show'))return false;
  const a=document.activeElement; return !(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName));
}
function applyUpdate(){if(updReady&&canReload()){updReady=false;location.reload()}}
async function checkUpdate(){
  try{await swReg.update()}catch(e){await dialog({icon:'📶',title:'確認できませんでした',msg:'インターネットにつながっているか確かめて、もう一度試してね。'});return}
  if(updReady){applyUpdate();return}
  if(!swReg.installing&&!swReg.waiting) dialog({icon:'✅',title:'最新の版です',msg:`いまの版は ver ${APP_VERSION} だよ。`});
}
function startUpdater(){
  const sw=navigator.serviceWorker; let had=!!sw.controller;
  sw.addEventListener('controllerchange',()=>{if(had){updReady=true;applyUpdate()}had=true});
  sw.register('sw.js',{updateViaCache:'none'}).then(r=>{if(!window.Capacitor)swReg=r;
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){r.update().catch(()=>{});applyUpdate()}});
  }).catch(()=>{});
}
/* 予期しないエラーが起きても 固まらないように */
let errShown=false;
window.addEventListener('error',()=>{if(errShown)return;errShown=true;
  try{dialog({icon:'⚠️',title:'問題が発生しました',msg:'アプリを読みこみ直します。記録は保存されています。',ok:'読みこみ直す'}).then(()=>location.reload())}catch(e){}});
load();render();
if(S&&!S.tut){S.tut=1;save()} // 既存ユーザーには 遊び方を 自動では出さない
if('serviceWorker' in navigator&&window.isSecureContext)startUpdater();
