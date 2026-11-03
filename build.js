// Eseguito da Netlify a ogni pubblicazione: copia index.html in dist/ inserendo il token
// del backend Google Sheets letto dalla variabile d'ambiente SHEETS_API_TOKEN.
// Il token così non compare mai nel repository (che è pubblico). Il log non lo stampa mai.
const fs = require('fs');
const path = require('path');

const here = __dirname;
console.log('[build] node ' + process.version + ' · cartella ' + here);
console.log('[build] file presenti: ' + fs.readdirSync(here).join(', '));

const token = (process.env.SHEETS_API_TOKEN || '').trim();
console.log('[build] variabile SHEETS_API_TOKEN: ' + (token ? 'presente (' + token.length + ' caratteri)' : 'MANCANTE'));
if (!token) {
  console.error('ERRORE: manca la variabile SHEETS_API_TOKEN.');
  console.error('Netlify → Site configuration → Environment variables → Add a variable.');
  process.exit(1);
}

const src = path.join(here, 'index.html');
const html = fs.readFileSync(src, 'utf8');
const PLACEHOLDER = '__SHEETS_API_TOKEN__';
if (!html.includes(PLACEHOLDER)) {
  console.error('ERRORE: segnaposto ' + PLACEHOLDER + ' non trovato in index.html.');
  process.exit(1);
}

const safe = token.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const outDir = path.join(here, 'dist');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html.split(PLACEHOLDER).join(safe));
console.log('[build] dist/index.html pronto (' + html.length + ' byte).');
