
const CACHE_NAME='pips-co-v62-nofirebase';
self.addEventListener('install', e=>{self.skipWaiting();});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{});
