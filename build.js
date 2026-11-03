// Eseguito da Netlify a ogni pubblicazione: copia index.html in dist/ inserendo il token
// del backend Google Sheets letto dalla variabile d'ambiente SHEETS_API_TOKEN.
// Il token così non compare mai nel repository (che è pubblico).
const fs = require('fs');

const token = process.env.SHEETS_API_TOKEN;
if (!token) {
  console.error('ERRORE: manca la variabile SHEETS_API_TOKEN.');
  console.error('Netlify → Site configuration → Environment variables → Add a variable.');
  process.exit(1);
}

const html = fs.readFileSync('index.html', 'utf8');
const PLACEHOLDER = '__SHEETS_API_TOKEN__';
if (!html.includes(PLACEHOLDER)) {
  console.error('ERRORE: segnaposto ' + PLACEHOLDER + ' non trovato in index.html.');
  process.exit(1);
}

const safe = token.trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html.split(PLACEHOLDER).join(safe));
console.log('dist/index.html pronto (token inserito).');
