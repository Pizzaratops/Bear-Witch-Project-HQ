// Pass-through Service Worker — nur noetig, damit der Browser die Seite
// ueberhaupt als installierbar erkennt (Manifest + Service Worker + HTTPS
// sind die drei Grundvoraussetzungen). Cached bewusst nichts, damit immer
// die aktuelle Version geladen wird.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => new Response('Offline', { status: 503 })));
});
