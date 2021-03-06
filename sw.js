var cacheName = 'weather-App';
var filesToCache = [
  '/index.html',
  '/style.css',
  '/app.js',
  '/skycons.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    }).catch((err) =>{
      console.log(err);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    }).catch((err) =>{
      console.log(err);
    })
  );
});
