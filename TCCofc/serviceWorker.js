const urls = ['index.html', 'offline.html'];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open("Cache").then((cache) => {
            console.log("Cache oppened");
            cache.addAll(urls);
        })
    );
});

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return fetch(e.request).catch(() => caches.match('offline.html'));
        })
    );
});

this.addEventListener('activate', (e) => {
    const cacheWhiteList = [];
    cacheWhiteList.push("Cache");
    e.waitUntil(caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cashN) => {
            if (!cacheWhiteList.includes(cashN)) {
                return caches.delete(cashN);
            }
        })
    )))
})

