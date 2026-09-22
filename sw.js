const CACHE_NAME='expense-tracker-v53';
const ASSETS=['./','./index.html','./manifest.json?v=53','./icon-192.png?v=53','./icon-512.png?v=53','./icon-180.png?v=53','./favicon-32.png?v=53','./favicon-16.png?v=53'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).catch(()=>{}));
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME) return caches.delete(k)}))).then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.hostname.includes('firestore.googleapis.com') || url.hostname.includes('firebase') || url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com') || url.hostname.includes('identitytoolkit.googleapis.com') || url.hostname.includes('securetoken.googleapis.com')){
    return;
  }
  const isDoc = e.request.mode==='navigate' || e.request.destination==='document' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  if(isDoc){
    e.respondWith((async()=>{
      try{
        const fresh=await fetch(e.request, {cache:'no-store'});
        if(fresh && fresh.ok) caches.open(CACHE_NAME).then(c=>c.put('./index.html', fresh.clone())).catch(()=>{});
        return fresh;
      }catch{
        return (await caches.match('./index.html')) || (await caches.match('./')) || new Response('Offline',{status:200,headers:{'Content-Type':'text/html'}});
      }
    })());
  } else {
    e.respondWith((async()=>{
      const cached=await caches.match(e.request);
      if(cached) return cached;
      try{
        const res=await fetch(e.request);
        if(res && res.ok) caches.open(CACHE_NAME).then(c=>c.put(e.request, res.clone())).catch(()=>{});
        return res;
      }catch{
        return cached || Response.error();
      }
    })());
  }
});
