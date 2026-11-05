import json,os,glob,asyncio
from playwright.async_api import async_playwright
D='deck/project'; order=json.load(open(D+'/deck.json'))['order']
A='blobs/'
out='/home/claude/rotinadopersonal/apresentacao'; os.makedirs(out,exist_ok=True)
head='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0}html,body{width:1920px;height:1080px;overflow:hidden}section{width:1920px;height:1080px;overflow:hidden;position:relative}aside{display:none}</style></head><body>'''
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1920,'height':1080})
    async def rt(route):
      i=route.request.url.split('/_blob/')[1].split('?')[0]
      f=glob.glob(A+i+'.*'); await route.fulfill(path=f[0]) if f else await route.abort()
    await pg.route('**/_blob/**',rt)
    for n,s in enumerate(order,1):
      html=head+open(f'{D}/slides/{s}.html').read()+'<div style="position:fixed;right:22px;bottom:12px;font:500 15px DM Sans,Arial;color:rgba(128,128,128,.75);z-index:9">© 2026 Rotina do Personal · Professor Maílson (CREF 055013-G/MG)</div></body></html>'
      open('render_tmp.html','w').write(html)
      await pg.goto('http://localhost:8772/scratch_render.html') if False else None
      await pg.set_content(html.replace('src="/_blob/','src="http://x.local/_blob/'),wait_until='networkidle')
      await pg.evaluate('document.fonts.ready')
      await pg.screenshot(path=f'{out}/{n:02d}.jpg',type='jpeg',quality=78)
      import shutil; shutil.copy(f'{out}/{n:02d}.jpg',f'{out}/{s}.jpg')
    await b.close()
json.dump(order,open(out+'/ordem.json','w')); asyncio.run(main()); print(len(order))
