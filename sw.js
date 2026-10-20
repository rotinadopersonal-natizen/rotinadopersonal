// Rotina do Personal: só para mostrar o alarme do descanso como notificação. Não guarda nada em cache.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{ e.notification.close(); e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(L=>{ for(const c of L){ if("focus" in c) return c.focus(); } return self.clients.openWindow("./"); })); });
