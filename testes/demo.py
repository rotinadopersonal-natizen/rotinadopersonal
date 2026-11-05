from playwright.sync_api import sync_playwright
import subprocess,time,json,sys
srv=subprocess.Popen(["python3","-m","http.server","8772"],cwd="site",stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1)
mock=open("mockfb.js").read()
NOMES=[("Ana Paula","Seg","06:00","Qua"),("Bruno Souza","Seg","06:00","Qua"),("Carla Mendes","Ter","06:30","Sex"),("Diego Alves","Seg","07:00","Qui"),("Elisa Rocha","Qua","07:00","Sex"),("Fábio Lima","Seg","19:00","Ter"),("Gabi Torres","Sex","08:00","Seg"),("Hugo Martins","Qui","06:00","Ter")]
DN={"Seg":1,"Ter":2,"Qua":3,"Qui":4,"Sex":5}
UNPAID=[]
def setup(pg):
  pg.route("**/firebase-*-compat.js",lambda r:r.fulfill(body="",content_type="text/javascript"))
  pg.route("**/firebase-app-compat.js",lambda r:r.fulfill(body=mock,content_type="text/javascript"))
  pg.route("**/config.js",lambda r:r.fulfill(body='window.RP_FIREBASE={apiKey:"x"}',content_type="text/javascript"))
  pg.goto("http://localhost:8772/"); pg.wait_for_timeout(800)
  fs={"acessos/demo":{"status":"liberado"},"cadastros/demo":{"nome":"Professor Demo","telefone":"(31) 99999-0000","aceiteTermos":"2026-11-01","email":"demo@x.com"}}
  pg.evaluate("([fs])=>{sessionStorage.__fs=JSON.stringify(fs);sessionStorage.__cur=JSON.stringify({uid:'demo',email:'demo@x.com'});}",[fs])
  pg.reload(); pg.wait_for_timeout(3000)
  td=pg.evaluate("hojeK()"); ym=td[:7]; al={}
  for i,(n,d1,h,d2) in enumerate(NOMES):
    al["al%d"%i]={"nome":n,"tipo":"aula","forma":"mensal","ativo":True,"valorAula":60,"contratadas":8,"slots":[{"d":DN[d1],"h":h},{"d":DN[d2],"h":h}],"diaVenc":10}
  pagos={"al0":{"pago":ym+"-05"},"al1":{"pago":ym+"-08"},"al2":{"pago":ym+"-10"},"al3":{"pago":ym+"-10"},"al4":{"pago":ym+"-09"},"al5":{"pago":ym+"-09"},"al6":{"pago":ym+"-02"},"al7":{"pago":ym+"-02"}}
  for k in UNPAID: pagos.pop(k,None); al[k]["diaVenc"]=2
  pg.evaluate("([al,ym,pg])=>PRES.load({v:2,inicio:ym+'-01',alunos:al,dias:{},pagamentos:{[ym]:pg},historico:{}})",[al,ym,pagos]); pg.wait_for_timeout(1200)
  pg.evaluate("""()=>{ S.students=[]; S.plans=[]; PRES.alunos().forEach(a=>{ cadOpen(PRES.aluno(a.id),null); cadSave(); }); S.students.forEach(s=>{ s.peso=s.name==='Ana Paula'?68:80; s.alt=165; }); save(); renderAll(); }"""); pg.wait_for_timeout(1500)
  return td
def fill_ana(pg):
  pg.evaluate("""()=>{ const st=S.students.find(x=>x.name==='Ana Paula'); S.active=st.id; S.day='Seg'; const w=S.weeks.find(x=>x.id===S.week);
    const d=dayOf(w.id,st.id,'Seg',true); const L=[['Agachamento livre','3','12','30'],['Leg press 45','3','12','120'],['Cadeira extensora','3','15','35'],['Stiff com halteres','3','12','16'],['Remada baixa','3','12','40'],['Prancha','3','','']];
    d.rows=L.map(([n,s2,r,c])=>{ const x=newRow(); x.n1=n; x.a.s=s2; x.a.r=r; x.a.c=c; return x; }); d.rows[2].tec='Dropset'; d.rows[1].rest=90; const p=d.rows[5]; p.iso=true; p.a.isoM='so'; p.a.sec='30';
    d.cardio={t:'20',z:'2',tipo:'Esteira',pse:'5',v:'6'}; save(); renderAll(); }""")
  pg.wait_for_timeout(500)
