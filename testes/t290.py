from demo import *
try:
 with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(service_workers="block",viewport={"width":412,"height":900})
  errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
  setup(pg); fill_ana(pg)
  pg.evaluate("()=>{ const o=document.getElementById('instPop'); if(o) o.hidden=true; }")
  for t in ["perfil","cadastro","sessao","presenca","relmes","contrato","cartao","agenda","financeiro","corpo","semana"]:
    try: pg.evaluate("(t)=>show(t)",t); pg.wait_for_timeout(700); print(t,"ok", len(pg.locator("main, body").first.inner_text()))
    except Exception as e: print(t,"ERRO",str(e)[:100])
  print("tabs:", pg.evaluate("()=>[...document.querySelectorAll('.tabs [role=tab]')].filter(t=>!t.hidden).map(t=>t.innerText.replace(/\\n/g,' '))"))
  print("erros:", errs[:5]); b.close()
finally: srv.kill()
