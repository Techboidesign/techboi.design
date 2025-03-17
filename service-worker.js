const CACHE_NAME = 'techboi-portfolio-v1';

// Resources to cache initially
const INITIAL_CACHED_RESOURCES = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/prisma.html',
  '/netlify.html',
  '/css/styles.css',
  '/css/projects.css',
  '/css/bg-animation.css',
  '/scripts/header.js',
  '/scripts/components.js',
  '/scripts/transitions.js',
  '/scripts/accordions.js',
  '/scripts/carousel.js',
  '/scripts/contact-form-check.js',
  '/img/Avatar.png',
  '/img/avatar.gif',
  '/img/portrait.png',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
];

// Install the service worker and cache initial resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(INITIAL_CACHED_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch resources from cache or network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://fonts.googleapis.com') && 
      !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time-use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it's a one-time-use stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          // If network fetch fails, try to return a fallback
          if (event.request.url.includes('.html')) {
            return caches.match('/offline.html');
          }
          
          // Return nothing if no fallback
          return new Response(null, { status: 404 });
        });
      })
  );
});