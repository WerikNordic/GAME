import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(2500);
const R=await p.evaluate(()=>{const g=window.__game(),j=g.j,D=window.__data(),ps=j.ps;const Or=D.Or;const out=[];ps.level=99;ps.silver=0;
 let progress=true,rounds=0;const stuck=[];
 while(progress&&rounds++<40){progress=false;
  for(const q of Object.values(Or)){
   if(ps.quests.done.includes(q.id))continue;
   // offer through giver dialogue
   if(!ps.quests.active[q.id]){j.openDialogue(q.giver);const d=j.dialogue;const act=d&&d.action;const offers=act&&act.type==='offerQuest'&&act.quest===q.id;
    if(!offers){ // maybe other quest from same giver first; skip
     j.dialogue=null;continue}
    j.dialogueConfirm();j.dialogue=null;if(!ps.quests.active[q.id])continue}
   // satisfy objectives
   q.objectives.forEach((o,i)=>{if(o.type==='kill')ps.quests.active[q.id].counts[i]=o.count;else{for(let k=0;k<o.count;k++){const slot=ps.inventory.slots.findIndex(s=>!s);if(slot>=0)ps.inventory.slots[slot]={id:o.item,qty:1}}}});
   // turn in through dialogue
   j.openDialogue(q.giver);const d2=j.dialogue;const t=d2&&d2.action&&d2.action.type==='turnIn'&&d2.action.quest===q.id;
   if(t){j.dialogueConfirm();j.dialogue=null}else{j.dialogue=null;continue}
   if(ps.quests.done.includes(q.id)){progress=true;out.push('ok '+q.id)}
   ps.inventory.slots.fill(null);
  }}
 const left=Object.values(Or).filter(q=>!ps.quests.done.includes(q.id)).map(q=>q.id+'('+q.giver+')');
 return {done:ps.quests.done.length,total:Object.keys(Or).length,left}});
console.log(JSON.stringify(R));console.log('PAGE ERRORS',e.slice(0,10));process.exit(0)
