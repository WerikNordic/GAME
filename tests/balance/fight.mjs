import fs from 'fs';
const R=JSON.parse(fs.readFileSync('sim5.json'));
const U8=d=>100/(100+Math.max(0,d)*1.5);const jy=r=>1+.14*(r-1),Ju=(m,r)=>Math.round(m*(1+.05*(r-1))),By=(c,r)=>Math.round(c*(1-.03*(r-1)));
const DT=[[1,3],[10,10],[20,20],[30,32],[40,40],[60,38],[80,46],[99,52]];
const lerp=(T,L)=>{for(let i=1;i<T.length;i++)if(L<=T[i][0]){const[a,x]=T[i-1],[b,y]=T[i];return x+(y-x)*(L-a)/(b-a)}return T[T.length-1][1]};
// DPS sustentado de um jogador contra monstro com def D (simulacao 40s)
function dps(x,D){const P=(m)=>m?x.matk:x.atk;const lv=Math.min(x.sl,1+Math.floor(x.L/9));let t=0,mp=x.mp,dmg=0,ready=x.skills.map(()=>0),nextB=0,gap=0;const reg=1.2+x.int*.08;const u=U8(D),ce=x.crit;
 const hit=(pw,m)=>pw*m*(ce*1.5+(1-ce)*u);
 while(t<40){mp=Math.min(x.mp,mp+reg*.1);if(t>=gap){let bi=-1,bm=0;x.skills.forEach((s,i)=>{const c=Ju(s[1],lv);if(t>=ready[i]&&mp>=c&&s[0]>bm){bm=s[0];bi=i}});
  if(bi>=0){const s=x.skills[bi];dmg+=hit(P(s[3]),s[0]*jy(lv));mp-=Ju(s[1],lv);ready[bi]=t+By(s[2],lv)/1000;gap=t+.55}
  else if(t>=nextB){dmg+=hit(P(x.basic[2]),1);nextB=t+x.basic[1]/1000;gap=t+.2}}
 t+=.1}return dmg/40}
const lv=[...new Set(Object.values(R)[0].map(x=>x.L))];
const med=a=>{a=[...a].sort((p,q)=>p-q);return a[Math.floor(a.length/2)]};
const tab=[];
for(const L of lv){const rows=Object.entries(R).map(([ln,a])=>({ln,...a.find(x=>x.L===L)}));rows.forEach(x=>{x.L=L});
 const D=lerp(DT,L);const dd=rows.map(x=>dps(x,D));const hp=rows.map(x=>x.hp),df=rows.map(x=>x.def);
 tab.push({L,D:+D.toFixed(0),dps:Math.round(med(dd)),min:Math.round(Math.min(...dd)),max:Math.round(Math.max(...dd)),hp:med(hp),def:med(df),byc:Object.fromEntries(rows.map((x,i)=>[x.ln,Math.round(dd[i])]))})}
console.log(tab.map(t=>`L${t.L} D${t.D} dps med ${t.dps} [${t.min}-${t.max}] hp ${t.hp} def ${t.def}`).join('\n'));
fs.writeFileSync('tab.json',JSON.stringify(tab));
