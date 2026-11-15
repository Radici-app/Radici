# iPhone – cosa fare quando l'account Apple Developer sarà attivo

Oggi GitHub compila l'app per iPhone **senza firma** (workflow "App iPhone"), solo per verificare che il progetto funzioni.
Per arrivare su TestFlight e sull'App Store servono i passi qui sotto. Quelli segnati **(io)** li fai tu dal browser; quelli segnati **(Claude)** li faccio io quando mi dai i file/segreti.

## A. Identificativo dell'app e funzioni (developer.apple.com)
1. **(io)** Certificates, Identifiers & Profiles → **Identifiers** → `+` → App IDs → App.
   - Description: `Radici`
   - Bundle ID (Explicit): `it.radiciapp.prenota`
   - Capabilities da spuntare: **Push Notifications**, **Sign in with Apple**.
2. **(io)** Annota il tuo **Team ID** (in alto a destra o in Membership): servirà per la firma.

## B. Firebase: app iOS e file GoogleService-Info.plist – ✅ punti 1-3 fatti
1. **(io)** Firebase Console → progetto **radici-app** → ⚙ Impostazioni progetto → **Aggiungi app** → icona Apple (iOS).
   - ID pacchetto Apple: `it.radiciapp.prenota`
   - Nickname: `Radici iPhone`
   - App Store ID: lascialo vuoto per ora.
2. **(io)** Scarica **GoogleService-Info.plist** (salta gli altri passaggi della procedura guidata: SDK e codice sono già pronti).
3. **(Claude)** Lo metto in `app-android/ios/App/App/GoogleService-Info.plist`. Il workflow legge da solo il `REVERSED_CLIENT_ID` e lo imposta per l'accesso con Google.
4. ✅ **(io)** Firebase → Authentication → Metodo di accesso → **Apple** → Abilita (per l'app iOS non servono Service ID né chiave: basta abilitarlo e salvare).
5. **(io)** Revoca dell'accesso Apple quando un cliente cancella il profilo (lo chiede Apple):
   - developer.apple.com → **Keys** → `+` → nome `Radici Sign in with Apple` → spunta **Sign in with Apple** → Configure → App ID `it.radiciapp.prenota` → Save → Register → **Download** del `.p8` (una volta sola). Annota il **Key ID**. (Si può usare anche la stessa chiave della sezione C, spuntando entrambe le voci.)
   - Firebase → Authentication → Metodo di accesso → Apple → **Configurazione flusso codice**: ID team Apple, ID chiave, chiave privata (il contenuto del `.p8`) → Salva.
   - **(Claude)** collego la revoca al tasto "Cancella profilo" dell'app su iPhone.

## C. Chiave APNs per le notifiche push (anche se oggi i promemoria sono spenti)
1. **(io)** developer.apple.com → **Keys** → `+` → nome `Radici APNs` → spunta **Apple Push Notifications service (APNs)** → Continue → Register → **Download** del file `.p8` (si scarica una volta sola: conservalo). Annota il **Key ID**.
2. **(io)** Firebase → ⚙ Impostazioni progetto → **Cloud Messaging** → sezione app iOS → **Chiave di autenticazione APNs** → Carica: file `.p8`, Key ID, Team ID.

## D. App in App Store Connect
1. **(io)** appstoreconnect.apple.com → App → `+` → Nuova app:
   - Piattaforma iOS · Nome `Radici – Ambito Hair Studio` · Lingua principale Italiano · Bundle ID `it.radiciapp.prenota` · SKU `radici-prenota` · Accesso completo.
2. **(io)** Compila scheda, privacy e note per la revisione con i testi di `scheda-e-revisione.md`.

## E. Firma e caricamento automatico su TestFlight da GitHub
Servono 3 cose come **segreti GitHub** (repository Radici → Settings → Secrets and variables → Actions → New repository secret):

| Segreto | Cos'è | Come ottenerlo |
|---|---|---|
| `APPSTORE_API_KEY_ID` | Key ID della chiave API | App Store Connect → Utenti e accesso → **Integrazioni** → App Store Connect API → Chiavi del team → `+` (nome `GitHub`, accesso **Amministratore** – serve perché Xcode possa creare da solo il certificato di distribuzione) |
| `APPSTORE_API_ISSUER_ID` | Issuer ID | stessa pagina, in alto |
| `APPSTORE_API_KEY_P8` | contenuto del file `AuthKey_XXXX.p8` | si scarica una volta sola dalla stessa pagina; apri il file con un editor di testo e incolla tutto, comprese le righe BEGIN/END |
| `APPLE_TEAM_ID` | Team ID (10 caratteri) | developer.apple.com → Membership |

Con la chiave API, Xcode su GitHub crea e rinnova **da solo** certificato di distribuzione e profilo (firma automatica, `-allowProvisioningUpdates`): non serve un Mac né esportare certificati .p12.
✅ Il workflow `ios.yml` è già pronto: appena i 4 segreti esistono, ogni compilazione dal ramo `main` viene **firmata e caricata su TestFlight** da sola (numero di build = numero della compilazione). Per farla partire subito: Actions → "App iPhone" → Run workflow sul ramo main.

**(io)** Prima del primo caricamento l'app deve già esistere in App Store Connect (sezione D).

## F. TestFlight e invio in revisione
1. **(io)** Dopo il primo caricamento (10-30 minuti di elaborazione) la build compare in App Store Connect → TestFlight. Aggiungi te stessa come tester interno e prova l'app sul tuo iPhone con l'app TestFlight.
2. **(io)** Prova in particolare: Accedi con Apple, Accedi con Google, email e password, una prenotazione e il suo annullamento, cambio foto del profilo, Cancella profilo (con un account diverso da quello di prova).
3. **(io)** Pagina della versione → seleziona la build → Aggiungi alla revisione → Invia.

## Da sapere
- Su iPhone non c'è nessun aggiornamento "fatto in casa" né alcun link all'APK: l'app si aggiorna solo dall'App Store.
- La domanda "Vuoi un promemoria?" e il tasto Notifiche sono nascosti finché `PROMEMORIA_ATTIVI` in `app.js` è `false`.
- La build di oggi è non firmata: compila con il GoogleService-Info.plist vero, ma si può installare solo dopo la firma (sezione E).
- Nella privacy (gestionale → testi legali) aggiungi "con Apple" accanto a "con Google" dove si parla dell'accesso.
