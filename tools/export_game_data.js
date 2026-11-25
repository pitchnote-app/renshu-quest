/* アプリのゲームデータ（職業・スキル・二つ名など）を JSON に書き出す。Excel 作成用
   使い方: node tools/export_game_data.js . 出力.json （ふつうは python tools/make_game_excel.py から呼ばれる） */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ROOT=process.argv[2];
function el(){return new Proxy({classList:{add(){},remove(){},toggle(){},contains(){return false}},style:{},dataset:{},value:'',querySelectorAll:()=>[],querySelector:()=>null,appendChild(){},remove(){},click(){},addEventListener(){}},{get:(t,k)=>k in t?t[k]:undefined,set:(t,k,v)=>{t[k]=v;return true}})}
const store=new Map();
const ctx={console,Math,Date,JSON,Promise,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:()=>0,Set,Map,Object,Array,Number,String,Proxy,Blob:function(){},URL:{createObjectURL:()=>'',revokeObjectURL(){}},document:{getElementById:()=>el(),querySelectorAll:()=>[],querySelector:()=>null,createElement:()=>el(),body:el(),addEventListener(){}},navigator:{},location:{reload(){}},matchMedia:()=>({matches:true}),localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)},addEventListener(){},isSecureContext:false,scrollTo(){},scrollY:0};
ctx.window=ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'app.js'),'utf8'),ctx);
const out=vm.runInContext(`(()=>{
 const fn=f=>f?String(f):'';
 return {
  stats:SPORT.stats, grps:GRPS,
  jobs:JOBS.map(j=>({name:j.name,short:j.short,up:!!j.up,all:!!j.all,stats:j.stats.map(statName),how:j.how||''})),
  skills:SKILLS.map(k=>({tier:SKILL_TIER[k.tier].name,name:k.name,how:k.how})),
  nicks:NICKS.map(N=>({name:N.name,by:N.stat?'能力ランク（'+statName(N.stat)+'）':'練習回数（'+(N.grp?GRPS.find(g=>g.id===N.grp).name:N.menus.map(m=>menuOf(m).name).join('・'))+'）',t:N.t})),
  nickSteps:NICK_STEPS,
  titles:TITLES.map(t=>({ic:t.ic,name:t.name,how:t.how})),
  menus:MENUS.map(m=>({grp:GRPS.find(g=>g.id===m.grp).name,name:m.name,lv:m.lv,gain:Object.entries(m.gain).map(([k,w])=>statName(k)+(w>=1?'◎':w>=.4?'○':'△')).join('・'),rec:m.rec?m.rec+'（'+m.unit+'）':''})),
  stages:STAGES.map((s,i)=>({lv:s.lv,stage:s.name,rank:RANKS[i],col:RANK_COL[i],room:ROOMS[i].name,cap:ROOMS[i].cap,rival:PLACE_RIVALS[i].name,need:PLACE_RIVALS[i].need,stat:PLACE_RIVALS[i].stat==='ovr'?'総合':statName(PLACE_RIVALS[i].stat),v:PLACE_RIVALS[i].v,intro:PLACE_RIVALS[i].intro,win:PLACE_RIVALS[i].win})),
  mastery:MASTERY, medals:MEDALS.map(m=>m.name),
  shop:SHOP.flatMap(c=>c.items.map(it=>({cat:c.name,id:it.id,name:it.name,price:it.price}))),
  bosses:BOSSES.map(b=>({ic:b.ic,name:b.name,menu:menuOf(b.menu).name,def:b.def,unit:menuOf(b.menu).unit||'',lower:!!menuOf(b.menu).lower})),
  qpool:QPOOL.map(q=>({t:q.t})),
  avatars:AVATARS, gear:typeof GEAR!=='undefined'?GEAR:[], chest:CHEST_ITEMS.map(([c,id])=>id), boost:{'6〜12さい':['touch','dribble','agility','balance'].map(statName),'13〜15さい':['stamina','speed','kick'].map(statName),'16さい〜':['power','stamina'].map(statName)},
  version:APP_VERSION
 }})()`,ctx);
fs.writeFileSync(process.argv[3],JSON.stringify(out,null,1));
