(function(){
 const L=k=>JSON.parse(sessionStorage.getItem(k)||"null"), W=(k,v)=>sessionStorage.setItem(k,JSON.stringify(v));
 const db=()=>L("__fs")||{}; const users=()=>L("__users")||{};
 let cur=L("__cur"); const subs=[]; const log=window.__fslog=[];
 const can=p=>p.startsWith('publico/')||cur&&(p==="data/users/"+cur.uid||p.startsWith("data/users/"+cur.uid+"/")||(!window.__noCad&&p==="cadastros/"+cur.uid)||(p==="cadastros"&&cur.uid==="0HtqKqXRaLN9hQ34QlPmG4nB2fi1")||(cur.uid==="0HtqKqXRaLN9hQ34QlPmG4nB2fi1"&&/^(acessos|convites)(\/|$)/.test(p))||p==="acessos/"+cur.uid||/^convites\/[^/]+$/.test(p)||/^config\/[^/]+$/.test(p)||/^sugestoes\/[^/]+$/.test(p)||(cur.uid==="0HtqKqXRaLN9hQ34QlPmG4nB2fi1"&&p==="sugestoes"));
 const nested=o=>Array.isArray(o)?o.some(x=>Array.isArray(x)||nested(x)):(o&&typeof o==="object"?Object.values(o).some(nested):false);
 const kids=p=>{const d=db();return Object.keys(d).filter(k=>k.startsWith(p+"/")&&!k.slice(p.length+1).includes("/")).map(k=>({id:k.slice(p.length+1),exists:true,data:()=>JSON.parse(JSON.stringify(d[k]))}));};
 const fire=()=>{ subs.forEach(s=>{ const ds=kids(s.p); s.cb({empty:!ds.length,docs:ds,metadata:{hasPendingWrites:false}}); }); try{ dfire(); }catch(e){} };
 const dsubs=[]; const dfire=()=>dsubs.forEach(x=>{ try{ x.cb({id:x.p.split("/").pop(),exists:x.p in db(),data:()=>db()[x.p]}); }catch(e){} });
 const ref=p=>({ onSnapshot:(cb,err)=>{ if(!can(p)){ err&&err({code:"permission-denied"}); return ()=>{}; } const x={p,cb}; dsubs.push(x); setTimeout(()=>cb({id:p.split("/").pop(),exists:p in db(),data:()=>db()[p]}),0); return ()=>{}; }, update:d=>{ const x=db(); x[p]=Object.assign({},x[p]||{},JSON.parse(JSON.stringify(d))); W("__fs",x); setTimeout(fire,0); return Promise.resolve(); }, set:(d,opt)=>{ if(opt&&opt.merge){ const x0=db(); d=Object.assign({},x0[p]||{},d); } if(!can(p)) return Promise.reject({code:"permission-denied"}); if(nested(d)) return Promise.reject({code:"invalid-argument",message:"nested arrays"}); const x=db(); x[p]=JSON.parse(JSON.stringify(d)); W("__fs",x); log.push("set "+p); setTimeout(fire,0); return Promise.resolve(); },
   get:()=>can(p)?Promise.resolve({id:p.split("/").pop(),exists:p in db(),data:()=>db()[p]}):Promise.reject({code:"permission-denied"}),
   delete:()=>{ const x=db(); delete x[p]; W("__fs",x); setTimeout(fire,0); return Promise.resolve(); } });
 const authCbs=[];
 const wrapU=u=>{ if(!u) return u; u.providerData=[{providerId:"password"}]; u.verifyBeforeUpdateEmail=e=>{ if(!window.__reauthed){ return Promise.reject({code:"auth/requires-recent-login"}); } window.__emailSent=e; return Promise.resolve(); }; u.reauthenticateWithCredential=c=>{ window.__reauthed=true; return Promise.resolve(); }; return u; };
 const setCur=u=>{ cur=u; W("__cur",u); authCbs.forEach(cb=>cb(wrapU(u))); };
 window.firebase={ initializeApp(){}, auth:Object.assign(()=>({ languageCode:"",
   onAuthStateChanged(cb){ authCbs.push(cb); setTimeout(()=>cb(wrapU(cur)),10); },
   createUserWithEmailAndPassword(e,p){ const u=users(); if(u[e]) return Promise.reject({code:"auth/email-already-in-use"}); if((p||"").length<6) return Promise.reject({code:"auth/weak-password"}); u[e]={p,uid:"uid_"+e.replace(/\W/g,"")}; W("__users",u); setCur({uid:u[e].uid,email:e}); return Promise.resolve(); },
   signInWithEmailAndPassword(e,p){ const u=users()[e]; if(!u||u.p!==p) return Promise.reject({code:"auth/invalid-credential"}); setCur({uid:u.uid,email:e}); return Promise.resolve(); },
   sendPasswordResetEmail(){ return Promise.resolve(); }, signInWithPopup(){ return Promise.reject({code:"auth/popup-closed-by-user"}); },
   signOut(){ setCur(null); return Promise.resolve(); } }),{GoogleAuthProvider:function(){},EmailAuthProvider:{credential:(e,p)=>({e,p})}}),
  firestore:()=>({ doc:ref, collection:p=>({ doc:id=>ref(p+"/"+id), get:()=>can(p)?Promise.resolve((ds=>({empty:!ds.length,docs:ds}))(kids(p))):Promise.reject({code:"permission-denied"}),
     onSnapshot:(cb,err)=>{ if(!can(p)){ err&&err({code:"permission-denied"}); return ()=>{}; } const s={p,cb}; subs.push(s); setTimeout(()=>{const ds=kids(p);cb({empty:!ds.length,docs:ds,metadata:{hasPendingWrites:false}})},0); return ()=>{}; } }),
   waitForPendingWrites:()=>Promise.resolve(), batch:()=>{ const ops=[]; return {set:(r,d)=>ops.push(()=>r.set(d)),update:(r,d)=>ops.push(()=>r.update(d)),commit:()=>Promise.all(ops.map(f=>f()))}; } }) };
 window.firebase.firestore.Timestamp={fromMillis:m=>({seconds:m/1000,toMillis:()=>m})};
 window.firebase.firestore.FieldValue={serverTimestamp:()=>({seconds:Date.now()/1000})};
})();
