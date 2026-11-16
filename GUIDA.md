# Guida completa – Radici, Radix Salon e le app sugli store

Questa guida spiega **da zero** come è fatto tutto il sistema, cosa è già stato fatto, cosa resta da fare e come lavorare con Claude.
Ultimo aggiornamento: 16 novembre 2026.

---

## Indice
1. [Chi pubblica e con quali account](#1-chi-pubblica-e-con-quali-account)
2. [I pezzi del sistema (repository e siti)](#2-i-pezzi-del-sistema)
3. [Parole da conoscere](#3-parole-da-conoscere)
4. [Come lavorare con Claude](#4-come-lavorare-con-claude)
5. [Come GitHub compila le app](#5-come-github-compila-le-app)
6. [Google Play – tutto il percorso](#6-google-play)
7. [App Store (iPhone) – tutto il percorso](#7-app-store-iphone)
8. [Firebase – cosa c'è e cosa manca](#8-firebase)
9. [Notifiche push – il progetto](#9-notifiche-push)
10. [Sito Radix Salon (eurogestionradix.it)](#10-sito-radix-salon)
11. [Stato attuale: fatto / da fare](#11-stato-attuale)
12. [Regole d'oro e cose da non fare mai](#12-regole-doro)
13. [Problemi frequenti](#13-problemi-frequenti)

---

## 1. Chi pubblica e con quali account

| Cosa | Dato |
|---|---|
| Azienda | **Eurogestion S.A.S. di Di Fiore Rosa** – P.IVA 05812141215 – Via Argine 572, 80147 Napoli |
| Marchio della piattaforma | **Radix Salon** – https://eurogestionradix.it |
| Email aziendale | eurogestionsas2009@libero.it (contatti), info@eurogestionradix.it (account di prova per i revisori) |
| D-U-N-S | già ottenuto (serve ad Apple e Google per pubblicare come azienda) |
| Google Play Console | account **Organizzazione**, nome sviluppatore oggi **"Master.app"** (da cambiare in Eurogestion/Radix Salon: Impostazioni → Account sviluppatore) |
| Apple Developer | **da fare**: iscrizione come **Organizzazione** (99 €/anno) |
| GitHub | organizzazione **Radici-app** (app Radici e gestionale) e account **salvatorefiumesas-bit** (sito Radix Salon, Nails & Makeup e altri) |
| Firebase | progetto **radici-app** (Radici) · progetto **nailsendmakeup** (Nails & Makeup, più avanti) |

---

## 2. I pezzi del sistema

| Pezzo | Repository GitHub | Indirizzo pubblico | A cosa serve |
|---|---|---|---|
| **App clienti Radici** | `Radici-app/Radici` | https://radici-app.github.io/Radici/ | prenotazioni dei clienti: sito + app Android + app iPhone |
| **Gestionale** | `Radici-app/Radici-app` | (pagina del gestionale) | il salone gestisce agenda, clienti, servizi, avvisi, Fidelity, galleria |
| **Sito Radix Salon** | `salvatorefiumesas-bit/Radixsalon-sito` | https://eurogestionradix.it | vetrina commerciale della piattaforma (prezzi, demo, contatti) |
| App Nails & Makeup | `salvatorefiumesas-bit/Nailendmakeup` + `Nailsendmakeup-gestione` | – | stesso modello di Radici, per un altro salone (più avanti) |

### Dentro il repository Radici
| File / cartella | Cosa contiene |
|---|---|
| `index.html`, `app.js`, `icone.js`, `seed.js` | **il cuore dell'app**: schermate e funzioni. Valgono per sito, Android e iPhone insieme |
| `privacy.html`, `termini.html`, `cancella-account.html` | pagine pubbliche richieste dagli store |
| `app-android/android` | il "guscio" Android |
| `app-android/ios` | il "guscio" iPhone (progetto Xcode) |
| `app-android/firma-app.p12` | chiave di firma Android, cifrata. La password è nel segreto `RADICI_KEY_PASSWORD` |
| `.github/workflows/android.yml` | la "fabbrica" Android (in Actions: **App Android**) |
| `.github/workflows/ios.yml` | la "fabbrica" iPhone (in Actions: **App iPhone**) |
| `store/` | testi, icone, screenshot e istruzioni per gli store |
| `store/google-play/AGGIORNARE-L-APP.md` | **passo passo per ogni aggiornamento su Google Play** |
| `store/app-store/PASSI-QUANDO-APPLE-E-ATTIVO.md` | passo passo iPhone quando Apple è attivo |

> Un'unica app, tre modi di usarla: **sito** (anche da iPhone), **Android**, **iPhone**. Si modifica una volta sola.

---

## 3. Parole da conoscere

**GitHub**
- **Repository (repo)**: la cartella online di un progetto, con tutta la storia delle modifiche.
- **main**: la versione **ufficiale**. Quello che è su main va online.
- **Ramo (branch)**: una "brutta copia" separata, dove Claude lavora senza toccare main (es. `ccr-23bcca9e-qar37d`).
- **Commit**: un salvataggio delle modifiche, con una frase che le descrive.
- **Push**: caricare i salvataggi su GitHub.
- **"Confronta e richiedi" / Pull request**: proposta di unire un ramo a main. **Non serve premerlo**: quando dici "pubblica", Claude unisce lui.
- **Actions**: le "fabbriche" che compilano le app da sole.
- **Artifact**: i file prodotti da una compilazione (es. l'AAB per Google Play), da scaricare in fondo alla pagina della compilazione.
- **Segreti (Secrets)**: password e chiavi salvate in GitHub. Nessuno può rileggerle, le usano solo le Actions.
- **GitHub Pages**: il servizio che pubblica i siti (Radici e Radix Salon) direttamente dal repository.

**App**
- **APK**: il file installabile Android "fai da te" (versione GitHub, si aggiorna da sola).
- **AAB**: il file Android per Google Play (`Radici-store.aab`).
- **Capacitor**: lo strumento che trasforma il sito in app Android/iPhone.
- **Bundle ID / Package**: il nome tecnico dell'app, uguale ovunque: `it.radiciapp.prenota`.
- **versionCode / numero di build**: numero che deve crescere a ogni versione. Lo mette GitHub da solo (= numero della compilazione).
- **R8 / offuscamento**: ottimizzazione del codice Android chiesta da Google. **Già attiva** dalla versione 1.33.

**Store**
- **Test interno** (Google) / **TestFlight** (Apple): versione di prova solo per i tester, prima dei clienti.
- **Produzione** (Google) / **App Store** (Apple): la versione per tutti.
- **Revisione**: il controllo di Google/Apple prima della pubblicazione.
- **Promuovi**: copiare una versione dal Test interno alla Produzione senza ricaricare il file.
- **Implementazione completa / 100%**: l'aggiornamento arriva a tutti.

---

## 4. Come lavorare con Claude

### Dove
Su **claude.ai/code** (anche dall'app Claude sul telefono) si apre una sessione collegata al repository. Claude lavora in un computer "nel cloud" con una copia del repository.

### Come chiedere le cose
1. **Spiega cosa vuoi e dove** ("sul sito Radix Salon", "nell'app Radici", "nel gestionale"). Se non è chiaro, Claude chiede.
2. **Manda foto dello schermo** quando sei negli store, in Firebase o in GitHub: Claude ti dice dove toccare.
3. **Un passo alla volta**: fai il passo, manda la foto, poi il successivo.
4. Se serve un **altro repository** (es. il sito Radix Salon), Claude lo aggiunge alla sessione: quando compare la richiesta di permesso, **approvala**.

### Il flusso di lavoro (sempre uguale)
```
tu chiedi  →  Claude modifica sul RAMO di lavoro  →  ti mostra il risultato (foto)
          →  tu scrivi "pubblica"  →  Claude mette su MAIN  →  va online
```
- Claude **non pubblica su main senza il tuo "pubblica"**.
- Le modifiche ai file del **sito Radici** (`index.html`, `app.js`, …) su main fanno partire **anche le compilazioni delle app** (vedi capitolo 5).
- Le modifiche alla **documentazione** (come questa guida) non compilano niente.

### Cosa NON mandare mai in chat
Password, chiavi `.p8`, file `.p12`, codici dei segreti. Vanno **solo** nei Segreti di GitHub (o nelle console di Google/Apple/Firebase). A Claude basta sapere che ci sono.

### Cosa Claude non può fare
- Entrare nei tuoi account Google Play, Apple, Firebase, Aruba: lì operi tu, Claude ti guida.
- Aprire alcuni siti esterni (es. eurogestionradix.it dalla sessione): in quel caso ti chiede di controllare dal telefono.
- Pagare, firmare contratti, accettare condizioni al posto tuo.

---

## 5. Come GitHub compila le app

### App Android ("App Android" in Actions)
**Quando parte**: da sola, ogni volta che su un ramo cambiano i file dell'app (`index.html`, `app.js`, `seed.js`, `icone.js`, `manifest.webmanifest`, immagini `.png`, cartella `app-android/`). Si può anche avviare a mano: Actions → App Android → **Run workflow**.

**Cosa produce** (ogni compilazione ha un numero: es. compilazione 33 → versione **1.33**):
| File | Per chi | Dove si trova |
|---|---|---|
| `Radici.apk` | chi installa l'app da GitHub | **solo da main**: pubblicato in **Releases**. Le app GitHub già installate **si aggiornano da sole** |
| `Radici-store.aab` | Google Play | Artifact **Radici-aab-per-Google-Play** (si tiene 90 giorni) |
| `mapping.txt` | Google Play (lettura dei crash) | Artifact **Radici-mapping-per-Google-Play** (già incluso nell'AAB, non serve caricarlo) |

> ⚠️ Dato che l'APK di GitHub si aggiorna da solo, **ogni "pubblica" su main che tocca l'app arriva subito a chi usa l'APK**. Per questo prima si prova sul ramo.

### App iPhone ("App iPhone" in Actions)
**Quando parte**: stessi file della Android.
- **Oggi**: compila **senza firma**, solo per verificare che il progetto funzioni. Non si installa.
- **Quando ci sono i 4 segreti Apple**: ogni compilazione da **main** viene **firmata e caricata su TestFlight** da sola (numero di build = numero della compilazione). Non serve un Mac.

### Come controllare una compilazione
GitHub → Radici → **Actions** → clic sulla compilazione:
- ✅ verde = riuscita · ❌ rossa = errore (manda la foto a Claude) · 🟡 gialla = in corso (5–15 minuti).
- In fondo alla pagina: **Artifacts** (i file da scaricare) e il riepilogo (versione, impronte di firma).

### I segreti del repository Radici
GitHub → Radici → **Settings** → **Segreti e variabili** → **Azioni**
(diretto: https://github.com/Radici-app/Radici/settings/secrets/actions)

| Segreto | Stato | A cosa serve |
|---|---|---|
| `RADICI_KEY_PASSWORD` | ✅ presente – **non toccarlo** | firma Android. Se si perde, l'APK GitHub non si aggiorna più |
| `APPLE_TEAM_ID` | ⏳ da inserire | firma iPhone |
| `APPSTORE_API_KEY_ID` | ⏳ da inserire | caricamento su TestFlight |
| `APPSTORE_API_ISSUER_ID` | ⏳ da inserire | caricamento su TestFlight |
| `APPSTORE_API_KEY_P8` | ⏳ da inserire | caricamento su TestFlight |

Si inseriscono **una volta sola**: pulsante **Nuovo segreto del repository** → *Nome* (esatto, maiuscole e trattini bassi) → *Segreto* (il valore, senza spazi) → **Aggiungi segreto**. Esempio con valori finti:

| Nome | Esempio di valore |
|---|---|
| `APPLE_TEAM_ID` | `A1B2C3D4E5` (10 caratteri) |
| `APPSTORE_API_KEY_ID` | `XY12AB34CD` (10 caratteri) |
| `APPSTORE_API_ISSUER_ID` | `69a6de7f-1234-47e3-e053-5b8c7c11a4d1` |
| `APPSTORE_API_KEY_P8` | tutto il file `.p8`, righe `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----` comprese |

Dopo averli inseriti vedrai solo i **nomi** (mai i valori): una foto di quell'elenco si può mandare a Claude.

---

## 6. Google Play

### Già fatto ✅
1. Account sviluppatore **Organizzazione**, identità verificata, sito verificato in Search Console.
2. App creata: **Radici – Ambito Hair Studio** (`it.radiciapp.prenota`).
3. Firma dell'app gestita da Google ("Avanzata": firmata da Google Play, protezione automatica attiva).
4. Scheda dello store, contenuti dell'app (privacy, sicurezza dei dati, classificazione, pubblico, account di prova per il revisore).
5. SHA-1 e SHA-256 della firma Google Play aggiunti in Firebase (serve per "Accedi con Google").
6. **Test interno**: versione 31 (1.31) al 100%.
7. **Produzione**: versione 31 (1.31) inviata con "implementazione completa" il 16/11 alle 18:46 → **in revisione**. Paese: 1 (Italia). Pubblicazione gestita **disattivata** (appena approvata esce da sola).

### Da fare ⏳
1. **Aspettare l'approvazione** della produzione. È fatta quando nell'app *Play Console* → Release → **Produzione** compare **100% ✅** e la pagina iniziale dice **"Produzione: 1 app"**. Controllo: aprire in incognito https://play.google.com/store/apps/details?id=it.radiciapp.prenota
2. **Cambiare il nome sviluppatore** da "Master.app" a Eurogestion / Radix Salon.
3. **Aggiornamento 1.33** (con R8, toglie l'avviso "ottimizzazione del codice DEX", scadenza feb 2027): seguire `store/google-play/AGGIORNARE-L-APP.md`.

### Ogni aggiornamento, in breve
1. GitHub → Actions → App Android → ultima compilazione verde su main → scarica **Radici-aab-per-Google-Play** → dentro c'è `Radici-store.aab`.
2. Play Console → Test e rilascio → **Test interno** → Crea nuova release → carica → Salva e pubblica.
3. **Prova sul telefono**: apertura, accesso email e Google, prenotazione e annullamento, foto profilo.
4. Test interno → **Promuovi release → Produzione** → 100% → Salva → Panoramica della pubblicazione → **Invia modifiche per la revisione**.
5. **Aspetta**, senza premere "Rimuovi modifiche".

### Come leggere la Play Console senza confondersi
| Dove guardi | Cosa ti dice |
|---|---|
| App Play Console → **Release** | la verità: riga *Produzione* (clienti) e riga *Test interni* (tester) |
| Panoramica della pubblicazione | cosa è in revisione adesso |
| Attività di invio → "Pubblicata" | Google ha approvato **quell'invio**, che può riguardare solo scheda/impostazioni: **non** vuol dire per forza che l'app è dai clienti |
| Il tuo telefono | se sei tester vedi sempre "(accesso in anteprima interno)": per vedere come un cliente usa l'**incognito** o un altro account |

---

## 7. App Store (iPhone)

### Già pronto ✅
- Progetto iPhone in `app-android/ios`, compila su GitHub (build di verifica).
- App iOS registrata in Firebase, `GoogleService-Info.plist` nel progetto.
- Provider **Apple** abilitato in Firebase Authentication.
- Workflow pronto a firmare e caricare su TestFlight appena ci sono i segreti.
- Testi, privacy, note per il revisore, icona 1024 e screenshot iPhone 6.9" in `store/app-store/`.
- Login su iPhone: email+password, Google, **Accedi con Apple** (obbligatorio se c'è Google).

### Da fare, in ordine ⏳
**A. Iscrizione Apple Developer Program (Organizzazione)**
1. Controlla come è scritto il nome nel D-U-N-S: https://developer.apple.com/enroll/duns-lookup/ e usa **esattamente** quella forma.
2. Account Apple dedicato all'azienda, con **autenticazione a due fattori** (meglio un'email @eurogestionradix.it).
3. App **Apple Developer** sull'iPhone → Account → **Iscriviti ora** → **Organizzazione** → dati, D-U-N-S, sito `https://eurogestionradix.it` → accetta → paga 99 €/anno.
4. Apple verifica (2 giorni – 2 settimane), spesso **telefona**. Alla fine arriva l'email **"Welcome to the Apple Developer Program"**.

**B. Identificativo dell'app** – developer.apple.com → Certificates, Identifiers & Profiles → Identifiers → `+` → App IDs → App → Description `Radici`, Bundle ID esplicito `it.radiciapp.prenota`, spunta **Push Notifications** e **Sign in with Apple**. Annota il **Team ID** (Membership).

**C. Chiave APNs (notifiche)** – Keys → `+` → `Radici APNs` → spunta **Apple Push Notifications service** (e, se vuoi, anche **Sign in with Apple** sulla stessa chiave) → Register → **Download** del `.p8` (una volta sola! conservalo) → annota il **Key ID**.
Firebase → ⚙ Impostazioni progetto → **Cloud Messaging** → app iOS → **Chiave di autenticazione APNs** → carica `.p8`, Key ID, Team ID.

**D. Revoca Accedi con Apple** (richiesta da Apple quando un cliente cancella il profilo) – Firebase → Authentication → Metodo di accesso → Apple → Configurazione flusso codice: Team ID, Key ID, contenuto del `.p8` (chiave con *Sign in with Apple*). Poi Claude collega la revoca al tasto "Cancella profilo".

**E. App in App Store Connect** – appstoreconnect.apple.com → App → `+` → Nuova app: iOS · Nome `Radici – Ambito Hair Studio` · Italiano · Bundle ID `it.radiciapp.prenota` · SKU `radici-prenota` · Accesso completo. Dichiararsi **commerciante (trader)** per l'UE (indirizzo, telefono, email visibili: normale).

**F. Chiave API per GitHub e i 4 segreti** – App Store Connect → Utenti e accesso → **Integrazioni** → App Store Connect API → Chiavi del team → `+` → nome `GitHub`, accesso **Amministratore** → scarica `AuthKey_XXXX.p8` (una volta sola). Inserisci i 4 segreti (capitolo 5). Manda a Claude la foto dell'elenco dei nomi.

**G. Prima build e TestFlight** – Claude avvia Actions → App iPhone → Run workflow su main. Dopo 10–30 minuti la build compare in App Store Connect → **TestFlight**. Aggiungiti come tester interno, installa l'app **TestFlight** sull'iPhone e prova: Accedi con Apple, Google, email; prenotazione e annullamento; foto profilo; Cancella profilo (con un account diverso da quello del revisore).

**H. Scheda e invio** – compila scheda, etichette privacy e note per il revisore con `store/app-store/scheda-e-revisione.md` → seleziona la build → **Aggiungi alla revisione** → **Invia**. Revisione Apple: di solito 1–3 giorni.

**Aggiornamenti iPhone dopo la prima volta**: ogni "pubblica" su main che tocca l'app carica da sola una nuova build su TestFlight. Tu la provi e poi, in App Store Connect, crei una nuova versione → scegli la build → invii in revisione.

---

## 8. Firebase

Progetto **radici-app** – Authentication, Firestore (`saloni/radici/...`: prenotazioni, busy, clienti, rubrica, punti, avvisi, galleria), Cloud Messaging.

| Voce | Stato |
|---|---|
| App Android + SHA-1/SHA-256 della firma GitHub e di Google Play | ✅ |
| App iOS + `GoogleService-Info.plist` | ✅ |
| Authentication: email/password, Google | ✅ |
| Authentication: provider Apple abilitato | ✅ |
| Authentication: flusso codice Apple (revoca) | ⏳ dopo l'account Apple (7-D) |
| Cloud Messaging: chiave APNs | ⏳ dopo l'account Apple (7-C) |
| Piano **Blaze** con avviso di budget | ⏳ capitolo 9 |
| Cloud Functions per le notifiche | ⏳ capitolo 9 |

---

## 9. Notifiche push

L'app sa già ricevere le notifiche (canali "promemoria" e "salone") e salva i token dei dispositivi. Manca il **server** che le manda.

### Passi
1. **Piano Blaze** (tu): Firebase → in basso a sinistra **Esegui l'upgrade** → Blaze → collega un metodo di pagamento → **Imposta un avviso di budget** (es. 5 €). Per un salone il costo previsto è praticamente zero, ma Google richiede Blaze per le Cloud Functions.
2. **Cloud Functions** (Claude scrive il codice, si pubblicano da GitHub):
   - a) **promemoria** al cliente prima dell'appuntamento, ai tempi impostati nel gestionale → "Notifiche push" (predefiniti 24 ore e 1 ora), testo personalizzabile;
   - b) **comunicazioni del salone** e **avviso punti Fidelity**;
   - c) **avviso al titolare** di nuova prenotazione e di annullamento, anche con il gestionale chiuso (notifiche web nel gestionale: permesso del browser + service worker).
3. In `app.js`: `PROMEMORIA_ATTIVI = true` → "pubblica" → nuova versione Android (Play: capitolo 6) e iPhone (TestFlight → App Store).

---

## 10. Sito Radix Salon

- Repository `salvatorefiumesas-bit/Radixsalon-sito`, pubblicato con GitHub Pages su **https://eurogestionradix.it** (dominio da Aruba, file `CNAME`).
- Un'unica pagina: `index.html` (+ cartelle `img/` e `video/`).
- 16/11/2026: prezzi indicati **IVA esclusa** (500 € + IVA/anno, rate 41,67 € + IVA/mese o 250 € + IVA/semestre); aggiunti `sitemap.xml` e `robots.txt`.
- **Da fare (tu)**: Google Search Console → proprietà eurogestionradix.it → **Sitemap** → scrivi `sitemap.xml` → Invia → deve risultare "Riuscito".
- Dopo un "pubblica" il sito si aggiorna in 1–2 minuti (in GitHub → Actions compare "pages build and deployment"). Se vedi la versione vecchia, ricarica la pagina.

---

## 11. Stato attuale

| Area | Fatto | Da fare |
|---|---|---|
| Google Play | app, scheda, contenuti, test interno 1.31 | attendere approvazione produzione · nome sviluppatore · aggiornamento 1.33 |
| App Store | progetto pronto, Firebase iOS, materiale store | **iscrizione Apple** → passi B–H del capitolo 7 |
| Notifiche push | app pronta a riceverle | Blaze + Cloud Functions + `PROMEMORIA_ATTIVI = true` + aggiornamenti store |
| Ottimizzazione R8 | attiva su main dalla 1.33 | pubblicare la 1.33 su Play entro feb 2027 |
| Sito Radix Salon | prezzi IVA esclusa, sitemap | inviare la sitemap in Search Console |
| Nails & Makeup | – | stesso percorso di Radici, più avanti (progetto Firebase nailsendmakeup) |

---

## 12. Regole d'oro

1. **Prima il test, poi i clienti**: Test interno / TestFlight → prova → Produzione / App Store.
2. **Niente password o chiavi in chat.** Solo nei Segreti di GitHub o nelle console.
3. **Conserva i file che si scaricano una volta sola**: `.p8` di Apple (APNs e API), in una cartella sicura (non sul desktop, non in email).
4. **Non toccare** `RADICI_KEY_PASSWORD` né `app-android/firma-app.p12`.
5. **Non premere** "Rimuovi modifiche" in Play Console mentre una revisione è in corso.
6. **Non cambiare** "Permessi per le azioni" nelle impostazioni GitHub (devono restare su "Consenti tutte le azioni…").
7. **"Pubblica" solo quando hai visto il risultato**: dopo il pubblica, l'APK GitHub si aggiorna subito per chi lo usa.
8. **Nel dubbio, foto a Claude prima di premere.**

---

## 13. Problemi frequenti

| Cosa vedi | Cosa significa | Cosa fare |
|---|---|---|
| Link Play "impossibile trovare l'URL" in incognito | la produzione non è ancora online | controlla la riga Produzione; se "In revisione", aspetta |
| Nel Play Store "(accesso in anteprima interno)" | sei tester | normale; per vedere come un cliente usa l'incognito |
| "L'ottimizzazione del codice DEX è inferiore alla soglia" | versione senza R8 | pubblicare la 1.33 o successive |
| "Confronta e richiedi" su GitHub | il ramo di lavoro ha ricevuto modifiche | ignoralo, sparisce da solo |
| Compilazione ❌ rossa in Actions | errore di compilazione | foto della pagina a Claude |
| "Accedi con Google" non funziona nell'app da Play | mancano le impronte SHA di Google Play in Firebase | Play Console → Integrità dell'app → copia SHA-1/SHA-256 → Firebase → app Android → Aggiungi impronta |
| Il sito non mostra la modifica | cache del browser | ricarica, o attendi 2 minuti |
