const CACHE_NAME = 'gerencia-chamado-v1';
const urlsToCache = [
    '/',
    '/login.html',
    '/cadastro.html',
    '/home.html',
    '/styles.css',
    '/login.css',
    '/main.css',
    '/registro.css',
    '/cadastro.css',
    '/app.js',
    '/cadastro.js',
    '/manifest.json',
    '/about.html',
    '/contact.html',
    '/index.html',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
