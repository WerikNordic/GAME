// Le bot.json, calcula fatores de correcao do TG (HP/ATQ por nivel) para atingir TTK/perda alvo; imprime novo TG
import fs from 'fs';
const R=JSON.parse(fs.readFileSync(process.argv[2]));const game=fs.readFileSync('/home/claude/eldvar2/src/game.js','utf8');
const TG=JSON.parse(game.match(/const TG = (\[\[.*?\]\]);/s)[1]);
const med=a=>{a=[...a].sort((x,y)=>x-y);return a[Math.floor(a.length/2)]};
const lv=[...new Set(R.filter(r=>!r.none&&!r.err).map(r=>r.L))].sort((a,b)=>a-b);
const F=[];
for(const L of lv){const rows=R.filter(r=>r.L===L&&!r.none&&!r.err&&r.ln!=='aprendiz'||(r.L===L&&L<=10&&r.ln==='aprendiz'&&false));if(!rows.length)continue;
 const t=med(rows.map(r=>r.t)),lo=Math.max(1,med(rows.map(r=>r.lost)));const k=Math.min(1,L/30);const tt=4+10*k,tl=100*(.14+.26*k);
 const fh=Math.max(.3,Math.min(8,tt/t));const fa=Math.max(.2,Math.min(8,(tl/lo)/fh));F.push([L,fh,fa]);console.log(`L${L} ttk ${t}s (alvo ${tt.toFixed(0)}) perda ${lo}% (alvo ${tl.toFixed(0)}) -> fh ${fh.toFixed(2)} fa ${fa.toFixed(2)}`)}
const itp=(L,j)=>{if(L<=F[0][0])return F[0][j];for(let i=1;i<F.length;i++)if(L<=F[i][0]){const[a,x,y]=[F[i-1][0],F[i-1][j],F[i][j]],b=F[i][0],u=(L-a)/(b-a);return Math.exp(Math.log(x)+(Math.log(y)-Math.log(x))*u)}return F[F.length-1][j]};
const NT=TG.map(([L,h,a])=>[L,Math.round(h*itp(L,1)),Math.round(a*itp(L,2))]);
fs.writeFileSync('/tmp/w/newtg.json',JSON.stringify(NT));console.log(JSON.stringify(NT));
