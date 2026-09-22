
const CACHE_NAME='pips-co-v61-fix';
self.addEventListener('install', e=>{self.skipWaiting();});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.hostname.includes('firestore')||u.hostname.includes('firebase')||u.hostname.includes('gstatic')||u.hostname.includes('googleapis')) return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>new Response('Offline', {status:503})));
  }
});
