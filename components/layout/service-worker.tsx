'use client';
import { useEffect } from 'react';

export const ServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        async function (registration) {
          if (navigator.onLine) {
            await registration.update();
          }
        },
        function (err) {
          console.log('Service Worker registration failed: ', err);
        },
      );

      window.addEventListener('offline', () => {
        if (!navigator.onLine) window.location.reload();
      });

      window.addEventListener('online', () => {
        if (navigator.onLine) window.location.reload();
      });
    }
  }, []);

  return null;
};