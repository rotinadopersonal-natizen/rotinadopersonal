// Rotina do Personal: abre sem internet (guarda o site no aparelho) e mostra o alarme do descanso.
// Os dados dos alunos NÃO passam por aqui: ficam no banco do próprio aparelho e sobem sozinhos quando a internet volta.
const V="rp-v2";
const CORE=["./","index.html","config.js","manifest.webmanifest","icon-192.png","icon-512.png",
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js"];
const LIBS=/^https:\/\/(www\.gstatic\.com\/firebasejs|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com\/ajax\/libs)\//;
self.addEventListener("install",e=>{ self.skipWaiting();
  e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>fetch(u,{mode:u.startsWith("http")?"cors":"same-origin",cache:"reload"}).then(r=>{ if(r.ok) return c.put(u,r); }).catch(()=>{}))))); });
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
const put=(req,res)=>{ if(res&&(res.ok||res.type==="opaque")){ const cp=res.clone(); caches.open(V).then(c=>c.put(req,cp)).catch(()=>{}); } return res; };
self.addEventListener("fetch",e=>{ const r=e.request; if(r.method!=="GET") return;
  const u=new URL(r.url);
  // Página: tenta a internet primeiro (pega a versão nova); sem internet, abre a guardada.
  if(r.mode==="navigate"||(u.origin===location.origin&&/(\/|index\.html)$/.test(u.pathname))){
    e.respondWith(fetch(r).then(res=>{ if(res.ok&&!u.search) put("index.html",res.clone()); return res; })
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html")).then(m=>m||caches.match("./")))); return; }
  // Bibliotecas e fontes: usa a guardada (são fixas) e busca se não tiver.
  if(LIBS.test(r.url)){ e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>put(r,res)))); return; }
  // Arquivos do próprio site (imagens, ícones, config): internet primeiro, guardado se cair.
  if(u.origin===location.origin){ e.respondWith(fetch(r).then(res=>put(r,res)).catch(()=>caches.match(r,{ignoreSearch:true}))); return; }
  // Resto (login, banco de dados): passa direto.
});
self.addEventListener("notificationclick",e=>{ e.notification.close(); e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(L=>{ for(const c of L){ if("focus" in c) return c.focus(); } return self.clients.openWindow("./"); })); });
