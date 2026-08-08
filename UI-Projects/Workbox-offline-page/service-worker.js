importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
    // Force development builds to update immediately
    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    console.log(`Yay! Workbox is loaded 🎉`, { workbox });

    // Precache - keeping it empty or minimal for this demo
    // We are moving everything to Runtime Caching to avoid path issues with Live Server
    workbox.precaching.precacheAndRoute([]);

    // Strategy 1: NetworkFirst for HTML (Navigation)
    // -------------------------------------------------------------------------
    // WHY: This is critical for the "Offline Page" experience.
    // 1. It tries to fetch the LATEST page from the server (Network).
    // 2. If the network works, it saves that page to the 'pages-cache'.
    // 3. If the network FAILS (Offline), it goes to 'pages-cache' and serves the last saved version.
    // This ensures your users always get content if possible, but never see the "Downasaur" if they visited before.
    workbox.routing.registerRoute(
        ({ request }) => request.mode === 'navigate',
        new workbox.strategies.NetworkFirst({
            cacheName: 'pages-cache',
            networkTimeoutSeconds: 3,
        })
    );

    // Strategy 2: StaleWhileRevalidate for CSS and JS
    // -------------------------------------------------------------------------
    // WHY: CSS and JS don't change as often as content, but we want them FAST.
    // 1. It serves the cached version IMMEDIATELY (Fast render).
    // 2. In the background, it checks the network for a new version.
    // 3. If there's a new version, it updates the cache for the NEXT visit.
    // This is perfect for assets like styles.css and app.js.
    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'style' || request.destination === 'script',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'assets-cache',
        })
    );

    // Strategy 3: CacheFirst for Images
    // -------------------------------------------------------------------------
    // WHY: Images are large and rarely change.
    // 1. Checks cache first. If found, serves it (Saves bandwidth).
    // 2. Only goes to network if not in cache.
    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 20,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                })
            ],
        })
    );

    // Strategy 4: NetworkFirst for API calls
    // -------------------------------------------------------------------------
    // WHY: API data needs to be fresh.
    // Same logic as HTML: Try to get fresh data, fallback to cache if offline.
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://jsonplaceholder.typicode.com',
        new workbox.strategies.NetworkFirst({
            cacheName: 'api-cache',
            networkTimeoutSeconds: 3,
        })
    );

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
