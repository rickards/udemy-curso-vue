importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`, workbox);

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  const { registerRoute } = workbox.routing;
  const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;

  // Used for filtering matches based on status code, header, or both
  const { CacheableResponsePlugin } = workbox.cacheableResponse;
  // Used to limit entries in cache, remove entries after a certain period of time
  const { ExpirationPlugin } = workbox.expiration;

  registerRoute(
    ({url}) => url.pathname.startsWith('/historical') || url.pathname.startsWith('/dividends'),
    new NetworkFirst({
      cacheName: 'api-cache',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        // Don't cache more than 50 items, and expire them after 30 days
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
        }),
      ]
    }),
    'GET'
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
