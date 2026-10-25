import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
 const D=window.__data(),I=window.__items(),maps=Object.values(window.__maps());const out=[];const bad=(k,m)=>out.push(k+': '+m);
 const ids=new Set(maps.map(m=>m.id));
 const sample=JSON.stringify(maps.find(m=>m.id==='campos_midgard').portals[0]);
 const edges={};maps.forEach(m=>{edges[m.id]=(m.portals||[]).map(p=>p.to||p.toMap||p.dest||p.map||p.target||p.mapId).filter(Boolean)});
 // reachability from cidade_midgard (+ warp/teleport assumed to cities)
 const seen=new Set(['cidade_midgard']);const q=['cidade_midgard'];
 while(q.length){const c=q.shift();for(const t of edges[c]||[]){if(!seen.has(t)&&ids.has(t)){seen.add(t);q.push(t)}else if(!ids.has(t))bad('portal.target',c+' -> '+t)}}
 // maps pointing "from"
 const unreach=maps.filter(m=>!seen.has(m.id)).map(m=>m.id);
 for(const r of D.CRAFT_REC||[]){for(const [id] of r.ing||[])if(!I[id])bad('craft.ing',r.id+' '+id);if(!I[r.out])bad('craft.out',r.id+' '+r.out)}
 // craft ingredient sourcing: each ingredient must be droppable, sold, or craftable
 const defs=window.__defs();const drop=new Set();defs.forEach(d=>(d.drops||[]).forEach(x=>drop.add(x.item)));const crafted=new Set((D.CRAFT_REC||[]).map(r=>r.out));const sold=new Set(D.Ep||[]);
 const nosrc=new Set();for(const r of D.CRAFT_REC||[])for(const [id] of r.ing||[])if(!drop.has(id)&&!crafted.has(id)&&!sold.has(id))nosrc.add(id);
 return {sample,unreachN:unreach.length,unreach:unreach.slice(0,40),out,nosrc:[...nosrc]};
});
console.log(JSON.stringify(r,null,1));console.log(e);process.exit(0)
