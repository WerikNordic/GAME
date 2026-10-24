import fs from 'fs';
const head=fs.readFileSync('src/head.html','utf8');
const css=fs.readFileSync('src/style.css','utf8');
const js=fs.readFileSync('src/game.js','utf8').replace(/<\/script>/g,'<\\/script>');
fs.mkdirSync('dist',{recursive:true});
fs.writeFileSync('dist/eldvar.html',head+'<style>'+css+'</style></head>\n  <body>\n    <div id="root"></div>\n    <noscript>Eldvar precisa de JavaScript para funcionar.</noscript>\n    \n  <script>'+js+'</script></body>\n</html>\n');
console.log('ok',fs.statSync('dist/eldvar.html').size);
