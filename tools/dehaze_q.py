import cv2,numpy as np,subprocess,sys
src,start,dur,out=sys.argv[1],float(sys.argv[2]),float(sys.argv[3]),sys.argv[4]
exec(open('porto_grade.py').read().split('def export')[0])
W,H=2560,1440
dec=subprocess.Popen(['ffmpeg','-v','error','-ss',str(start),'-i',src,'-t',str(dur),'-vf',f'scale={W}:{H}:flags=lanczos','-f','rawvideo','-pix_fmt','bgr24','-'],stdout=subprocess.PIPE)
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','30000/1001','-i','-','-c:v','libx264','-crf','10','-preset','fast','-pix_fmt','yuv420p',out],stdin=subprocess.PIPE)
col=np.array([0.0,0.55,1.0],np.float32); n=0
while True:
    b=dec.stdout.read(W*H*3)
    if len(b)<W*H*3: break
    im=np.frombuffer(b,np.uint8).reshape(H,W,3).astype(np.float32)/255
    sm=cv2.resize(im,(640,360)); dc=cv2.erode(sm.min(2),np.ones((5,5)))
    base=np.median(dc[:,448:],axis=1,keepdims=True); veil=np.clip(cv2.GaussianBlur(dc-base,(0,0),15),0,1)
    veil=cv2.resize(veil,(W,H))[...,None]
    x=np.clip((im-veil*col)/np.maximum(1-veil,0.4),0,1)
    g=porto((x*255).astype(np.uint8),dehaze=0.04,warm=0.6,orange_boost=1.2,sat=1.04,curve=0.05)
    enc.stdin.write(g.tobytes()); n+=1
enc.stdin.close(); enc.wait(); print(out,n)
