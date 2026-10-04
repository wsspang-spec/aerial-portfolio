import cv2,numpy as np
_cl=cv2.createCLAHE(clipLimit=2.2,tileGridSize=(8,8))
def detail(bgr, lift=0.5, clahe=0.5, sharp=0.8, chroma=1.5):
    lab=cv2.cvtColor(bgr,cv2.COLOR_BGR2LAB); L,A,B=cv2.split(lab); L0=L.astype(np.float32)
    Lf=L0/255; Lf=Lf+lift*(1-Lf)**3*Lf**0.6*2.2
    L8=np.clip(Lf*255,0,255).astype(np.uint8)
    Lm=L8.astype(np.float32)*(1-clahe)+_cl.apply(L8).astype(np.float32)*clahe
    bl=cv2.GaussianBlur(Lm,(0,0),2.5); Lm=Lm+sharp*(Lm-bl)
    m=np.clip((0.55-L0/255)/0.25,0,1); m=cv2.GaussianBlur(m,(0,0),6)
    Lo=L0*(1-m)+Lm*m
    k=1+(chroma-1)*m
    A=np.clip(128+(A.astype(np.float32)-128)*k,0,255).astype(np.uint8); B=np.clip(128+(B.astype(np.float32)-128)*k,0,255).astype(np.uint8)
    return cv2.cvtColor(cv2.merge([np.clip(Lo,0,255).astype(np.uint8),A,B]),cv2.COLOR_LAB2BGR)
