"""Speech-recognition QA: flags voice lines whose transcript drifts from the script.
Usage: python3 asr.py episodes/<topic>.py   (after build.py)
"""
import json, re, hashlib, os, difflib, sys
HERE=os.path.dirname(os.path.abspath(__file__))
from faster_whisper import WhisperModel
ns={}; exec(open(sys.argv[1]).read(), ns)
V=ns['VOICES']; m=WhisperModel('base.en', device='cpu', compute_type='int8', cpu_threads=2)
norm=lambda s: re.sub(r"[^a-z0-9 ]","",s.lower().replace('-',' ')).split()
items=[]
for b in ns['B']:
    if b['type']=='line': items.append((b['who'],b['text']))
    if b['type']=='challenge': items += [('centi',b['qs']),('centi',b['as_'])]
bad=[]
for who,text in items:
    key=hashlib.sha1(json.dumps([V[who],text]).encode()).hexdigest()[:16]
    f=os.path.join(HERE,'tts_cache',f'{who}_{key}.wav')
    import soundfile as sf, numpy as np
    au,sr=sf.read(f,dtype='float32'); au=au.mean(1) if au.ndim>1 else au
    au=np.interp(np.arange(0,len(au),sr/16000),np.arange(len(au)),au).astype('float32')
    segs,_=m.transcribe(au, language='en', beam_size=1)
    hyp=' '.join(s.text for s in segs)
    a,b_=norm(text),norm(hyp); r=difflib.SequenceMatcher(None,a,b_).ratio()
    if r<0.85: bad.append((round(r,2),who,text,hyp))
for x in sorted(bad): print(x)
print('checked',len(items),'flagged',len(bad))
