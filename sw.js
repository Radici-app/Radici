/* Radici – service worker: rete per prima, cache solo se manca la connessione. Cambia VERSIONE per forzare l'aggiornamento. */
const VERSIONE = 'radici-v6';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSIONE).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r, { cache: 'no-cache' }).then(res => { if (res && res.ok) { const c = res.clone(); caches.open(VERSIONE).then(x => x.put(r, c)); } return res; })
    .catch(() => caches.match(r).then(x => x || caches.match('./index.html'))));
});
