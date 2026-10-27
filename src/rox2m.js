// ===== ROX2M: monstros/falcão/montaria no visual novo =====
var ROX2M = (() => {
 const {hx,mix,dk,TAU,clamp,Ctx,Img,put,ellipsoid,strip,outline}=ROX2.eng;
const add=(a,b,k=1)=>[a[0]+b[0]*k,a[1]+b[1]*k,a[2]+b[2]*k];
const nz=(a,b)=>{const n=Math.sin(a*127.1+b*311.7)*43758.5453;return n-Math.floor(n)};
const MANIMS=['Parado','Mover','Atacar','Dano','Morte'];
function mpose(anim,t){const o={ph:0,bob:0,k:0,hurt:0,die:0,sh:0};
 if(anim===0)o.bob=Math.sin(t*2.4)*.7;
 else if(anim===1){o.ph=t*9;o.bob=Math.abs(Math.sin(o.ph))*.9}
 else if(anim===2){const q=(t*1.4)%1;o.k=q<.35?-q/.35*.4:q<.5?-.4+(q-.35)/.15*1.4:1-(q-.5)/.5*1;o.k=clamp(o.k,-.4,1)}
 else if(anim===3){const q=(t*1.4)%1;o.hurt=q<.45?1-q/.45:0;o.sh=-o.hurt*2.2;o.bob=o.hurt*-.8}
 else{o.die=clamp(((t%2.4))/1.9,0,1)}
 return o}
// ---------- helpers ----------
const fur=(c,c2,k=1)=>(mx,my,mz)=>Math.sin(mx*18*k+my*9+mz*7)>.62?c2:(Math.sin(mx*7+mz*11)<-.7?dk(c,.82):0);
function quad(E,S,o,p){
 const g=o.g,lh=p.legL,top=g-lh-p.H,bc=g-lh-p.H*.5-o.bob;
 const body=add([0,bc,0],[0,0,o.sh]);
 E({x:0,y:bc,z:o.sh-p.L*.06,rx:p.W,ry:p.H*.5,rz:p.L*.5,col:p.col,tex:p.tex||fur(p.col,p.col2)});
 E({x:0,y:bc-p.H*.04,z:o.sh+p.L*.26,rx:p.W*1.06,ry:p.H*.55,rz:p.L*.3,col:p.col,tex:p.tex||fur(p.col,p.col2)});
 const lg=[[-1,1,0],[1,1,Math.PI],[-1,-1,Math.PI],[1,-1,0]];
 for(const [sx,fz,po] of lg){const ph=o.ph+po,sw=Math.sin(ph)*p.stride*(o.ph?1:0),lf=Math.max(0,Math.cos(ph))*p.lift*(o.ph?1:0);const z=fz*p.L*.31+o.sh;const hip=[sx*p.W*.66,bc+p.H*.2,z],ft=[sx*p.W*.66,g-lf-1,z+sw];const kn=[sx*p.W*.66,(hip[1]+ft[1])/2,(hip[2]+ft[2])/2+(fz>0?-1:1.4)];
  S({pts:[hip,kn,ft],w:[p.legW*1.3,p.legW],col:p.col});E({x:ft[0],y:ft[1]+.2,z:ft[2]+1,rx:p.legW*.6,ry:1.6,rz:p.legW*.9,col:p.paw||dk(p.col,.8)})}
 // cabeça
 const hz=p.L*.5+o.sh+o.k*p.L*.22,hy=bc-p.H*.28+(p.hHigh||0);
 S({pts:[[0,bc-p.H*.2,p.L*.28+o.sh],[0,(hy+bc)/2-1,(hz+p.L*.28)/2],[0,hy,hz]],w:[p.W*1.5,p.hw*1.7],col:p.col,tex:undefined});
 const jaw=o.k>.2?(o.k-.2)*p.hh*.9:0;
 E({x:0,y:hy,z:hz,rx:p.hw,ry:p.hh,rz:p.hl,col:p.hcol||p.col,tex:p.htex||fur(p.col,p.col2)});
 E({x:0,y:hy+p.hh*.3,z:hz+p.hl*.8,rx:p.hw*.62,ry:p.hh*.5,rz:p.hl*.9,col:p.snout||p.col2,tex:undefined});
 E({x:0,y:hy+p.hh*.55+jaw,z:hz+p.hl*.7,rx:p.hw*.5,ry:p.hh*.3,rz:p.hl*.8,col:p.snout||p.col2});
 E({x:0,y:hy+p.hh*.12,z:hz+p.hl*1.62,rx:1.3,ry:1,rz:.9,col:hx(0x14101a)});
 if(jaw>0||p.fangs)for(const sx of[-1,1]){S({pts:[[sx*p.hw*.38,hy+p.hh*.4,hz+p.hl*1.45],[sx*p.hw*.38,hy+p.hh*.4+p.hh*(.55+jaw*.2),hz+p.hl*1.5]],w:[1.7,.7],col:hx(0xf4f0e0)})}
 for(const sx of[-1,1]){E({x:sx*p.hw*.62,y:hy-p.hh*.12,z:hz+p.hl*.9,rx:1.5,ry:1.2,rz:1,col:p.eye,bias:1});
  if(p.ears)S({pts:[[sx*p.hw*.7,hy-p.hh*.5,hz-p.hl*.1],[sx*p.hw*.95,hy-p.hh*1.1,hz-p.hl*.2],[sx*p.hw*.8,hy-p.hh*1.5,hz-p.hl*.3]],w:[p.hw*.7,1],col:p.col})}
 // rabo
 if(p.tail)S({pts:[[0,bc-p.H*.1,-p.L*.5+o.sh],[0,bc-p.H*.3+Math.sin(o.ph*.5+1)*1.5,-p.L*.72+o.sh],[0,bc-p.H*.1+Math.sin(o.ph*.5)*2,-p.L*.95+o.sh]],w:[p.W*.8,p.W*.3],col:p.col});
 return{hy,hz,bc}}
function biped(E,S,o,p){
 const g=o.g,s=p.sc||1,lh=p.legL*s,bc=g-lh-p.th*s*.5-o.bob;const sh=o.sh;
 for(const sx of[-1,1]){const ph=o.ph+(sx>0?Math.PI:0),sw=Math.sin(ph)*5*s*(o.ph?1:0),lf=Math.max(0,Math.cos(ph))*2.6*s*(o.ph?1:0);const hip=[sx*p.hw*s*.5,bc+p.th*s*.4,sh],ft=[sx*p.hw*s*.5,g-lf-1,sw+sh];
  S({pts:[hip,[hip[0],(hip[1]+ft[1])/2,(hip[2]+ft[2])/2+1],ft],w:[p.legW*s*1.2,p.legW*s],col:p.legCol});E({x:ft[0],y:ft[1]+.4,z:ft[2]+1.6*s,rx:p.legW*s*.7,ry:1.8*s,rz:p.legW*s*1.1,col:p.boot||p.legCol})}
 E({x:0,y:bc,z:sh+o.k*p.th*.1,rx:p.hw*s,ry:p.th*s*.5,rz:p.hw*s*.62,p:p.tp||2.8,col:p.col,tex:p.tex});
 if(false)E({x:0,y:bc+p.th*s*.18,z:sh+2*s+o.k*p.th*.1,rx:p.hw*s*.85,ry:p.th*s*.3,rz:p.hw*s*.6,col:p.col});
 const hy=bc-p.th*s*.5-p.hh*s*.9+(p.hy||0)*s,hz=sh+(p.hunch||0)*s+o.k*s*3;
 E({x:0,y:hy,z:hz,rx:p.hrx*s,ry:p.hh*s,rz:p.hrz*s,col:p.hcol,tex:p.htex});
 // braços
 const arms=[];for(const sx of[-1,1]){const idx=sx>0?1:0;let sw=Math.sin(o.ph+(sx>0?0:Math.PI))*-5*s*(o.ph?1:0);let up=0,fw=0;if(sx>0&&o.k){up=Math.max(0,o.k)*-p.arm*.8*s+(o.k<0?-o.k*p.arm*.9*s:0);fw=Math.max(0,o.k)*p.arm*.9*s}
  const shd=[sx*(p.hw+1)*s,bc-p.th*s*.38,sh],h=[sx*(p.hw+2.5)*s,bc-p.th*s*.38+p.arm*s*.9+up,sh+sw+fw];const m=[(shd[0]+h[0])/2+sx*1.5*s,(shd[1]+h[1])/2,(shd[2]+h[2])/2-1.4*s];
  S({pts:[shd,m,h],w:[p.armW*s*1.15,p.armW*s],col:p.armCol});E({x:h[0],y:h[1]+.8*s,z:h[2],rx:p.armW*s*.6,ry:p.armW*s*.7,rz:p.armW*s*.6,p:4,col:p.hand||p.armCol});arms[idx]={h:[h[0],h[1]+.8*s,h[2]],m}}
 return{bc,hy,hz,arms,s}}
const wdir=(A,o)=>o.k?nrm([(A.h[0]-A.m[0])*.4,(A.h[1]-A.m[1])*.4-3,(A.h[2]-A.m[2])*.9+2]):nrm([.2,-1,.3]);
const nrm=v=>{const l=Math.hypot(...v)||1;return v.map(x=>x/l)};
const club=(S,A,o,len,col,w=3,head=true)=>{const d=wdir(A,o),h=A.h;S({pts:[add(h,d,-3),add(h,d,len)],w:[w*.8,w*1.5],col});};
const EYE=hx(0xffe040);
// ---------- bestiário ----------
const MON={};
const reg=(id,o)=>{MON[id]={id,w:72,h:64,gy:56,...o}};
reg('lobo',{name:'Lobo Cinzento',fam:'Lobos e feras',build:(E,S,o)=>quad(E,S,o,{L:26,H:10,W:5,legL:7,legW:2.6,col:hx(0x8a8f9c),col2:hx(0xb4b9c6),stride:5,lift:2.5,hw:4.2,hh:3.6,hl:4.4,snout:hx(0xc4c8d4),eye:EYE,ears:1,tail:1,fangs:0})});
reg('warg',{name:'Warg Carmesim',fam:'Lobos e feras',w:80,h:72,gy:62,build:(E,S,o)=>{const r=quad(E,S,o,{L:30,H:13,W:6.4,legL:7,legW:3.2,col:hx(0x3a2a30),col2:hx(0x6a3a3a),stride:5.5,lift:2.5,hw:5.4,hh:4.6,hl:5.4,snout:hx(0x5a3a40),eye:hx(0xff3a2a),ears:1,tail:1,fangs:1,hHigh:-2});
  for(let i=0;i<6;i++){const z=-8+i*4.2+o.sh;S({pts:[[0,r.bc-6.4,z],[0,r.bc-11-(i%2)*2,z-2]],w:[3,.8],col:hx(0xb0a090)})}
  E({x:0,y:r.hy+5,z:r.hz-1,rx:7,ry:2,rz:6,col:hx(0x8a8a98),tex:(mx)=>Math.abs(Math.sin(mx*10))>.9?hx(0xd8d8e8):0})}});
reg('javali',{name:'Javali Selvagem',fam:'Feras de Midgard',build:(E,S,o)=>{const r=quad(E,S,o,{L:22,H:12,W:6.4,legL:5,legW:2.8,col:hx(0x6a4a34),col2:hx(0x8a6444),stride:4,lift:2,hw:4.8,hh:4.2,hl:4.2,snout:hx(0xc09a80),eye:hx(0xffd040),ears:1,tail:0,hHigh:2});
  for(const sx of[-1,1])S({pts:[[sx*3,r.hy+3,r.hz+4],[sx*4.4,r.hy+5,r.hz+8],[sx*3.6,r.hy+1.4,r.hz+10]],w:[2.4,.8],col:hx(0xf4f0dc)});
  for(let i=0;i<7;i++)S({pts:[[0,r.bc-6.4,-9+i*3+o.sh],[0,r.bc-9.4,-10+i*3+o.sh]],w:[2,.6],col:hx(0x2a2018)})}});
reg('esqueleto',{name:'Esqueleto Guerreiro',fam:'Mortos-vivos',w:60,h:72,gy:66,build:(E,S,o)=>{const bone=hx(0xe8e0c8),bd=hx(0xc8bea0);const r=biped(E,S,o,{legL:12,legW:2,th:14,hw:5.2,col:bone,legCol:bone,armCol:bone,arm:12,armW:1.8,hrx:5,hrz:4.8,hh:5,hcol:bone,tex:(mx,my,mz)=>mz>.1&&(Math.sin(my*13)>.2)&&Math.abs(mx)<.8?hx(0x2a2420):(mz>.1?bd:0),boot:bd,hy:-1});
  for(const sx of[-1,1])E({x:sx*1.8,y:r.hy+1.4,z:r.hz+4.2,rx:1.6,ry:1.8,rz:1,col:hx(0x12101a)}),E({x:sx*1.8,y:r.hy+1.4,z:r.hz+4.6,rx:.8,ry:.9,rz:.6,col:hx(0x58e8ff),bias:1});
  E({x:0,y:r.hy+4.4,z:r.hz+3.6,rx:2.8,ry:1.4,rz:1.4,col:bone,tex:(mx)=>Math.sin(mx*18)>.4?hx(0x2a2420):0});
  E({x:0,y:r.hy-3.8,z:r.hz,rx:5.6,ry:3.4,rz:5.4,col:hx(0x6a6a74),tex:(mx,my)=>my>.5?null:0});
  const A=r.arms[1];if(A){const d=wdir(A,o),h=A.h;S({pts:[h,add(h,d,3)],w:1.8,col:hx(0x5a3a22)});S({pts:[add(h,d,3),add(h,d,17)],w:[2.4,1.2],col:hx(0x9a8a78)});S({pts:[add(add(h,d,3),[-3,0,0]),add(add(h,d,3),[3,0,0])],w:1.6,col:hx(0x6a5a48)})}
  const L=r.arms[0];if(L)E({x:L.h[0]-2,y:L.h[1]-1,z:L.h[2]+2.4,rx:5,ry:5.4,rz:1.4,col:hx(0x7a5a3a),tex:(mx,my,mz,X,Y)=>Math.hypot(X,Y)>.82?hx(0x6a6a74):(Math.hypot(X,Y)<.2?hx(0xc8ced8):0)})}});
reg('draugr',{name:'Draugr',fam:'Mortos-vivos',w:64,h:72,gy:66,build:(E,S,o)=>{const sk=hx(0x7a9a86);const r=biped(E,S,o,{legL:11,legW:2.8,th:16,hw:6,col:hx(0x4a4a58),legCol:hx(0x3a3a46),armCol:sk,arm:13,armW:2.4,hrx:5.4,hrz:5.2,hh:5.2,hcol:sk,boot:hx(0x2a2a30),hunch:3,hy:2,tex:(mx,my,mz)=>(my>.3&&Math.sin(mx*14)>.3)?null:(Math.abs(my+.5)<.1?hx(0x6a5a3a):0)});
  for(const sx of[-1,1])E({x:sx*2.2,y:r.hy+.4,z:r.hz+4.8,rx:1.2,ry:1,rz:.8,col:hx(0x58c8ff),bias:1});
  E({x:0,y:r.hy+5.8,z:r.hz+3.4,rx:3.8,ry:4,rz:2.6,col:hx(0x8a8a8a),tex:(mx)=>Math.sin(mx*20)>.3?hx(0x6a6a6a):0});
  E({x:0,y:r.hy-3.6,z:r.hz,rx:5.6,ry:3.6,rz:5.4,col:hx(0x3a3a46)});
  S({pts:[[-5,r.bc-6,-3],[-6,r.bc+8,-5],[-5,r.bc+14,-4]],w:[6,3],col:hx(0x2a3a3a)});
  const A=r.arms[1];if(A){const d=wdir(A,o),h=A.h;S({pts:[add(h,d,-3),add(h,d,19)],w:2,col:hx(0x6a4a2a)});S({pts:[add(h,d,16),add(add(h,d,16),[5.4,0,0]),add(add(h,d,11),[5,0,0]),add(h,d,10)],w:[3.6,3.4],col:hx(0x8a8a98)})}}});
reg('goblin',{name:'Goblin Saqueador',fam:'Goblins e saqueadores',w:52,h:52,gy:46,build:(E,S,o)=>{const sk=hx(0x6ab04a);const r=biped(E,S,o,{sc:.9,legL:7,legW:2.4,th:11,hw:4.8,col:hx(0x7a5a34),legCol:hx(0x5a4228),armCol:sk,arm:10,armW:2,hrx:5.2,hrz:4.8,hh:4.6,hcol:sk,boot:hx(0x3a2a1c),hunch:1.5,belly:1});
  const s=.9;for(const sx of[-1,1])S({pts:[[sx*5*s,r.hy-1,r.hz],[sx*10*s,r.hy-3,r.hz-1],[sx*13*s,r.hy-1,r.hz-1.4]],w:[3.6,.8],col:sk});
  for(const sx of[-1,1])E({x:sx*2.2*s,y:r.hy,z:r.hz+4.4*s,rx:1.4,ry:1.4,rz:.8,col:hx(0xffe040),bias:.9});
  E({x:0,y:r.hy+2.2,z:r.hz+5*s,rx:1.5,ry:1.2,rz:1.2,col:sk});E({x:0,y:r.hy+4,z:r.hz+3.6*s,rx:2.2,ry:.7,rz:.8,col:hx(0xe8e0c8)});
  E({x:-5,y:r.bc+3,z:-4,rx:2.4,ry:3.6,rz:2,p:4,col:hx(0x8a6a3a)});
  const A=r.arms[1];if(A){const d=wdir(A,o),h=A.h;S({pts:[h,add(h,d,2)],w:1.6,col:hx(0x4a3220)});S({pts:[add(h,d,2),add(h,d,10)],w:[2.4,.9],col:hx(0xc8ccd8)})}}});
reg('troll',{name:'Troll da Montanha',fam:'Trolls e gigantes',w:96,h:100,gy:92,build:(E,S,o)=>{const sk=hx(0x7a8a6a);const r=biped(E,S,o,{sc:1.6,legL:10,legW:4,th:18,hw:8.6,col:hx(0x6a7a5a),legCol:hx(0x5a6a4a),armCol:sk,arm:15,armW:3.8,hrx:5.2,hrz:5,hh:4.6,hcol:sk,boot:hx(0x4a4a3a),hunch:2,belly:1,tp:2.4,hy:2,tex:(mx,my,mz)=>(my<-.5&&Math.sin(mx*11+my*7)>.2)?hx(0x4a8a3a):(Math.sin(mx*13+my*11)>.8?hx(0x8a9a7a):0)});
  const s=1.6;for(const sx of[-1,1]){E({x:sx*2.4*s,y:r.hy+.6,z:r.hz+4.6*s,rx:1.2,ry:1,rz:.8,col:hx(0xff6a30),bias:1});S({pts:[[sx*2.4*s,r.hy+4.6*s,r.hz+4*s],[sx*3.6*s,r.hy+2.4*s,r.hz+5.4*s]],w:[2,.8],col:hx(0xf0e6c8)})}
  E({x:0,y:r.hy+3.4*s,z:r.hz+4*s,rx:3.6*s,ry:1.6*s,rz:1.6,col:hx(0x4a3a30)});
  E({x:0,y:r.bc-9*s,z:-2,rx:11,ry:3,rz:7,col:hx(0x4a8a3a),tex:(mx)=>Math.sin(mx*14)>.4?hx(0x6aaa4a):0});
  const A=r.arms[1];if(A){const d=wdir(A,o),h=A.h;S({pts:[add(h,d,-4),add(h,d,28)],w:[3.4,7.5],col:hx(0x6a4a2a)});}}});
reg('aranha',{name:'Aranha Gigante',fam:'Rastejantes',w:84,h:56,gy:48,build:(E,S,o)=>{const c=hx(0x2a1c3a),c2=hx(0x4a2a6a);const bc=o.g-9-o.bob;
  E({x:0,y:bc-1,z:-9+o.sh,rx:8,ry:7.4,rz:10,col:c,tex:(mx,my,mz)=>(my<-.2&&Math.abs(mx)<.3&&Math.sin(mz*9)>0)?hx(0xc03030):(Math.sin(mx*12+mz*9)>.7?c2:0)});
  E({x:0,y:bc+.5,z:3+o.sh+o.k*3,rx:5.4,ry:4.6,rz:5.4,col:c,tex:fur(c,c2)});
  for(let i=0;i<8;i++){const sx=i<4?-1:1,j=i%4,ph=o.ph+j*1.3+(sx>0?Math.PI:0),sw=Math.sin(ph)*3*(o.ph?1:0),lf=Math.max(0,Math.cos(ph))*3*(o.ph?1:0);const z=6-j*4.2+o.sh,fx=sx*(15+j*0),fz=z+(j<2?5:-4)-(j===0?o.k*5:0)+sw;
   S({pts:[[sx*3,bc,z],[sx*9,bc-10-j,z+(j<2?2:-1)],[sx*fx*.96,o.g-lf-1,fz]],w:[2.4,1],col:c})}
  for(const sx of[-1,1]){S({pts:[[sx*1.6,bc+3,6+o.sh+o.k*3],[sx*1.8,bc+7+o.k*2,9+o.sh+o.k*3]],w:[2,.8],col:hx(0xe8e0c8)});for(let e=0;e<3;e++)E({x:sx*(1.4+e*.8),y:bc-1.4-e*.5,z:8+o.sh+o.k*3,rx:.9,ry:.9,rz:.7,col:hx(0xff3030),bias:1})}}});
reg('cobra',{name:'Serpente de Midgard',fam:'Rastejantes',w:80,h:60,gy:52,build:(E,S,o)=>{const c=hx(0x3a7a4a),c2=hx(0xc8b040);const g=o.g;const N=14;const pts=[];
  for(let i=0;i<N;i++){const u=i/(N-1);const a=u*TAU*1.4+o.t*(o.ph?5:1.2);pts.push([Math.sin(a)*(7-u*2)*(1-u*.2),g-3-(u<.35?u*30:10.5-(u-.35)*14)*(u<.35?1:1)+0,-8+u*14+o.sh+(u<.35?o.k*5:0)])}
  // corpo enrolado: base no chão, pescoço erguido
  const body=[];for(let i=0;i<10;i++){const u=i/9;body.push([Math.sin(u*TAU*1.6+o.t*(o.ph?6:1))*(9-u*4),g-3-Math.sin(u*Math.PI)*2,-12+u*16+o.sh])}
  S({pts:body,w:[5.4,6.4],col:t=>Math.sin(t*34)>.2?c:c2});
  const neck=[[body[9][0],g-4,body[9][2]],[body[9][0]*.5,g-14,body[9][2]+3+o.k*4],[0,g-24-o.bob,body[9][2]+4+o.k*8]];
  S({pts:neck,w:[6,5],col:t=>Math.sin(t*24)>.1?c:c2});
  const hx0=neck[2];E({x:0,y:hx0[1]-2,z:hx0[2]+1,rx:6.4,ry:2,rz:2.4,col:c,tex:(mx,my,mz)=>mz>0&&my>0?c2:0});E({x:0,y:hx0[1]+.6,z:hx0[2]+3,rx:3.4,ry:2.6,rz:4.4,col:c});
  for(const sx of[-1,1])E({x:sx*1.8,y:hx0[1],z:hx0[2]+5.6,rx:.9,ry:.9,rz:.6,col:hx(0xffe040),bias:1});
  S({pts:[[0,hx0[1]+2,hx0[2]+6.6],[0,hx0[1]+2.4,hx0[2]+10+Math.sin(o.t*14)*1.2]],w:[.9,.7],col:hx(0xe03060)});if(o.k>.3)for(const sx of[-1,1])S({pts:[[sx*1.2,hx0[1]+2,hx0[2]+6],[sx*1.2,hx0[1]+5,hx0[2]+6.4]],w:[1.2,.5],col:hx(0xffffff)})}});
reg('espectro',{name:'Espectro Gélido',fam:'Espíritos',w:64,h:80,gy:70,build:(E,S,o)=>{const bob=Math.sin(o.t*2.2)*2+o.bob;const y0=o.g-22-bob;const c=hx(0x5a7ad8),c2=hx(0x9ab8ff);
  S({pts:[[0,y0-10,o.sh],[Math.sin(o.t*2)*1.6,y0+4,o.sh-1],[Math.sin(o.t*2+1)*3,o.g-1,o.sh-3]],w:[16,3],col:t=>t>.85?null:(Math.sin(t*20+o.t*4)>.3?c:c2),bias:.2});
  for(let i=0;i<4;i++){const x=-8+i*5.4;S({pts:[[x,y0+2,o.sh],[x+Math.sin(o.t*2+i)*2,y0+12,o.sh-2],[x+Math.sin(o.t*3+i)*3,y0+20+(i%2)*6,o.sh-3]],w:[3.6,.8],col:c})}
  E({x:0,y:y0-12,z:o.sh+1,rx:6.6,ry:6.6,rz:6,col:hx(0xe8f0ff),tex:(mx,my,mz)=>{const az=Math.atan2(mx,mz),el=Math.asin(clamp(my,-1,1));if(mz>0&&((Math.abs(az-.42)<.16||Math.abs(az+.42)<.16)&&el>-.1&&el<.3))return hx(0x14102a);if(mz>0&&Math.abs(az)<.12&&el>.35&&el<.45)return hx(0x2a2a50);if(mz>0&&Math.abs(az)<.3&&el>.55&&el<.7)return hx(0x2a2a50);return 0}});
  for(const sx of[-1,1])E({x:sx*2.6,y:y0-12.4,z:o.sh+5.4,rx:1.1,ry:1.3,rz:.6,col:hx(0x58f0ff),bias:1});
  E({x:0,y:y0-17,z:o.sh,rx:7.8,ry:3,rz:7,col:c,tex:(mx,my,mz)=>mz>0.3&&my>.2?null:0});
  for(const sx of[-1,1]){const a=sx>0?o.k:0;S({pts:[[sx*7,y0-6,o.sh],[sx*13,y0-3-a*4,o.sh+2+a*8],[sx*14,y0+3,o.sh+1+a*10]],w:[3.4,1],col:c2})}
  for(let i=0;i<5;i++){const u=(o.t*.6+i*.2)%1;E({x:Math.sin(i*4+o.t)*14,y:o.g-u*50,z:Math.cos(i*3)*5,rx:1,ry:1,rz:1,col:hx(0x9ae8ff),bias:1})}}});
reg('golem',{name:'Golem de Gelo',fam:'Niflheim',w:96,h:100,gy:92,build:(E,S,o)=>{const ic=hx(0x7ac8f0),ic2=hx(0xc8f0ff),dkc=hx(0x3a78b0);const b=o.g;
  const T=(a,b2)=>(mx,my,mz)=>Math.sin(mx*a+my*b2+mz*5)>.75?ic2:(Math.sin(mx*9-my*7)<-.8?dkc:0);
  for(const sx of[-1,1]){const ph=o.ph+(sx>0?Math.PI:0),sw=Math.sin(ph)*5*(o.ph?1:0),lf=Math.max(0,Math.cos(ph))*3*(o.ph?1:0);E({x:sx*7,y:b-12-lf,z:sw+o.sh,rx:6.4,ry:12,rz:6.4,p:3.4,col:ic,tex:T(10,6)});E({x:sx*7,y:b-2-lf,z:sw+2+o.sh,rx:7,ry:2.6,rz:8,p:3,col:dkc})}
  E({x:0,y:b-34-o.bob,z:o.sh+o.k*3,rx:15,ry:14,rz:10,p:4.4,col:ic,tex:(mx,my,mz)=>{if(mz>.5&&Math.hypot(mx,my+.1)<.3)return hx(0xffffff);return T(8,5)(mx,my,mz)}});
  E({x:0,y:b-34-o.bob,z:o.sh+o.k*3+6,rx:4.4,ry:5,rz:3,col:hx(0xb8ffff),bias:1,tex:(mx,my,mz)=>mz>.2?0:null});
  E({x:0,y:b-52-o.bob,z:o.sh+o.k*5,rx:7,ry:6.6,rz:6.2,p:4.4,col:ic2,tex:(mx,my,mz)=>{const az=Math.atan2(mx,mz),el=Math.asin(clamp(my,-1,1));if(mz>0&&Math.abs(Math.abs(az)-.5)<.2&&Math.abs(el)<.12)return hx(0x2a58ff);return 0}});
  for(let i=0;i<4;i++)S({pts:[[(i-1.5)*3.2,b-56-o.bob,o.sh],[(i-1.5)*4,b-62-o.bob-(i%2)*3,o.sh-1]],w:[3,.8],col:ic2});
  for(const sx of[-1,1]){const a=sx>0?o.k:0;E({x:sx*20,y:b-30-a*8,z:o.sh+a*14,rx:6.2,ry:6,rz:5.6,p:5,col:ic,tex:T(9,7)});E({x:sx*23,y:b-14-a*14,z:o.sh+a*20,rx:5.2,ry:6,rz:4.8,p:5,col:ic,tex:T(8,8)});S({pts:[[sx*18,b-38,o.sh],[sx*21,b-28,o.sh+a*7],[sx*23,b-18-a*10,o.sh+a*13]],w:[7,5],col:ic})}}});
reg('imp',{name:'Diabrete de Muspelheim',fam:'Muspelheim',w:64,h:64,gy:56,build:(E,S,o)=>{const c=hx(0xc8321e),c2=hx(0xff7a2a);const fl=o.ph?Math.sin(o.t*14):Math.sin(o.t*5);const r=biped(E,S,o,{sc:.8,legL:8,legW:2.6,th:12,hw:5,col:c,legCol:hx(0x8a2216),armCol:c,arm:11,armW:2.2,hrx:5.6,hrz:5,hh:5,hcol:c,boot:hx(0x4a1a12),hunch:1,tex:fur(c,c2)});
  const s=.8;for(const sx of[-1,1]){S({pts:[[sx*4*s,r.hy-4,r.hz],[sx*7*s,r.hy-9,r.hz],[sx*6*s,r.hy-14,r.hz]],w:[3,.8],col:hx(0x2a1410)});E({x:sx*2.4*s,y:r.hy+.4,z:r.hz+4.6*s,rx:1.3,ry:1.1,rz:.8,col:hx(0xffe040),bias:1});
   S({pts:[[sx*4,r.bc-5,-3+o.sh],[sx*13,r.bc-12+fl*3,-6+o.sh],[sx*21,r.bc-8+fl*5,-8+o.sh]],w:[5,1],col:hx(0x5a1a2a)});S({pts:[[sx*13,r.bc-12+fl*3,-6+o.sh],[sx*15,r.bc-2,-7+o.sh]],w:[3,1],col:hx(0x5a1a2a)})}
  E({x:0,y:r.hy+3.2,z:r.hz+4.4*s,rx:2.6,ry:.9,rz:1,col:hx(0x2a0a0a)});
  S({pts:[[0,r.bc+4,-3+o.sh],[0,r.bc+10,-9+o.sh],[0,r.bc+4+fl,-14+o.sh]],w:[2.4,1],col:c});
  for(let i=0;i<5;i++){const u=(o.t*1.5+i*.2)%1;E({x:Math.sin(i*3+o.t*3)*2,y:r.bc+4-u*10,z:-14+o.sh-u*2,rx:1.6*(1-u),ry:2*(1-u),rz:1,col:u<.4?hx(0xffd040):hx(0xff6a20),bias:1})}
  const A=r.arms[1];if(A)for(let i=0;i<3;i++){const u=(o.t*2+i*.33)%1;E({x:A.h[0]+Math.sin(i*5)*1.2,y:A.h[1]-1-u*6,z:A.h[2],rx:1.6*(1-u*.6),ry:2.2*(1-u*.6),rz:1.2,col:u<.5?hx(0xffd040):hx(0xff6a20),bias:1})}}});
reg('corvo',{name:'Corvo de Odin',fam:'Criaturas ancestrais',w:84,h:70,gy:60,build:(E,S,o)=>{const st=o.st||0;const c=hx(0x1e1a2c),c2=hx([0x4a4a8a,0x4a7aca,0xc8a038,0xffe8a0][st]);const fl=Math.sin(o.t*(o.ph||o.k>0?16:5));const hov=o.g-22-Math.sin(o.t*2)*2;const y0=hov+(o.k>0?-o.k*4:0);
  E({x:0,y:y0,z:o.sh,rx:5.6,ry:6.4,rz:9,col:c,tex:fur(c,c2,2)});E({x:0,y:y0-4,z:o.sh+8+o.k*4,rx:4,ry:4,rz:4,col:c,tex:fur(c,c2)});
  S({pts:[[0,y0-4.4,o.sh+11+o.k*4],[0,y0-3,o.sh+15+o.k*5]],w:[3.6,1],col:hx(0xe0a838)});
  E({x:2.8,y:y0-5.4,z:o.sh+10+o.k*4,rx:1,ry:1,rz:.8,col:hx([0xff4030,0x40c0ff,0xffd040,0xffffff][st]),bias:1});E({x:-2.8,y:y0-5.4,z:o.sh+10+o.k*4,rx:1.4,ry:1.4,rz:.8,col:hx(0x14101a)});
  for(const sx of[-1,1])for(let i=0;i<5;i++){const a=fl*.8;S({pts:[[sx*3,y0-3,o.sh+2],[sx*(10+i*3),y0-10-i*1.6-a*8,o.sh+1-i],[sx*(16+i*4),y0-6-i*3-a*14,o.sh-i*1.6]],w:[4.4,1.2],col:i%2?c:hx(0x2c2a44)})}
  S({pts:[[0,y0+3,o.sh-7],[0,y0+9,o.sh-14],[0,y0+14,o.sh-17]],w:[7,3],col:c});
  for(const sx of[-1,1])S({pts:[[sx*2,y0+6,o.sh],[sx*2,y0+11,o.sh+2+(o.k>0?2:0)],[sx*2.4,y0+13,o.sh+3]],w:[1.4,1],col:hx(0xe0a838)});
  for(let i=0;i<4;i++){const u=(o.t*.8+i*.25)%1;E({x:Math.sin(i*5)*12,y:o.g-u*20,z:-5,rx:.9,ry:.9,rz:.9,col:hx(0x9a8aff),bias:1})}}});
reg('gosma',{name:'Gosma Venenosa',fam:'Criaturas ancestrais',w:56,h:48,gy:40,build:(E,S,o)=>{const sq=1+Math.sin(o.t*3.2)*.06+o.k*.22;const c=hx(0x7ac83a),c2=hx(0xc8f070);
  E({x:0,y:o.g-9*(1/sq),z:o.sh,rx:13*sq,ry:9/sq,rz:11*sq,p:3.4,col:c,tex:(mx,my,mz)=>{const az=Math.atan2(mx,mz),el=Math.asin(clamp(my,-1,1));if(mz>0&&((Math.abs(az-.4)<.14||Math.abs(az+.4)<.14)&&el>-.2&&el<.2))return hx(0x14201a);if(mz>0&&Math.abs(az)<.25&&el>.35&&el<.42)return hx(0x2a4a1a);if(my<-.5&&Math.abs(mx+.3)<.3&&Math.abs(my+.7)<.2)return c2;return (Math.sin(mx*15+my*11)>.8)?c2:0}});
  E({x:-4,y:o.g-11,z:o.sh+1,rx:3.2,ry:3.6,rz:2,col:hx(0xe8e0c8),tex:(mx,my,mz)=>mz>.3&&my<0&&Math.abs(mx)<.5?hx(0x2a2a1a):0,bias:.1});
  for(let i=0;i<4;i++){const u=(o.t*.5+i*.25)%1;E({x:Math.sin(i*4+1)*8,y:o.g-4-u*12,z:o.sh+3,rx:1.4*(1-u*.5),ry:1.4*(1-u*.5),rz:1,col:hx(0xd8ff90),bias:.8})}}});
reg('salamandra',{name:'Salamandra de Lava',fam:'Muspelheim',w:84,h:60,gy:52,build:(E,S,o)=>{const r=quad(E,S,o,{L:32,H:9,W:5.6,legL:3.4,legW:2.6,col:hx(0x4a2a28),col2:hx(0xff7a2a),stride:4,lift:1.6,hw:4.6,hh:3.4,hl:5,snout:hx(0x6a3a30),eye:hx(0xffe040),ears:0,tail:1,fangs:1,tex:(mx,my,mz)=>{const k=Math.sin(mx*9+mz*13)+Math.sin(my*11+mz*7);return Math.abs(k)<.16?hx(0xff8a30):(Math.sin(mx*20+mz*20)>.8?hx(0x6a3a30):0)}});
  for(let i=0;i<5;i++)S({pts:[[0,r.bc-4.6,-10+i*5+o.sh],[0,r.bc-8-(i%2)*2,-11+i*5+o.sh]],w:[3,.8],col:hx(0x2a1414)});
  for(let i=0;i<4;i++){const u=(o.t*1.2+i*.25)%1;E({x:Math.sin(i*5)*3,y:r.bc-5-u*10,z:-6+i*4+o.sh,rx:1.2*(1-u),ry:1.6*(1-u),rz:1,col:hx(0xffb030),bias:1})}}});

 const SHAPES={wolf:['lobo',.5,1.9],frostwolf:['lobo',.7,1.9],hati:['warg',.35,2],boar:['javali',.5,1.65],yeti:['troll',.8,1.36],blob:['gosma',.85,1.9],goblin:['goblin',.3,2],draugr:['draugr',.3,1.74],cinder:['imp',.55,1.7],automaton:['golem',.8,1.2],sylvan:['troll',.75,1.28],prism:['golem',.85,1.1],sentinel:['golem',.7,1.2],voidling:['espectro',.85,1.1],jotun:['troll',.5,1.5],grifo:['corvo',.35,1.8],corvo:['corvo',0,1.6]};
 const SC={};
 const DIRS={down:0,dq:1,side:2,uq:3,up:4};
 const lumOf=(c)=>(c[0]+c[1]+c[2])/765;
 function mkTint(rgb,k){const tl=lumOf(rgb)||.5;const f=(c)=>{if(!Array.isArray(c))return c;const s=lumOf(c)/tl;const t=[Math.min(255,rgb[0]*s),Math.min(255,rgb[1]*s),Math.min(255,rgb[2]*s)];return mix(c,t,k)};return f}
 function draw(spec,dirIdx,anim,t,opt){
  const S0=opt.S,w=Math.ceil(spec.w*S0),h=Math.ceil(spec.h*S0),gy=Math.round(spec.gy*S0);const K=Ctx(dirIdx*Math.PI/4);const I=new Img(w,h);
  const o=mpose(anim,t);o.g=spec.gy;o.t=t;o.st=opt.st||0;const out=[];
  const tf=opt.tint;
  const E_=q=>{if(q.p===undefined)q.p=3.2;if(tf&&!q.bias){q.col=tf(q.col);if(q.tex){const f0=q.tex;q.tex=(a,b,c,d,e,g)=>{const r=f0(a,b,c,d,e,g);return Array.isArray(r)?tf(r):r}}}out.push(['e',q])};
  const S_=q=>{if(tf&&!q.bias){if(typeof q.col==='function'){const f0=q.col;q.col=(a,b)=>{const r=f0(a,b);return Array.isArray(r)?tf(r):r}}else q.col=tf(q.col)}out.push(['s',q])};
  spec.build(E_,S_,o);
  const SS=S0,tr=(p)=>[p[0]*SS+0,(p[1]-spec.gy)*SS+gy,p[2]*SS];
  const sr=Math.min(24,spec.w*.2)*S0;for(let y=-3;y<=3;y++)for(let x=-sr;x<=sr;x++)if((x/sr)**2+(y/3)**2<=1)put(I,Math.round(w/2+x),gy+y,-1e8,[0,0,0],80);
  for(const [k2,q] of out){if(k2==='e'){q.x*=SS;q.z*=SS;q.rx*=SS;q.ry*=SS;q.rz*=SS;q.y=(q.y-spec.gy)*SS+gy;ellipsoid(I,K,q)}else{q.pts=q.pts.map(tr);q.w=Array.isArray(q.w)?q.w.map(v=>v*SS):q.w*SS;strip(I,K,q)}}
  outline(I,200);
  return {d:I.d,w,h,gy};
 }
 const CACHE=new Map();
 function mon(f,dir,frame,lvl,def,extra){
  const m=SHAPES[f];if(!m)return null;const spec=MON[m[0]];if(!spec)return null;
  const di=DIRS[dir]??0;let anim=0,t=.3;
  if(lvl>0){anim=2;t=({1:.42,2:.2,3:.44}[Math.min(3,lvl)])/1.4}else if(frame>=0){anim=1;t=frame/8*TAU/9}
  const st=(extra&&extra.st)||0,col=(def&&def.color)||null;
  const key=f+':'+(def&&def.id||'')+':'+dir+':'+frame+':'+lvl+':'+st;let r=CACHE.get(key);if(r)return r;
  const rgb=col!=null?[(col>>16)&255,(col>>8)&255,col&255]:null;
  const S0=(extra&&extra.S)||m[2]||2.2,KS=.88;
  const img=draw(spec,di,anim,t,{S:S0,st,tint:rgb&&m[1]>0?mkTint(rgb,m[1]):null});
  const cv=document.createElement('canvas');cv.width=img.w;cv.height=img.h;cv.getContext('2d').putImageData(new ImageData(img.d,img.w,img.h),0,0);
  r={cv,ax:img.w/2*KS,ay:img.gy*KS,k:KS};CACHE.set(key,r);return r;
 }
 return {mon,SC,SHAPES,MON};
})();
