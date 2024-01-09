const CACHE_STATIC_NAME = "static-v01"
const CACHE_INMUTABLE_NAME = "inmutable-v01"
const CACHE_DYNAMIC_NAME = "dynamic-V01"

const CACHE_YES = true;

self.addEventListener('install', (e) => {
    console.log("Sw install");
    const cacheStatic = caches.open(CACHE_STATIC_NAME).then( (cache) => {
        return cache.addAll([
            './public/index.html',
            './public/index.css',
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
    if (CACHE_YES) {
        
        let {url, method} = e.request

        const response = caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }

            return fetch(e.response).then((newResponse) => {
                caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                    cache.put(e.request, newResponse)
                });
                return newResponse.clone();
            });
        });

        e.respondWhit(response);
    }else {
        console.log("Bypass", method, url);
    };
});


