self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('app-cache').then(cache => {
        return cache.addAll([
          '/',
          '/style/style.css',
          '/images/favicon.png',
          // Agrega aquí todos los archivos que deseas que se almacenen en la caché
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  