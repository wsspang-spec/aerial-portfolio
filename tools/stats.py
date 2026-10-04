import cv2,numpy as np,subprocess,sys
for f in sys.argv[1:]:
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
    out=[]
    for t in (0.6,d/2,d-0.6):
        b=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',f,'-frames:v','1','-vf','scale=640:360','-f','rawvideo','-pix_fmt','bgr24','-'],capture_output=True).stdout
        out.append(np.frombuffer(b,np.uint8).reshape(360,640,3))
    im=np.concatenate(out); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(float); L=cv2.cvtColor(im,cv2.COLOR_BGR2LAB).astype(float)
    y=L[...,0]/2.55
    print(f"{f:10s} L={y.mean():5.1f} p2={np.percentile(y,2):4.1f} p98={np.percentile(y,98):5.1f} sat={hsv[...,1].mean():5.1f} a={L[...,1].mean()-128:+5.1f} b={L[...,2].mean()-128:+5.1f}")
