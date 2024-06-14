const NamaCache = "MyPortofolio"
const PreCache = ["/", "../css/style.css", "../js/script.js"]

self.addEventListener("install", (e) => {
    console.log("service worker installed");

    e.waitUntil((async () => {
        const cache = await caches.open(NamaCache)
        cache.addAll(PreCache);
    })())
})

self.addEventListener("fetch", (e) => {
    e.respondWith((async () => {
        const cache = await caches.open(NamaCache)
        const sumber = await cache.match(e.request)

        if (sumber) return sumber

        try {
            const res = await fetch(e.request)

            cache.put(e.request, res.clone())
            return res
        } catch (error) {
            console.log(error)
        }
    })())
})