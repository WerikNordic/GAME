// ===== ROX2M: monstros no visual novo — animacao propria por especie, formas reais =====
var ROX2M = (() => {
 const {hx,mix,dk,TAU,clamp,Ctx,Img,put,ellipsoid,strip,outline}=ROX2.eng;
 const sm=(a,b,x)=>{x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x)};
 const L3=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
 const A3=(a,b,k=1)=>[a[0]+b[0]*k,a[1]+b[1]*k,a[2]+b[2]*k];
 const fur=(c,c2,k=1)=>(mx,my,mz)=>Math.sin(mx*18*k+my*9+mz*7)>.62?c2:(Math.sin(mx*7+mz*11)<-.7?dk(c,.82):0);
 const EYE=hx(0xffe040);
 const MON={};
 const reg=(id,o)=>{MON[id]={id,w:72,h:64,gy:56,sched:[['stand',3,6]],...o}};
 // ---------- canideos / quadrupedes ----------
 function canid(E,S,o,p){
  const g=o.g,b=o.beh||'',w=o.bw||0,T=o.t;
  const sit=(b==='sit'||b==='howl')?w:0,how=b==='howl'?w:0,snf=(b==='sniff'||b==='paw'||b==='graze')?w:0,paw=b==='paw'?w:0,look=b==='look'?w:0,snort=b==='snort'?w:0;
  const walk=o.ph?1:0,ph=o.ph||0,k=o.k||0;
  const Lb=p.L,Hh=p.H,Wd=p.W,legL=p.legL,legW=p.legW;
  const lunge=Math.max(0,k)*Lb*.14-Math.max(0,-k)*Lb*.08,crouch=Math.max(0,-k)*2.4;
  const breathe=Math.sin(T*2.6)*.5*(1-walk);
  const trot=Math.sin(ph*2)*.6*walk;
  const shY=g-legL-Hh*.5;
  const chY=shY-sit*legL*.34+breathe-trot+crouch+snf*1.4+snort*Math.sin(T*18)*.5;
  const hpY=shY+sit*legL*.78+trot*.6+crouch*.4+(p.rumpUp||0);
  const chZ=Lb*.22+o.sh+lunge-sit*Lb*.02,hpZ=-Lb*.26+o.sh-sit*Lb*.18;
  const tx=p.tex||fur(p.col,p.col2);
  // tronco: peito e quadril em caixa arredondada, ligados por cintura mais fina
  E({x:0,y:chY,z:chZ,rx:Wd,ry:Hh*.58,rz:Lb*.27,p:3,col:p.col,tex:tx});
  E({x:0,y:hpY,z:hpZ,rx:Wd*.9,ry:Hh*.5,rz:Lb*.25,p:3,col:p.col,tex:tx});
  S({pts:[[0,chY+.5,chZ-Lb*.12],[0,(chY+hpY)/2+Hh*.08,(chZ+hpZ)/2],[0,hpY,hpZ+Lb*.12]],w:[Hh*.92,Hh*.8],col:p.col,tex:undefined});
  if(p.belly)E({x:0,y:(chY+hpY)/2+Hh*.18,z:(chZ+hpZ)/2,rx:Wd*.7,ry:Hh*.32,rz:Lb*.2,p:3,col:p.col2});
  // pernas: frente reta, traseira com jarrete (digitigrada)
  for(const [sx,fz,po] of [[-1,1,0],[1,1,Math.PI],[-1,-1,Math.PI],[1,-1,0]]){
   const front=fz>0,x=sx*Wd*.62,jz=front?chZ-Lb*.05:hpZ+Lb*.03,jy=(front?chY:hpY)+Hh*.2;
   const phs=ph+po,sw=Math.sin(phs)*p.stride*walk,lf=Math.max(0,Math.cos(phs))*p.lift*walk;
   let fz2=jz+sw+(front&&k>0?k*2:0),fy=g-lf-.4;
   if(!front&&sit>0){fz2=jz+Lb*.2*sit+sw*(1-sit);fy=g-.4}
   if(front&&paw>0&&sx>0){fz2=jz+Lb*.1+Math.sin(T*13)*Lb*.12;fy=g-legL*.5-Math.max(0,Math.cos(T*13))*3}
   const hip=[x,jy,jz],foot=[x,fy,fz2];
   if(front){const kn=[x,jy+(fy-jy)*.52,(jz+fz2)/2-.8];S({pts:[hip,kn,foot],w:[legW*1.55,legW*.85],col:p.col})}
   else{const kn=[x,jy+(fy-jy)*.4,(jz+fz2)/2+Lb*.08*(1-sit*.7)],hk=[x,fy-(fy-jy)*.26,(jz+fz2)/2-Lb*.04*(1-sit)+(fz2-jz)*.28];S({pts:[hip,kn,hk,foot],w:[legW*1.7,legW*.8],col:p.col})}
   E({x:foot[0],y:foot[1]+.2,z:foot[2]+legW*.7,rx:legW*.55,ry:1,rz:legW*1.15,p:4,col:p.paw||dk(p.col,.72)});
  }
  // cabeca (orientada pelo pitch)
  const pitch=how*1.05-snf*.7-crouch*.08+(p.pitch0||0),yawX=look*Math.sin(T*1.6)*3.4+snf*Math.sin(T*3.4)*(b==='graze'?.5:2.2);
  const hd=[yawX,chY-Hh*.3+(p.hHigh||0)-how*Hh*.9+snf*Hh*.95+crouch*.4,chZ+Lb*.24+Math.max(0,k)*Lb*.16+snf*Lb*.18-how*Lb*.09];
  const nb=[0,chY-Hh*.3,chZ+Lb*.08];
  S({pts:[nb,L3(nb,hd,.55),hd],w:[Hh*.9,p.hw*1.55],col:p.col,tex:undefined});
  const dv=[0,-Math.sin(pitch),Math.cos(pitch)],up=[0,-Math.cos(pitch),-Math.sin(pitch)];
  const jaw=Math.max(0,k)*.95+how*.55+snort*.15*Math.sin(T*20)+(b==='growl'?w*.5:0);
  E({x:hd[0],y:hd[1],z:hd[2],rx:p.hw,ry:p.hh,rz:p.hl,p:3,col:p.hcol||p.col,tex:p.htex||tx});
  const sA=A3(hd,dv,p.hl*.5),sB=A3(hd,dv,p.hl*(1.4+(p.snoutL||.6)*1.4));
  S({pts:[A3(sA,up,-p.hh*.05),A3(sB,up,-p.hh*.1)],w:[p.hw*1.05,p.hw*(p.snoutW||.55)],col:p.snout||p.col2});
  const jA=A3(A3(hd,dv,p.hl*.4),up,-p.hh*.5),jB=A3(A3(A3(hd,dv,p.hl*(1.25+(p.snoutL||.6)*1.2)),up,-p.hh*.5),up,-jaw*p.hh*1.5);
  S({pts:[jA,jB],w:[p.hw*.7,p.hw*.38],col:p.jawc||dk(p.snout||p.col2,.85)});
  if(jaw>.2){S({pts:[A3(jA,up,p.hh*.2),A3(jB,up,p.hh*.2)],w:[p.hw*.4,p.hw*.2],col:hx(0x5a1a24)});if(how>.3)S({pts:[A3(jA,up,p.hh*.1),A3(jB,up,p.hh*.1)],w:[p.hw*.3,p.hw*.22],col:hx(0xd86a78)})}
  E({x:sB[0],y:sB[1]-p.hh*.1,z:sB[2],rx:1.2,ry:1,rz:1,p:4,col:hx(0x14101a)});
  if(jaw>.12||p.fangs)for(const sx of[-1,1])S({pts:[A3(A3(sB,up,-p.hh*.35),[sx*p.hw*.4,0,0],1),A3(A3(sB,up,-p.hh*.35-(.5+jaw)*p.hh*.7),[sx*p.hw*.4,0,0],1)],w:[1.6,.6],col:hx(0xf4f0e0)});
  if(p.tusks)for(const sx of[-1,1])S({pts:[A3(A3(jA,dv,p.hl*.6),[sx*p.hw*.5,0,0]),A3(A3(A3(sB,up,-p.hh*.3),[sx*p.hw*.7,0,0]),dv,-.5),A3(A3(A3(sB,up,p.hh*.2),[sx*p.hw*.6,0,0]),dv,-1)],w:[2.6,.8],col:hx(0xf4f0dc)});
  const closed=how>.4||(b==='sit'&&Math.sin(T*.8)>.92);
  for(const sx of[-1,1]){const ep=A3(A3(A3(hd,dv,p.hl*.62),up,p.hh*.22),[sx*p.hw*.64,0,0]);
   if(closed)S({pts:[A3(ep,[0,0,0]),A3(ep,dv,1.6)],w:[1,1],col:hx(0x14101a)});else E({x:ep[0],y:ep[1],z:ep[2],rx:1.3,ry:1,rz:.8,p:3,col:p.eye,bias:1});
   if(p.ears){const flat=Math.max(0,k)*.9+how*.2+snf*.15,eb=A3(A3(A3(hd,up,p.hh*.55),dv,-p.hl*.15),[sx*p.hw*.6,0,0]);
    const et=A3(A3(A3(eb,up,p.hh*(1.5-flat*.8)*(p.earL||1)),dv,-p.hl*(.35+flat*.8)),[sx*(p.hw*.12+flat*2),0,0]);
    S({pts:[eb,et],w:[p.hw*.75,.8],col:p.col});if(!flat)S({pts:[A3(eb,dv,.8),A3(et,dv,.4)],w:[p.hw*.35,.5],col:p.earIn||hx(0x6a4a50)})}}
  if(p.mane)for(let i=0;i<p.mane;i++){const u=i/(p.mane-1);const z=chZ+Lb*.06-u*(chZ-hpZ+Lb*.1),y=chY+(hpY-chY)*u-Hh*.55-(p.maneH||5)*(1-Math.abs(u-.4));S({pts:[[0,y+Hh*.1,z],[0,y-(p.maneH||5)*(.8+(i%2)*.4),z-2]],w:[3,.8],col:p.maneC||p.col2})}
  // cauda
  const wag=Math.sin(T*(walk?6:(b==='sit'?3:2.2)))*(walk?.5:(b==='sit'?1:.6));
  const tb=[0,hpY-Hh*.1,hpZ-Lb*.22];
  if(p.tail===1){let m,e2;if(sit){m=[wag*3+2,g-2.5,hpZ-Lb*.34];e2=[wag*4+4,g-1.2,hpZ-Lb*.5]}else if(walk){m=[wag*2,hpY-Hh*.3,hpZ-Lb*.38];e2=[wag*4,hpY-Hh*.1,hpZ-Lb*.58]}else{m=[wag*2,hpY+Hh*.1,hpZ-Lb*.34];e2=[wag*3,hpY+Hh*.62,hpZ-Lb*.5]}
   S({pts:[tb,m,e2],w:[Wd*.85,p.tailW||Wd*.35],col:(t)=>t>.82&&p.tailTip?p.tailTip:p.col})}
  else if(p.tail===2)S({pts:[tb,[wag*1.5,hpY-Hh*.4,hpZ-Lb*.3],[wag*2,hpY-Hh*.55,hpZ-Lb*.36]],w:[2.2,1],col:p.col});
  return {hd,chY,hpY,chZ,hpZ,dv,up};
 }
 const CANID_SCHED=[['stand',2.4,6],['sniff',2.2,8],['stand',1.6,5],['sit',3,6],['howl',3.4,8],['sit',2,5],['look',2.2,8],['stand',1.2,4]];
 const WOLF={L:26,H:10,W:5,legL:7.5,legW:2.1,col:hx(0x8a8f9c),col2:hx(0xb4b9c6),stride:5,lift:2.6,hw:3.6,hh:3.2,hl:4,snoutL:.5,snoutW:.5,snout:hx(0xc4c8d4),eye:EYE,ears:1,tail:1,fangs:0,tailW:3,hHigh:.5};
 reg('lobo',{name:'Lobo',w:84,h:64,gy:56,sched:CANID_SCHED,build:(E,S,o)=>canid(E,S,o,{...WOLF,tailTip:hx(0x6a6e7a)})});
 reg('lobogelo',{name:'Lobo de Gelo',w:84,h:64,gy:56,sched:CANID_SCHED,build:(E,S,o)=>canid(E,S,o,{...WOLF,mane:5,maneH:4,maneC:hx(0xe8f6ff),tailTip:hx(0xe8f6ff),eye:hx(0x80e0ff)})});
 reg('warg',{name:'Warg',w:96,h:76,gy:66,sched:[['stand',2.2,6],['sniff',2,8],['growl',2.2,6],['stand',1.6,5],['look',2.4,8],['howl',3,8]],build:(E,S,o)=>{
  const r=canid(E,S,o,{L:32,H:13,W:6.4,legL:8,legW:2.9,col:hx(0x3a2a30),col2:hx(0x6a3a3a),stride:5.5,lift:2.8,hw:4.8,hh:4.2,hl:5,snoutL:.6,snoutW:.58,snout:hx(0x5a3a40),eye:hx(0xff3a2a),ears:1,tail:1,fangs:1,hHigh:-1,mane:7,maneH:6,maneC:hx(0xb0a090),tailW:4,tailTip:hx(0x6a3a3a)});
  E({x:r.hd[0],y:r.hd[1]+4.4,z:r.hd[2]-.5,rx:6.2,ry:1.8,rz:5,p:4,col:hx(0x8a8a98),tex:(mx)=>Math.abs(Math.sin(mx*10))>.9?hx(0xd8d8e8):0})}});
 reg('javali',{name:'Javali',w:84,h:64,gy:56,sched:[['stand',2.2,6],['paw',2.6,8],['sniff',2.2,8],['stand',1.4,4],['snort',1.8,8],['look',2,8]],build:(E,S,o)=>{
  const r=canid(E,S,o,{L:23,H:13,W:6.4,legL:5.2,legW:2.5,col:hx(0x6a4a34),col2:hx(0x8a6444),stride:4,lift:2,hw:4.4,hh:4,hl:4.4,snoutL:.35,snoutW:.8,snout:hx(0x9a7a64),eye:hx(0xffd040),ears:1,earIn:hx(0x3a2a20),tail:2,tusks:1,hHigh:3,rumpUp:-1.4,pitch0:-.08,belly:1,tex:(mx,my,mz)=>Math.sin(mx*20+mz*8)>.7?hx(0x8a6444):(Math.sin(my*9+mz*5)<-.75?hx(0x3a2a1c):0)});
  for(let i=0;i<7;i++)S({pts:[[0,(r.chY+(r.hpY-r.chY)*(i/6))-7,r.chZ+3-i*3.6],[0,(r.chY+(r.hpY-r.chY)*(i/6))-11-(i%2)*1.5,r.chZ+1.4-i*3.6]],w:[2.4,.6],col:hx(0x2a2018)})}});
 reg('cavalo',{name:'Cavalo',w:110,h:96,gy:88,sched:[['stand',2.4,6],['graze',3,8],['stand',1.6,5],['look',2.4,8],['snort',1.8,8],['stand',1.4,4]],build:(E,S,o)=>{
  const r=canid(E,S,o,{L:38,H:15,W:6,legL:21,legW:2.5,col:hx(0x8a5a3a),col2:hx(0x6a4028),stride:6.5,lift:3.6,hw:3.9,hh:4.4,hl:7.6,snoutL:.7,snoutW:.7,snout:hx(0x7a4c30),eye:hx(0x1a1210),ears:1,earIn:hx(0x4a2a1c),tail:1,tailW:4.2,tailTip:hx(0x2a1a14),hHigh:-15,pitch0:-.6,belly:1,paw:hx(0xe8dcc0)});
  const nb=[0,r.chY-15*.3-1,r.chZ+38*.08];for(let i=0;i<6;i++){const u=i/5,p0=L3(nb,r.hd,.12+u*.7);S({pts:[[p0[0],p0[1]-1,p0[2]-1.2],[p0[0],p0[1]+3.4,p0[2]-3.6]],w:[3.2,1],col:hx(0x2a1a14)})}
  S({pts:[[0,r.chY-6,r.hd[2]-5],[0,r.hd[1]-1,r.hd[2]-1.6]],w:[2.4,1.4],col:hx(0x2a1a14)})}});
 // ---------- montaria epica (cavalo de guerra com armadura dourada, manto carmesim e crina de chamas) ----------
 reg('montaria',{name:'Montaria',w:120,h:104,gy:94,sched:[['stand',2.4,6],['look',2.4,8],['snort',1.8,8],['stand',1.6,5]],build:(E,S,o)=>{
  const r=canid(E,S,o,{...WOLF,L:36,H:15.5,W:6.6,legL:15.5,legW:3.1,col:hx(0x6e7480),col2:hx(0xaeb4c0),stride:6,lift:3.4,hw:4.8,hh:5,hl:7.2,snoutL:.8,snoutW:.62,snout:hx(0x8e94a0),eye:hx(0xff5a3a),earIn:hx(0x3a3e48),tailTip:hx(0xeef2fa),tailW:5,hHigh:.5,belly:1,paw:hx(0xe8ecf4),fangs:1});
  const GOLD=hx(0xf2c24a),GOLD2=hx(0xb88a24),CRIM=hx(0x9a1e32),CRIM2=hx(0x6a1424),B=.2;
  const mY=(r.chY+r.hpY)/2,mZ=(r.chZ+r.hpZ)/2;
  // manto (caparison) sobre o dorso, com franjas douradas nas laterais
  E({x:0,y:mY-5.2,z:mZ,rx:7.4,ry:3.4,rz:14.5,p:3,col:CRIM,bias:B});
  for(const sx of[-1,1]){S({pts:[[sx*6.4,mY-3.6,mZ+11],[sx*7.6,mY+3.4,mZ+10],[sx*7.8,mY+9.4,mZ+9]],w:[3.4,2.4],col:CRIM,bias:B});S({pts:[[sx*6.4,mY-3.6,mZ-11],[sx*7.6,mY+3.4,mZ-10],[sx*7.8,mY+9.4,mZ-9]],w:[3.4,2.4],col:CRIM,bias:B});
   S({pts:[[sx*7.9,mY+9,mZ-10],[sx*8,mY+9.4,mZ+10]],w:[1.4,1.4],col:GOLD,bias:B});S({pts:[[sx*6.9,mY-5.8,mZ-13],[sx*7.1,mY-5.6,mZ+13]],w:[1.1,1.1],col:GOLD,bias:B});
   for(let i=0;i<5;i++){const z=mZ-9+i*4.5;E({x:sx*8,y:mY+9.8,z,rx:.8,ry:1.2,rz:.8,p:3,col:GOLD,bias:B})}}
  // sela
  E({x:0,y:mY-8.4,z:mZ+1,rx:4.6,ry:1.6,rz:6.6,p:3,col:hx(0x4a2a18),bias:B});
  S({pts:[[0,mY-9.6,mZ+7.4],[0,mY-12.4,mZ+8.6]],w:[2.2,1.6],col:GOLD2,bias:B});S({pts:[[0,mY-9.4,mZ-5.8],[0,mY-12,mZ-7.2]],w:[2.6,1.8],col:GOLD2,bias:B});
  // peitoral dourado
  E({x:0,y:r.chY+2.2,z:r.chZ+Lb0(r),rx:6.2,ry:8,rz:2.8,p:3,col:GOLD,metal:1,bias:B});
  E({x:0,y:r.chY+2.2,z:r.chZ+Lb0(r)+2.2,rx:2.2,ry:2.2,rz:1.2,p:3,col:hx(0xff4a5a),bias:.6,metal:1});
  S({pts:[[-5.4,r.chY-3,r.chZ+Lb0(r)-1],[0,r.chY-5.4,r.chZ+Lb0(r)+.4],[5.4,r.chY-3,r.chZ+Lb0(r)-1]],w:[1.8,1.8],col:GOLD2,bias:B});
  // testeira + penacho
  const hd=r.hd,dv=r.dv,up=r.up;
  S({pts:[A3(A3(hd,up,3.2),dv,-1),A3(A3(hd,dv,r.dv?9:9),up,2.6)],w:[3.4,2.4],col:GOLD,metal:1,bias:B});
  S({pts:[A3(A3(hd,up,-3.6),dv,-3.4),A3(A3(hd,up,-9),dv,-6)],w:[1.8,1.2],col:GOLD2,bias:B});
  for(const sx of[-1,1])E({x:hd[0]+sx*3.6,y:hd[1]-.4,z:hd[2]+1.4,rx:1.1,ry:2.2,rz:3,p:3,col:GOLD,metal:1,bias:B});
  {const tt=o.t||0,sw=Math.sin(tt*3)*1.6;S({pts:[A3(hd,up,-4),A3(A3(hd,up,-9),[sw,0,-2]),A3(A3(hd,up,-13),[sw*1.6,0,-6])],w:[2.6,.8],col:hx(0x7ad0ff),bias:.5})}
  // crina de chamas
  for(let i=0;i<9;i++){const u=i/8,y=r.chY-6-u*1.5+(r.hpY-r.chY)*u*.6,z=r.chZ+5-u*(r.chZ-r.hpZ)*.3,fl=Math.sin((o.t||0)*6+i*1.3)*1.4;
   S({pts:[[0,y,z],[fl*.5,y-3.4,z-1.8],[fl,y-6.4-(i%2)*1.6,z-3.6]],w:[2.4,.5],col:(q)=>q>.55?hx(0xe8f6ff):hx(0x6ab8ff),bias:.7})}
  // cauda em chamas
  {const tb=[0,r.hpY-1.2,r.hpZ-6.5];for(let i=0;i<4;i++){const f=Math.sin((o.t||0)*5+i*1.7)*2;S({pts:[tb,[f*.5,r.hpY+3,r.hpZ-10-i],[f,r.hpY+8+i*1.2,r.hpZ-13-i*1.4]],w:[2.4,.4],col:(q)=>q>.5?hx(0xe8f6ff):hx(0x5aa8ff),bias:.7})}}
  // aneis dourados nos cascos e brilho de runa
  for(let i=0;i<5;i++){const u=((o.t||0)*.7+i*.2)%1;E({x:Math.sin(i*2.4+(o.t||0))*10,y:o.g-4-u*26,z:Math.cos(i*2.4)*9,rx:.8,ry:.8,rz:.8,p:4,col:hx(0xffe08a),bias:1})}
 }});
 function Lb0(r){return 8.4}
const PETSCH=[['stand',2.6,6],['sniff',2,8],['stand',1.6,5],['sit',3.4,6],['look',2.2,8],['sit',2,5],['stand',1.2,4]];
 reg('cao',{name:'Cao',w:80,h:60,gy:52,sched:PETSCH,build:(E,S,o)=>canid(E,S,o,{L:20,H:8.5,W:4.2,legL:6.4,legW:1.9,col:hx(0xb08850),col2:hx(0xd8c8a0),stride:4.4,lift:2.2,hw:3.1,hh:2.9,hl:3.4,snoutL:.55,snoutW:.55,snout:hx(0xd8c8a0),eye:hx(0x1a1210),ears:1,earL:.8,earIn:hx(0x8a6a40),tail:1,tailW:2.4,tailTip:hx(0xd8c8a0),hHigh:.6,belly:1})});
 reg('gato',{name:'Gato',w:70,h:56,gy:48,sched:PETSCH,build:(E,S,o)=>canid(E,S,o,{L:15,H:6,W:3,legL:4.6,legW:1.3,col:hx(0x8a8f96),col2:hx(0xc4c8cc),stride:3.4,lift:1.6,hw:2.8,hh:2.6,hl:2.6,snoutL:.15,snoutW:.8,snout:hx(0xe0d4d4),eye:hx(0xe8d040),ears:1,earL:.9,earIn:hx(0xd8a0a8),tail:1,tailW:1.4,tailTip:hx(0x5a5e66),hHigh:.2,belly:1})});
 reg('raposa',{name:'Raposa',w:80,h:60,gy:52,sched:PETSCH,build:(E,S,o)=>canid(E,S,o,{L:17,H:7,W:3.4,legL:6,legW:1.5,col:hx(0xd8702a),col2:hx(0xf4ecdc),stride:4,lift:2.2,hw:2.9,hh:2.6,hl:3.2,snoutL:.8,snoutW:.45,snout:hx(0xf4ecdc),eye:hx(0x1a1210),ears:1,earL:1.15,earIn:hx(0x3a2a20),tail:1,tailW:4.4,tailTip:hx(0xf4ecdc),hHigh:.4,paw:hx(0x3a2a20)})});
 reg('coelho',{name:'Coelho',w:60,h:60,gy:50,sched:[['stand',2.2,6],['sniff',2,8],['look',1.8,8],['stand',1.2,4]],build:(E,S,o)=>canid(E,S,o,{L:10,H:6.4,W:3.4,legL:3,legW:1.6,col:hx(0xc8b8a0),col2:hx(0xf4f0e8),stride:3,lift:3,hw:2.4,hh:2.4,hl:2.6,snoutL:.15,snoutW:.8,snout:hx(0xf4f0e8),eye:hx(0x2a1a14),ears:1,earL:2.6,earIn:hx(0xf0b8b8),tail:2,hHigh:.6,rumpUp:-.8})});
 // ---------- bipedes ----------
 function biped(E,S,o,p){
  const s=p.sc||1,g=o.g,b=o.beh||'',w=o.bw||0,ph=o.ph||0,walk=o.ph?1:0,k=o.k||0,T=o.t,PP=p.pp||3.4;
  const legL=p.legL*s,th=p.th*s,hwd=p.hw*s;
  const swayX=(b==='sway'?Math.sin(T*1.4)*2*w:0)+(b==='rumble'?Math.sin(T*40)*.8*w:0);
  const bob=Math.abs(Math.sin(ph))*1.2*s*walk+Math.sin(T*2.4)*.35*s*(1-walk)+(b==='roar'||b==='pound'?Math.sin(T*3)*.4:0)*w;
  const lean=Math.max(0,k)*3*s-Math.max(0,-k)*2*s+(b==='groan'?-w*2:0)+(p.hunch||0)*s;
  const hipY=g-legL-bob,sh=o.sh;
  const chY=hipY-th*.55,chZ=sh+lean*.6;
  const col=p.col,tx=p.tex;
  // pernas (coxa + canela, joelho dobrando)
  for(const sx of[-1,1]){const phs=ph+(sx>0?Math.PI:0),sw=Math.sin(phs)*5*s*walk,lf=Math.max(0,Math.cos(phs))*3*s*walk;
   const hip=[sx*hwd*.5+swayX*.5,hipY,sh],ft=[sx*hwd*.5+swayX*.5,g-lf-.4,sw+sh+(k>0?-k*1.5*s*(sx>0?0:1):0)];
   const kn=[hip[0]+sx*.5,(hip[1]+ft[1])/2+.5,(hip[2]+ft[2])/2+1.4*s+lf*.4];
   S({pts:[hip,kn,ft],w:[p.legW*s*1.35,p.legW*s*.9],col:p.legCol});
   E({x:ft[0],y:ft[1]+.2,z:ft[2]+p.legW*s*.9,rx:p.legW*s*.8,ry:1.5*s,rz:p.legW*s*1.5,p:4,col:p.boot||p.legCol})}
  // torso: pelvis, abdomen, peito largo
  E({x:swayX*.6,y:hipY-th*.12,z:sh+lean*.2,rx:hwd*.95,ry:th*.2,rz:hwd*.6,p:PP,col:p.pelvis||p.legCol});
  S({pts:[[swayX*.6,hipY-th*.15,sh+lean*.2],[swayX*.8,chY+th*.2,chZ-lean*.1]],w:[hwd*1.5,hwd*(p.waist||1.6)],col:p.belly||col,tex:tx});
  E({x:swayX,y:chY,z:chZ,rx:hwd*1.12,ry:th*.34,rz:hwd*.66,p:PP,col,tex:tx});
  // cabeca
  const hr=p.hh*s,look=b==='look'?Math.sin(T*1.5)*3*w:0,up=(b==='roar'||b==='groan'?-hr*.6*w:0)+(b==='scratch'?-.3:0);
  const hz=sh+lean*1.1+Math.max(0,k)*3*s+(p.hz||0)*s,hy=chY-th*.34-hr*.85+(p.hy||0)*s+up+(b==='groan'?hr*.2*w:0);
  const hX=swayX+look+(b==='groan'?Math.sin(T*2)*1.2*w:0);
  S({pts:[[swayX,chY-th*.2,chZ],[hX,hy+hr*.8,hz-1]],w:[hwd*.62,hwd*.6],col:p.neck||p.hcol});
  E({x:hX,y:hy,z:hz,rx:p.hrx*s,ry:hr,rz:p.hrz*s,p:PP,col:p.hcol,tex:p.htex});
  const jopen=(b==='roar'?w*1.2:0)+Math.max(0,k)*1.1;
  E({x:hX,y:hy+hr*.62+jopen*s*1.6,z:hz+1*s,rx:p.hrx*s*.78,ry:hr*.42,rz:p.hrz*s*.82,p:3,col:p.jaw||p.hcol});
  if(jopen>.25)E({x:hX,y:hy+hr*.5+jopen*s*.6,z:hz+p.hrz*s*.55,rx:p.hrx*s*.5,ry:hr*.2+jopen*.6,rz:1,p:3,col:hx(0x4a1018)});
  // bracos: ombro->cotovelo->mao
  const hands=[],elbs=[];
  for(const sx of[-1,1]){const right=sx>0;const sp=[sx*(hwd*1.05+p.armW*s*.1)+swayX,chY-th*.18,chZ];
   let hand=[sx*(hwd+2.6*s)+swayX,chY-th*.18+p.arm*s*.92,sh+Math.sin(ph+(right?0:Math.PI))*-5*s*walk+1*s];
   let elb=null;
   if(right&&(k!==0)){const a=k>0?k:0,wnd=k<0?-k:0;hand=[sx*(hwd+3*s),chY-th*.2+p.arm*s*(.9-a*1.1-wnd*1.6),sh+p.arm*s*(a*1.1-wnd*.2)+1*s]}
   if(b==='scratch'&&right)hand=[hX+sx*hr*.7,hy+hr*.1+Math.sin(T*12)*1.2,hz+p.hrz*s*.3];
   if(b==='pound'){const alt=(Math.sin(T*9+(right?0:Math.PI))>0)?1:0;hand=[sx*(hwd*.5)+swayX,chY+th*.05-alt*0,chZ+hwd*.7+alt*1.4];}
   if(b==='roar'){hand=[sx*(hwd+p.arm*s*.7),chY-th*.2-p.arm*s*.5*w,sh+3*s]}
   if(b==='taunt'&&right)hand=[sx*(hwd+4*s),chY-th*.2-p.arm*s*.8,sh+3*s+Math.sin(T*8)*2*s];
   if(b==='groan'){hand=[sx*(hwd+2.5*s),chY+p.arm*s*.4,sh+p.arm*s*.7*w]}
   if(b==='clench'){hand=[sx*(hwd+2.6*s),chY-th*.18+p.arm*s*.7,sh+3*s*w]}
   const mid=L3(sp,hand,.5);elb=[mid[0]+sx*1.7*s,mid[1]+.8*s,mid[2]-1.4*s];
   S({pts:[sp,elb,hand],w:[p.armW*s*1.2,p.armW*s*.9],col:p.armCol});
   const fs=p.fist||.62;E({x:hand[0],y:hand[1]+.8*s,z:hand[2],rx:p.armW*s*fs,ry:p.armW*s*(fs+.1),rz:p.armW*s*fs,p:4,col:p.hand||p.armCol});
   hands[right?1:0]=[hand[0],hand[1]+.8*s,hand[2]];elbs[right?1:0]=elb}
  const J={head:[hX,hy,hz],hr,chest:[swayX,chY,chZ],hip:[swayX*.6,hipY,sh],hands,elbs,s,w,k,b,hwd,th};
  if(p.deco)p.deco(E,S,o,J);
  return J;
 }
 const wdir=(J)=>{const A=J.hands[1],m=J.elbs[1];const v=[(A[0]-m[0])*.4,(A[1]-m[1])*.4-3,(A[2]-m[2])*.9+2];const l=Math.hypot(...v)||1;return J.k?[v[0]/l,v[1]/l,v[2]/l]:[.2,-.95,.35]};
 const eyes2=(E,J,c,dz,dy,sp,rx,bias=1)=>{for(const sx of[-1,1])E({x:J.head[0]+sx*sp,y:J.head[1]+dy,z:J.head[2]+dz,rx:rx,ry:rx*.8,rz:.8,p:3,col:c,bias})};
 // goblin
 reg('goblin',{name:'Goblin',w:56,h:56,gy:50,sched:[['stand',2.6,6],['look',2.4,8],['scratch',2.2,8],['stand',1.4,4],['taunt',2.2,8],['look',2,8]],build:(E,S,o)=>{const sk=hx(0x6ab04a);
  biped(E,S,o,{sc:.9,legL:7.5,legW:2.3,th:11,hw:4.6,col:hx(0x7a5a34),legCol:hx(0x5a4228),armCol:sk,arm:10,armW:1.9,hrx:5,hrz:4.6,hh:4.4,hcol:sk,boot:hx(0x3a2a1c),hunch:1.4,waist:1.3,hz:.6,fist:.55,deco:(E,S,o,J)=>{
   const s=J.s;for(const sx of[-1,1]){S({pts:[[J.head[0]+sx*4.4*s,J.head[1]-.6,J.head[2]-.4],[J.head[0]+sx*9.5*s,J.head[1]-2.4+(J.b==='look'?Math.sin(o.t*8)*.8:0),J.head[2]-1],[J.head[0]+sx*13.4*s,J.head[1]-.6,J.head[2]-1.2]],w:[3.6,.7],col:sk})}
   eyes2(E,J,hx(0xffe040),4.2*s,-.2,2.2*s,1.4);
   S({pts:[[J.head[0],J.head[1]+1.2,J.head[2]+4.4*s],[J.head[0],J.head[1]+2.6,J.head[2]+6.4*s]],w:[2.4,1.2],col:sk});
   S({pts:[[J.head[0]-1.6,J.head[1]+4.6,J.head[2]+4*s],[J.head[0]+1.6,J.head[1]+4.6,J.head[2]+4*s]],w:[1.2,1.2],col:hx(0xe8e0c8)});
   S({pts:[[J.chest[0],J.chest[1]-1,J.chest[2]],[J.hip[0]+6*s,J.hip[1]-3,J.hip[2]-3]],w:[1.4,1.4],col:hx(0x3a2a1c)});
   E({x:J.hip[0]-5.2*s,y:J.hip[1]+1,z:J.hip[2]-3.4,rx:2.2,ry:3.2,rz:1.8,p:4,col:hx(0x8a6a3a)});
   const A=J.hands[1],d=wdir(J);S({pts:[A,A3(A,d,2)],w:1.5,col:hx(0x4a3220)});S({pts:[A3(A,d,2),A3(A,d,10)],w:[2.2,.7],col:hx(0xc8ccd8),metal:1})}})}});
 // draugr
 reg('draugr',{name:'Draugr',w:64,h:76,gy:70,sched:[['sway',3,8],['groan',2.8,8],['look',2.2,8],['sway',2,6],['scratch',2,8]],build:(E,S,o)=>{const sk=hx(0x7a9a86);
  biped(E,S,o,{legL:11.5,legW:2.6,th:16,hw:5.6,col:hx(0x4a4a58),legCol:hx(0x3a3a46),armCol:sk,arm:13,armW:2.2,hrx:5,hrz:4.8,hh:5.2,hcol:sk,boot:hx(0x2a2a30),hunch:3,hy:1.5,waist:1.3,fist:.55,tex:(mx,my,mz)=>(my>.3&&Math.sin(mx*14)>.3)?null:(Math.abs(my+.5)<.1?hx(0x6a5a3a):0),deco:(E,S,o,J)=>{
   const s=J.s;eyes2(E,J,hx(0x58c8ff),4.4,-.2,2.2,1.2);
   E({x:J.head[0],y:J.head[1]-J.hr*.75,z:J.head[2]-.4,rx:5.6,ry:2.6,rz:5.2,p:3.4,col:hx(0x5a5a64),metal:1});
   S({pts:[[J.head[0]-4,J.head[1]+4,J.head[2]+2.6],[J.head[0],J.head[1]+8,J.head[2]+3.4],[J.head[0]+4,J.head[1]+4,J.head[2]+2.6]],w:[2.4,1.4],col:hx(0x8a8a8a)});
   S({pts:[[J.chest[0]-5,J.chest[1]-3,J.chest[2]-3.4],[J.chest[0]-6.5+Math.sin(o.t*2)*1,J.hip[1]+8,J.chest[2]-5],[J.chest[0]-5,J.hip[1]+14,J.chest[2]-4.4]],w:[6,3],col:hx(0x2a3a3a)});
   S({pts:[[J.chest[0]-6,J.chest[1]-4,J.chest[2]-1],[J.chest[0]+6,J.chest[1]-4,J.chest[2]-1]],w:[2.2,2.2],col:hx(0x6a5a3a)});
   const A=J.hands[1],d=wdir(J);S({pts:[A3(A,d,-3),A3(A,d,19)],w:2,col:hx(0x6a4a2a)});
   S({pts:[A3(A,d,13),A3(A3(A,d,16),[5.6,0,0]),A3(A3(A,d,9),[5,0,0]),A3(A,d,8)],w:[3.4,3],col:hx(0x8a8a98),metal:1})}})}});
 // troll
 const trollDeco=(club)=>(E,S,o,J)=>{const s=J.s;eyes2(E,J,hx(0xff6a30),4.4*s,-.4,2.4*s,1.2);
  for(const sx of[-1,1])S({pts:[[J.head[0]+sx*2.4*s,J.head[1]+4.4*s,J.head[2]+3.4*s],[J.head[0]+sx*3.6*s,J.head[1]+2.2*s,J.head[2]+5.4*s]],w:[2,.8],col:hx(0xf0e6c8)});
  S({pts:[[J.head[0]-4.6*s,J.head[1]-1.6*s,J.head[2]+4*s],[J.head[0]+4.6*s,J.head[1]-1.6*s,J.head[2]+4*s]],w:[2.2,2.2],col:hx(0x3a3a30)});
  E({x:J.hip[0],y:J.hip[1]-1,z:J.hip[2]+1,rx:J.hwd*1.05,ry:3.2*s,rz:J.hwd*.7,p:3.4,col:hx(0x4a3a30)});
  if(club){const A=J.hands[1],d=wdir(J);S({pts:[A3(A,d,-4),A3(A,d,13),A3(A,d,29)],w:[3.4,4.6,8.6],col:hx(0x6a4a2a)});S({pts:[A3(A,d,23),A3(A,d,26)],w:[11,10],col:hx(0x5a3e22)})}};
 reg('troll',{name:'Troll',w:100,h:104,gy:96,sched:[['stand',2.4,6],['look',2.4,8],['scratch',2.2,8],['roar',2.4,8],['stand',1.6,4]],build:(E,S,o)=>{const sk=hx(0x7a8a6a);
  biped(E,S,o,{sc:1.6,legL:10,legW:3.6,th:19,hw:8,col:hx(0x6a7a5a),legCol:hx(0x5a6a4a),armCol:sk,arm:15,armW:3.6,hrx:4.8,hrz:4.6,hh:4.4,hcol:sk,boot:hx(0x4a4a3a),hunch:2.4,hy:2.4,waist:1.5,fist:.7,pp:3,tex:(mx,my,mz)=>(my<-.5&&Math.sin(mx*11+my*7)>.2)?hx(0x4a8a3a):(Math.sin(mx*13+my*11)>.8?hx(0x8a9a7a):0),deco:trollDeco(true)})}});
 // yeti: pelo, sem clava, bate no peito
 reg('yeti',{name:'Yeti',w:104,h:104,gy:96,sched:[['stand',2.2,6],['pound',2.6,8],['look',2.2,8],['roar',2.4,8],['scratch',2,8]],build:(E,S,o)=>{const f=hx(0xe8eef4),f2=hx(0xb8c8d8);
  biped(E,S,o,{sc:1.55,legL:9,legW:3.8,th:19,hw:8.4,col:f,legCol:f2,armCol:f,arm:17,armW:4,hrx:4.8,hrz:4.4,hh:4.2,hcol:hx(0x9aa8b8),boot:hx(0x6a7a8a),hunch:2.6,hy:2,waist:1.5,fist:.75,pp:3,tex:fur(f,f2,1.4),deco:(E,S,o,J)=>{const s=J.s;eyes2(E,J,hx(0xff5050),4.2*s,-.4,2.4*s,1.2);
   for(let i=0;i<7;i++){const a=(i/6-.5)*2.2;S({pts:[[J.head[0]+a*4*s,J.head[1]-J.hr*.8,J.head[2]-.4],[J.head[0]+a*6*s,J.head[1]-J.hr*1.5-(i%2)*2,J.head[2]-1]],w:[3,.7],col:f})}
   for(const sx of[-1,1])for(let i=0;i<4;i++)S({pts:[[J.chest[0]+sx*J.hwd*(.7+i*.15),J.chest[1]-J.th*.25+i*3,J.chest[2]-1],[J.chest[0]+sx*J.hwd*(1.1+i*.2),J.chest[1]-J.th*.1+i*4,J.chest[2]-3]],w:[3,.7],col:f2});
   S({pts:[[J.head[0]-3.6*s,J.head[1]+4.2*s,J.head[2]+3.6*s],[J.head[0]+3.6*s,J.head[1]+4.2*s,J.head[2]+3.6*s]],w:[2.4,2.4],col:hx(0x4a4a5a)});
   for(const sx of[-1,1])S({pts:[[J.head[0]+sx*2*s,J.head[1]+4.4*s,J.head[2]+3.8*s],[J.head[0]+sx*2.2*s,J.head[1]+7.4*s,J.head[2]+4*s]],w:[1.8,.7],col:hx(0xf4f0e0)})}})}});
 // silvano: arvore andante — galhos e folhas
 reg('sylvan',{name:'Silvano',w:100,h:108,gy:98,sched:[['sway',3,8],['look',2.4,8],['clench',2.2,6],['sway',2.4,8]],build:(E,S,o)=>{const bk=hx(0x6a4a2a),bk2=hx(0x8a6a3a),lf=hx(0x4a9a3a);
  biped(E,S,o,{sc:1.5,legL:10,legW:3.6,th:19,hw:7,col:bk,legCol:hx(0x5a3e22),armCol:bk,arm:15,armW:3.2,hrx:4.4,hrz:4.2,hh:4.4,hcol:bk2,boot:hx(0x4a3218),hunch:1,waist:1.3,fist:.6,pp:3.6,tex:(mx,my,mz)=>Math.sin(my*30+mx*5)>.6?hx(0x4a321c):(Math.sin(mx*9+mz*6)>.8?bk2:0),deco:(E,S,o,J)=>{const s=J.s;
   eyes2(E,J,hx(0xffe060),4*s,-.4,2.2*s,1.3);
   for(const sx of[-1,1]){S({pts:[[J.head[0]+sx*2*s,J.head[1]-J.hr*.8,J.head[2]],[J.head[0]+sx*6*s,J.head[1]-J.hr*2,J.head[2]-1],[J.head[0]+sx*8*s,J.head[1]-J.hr*3,J.head[2]]],w:[2.4,.7],col:bk});
    for(let i=0;i<3;i++)E({x:J.head[0]+sx*(5+i*1.4)*s,y:J.head[1]-J.hr*(1.4+i*.5),z:J.head[2]-1,rx:2.2,ry:1.2,rz:1,p:3,col:lf});
    S({pts:[[J.chest[0]+sx*J.hwd*1.1,J.chest[1]-J.th*.3,J.chest[2]],[J.chest[0]+sx*J.hwd*1.8,J.chest[1]-J.th*.6,J.chest[2]-2],[J.chest[0]+sx*J.hwd*2.2,J.chest[1]-J.th*.9,J.chest[2]-2]],w:[2.6,.7],col:bk});
    E({x:J.chest[0]+sx*J.hwd*2,y:J.chest[1]-J.th*.8,z:J.chest[2]-2,rx:2.6,ry:1.3,rz:1.2,p:3,col:lf})}
   E({x:J.chest[0],y:J.chest[1]+J.th*.1,z:J.chest[2]+J.hwd*.6,rx:4.6,ry:3.6,rz:1,p:3,col:hx(0x2a1a10),tex:(mx,my)=>Math.hypot(mx,my)<.5?hx(0x1a0e08):0});
   const A=J.hands[1];for(let i=0;i<3;i++)S({pts:[A,[A[0]+(i-1)*2.4,A[1]+4,A[2]+1.4]],w:[1.6,.6],col:bk2})}})}});
 // golem base (gelo / metal / prisma / pedra)
 function golem(kind){return (E,S,o)=>{const C={ice:[0x7ac8f0,0xc8f0ff,0x3a78b0],metal:[0x8a909c,0xd0d6e0,0x4a505c],prism:[0xa88af0,0xe8d8ff,0x6a4ab8],stone:[0xaaa890,0xd8d6c0,0x6a6858]}[kind];const ic=hx(C[0]),ic2=hx(C[1]),dkc=hx(C[2]),M=kind==='metal'?1:0;
  const T2=(a,b2)=>(mx,my,mz)=>Math.sin(mx*a+my*b2+mz*5)>.75?ic2:(Math.sin(mx*9-my*7)<-.8?dkc:0);
  biped(E,S,o,{sc:1.45,legL:10,legW:4.4,th:20,hw:8,col:ic,legCol:ic,armCol:ic,arm:15,armW:4.4,hrx:5.2,hrz:4.8,hh:4.6,hcol:ic2,boot:dkc,pelvis:dkc,hand:dkc,fist:.95,pp:5,waist:1.7,tex:T2(8,5),deco:(E,S,o,J)=>{const s=J.s;
   for(const sx of[-1,1])E({x:J.head[0]+sx*2.4*s,y:J.head[1]-.2,z:J.head[2]+4.4*s,rx:1.6,ry:.9,rz:.8,p:3,col:hx(kind==='metal'?0xff8a30:kind==='stone'?0xffd060:kind==='prism'?0xff70ff:0x2a58ff),bias:1});
   E({x:J.chest[0],y:J.chest[1]+1,z:J.chest[2]+J.hwd*.62,rx:3.6,ry:4,rz:1.6,p:3,col:hx(kind==='metal'?0xff9a40:kind==='prism'?0xff90ff:0xb8ffff),bias:1,tex:(mx,my,mz)=>mz>.2?0:null});
   for(const sx of[-1,1]){E({x:J.chest[0]+sx*J.hwd*1.45,y:J.chest[1]-J.th*.3,z:J.chest[2],rx:3.6,ry:4.2,rz:3.8,p:5,col:dkc,metal:M})}
   if(kind==='prism'||kind==='ice')for(let i=0;i<5;i++)S({pts:[[J.head[0]+(i-2)*2.6*s,J.head[1]-J.hr*.8,J.head[2]],[J.head[0]+(i-2)*3.2*s,J.head[1]-J.hr*(1.6+(i%2)*.9),J.head[2]-.6]],w:[3,.7],col:ic2});
   if(kind==='metal'){E({x:J.head[0],y:J.head[1]-J.hr*1.1,z:J.head[2],rx:3.4,ry:1.4,rz:3,p:4,col:dkc,metal:1})}
   if(kind==='stone')for(let i=0;i<4;i++)S({pts:[[J.head[0]+(i-1.5)*2.4*s,J.head[1]-J.hr*.9,J.head[2]],[J.head[0]+(i-1.5)*3*s,J.head[1]-J.hr*1.5,J.head[2]]],w:[3,1.2],col:hx(0x6a8a4a)})
  }})}}
 const GS=[['stand',3,6],['look',2.4,8],['clench',2.2,6],['rumble',1.6,8],['stand',2,5]];
 reg('golemgelo',{name:'Golem',w:100,h:104,gy:96,sched:GS,build:golem('ice')});reg('golemmetal',{name:'Autômato',w:100,h:104,gy:96,sched:GS,build:golem('metal')});
 reg('golemprisma',{name:'Prisma',w:100,h:104,gy:96,sched:GS,build:golem('prism')});reg('golempedra',{name:'Sentinela',w:100,h:104,gy:96,sched:GS,build:golem('stone')});
 // diabrete / brasa
 reg('imp',{name:'Diabrete',w:72,h:68,gy:60,sched:[['stand',2,6],['look',2,8],['taunt',2,8],['stand',1.4,4]],build:(E,S,o)=>{const c=hx(0xc8321e),c2=hx(0xff7a2a);const fl=o.ph?Math.sin(o.t*14):Math.sin(o.t*4.5);
  biped(E,S,o,{sc:.8,legL:8,legW:2.3,th:12,hw:4.6,col:c,legCol:hx(0x8a2216),armCol:c,arm:11,armW:2,hrx:5,hrz:4.6,hh:4.8,hcol:c,boot:hx(0x4a1a12),hunch:1,waist:1.3,fist:.55,tex:fur(c,c2),deco:(E,S,o,J)=>{const s=J.s;
   for(const sx of[-1,1]){S({pts:[[J.head[0]+sx*3.4*s,J.head[1]-J.hr*.7,J.head[2]],[J.head[0]+sx*6.4*s,J.head[1]-J.hr*1.7,J.head[2]-.6],[J.head[0]+sx*5*s,J.head[1]-J.hr*2.4,J.head[2]+.4]],w:[3,.7],col:hx(0x2a1410)});
    E({x:J.head[0]+sx*2.4*s,y:J.head[1]-.4,z:J.head[2]+4.4*s,rx:1.3,ry:1,rz:.8,p:3,col:hx(0xffe040),bias:1});
    const w0=[J.chest[0]+sx*3,J.chest[1]-3,J.chest[2]-2.4],tip=[J.chest[0]+sx*(18+fl*1.2),J.chest[1]-12+fl*4,J.chest[2]-5],mid=[J.chest[0]+sx*10,J.chest[1]-9+fl*2,J.chest[2]-3.6];
    S({pts:[w0,mid,tip],w:[4,1],col:hx(0x5a1a2a)});S({pts:[mid,[mid[0]+sx*3,mid[1]+8,mid[2]-.6]],w:[3,1],col:hx(0x5a1a2a)})}
   S({pts:[[J.head[0]-2.4,J.head[1]+3.8,J.head[2]+4*s],[J.head[0]+2.4,J.head[1]+3.8,J.head[2]+4*s]],w:[1.4,1.4],col:hx(0x2a0a0a)});
   S({pts:[[J.hip[0],J.hip[1]-1,J.hip[2]-2],[J.hip[0],J.hip[1]+5,J.hip[2]-8],[J.hip[0]+fl,J.hip[1]+1,J.hip[2]-13]],w:[2.4,1],col:c});
   for(let i=0;i<4;i++){const u=(o.t*1.5+i*.25)%1;E({x:J.hip[0]+Math.sin(i*3+o.t*3)*1.4,y:J.hip[1]+1-u*9,z:J.hip[2]-13,rx:1.2*(1-u),ry:1.8*(1-u),rz:.8,p:3,col:u<.4?hx(0xffd040):hx(0xff6a20),bias:1})}
   const A=J.hands[1];for(let i=0;i<3;i++){const u=(o.t*2+i*.33)%1;E({x:A[0],y:A[1]-1-u*6,z:A[2],rx:1.4*(1-u*.6),ry:2*(1-u*.6),rz:1,p:3,col:u<.5?hx(0xffd040):hx(0xff6a20),bias:1})}}})}});
 // gosma / blob: gota achatada, nao esfera
 reg('gosma',{name:'Gosma',w:64,h:52,gy:44,sched:[['rest',2,6],['jiggle',1.6,8],['rest',1.2,4],['hop',1.4,8],['blink',1.2,6]],build:(E,S,o)=>{const c=hx(0x7ac83a),c2=hx(0xc8f070),b=o.beh||'',w=o.bw||0,T=o.t,k=o.k||0;
  let sq=1+Math.sin(T*3.2)*.05+k*.2,yo=0;if(b==='jiggle')sq+=Math.sin(T*16)*.09*w;if(b==='hop'){const u=Math.sin(w*Math.PI*0+((o.bt||0)*Math.PI));yo=-u*9;sq*=1-u*.12}
  if(o.ph){const u=Math.abs(Math.sin(o.ph/2));yo=-u*6;sq*=1-u*.1}
  const g=o.g+yo,sx=11*sq,hy=8.5/sq,z0=o.sh+k*3;
  E({x:0,y:g-3.4/sq,z:z0,rx:sx*1.12,ry:4/sq,rz:sx*.96,p:3.6,col:dk(c,.9)});
  E({x:0,y:g-hy,z:z0,rx:sx*.92,ry:hy*.9,rz:sx*.8,p:2.6,col:c,tex:(mx,my,mz)=>{const az=Math.atan2(mx,mz),el=Math.asin(clamp(my,-1,1));if(mz>0&&((Math.abs(az-.4)<.14||Math.abs(az+.4)<.14)&&el>-.22&&el<.18))return b==='blink'&&w>.5?c:hx(0x14201a);if(mz>0&&Math.abs(az)<.26&&el>.3&&el<.38)return hx(0x2a4a1a);if(my<-.5&&Math.abs(mx+.3)<.3&&Math.abs(my+.7)<.2)return c2;return (Math.sin(mx*15+my*11)>.8)?c2:0}});
  S({pts:[[0,g-hy*1.7,z0],[1.4,g-hy*2.4-1,z0]],w:[4,.9],col:c2});
  E({x:-4,y:g-hy*.9,z:z0+sx*.7,rx:2.6,ry:3,rz:1.4,p:4,col:hx(0xe8e0c8),tex:(mx,my,mz)=>mz>.3&&my<0&&Math.abs(mx)<.5?hx(0x2a2a1a):0});
  for(let i=0;i<3;i++){const u=(T*.5+i*.33)%1;E({x:Math.sin(i*4+1)*8,y:o.g-4-u*12,z:z0+3,rx:1.1*(1-u*.5),ry:1.1*(1-u*.5),rz:.8,p:4,col:hx(0xd8ff90),bias:.8})}}});
 // espectro
 reg('espectro',{name:'Espectro',w:64,h:84,gy:74,sched:[['float',2.4,8],['wail',2.2,8],['float',2,6]],build:(E,S,o)=>{const b=o.beh||'',w=o.bw||0,bob=Math.sin(o.t*2.2)*2+o.bob;const y0=o.g-24-bob;const c=hx(0x5a7ad8),c2=hx(0x9ab8ff),k=o.k||0;
  S({pts:[[0,y0-10,o.sh],[Math.sin(o.t*2)*1.6,y0+4,o.sh-1],[Math.sin(o.t*2+1)*3,o.g-1,o.sh-3]],w:[15,3],col:t=>t>.85?null:(Math.sin(t*20+o.t*4)>.3?c:c2),bias:.2});
  for(let i=0;i<4;i++){const x=-8+i*5.4;S({pts:[[x,y0+2,o.sh],[x+Math.sin(o.t*2+i)*2,y0+12,o.sh-2],[x+Math.sin(o.t*3+i)*3,y0+20+(i%2)*6,o.sh-3]],w:[3.4,.8],col:c})}
  const hy=y0-12-(b==='wail'?w*2:0);
  E({x:0,y:hy,z:o.sh+1,rx:6,ry:6.4,rz:5.6,p:3.2,col:hx(0xe8f0ff),tex:(mx,my,mz)=>{const az=Math.atan2(mx,mz),el=Math.asin(clamp(my,-1,1));if(mz>0&&((Math.abs(az-.42)<.16||Math.abs(az+.42)<.16)&&el>-.1&&el<.3))return hx(0x14102a);if(mz>0&&Math.abs(az)<.3&&el<-.15&&el>-.7-(b==='wail'?w*.4:0))return hx(0x2a2a50);return 0}});
  for(const sx of[-1,1])E({x:sx*2.6,y:hy-.4,z:o.sh+5,rx:1.1,ry:1.3,rz:.6,p:3,col:hx(0x58f0ff),bias:1});
  E({x:0,y:y0-17-(b==='wail'?w*2:0),z:o.sh,rx:7.4,ry:3,rz:6.6,p:3.4,col:c,tex:(mx,my,mz)=>mz>0.3&&my>.2?null:0});
  for(const sx of[-1,1]){const a=Math.max(sx>0?k:0,b==='wail'?w:0);S({pts:[[sx*7,y0-6,o.sh],[sx*13,y0-3-a*7,o.sh+2+a*5],[sx*14,y0+3-a*14,o.sh+1+a*8]],w:[3.2,1],col:c2})}
  for(let i=0;i<4;i++){const u=(o.t*.6+i*.25)%1;E({x:Math.sin(i*4+o.t)*14,y:o.g-u*50,z:Math.cos(i*3)*5,rx:.9,ry:.9,rz:.7,p:4,col:hx(0x9ae8ff),bias:1})}}});

 // ---------- aquaticos ----------
 reg('peixe',{name:'Peixe',w:72,h:60,gy:50,sched:[['swim',2.6,8],['gape',1.2,6],['swim',2,6]],build:(E,S,o)=>{
  const T=o.t,k=Math.max(0,o.k||0),b=o.beh||'',w=o.bw||0,mv=o.ph?1:0;
  const c=hx(0x5a8ab8),c2=hx(0xc8e0f0),fin=hx(0x3a6a98);
  const y0=o.g-26-Math.sin(T*2.4)*1.6-(mv?Math.sin(o.ph)*1.2:0),z0=o.sh+k*3,sw=Math.sin(T*(mv?9:4.4)+(o.ph||0))*(mv?5:2.6);
  E({x:0,y:y0,z:z0,rx:5.4,ry:7.6,rz:12.5,p:3,col:c,tex:(mx,my,mz)=>Math.sin(mz*14+mx*3)>.8?c2:0});
  E({x:0,y:y0+3.4,z:z0+1,rx:3.8,ry:4.6,rz:10.5,p:3,col:c2});
  S({pts:[[0,y0,z0-9],[sw*.5,y0,z0-14],[sw,y0,z0-19]],w:[6.4,2.4],col:c});
  S({pts:[[sw,y0-.6,z0-18],[sw*1.4,y0-9,z0-27]],w:[1.8,.4],col:fin});S({pts:[[sw,y0+.6,z0-18],[sw*1.4,y0+9,z0-27]],w:[1.8,.4],col:fin});
  S({pts:[[0,y0-6.5,z0+4],[0,y0-14,z0-3],[0,y0-6.5,z0-9]],w:[1.4,1.4],col:fin});
  for(const sx of[-1,1]){S({pts:[[sx*4.4,y0+3,z0+4],[sx*10.5,y0+7+Math.sin(T*5+sx)*1.3,z0-1]],w:[2.6,.6],col:fin});
   E({x:sx*4.2,y:y0-2,z:z0+8,rx:1.6,ry:1.9,rz:1.3,p:3,col:hx(0xfff4c8),bias:1});E({x:sx*4.7,y:y0-2,z:z0+8.8,rx:.8,ry:1,rz:.7,p:3,col:hx(0x101018),bias:1});}
  const gp=(b==='gape'?w:0)+k;
  S({pts:[[0,y0+2.2,z0+10],[0,y0+3.6+gp*3.2,z0+13.6]],w:[4.2,2.4],col:dk(c,.7)});
  for(const sx of[-1,1]){S({pts:[[sx*1.8,y0+1.6,z0+12],[sx*1.8,y0+3.2+gp*1.8,z0+12.6]],w:[.9,.2],col:hx(0xf4f4e8)});S({pts:[[sx*1.8,y0+4+gp*3,z0+13],[sx*1.8,y0+2.6+gp*1.4,z0+13.2]],w:[.9,.2],col:hx(0xf4f4e8)})}
  for(let i=0;i<3;i++){const u=(T*.5+i*.33)%1;E({x:Math.sin(i*4+1)*7,y:y0-8-u*18,z:z0+4,rx:1*(1-u*.5),ry:1*(1-u*.5),rz:.8,p:4,col:hx(0xd0f4ff),bias:.8})}}});
 reg('medusa',{name:'Agua-viva',w:64,h:84,gy:74,sched:[['pulse',2.4,8],['drift',2,6]],build:(E,S,o)=>{
  const T=o.t,k=Math.max(0,o.k||0),mv=o.ph?1:0;
  const pul=Math.sin(T*3.2+(o.ph||0))*.5+.5,y0=o.g-40-Math.sin(T*1.6)*2-(mv?Math.abs(Math.sin(o.ph))*3:0)-k*3;
  const c=hx(0xa8d8ff),c2=hx(0xf0b8ff);
  E({x:0,y:y0,z:o.sh,rx:11+pul*1.8,ry:7.6-pul*1.3,rz:11+pul*1.8,p:2.6,col:c,tex:(mx,my,mz)=>Math.sin(Math.atan2(mx,mz)*8)>.62?c2:0});
  E({x:0,y:y0-.8,z:o.sh,rx:6,ry:4,rz:6,p:3,col:hx(0xfff0ff),bias:.8});
  for(const sx of[-1,1])E({x:sx*3,y:y0+1,z:o.sh+9,rx:1.1,ry:1.3,rz:.7,p:3,col:hx(0x30204a),bias:1});
  for(let i=0;i<7;i++){const a=i/7*TAU,bx=Math.cos(a)*7*(1+pul*.15),bz=Math.sin(a)*7*(1+pul*.15),ph=T*3+i*1.3;
   S({pts:[[bx,y0+3,o.sh+bz],[bx*1.1+Math.sin(ph)*2,y0+13,o.sh+bz*1.1],[bx*1.2+Math.sin(ph+1)*3,y0+25+Math.sin(ph)*2,o.sh+bz*1.2]],w:[1.9,.5],col:i%2?c2:c})}
  for(let i=0;i<3;i++)S({pts:[[(i-1)*3,y0+3,o.sh],[(i-1)*3+Math.sin(T*2+i)*2,y0+15,o.sh],[(i-1)*4,y0+27,o.sh+Math.sin(T*2+i)*2]],w:[3.2,1.2],col:hx(0xe8a8f8)});
  for(let i=0;i<3;i++){const u=(T*.4+i*.33)%1;E({x:Math.sin(i*5)*9,y:y0-6-u*20,z:o.sh,rx:.9,ry:.9,rz:.7,p:4,col:hx(0xd8f8ff),bias:.8})}}});
 reg('polvo',{name:'Polvo',w:84,h:84,gy:72,sched:[['float',2.6,8],['wave',1.8,8]],build:(E,S,o)=>{
  const T=o.t,k=Math.max(0,o.k||0),b=o.beh||'',w=o.bw||0,mv=o.ph?1:0;
  const c=hx(0x9a4a8a),c2=hx(0xd88ac0);
  const y0=o.g-34-Math.sin(T*1.8)*2-(mv?Math.abs(Math.sin(o.ph))*4:0)-k*2;
  E({x:0,y:y0-10,z:o.sh-1,rx:8.4,ry:11.5,rz:8.4,p:3,col:c,tex:(mx,my,mz)=>Math.sin(mx*14+my*9+mz*11)>.8?c2:0});
  E({x:0,y:y0,z:o.sh,rx:9,ry:6.8,rz:9,p:3,col:c});
  for(const sx of[-1,1]){E({x:sx*4.2,y:y0-1.4,z:o.sh+7,rx:2,ry:2.3,rz:1.4,p:3,col:hx(0xfff0b0),bias:1});E({x:sx*4.4,y:y0-1.4,z:o.sh+8,rx:.5,ry:1.8,rz:.6,p:3,col:hx(0x101018),bias:1});}
  for(let i=0;i<8;i++){const a=i/8*TAU+.4,bx=Math.cos(a)*5,bz=Math.sin(a)*5,ph=T*2.2+i*.8+(mv?o.ph:0),ext=(b==='wave'&&i<2?w*10:0)+k*5;
   S({pts:[[bx,y0+4,o.sh+bz],[bx*2+Math.sin(ph)*2,y0+10,o.sh+bz*2],[bx*3.1+Math.sin(ph+1.2)*3,y0+17+Math.cos(ph)*2-ext*.6,o.sh+bz*3.1+ext*.5],[bx*3.7+Math.sin(ph+2)*4,y0+22+Math.cos(ph+1)*1.5-ext,o.sh+bz*3.7+ext*.6]],w:[3.4,.6],col:i%2?c:c2})}
  for(let i=0;i<3;i++){const u=(T*.45+i*.33)%1;E({x:Math.sin(i*4)*8,y:y0-14-u*16,z:o.sh,rx:.9,ry:.9,rz:.7,p:4,col:hx(0xd8f0ff),bias:.8})}}});
 reg('tubarao',{name:'Tubarao',w:104,h:76,gy:62,sched:[['patrol',3,8],['bite',1.1,6],['patrol',2,6]],build:(E,S,o)=>{
  const T=o.t,k=Math.max(0,o.k||0),b=o.beh||'',w=o.bw||0,mv=o.ph?1:0;
  const c=hx(0x6a7e94),belly=hx(0xe4ecf4),fin=hx(0x4e6078);
  const y0=o.g-32-Math.sin(T*1.5)*1.6,sw=Math.sin(T*(mv?7:3.2)+(o.ph||0))*(mv?5.5:3);
  E({x:0,y:y0,z:o.sh+6+k*3,rx:7.6,ry:8.8,rz:13,p:3,col:c});
  E({x:sw*.15,y:y0+.4,z:o.sh-8,rx:6.2,ry:7.2,rz:12,p:3,col:c});
  E({x:0,y:y0+3.6,z:o.sh+4,rx:5.6,ry:5.4,rz:15,p:3,col:belly});
  E({x:0,y:y0+.6,z:o.sh+18+k*3,rx:5.6,ry:5.8,rz:9,p:3,col:c});
  S({pts:[[sw*.3,y0,o.sh-16],[sw*.8,y0,o.sh-24],[sw*1.6,y0-1,o.sh-31]],w:[6.2,1.6],col:c});
  S({pts:[[sw*1.6,y0-2,o.sh-30],[sw*2.1,y0-13,o.sh-39]],w:[3.2,.6],col:fin});S({pts:[[sw*1.6,y0+1,o.sh-30],[sw*2,y0+8,o.sh-37]],w:[2.6,.5],col:fin});
  S({pts:[[0,y0-7.8,o.sh+5],[0,y0-20,o.sh-3],[0,y0-8,o.sh-11]],w:[2.6,2.6],col:fin});
  for(const sx of[-1,1]){S({pts:[[sx*6,y0+5,o.sh+9],[sx*17,y0+11+Math.sin(T*3)*1.2,o.sh-1]],w:[3.6,.6],col:fin});
   E({x:sx*5.2,y:y0-1.2,z:o.sh+19,rx:1.2,ry:1.4,rz:1,p:3,col:hx(0x0a0a10),bias:1});
   for(let g=0;g<3;g++)S({pts:[[sx*7.4,y0-2+g*2,o.sh+10-g*1.4],[sx*7.6,y0+1+g*2,o.sh+10-g*1.4]],w:[.5,.5],col:dk(c,.55)});}
  const gp=(b==='bite'?w:0)+k;
  S({pts:[[0,y0+3.8,o.sh+16],[0,y0+5+gp*4.2,o.sh+24]],w:[5,3],col:belly});
  if(gp>.1)for(const sx of[-1,1])S({pts:[[sx*2,y0+4,o.sh+22],[sx*2,y0+6+gp*2,o.sh+22.6]],w:[1,.2],col:hx(0xffffff)});
  for(let i=0;i<3;i++){const u=(T*.4+i*.33)%1;E({x:Math.sin(i*4)*9,y:y0-12-u*20,z:o.sh+8,rx:1,ry:1,rz:.8,p:4,col:hx(0xd0f4ff),bias:.8})}}});
 // corvo / falcao
 reg('corvo',{name:'Corvo de Odin',w:96,h:76,gy:66,sched:[['fly',.9,8]],build:(E,S,o)=>{const st=o.st||0;const c=hx(0x1e1a2c),c2=hx([0x4a4a8a,0x4a7aca,0xc8a038,0xffe8a0][st]);
  const fl=o.beh==='fly'?Math.sin((o.bt||0)*TAU):Math.sin(o.t*(o.ph||o.k>0?16:5));const hov=o.g-22-Math.sin(o.t*2)*2;const y0=hov+(o.k>0?-o.k*4:0),z0=o.sh,kk=o.k>0?o.k:0;
  E({x:0,y:y0,z:z0,rx:4.4,ry:5.8,rz:9,p:3,col:c,tex:fur(c,c2,2)});E({x:0,y:y0-4,z:z0+8+kk*4,rx:3.2,ry:3.4,rz:3.6,p:3,col:c,tex:fur(c,c2)});
  S({pts:[[0,y0-4.2,z0+10+kk*4],[0,y0-3.2,z0+14+kk*5],[0,y0-1.6,z0+13.4+kk*5]],w:[3,.8],col:hx(0xe0a838)});
  for(const sx of[-1,1])E({x:sx*2.4,y:y0-5.2,z:z0+9.6+kk*4,rx:1.1,ry:1,rz:.8,p:3,col:hx([0xff4030,0x40c0ff,0xffd040,0xffffff][st]),bias:1});
  for(const sx of[-1,1])for(let i=0;i<5;i++){const a=fl*.8;S({pts:[[sx*3,y0-3,z0+2],[sx*(10+i*3),y0-10-i*1.6-a*8,z0+1-i],[sx*(16+i*4),y0-6-i*3-a*14,z0-i*1.6]],w:[4,1.1],col:i%2?c:hx(0x2c2a44)})}
  for(const k2 of[-1,0,1])S({pts:[[0,y0+3,z0-7],[k2*2,y0+8,z0-14],[k2*3.4,y0+12,z0-18]],w:[3,1.6],col:c});
  for(const sx of[-1,1])S({pts:[[sx*2,y0+6,z0],[sx*2,y0+10,z0+2+(kk>0?2:0)],[sx*2.4,y0+12,z0+3]],w:[1.4,1],col:hx(0xe0a838)});
  for(let i=0;i<3;i++){const u=(o.t*.8+i*.33)%1;E({x:Math.sin(i*5)*12,y:o.g-u*20,z:-5,rx:.8,ry:.8,rz:.8,p:4,col:hx(0x9a8aff),bias:1})}}});
 // ---------- mapeamento shape -> especie ----------
 const SHAPES={wolf:['lobo',.5,1.9],frostwolf:['lobogelo',.6,1.9],hati:['warg',.35,2],boar:['javali',.5,2.0],horse:['cavalo',.25,1.7],montaria:['montaria',.25,1.7],cao:['cao',.45,1.9],gato:['gato',.5,1.9],raposa:['raposa',.35,1.9],coelho:['coelho',.4,1.9],yeti:['yeti',.7,1.35],blob:['gosma',.85,1.9],goblin:['goblin',.3,2],draugr:['draugr',.3,1.75],cinder:['imp',.55,1.7],automaton:['golemmetal',.75,1.2],sylvan:['sylvan',.7,1.3],prism:['golemprisma',.8,1.1],sentinel:['golempedra',.6,1.2],voidling:['espectro',.85,1.1],jotun:['troll',.5,1.5],grifo:['corvo',.35,1.8],corvo:['corvo',0,1.6],peixe:['peixe',.55,2.5],medusa:['medusa',.5,1.9],polvo:['polvo',.55,1.9],tubarao:['tubarao',.5,2.3]};
 const DIRS={down:0,dq:1,side:2,uq:3,up:4};
 const lumOf=(c)=>(c[0]+c[1]+c[2])/765;
 function mkTint(rgb,k){const tl=lumOf(rgb)||.5;return (c)=>{if(!Array.isArray(c))return c;const s=lumOf(c)/tl;return mix(c,[Math.min(255,rgb[0]*s),Math.min(255,rgb[1]*s),Math.min(255,rgb[2]*s)],k)}}
 function mpose(anim,t,sp,pose){const o={ph:0,bob:0,k:0,sh:0,t,beh:'',bw:0,bt:0};
  if(anim===1){o.ph=pose.ph;o.bob=Math.abs(Math.sin(o.ph))*.9}
  else if(anim===2){o.k=pose.k}
  else if(pose.beh){o.beh=pose.beh;o.bt=pose.bt;o.bw=pose.bw}
  return o}
 function draw(spec,dirIdx,pose,opt){
  const S0=opt.S,w=Math.ceil(spec.w*S0),h=Math.ceil(spec.h*S0),gy=Math.round(spec.gy*S0);const K=Ctx(dirIdx*Math.PI/4);const I=new Img(w,h);
  const o=mpose(pose.anim,pose.t,spec,pose);o.g=spec.gy;o.st=opt.st||0;const out=[];const tf=opt.tint;
  const E_=q=>{if(q.p===undefined)q.p=3.2;if(tf&&!q.bias){q.col=tf(q.col);if(q.tex){const f0=q.tex;q.tex=(a,b,c,d,e,g)=>{const r=f0(a,b,c,d,e,g);return Array.isArray(r)?tf(r):r}}}out.push(['e',q])};
  const S_=q=>{if(tf&&!q.bias){if(typeof q.col==='function'){const f0=q.col;q.col=(a,b)=>{const r=f0(a,b);return Array.isArray(r)?tf(r):r}}else q.col=tf(q.col)}out.push(['s',q])};
  spec.build(E_,S_,o);
  const SS=S0,tr=(p)=>[p[0]*SS,(p[1]-spec.gy)*SS+gy,p[2]*SS];
  const sr=Math.min(24,spec.w*.2)*S0;for(let y=-3;y<=3;y++)for(let x=-sr;x<=sr;x++)if((x/sr)**2+(y/3)**2<=1)put(I,Math.round(w/2+x),gy+y,-1e8,[0,0,0],80);
  for(const [k2,q] of out){if(k2==='e'){q.x*=SS;q.z*=SS;q.rx*=SS;q.ry*=SS;q.rz*=SS;q.y=(q.y-spec.gy)*SS+gy;ellipsoid(I,K,q)}else{q.pts=q.pts.map(tr);q.w=Array.isArray(q.w)?q.w.map(v=>v*SS):q.w*SS;strip(I,K,q)}}
  outline(I,200);
  return {d:I.d,w,h,gy};
 }
 // escolhe o comportamento de espera pelo relogio (cada monstro com defasagem propria)
 function idlePose(spec,clk,seed){
  const tot=spec.sched.reduce((s,a)=>s+a[1],0);let T=((clk/1000)+seed*3.7)%tot;
  for(const [n,d,N] of spec.sched){if(T<d){const bt=T/d,qi=Math.min(N-1,Math.floor(bt*N)),bq=(qi+.5)/N;
   const hold=n==='sit'||n==='stand'||n==='rest'||n==='float'||n==='sway';
   return {beh:n,qi,bt:bq,bw:sm(0,.22,bq)*(1-sm(.78,1,bq)),t:(hold?(qi%3)*.9:bq*d)+(spec.id==='corvo'?0:0),dur:d}}T-=d}
  return {beh:'stand',qi:0,bt:0,bw:0,t:0}
 }
 const CACHE=new Map();
 function mon(f,dir,frame,lvl,def,extra){
  const m=SHAPES[f];if(!m)return null;const spec=MON[m[0]];if(!spec)return null;
  const di=DIRS[dir]??0;let pose,tk;
  if(lvl>0){const q={1:.42,2:.2,3:.46}[Math.min(3,lvl)];const kc=q<.35?-q/.35*.4:q<.5?-.4+(q-.35)/.15*1.4:1-(q-.5)/.5;pose={anim:2,k:clamp(kc,-.4,1),t:.3};tk='a'+lvl}
  else if(frame>=0){pose={anim:1,ph:frame/8*TAU,t:frame*.125};tk='w'+frame}
  else if(extra&&extra.clk!=null&&spec.sched){const ip=idlePose(spec,extra.clk,extra.seed||0);pose={anim:0,...ip};tk='i'+ip.beh+ip.qi}
  else{pose={anim:0,t:.3};tk='i'}
  const st=(extra&&extra.st)||0,col=(def&&def.color)||null;
  const key=f+':'+(def&&def.id||'')+':'+dir+':'+tk+':'+st;let r=CACHE.get(key);if(r)return r;
  if(CACHE.size>2400)CACHE.clear();
  const rgb=col!=null?[(col>>16)&255,(col>>8)&255,col&255]:null;
  const S0=(extra&&extra.S)||m[2]||2.2,KS=.88;
  const img=draw(spec,di,pose,{S:S0,st,tint:rgb&&m[1]>0?mkTint(rgb,m[1]):null});
  const cv=document.createElement('canvas');cv.width=img.w;cv.height=img.h;cv.getContext('2d').putImageData(new ImageData(img.d,img.w,img.h),0,0);
  r={cv,ax:img.w/2*KS,ay:img.gy*KS,k:KS,key};CACHE.set(key,r);return r;
 }
 return {mon,SHAPES,MON,idlePose};
})();
