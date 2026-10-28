import fs from 'fs';
import {chromium} from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();const p=await b.newPage();
await p.goto('file:///home/claude/eldvar2/dist/eldvar.html?debug');await p.waitForTimeout(800);
const d=await p.evaluate(()=>window.__defs().map(m=>({id:m.id,level:m.level,hp:m.hp,atk:m.atk,def:m.def,exp:m.exp,boss:!!m.boss,w:m.windupMs,r:m.recoverMs})));
fs.writeFileSync('defs.json',JSON.stringify(d));process.exit(0)
