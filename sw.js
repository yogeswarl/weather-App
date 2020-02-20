var cacheName = 'WeatherPwa';
var filesToCache = [
  '/weather-App',
  '/weather-App/index.html',
  '/weather-App/style.css',
  '/weather-App/app.js',
  '/weather-App/skycons.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
