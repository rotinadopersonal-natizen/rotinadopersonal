from demo import *
import sys
try:
 with sync_playwright() as p:
  b=p.chromium.launch(); ctx=b.new_context(service_workers="block",viewport={"width":412,"height":860},is_mobile=True,has_touch=True,device_scale_factor=2); pg=ctx.new_page()
  errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
  setup(pg); fill_ana(pg)
  pg.evaluate("()=>{ const o=document.getElementById('instPop'); if(o) o.hidden=true; }")
  pg.evaluate("()=>{ ['rp_srdemo','rp_fltdemo1'].forEach(k=>localStorage.setItem(k,'1')); document.querySelectorAll('#srDemo,#fltDemo').forEach(x=>x.remove()); }")
  pg.wait_for_timeout(6500)
  print("demo1", pg.evaluate("()=>[...document.querySelectorAll('#srDemo,#fltDemo,#pinDemo,#sesDemo')].map(x=>x.id)"))
  # fecha srDemo/fltDemo -> pinDemo
  for i in range(4):
    pg.evaluate("()=>{ const d=document.querySelector('#srDemo'); if(d) d.click(); const f=document.querySelector('#fltDemo .fdok'); if(f) f.click(); }"); pg.wait_for_timeout(3200)
  print("demo2", pg.evaluate("()=>[...document.querySelectorAll('#srDemo,#fltDemo,#pinDemo,#sesDemo')].map(x=>x.id)"))
  pg.wait_for_timeout(1300); pg.screenshot(path="/tmp/s_pindemo.png")
  pg.evaluate("()=>document.querySelector('#pinDemo .rpdok').click()")
  # Minha Rotina + demo
  pg.evaluate("()=>document.getElementById('srBtn').click()"); pg.wait_for_timeout(2200); pg.screenshot(path="/tmp/s_orddemo.png")
  pg.evaluate("()=>document.querySelector('.sodemo .rpdok').click()"); pg.wait_for_timeout(300)
  # drag row 4 down
  r=pg.evaluate("()=>{ const r=document.querySelectorAll('#srPop .srgo')[4].getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height/2,r.height]; }")
  pg.mouse.move(r[0],r[1]); pg.mouse.down(); pg.wait_for_timeout(600); pg.mouse.move(r[0],r[1]+20,steps=3); pg.mouse.move(r[0],r[1]+r[2]*2+10,steps=8); pg.wait_for_timeout(300)
  pg.screenshot(path="/tmp/s_drag.png"); pg.mouse.up(); pg.wait_for_timeout(800)
  print("ord", pg.evaluate("()=>S.brand.srOrd"))
  pg.evaluate("()=>{ document.getElementById('srPop').hidden=true; srPinSet(['presenca','agenda','financeiro']); }"); pg.wait_for_timeout(400)
  # segurar Presença e arrastar para a direita
  r=pg.evaluate("()=>{ const r=document.querySelector('.srpin [data-srgo=presenca]').getBoundingClientRect(); const q=document.querySelector('.srpin [data-srgo=financeiro]').getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height/2,q.left+q.width/2]; }")
  pg.mouse.move(r[0],r[1]); pg.mouse.down(); pg.wait_for_timeout(700); pg.screenshot(path="/tmp/s_pinedit.png",clip={"x":0,"y":0,"width":412,"height":130})
  pg.mouse.move(r[0]+15,r[1],steps=3); pg.mouse.move(r[2]+5,r[1],steps=10); pg.wait_for_timeout(250); pg.screenshot(path="/tmp/s_pindrag.png",clip={"x":0,"y":0,"width":412,"height":130}); pg.mouse.up(); pg.wait_for_timeout(700)
  print("pins", pg.evaluate("()=>srPins()"), "pos", pg.evaluate("()=>srPos()"))
  # contrato
  pg.evaluate("()=>show('contrato')"); pg.wait_for_timeout(700); pg.screenshot(path="/tmp/s_contr.png")
  pg.evaluate("()=>document.querySelector('[data-rmver=contr]').click()"); pg.wait_for_timeout(800)
  print("prev", pg.evaluate("()=>{ const p=document.querySelector('.rmprev'); return [p.scrollHeight,p.clientHeight]; }"))
  cdp=ctx.new_cdp_session(pg); cdp.send("Input.synthesizeScrollGesture",{"x":200,"y":500,"yDistance":-600,"gestureSourceType":"touch","speed":1200}); pg.wait_for_timeout(800)
  print("scrollTop",pg.evaluate("()=>document.querySelector('.rmprev').scrollTop")); pg.screenshot(path="/tmp/s_contr2.png")
  pg.evaluate("()=>document.querySelector('[data-rmver=x]').click()")
  pg.evaluate("()=>show('cartao')"); pg.wait_for_timeout(700); pg.screenshot(path="/tmp/s_cart.png",full_page=False)
  pg.evaluate("()=>show('relmes')"); pg.wait_for_timeout(700); print("relmes go", pg.locator("[data-srgo2]").count())
  # sessao solo
  pg.evaluate("()=>{ const st=S.students.find(x=>x.name==='Diego Alves'); S.active=st.id; S.day='Seg'; save(); show('sessao'); }"); pg.wait_for_timeout(2500)
  print("sesdemo", pg.locator("#sesDemo").count()); pg.screenshot(path="/tmp/s_sesdemo.png")
  pg.evaluate("()=>document.querySelector('#sesDemo .rpdok').click()")
  pg.evaluate("()=>document.querySelector('#turnbar .tlab').click()"); pg.wait_for_timeout(1500)
  print("rest solo", pg.evaluate("()=>Object.keys(REST).length"), pg.locator("#turnbar .tlab").first.inner_text())
  pg.evaluate("()=>document.querySelector('#turnbar .tlab').click()"); pg.wait_for_timeout(300)
  # dupla Ana + Bruno
  pg.evaluate("()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); S.active=st.id; S.day='Seg'; save(); renderAll(); window.scrollTo(0,0); }"); pg.wait_for_timeout(800)
  print("membros", pg.evaluate("()=>sesMembers().map(m=>m.name)"), "ltrbar", pg.locator(".col.active .ltrbar").count(), "chnew", pg.locator(".chnew").count())
  pg.evaluate("()=>{ const e=document.querySelector('.chsts'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-200); }"); pg.wait_for_timeout(300); pg.screenshot(path="/tmp/s_duo.png")
  pg.locator(".chnew").nth(1).click(); pg.wait_for_timeout(500); pg.screenshot(path="/tmp/s_duo2.png")
  pg.locator(".chnewrow [data-ltrnew=B]").click(); pg.wait_for_timeout(500)
  ok=pg.locator("#confPop [data-confok], .confok, [data-cfok]").count(); print("confirm btns", ok)
  pg.screenshot(path="/tmp/s_duo3.png")
  # duo rest label
  pg.evaluate("()=>{ const t=[...document.querySelectorAll('#turnbar .tlab2')]; t[0].click(); }"); pg.wait_for_timeout(500)
  print("rest duo", pg.evaluate("()=>Object.keys(REST).map(k=>S.students.find(x=>x.id===k).name)"), "active", pg.evaluate("()=>A().name"))
  # trio: Carla com Ana e Bruno
  pg.evaluate("()=>{ const c=S.students.find(x=>x.name==='Carla Mendes'); const g=S.grade&&S.grade.Seg; console.log(JSON.stringify(g)); }")
  print(errs[:5]); b.close()
finally: srv.kill()
