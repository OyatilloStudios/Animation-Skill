/* ================= MOTION ENGINE v1 — scene-script → studio-quality film =================
   The AI (or you) writes ONLY a short FILM({...}) script. Layout, easing, transitions, sound,
   safe areas, text fitting, export hooks are handled here (tested code).
   Requires motionkit.js + audiokit.js loaded first (motion-engine.js bundles all three). */
(function(){
'use strict';
const THEMES={
  dark:{bg:'#0B0B0D',bg2:'#17171C',ink:'#F4F1EA',dim:'rgba(244,241,234,.52)',accent:'#FF4A1C',accent2:'#2DE1C2',onAccent:'#0B0B0D'},
  light:{bg:'#F3EFE6',bg2:'#E4DED1',ink:'#141416',dim:'rgba(20,20,22,.55)',accent:'#FF4A1C',accent2:'#2B59FF',onAccent:'#FFFFFF'},
  neon:{bg:'#07060F',bg2:'#15122B',ink:'#F2F0FF',dim:'rgba(242,240,255,.5)',accent:'#B6FF3B',accent2:'#8B6CFF',onAccent:'#07060F'},
  navy:{bg:'#0A1122',bg2:'#13203D',ink:'#EEF2FF',dim:'rgba(238,242,255,.52)',accent:'#FFB020',accent2:'#4FD1FF',onAccent:'#0A1122'},
  warm:{bg:'#17100D',bg2:'#2A1C16',ink:'#FFF4E8',dim:'rgba(255,244,232,.52)',accent:'#FF8A3D',accent2:'#FFD166',onAccent:'#17100D'},
  mono:{bg:'#050505',bg2:'#161616',ink:'#FFFFFF',dim:'rgba(255,255,255,.5)',accent:'#FFFFFF',accent2:'#9A9A9A',onAccent:'#050505'}
};
const FORMATS={'16:9':[1920,1080],'9:16':[1080,1920],'1:1':[1080,1080],'4:5':[1080,1350]};
const TRANS=['zoom','wipe','slide','zoom','flash'];
let C,ctx,W,H,U,UT,BW,cx,cy,SAFE,SAFE_T,SAFE_B,IW,T,SANS,MONO,BPM,BEAT,BAR,DUR,FPS,S=[],CFG,ERR=[],GUIDES=false;
const IMG={};let MUSIC=null;

/* ---------- text helpers ---------- */
const F=(px,w=800,fam=SANS)=>`${w} ${Math.round(px)}px ${fam}`;
function rich(str){ // "*word*" → accent
  const out=[];let acc=false;
  String(str).split(/(\s+)/).forEach(tok=>{if(!tok||/^\s+$/.test(tok))return;
    let w=tok,a=acc;if(w.startsWith('*')){a=true;w=w.slice(1)}let end=false;if(w.endsWith('*')){end=true;w=w.slice(0,-1)}
    if(w.startsWith('*')){a=true;w=w.slice(1)}acc=a&&!end;out.push({w,acc:a})});
  return out;
}
// layout rich text into ≤maxLines lines that fit maxW×maxH, largest size ≤ maxPx. Supports \n forced breaks.
function layout(str,maxW,maxH,maxPx,weight=800,fam=SANS,maxLines=3,lh=1.04,track=0){
  const paras=String(str).split('\n').map(rich);
  for(let px=maxPx;px>=10;px*=.96){
    ctx.font=F(px,weight,fam);ctx.letterSpacing=(track*px)+'px';
    const sp=ctx.measureText(' ').width,lines=[];let ok=true;
    for(const words of paras){let cur=[],cw=0;
      for(const w of words){const ww=ctx.measureText(w.w).width-track*px;if(ww>maxW){ok=false;break}
        const nw=cur.length?cw+sp+ww:ww;if(nw>maxW&&cur.length){lines.push({words:cur,width:cw});cur=[];cw=0}
        cur.push({...w,width:ww});cw=cur.length>1?cw+sp+ww:ww}
      if(!ok)break;if(cur.length)lines.push({words:cur,width:cw})}
    ctx.letterSpacing='0px';
    if(!ok||lines.length>maxLines||lines.length*px*lh>maxH)continue;
    lines.forEach(L=>{let x=-L.width/2;L.words.forEach(w=>{w.x=x;x+=w.width+sp})});
    return {lines,px,lh:px*lh,weight,fam,track:track*px,h:lines.length*px*lh};
  }
  return {lines:[],px:10,lh:10,weight,fam,track:0,h:0};
}
function fit(str,maxW,maxPx,weight=800,fam=SANS,track=0){let px=maxPx;const w=measure(ctx,str,F(px,weight,fam),track*px);if(w>maxW)px*=maxW/w;return Math.floor(px)}
function word(w,x,y,L,color){ctx.font=F(L.px,L.weight,L.fam);ctx.letterSpacing=L.track+'px';ctx.fillStyle=color;ctx.textAlign='left';ctx.fillText(w,x,y);ctx.letterSpacing='0px'}
// draw a laid-out block with per-word animation fn(k,li)->{p,dy,dx,a}. Returns baseline of last line.
function drawBlock(L,x,yTop,anim,{align='center',mask=true,color}={}){
  let k=0,base=yTop;
  L.lines.forEach((line,li)=>{base=yTop+li*L.lh+L.px*.82;const off=align==='left'?line.width/2:align==='right'?-line.width/2:0;
    if(mask){ctx.save();ctx.beginPath();ctx.rect(0,base-L.px*1.0,W,L.px*1.28);ctx.clip()}
    line.words.forEach(w=>{const a=anim(k++,li);if(a.a<=0)return;ctx.save();ctx.globalAlpha*=a.a;
      word(w.w,x+w.x+off+(a.dx||0),base+(a.dy||0),L,w.acc?T.accent:(color||T.ink));ctx.restore()});
    if(mask)ctx.restore()});
  return base;
}
const rise=(lt,st,dur=.8,dist=1)=>k=>{const p=E.outExpo(prog(lt,st+k*.06,st+k*.06+dur));return {a:p>0?1:0,dy:(1-p)*dist}};
function label(s,x,y,{size=24,color=T.dim,track=.22,align='center',font=MONO,weight=600,a=1}={}){
  if(!s)return;ctx.save();ctx.globalAlpha*=a;ctx.font=F(size*UT,weight,font);ctx.letterSpacing=(track*size*UT)+'px';ctx.fillStyle=color;
  ctx.textAlign=align;ctx.fillText(s,x-(align==='center'?track*size*UT/2:0),y);ctx.restore()}
function rrect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,Math.min(r,h/2,w/2))}

/* ---------- background & finish ---------- */
let BGG,VIG,GRAIN=[];
function prepFinish(){
  BGG=ctx.createRadialGradient(cx,cy*.85,0,cx,cy,Math.max(W,H)*.75);BGG.addColorStop(0,T.bg2);BGG.addColorStop(1,T.bg);
  VIG=ctx.createRadialGradient(cx,cy,Math.min(W,H)*.35,cx,cy,Math.hypot(W,H)*.62);VIG.addColorStop(0,'rgba(0,0,0,0)');VIG.addColorStop(1,'rgba(0,0,0,'+(CFG.vignette??.55)+')');
  for(let k=0;k<4;k++){const g=document.createElement('canvas');g.width=g.height=256;const x=g.getContext('2d'),id=x.createImageData(256,256);
    for(let i=0;i<256*256;i++){const v=rnd(i*1.37+k*91.1)*255;id.data[i*4]=id.data[i*4+1]=id.data[i*4+2]=v;id.data[i*4+3]=255}x.putImageData(id,0,0);GRAIN.push(ctx.createPattern(g,'repeat'))}
}
function drawBG(t){
  ctx.fillStyle=T.bg;ctx.fillRect(0,0,W,H);ctx.fillStyle=BGG;ctx.fillRect(0,0,W,H);
  if(CFG.grid){ctx.strokeStyle=T.ink;ctx.globalAlpha=.035;ctx.lineWidth=1;const g=120*U;
    for(let x=(W/2)%g;x<W;x+=g){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
    for(let y=(H/2)%g;y<H;y+=g){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}ctx.globalAlpha=1}
  if(CFG.dust!==false){ctx.fillStyle=T.ink;for(let i=0;i<70;i++){const sp=(8+rnd(i+3)*26)*U,x=((rnd(i)*W+t*sp)%W+W)%W,y=rnd(i+.5)*H+Math.sin(t*.5+i)*12*U;
    ctx.globalAlpha=.05+rnd(i+9)*.16;const r=(.7+rnd(i+7)*1.6)*U;ctx.fillRect(x-r,y-r,r*2,r*2)}ctx.globalAlpha=1}
}
function drawFinish(t){
  ctx.fillStyle=VIG;ctx.fillRect(0,0,W,H);
  if(CFG.grain!==false&&CFG.grain!==0){ // static grain by default (tiny files); grain:'film' = animated 12 fps (much bigger MP4)
    const film=CFG.grain==='film',fr=film?Math.floor(t*12):0;ctx.save();ctx.globalAlpha=typeof CFG.grain==='number'?CFG.grain:.03;ctx.fillStyle=GRAIN[fr%4];
    ctx.translate((rnd(fr)*256)|0,(rnd(fr+.3)*256)|0);ctx.fillRect(-256,-256,W+512,H+512);ctx.restore()}
}

/* ---------- SCENE LIBRARY ---------- */
const LIB={};
// 1 TITLE — headline rises word-by-word from masks, accent underline, kicker + subtitle
LIB.title={bars:1,prep(s){s.L=layout(s.text,IW,H*.42,(s.size||1)*Math.min(200*UT,BW*.12),800,SANS,3,1.02,-.01)},
  draw(lt,d,s){const L=s.L,subPx=Math.max(30*U,Math.min(46*U,L.px*.24));
    const bh=L.h+(s.sub?subPx*2.2:0)+(s.kicker?70*U:0);let y=cy-bh/2;
    if(s.kicker){const n=Math.floor(prog(lt,0,.5)*s.kicker.length);label(s.kicker.slice(0,n),cx,y+26*U,{color:T.accent,size:24});y+=70*U}
    const last=drawBlock(L,cx,y,rise(lt,.08,.8,L.lh));
    const uw=lerp(0,Math.min(L.lines.at(-1)?.width*.4||200,320*U),E.outExpo(prog(lt,.55,1.3)));
    ctx.fillStyle=T.accent;ctx.fillRect(cx-uw/2,last+L.px*.24,uw,Math.max(4,6*U));
    if(s.sub){const p=E.outExpo(prog(lt,.7,1.4));label(s.sub,cx,last+L.px*.24+subPx*1.75+(1-p)*24*U,{font:SANS,weight:500,size:subPx/U,track:.02,color:T.dim,a:p})}}};
// 2 WORDS — kinetic type: one word slams per beat (great for quotes, hooks, lyrics)
LIB.words={bars:s=>Math.max(1,Math.ceil(rich(s.text).length/(s.perBeat||1)/4+.25)),
  prep(s){s.W=rich(s.text);s.px=s.W.map(w=>fit(w.w,IW,(s.size||1)*Math.min(260*UT,BW*.15),900))},
  draw(lt,d,s){const n=s.W.length,span=Math.min(BEAT/(s.perBeat||1),(d-.4)/n),k=Math.min(n-1,Math.floor(lt/span)),loc=lt-k*span;
    const drawW=(i,sc,a)=>{const w=s.W[i];ctx.save();ctx.globalAlpha*=a;ctx.translate(cx,cy);ctx.scale(sc,sc);ctx.font=F(s.px[i],900);ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillStyle=w.acc?T.accent:T.ink;ctx.fillText(w.w,0,s.px[i]*.04);ctx.restore()};
    if(k>0&&loc<.12)drawW(k-1,lerp(1,.88,loc/.12),1-loc/.12);
    drawW(k,lerp(1.5,1,E.outExpo(prog(loc,0,.28))),prog(loc,0,.06));
    ctx.globalAlpha=1}};
// 3 SCRAMBLE — decode/hacker text in mono with animated brackets
LIB.scramble={bars:1,prep(s){s.px=fit(s.text,IW*.82,(s.size||1)*150*UT,700,MONO,.04);s.w=measure(ctx,s.text,F(s.px,700,MONO),s.px*.04)},
  draw(lt,d,s){const p=prog(lt,.12,1.25),y=cy+s.px*.34;
    drawScramble(ctx,s.text,cx,y,p,{font:F(s.px,700,MONO),color:T.ink,track:s.px*.04,frame:Math.floor(lt*24)});
    if(p>=1&&Math.floor(lt*2.6)%2===0){ctx.fillStyle=T.accent;ctx.fillRect(cx+s.w/2+s.px*.12,cy-s.px*.42,s.px*.5,s.px*.84)}
    const e=E.outExpo(prog(lt,0,.7)),bw=(s.w/2+70*U)*lerp(1.35,1,e),bh=(s.px*.95)*lerp(1.6,1,e),L=42*U;
    ctx.strokeStyle=T.accent;ctx.lineWidth=3*U;ctx.globalAlpha=e;
    for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const x=cx+sx*bw,y2=cy+sy*bh;ctx.beginPath();ctx.moveTo(x-sx*L,y2);ctx.lineTo(x,y2);ctx.lineTo(x,y2-sy*L);ctx.stroke()}
    ctx.globalAlpha=1;
    if(s.sub)drawScramble(ctx,s.sub,cx,cy+bh+64*U,prog(lt,.7,1.6),{font:F(26*U,600,MONO),color:T.accent2,track:6*U,frame:Math.floor(lt*24)+7})}};
// 4 PARTICLES — a particle cloud converges into the text, then disperses
LIB.particles={bars:2,prep(s){const px=fit(s.text,IW*.9,(s.size||1)*Math.min(250*UT,BW*.14),900);s.px=px;
    let step=Math.max(3,Math.round(5*U)),pts;do{pts=samplePoints(g=>{g.font=F(px,900);g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(s.text,W/2,H/2)},W,H,step);step++}while(pts.length>2600);
    s.P=pts.map(([x,y],i)=>{const a=rnd(i*3.1)*TAU,r=(.35+rnd(i*7.7)*.7)*Math.max(W,H);return {tx:x,ty:y,sx:cx+Math.cos(a)*r,sy:cy+Math.sin(a)*r*.7,dl:rnd(i*1.9)*.55,ac:rnd(i*5.3)<.14,r:(1.6+rnd(i*2.3)*1.6)*U,ph:rnd(i)*TAU}})},
  draw(lt,d,s){const ex=E.inExpo(prog(lt,d-.5,d)),last=s.i===S.length-1;
    for(const grp of [false,true]){ctx.fillStyle=grp?T.accent:T.ink;
      for(const q of s.P){if(q.ac!==grp)continue;const c=E.outExpo(prog(lt,.1+q.dl,1.25+q.dl));
        let x=lerp(q.sx,q.tx,c)+Math.sin(lt*1.4+q.ph)*(1-c)*60*U+Math.sin(lt*3+q.ph)*1.1*U,y=lerp(q.sy,q.ty,c)+Math.cos(lt*1.1+q.ph)*(1-c)*60*U+Math.cos(lt*2.6+q.ph)*1.1*U;
        let a=.45+.55*c;if(!last&&ex>0){x+=((q.tx-cx)*.9+Math.cos(q.ph)*260*U)*ex;y+=((q.ty-cy)*.9+Math.sin(q.ph)*260*U)*ex;a*=1-ex}
        ctx.globalAlpha=a;ctx.fillRect(x-q.r/2,y-q.r/2,q.r,q.r)}}
    ctx.globalAlpha=prog(lt,1.55,2.0)*(1-ex)*.92;ctx.font=F(s.px,900);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=T.ink;ctx.fillText(s.text,cx,cy);ctx.globalAlpha=1;ctx.textBaseline='alphabetic';
    if(s.sub)label(s.sub,cx,cy+s.px*.62+60*U,{a:prog(lt,1.6,2.1)*(1-ex),color:T.accent2})}};
// 5 COUNTER — big number counts up with ghost digits, label and progress bar
const fmtNum=(v,dec,sep)=>{const s=v.toFixed(dec);let [i,f]=s.split('.');i=i.replace(/\B(?=(\d{3})+(?!\d))/g,sep);return f?i+'.'+f:i};
LIB.counter={bars:2,prep(s){s.dec=s.decimals??(String(s.value).split('.')[1]||'').length;s.sep=s.sep??' ';
    s.final=(s.prefix||'')+fmtNum(+s.value,s.dec,s.sep)+(s.suffix||'');s.px=fit(s.final,IW,(s.size||1)*Math.min(300*UT,BW*.17),800);
    ctx.font=F(s.px,800);s.adv=[...s.final].map(ch=>ctx.measureText(ch).width);s.w=s.adv.reduce((a,b)=>a+b,0);s.cd=s.countDur||1.8},
  draw(lt,d,s){const p=E.outQuart(prog(lt,.2,.2+s.cd)),land=lt-.2-s.cd,pop=land>0?1+.05*Math.exp(-land*7)*Math.cos(land*22):1;
    const num=fmtNum(+s.value*p,s.dec,s.sep),digits=fmtNum(+s.value,s.dec,s.sep);const cur=(s.prefix||'')+num.padStart(digits.length,' ')+(s.suffix||'');
    const shownFinal=[...s.final],curCh=[...cur];const ap=prog(lt,0,.3);
    ctx.save();ctx.translate(cx,cy);ctx.scale(pop,pop);ctx.font=F(s.px,800);ctx.textAlign='left';let x=-s.w/2;const y=s.px*.34;
    shownFinal.forEach((ch,i)=>{let g=curCh[i]===' '&&/\d/.test(ch)?'0':curCh[i];const ghost=curCh[i]===' '&&/\d/.test(ch);
      if(ch===s.sep&&curCh[i-1]===' ')g=ch;ctx.fillStyle=ghost||(g===s.sep&&curCh[i-1]===' ')?T.dim:T.ink;ctx.globalAlpha=ap*(ghost?.28:1);
      if(i>=(s.prefix||'').length+digits.length||i<(s.prefix||'').length)ctx.fillStyle=T.accent;
      const gw=ctx.measureText(g).width;ctx.fillText(g,x+(s.adv[i]-gw)/2,y);x+=s.adv[i]});ctx.restore();ctx.globalAlpha=1;
    const bw=Math.min(s.w,IW),by=cy+s.px*.62;ctx.fillStyle=T.dim;ctx.globalAlpha=.25*ap;ctx.fillRect(cx-bw/2,by,bw,4*U);ctx.globalAlpha=1;ctx.fillStyle=T.accent;ctx.fillRect(cx-bw/2,by,bw*p,4*U);
    if(s.label){const lp=E.outExpo(prog(lt,.4,1.1));label(s.label,cx,by+70*U+(1-lp)*20*U,{font:SANS,weight:600,size:Math.min(44,s.px/U*.2),track:.04,color:T.ink,a:lp})}
    if(s.sub)label(s.sub,cx,by+130*U,{a:prog(lt,.8,1.4)})}};
// 6 BARS — animated horizontal bar chart (works in every format)
LIB.bars={bars:2,prep(s){s.data=s.data||[];s.max=s.max||Math.max(...s.data.map(r=>+r.value));const n=s.data.length;
    s.tpx=s.title?fit(s.title,IW,(s.size||1)*80*UT,800):0;const top=SAFE_T+(s.title?s.tpx*1.6:0)+30*U,area=H-SAFE_B-top;s.rowH=Math.min(130*U,area/n);s.top=top+(area-s.rowH*n)/2;
    s.lpx=Math.min(40*U,s.rowH*.36);s.lw=Math.max(...s.data.map(r=>measure(ctx,r.label,F(s.lpx,600))));if(s.lw>IW*.38){s.lpx*=IW*.38/s.lw;s.lw=IW*.38}
    s.vw=measure(ctx,fmtNum(s.max,0,' ')+(s.unit||''),F(s.lpx,700,MONO))+30*U;s.bw=IW-s.lw-40*U-s.vw},
  draw(lt,d,s){if(s.title){const p=E.outExpo(prog(lt,0,.8));ctx.save();ctx.beginPath();ctx.rect(0,SAFE_T,W,s.tpx*1.3);ctx.clip();
      ctx.font=F(s.tpx,800);ctx.fillStyle=T.ink;ctx.textAlign='left';ctx.fillText(s.title,SAFE,SAFE_T+s.tpx*.9+(1-p)*s.tpx*1.2);ctx.restore()}
    s.data.forEach((r,i)=>{const st=.3+i*.12,p=E.outExpo(prog(lt,st,st+1.1)),y=s.top+i*s.rowH,th=s.rowH*.42,isMax=+r.value===s.max;
      ctx.globalAlpha=prog(lt,st,st+.3);ctx.font=F(s.lpx,600);ctx.fillStyle=T.ink;ctx.textAlign='right';ctx.fillText(r.label,SAFE+s.lw,y+s.rowH/2+s.lpx*.35);
      const bx=SAFE+s.lw+40*U,w=Math.max(th,s.bw*(+r.value/s.max)*p);ctx.fillStyle=isMax?T.accent:T.ink;ctx.globalAlpha*=isMax?1:.3;rrect(bx,y+s.rowH/2-th/2,w,th,th/2);ctx.fill();
      ctx.globalAlpha=prog(lt,st,st+.3);ctx.font=F(s.lpx,700,MONO);ctx.fillStyle=isMax?T.accent:T.ink;ctx.textAlign='left';
      const dec=(String(r.value).split('.')[1]||'').length;ctx.fillText(fmtNum(+r.value*p,dec,' ')+(s.unit||''),bx+w+24*U,y+s.rowH/2+s.lpx*.35)});ctx.globalAlpha=1}};
// 7 LIST — numbered points stagger in
LIB.list={bars:2,prep(s){s.items=s.items||[];const n=s.items.length;s.tpx=s.title?fit(s.title,IW,(s.size||1)*90*UT,800):0;
    const top=SAFE_T+(s.title?s.tpx*1.7:0),area=H-SAFE_B-top;s.rowH=Math.min(150*UT,area/n);s.top=top+(area-s.rowH*n)/2;
    s.ipx=Math.min(...s.items.map(it=>fit(it,IW-130*U,Math.min(60*UT,s.rowH*.42),600)))},
  draw(lt,d,s){if(s.title){const p=E.outExpo(prog(lt,0,.8));ctx.save();ctx.beginPath();ctx.rect(0,SAFE_T,W,s.tpx*1.3);ctx.clip();ctx.font=F(s.tpx,800);ctx.fillStyle=T.ink;ctx.textAlign='left';ctx.fillText(s.title,SAFE,SAFE_T+s.tpx*.9+(1-p)*s.tpx*1.2);ctx.restore()}
    s.items.forEach((it,i)=>{const st=.3+i*.22,p=E.outExpo(prog(lt,st,st+.9)),y=s.top+i*s.rowH+s.rowH/2;ctx.globalAlpha=prog(lt,st,st+.25);
      label(String(i+1).padStart(2,'0'),SAFE,y+s.ipx*.35,{align:'left',color:T.accent,size:s.ipx/U*.62,weight:700});
      ctx.font=F(s.ipx,600);ctx.fillStyle=T.ink;ctx.textAlign='left';ctx.fillText(it,SAFE+120*U+(1-p)*60*UT,y+s.ipx*.35);
      ctx.fillStyle=T.dim;ctx.globalAlpha*=.4;ctx.fillRect(SAFE,y+s.rowH/2-1,(IW)*p,Math.max(1,1.5*U))});ctx.globalAlpha=1}};
// 8 QUOTE — words fade up in reading order, big accent quote mark, author
LIB.quote={bars:2,prep(s){s.L=layout(s.text,IW*.9,H*.5,(s.size||1)*Math.min(100*UT,BW*.06),600,SANS,6,1.18)},
  draw(lt,d,s){const L=s.L,y=cy-L.h/2-(s.author?30*U:0);ctx.font=F(L.px*2.6,900);ctx.fillStyle=T.accent;ctx.textAlign='center';ctx.globalAlpha=E.outExpo(prog(lt,0,.6));
    ctx.fillText('“',cx,y+L.px*.9-(1-ctx.globalAlpha)*30*U);ctx.globalAlpha=1;
    const n=L.lines.reduce((a,l)=>a+l.words.length,0),per=Math.min(.09,(d*.55)/n);
    const last=drawBlock(L,cx,y+L.px*.9,k=>{const p=E.outCubic(prog(lt,.3+k*per,.3+k*per+.5));return {a:p,dy:(1-p)*18*U}},{mask:false});
    if(s.author){const p=E.outExpo(prog(lt,.4+n*per,.9+n*per));label('— '+s.author,cx,last+90*U+(1-p)*16*U,{color:T.accent2,size:28,a:p})}}};
// 9 IMAGE — full-bleed photo with Ken Burns + scrim + masked caption (placeholder if missing)
LIB.image={bars:2,prep(s){s.L=s.caption?layout(s.caption,IW,H*.3,(s.size||1)*Math.min(120*UT,BW*.075),800,SANS,2,1.02):null},
  draw(lt,d,s){const im=IMG[s.src];const z=lerp(s.zoomFrom??1.14,s.zoomTo??1.0,E.outCubic(prog(lt,0,d))),[fx,fy]=s.focus||[0,0];
    if(im)drawCover(ctx,im,0,0,W,H,z,fx+(s.pan??.25)*(prog(lt,0,d)-.5),fy);
    else{ctx.fillStyle=T.bg2;ctx.fillRect(0,0,W,H);ctx.strokeStyle=T.ink;ctx.globalAlpha=.06;ctx.lineWidth=2*U;for(let x=-H;x<W;x+=40*U){ctx.beginPath();ctx.moveTo(x,H);ctx.lineTo(x+H,0);ctx.stroke()}ctx.globalAlpha=1;
      label('IMAGE · '+(s.src||'src?'),cx,cy,{size:26,color:T.dim})}
    const g=ctx.createLinearGradient(0,H*.45,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.78)');ctx.fillStyle=g;ctx.fillRect(0,H*.45,W,H*.55);
    if(s.L){const base=H-SAFE_B-(s.sub?70*U:0)-s.L.h;drawBlock(s.L,SAFE,base,rise(lt,.25,.8,s.L.lh),{align:'left',color:'#FFFFFF'});
      if(s.sub)label(s.sub,SAFE,H-SAFE_B-10*U,{align:'left',color:'rgba(255,255,255,.75)',a:prog(lt,.8,1.3),size:26})}}};
// 10 SPLIT — two-sided contrast (before/after, vs)
LIB.split={bars:1,prep(s){const vert=H>W;s.vert=vert;const half=(vert?H:W)/2;const mw=vert?IW:half-2*SAFE*.8;
    s.pl=fit(s.left||'',mw,(s.size||1)*170*U,900);s.pr=fit(s.right||'',mw,(s.size||1)*170*U,900);s.px=Math.min(s.pl,s.pr)},
  draw(lt,d,s){const p=E.outExpo(prog(lt,0,.75)),v=s.vert,mid=v?lerp(H,H/2,p):lerp(W,W/2,p);
    ctx.fillStyle=T.accent;if(v)ctx.fillRect(0,mid,W,H-mid);else ctx.fillRect(mid,0,W-mid,H);
    const pa=E.outExpo(prog(lt,.15,.9)),pb=E.outExpo(prog(lt,.35,1.1));ctx.font=F(s.px,900);ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.save();ctx.beginPath();v?ctx.rect(0,0,W,mid):ctx.rect(0,0,mid,H);ctx.clip();ctx.fillStyle=T.ink;ctx.globalAlpha=pa;v?ctx.fillText(s.left,cx,H/4+(1-pa)*80*U):ctx.fillText(s.left,W/4,cy+(1-pa)*80*U);ctx.restore();
    ctx.save();ctx.beginPath();v?ctx.rect(0,mid,W,H-mid):ctx.rect(mid,0,W-mid,H);ctx.clip();ctx.fillStyle=T.onAccent;ctx.globalAlpha=pb;v?ctx.fillText(s.right,cx,H*.75+(1-pb)*80*U):ctx.fillText(s.right,W*.75,cy+(1-pb)*80*U);ctx.restore();
    if(s.label!==''){const sp=spring(lt-.55,{stiffness:260,damping:16}),r=62*U*sp;if(r>0){ctx.fillStyle=T.bg;ctx.beginPath();v?ctx.arc(cx,H/2,r,0,TAU):ctx.arc(W/2,cy,r,0,TAU);ctx.fill();
      ctx.font=F(36*U*sp,800);ctx.fillStyle=T.ink;v?ctx.fillText(s.label||'VS',cx,H/2+2*U):ctx.fillText(s.label||'VS',W/2,cy+2*U)}}ctx.textBaseline='alphabetic'}};
// 11 SHAPE3D — rotating wireframe solid above a title (no overlap by construction)
const SOLIDS={cube:{v:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],e:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]},
  octa:{v:[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(p=>p.map(c=>c*1.45)),e:[[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]]}};
(()=>{const p=(1+Math.sqrt(5))/2,v=[[-1,p,0],[1,p,0],[-1,-p,0],[1,-p,0],[0,-1,p],[0,1,p],[0,-1,-p],[0,1,-p],[p,0,-1],[p,0,1],[-p,0,-1],[-p,0,1]].map(q=>q.map(c=>c*.85)),e=[];
  for(let i=0;i<12;i++)for(let j=i+1;j<12;j++)if(Math.abs(Math.hypot(...v[i].map((c,k)=>c-v[j][k]))-1.7)<.05)e.push([i,j]);SOLIDS.ico={v,e}})();
LIB.shape3d={bars:2,prep(s){s.tpx=s.text?fit(s.text,IW,(s.size||1)*96*UT,800):0;s.th=s.text?s.tpx*1.2+(s.sub?60*U:0):0;
    const top=SAFE_T,bot=H-SAFE_B-s.th-50*U;s.sy=(top+bot)/2;s.R=Math.min((bot-top)*.3,BW*.2);s.solid=SOLIDS[s.shape]||SOLIDS.cube},
  draw(lt,d,s){const sp=spring(lt,{stiffness:120,damping:14}),R=s.R*sp,ry=lt*.9+.6,rx=.55+Math.sin(lt*.7)*.25,f=s.R*4;
    const P=s.solid.v.map(([x,y,z])=>{let X=x*Math.cos(ry)-z*Math.sin(ry),Z=x*Math.sin(ry)+z*Math.cos(ry),Y=y*Math.cos(rx)-Z*Math.sin(rx);Z=y*Math.sin(rx)+Z*Math.cos(rx);const k=f/(f+Z*R);return [cx+X*R*k,s.sy+Y*R*k,Z]});
    ctx.lineWidth=2.4*U;s.solid.e.forEach(([a,b])=>{const z=(P[a][2]+P[b][2])/2;ctx.strokeStyle=T.ink;ctx.globalAlpha=lerp(.95,.2,(z+1.5)/3);ctx.beginPath();ctx.moveTo(P[a][0],P[a][1]);ctx.lineTo(P[b][0],P[b][1]);ctx.stroke()});
    ctx.fillStyle=T.accent2;P.forEach(([x,y,z])=>{ctx.globalAlpha=lerp(1,.3,(z+1.5)/3);ctx.beginPath();ctx.arc(x,y,5*U*sp,0,TAU);ctx.fill()});ctx.globalAlpha=1;
    ctx.fillStyle=T.accent;ctx.beginPath();ctx.arc(cx,s.sy,12*U*sp,0,TAU);ctx.fill();
    if(s.text){const ty=H-SAFE_B-s.th+s.tpx*.9,p=E.outExpo(prog(lt,.35,1.1));ctx.save();ctx.beginPath();ctx.rect(0,ty-s.tpx,W,s.tpx*1.3);ctx.clip();ctx.font=F(s.tpx,800);ctx.fillStyle=T.ink;ctx.textAlign='center';ctx.fillText(s.text,cx,ty+(1-p)*s.tpx*1.2);ctx.restore();
      if(s.sub)label(s.sub,cx,ty+56*U,{a:prog(lt,.8,1.3)})}}};
// 12 WAVE — glowing ribbons in the lower area, title above (never overlapping)
LIB.wave={bars:2,prep(s){s.L=layout(s.text||'',IW,H*.22,(s.size||1)*Math.min(110*UT,BW*.07),800,SANS,2,1.02)},
  draw(lt,d,s){const L=s.L,ty=H*(H>W?.26:.2),wy=H*(H>W?.62:.66),A=Math.min(H*.13,(wy-(ty+L.h+(s.sub?80*U:30*U)))*.8),rev=E.outExpo(prog(lt,0,1.3));
    const wave=(ph,k1,k2,amp)=>{ctx.beginPath();for(let x=0;x<=W*rev;x+=8*U){const u=x/W,env=Math.sin(Math.PI*u)**.6;const y=wy+A*amp*env*(Math.sin(u*k1*TAU+lt*2.2+ph)*.62+Math.sin(u*k2*TAU-lt*1.3+ph*2)*.38);x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()};
    ctx.lineCap='round';ctx.strokeStyle=T.ink;ctx.globalAlpha=.14;ctx.lineWidth=2*U;wave(2,1.3,3.1,.8);ctx.globalAlpha=.7;ctx.strokeStyle=T.accent;ctx.lineWidth=3*U;wave(1,.9,2.2,.7);
    ctx.globalAlpha=1;glow(ctx,T.accent2,24*U,()=>{ctx.strokeStyle=T.accent2;ctx.lineWidth=5*U;wave(0,1.6,2.7,1)});
    drawBlock(L,cx,ty,rise(lt,.2,.8,L.lh));if(s.sub)label(s.sub,cx,ty+L.h+50*U,{a:prog(lt,.7,1.2),color:T.accent2})}};
// 13 GRID — rippling dot field with a clean title zone
LIB.grid={bars:2,prep(s){s.L=layout(s.text||'',IW*.8,H*.3,(s.size||1)*Math.min(150*UT,BW*.09),800,SANS,2,1.02)},
  draw(lt,d,s){const L=s.L,g=56*U,bw=Math.max(...L.lines.map(l=>l.width),1)/2+90*U,bh=L.h/2+(s.sub?110*U:70*U),st=E.outExpo(prog(lt,0,1));
    for(let y=(H/2)%g;y<H;y+=g)for(let x=(W/2)%g;x<W;x+=g){const dd=Math.hypot(x-cx,y-cy),z=Math.sin(dd/(70*U)-lt*4)*Math.exp(-dd/(1100*U));
      const dx=Math.max(0,Math.abs(x-cx)-bw),dy=Math.max(0,Math.abs(y-cy)-bh),keep=smoothstep(0,120*U,Math.hypot(dx,dy));const a=(.22+.7*Math.max(z,0))*keep*prog(st,dd/Math.max(W,H),dd/Math.max(W,H)+.25);
      if(a<.01)continue;ctx.globalAlpha=a;ctx.fillStyle=z>.45?T.accent2:T.ink;const r=(2.6+Math.max(z,0)*4)*U;ctx.fillRect(x-r,y-r,r*2,r*2)}ctx.globalAlpha=1;
    const last=drawBlock(L,cx,cy-L.h/2-(s.sub?30*U:0),rise(lt,.2,.8,L.lh));if(s.sub)label(s.sub,cx,last+70*U,{a:prog(lt,.7,1.2)})}};
// 14 LOGO — dot drops into the wordmark (as its period), ring burst, letters spring up, tagline tracks in, light sweep
LIB.logo={bars:2,prep(s){s.px=fit(s.text+'.',IW*.8,(s.size||1)*Math.min(200*UT,BW*.12),800);ctx.font=F(s.px,800);ctx.letterSpacing=(-.02*s.px)+'px';
    s.ch=[...s.text];s.adv=s.ch.map(c=>ctx.measureText(c).width);ctx.letterSpacing='0px';s.w=s.adv.reduce((a,b)=>a+b,0);s.dr=s.px*.11;s.full=s.w+s.dr*3;
    s.x0=cx-s.full/2;s.base=cy+s.px*.3;s.dot=[s.x0+s.w+s.dr*1.6,s.base-s.dr];s.hit=s.hit??BEAT;
    s.sweep=document.createElement('canvas');s.sweep.width=Math.ceil(s.full+40);s.sweep.height=Math.ceil(s.px*1.4)},
  draw(lt,d,s){const h=s.hit,im=s.src&&IMG[s.src];
    const rp=prog(lt,h,h+1.4);for(let k=0;k<3;k++){const q=E.outExpo(prog(lt,h+k*.08,h+1.4+k*.08));if(q<=0||q>=1)continue;ctx.strokeStyle=k===1?T.accent:T.ink;ctx.globalAlpha=(1-q)*.5;ctx.lineWidth=(3-k)*U;ctx.beginPath();ctx.arc(s.dot[0],s.dot[1],q*Math.max(W,H)*.55,0,TAU);ctx.stroke()}ctx.globalAlpha=1;
    if(lt>=h&&lt<h+.35){ctx.globalAlpha=(1-(lt-h)/.35)*.35;const g=ctx.createRadialGradient(s.dot[0],s.dot[1],0,s.dot[0],s.dot[1],BW*.4);g.addColorStop(0,T.accent);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
    if(im){const sp=spring(lt-h,{stiffness:200,damping:15}),bh=Math.min(H*.28,IW*.5*im.height/im.width),bw=bh*im.width/im.height;ctx.save();ctx.translate(cx,cy-bh*.15);ctx.scale(sp,sp);ctx.drawImage(im,-bw/2,-bh/2,bw,bh);ctx.restore()}
    else{ctx.font=F(s.px,800);ctx.letterSpacing='0px';ctx.textAlign='left';let x=s.x0;
      s.ch.forEach((c,i)=>{const sp=spring(lt-h-.04-i*.035,{stiffness:210,damping:17});if(sp>0){ctx.save();ctx.beginPath();ctx.rect(0,s.base-s.px*1.05,W,s.px*1.32);ctx.clip();ctx.fillStyle=T.ink;ctx.fillText(c,x,s.base+(1-sp)*s.px*1.1);ctx.restore()}x+=s.adv[i]});
      const sw=prog(lt,h+1.1,h+2.0);if(sw>0&&sw<1){const g=s.sweep.getContext('2d');g.clearRect(0,0,s.sweep.width,s.sweep.height);g.font=F(s.px,800);g.fillStyle='#fff';let xx=20;s.ch.forEach((c,i)=>{g.fillText(c,xx,s.px*1.05);xx+=s.adv[i]});
        g.globalCompositeOperation='source-in';const bx=lerp(-200,s.sweep.width+200,E.inOutCubic(sw)),lg=g.createLinearGradient(bx-160,0,bx+160,0);lg.addColorStop(0,'rgba(255,255,255,0)');lg.addColorStop(.5,'rgba(255,255,255,.9)');lg.addColorStop(1,'rgba(255,255,255,0)');
        g.fillStyle=lg;g.fillRect(0,0,s.sweep.width,s.sweep.height);g.globalCompositeOperation='source-over';ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.45;ctx.drawImage(s.sweep,s.x0-20,s.base-s.px*1.05);ctx.restore()}}
    let [dx,dy]=s.dot;const fall=prog(lt,0,h);if(!im){if(lt<h){dy=lerp(-60*U,s.dot[1],E.inQuad(fall))}
      const sq=lt>=h?1+.45*Math.exp(-(lt-h)*9)*Math.cos((lt-h)*30):1;ctx.save();ctx.translate(dx,dy+s.dr);ctx.scale(lt<h?.85:sq,lt<h?1.25:1/sq);glow(ctx,T.accent,30*U,()=>{ctx.fillStyle=T.accent;ctx.beginPath();ctx.arc(0,-s.dr,s.dr,0,TAU);ctx.fill()});ctx.restore()}
    if(s.tagline){const p=E.outExpo(prog(lt,h+.5,h+1.6));label(s.tagline,cx,s.base+s.px*.55+20*U,{a:p,track:lerp(.9,.32,p),color:T.dim,size:Math.max(24,Math.min(34,s.px/U*.17))})}
    if(s.sub)label(s.sub,cx,H-SAFE_B,{a:prog(lt,h+1.0,h+1.6),size:20})}};
// 15 CTA — button pops, cursor clicks, handle below
LIB.cta={bars:2,prep(s){s.tpx=s.text?fit(s.text,IW,(s.size||1)*Math.min(120*UT,BW*.075),800):0;s.bpx=54*UT;s.bw=Math.max(measure(ctx,s.button||'Subscribe',F(s.bpx,800)),measure(ctx,s.done||'',F(s.bpx,800)))+120*U;s.bh=s.bpx*2.4},
  draw(lt,d,s){const ty=cy-s.bh/2-60*U;if(s.text){const p=E.outExpo(prog(lt,0,.8));ctx.save();ctx.beginPath();ctx.rect(0,ty-s.tpx,W,s.tpx*1.3);ctx.clip();ctx.font=F(s.tpx,800);ctx.fillStyle=T.ink;ctx.textAlign='center';ctx.fillText(s.text,cx,ty+(1-p)*s.tpx*1.2);ctx.restore()}
    const click=1.3,sp=spring(lt-.35,{stiffness:240,damping:15}),cl=lt>click?1-.07*Math.exp(-(lt-click)*10)*Math.cos((lt-click)*25):1,by=cy+s.bh/2;
    const done=lt>click&&s.done;if(sp>0){ctx.save();ctx.translate(cx,by);ctx.scale(sp*cl,sp*cl);ctx.fillStyle=done?T.ink:T.accent;rrect(-s.bw/2,-s.bh/2,s.bw,s.bh,s.bh/2);ctx.fill();
      ctx.font=F(s.bpx,800);ctx.fillStyle=done?T.bg:T.onAccent;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(done?s.done:(s.button||'Subscribe'),0,2*U);ctx.restore();ctx.textBaseline='alphabetic'}
    if(lt>click){const q=E.outExpo(prog(lt,click,click+.8));ctx.strokeStyle=T.accent;ctx.globalAlpha=1-q;ctx.lineWidth=3*U;rrect(cx-s.bw/2-q*40*U,by-s.bh/2-q*40*U,s.bw+q*80*UT,s.bh+q*80*UT,s.bh);ctx.stroke();ctx.globalAlpha=1}
    const cp=E.inOutCubic(prog(lt,.6,click)),kx=lerp(W*.82,cx+s.bw*.22,cp),ky=lerp(H*.92,by+s.bh*.18,cp),out=prog(lt,click+.5,click+.9);
    if(lt>.6&&out<1){ctx.save();ctx.globalAlpha=1-out;ctx.translate(kx,ky);const k=(lt>click&&lt<click+.12?.85:1)*U*1.6;ctx.scale(k,k);ctx.fillStyle='#fff';ctx.strokeStyle='#000';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,34);ctx.lineTo(9,26);ctx.lineTo(15,40);ctx.lineTo(21,37);ctx.lineTo(15,24);ctx.lineTo(26,24);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}
    if(s.handle)label(s.handle,cx,by+s.bh/2+90*U,{a:prog(lt,click+.2,click+.7),color:T.ink,size:34})}};
// 16 LOWER — lower-third name tag over the background (for talking-head overlays or intros)
LIB.lower={bars:2,prep(s){s.npx=fit(s.text||'',IW*.6,(s.size||1)*64*UT,800);s.w=Math.max(measure(ctx,s.text||'',F(s.npx,800)),measure(ctx,s.sub||'',F(28*U,600,MONO),5*U))+80*U},
  draw(lt,d,s){const p=E.outExpo(prog(lt,0,.7)),y=H-SAFE_B-s.npx*2.6,x=SAFE;ctx.fillStyle=T.accent;ctx.fillRect(x,y,10*U,s.npx*2.3*p);
    ctx.fillStyle=T.bg2;ctx.globalAlpha=.85;ctx.fillRect(x+10*U,y,s.w*E.outExpo(prog(lt,.1,.8)),s.npx*2.3);ctx.globalAlpha=1;
    ctx.save();ctx.beginPath();ctx.rect(x+10*U,y,s.w,s.npx*2.3);ctx.clip();ctx.font=F(s.npx,800);ctx.fillStyle=T.ink;ctx.textAlign='left';ctx.fillText(s.text||'',x+44*U-(1-E.outExpo(prog(lt,.25,.9)))*60*UT,y+s.npx*1.15);ctx.restore();
    label(s.sub,x+44*U,y+s.npx*1.9,{align:'left',color:T.accent2,size:26,a:prog(lt,.5,.9)})}};

/* ---------- validation ---------- */
const REQ={title:['text'],words:['text'],scramble:['text'],particles:['text'],counter:['value'],bars:['data'],list:['items'],quote:['text'],image:[],split:['left','right'],shape3d:[],wave:['text'],grid:['text'],logo:['text'],cta:[],lower:['text']};
function validate(){
  if(!Array.isArray(CFG.scenes)||!CFG.scenes.length)ERR.push('FILM.scenes is empty');
  (CFG.scenes||[]).forEach((s,i)=>{const L=LIB[s.type]||(CFG.custom||{})[s.type];if(!L){ERR.push(`scene ${i+1}: unknown type "${s.type}". Valid: ${Object.keys(LIB).join(', ')}`);return}
    (REQ[s.type]||[]).forEach(k=>{if(s[k]===undefined||s[k]==='')ERR.push(`scene ${i+1} (${s.type}): missing "${k}"`)})});
  if(ERR.length)console.error('[motion-engine]\n'+ERR.join('\n'));window.__errors=ERR;
}

/* ---------- master render ---------- */
function sceneAt(t){let i=S.findIndex(s=>t<s.start+s.dur);return i<0?S.length-1:i}
function render(t){
  t=clamp(t,0,DUR-1e-6);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';drawBG(t);
  const i=sceneAt(t),s=S[i],lt=t-s.start,prev=S[i-1],tin=prev?prev.transition:'none',tout=i<S.length-1?s.transition:'none';
  ctx.save();let a=1,sc=1,dx=0;
  if(tin==='zoom'){const p=E.outExpo(prog(lt,0,.55));sc*=lerp(.92,1,p);a*=prog(lt,0,.2)}
  if(tin==='slide'){const p=E.outExpo(prog(lt,0,.6));dx+=(1-p)*W*.08;a*=prog(lt,0,.2)}
  if(tin==='fade')a*=prog(lt,0,.4);
  const lo=s.dur-lt;
  if(tout==='zoom'){const p=E.inExpo(prog(lo,.32,0));sc*=lerp(1,1.1,p);a*=1-p}
  if(tout==='slide'){const p=E.inExpo(prog(lo,.32,0));dx-=p*W*.08;a*=1-p}
  if(tout==='fade')a*=prog(lo,0,.4);
  const push=1+(CFG.push??.025)*prog(lt,0,s.dur);sc*=push;
  ctx.globalAlpha=a;ctx.translate(cx+dx,cy);ctx.scale(sc,sc);ctx.translate(-cx,-cy);
  const L=LIB[s.type]||(CFG.custom||{})[s.type];
  try{if(L)L.draw(lt,s.dur,s,K);else errCard(`unknown scene "${s.type}"`)}catch(e){errCard(`scene ${i+1} (${s.type}): ${e.message}`);if(!ERR.includes(e.message)){ERR.push(e.message);console.error(e)}}
  ctx.restore();ctx.globalAlpha=1;
  // overlay transitions around cuts
  S.forEach((q,j)=>{if(j===S.length-1)return;const cut=q.start+q.dur,tr=q.transition;
    if(tr==='wipe'&&Math.abs(t-cut)<.34){const p=E.inOutCubic(prog(t,cut-.34,cut+.34)),sl=Math.min(W,H)*.15;
      [[T.accent,0],[T.bg2,.08]].forEach(([col,del])=>{const pp=E.inOutCubic(prog(t,cut-.34+del,cut+.34+del)),L0=lerp(-1.6*W-sl,W+sl,pp);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(L0+sl,0);ctx.lineTo(L0+1.6*W+sl,0);ctx.lineTo(L0+1.6*W,H);ctx.lineTo(L0,H);ctx.fill()});
}
    if(tr==='flash'&&t>=cut&&t<cut+.3){ctx.fillStyle=T.ink;ctx.globalAlpha=(1-(t-cut)/.3)*.75;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}});
  drawFinish(t);
  if(ERR.length&&!q.has('t')&&!window.__capture)errBanner();
  if(GUIDES){ctx.strokeStyle='#0f0';ctx.setLineDash([8,8]);ctx.lineWidth=2;ctx.strokeRect(SAFE,SAFE_T,W-2*SAFE,H-SAFE_T-SAFE_B);ctx.setLineDash([]);label(`${i+1}/${S.length} ${s.type}  t=${t.toFixed(2)}`,SAFE,SAFE_T-20,{align:'left',color:'#0f0',size:22})}
}
function errCard(msg){ctx.save();ctx.fillStyle='#3a0d0d';ctx.fillRect(SAFE,cy-120*U,IW,240*U);ctx.strokeStyle='#ff4d4d';ctx.lineWidth=4;ctx.strokeRect(SAFE,cy-120*U,IW,240*U);
  ctx.font=F(30*U,600,MONO);ctx.fillStyle='#fff';ctx.textAlign='left';const lines=wrap(ctx,'ERROR: '+msg,IW-60*U);lines.slice(0,5).forEach((l,k)=>ctx.fillText(l,SAFE+30*U,cy-60*U+k*42*U));ctx.restore()}
function errBanner(){ctx.save();ctx.fillStyle='rgba(180,20,20,.92)';ctx.fillRect(0,0,W,56*U);ctx.font=F(24*U,600,MONO);ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText(('⚠ '+ERR[0]).slice(0,140),20*U,36*U);ctx.restore()}

/* ---------- automatic score ---------- */
const STYLES={tech:{prog:PROG.tech,drums:'four'},epic:{prog:PROG.epic,drums:'half'},calm:{prog:PROG.calm,drums:'none'},dark:{prog:PROG.dark,drums:'four'},pop:{prog:PROG.epic,drums:'pop'}};
function scheduleAudio(t0,ac){
  const A=makeMixer(ac),m=CFG.music||{},style=STYLES[typeof m==='string'?m:(m.style||'tech')]||STYLES.tech,useSynth=!(m.file)&&m!=='none'&&m.style!=='none';
  const lastS=S[S.length-1],endDrums=(lastS.type==='logo'||lastS.type==='cta')&&S.length>1?lastS.start+(lastS.hit??BEAT):DUR;
  const NB=Math.ceil(DUR/BAR),root=style.prog[0][0];
  if(m.file&&MUSIC_BUF.get(ac))A.sample(t0+(m.at||0),MUSIC_BUF.get(ac),{gain:m.gain??.8,bus:'music',offset:m.offset||0,dur:DUR-(m.at||0)+.4,fadeOut:.6});
  if(useSynth)for(let b=0;b<NB;b++){const at=t0+b*BAR,[r,ty]=style.prog[b%style.prog.length],live=b*BAR<endDrums-.01;
    A.pad(at,chord(r,ty,3),BAR+.1,.05);
    if(live&&b>=1&&style.drums!=='none'){A.bass(at,hz(r,2),BEAT*1.5,.3);A.bass(at+BEAT*2,hz(r,2),BEAT*1.5,.26)}
    for(let k=0;k<4;k++){const bt=at+k*BEAT;if(bt-t0>=endDrums-.01)break;
      if(style.drums!=='none'&&b>=1){if(style.drums==='four'||(k%2===0))A.kick(bt,k===0?1:.85);if(k%2===1)(style.drums==='pop'?A.clap(bt,.5):A.snare(bt,.55))}
      if(style.drums!=='none')A.hat(bt+BEAT/2,.09,k===3&&b%2===1,.25);else A.pluck(bt,scaleNote(root,'major',[0,4,2,5][k],5),.05,(k%2?.3:-.3))}}
  // per-scene sound design
  S.forEach((s,i)=>{const at=t0+s.start;const deg=i*2;
    if(i>0){const tr=S[i-1].transition;if(tr==='cut'||tr==='flash')A.impact(at,.45);else A.whoosh(at,.3,.36)}
    if(s.type==='title'){let k=0;(s.L?.lines||[]).forEach((l,li)=>{A.pluck(at+.2+k*.06,scaleNote(root,'minor',deg+li*2,5),.09,li%2?.25:-.25);k+=l.words.length})}
    if(s.type==='words'){const n=s.W.length,span=Math.min(BEAT/(s.perBeat||1),(s.dur-.4)/n);for(let k=0;k<n;k++)A.blip(at+k*span,scaleNote(root,'minor',(k*2)%7,5),.06,k%2?.3:-.3)}
    if(s.type==='scramble'){for(let k=0;k<22;k++)A.tick(at+.12+k*.05,.05);A.blip(at+1.25,scaleNote(root,'minor',4,6),.06)}
    if(s.type==='particles'){A.riser(at,1.3,.18);A.reverseSwell(at+1.5,1.1,.2)}
    if(s.type==='counter'){for(let k=0;k<=20;k++){const y=k/20,x=1-Math.pow(1-y,1/4);A.tick(at+.2+x*s.cd,.045)}A.blip(at+.2+s.cd,scaleNote(root,'minor',7,5),.08)}
    if(s.type==='bars')(s.data||[]).forEach((r,k)=>A.pluck(at+.3+k*.12,scaleNote(root,'minor',k*2,4),.1,0));
    if(s.type==='list')(s.items||[]).forEach((r,k)=>A.pluck(at+.3+k*.22,scaleNote(root,'minor',k*2,5),.09,0));
    if(s.type==='split')A.impact(at+.55,.35);
    if(s.type==='logo'){const h=at+(s.hit??BEAT);if(h-1.6>t0)A.riser(h-1.6,1.6,.25);A.reverseSwell(h,1.2,.28);A.impact(h,.95);if(useSynth)A.pad(h,chord(style.prog[0][0],style.prog[0][1],3),Math.max(2,DUR-(h-t0))+.3,.07)}
    if(s.type==='cta'){A.blip(at+.35,scaleNote(root,'minor',4,5),.07);A.blip(at+1.3,scaleNote(root,'minor',7,6),.08)}
    if(s.type==='shape3d')A.blip(at+.05,scaleNote(root,'minor',2,5),.06)});
  return A;
}
const MUSIC_BUF=new Map();
/* ---------- boot ---------- */
let K;const q=new URLSearchParams(location.search);
window.FILM=async function(cfg){
  CFG=cfg||{};const f=FORMATS[CFG.format]||FORMATS['16:9'];[W,H]=f;U=Math.min(W,H)/1080;UT=U*(H>W?1.3:1);BW=H>W?W*1.4:W;cx=W/2;cy=H/2;
  SAFE=Math.round((CFG.safe??96)*U);SAFE_T=H>W?Math.round(200*U):SAFE;SAFE_B=H>W?Math.round(300*U):SAFE;IW=W-2*SAFE;
  const th=typeof CFG.theme==='string'?{preset:CFG.theme}:(CFG.theme||{});T={...(THEMES[th.preset]||THEMES.dark),...th};
  SANS=th.font||'"Inter","Helvetica Neue","Segoe UI",Roboto,Arial,"Liberation Sans",sans-serif';MONO=th.mono||'"JetBrains Mono","SF Mono",Menlo,Consolas,"Liberation Mono","Courier New",monospace';
  BPM=CFG.bpm||120;BEAT=60/BPM;BAR=4*BEAT;FPS=CFG.fps||30;
  document.title=CFG.title||'Film';
  const st=document.createElement('style');st.textContent=`html,body{margin:0;height:100%;background:#000;overflow:hidden}body{display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
  canvas{display:block;max-width:100vw;max-height:100vh;width:auto;height:auto;aspect-ratio:${W}/${H}}#ui{position:fixed;left:0;right:0;bottom:0;padding:14px 18px;display:flex;gap:10px;align-items:center;background:linear-gradient(transparent,rgba(0,0,0,.7));opacity:0;transition:opacity .25s}
  body:hover #ui{opacity:1}#ui button{height:38px;padding:0 16px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(20,20,24,.85);color:#fff;font:600 13px system-ui;cursor:pointer}
  #bar{flex:1;height:6px;background:rgba(255,255,255,.2);border-radius:3px;position:relative;cursor:pointer}#fill{position:absolute;left:0;top:0;bottom:0;background:${T.accent};border-radius:3px}
  .mk{position:absolute;top:-3px;width:2px;height:12px;background:rgba(255,255,255,.6)}#tc{color:#fff;font:12px ui-monospace,monospace;min-width:92px}body.capture #ui{display:none}`;document.head.appendChild(st);
  C=document.createElement('canvas');C.width=W;C.height=H;C.id='c';document.body.appendChild(C);ctx=C.getContext('2d');
  const fm=(th.fontUrl?[new FontFace(th.font.split(',')[0].replace(/"/g,''),`url(${th.fontUrl})`).load().then(ff=>document.fonts.add(ff)).catch(e=>ERR.push('font: '+e.message))]:[]);
  await Promise.all(fm);await document.fonts.ready;
  validate();
  // timeline on bar lines
  let t0=0;S=(CFG.scenes||[]).map((s,i)=>{const L=LIB[s.type]||(CFG.custom||{})[s.type]||{bars:1};const bars=s.bars??(typeof L.bars==='function'?L.bars(s):L.bars??1);
    const o={...s,i,start:t0,dur:s.seconds??bars*BAR,transition:s.transition||TRANS[i%TRANS.length]};t0+=o.dur;return o});
  if(S.length){const L=S.at(-1);if(L.dur<2)L.dur=2;}DUR=S.reduce((a,s)=>a+s.dur,0)||1;
  // assets
  const srcs=[...new Set(S.filter(s=>s.src).map(s=>s.src))];
  await Promise.all(srcs.map(src=>new Promise(res=>{const im=new Image();im.onload=()=>{IMG[src]=im;res()};im.onerror=()=>{ERR.push('image not found: '+src);res()};im.src=src})));
  if(CFG.music&&CFG.music.file){try{MUSIC=await (await fetch(CFG.music.file)).arrayBuffer()}catch(e){ERR.push('music not found: '+CFG.music.file)}}
  K={ctx,W,H,U,T,SAFE,SAFE_T,SAFE_B,IW,cx,cy,SANS,MONO,BEAT,BAR,F,fit,layout,drawBlock,rise,label,rrect};
  S.forEach(s=>{const L=LIB[s.type]||(CFG.custom||{})[s.type];try{L&&L.prep&&L.prep(s,K)}catch(e){ERR.push(`scene ${s.i+1} prep: ${e.message}`)}});
  prepFinish();
  window.__DUR=DUR;window.__FPS=FPS;window.__seek=t=>{playing=false;render(t)};
  window.__scenes=S.map(s=>({type:s.type,start:+s.start.toFixed(3),dur:+s.dur.toFixed(3)}));
  window.__qa=S.map(s=>+(s.start+Math.min(s.dur*.6,s.dur-.15)).toFixed(3));
  window.__renderAudio=async()=>{const sr=48000,oac=new OfflineAudioContext(2,Math.ceil(sr*(DUR+.5)),sr);
    if(MUSIC)MUSIC_BUF.set(oac,await oac.decodeAudioData(MUSIC.slice(0)));scheduleAudio(0,oac);
    const buf=await oac.startRendering(),n=buf.length,ch=[buf.getChannelData(0),buf.getChannelData(1)];
    const dv=new DataView(new ArrayBuffer(44+n*4)),w=(o,s)=>[...s].forEach((c,i)=>dv.setUint8(o+i,c.charCodeAt(0)));
    w(0,'RIFF');dv.setUint32(4,36+n*4,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,2,true);dv.setUint32(24,sr,true);dv.setUint32(28,sr*4,true);dv.setUint16(32,4,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*4,true);
    for(let i=0;i<n;i++)for(let c=0;c<2;c++)dv.setInt16(44+i*4+c*2,clamp(ch[c][i],-1,1)*32767,true);
    let bin='';const u8=new Uint8Array(dv.buffer);for(let i=0;i<u8.length;i+=32768)bin+=String.fromCharCode(...u8.subarray(i,i+32768));return btoa(bin)};
  // UI
  const ui=document.createElement('div');ui.id='ui';ui.innerHTML=`<button id="pp">▶ Sound</button><button id="gd">Guides</button><div id="bar"><div id="fill"></div></div><span id="tc"></span>`;document.body.appendChild(ui);
  const bar=ui.querySelector('#bar');S.forEach(s=>{const m=document.createElement('div');m.className='mk';m.style.left=(s.start/DUR*100)+'%';bar.appendChild(m)});
  let AC=null,start=performance.now(),playing=true,audioClock=null,cur=0,src=null;
  const tick=now=>{if(!playing)return;let t=audioClock!=null?AC.currentTime-audioClock:(now-start)/1000;if(t>=DUR+.6){if(audioClock!=null)return restart(true,0);start=now;t=0}
    cur=Math.min(t,DUR-1e-6);render(cur);ui.querySelector('#fill').style.width=(cur/DUR*100)+'%';ui.querySelector('#tc').textContent=cur.toFixed(2)+' / '+DUR.toFixed(2)+'s';requestAnimationFrame(tick)};
  async function restart(sound,from=0){if(sound){AC=AC||new AudioContext();await AC.resume();if(MUSIC&&!MUSIC_BUF.get(AC))MUSIC_BUF.set(AC,await AC.decodeAudioData(MUSIC.slice(0)));
      if(src)try{src.master.disconnect()}catch(e){};audioClock=AC.currentTime+.08;src=scheduleAudio(audioClock,AC)}else audioClock=null;start=performance.now()-from*1000;playing=true;requestAnimationFrame(tick)}
  ui.querySelector('#pp').onclick=()=>restart(true,0);ui.querySelector('#gd').onclick=()=>{GUIDES=!GUIDES;if(!playing)render(cur)};
  bar.onclick=e=>{const r=bar.getBoundingClientRect();cur=(e.clientX-r.left)/r.width*DUR;if(src)try{src.master.disconnect()}catch(_){};audioClock=null;start=performance.now()-cur*1000;if(!playing){render(cur)}};
  addEventListener('keydown',e=>{if(e.key==='g'||e.key==='G'){GUIDES=!GUIDES;if(!playing)render(cur)}
    if(e.key===' '){e.preventDefault();if(playing){playing=false}else{audioClock=null;start=performance.now()-cur*1000;playing=true;requestAnimationFrame(tick)}}
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const i=clamp(sceneAt(cur)+(e.key==='ArrowRight'?1:-1),0,S.length-1);cur=S[i].start;playing=false;audioClock=null;render(cur+Math.min(1.2,S[i].dur*.6))}});
  if(q.has('t')){document.body.classList.add('capture');window.__capture=true;playing=false;render(+q.get('t'))}else requestAnimationFrame(tick);
  window.__ready=true;
};
})();
