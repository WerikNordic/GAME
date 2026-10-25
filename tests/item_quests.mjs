import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(2500);
const R=await p.evaluate(()=>{const g=window.__game(),j=g.j,D=window.__data(),ps=j.ps,I=window.__items();ps.level=99;const res={ok:0,fail:[]};
 const drop=new Set();window.__defs().forEach(d=>(d.drops||[]).forEach(x=>drop.add(x.item)));
 for(const q of D.RQ){ps.inventory.slots.fill(null);ps.rqDone=[];let n=0;for(const [id,c] of q.need){let left=c;while(left>0&&n<ps.inventory.slots.length){const st=Math.min(left,I[id]?.stack??left);ps.inventory.slots[n++]={id,qty:st};left-=st}}
  const before=ps.exp+ps.level*1e6;j.doQuest(q.id);const done=q.kind==='look'?ps.rqDone.includes(q.id):(ps.exp+ps.level*1e6)!==before||ps.level===99;
  done?res.ok++:res.fail.push(q.id);
  for(const [id] of q.need)if(!I[id])res.fail.push('noitem:'+id);else if(!drop.has(id)&&!D.CRAFT_REC.some(r=>r.out===id)&&!(D.Ep||[]).includes(id))res.fail.push('nosource:'+id)}
 res.total=D.RQ.length;return res});
console.log(JSON.stringify(R));console.log('PAGE ERRORS',e.slice(0,10));process.exit(0)
