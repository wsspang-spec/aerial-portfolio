import cv2,numpy as np,subprocess,sys
W,H=480,270
for p in sys.argv[1:]:
    b=subprocess.run(['ffmpeg','-v','error','-i',p,'-vf',f'scale={W}:{H},format=gray','-f','rawvideo','-'],capture_output=True).stdout
    n=len(b)//(W*H); f=np.frombuffer(b[:n*W*H],np.uint8).reshape(n,H,W).astype(np.float32); win=cv2.createHanningWindow((W,H),cv2.CV_32F)
    mv=np.array([cv2.phaseCorrelate(f[i-1],f[i],win)[0] for i in range(1,n)]); sp=np.hypot(mv[:,0],mv[:,1]); j=np.r_[0,np.abs(np.diff(mv,axis=0)).sum(1)]
    print(p[-30:], ' '.join(f"{k}s:{sp[k*30:(k+1)*30].mean():.2f}/{j[k*30:(k+1)*30].mean():.2f}" for k in range(len(sp)//30)))
