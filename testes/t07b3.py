import demo
demo.NOMES[2]=("Carla Mendes","Seg","06:00","Sex")
from demo import *
try:
 with sync_playwright() as p:
  b=p.chromium.launch(); ctx=b.new_context(service_workers="block",viewport={"width":412,"height":860},is_mobile=True,has_touch=True,device_scale_factor=2); pg=ctx.new_page()
  errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
  setup(pg); fill_ana(pg)
  pg.evaluate("()=>{ ['rp_srdemo','rp_fltdemo1','rp_pinDemo','rp_ordDemo','rp_sesDemo'].forEach(k=>localStorage.setItem(k,'1')); document.querySelectorAll('.rpdemo,#srDemo,#fltDemo').forEach(x=>x.remove()); const st=S.students.find(x=>x.name==='Ana Paula'); S.active=st.id; S.day='Seg'; save(); show('sessao'); }"); pg.wait_for_timeout(1200)
  print("membros", pg.evaluate("()=>sesMembers().map(m=>m.name)"), "ltrbar", pg.locator(".col.active .ltrbar").count(), "chnew", pg.locator(".chnew").count())
  pg.evaluate("()=>{ const o=document.querySelector('#restWin'); if(o) o.style.display='none'; const e=document.querySelector('.chsts'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-150); }"); pg.wait_for_timeout(300)
  pg.locator(".chnew").nth(2).click(); pg.wait_for_timeout(500)
  print("active", pg.evaluate("()=>A().name"))
  pg.evaluate("()=>{ const o=document.querySelector('#restWin'); if(o) o.style.display='none'; const e=document.querySelector('.chsts'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-150); }"); pg.wait_for_timeout(300)
  pg.screenshot(path="/tmp/s_trio.png")
  pg.locator(".chnewrow [data-ltrnew=C]").click(); pg.wait_for_timeout(400)
  pg.evaluate("()=>{ const b=[...document.querySelectorAll('button')].find(x=>/^(Confirmar|Sim)/.test(x.textContent.trim())&&x.offsetParent); if(b) b.click(); }"); pg.wait_for_timeout(600)
  print("Carla ltr", pg.evaluate("()=>{ const c=S.students.find(x=>x.name==='Carla Mendes'); const d=dayOf(S.week,c.id,'Seg'); return d&&[d.ltr,d.ltrNew]; }"), [x for x in pg.locator(".chnew").all_inner_texts()])
  pg.evaluate("()=>{ const o=document.querySelector('#restWin'); if(o) o.style.display='none'; const e=document.querySelector('.chsts'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-150); }"); pg.wait_for_timeout(300); pg.screenshot(path="/tmp/s_trio2.png")
  t=pg.locator("#turnbar .tlab2"); print("tlabs", t.count()); t.nth(1).click(); pg.wait_for_timeout(400)
  print("rest", pg.evaluate("()=>Object.keys(REST).map(k=>S.students.find(x=>x.id===k).name)"), "active", pg.evaluate("()=>A().name"))
  print(errs[:5]); b.close()
finally: srv.kill()
