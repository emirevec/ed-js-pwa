const CACHE_STATIC_NAME = "static-v01"
const CACHE_INMUTABLE_NAME = "inmutable-v01"
const CACHE_DYNAMIC_NAME = "dynamic-V01"

self.addEventListener('install', (e) => {
    console.log("Sw install");
    const cacheStatic = caches.open(CACHE_STATIC_NAME).then( (cache) => {
        return cache.addAll([
            './index.html',
            './index.css',
            './manifest.json',
            './bundle.js',
            './src/views/app.hbs',
            './src/views/article.hbs',
            './src/views/cart.hbs'
        ]);
    });

    const cacheInmuntable = caches.open(CACHE_INMUTABLE_NAME).then((cache) => {
        return cache.addAll([
            "https://code.jquery.com/jquery-3.7.1.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js"
        ])        
    });

    e.waitUntil(Promise.all([cacheStatic, cacheInmuntable]));
});

self.addEventListener('activate', (e) => {
    console.log("Sw activates");
    const cacheWhiteList = [
        CACHE_STATIC_NAME,
        CACHE_INMUTABLE_NAME,
        CACHE_DYNAMIC_NAME
    ];

    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map((key) => {
                if(!cacheWhiteList.includes(key)) {
                    return caches.delete(key);
                };
            }));
        })
    );
});

self.addEventListener('fetch', (e) => {
    console.log("Sw fetchs");

    let {url, method} = e.request
    
    if (method === 'GET' && !url.includes('mockapi.io')) {        
        const response = caches.match(e.request).then((res) => {
            if (res) {
                return res;
            };

            return fetch(e.request).then((newResponse) => {
                caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                    cache.put(e.request, newResponse)
                });
                return newResponse.clone();
            });
        });

        e.respondWith(response);
    };
});

self.addEventListener('push', (e) => {
    const title = "Tienda virtual";
    const options = {
        body: `Mensaje: ${e.data.text()}`,
        icon: './publci/src/images/icons/icon-72x72.png'
    };

    e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(clients.openWindow('https://www.google.com'))
})
