import subprocess
D=3.2; X=0.5
order=[('q01.mp4',0),('q02c.mp4',0),('p16c.mp4',0),('p06.mp4',0),('p07e.mp4',0),('p15c.mp4',0),('p04b.mp4',0),('p02b.mp4',0),('p13e.mp4',0),('p03.mp4',0),('p12c.mp4',0),('p05.mp4',0)]
dur=lambda f: float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).strip())
args=['ffmpeg','-v','error','-y']; fc=''; lens=[]
for i,o in enumerate(order):
    f,st=o[0],o[1]
    d=o[2] if len(o)>2 else min(D,dur(f)-st-0.02); args+=['-i',f]
    if i==0: fc+=f"[0:v]trim=start={st+X}:duration={d-X},setpts=PTS-STARTPTS,fps=30000/1001[v0];"; lens.append(d-X)
    else: fc+=f"[{i}:v]trim=start={st}:duration={d},setpts=PTS-STARTPTS,fps=30000/1001[v{i}];"; lens.append(d)
n=len(order); args+=['-i',order[0][0]]
fc+=f"[{n}:v]trim=start={order[0][1]}:duration={X},setpts=PTS-STARTPTS,fps=30000/1001[v{n}];"; lens.append(X)
cur='v0'; total=lens[0]
for i in range(1,n+1):
    fc+=f"[{cur}][v{i}]xfade=transition=fade:duration={X}:offset={total-X:.4f}[x{i}];"; total+=lens[i]-X; cur=f"x{i}"
args+=['-filter_complex',fc.rstrip(';'),'-map',f'[{cur}]','-c:v','libx264','-crf','14','-preset','veryfast','-pix_fmt','yuv420p','v8_master.mp4']
subprocess.run(args,check=True); print('total',round(total,2))
