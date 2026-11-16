# Google Play – come pubblicare un aggiornamento (passo passo)

Una sola regola: **prima il Test interno, poi la Produzione.** Non saltare passaggi.

Tutto si fa dal computer su **play.google.com/console** → app **Radici – Ambito Hair Studio**.

---

## Passo 1 – Prendere il file nuovo (AAB) da GitHub
1. GitHub → repository **Radici** → **Actions** → workflow **App Android** → l'ultima compilazione verde ✅ sul ramo `main`.
2. In fondo alla pagina, sezione **Artifacts** → scarica **Radici-aab-per-Google-Play** (è uno .zip).
3. Apri lo .zip: dentro c'è **Radici-store.aab**. È questo il file da caricare.

## Passo 2 – Caricarlo nel Test interno
1. Menu a sinistra → **Test e rilascio** → **Test** → **Test interno**.
2. In alto a destra: **Crea nuova release**.
3. Sezione "App bundle": **Carica** → scegli `Radici-store.aab`.
4. "Note di rilascio": scrivi in due parole cosa cambia (es. `Miglioramenti e correzioni`).
5. In basso: **Avanti** → **Salva e pubblica** (oppure *Implementa*).
6. Qui **non serve la revisione di Google**: in pochi minuti l'aggiornamento è disponibile per i tester.

## Passo 3 – Provarlo sul telefono (10 minuti)
1. Sul telefono apri **Play Store** → cerca la tua app (o le tue app → aggiornamenti) → **Aggiorna**.
2. Prova:
   - [ ] l'app si apre
   - [ ] accesso con email e password
   - [ ] accesso con Google
   - [ ] una prenotazione e il suo annullamento
   - [ ] foto del profilo
3. Se qualcosa non va: **fermati** e manda una foto a Claude. Non andare avanti.

## Passo 4 – Mandarlo in Produzione (ai clienti)
1. Torna su **Test interno** → nella release appena provata: **Promuovi release** → **Produzione**.
2. Si apre la pagina della release di Produzione. Controlla che:
   - la versione sia quella nuova (es. `33 (1.33)`);
   - **non** ci sia una percentuale di implementazione graduale (deve essere **100%**).
3. **Avanti** → **Salva**.
4. Vai su **Panoramica della pubblicazione** (menu a sinistra) → **Invia modifiche per la revisione**.
   👉 Questo è il passaggio che manda l'app ai clienti. Senza questo, resta tutto fermo.

## Passo 5 – Aspettare (e basta)
- In **Panoramica della pubblicazione** compare "Modifiche in fase di revisione". **Non premere niente**, soprattutto non "Rimuovi modifiche".
- Gli aggiornamenti di solito vengono approvati in poche ore, al massimo 1–3 giorni.
- La pubblicazione gestita è **disattivata**: appena Google approva, esce da sola.

## Come capire che è tutto fatto
Nell'app **Play Console** sul telefono → **Release**:

| Riga | Deve dire |
|---|---|
| Produzione | versione nuova · **100% ✅** |
| Test interni | versione nuova · **100% ✅** |

Controllo finale: apri in una finestra **in incognito**
https://play.google.com/store/apps/details?id=it.radiciapp.prenota
(se usi il tuo account vedrai sempre la versione "anteprima interno", perché sei tester).

---

## Parole che compaiono e cosa vogliono dire
- **Test interno**: solo tu e i tester dell'elenco. Nessuna revisione.
- **Produzione**: tutti i clienti. Serve la revisione di Google.
- **Promuovi**: copia la stessa versione dal Test interno alla Produzione (non serve ricaricare il file).
- **Implementazione completa / 100%**: l'aggiornamento va a tutti, non solo a una parte.
- **Pubblicata** in "Attività di invio": Google ha approvato *quell'invio* (può riguardare solo scheda/impostazioni). Per sapere se l'app è davvero dai clienti guarda la riga **Produzione** (100% ✅).
- **Avanzata** accanto all'app bundle: Google ha firmato e protetto il file. Normale.
- **Numero di versione**: ogni AAB nuovo deve avere un numero più alto del precedente. GitHub lo fa da solo.
