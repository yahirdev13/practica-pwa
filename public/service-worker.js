const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

self.addEventListener('install', event => {
  const respCache = caches.open(STATIC_CACHE_NAME).then(cache => {
    return cache.addAll([
      '/',
      '/porshe',
      '/css/style.css',
      '/js/app.js',
      '/images/ferrari1.jpg',
      '/images/Dakar.png',
      '/offline.html',
    ]);
  });

  const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then(cache => {
    return cache.addAll([
      'https://reqres.in/api/users',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
      'https://unpkg.com/sweetalert/dist/sweetalert.min.js'
    ]);
  });

  event.waitUntil(Promise.all([respCache, respCacheInmutable]));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== STATIC_CACHE_NAME && cacheName !== INMUTABLE_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("offline.html");
      });
    })
  );
});

const cleanCache = (cacheName, maxSize) => {
  caches.open(cacheName)
    .then(cache => {
      cache.keys().then(items => {
        if (items.length >= maxSize) {
          cache.delete(items[0]).then(() => cleanCache(cacheName, maxSize));
        }
      });
    });
};
