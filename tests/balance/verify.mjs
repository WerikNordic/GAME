import fs from 'fs';
const R=JSON.parse(fs.readFileSync('sim5.json'));const defs=JSON.parse(fs.readFileSync('defs.json'));
const U8=d=>100/(100+Math.max(0,d)*1.5);const jy=r=>1+.14*(r-1),Ju=(m,r)=>Math.round(m*(1+.05*(r-1))),By=(c,r)=>Math.round(c*(1-.03*(r-1)));
function dps(x,D){const P=(m)=>(m?x.matk:x.atk)*(1+(x.bf||0))*(CD[x.ln]??1);const lv=Math.min(x.sl,1+Math.floor(x.L/9));let t=0,mp=x.mp,dmg=0,ready=x.skills.map(()=>0),nextB=0,gap=0;const reg=1.2+x.int*.08+x.mp*.008;const u=U8(D),ce=x.crit;const hit=(pw,m)=>pw*m*(ce*1.5+(1-ce)*u);
 while(t<40){mp=Math.min(x.mp,mp+reg*.1);if(t>=gap){let bi=-1,bm=0;x.skills.forEach((s,i)=>{const c=Ju(s[1],lv);if(t>=ready[i]&&mp>=c&&s[0]>bm){bm=s[0];bi=i}});if(bi>=0){const s=x.skills[bi];dmg+=hit(P(s[3]),s[0]*jy(lv));mp-=Ju(s[1],lv);ready[bi]=t+By(s[2],lv)/1000;gap=t+.55}else if(t>=nextB){dmg+=hit(P(x.basic[2]),1);nextB=t+x.basic[1]/1000;gap=t+.2}}t+=.1}return dmg/40}
const CD={berserker:1.1,escudeiro:1.3,cacador:.93,volva:.72,valquiria:1,skald:.88,thay:1};const lines=Object.keys(R);const LV=R.berserker.map(x=>x.L);
console.log('Nivel | classe: TTK(s)/vida perdida% (media dos monstros do nivel -2..+3) | kills p/ subir');
const tr=L=>Math.floor(18*Math.pow(L,1.85));
for(const L of LV){const ms=defs.filter(m=>!m.boss&&m.level>=L-2&&m.level<=L+3&&m.id!=='jormungandr');if(!ms.length)continue;let row='L'+String(L).padEnd(3);
 for(const ln of lines){const fx=R[ln].find(y=>y.L===L);if(!fx)continue;const x={...fx,L,ln};let tt=0,lo=0;for(const m of ms){const d=dps(x,m.def);const t=m.hp/d;const cyc=(m.w+m.r)/1000+.6;const kite=x.ranged?.5:1;tt+=t;lo+=Math.min(3,t*m.atk*U8(x.def)/cyc*kite/x.hp)}row+=` ${ln.slice(0,4)} ${(tt/ms.length).toFixed(0)}s/${(100*lo/ms.length).toFixed(0)}%`}
 const k=ms.reduce((s,m)=>s+tr(L)/m.exp,0)/ms.length;console.log(row+' | kills '+k.toFixed(0)+' n'+ms.length)}
const bs=defs.filter(m=>m.boss&&m.id!=='jormungandr').sort((a,b)=>a.level-b.level);
console.log('BOSSES (TTK mediana classes / dano relativo)');for(const m of bs){const L=Math.max(1,Math.min(99,m.level));const near=LV.reduce((a,b)=>Math.abs(b-L)<Math.abs(a-L)?b:a);const ds=lines.filter(ln=>R[ln].find(y=>y.L===near)).map(ln=>dps({...R[ln].find(y=>y.L===near),L:near,ln},m.def)).sort((a,b)=>a-b);console.log(m.id.padEnd(18)+'L'+m.level+' hp '+m.hp+' ttk '+(m.hp/ds[Math.floor(ds.length/2)]).toFixed(0)+'s (mediana)')}
