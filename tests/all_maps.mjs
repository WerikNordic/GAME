import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:700}});const e=[];p.on('pageerror',x=>e.push(x.message));p.on('console',m=>{if(m.type()==='error')e.push('console: '+m.text().slice(0,160))});
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(2500);
const ids=await p.evaluate(()=>Object.values(window.__maps()).map(m=>m.id));
const res=[];
for(const id of ids){
 const r=await p.evaluate(async(id)=>{const g=window.__game();const m=g.en(id);const j=g.j;j.ps.level=60;j.ps.hp=9999;
  try{j.world=new g.nr(j.ps,m,void 0,m.spawn);j.refresh()}catch(err){return {id,err:String(err)}}
  await new Promise(r=>setTimeout(r,450));
  const w=j.world;const mons=w.monsters.length;const bad=w.monsters.filter(x=>!isFinite(x.pos.x)||!isFinite(x.pos.y)).length;
  const pp=w.player.pos;return {id,mons,bad,np:!isFinite(pp.x)||!isFinite(pp.y)}},id);
 res.push(r)}
console.log('maps',res.length,'errs',res.filter(r=>r.err||r.bad||r.np).map(r=>JSON.stringify(r)).join(' '));
console.log('no monsters (non-city):',res.filter(r=>!r.mons&&!/^cidade_|segredo_|wb_/.test(r.id)).map(r=>r.id).join(','));
console.log('PAGE ERRORS',e.slice(0,10));process.exit(0)
