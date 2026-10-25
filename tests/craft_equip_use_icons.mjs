import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(2500);
const R=await p.evaluate(async()=>{const g=window.__game(),j=g.j,D=window.__data(),I=window.__items();const out={};
 // A crafting
 const m=g.en('cidade_midgard');j.world=new g.nr(j.ps,m,void 0,m.spawn);const ps=j.ps;
 ps.craft={forja:99999,alquimia:99999,cozinha:99999};let ok=0;const fail=[];
 for(const r of D.CRAFT_REC){ps.silver=999999;ps.inventory.slots.fill(null);let n=0;for(const [it,q] of r.ing)ps.inventory.slots[n++]={id:it,qty:Math.min(q,I[it]?.stack??q)};
  try{j.craftItem(r.id)}catch(err){fail.push(r.id+':'+err);continue}
  const has=ps.inventory.slots.some(s=>s&&s.id===r.out);has?ok++:fail.push(r.id)}
 out.craft=ok+'/'+D.CRAFT_REC.length+(fail.length?' FAIL '+fail.slice(0,8).join(','):'');
 // B equip
 ps.level=99;ps.tier=2;ps.line='berserker';let eq=0;const efail=[];
 for(const it of Object.values(I)){if(!['weapon','armor','accessory','headTop','headMid','headLow','back'].includes(it.kind))continue;
  ps.inventory.slots.fill(null);ps.inventory.slots[0]={id:it.id,qty:1};try{j.equipAt(0);eq++}catch(err){efail.push(it.id+':'+String(err).slice(0,50))}}
 out.equip=eq+(efail.length?' FAIL '+efail.slice(0,6).join(' | '):'');
 // C consumables
 let us=0;const ufail=[];
 for(const it of Object.values(I)){if(it.kind!=='consumable')continue;ps.inventory.slots.fill(null);ps.inventory.slots[0]={id:it.id,qty:2};ps.hp=10;try{j.useItemAt(0);us++}catch(err){ufail.push(it.id+':'+String(err).slice(0,50))}}
 out.use=us+(ufail.length?' FAIL '+ufail.slice(0,6).join(' | '):'');
 // F class progression
 const cl=[];for(const line of ['berserker','escudeiro','cacador','volva','valquiria','skald','thay']){const q=g.Wy?null:null}
 return out});
console.log(JSON.stringify(R,null,1));
// D icons: show all items in inventory in batches
const n=await p.evaluate(()=>Object.keys(window.__items()).length);
for(let off=0;off<n;off+=72){await p.evaluate((off)=>{const g=window.__game(),j=g.j;const ids=Object.keys(window.__items()).slice(off,off+72);const sl=j.ps.inventory.slots;sl.fill(null);ids.forEach((id,i)=>{if(i<sl.length)sl[i]={id,qty:1}});j.ps.equipment={};j.refresh()},off);
 await p.keyboard.press('Alt+e');await p.waitForTimeout(500);if(off===0)await p.screenshot({path:'icons_all1.png'});await p.keyboard.press('Alt+e');await p.waitForTimeout(150)}
console.log('PAGE ERRORS',e.slice(0,10));process.exit(0)
