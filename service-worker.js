import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precache the files specified in the manifest (can be generated by CRA)
precacheAndRoute(self.__WB_MANIFEST); // Automatically handles files from the build output

// Cache all image requests using CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      // Use Cache Expiration plugin if you want to limit cache sizes or ages
    ],
  })
);

// Cache CSS, JS, and other static assets with NetworkFirst strategy
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font',
  new NetworkFirst({
    cacheName: 'static-assets-cache',
    plugins: [
      // Cache expiration, etc.
    ],
  })
);

// Cache all other requests (like API requests) with a NetworkFirst strategy
registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'document-cache',
  })
);
