// src/serviceWorkerRegistration.js

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    // Register service worker when the page is loaded
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }
  