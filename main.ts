import{readFileSync as r,writeFileSync as w,mkdirSync as m}from"node:fs";
function run(p,inp){
 const s=new Int32Array(257);let sp=0;
 const c=new Int32Array(64);let cp=0;
 const M=new Int32Array(256),o=new Uint8Array(65536);
 let ol=0,pc=0,st=0,ip=0;const n=p.length;
 const T=x=>[o.subarray(0,ol),x];
 for(;;){
  if(st>=1e6)return T(10);
  if(pc<0||pc>=n)return T(9);
  const a=p[pc];
  if(!(a<8||a>15&&a<31||a>31&&a<35||a>47&&a<53||a==64||a==65||a>79&&a<84))return T(5);
  const l=a==1?1:a==2?4:a>47&&a<52?2:0;
  if(pc+1+l>n)return T(9);
  st++;
  switch(a){
   case 0:return T(0);
   case 1:
    if(sp>=256)return T(3);
    s[sp++]=p[pc+1]>127?p[pc+1]-256:p[pc+1];pc+=2;break;
   case 2:
    if(sp>=256)return T(3);
    s[sp++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;pc+=5;break;
   case 3:if(sp<1)return T(2);sp--;pc++;break;
   case 4:
    if(sp<1)return T(2);if(sp>=256)return T(3);
    s[sp]=s[sp-1];sp++;pc++;break;
   case 5:
    if(sp<2)return T(2);
    {const t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t}pc++;break;
   case 6:
    if(sp<2)return T(2);if(sp>=256)return T(3);
    s[sp]=s[sp-2];sp++;pc++;break;
   case 7:
    if(sp<3)return T(2);
    {const t=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=t}pc++;break;
   case 16:case 17:case 18:case 19:case 20:case 21:case 22:
   case 24:case 25:case 26:case 28:case 29:case 30:case 32:
   case 33:case 34:{
    if(sp<2)return T(2);
    const b=s[--sp],x=s[--sp];let v;
    if(a==16)v=x+b|0;else if(a==17)v=x-b|0;else if(a==18)v=Math.imul(x,b);
    else if(a==19){if(!b)return T(4);v=x/b|0}
    else if(a==20){if(!b)return T(4);v=x%b}
    else if(a==21){if(!b)return T(4);v=Math.trunc((x>>>0)/(b>>>0))|0}
    else if(a==22){if(!b)return T(4);v=(x>>>0)%(b>>>0)|0}
    else if(a==24)v=x&b;else if(a==25)v=x|b;else if(a==26)v=x^b;
    else if(a==28)v=x<<b;else if(a==29)v=x>>b;
    else if(a==30)v=x>>>b|0;
    else if(a==32)v=x==b?1:0;else if(a==33)v=x<b?1:0;
    else v=(x>>>0)<(b>>>0)?1:0;
    s[sp++]=v;pc++;break}
   case 23:
    if(sp<1)return T(2);s[sp-1]=-s[sp-1]|0;pc++;break;
   case 27:
    if(sp<1)return T(2);s[sp-1]=~s[sp-1];pc++;break;
   case 48:case 49:case 50:{
    let f=p[pc+1]|p[pc+2]<<8;if(f>32767)f-=65536;
    if(a==48)pc+=3+f;
    else{if(sp<1)return T(2);const v=s[--sp];
     if(a==49&&v==0||a==50&&v!=0)pc+=3+f;else pc+=3}
    break}
   case 51:
    if(cp>=64)return T(7);
    c[cp++]=pc+3;pc=p[pc+1]|p[pc+2]<<8;break;
   case 52:if(!cp)return T(8);pc=c[--cp];break;
   case 64:
    if(sp<1)return T(2);
    {const d=s[sp-1];if(d<0||d>255)return T(6);s[sp-1]=M[d]}pc++;break;
   case 65:
    if(sp<2)return T(2);
    {const d=s[--sp],v=s[--sp];if(d<0||d>255)return T(6);M[d]=v}pc++;break;
   case 80:
    if(sp<1)return T(2);
    {const v=s[--sp],g=String(v);
     if(ol+g.length>65536)return T(11);
     for(let i=0;i<g.length;i++)o[ol++]=g.charCodeAt(i)}pc++;break;
   case 81:
    if(sp<1)return T(2);
    if(ol>=65536)return T(11);
    o[ol++]=s[--sp]&255;pc++;break;
   case 82:
    if(sp>=256)return T(3);
    s[sp++]=ip<inp.length?inp[ip++]:-1;pc++;break;
   case 83:
    if(sp<1)return T(2);return T(s[--sp]&255);
  }
 }
}
const IN=process.env.MAKEFUN_INPUT_DIR||"/input",OU=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let i=1;i<41;i++){
 const d="i"+String(i).padStart(3,"0");
 const p=r(`${IN}/${d}/program.bin`),q=r(`${IN}/${d}/input.bin`);
 const[b,e]=run(p,q);
 m(`${OU}/${d}`,{recursive:true});
 w(`${OU}/${d}/stdout.bin`,b);
 w(`${OU}/${d}/exit.txt`,String(e));
}
