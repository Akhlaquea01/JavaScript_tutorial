if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Update handling
let refreshing;
navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
});

// Mock API data loader for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const apiContainer = document.getElementById('api-data');
    const offlineIndicator = document.getElementById('offline-indicator');

    // Network Status handling
    function updateOnlineStatus() {
        if (!offlineIndicator) return; // Safety check if old HTML is loaded

        if (navigator.onLine) {
            offlineIndicator.classList.add('hidden');
        } else {
            offlineIndicator.classList.remove('hidden');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    // Fetch real API data

    // Fetch real API data
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderData(data, false);
        })
        .catch(error => {
            console.log('Network request failed, checking for offline usage...', error);
            // In a real app with NetworkFirst, the service worker might handle serving the cached response.
            // However, if the SW fails or we want to handle visual cues:
            apiContainer.innerHTML += '<p style="color:red">Current: Offline or Network Error</p>';
        });

    function renderData(data, isCached) {
        apiContainer.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
            <small>Source: ${isCached ? 'Cache' : 'Network'} (ID: ${data.id})</small>
        `;
    }
});
