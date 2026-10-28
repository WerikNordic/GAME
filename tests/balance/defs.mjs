// Bot de combate dentro do motor real do jogo: cada classe x nivel enfrenta monstros reais (cadeia de lutas, com pocoes).
import fs from 'fs';
import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const DECIDE=+(process.argv[4]||300);const OUT=process.argv[2]||'bot.json';const FIGHTS=+(process.argv[3]||8);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:600}});const errs=[];p.on('pageerror',x=>errs.push(x.message.slice(0,200)));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(600);
await p.evaluate(()=>{window.__admin=false});
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(1800);
await p.evaluate(()=>{window.__noAdm=true;window.__game().j.sendChat('@warp campos_midgard')});await p.waitForTimeout(1200);
const res=await p.evaluate(({FIGHTS,DECIDE})=>{
const g=window.__game();const {Ce,Ua,He,Qu}=g;const j=g.j;const w=j.world;const ps=w.ps;const items=Object.values(window.__items());
const I8=L=>6+Math.floor(L/10);const rk={common:0,uncommon:1,rare:2,epic:3,legendary:4};
const slotKinds={weapon:'weapon',armor:'armor',accessory:'accessory',headTop:'headTop',back:'back',headMid:'headMid',headLow:'headLow'};
const sc=(i,slot)=>{const b=i.bonus||{};const st=(b.str||0)+(b.agi||0)+(b.vit||0)+(b.int||0)+(b.dex||0)+(b.luk||0);return slot==='weapon'?(b.atk||0)+(b.matk||0)+st*4:(b.def||0)+(b.maxHp||0)/6+((b.atk||0)+(b.matk||0))*3+st*3+(b.crit||0)*600+(b.maxMp||0)/6}
const defs=Object.values(Qu);const normal=defs.filter(d=>!d.boss&&d.level&&d.id!=='jormungandr');
function setup(ln,L){ps.line=ln;ps.level=L;ps.tier=ln==='aprendiz'?0:(L<10?0:L<30?1:L<60?2:3);
 let pts=0;for(let l=2;l<=L;l++)pts+=I8(l);pts+=(ps.tier>=1?10:0)+(ps.tier>=2?10:0)+(ps.tier>=3?20:0);const cl=Ce[ln];const base={...cl.base};base[cl.attackStat]+=Math.round(pts*.55);base.vit+=Math.round(pts*.28);base.agi+=Math.round(pts*.1);base.dex+=Math.round(pts*.07);ps.stats=base;ps.statPoints=0;
 const cap=L<20?1:L<45?2:3;ps.equipment={};for(const [slot,kind] of Object.entries(slotKinds)){let best=null,bs=-1;for(const i of items){if(i.kind!==kind||(i.reqLevel||0)>L||(rk[i.rarity]??9)>cap)continue;if(kind==='weapon'&&(!i.allowedJobs||!i.allowedJobs.includes(ln)))continue;const s=sc(i,slot);if(s>bs){bs=s;best=i}}if(best)ps.equipment[slot]=best.id}
 const lv=Math.min(ps.tier>=2?10:5,1+Math.floor(L/9));ps.skillLevels=new Array(64).fill(lv);
 // pocoes
 ps.inventory.slots=ps.inventory.slots.map(()=>null);
 for(const [id,min] of [['pocao_vermelha',1],['pocao_laranja',12],['pocao_branca',30]])if(L>=min)He(ps.inventory,id,99);
 if(L>=10)He(ps.inventory,'pocao_azul',99);
 for(let q=0;q<4;q++)He(ps.inventory,'flecha_ferro',500);ps.ammo='flecha_ferro';
 const d=Ua(ps);ps.hp=d.maxHp;ps.mp=d.maxMp;ps.silver=0;ps.exp=0;ps.homun&&(ps.homun.on=false)}
const spot={x:w.map.spawn.x+400,y:w.map.spawn.y+1500};
function resetArena(){w.map.obstacles=[];w.monsters.length=0;w.player.pos={...spot};w.player.deadAt=null;w.player.invulnUntil=0;w.player.buffs=[];w.player.skillReadyAt.fill(0);w.player.attackReadyAt=0;w.player.potionReadyAt=0;w.castState=null}
function potCount(){return ps.inventory.slots.reduce((s,q)=>s+(q&&/^pocao_/.test(q.id)?q.qty:0),0)}
function fight(def,cl,maxS=240){const L=ps.level;const m=w.makeMonster(def,{x:spot.x+110,y:spot.y},-1,true);w.monsters.push(m);
 const d0=Ua(ps);const hp0=ps.hp;let t=0,pots=0,minHp=ps.hp,died=false;w.currentTarget=m;
 const skills=cl.skills.map((s,i)=>({s,i})).filter(o=>o.s.tier<=ps.tier&&(o.s.mult>0||o.s.kind==='buff')&&o.s.kind!=='heal'&&o.s.kind!=='resurrect');
 while(t<maxS*1000&&m.state!=='dead'){
  if(t%DECIDE===0){
  const dd=w.derived();
  if(ps.hp<dd.maxHp*.4){const before=potCount();if(w.usePotion('hp')){pots++}}
  if(ps.mp<dd.maxMp*.2&&ps.level>=10&&w.usePotion('mp')){}
  const dist=Math.hypot(m.pos.x-w.player.pos.x,m.pos.y-w.player.pos.y);
  {const rg=(cl.basic.range||70)*0.7;if(dist>rg){w.setMove((m.pos.x-w.player.pos.x)/dist,(m.pos.y-w.player.pos.y)/dist)}else w.setMove(0,0)}
  w.currentTarget=m;
  let cast=false;for(const o of skills){if(w.time<w.player.skillReadyAt[o.i])continue;if(o.s.kind==='buff'&&w.buffSum('atk')>0)continue;try{if(w.castSkillNow(o.i)){cast=true;break}}catch(e){}}
  if(!cast)w.basicAttack(true);}
  w.step(50);t+=50;w.drainEvents();
  for(let k=w.monsters.length-1;k>=0;k--)if(w.monsters[k]!==m&&w.monsters[k].state!=='dead')w.monsters.splice(k,1);
  minHp=Math.min(minHp,ps.hp);if(w.player.deadAt!==null||ps.hp<=0){died=true;break}
 }
 return {t:t/1000,lost:Math.max(0,hp0-ps.hp)/d0.maxHp,pots,died,killed:m.state==='dead',minPct:minHp/d0.maxHp}}
const out=[];const all=defs.filter(d=>d.level&&d.id!=='jormungandr');
for(const ln of ['berserker','volva','cacador']){for(const d of all){const L=Math.max(1,Math.min(99,d.level));
 try{setup(ln,L);resetArena();const r=fight(d,Ce[ln],d.boss?400:120);out.push({ln,L,id:d.id,boss:!!d.boss,t:+r.t.toFixed(1),lost:Math.round(100*r.lost),pots:r.pots,died:r.died,killed:r.killed,hp:d.hp,atk:d.atk})}catch(e){out.push({ln,L,id:d.id,err:String(e).slice(0,120)})}}}
return out},{FIGHTS,DECIDE});
fs.writeFileSync(OUT,JSON.stringify(res));
const bad=res.filter(r=>r.err||!r.killed||r.died);console.log('total',res.length,'problemas',bad.length);for(const r of bad.slice(0,60))console.log(JSON.stringify(r));
console.log('errs',errs.slice(0,3));process.exit(0)
