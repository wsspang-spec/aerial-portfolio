import cv2,numpy as np,subprocess,sys
src,out=sys.argv[1],sys.argv[2]; W,H=2560,1440
dec=subprocess.Popen(['ffmpeg','-v','error','-i',src,'-f','rawvideo','-pix_fmt','bgr24','-'],stdout=subprocess.PIPE)
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','30000/1001','-i','-','-c:v','libx264','-crf','10','-preset','fast','-pix_fmt','yuv420p',out],stdin=subprocess.PIPE)
while True:
    b=dec.stdout.read(W*H*3)
    if len(b)<W*H*3: break
    x=np.frombuffer(b,np.uint8).reshape(H,W,3).astype(np.float32)/255
    hsv=cv2.cvtColor(x,cv2.COLOR_BGR2HSV); Hh,S,V=cv2.split(hsv)
    d=np.minimum(np.abs(Hh-18),360-np.abs(Hh-18)); o=np.clip(1-d/22,0,1)*np.clip((S-0.12)/0.12,0,1)
    S=np.clip(S*(1+0.30*o),0,1); V=np.clip(V*(1+0.05*o),0,1); Hh=Hh+(16-Hh)*0.25*o
    w=np.clip(1-np.abs(Hh-205)/45,0,1)*np.clip((S-0.08)/0.1,0,1)
    Hh=Hh+(205-Hh)*0.5*w; S=np.clip(S*(1+0.18*w),0,1); V=np.clip(V*(1+0.10*w)+0.02*w,0,1)
    y=cv2.cvtColor(cv2.merge([Hh%360,S,V]),cv2.COLOR_HSV2BGR)
    enc.stdin.write((np.clip(y,0,1)*255).astype(np.uint8).tobytes())
enc.stdin.close(); enc.wait(); print(out)
