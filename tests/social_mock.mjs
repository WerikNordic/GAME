import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const e=[];p.on('pageerror',x=>e.push(x.message));
const calls=[];
await p.route('**/rest/v1/rpc/*',async r=>{const fn=r.request().url().split('/').pop();const body=r.request().postDataJSON?.()||{};calls.push(fn+(body.p_cmd?':'+body.p_cmd:'')+(body.p_chan?':'+body.p_chan:''));
 const R={mp_sync:{ok:true,others:[{id:'x:1',name:'Beta',line:'cacador',tier:1,level:12,sx:'',x:100,y:100,facing:0,moving:false,afk:false}],msgs:[{id:1,f:'Beta',t:null,b:'oi guilda',c:'g'}],last:1,ch:2},
 social_state:{ok:true,guild:{name:'Filhos',role:'leader',members:[{n:'Tst',role:'leader',on:true,lv:1,map:'m'},{n:'Beta',role:'member',on:true,lv:12,map:'m'}]},party:{name:'Caca',leader:true,members:[{n:'Tst',on:true,lv:1,map:'m'},{n:'Beta',on:true,lv:12,map:'m'}]},ginv:null,pinv:{from:'Beta',name:'Outro'}},
 guild_cmd:{ok:true,msg:'Guilda fundada!'},party_cmd:{ok:true,msg:'Grupo criado.'},mp_say:{ok:true},mp_online:{n:3,list:[{name:'Beta',level:12},{name:'Tst',level:1}]},mp_report:{ok:true},claim_nick:{ok:true}}[fn]||{ok:true};
 await r.fulfill({status:200,contentType:'application/json',body:JSON.stringify(R)})});
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(700);
await p.getByText('Novo jogo').click();await p.locator('input').first().fill('Tst');await p.getByRole('button',{name:'OK'}).click();await p.waitForTimeout(4500);
const j=()=>window.__game().j;
for(const c of ['/guilda criar Filhos','/grupo criar Caca','/guilda','/g ola guilda','/p ola grupo','/quem','/denunciar Beta spam total','/grupo aceitar']){await p.evaluate(c=>window.__game().j.sendChat(c),c);await p.waitForTimeout(500)}
await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>window.__game().j.log.slice(-18).map(l=>l.kind+'| '+l.text).join('\n')));
console.log(calls.filter((c,i)=>calls.indexOf(c)===i).join(', '));console.log(e);process.exit(0)
