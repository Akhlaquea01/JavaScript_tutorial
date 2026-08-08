# Workbox Offline Example

This project demonstrates how to use [Workbox](https://developers.google.com/web/tools/workbox) to easily implement offline capabilities and caching strategies in a web application.

## Prerequisites

To run this example, you need a local web server because Service Workers do not work on `file://` protocol.

You can use `http-server` (requires Node.js):

```bash
npx http-server .
```

Or the "Live Server" extension in VS Code.

## Project Structure

- **index.html**: The main entry point.
- **styles.css**: Basic styling.
- **app.js**: Registers the Service Worker.
- **service-worker.js**: The heart of the offline functionality, using Workbox.

## Workbox Strategies Used

In `service-worker.js`, we demonstrate three common caching strategies:

1.  **StaleWhileRevalidate** (for CSS & JS):
    -   Requests are served from the cache for speed.
    -   In the background, the cache is updated from the network.
    -   Best for assets that change but don't need to be immediate.

2.  **CacheFirst** (for Images):
    -   Checks the cache first. If found, serves it.
    -   If not, fetches from network and caches it.
    -   Includes an expiration plugin to remove images after 7 days.
    -   Best for static assets like images.

3.  **NetworkFirst** (for API calls):
    -   Tries to get fresh data from the network.
    -   If the network fails (offline), falls back to the cache.
    -   Best for dynamic content where freshness is important but offline availability is desired.

## How to Test

1.  Start your local server.
2.  Open `index.html` in your browser.
3.  Open DevTools (F12) -> **Application** tab -> **Service Workers**.
4.  Ensure the Service Worker is registered and running.
5.  Check **Cache Storage** in DevTools to see the cached assets (`assets-cache`, `image-cache`, etc.).
6.  Go to the **Network** tab in DevTools and select **Offline**.
7.  Refresh the page. The app should still load!
