from demo import *
PREV="""()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); const cur=S.weeks.find(x=>x.id===S.week); const w={id:'wp1',start:addDays(cur.start,-7),n:0}; S.weeks.push(w);
    const d=dayOf(w.id,st.id,'Seg',true); const L=[['Agachamento livre','3','10','25'],['Leg press 45','3','12','130'],['Cadeira extensora','3','15','30'],['Stiff com halteres','3','12','16'],['Remada baixa','3','12','40']]; d.rows=L.map(([n,s2,r,c])=>{ const x=newRow(); x.n1=n; x.a.s=s2; x.a.r=r; x.a.c=c; return x; }); d.done=1; d.ltr='A'; dayOf(cur.id,st.id,'Seg').ltr='A';
    S.weeks.sort((a,b)=>a.start<b.start?-1:1); S.weeks.forEach((w,i)=>w.n=i+1); S.active=st.id; S.day='Seg'; save(); localStorage.setItem('rp_rw_x','1'); RW_X=true; renderAll(); }"""
def top(pg,sel,off):
  pg.evaluate("([s,o])=>{ const e=document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top+window.scrollY-o); }",[sel,off]); pg.wait_for_timeout(400)
def nopop(pg): pg.evaluate("()=>{ try{ REP_POP=null; repPopRender(); }catch(_){} }")
try:
 with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(service_workers="block",viewport={"width":390,"height":844},device_scale_factor=2)
  errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
  setup(pg); fill_ana(pg); pg.evaluate(PREV); pg.evaluate("()=>show('sessao')"); pg.wait_for_timeout(800)
  C=lambda i: pg.locator(".col.active .cvc").nth(i)
  top(pg,".col.active .cvlist",250)
  pg.evaluate("()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); REP_POP=st.id; repPopRender(); }"); pg.wait_for_timeout(400); pg.screenshot(path="sl_pop.png"); nopop(pg)
  top(pg,".col.active .cvlist",175); pg.screenshot(path="sl_cards.png")
  C(1).locator(".cvt").click(); pg.wait_for_timeout(300); C(1).locator(".cvmore").click(); pg.wait_for_timeout(300); pg.locator(".col.active [data-cvreg=MMII]").click(); pg.wait_for_timeout(300)
  top(pg,".col.active .cvc:nth-child(2)",110); pg.screenshot(path="sl_editor.png")
  pg.evaluate("()=>renderAll()"); pg.wait_for_timeout(400)
  C(2).locator("[data-cjjoin]").first.click(); pg.wait_for_timeout(3500)
  n=pg.locator(".col.active .cvc").count(); C(n-2).locator("[data-tecb]").first.click(); pg.wait_for_timeout(400)
  top(pg,".col.active .cvc:nth-child(3)",110); pg.screenshot(path="sl_conj.png"); print(pg.evaluate("""()=>[...document.querySelectorAll('.col.active .cvc')].map(c=>{ const d=c.querySelector(':scope > .cvdel'); if(!d) return 'NO'; const r=d.getBoundingClientRect(); const e=document.elementFromPoint(r.left+17,r.top+Math.min(r.height/2,40)); return c.className.trim()+'>'+(e?e.className:'-'); })"""))
  pg.evaluate("()=>renderAll()"); pg.wait_for_timeout(400)
  top(pg,".tmbox",120); pg.screenshot(path="sl_timers.png")
  print(errs); b.close()
finally: srv.kill()
