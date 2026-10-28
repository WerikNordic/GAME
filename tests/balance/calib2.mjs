// Calibra TG com medidas REAIS do motor (defs.mjs): mediana de TTK e perda por faixa de nivel -> fatores HP/ATQ
import fs from 'fs';
const R=JSON.parse(fs.readFileSync(process.argv[2])).filter(r=>!r.boss&&!r.err&&!r.died);
const game=fs.readFileSync('/home/claude/eldvar2/src/game.js','utf8');
const TG=JSON.parse(game.match(/const TG = (\[\[.*?\]\]);/s)[1]);
const med=a=>{a=[...a].sort((x,y)=>x-y);return a[Math.floor(a.length/2)]};
const F=[];let last=[1,1];
for(const [L] of TG){const w=L<=1?3:L<=10?3:L<=40?5:9;const rows=R.filter(r=>Math.abs(r.L-L)<=w&&r.killed);
 if(rows.length<9){F.push([L,...last]);console.log(`L${L} (poucos dados) reutiliza ${last.map(x=>x.toFixed(2))}`);continue}
 const t=med(rows.map(r=>r.t)),lo=Math.max(1,med(rows.map(r=>r.lost)));const k=Math.min(1,L/30);const tt=4+10*k,tl=100*(.14+.26*k);
 const fh=Math.max(.4,Math.min(6,tt/t)),fa=Math.max(.3,Math.min(10,(tl/lo)/fh));last=[fh,fa];F.push([L,fh,fa]);
 console.log(`L${String(L).padEnd(3)} n${rows.length} ttk ${t}s (alvo ${tt.toFixed(0)}) perda ${lo}% (alvo ${tl.toFixed(0)}) -> HPx${fh.toFixed(2)} ATQx${fa.toFixed(2)}`)}
const NT=TG.map(([L,h,a],i)=>[L,Math.round(h*F[i][1]),Math.round(a*F[i][2])]);
fs.writeFileSync('/tmp/w/newtg.json',JSON.stringify(NT));console.log(JSON.stringify(NT));
