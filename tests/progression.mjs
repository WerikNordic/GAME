import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Bot');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(2500);
const R=await p.evaluate(()=>{const g=window.__game(),j=g.j;const out=[];
 for(const line of ['berserker','escudeiro','cacador','volva','valquiria','skald','thay']){
  const ps=j.ps;ps.line='aprendiz';ps.tier=0;ps.level=1;ps.exp=0;ps.jobLevel=60;ps.jobExp=0;ps.skillPoints=0;ps.statPoints=0;ps.reborn=0;
  const log=[];const c=g.Cc(ps,line);log.push('Cc:'+c.ok);
  ps.jobLevel=70;let y=g.Jy(ps);log.push('Jy1:'+y.ok);ps.jobLevel=90;y=g.Jy(ps);log.push('Jy2:'+y.ok+' tier'+ps.tier);
  // level up to 99 using Yu
  let guard=0;while(ps.level<99&&guard++<400)g.Yu(ps,1e7);
  const r=g.Rb(ps);log.push('Rb:'+r.ok+' tier'+ps.tier+' lv'+ps.level+' sp'+ps.statPoints);
  const d=g.Ua(ps);const fin=Object.values(d).every(v=>typeof v!=='number'||isFinite(v));
  out.push(line+' '+log.join(' ')+' stats_finite='+fin+' maxHp='+d.maxHp);
 }return out});
console.log(R.join('\n'));console.log('PAGE ERRORS',e.slice(0,10));process.exit(0)
