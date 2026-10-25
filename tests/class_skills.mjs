import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:700}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(2500);
const out=await p.evaluate(async()=>{const g=window.__game();const j=g.j;const res=[];
 for(const line of ['berserker','escudeiro','cacador','volva','valquiria','skald','thay']){
  const ps=j.ps;ps.line=line;ps.tier=2;ps.level=80;ps.jobLevel=50;ps.skillLevels=Array(40).fill(3);ps.skillPoints=0;
  ps.equipment.weapon=g.Ce[line].startWeapon;ps.inventory.slots[0]={id:'flecha_ferro',qty:999};ps.ammo='flecha_ferro';
  const m=g.en('campos_midgard');j.world=new g.nr(ps,m,void 0,m.spawn);j.refresh();await new Promise(r=>setTimeout(r,300));
  const w=j.world;const mon=w.monsters.find(x=>x.state!=='dead');if(mon){w.player.pos.x=mon.pos.x-40;w.player.pos.y=mon.pos.y}
  let cast=0,fail=0,errs=[];
  const sk=g.Ce[line].skills;
  for(let i=0;i<sk.length;i++){try{ps.mp=9999;ps.hp=9999;w.player.skillReadyAt[i]=0;const ok=w.castSkill(i);ok?cast++:fail++}catch(err){errs.push(sk[i].id+':'+String(err).slice(0,80))}
   await new Promise(r=>setTimeout(r,60))}
  try{w.ultimate&&(ps.level=99,w.ultReadyAt=0,w.ultimate())}catch(err){errs.push('ult:'+String(err).slice(0,80))}
  res.push(line+' skills='+sk.length+' cast='+cast+' notcast='+fail+(errs.length?' ERR '+errs.join(';'):''));
  await new Promise(r=>setTimeout(r,500));
 }return res});
console.log(out.join('\n'));console.log('PAGE ERRORS',e.slice(0,10));process.exit(0)
