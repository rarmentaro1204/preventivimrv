# Preventivi MRV

Preventivatore di MRV Consulting pubblicato su Netlify
(https://preventivomrv.netlify.app/).

- `index.html`: l'applicazione (pagina unica). Genera il PDF del preventivo,
  il piano dei pagamenti e i documenti allegati (NDA e Contratto in Word).
- `build.js` + `netlify.toml`: a ogni pubblicazione Netlify copia la pagina
  in `dist/` inserendo il token del backend Google Sheets.

## Configurazione Netlify (una volta sola)

1. Site configuration → Build & deploy → collega questo repository,
   branch `main` (comando e cartella vengono letti da `netlify.toml`).
2. Site configuration → Environment variables → **Add a variable**:
   - Key: `SHEETS_API_TOKEN`
   - Value: lo stesso token scritto in `API_TOKEN` nello script Apps Script
     del foglio Google.
3. Deploys → Trigger deploy → Deploy site.

Il token non va mai scritto nei file di questo repository: è pubblico.
Lo script del backend (Code.gs) e le istruzioni sono nel repository `mrv`,
cartella `scripts/google-apps-script/`.
