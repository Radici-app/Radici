# Radici sugli store – materiale e passi da fare

| Cartella / file | Contenuto |
|---|---|
| `google-play/scheda-e-moduli.md` | testi della scheda Play, moduli della Play Console (sicurezza dei dati, classificazione, pubblico, annunci, accesso all'app) e promemoria SHA-1 |
| `google-play/icona-512.png`, `immagine-in-evidenza-1024x500.png`, `screenshot/` | grafica per Google Play |
| `app-store/scheda-e-revisione.md` | testi App Store Connect: descrizione, parole chiave, etichette privacy, note per la revisione |
| `app-store/PASSI-QUANDO-APPLE-E-ATTIVO.md` | cosa fare per iPhone quando l'account Apple sarà attivo |
| `app-store/icona-1024.png`, `screenshot-iphone-6.9/` | grafica per l'App Store |

## Come sono fatte le versioni dell'app

| Versione | Da dove | Aggiornamenti | File |
|---|---|---|---|
| Android "GitHub" | Releases del repository (come oggi) | automatici dentro l'app | `Radici.apk` |
| Android "store" | Google Play | dal Play Store | `Radici-store.aab` (artifact **Radici-aab-per-Google-Play** di ogni compilazione "App Android") |
| iPhone | App Store / TestFlight | dall'App Store | per ora solo build di verifica non firmata |

Il numero di versione (`versionCode`) è il numero della compilazione su GitHub: cresce sempre da solo.
I promemoria push sono spenti: in `app.js` c'è `const PROMEMORIA_ATTIVI = false;` → mettere `true` quando il server delle notifiche è attivo.

---

# I tuoi passi, in ordine

## 0. Prima di tutto (valgono per entrambi gli store)
1. **Numero D-U-N-S di Eurogestion S.A.S.** – sia Google (account organizzazione) sia Apple lo chiedono per pubblicare come azienda. Controlla se ce l'avete già: https://www.dnb.com/duns-number/lookup.html . Se no, richiedilo gratis (anche dalla pagina di iscrizione Apple): arriva in circa 5-14 giorni lavorativi.
2. **Account di prova per i revisori**: apri l'app (o il sito https://radici-app.github.io/Radici/), Accedi → Registrati con un'email creata apposta (es. una nuova casella Gmail) e una password robusta. Completa il profilo con nome `Revisore Store` e un telefono finto. Conferma l'email dal link ricevuto. Non cancellarlo mai. Avvisa il salone che le prenotazioni di "Revisore Store" sono di prova.
3. **Unire questo ramo in `main`** (o chiedermi di aprire la richiesta di unione): solo allora il sito e l'APK di GitHub ricevono le modifiche (promemoria nascosti, Accedi con Apple solo su iPhone, versione store).

## 1. Google Play
1. **Crea l'account sviluppatore** su https://play.google.com/console/signup → tipo **Organizzazione** → dati di Eurogestion S.A.S., D-U-N-S, sito, telefono ed email di contatto → paga i 25 $ una tantum → verifica dell'identità (documento del legale rappresentante). Come organizzazione **non** serve il test chiuso con 12 tester per 14 giorni richiesto agli account personali.
2. **Crea l'app**: Home → Crea app → Nome `Radici – Ambito Hair Studio` · Lingua Italiano · App · Gratuita → accetta le dichiarazioni.
3. **Scarica l'AAB**: GitHub → Radici → Actions → "App Android" → ultima compilazione verde → in fondo, Artifacts → **Radici-aab-per-Google-Play** → si scarica uno zip: dentro c'è `Radici-store.aab`.
4. **Primo caricamento**: Test e rilascio → **Test → Test interno** → Crea una nuova release.
   - Alla domanda sulla **firma dell'app** scegli **"Usa una chiave generata da Google"** (consigliato). La chiave di GitHub diventa la *chiave di caricamento*.
     > Conseguenza: chi ha l'APK di GitHub e vuole passare alla versione Play dovrà disinstallare l'APK e installare da Play (i dati sono sul server, basta accedere di nuovo). È la scelta più sicura, perché se la chiave di caricamento si perdesse Google la può sostituire.
   - Carica `Radici-store.aab`, nome della release automatico, note: `Prima versione`.
   - Aggiungi te stessa come tester (Tester → crea elenco email) e installa dal link di partecipazione.
5. **SHA-1 in Firebase** (subito dopo il primo caricamento): segui la sezione 3 di `google-play/scheda-e-moduli.md`. Poi riprova "Accedi con Google" dall'app scaricata da Play.
6. **Scheda dello store**: Fai crescere gli utenti → Presenza nello store → **Scheda principale dello store** → testi e grafica da `google-play/`.
7. **Contenuti dell'app** (Norme e programmi → Contenuti dell'app): compila nell'ordine privacy, accesso all'app (con l'account di prova), annunci, classificazione dei contenuti, pubblico di destinazione, app di notizie, ID pubblicità, app governative, funzionalità finanziarie, salute, **sicurezza dei dati** – tutto in `google-play/scheda-e-moduli.md`.
8. **Paesi**: Produzione → Paesi/regioni → Italia (o altri).
9. **Produzione**: Test e rilascio → Produzione → Crea release → "Aggiungi da libreria" la stessa build del test interno → Rivedi → **Invia per la revisione**. Prima revisione: da qualche giorno fino a 1-2 settimane.
10. **Versioni successive**: ogni compilazione verde di "App Android" produce un nuovo AAB con numero più alto → caricalo in Produzione (o prima nel test interno).

## 2. Apple App Store
1. **Iscrizione all'Apple Developer Program** come **Organizzazione** (99 $/anno): https://developer.apple.com/programs/enroll/ – serve l'Apple ID di chi rappresenta Eurogestion, il D-U-N-S, il sito web e un'email di dominio aziendale se possibile. Apple telefona per verificare: 1-2 settimane.
2. Quando è attivo, segui **`app-store/PASSI-QUANDO-APPLE-E-ATTIVO.md`** (Identificativo app, Firebase iOS e GoogleService-Info.plist, chiave APNs, App Store Connect, segreti GitHub per TestFlight).
3. Mandami **GoogleService-Info.plist** e, quando li hai salvati come segreti GitHub, dimmelo: preparo la build firmata e il caricamento su TestFlight.
4. Prova da TestFlight, compila scheda/privacy/note con `app-store/scheda-e-revisione.md` e invia in revisione.

## 3. Firebase – riepilogo
- [ ] SHA-1 e SHA-256 della **chiave di firma di Google Play** nell'app Android (dopo il primo caricamento su Play).
- [ ] Nuovo `google-services.json` nel repository dopo aver aggiunto le impronte.
- [ ] App iOS `it.radiciapp.prenota` → `GoogleService-Info.plist` nel repository.
- [ ] Authentication → provider **Apple** abilitato.
- [ ] Cloud Messaging → chiave **APNs** caricata.
- [ ] Authentication → Impostazioni → Domini autorizzati: `radici-app.github.io` presente (già usato oggi dal sito).
- [ ] Più avanti: piano Blaze + Cloud Functions per i promemoria, poi `PROMEMORIA_ATTIVI = true`.
