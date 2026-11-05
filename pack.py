import zlib,base64,subprocess,sys
c=open('app.js').read()
r=subprocess.run(['node','--check','app.js'],capture_output=True,text=True)
if r.returncode: print(r.stderr[:800]); sys.exit(1)
co=zlib.compressobj(9,zlib.DEFLATED,-15); z=co.compress(c.encode())+co.flush()
out=open('shell.html').read().replace('%%APPJS%%',base64.b64encode(z).decode())
open('/home/claude/work/site/index.html','w').write(out)
print('packed ->site', len(out))
