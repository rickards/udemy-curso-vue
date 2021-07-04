/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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

  // Cache page navigations (html) with a Network First strategy
  registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === "navigate",
    // Use a Network First caching strategy
    new NetworkFirst({
      // Put all cached files in a cache named 'pages'
      cacheName: "pages",
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );

  // Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
  registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({ request }) =>
      request.destination === "style" ||
      request.destination === "script" ||
      request.destination === "worker",
    // Use a Stale While Revalidate caching strategy
    new StaleWhileRevalidate({
      // Put all cached files in a cache named 'assets'
      cacheName: "assets",
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );

  // Cache images with a Cache First strategy
  registerRoute(
    // Check to see if the request's destination is style for an image
    ({ request }) =>
      request.destination === "image" || request.destination === "ico",
    // Use a Cache First caching strategy
    new CacheFirst({
      // Put all cached files in a cache named 'images'
      cacheName: "images",
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
        // Don't cache more than 50 items, and expire them after 30 days
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
        }),
      ],
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
