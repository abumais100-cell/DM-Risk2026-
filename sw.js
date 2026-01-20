const CACHE_NAME = "dar-risk-2026-v1";
const ASSETS = [
  "/DM-Risk2026/",
  "/DM-Risk2026/index.html",
  "/DM-Risk2026/manifest.webmanifest",
  "/DM-Risk2026/icons/icon-192.png",
  "/DM-Risk2026/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
