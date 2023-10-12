self.addEventListener("install", e => {
    console.log("Caching resources..");
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./sw.js",
                "./src/icons/icon-192x192.png"
            ]);
        })
    );
    console.log("Resources in cache. Done");
})

self.addEventListener("fetch", e => {
    console.log('intercepting fecth request for:', e.request.url);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
});