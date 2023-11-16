import { async } from "regenerator-runtime";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

const restaurantAPI = new Route(
    ({url}) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
    new StaleWhileRevalidate({
        cacheName: 'restaurant-api',
    }),
);

const restaurantImageAPI = new Route(
    ({url}) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
    new StaleWhileRevalidate({
        cacheName: 'restaurant-image-api',
    }), 
);

registerRoute(restaurantAPI);
registerRoute(restaurantImageAPI);

self.addEventListener('install', () => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

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

    event.waitUntil(self.registration.showNotification(notification.title, notification.options));
});

self.addEventListener('notificationonclick', (event) => {
    const clickedNotification = event.notification;
    clickedNotification.close();
    const chainPromise = async () => {
        console.log('Notification has been clicked');
        await self.clients.openWindow('https://www.dicoding.com');
    };
    event.waitUntil(chainPromise());
});