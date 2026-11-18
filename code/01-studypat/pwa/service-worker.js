// StudyPat installable app - service worker
// Pages always come from the network (they are personal and carry security tokens); only the "you are offline" page
// and static files (fonts, icons, logos, libraries) are kept on the phone, so the app opens fast and fails politely.
const VERSION = '__VERSION__';
const SHELL = 'sp-shell-' + VERSION;
const STATIC = 'sp-static-' + VERSION;
const OFFLINE_URL = '/offline';
const CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'code.jquery.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== STATIC).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(request);
  const refresh = fetch(request).then((response) => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => hit);
  return hit || refresh;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(request).catch(() => fetch(request)));
    return;
  }
  if (url.origin === self.location.origin &&
      (url.pathname.startsWith('/storage/') || url.pathname.startsWith('/pwa/') ||
       /\.(png|jpe?g|svg|webp|ico|woff2?)$/i.test(url.pathname))) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
