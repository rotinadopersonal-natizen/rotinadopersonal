from demo import *
PREV="""()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); const cur=S.weeks.find(x=>x.id===S.week); const w={id:'wp1',start:addDays(cur.start,-7),n:0}; S.weeks.push(w);
    const d=dayOf(w.id,st.id,'Seg',true); const L=[['Agachamento livr','3','10','25'],['Leg press 45','3','12','130'],['Cadeira extensora','3','15','30'],['Stiff com halteres','3','12','16'],['Remada baixa','3','12','40']]; d.rows=L.map(([n,s2,r,c])=>{ const x=newRow(); x.n1=n; x.a.s=s2; x.a.r=r; x.a.c=c; return x; }); d.done=1; d.ltr='A'; dayOf(cur.id,st.id,'Seg').ltr='A';
    const dc=dayOf(cur.id,st.id,'Seg'); dc.rows[2].cj=true;
    S.weeks.sort((a,b)=>a.start<b.start?-1:1); S.weeks.forEach((w,i)=>w.n=i+1); S.active=st.id; S.day='Seg'; save(); renderAll(); }"""
try:
 with sync_playwright() as p:
  b=p.chromium.launch(); ctx=b.new_context(service_workers="block",viewport={"width":412,"height":860},is_mobile=True,has_touch=True,device_scale_factor=2); pg=ctx.new_page()
  errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
  setup(pg); fill_ana(pg); pg.evaluate(PREV)
  pg.evaluate("()=>{ ['rp_srdemo','rp_fltdemo1','rp_pinDemo','rp_ordDemo','rp_sesDemo'].forEach(k=>localStorage.setItem(k,'1')); document.querySelectorAll('.rpdemo,#srDemo,#fltDemo').forEach(x=>x.remove()); srPinSet(['cadastro','financeiro','presenca']); show('sessao'); }"); pg.wait_for_timeout(1000)
  pg.screenshot(path="/tmp/c_bar.png",clip={"x":0,"y":700,"width":412,"height":160})
  print("tamanhos", pg.evaluate("()=>[...document.querySelectorAll('.tabs #srBtn,.tabs #srSes,.tabs .srpb,.tabs .srpadd')].map(x=>{const r=x.getBoundingClientRect(); return Math.round(r.width)+'x'+Math.round(r.height)})"))
  # segurar e soltar, depois arrastar
  r=pg.evaluate("()=>{ const r=document.querySelector('.srpin [data-srgo=cadastro]').getBoundingClientRect(); const q=document.querySelector('.srpin [data-srgo=presenca]').getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height/2,q.left+q.width/2,q.top+q.height/2]; }")
  pg.mouse.move(r[0],r[1]); pg.mouse.down(); pg.wait_for_timeout(700); pg.mouse.up(); pg.wait_for_timeout(300)
  print("edit", pg.evaluate("()=>[!!document.querySelector('.srpin.edit'), document.documentElement.classList.contains('srpedit')]"))
  pg.screenshot(path="/tmp/c_edit.png",clip={"x":0,"y":700,"width":412,"height":160})
  pg.mouse.move(r[0],r[1]); pg.mouse.down(); pg.mouse.move(r[0]+20,r[1],steps=3); pg.mouse.move(r[2]+5,r[3],steps=10); pg.wait_for_timeout(200); pg.screenshot(path="/tmp/c_drag.png",clip={"x":0,"y":700,"width":412,"height":160}); pg.mouse.up(); pg.wait_for_timeout(600)
  print("pins", pg.evaluate("()=>srPins()"), "tab", pg.evaluate("()=>CUR_TAB"))
  # dupla
  pg.evaluate("()=>{ show('sessao'); const e=document.querySelector('.chsts'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-120); const o=document.querySelector('#restWin'); if(o) o.style.display='none'; }"); pg.wait_for_timeout(400)
  pg.screenshot(path="/tmp/c_duo.png",clip={"x":0,"y":0,"width":412,"height":420})
  print("sidetogs", pg.locator("[data-sidetog]:visible").count())
  # semana: conjugados
  pg.evaluate("()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); VW={sid:st.id,days:['Seg'],ltr:'',wid:S.week,z:1,lay:'h'}; vwRender(); }"); pg.wait_for_timeout(500)
  print("cj", pg.locator("#vwOv .vwcj").count()); pg.screenshot(path="/tmp/c_vw.png")
  pg.evaluate("()=>{ VW.days=DAYS.slice(); vwRender(); }"); pg.wait_for_timeout(200)
  pg.evaluate("()=>document.querySelector('#vwOv [data-vwcmp]').click()"); pg.wait_for_timeout(600); pg.screenshot(path="/tmp/c_ev1.png")
  print("modes", pg.locator("#histOv [data-hby]").all_inner_texts())
  pg.evaluate("()=>document.querySelector('#histOv [data-hview=bar]').click()"); pg.wait_for_timeout(500); pg.screenshot(path="/tmp/c_ev2.png",full_page=False)
  print("charts", pg.locator("#histOv .ccmh").count())
  pg.evaluate("()=>document.querySelector('#histOv [data-hby=ex]').click()"); pg.wait_for_timeout(500); pg.screenshot(path="/tmp/c_ev3.png")
  print("parecidos", pg.locator("#histOv .hparr").count())
  pg.evaluate("()=>document.querySelector('#histOv [data-hali]').click()"); pg.wait_for_timeout(500); pg.screenshot(path="/tmp/c_ev4.png")
  print("ali", pg.evaluate("()=>S.brand.exAli"), pg.locator("#histOv .hagr").count())
  pg.evaluate("()=>document.querySelector('#histOv [data-vwback]').click()"); pg.wait_for_timeout(500)
  print("voltou", pg.evaluate("()=>[!!VW, VW&&VW.days.length, document.getElementById('histOv').hidden]"))
  # histórico (aba)
  pg.evaluate("()=>{ VW=null; vwRender(); histOpen(S.active,false); HV.tab='cmp'; histRender(); }"); pg.wait_for_timeout(500); pg.screenshot(path="/tmp/c_hist.png")
  print(errs[:5]); b.close()
finally: srv.kill()
