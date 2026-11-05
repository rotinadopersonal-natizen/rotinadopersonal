import re,zlib,base64,sys
s=open('/home/claude/rotinadopersonal/index.html').read()
m=re.search(r'(<script type="text/plain" id="appjs" data-z="1">)([\s\S]*?)(</script>)',s)
open('app.js','w').write(zlib.decompress(base64.b64decode(m.group(2).strip()),-15).decode())
open('shell.html','w').write(s[:m.start(2)]+'%%APPJS%%'+s[m.end(2):])
print('unpacked', len(s))
