// Copia l'app (cartella principale del repository) dentro www/: sito e app restano sempre uguali.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..'), dst = path.join(__dirname, 'www');
fs.rmSync(dst, { recursive: true, force: true }); fs.mkdirSync(dst, { recursive: true });
const FILE = ['index.html', 'app.js', 'seed.js', 'icone.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
for (const f of FILE) fs.copyFileSync(path.join(src, f), path.join(dst, f));
fs.writeFileSync(path.join(dst, 'versione.json'), JSON.stringify({ v: Number(process.env.GITHUB_RUN_NUMBER || 0) }));
console.log('App copiata in www/:', FILE.length, 'file');
