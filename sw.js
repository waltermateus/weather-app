const CACHE_NAME = "weather-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/offlinePages.html",
    "https://storage.googleapis.com",
    "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                return caches.match("/offlinePages.html");
            });
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
