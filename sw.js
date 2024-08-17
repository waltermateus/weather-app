// Este é o service worker da "Página Offline"

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pagoda-offline-page";
const offlineFallbackPage = "offlinePages.html"; // Substitua pelo nome correto da página offline

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll([offlineFallbackPage]))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// Suporte ao Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-weather-data') {
    event.waitUntil(syncWeatherData());
  }
});

async function syncWeatherData() {
  // Código para sincronizar os dados do clima em segundo plano
}

// Suporte a Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'icon-192x192.png',
    badge: 'icon-192x192.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
