// gera public/version.json a partir do CHANGELOG (rodar depois do build do jogo)
import fs from 'fs';
const cl = fs.readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const secs = [...cl.matchAll(/^## v(\d+)\s*\n([\s\S]*?)(?=^## v|\s*$(?![\s\S]))/gm)];
const last = secs[secs.length - 1];
const ver = last ? Number(last[1]) : 0;
const notes = secs.slice(-3).reverse().map((m) => `v${m[1]}\n${m[2].trim()}`).join('\n\n');
fs.mkdirSync(new URL('../public/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../public/version.json', import.meta.url), JSON.stringify({ version: ver, date: new Date().toISOString(), notes }, null, 1));
console.log('version.json v' + ver);
