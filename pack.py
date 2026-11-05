import zlib,base64,subprocess,sys,re,time
W='./'  # pasta com app.js e shell.html (gerados pelo unpack.py); uso: python3 pack.py caminho/do/index.html
r=subprocess.run(['node','--check',W+'app.js'],capture_output=True,text=True)
if r.returncode: print(r.stderr[:800]); sys.exit(1)
c=open(W+'app.js').read(); co=zlib.compressobj(9,zlib.DEFLATED,-15); z=co.compress(c.encode())+co.flush()
sh=open(W+'shell.html').read()
sh,n=re.subn(r'window\.RP_BUILD="\d+"','window.RP_BUILD="%d"'%int(time.time()*1000),sh); assert n==1
open(W+'shell.html','w').write(sh)
out=sh.replace('%%APPJS%%',base64.b64encode(z).decode())
for p in sys.argv[1:]: open(p,'w').write(out)
print('packed',len(out))
