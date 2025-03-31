/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */

const CACHE_NAME = 'ecommerce-pwa-cache-v1';
const urlsToCache = ['/', '/index.html', '/static/js/bundle.js', '/manifest.json', '/offline.html'];

// Install Event - Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Event - Clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event - Implement Cache First and Network Fallback strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      });
    })
  );
});

// Sync Event - Background Sync Example
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('Sync event triggered!');
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    const response = await fetch('/sync-data-endpoint');
    const result = await response.json();
    console.log('Data synced:', result);
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Push Event - Handling Push Notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('Push notification received:', data);

    const options = {
      body: data.message,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'E-commerce PWA', options)
    );
  }
});
