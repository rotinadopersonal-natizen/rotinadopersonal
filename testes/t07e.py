import sys, demo
TRIO = len(sys.argv)>1 and sys.argv[1]=="trio"
if TRIO: demo.NOMES[2]=("Carla Mendes","Seg","06:00","Sex")
from demo import *
P="/tmp/s/e_"+("trio_" if TRIO else "")
def conf(pg):
  pg.wait_for_timeout(450); t=pg.evaluate("()=>{const c=document.getElementById('cfPop'); return c&&!c.hidden&&c.getClientRects().length? c.innerText.split('\\n')[0] : null}")
  if t: pg.evaluate("()=>{ const b=[...document.querySelectorAll('#cfPop button')].find(x=>/Confirmar/.test(x.textContent)); b&&b.click(); }"); pg.wait_for_timeout(500)
  return t
try:
 with sync_playwright() as p:
  b=p.chromium.launch(); ctx=b.new_context(service_workers="block",viewport={"width":412,"height":860},is_mobile=True,has_touch=True,device_scale_factor=2); pg=ctx.new_page()
  errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
  setup(pg); fill_ana(pg); pg.evaluate("()=>{ window.RP_LIMPO=true; document.body.classList.add('rp-limpo'); renderAll(); }")
  pg.evaluate("()=>{ ['rp_srdemo','rp_fltdemo1','rp_pinDemo','rp_ordDemo','rp_sesDemo'].forEach(k=>localStorage.setItem(k,'1')); document.querySelectorAll('.rpdemo,#srDemo,#fltDemo').forEach(x=>x.remove()); localStorage.setItem('rp_srpos','top'); srPosApply(); const st=S.students.find(x=>x.name==='Ana Paula'); S.active=st.id; S.day='Seg';"
    " const d=dayOf(S.week,st.id,'Qua',true); d.ltr='B'; d.rows=dayOf(S.week,st.id,'Seg').rows.slice(0,2).map(r=>JSON.parse(JSON.stringify(r))); save(); show('sessao'); }"); pg.wait_for_timeout(1200)
  hide="()=>{ const o=document.querySelector('#restWin'); if(o) o.style.display='none'; }"
  print("membros", pg.evaluate("()=>sesMembers().map(m=>m.name)"))
  pg.evaluate("()=>{ const e=document.querySelector('.sesl-hm'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-120); }"); pg.evaluate(hide); pg.wait_for_timeout(300); pg.screenshot(path=P+"ses.png")
  print("evo", pg.locator(".evob").inner_text(), "thin", pg.locator(".vwthin").count(), "adj", pg.locator(".chadj").all_inner_texts(), "oldnew", pg.locator("[data-chnew]").count())
  # Ajustar treino do 2º aluno
  pg.locator(".chadj").nth(1).click(); pg.wait_for_timeout(500)
  print("ajustar ->", pg.evaluate("()=>[A().name, ltrEdit===A().id, document.querySelectorAll('.ltrbox').length]"), "sem Ver/Repetir", pg.locator(".ltrbox [data-vwltrs], .ltrbox [data-ltrby]").count()==0)
  pg.evaluate("()=>{ const e=document.querySelector('.ltrbox'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-150); }"); pg.evaluate(hide); pg.wait_for_timeout(300); pg.screenshot(path=P+"ltr.png")
  pg.evaluate("()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); S.active=st.id; ltrEdit=st.id; renderAll(); }"); pg.wait_for_timeout(400)
  # criar treino novo
  pg.locator("[data-ltrnewo]").first.click(); pg.wait_for_timeout(400); pg.screenshot(path=P+"new1.png")
  print("pop1", pg.locator(".lnbox [data-ltrpick]").count(), pg.locator(".lnbox [data-ltrnewtxt]").count())
  pg.locator(".lnbox [data-ltrpick=C]").click(); pg.wait_for_timeout(400); pg.screenshot(path=P+"new2.png")
  print("pop2", pg.locator(".lnbox .lnq").inner_text(), pg.locator("#ltrnew-wk").input_value())
  pg.locator("#ltrnew-wk").fill("6"); pg.locator("[data-ltrnewok]").click(); pg.wait_for_timeout(500); c=conf(pg)
  print("criado", c, pg.evaluate("()=>{ const d=dayOf(S.week,A().id,'Seg'); const p=A().prog; return [d.ltr,d.ltrNew,p.weeks,p.start===S.weeks.find(x=>x.id===S.week).start, (blockInfo(A())||{}).n]; }"))
  pg.evaluate("()=>{ const k=S.week+'|'+A().id+'|Seg'; if(LTR_UNDO[k]) S.days[S.week][A().id].Seg=LTR_UNDO[k]; save(); renderAll(); }"); pg.wait_for_timeout(300)
  # custom name
  pg.evaluate("()=>{ ltrEdit=A().id; renderAll(); }"); pg.wait_for_timeout(300)
  pg.locator("[data-ltrnewo]").first.click(); pg.wait_for_timeout(300); pg.locator("[data-ltrnewtxt]").fill("Pull"); pg.locator("[data-ltrnewtxt]").press("Enter"); pg.wait_for_timeout(400)
  print("custom step2", pg.locator(".lnbox .lnq").inner_text()); pg.locator("[data-ltrnewok]").click(); pg.wait_for_timeout(400); conf(pg)
  print("pull", pg.evaluate("()=>[dayOf(S.week,A().id,'Seg').ltr, (S.brand||{}).ltrMine]"))
  pg.evaluate("()=>{ const k=S.week+'|'+A().id+'|Seg'; if(LTR_UNDO[k]) S.days[S.week][A().id].Seg=LTR_UNDO[k]; save(); renderAll(); }"); pg.wait_for_timeout(300)
  # mover
  pg.evaluate("()=>{ ltrEdit=A().id; renderAll(); }"); pg.wait_for_timeout(300)
  pg.locator("[data-mvopen]").first.click(); pg.wait_for_timeout(400); pg.screenshot(path=P+"mv1.png")
  print("mv head", pg.locator(".mvpop .mvhd b").inner_text(), "chips", pg.evaluate("()=>[...document.querySelectorAll('.mvpop .daychips button')].map(x=>x.innerText.replace('\\n',':'))"))
  pg.locator(".mvpop [data-mvto=Qua]").click(); pg.wait_for_timeout(400); g=conf(pg); pg.screenshot(path=P+"mv2.png")
  print("generic?", g, "conf", pg.locator(".mvpop .mvq").inner_text() if pg.locator(".mvpop .mvq").count() else None)
  pg.locator(".mvpop [data-mvmode=swap]").click(); pg.wait_for_timeout(500); g=conf(pg)
  print("swap", g, pg.evaluate("()=>{ const id=A().id; return [S.day, ltrOf(id,S.week,'Seg'), ltrOf(id,S.week,'Qua')]; }"))
  # agora em Qua (A). mover A de Qua para Seg (B) apagando
  pg.evaluate("()=>{ ltrEdit=A().id; renderAll(); }"); pg.wait_for_timeout(300)
  pg.locator("[data-mvopen]").first.click(); pg.wait_for_timeout(300); pg.locator(".mvpop [data-mvto=Seg]").click(); pg.wait_for_timeout(300); conf(pg)
  pg.locator(".mvpop [data-mvmode=del]").click(); pg.wait_for_timeout(400); g=conf(pg)
  print("del", g, pg.evaluate("()=>{ const id=A().id; return [S.day, ltrOf(id,S.week,'Seg'), dayHasData(dayOf(S.week,id,'Qua'))]; }"))
  # vazio: Seg -> Ter
  pg.evaluate("()=>{ ltrEdit=A().id; renderAll(); }"); pg.wait_for_timeout(300)
  pg.locator("[data-mvopen]").first.click(); pg.wait_for_timeout(300); pg.locator(".mvpop [data-mvto=Ter]").click(); pg.wait_for_timeout(300); print("cfbtns", pg.evaluate("()=>[...document.querySelectorAll('#cfPop button')].map(x=>x.textContent)")); g=conf(pg); print("cf after", pg.evaluate("()=>{const c=document.getElementById('cfPop'); return c&&!c.hidden&&c.innerText.slice(0,200)}"))
  print("vazio", g, pg.evaluate("()=>[S.day, ltrOf(A().id,S.week,'Ter')]"))
  pg.evaluate("()=>{ const id=A().id, W=S.days[S.week][id]; W.Seg=W.Ter; delete W.Ter; S.day='Seg'; save(); renderAll(); }"); pg.wait_for_timeout(400)
  # Evolução com a barra em cima
  pg.evaluate("()=>document.querySelector('[data-histopen]').click()"); pg.wait_for_timeout(800)
  pg.evaluate("()=>{ document.getElementById('histOv').scrollTop=0; }"); pg.wait_for_timeout(200); pg.screenshot(path=P+"evo0.png")
  pg.evaluate("()=>{ document.getElementById('histOv').scrollTop=400; }"); pg.wait_for_timeout(300); pg.screenshot(path=P+"evo1.png")
  print("evo top", pg.evaluate("()=>{ const q=s=>{const r=document.querySelector('#histOv '+s).getBoundingClientRect(); return [Math.round(r.top),Math.round(r.bottom)]}; return {htop:q('.htop'),hhead:q('.hhead'),back:q('.hback'),names:q('.hstrow')}; }"))
  pg.evaluate("()=>document.querySelector('[data-hx]').click()"); pg.wait_for_timeout(300)
  # caixa fina -> treinos da semana
  pg.evaluate(hide); pg.locator(".vwthin").first.click(); pg.wait_for_timeout(600); pg.screenshot(path=P+"vw.png")
  print("vw open", pg.evaluate("()=>!!VW && !document.getElementById('vwOv').hidden"), pg.evaluate("()=>{ const r=document.querySelector('#vwOv .vwtop').getBoundingClientRect(); return Math.round(r.top) }"))
  pg.evaluate("()=>document.querySelector('[data-vwx]').click()")
  # solo
  pg.evaluate("()=>{ const st=S.students.find(x=>x.name==='Diego Alves'); S.active=st.id; S.day='Seg'; save(); renderAll(); }"); pg.wait_for_timeout(600)
  print("solo", pg.evaluate("()=>sesMembers().map(m=>m.name)"), pg.locator(".evob").inner_text(), "thin", pg.locator(".vwthin").count())
  pg.evaluate("()=>{ const e=document.querySelector('.vwthin'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-300); }"); pg.evaluate(hide); pg.wait_for_timeout(300); pg.screenshot(path=P+"solo.png")
  print("ERRS", errs[:5]); b.close()
finally: srv.kill()
