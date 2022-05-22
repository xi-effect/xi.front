/* eslint-disable no-undef */

import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { helloSW } from './util';

declare let self: ServiceWorkerGlobalScope;

// Кэшируем таблицу стилей с помощью стратегии `stale-while-revalidate`
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Кэшируем файлы со шрифтами с помощью стратегии `cache-first` на 1 год
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

// Кешируем scripts и styles
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate(),
);

// Кешируем изображения из директории /assets/
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/assets/'),
  new StaleWhileRevalidate(),
);

// // Кешируем Next JS
// registerRoute(
//   ({ url }) => url.pathname.includes('/_next/static/'),
//   new NetworkFirst(),
// );

// Кешируем manifest, favicon и logo
registerRoute(
  ({ url }) =>
    url.pathname.includes('/manifest.json') ||
    url.pathname.includes('/favicon.svg') ||
    url.pathname.includes('/logo.svg'),
  new StaleWhileRevalidate(),
);

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

helloSW();

// // listen to message event from window
// self.addEventListener('message', (event) => {
//   // HOW TO TEST THIS?
//   // Run this in your browser console:
//   //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
//   // OR use next-pwa injected workbox object
//   //     window.workbox.messageSW({command: 'log', message: 'hello world'})
//   console.log(event?.data);
// });

self.addEventListener('message', (event) => {
  // @ts-ignore
  clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        // @ts-ignore
        value: event?.data,
      });
    });
  });
});

self.addEventListener('push', (event) => {
  const data = JSON.parse(event?.data.text() || '{}');
  event?.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: '/icons/android-chrome-192x192.png',
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event?.notification.close();
  event?.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i += 1) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return self.clients.openWindow('/');
    }),
  );
});
