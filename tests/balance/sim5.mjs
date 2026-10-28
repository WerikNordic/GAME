import fs from 'fs';
import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:600}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(600);
await p.evaluate(()=>{window.__admin=false});
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Tst');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(1800);
const LV=[1,5,10,15,20,25,30,40,50,60,70,80,90,99];
const out=await p.evaluate((LV)=>{const g=window.__game();const {Ce,Ua}=g;const ps=g.j.world.ps;const items=Object.values(window.__items());
const U8=d=>100/(100+Math.max(0,d)*1.5);const I8=L=>6+Math.floor(L/10);
const jy=r=>1+.14*(r-1),Ju=(m,r)=>Math.round(m*(1+.05*(r-1))),By=(c,r)=>Math.round(c*(1-.03*(r-1)));
const rk={common:0,uncommon:1,rare:2,epic:3,legendary:4};
const lines=['berserker','escudeiro','cacador','volva','valquiria','skald','thay'];const ranged=new Set(['cacador','volva']);
const slotKinds={weapon:'weapon',armor:'armor',accessory:'accessory',headTop:'headTop',back:'back',headMid:'headMid',headLow:'headLow'};
const sc=(i,slot)=>{const b=i.bonus||{};const st=(b.str||0)+(b.agi||0)+(b.vit||0)+(b.int||0)+(b.dex||0)+(b.luk||0);return slot==='weapon'?(b.atk||0)+(b.matk||0)+st*4:(b.def||0)+(b.maxHp||0)/6+((b.atk||0)+(b.matk||0))*3+st*3+(b.crit||0)*600+(b.maxMp||0)/6}
const res={};
for(const ln of lines){res[ln]=[];const cl=Ce[ln];
 for(const L of LV){
  ps.line=ln;ps.level=L;ps.tier=L<10?0:L<30?1:L<60?2:3;
  let pts=0;for(let l=2;l<=L;l++)pts+=I8(l);pts+=(ps.tier>=1?10:0)+(ps.tier>=2?10:0)+(ps.tier>=3?20:0);
  const base={...cl.base};base[cl.attackStat]+=Math.round(pts*.55);base.vit+=Math.round(pts*.28);base.agi+=Math.round(pts*.1);base.dex+=Math.round(pts*.07);ps.stats=base;ps.statPoints=0;
  const cap=L<20?1:L<45?2:L<70?3:3; // raridade maxima obtivel
  ps.equipment={};
  for(const [slot,kind] of Object.entries(slotKinds)){let best=null,bs=-1;for(const i of items){if(i.kind!==kind)continue;if((i.reqLevel||0)>L)continue;if((rk[i.rarity]??9)>cap)continue;if(kind==='weapon'&&(!i.allowedJobs||!i.allowedJobs.includes(ln)))continue;const s=sc(i,slot);if(s>bs){bs=s;best=i}}if(best)ps.equipment[slot]=best.id}
  let d;try{d=Ua(ps)}catch(x){res[ln].push({L,err:String(x)});continue}
  const sl=(ps.tier>=2?10:5);
  // skills disponiveis
  const dmg=cl.skills.map((s,idx)=>({s,idx})).filter(o=>o.s.tier<=ps.tier&&o.s.mult>0&&['cone','projectile','nova','line','chain','volley','aoe','strike','beam','meteor','rain','target','dash'].includes(o.s.kind)||o.s.tier<=ps.tier&&o.s.mult>0&&o.s.kind!=='heal'&&o.s.kind!=='buff');
  // 4 melhores por dano/mp efetivo (jogador maxa as principais)
  const lvls=dmg.map(o=>({o,v:o.s.mult/(o.s.cooldown/1000)})).sort((a,b)=>b.v-a.v).slice(0,4).map(x=>x.o);
  res[ln].push({L,hp:d.maxHp,mp:d.maxMp,atk:d.atk,matk:d.matk,def:d.def,crit:+d.crit.toFixed(2),gear:Object.keys(ps.equipment).length,nsk:lvls.length,
   skills:lvls.map(o=>[o.s.mult,o.s.mp,o.s.cooldown,!!o.s.magic]),basic:[cl.basic.cooldown,d.attackCooldown,!!cl.basic.magic],ranged:ranged.has(ln),int:ps.stats.int,sl})
 }}
return res},LV);
fs.writeFileSync('sim5.json',JSON.stringify(out));console.log('ok',e.slice(0,2));process.exit(0)
