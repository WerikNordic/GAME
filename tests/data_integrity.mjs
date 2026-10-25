import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
 const D=window.__data(),I=window.__items(),defs=window.__defs(),maps=window.__maps();const out=[];const bad=(k,m)=>out.push(k+': '+m);
 const dm=Object.fromEntries(defs.map(d=>[d.id,d]));
 const mapArr=Object.values(maps);const mapIds=new Set(mapArr.map(m=>m.id));
 // 1 drops reference items
 for(const d of defs)for(const x of d.drops||[])if(!I[x.item])bad('drop',d.id+' -> '+x.item);
 // 2 spawns reference monsters
 for(const m of mapArr)for(const s of m.spawns||[])if(!dm[s.monster])bad('spawn',m.id+' -> '+s.monster);
 // 3 quests
 const spawned=new Set();mapArr.forEach(m=>(m.spawns||[]).forEach(s=>spawned.add(s.monster)));
 const dropSrc={};defs.forEach(d=>(d.drops||[]).forEach(x=>{(dropSrc[x.item]=dropSrc[x.item]||[]).push(d.id)}));
 for(const q of Object.values(D.Or)){
  if(q.requires&&!D.Or[q.requires])bad('quest.requires',q.id+' -> '+q.requires);
  for(const o of q.objectives||[]){
   if(o.type==='kill'){ if(!dm[o.monster])bad('quest.kill',q.id+' monster '+o.monster); else if(!spawned.has(o.monster)&&!dm[o.monster].boss)bad('quest.kill.nospawn',q.id+' '+o.monster)}
   if(o.type==='deliver'||o.type==='collect'){ if(!I[o.item])bad('quest.item',q.id+' '+o.item); else if(!(dropSrc[o.item]||[]).some(m=>spawned.has(m)||dm[m]?.boss) && !(D.Ep||[]).includes(o.item))bad('quest.item.nosource',q.id+' '+o.item)}
  }
  for(const it of q.reward?.items||[])if(!I[it.id])bad('quest.reward',q.id+' '+it.id);
 }
 // 4 map connectivity via portals/from
 const ref={};mapArr.forEach(m=>{ref[m.id]=0});
 mapArr.forEach(m=>{(m.portals||m.exits||[]).forEach(p=>{const t=p.to||p.map||p.target;if(t){if(!mapIds.has(t))bad('portal',m.id+' -> '+t);else ref[t]++}})});
 const unreach=Object.entries(ref).filter(([k,v])=>v===0).map(([k])=>k);
 // 5 craft recipes
 for(const r of D.CRAFT_REC||[]){const ing=r.ingredients||r.need||[];for(const x of ing){const id=Array.isArray(x)?x[0]:x.id||x.item;if(id&&!I[id])bad('craft.ing',(r.id||r.out)+' '+id)} const o=r.output||r.out||r.result;if(o&&!I[o])bad('craft.out',(r.id)+' '+o)}
 // 6 shop items
 for(const id of D.Ep||[])if(!I[id])bad('shop',id);
 // 7 realm quests
 for(const q of D.REALM_Q||[]){ const mid=q.map; }
 return {out,unreach,counts:{items:Object.keys(I).length,monsters:defs.length,maps:mapArr.length,quests:Object.keys(D.Or).length,craft:(D.CRAFT_REC||[]).length},sampleMap:Object.keys(mapArr[0]),sampleRec:JSON.stringify((D.CRAFT_REC||[])[0]).slice(0,200)};
});
console.log(JSON.stringify(r,null,1).slice(0,5000));console.log(e);process.exit(0)
