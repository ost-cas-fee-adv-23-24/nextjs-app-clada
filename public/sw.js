self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.add('/offline.html');
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open('offline-cache').then((cache) => {
        return cache.match('/offline.html');
      });
    })
  );
});
