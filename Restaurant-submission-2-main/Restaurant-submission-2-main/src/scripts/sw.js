import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// eslint-disable-next-line no-restricted-globals, no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

const restaurantAPI = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
  }),
);

const restaurantImageAPI = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-image-api',
  }),
);

registerRoute(restaurantAPI);
registerRoute(restaurantImageAPI);

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  // eslint-disable-next-line no-restricted-globals
  self.skipWaiting();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  const dataJson = event.data.json();
  const notification = {
    title: dataJson.title,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image,
    },
  };

  // eslint-disable-next-line no-restricted-globals
  event.waitUntil(self.registration.showNotification(notification.title, notification.options));
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationonclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  const chainPromise = async () => {
    console.log('Notification has been clicked');
    // eslint-disable-next-line no-restricted-globals
    await self.clients.openWindow('https://www.dicoding.com');
  };
  event.waitUntil(chainPromise());
});
