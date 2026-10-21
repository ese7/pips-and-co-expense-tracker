
const CACHE='pips-co-v70-firebase';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.map(c=>{if(c!=='pips-co-v70-firebase') return caches.delete(c)})).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.hostname.includes('firestore')||u.hostname.includes('firebase')||u.hostname.includes('gstatic')||u.hostname.includes('googleapis')) return;
});
