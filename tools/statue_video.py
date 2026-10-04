import cv2, numpy as np, sys, subprocess, os
sys.argv_saved=sys.argv; 
src,start,dur,out=sys.argv[1],float(sys.argv[2]),float(sys.argv[3]),sys.argv[4]
kw=dict(a.split('=') for a in sys.argv[5:]); kw={k:float(v) for k,v in kw.items()}
exec(open('porto_grade.py').read().split('def export')[0])
exec(open('statue_fx.py').read())
W,H=2560,1440
vf=(os.environ['CROP']+',' if os.environ.get('CROP') else '')+f'scale={W}:{H}:flags=lanczos'
dec=subprocess.Popen(['ffmpeg','-v','error','-ss',str(start),'-i',src,'-t',str(dur),'-vf',vf,'-f','rawvideo','-pix_fmt','bgr24','-'],stdout=subprocess.PIPE)
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','30000/1001','-i','-','-c:v','libx264','-crf','10','-preset','fast','-pix_fmt','yuv420p',out],stdin=subprocess.PIPE)
n=0
while True:
    b=dec.stdout.read(W*H*3)
    if len(b)<W*H*3: break
    im=np.frombuffer(b,np.uint8).reshape(H,W,3); g=detail(porto(im,**kw)); enc.stdin.write(g.tobytes()); n+=1
    if n==45: cv2.imwrite(out.replace('.mp4','_mid.jpg'),cv2.resize(np.hstack([im,g]),(1920,540)))
enc.stdin.close(); enc.wait(); print(out,n)
