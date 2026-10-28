// Calibracao por monstro com medidas reais (defs.mjs). Gera BAL = {id:[mulHP, mulATQ]} para aplicar sobre os stats atuais.
import fs from 'fs';
const R=JSON.parse(fs.readFileSync(process.argv[2])).filter(r=>!r.err);
const med=a=>{a=[...a].sort((x,y)=>x-y);return a[Math.floor(a.length/2)]};
const by={};for(const r of R){(by[r.id]=by[r.id]||{L:r.L,boss:r.boss,rows:[]}).rows.push(r)}
const M=Object.entries(by).map(([id,o])=>({id,L:o.L,boss:o.boss,t:med(o.rows.map(r=>r.killed?r.t:120)),lost:Math.max(1,med(o.rows.map(r=>r.lost)))}));
const tgt=L=>{const k=Math.min(1,L/30);return {tt:4+10*k,tl:100*(.14+.26*k)}};
const BAL={};const out=[];
const norm=M.filter(m=>!m.boss);
// fatores de HP por monstro (preserva metade da variacao relativa dentro da faixa)
for(const m of norm){const band=norm.filter(x=>Math.abs(x.L-m.L)<=4);const bt=med(band.map(x=>x.t));const v=Math.max(.75,Math.min(1.35,Math.sqrt(m.t/bt)));
 const T=tgt(m.L).tt*v;m.fh=Math.max(.5,Math.min(2.5,T/m.t))}
for(const m of norm){const band=norm.filter(x=>Math.abs(x.L-m.L)<=4);const tl=tgt(m.L).tl;const bl=med(band.map(x=>x.lost*x.fh));m.fa=Math.max(.8,Math.min(2.2,tl/bl));BAL[m.id]=[+m.fh.toFixed(2),+m.fa.toFixed(2)]}
for(const m of M.filter(x=>x.boss)){const tt=5*tgt(m.L).tt;const fh=Math.max(.6,Math.min(2.5,tt/m.t));const fa=Math.max(.8,Math.min(2.2,(70/m.lost)/fh));BAL[m.id]=[+fh.toFixed(2),+fa.toFixed(2)]}
fs.writeFileSync('/tmp/w/bal.json',JSON.stringify(BAL));
const nf=Object.values(BAL).map(x=>x[0]);console.log('monstros',Object.keys(BAL).length,'HPx mediana',med(nf),'min',Math.min(...nf),'max',Math.max(...nf));
