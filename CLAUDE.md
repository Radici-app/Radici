# Radici – note per Claude

App di prenotazione per saloni. Lo stesso sito (`index.html`, `app.js`, `seed.js`) gira nel browser e, racchiuso con Capacitor, nelle app Android (`app-android/android`) e iPhone (`app-android/ios`).
Il titolare non è uno sviluppatore: spiegagli tutto in italiano semplice, passo per passo.

## Come si lavora
- Si sviluppa su un ramo e poi si unisce in `main`. Ogni push su `main` fa partire "App Android" (GitHub Actions), che compila l'APK per le Releases e l'AAB per Google Play.
- Il numero di versione è il numero della compilazione (`GITHUB_RUN_NUMBER`): cresce da solo e non va toccato.
- Google Play si gestisce dal workflow "Google Play" (`stato`, `carica-test-interno`, `promuovi-produzione`). Passi dettagliati: `store/google-play/AGGIORNARE-L-APP.md`.
- Qui non si può compilare né provare l'app Android: ogni modifica nativa va provata dal titolare nel test interno prima della produzione.

## Notifiche e promemoria
- **Promemoria locali (attivi oggi, gratis):** finché le notifiche push del server sono spente (`locAttive()` in `app.js`), l'app programma da sola i promemoria sul telefono con `@capacitor/local-notifications`. Usa gli orari, i testi e la fascia di silenzio del gestionale (dashboard → Notifiche push). Si riprogrammano in `sincLocaliOra()` a ogni apertura e dopo ogni prenotazione. Funzionano solo se il cliente ha "Notifiche: attive" nel Profilo.
- **Niente sveglie esatte:** `SCHEDULE_EXACT_ALARM` e `USE_EXACT_ALARM` sono tolti dal manifest (`tools:node="remove"`), così Google Play non chiede la dichiarazione per le sveglie esatte. Per questo in Impostazioni → "Sveglie e promemoria" l'interruttore di Radici è grigio: è normale.
- Ogni notifica locale deve avere `isExactNotification: false` e `allowWhileIdle: true`. Senza il primo, il plugin apre la schermata "Sveglie e promemoria" a ogni programmazione. Senza il secondo, il promemoria non suona con il telefono a riposo. I promemoria possono arrivare con qualche minuto di ritardo.
- **Notifiche push dal server:** sono pronte (cartella `functions/`, workflow "Notifiche Firebase") ma richiedono il piano Blaze. Quando il titolare accende "Invio notifiche attivo" nel gestionale, i promemoria locali si spengono da soli e li manda il server.

## Decisioni prese (da non rifare senza chiedere)
- **Avvisi R8 di Play Console** (percentuali di ottimizzazione basse, riduzione delle risorse non attiva): sono solo consigli e si lasciano così. Le regole larghe in `proguard-rules.pro` proteggono Capacitor, Firebase e i plugin, che vengono cercati per nome. Se un giorno si attiva `shrinkResources`, va protetta `@drawable/ic_notifica` con un `keep.xml`, perché è usata solo dal JavaScript.
- **Plug-in Android per Gradle 9:** si resta sulla 8.13 finché Capacitor non supporta ufficialmente la 9. Allora l'aggiornamento si fa in una release a parte, seguendo la guida di Capacitor.
- L'app va aggiornata almeno ogni 6 mesi.
