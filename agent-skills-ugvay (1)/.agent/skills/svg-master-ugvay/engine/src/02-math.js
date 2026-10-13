/* ---------- MATH: offline TeX-subset → SVG (frac, sqrt, ^ _, greek, operators, \int \sum \lim, \vec, \text, \left( \right), chemistry) ---------- */
const MSYM={alpha:'α',beta:'β',gamma:'γ',delta:'δ',epsilon:'ε',varepsilon:'ε',zeta:'ζ',eta:'η',theta:'θ',vartheta:'ϑ',iota:'ι',kappa:'κ',lambda:'λ',mu:'μ',nu:'ν',xi:'ξ',pi:'π',rho:'ρ',sigma:'σ',tau:'τ',upsilon:'υ',phi:'φ',varphi:'φ',chi:'χ',psi:'ψ',omega:'ω',
  Gamma:'Γ',Delta:'Δ',Theta:'Θ',Lambda:'Λ',Xi:'Ξ',Pi:'Π',Sigma:'Σ',Phi:'Φ',Psi:'Ψ',Omega:'Ω',
  cdot:'·',times:'×',div:'÷',pm:'±',mp:'∓',to:'→',rightarrow:'→',leftarrow:'←',Rightarrow:'⇒',Leftrightarrow:'⇔',leftrightarrow:'↔',rightleftharpoons:'⇌',uparrow:'↑',downarrow:'↓',
  infty:'∞',approx:'≈',neq:'≠',ne:'≠',leq:'≤',le:'≤',geq:'≥',ge:'≥',sim:'∼',propto:'∝',equiv:'≡',partial:'∂',nabla:'∇',degree:'°',circ:'°',prime:'′',ldots:'…',cdots:'⋯',
  in:'∈',forall:'∀',exists:'∃',cup:'∪',cap:'∩',subset:'⊂',angle:'∠',perp:'⊥',parallel:'∥',hbar:'ℏ',ell:'ℓ',sum:'∑',prod:'∏',int:'∫',oint:'∮',iint:'∬',
  sin:'sin',cos:'cos',tan:'tan',cot:'cot',log:'log',ln:'ln',exp:'exp',lim:'lim',max:'max',min:'min',sqrt:'√',quad:' ',qquad:'  ',',':' ',';':' ',' ':' '};
const MOPS=new Set(['+','−','-','=','<','>','±','×','÷','·','→','←','⇒','⇔','↔','⇌','≈','≠','≤','≥','∼','∝','≡','∈','⊂','∪','∩']);
const BIGOPS=new Set(['∑','∏','∫','∮','∬']);
function mParse(src){let i=0;const s=src;
  const peek=()=>s[i];
  function cmd(){i++;let n='';if(/[a-zA-Z]/.test(s[i])){while(i<s.length&&/[a-zA-Z]/.test(s[i]))n+=s[i++]}else n=s[i++];return n}
  function arg(){while(s[i]===' ')i++;if(s[i]==='{'){i++;const g=list('}');i++;return g}if(s[i]==='\\'){const n=cmd();return [sym(n)]}return [{t:'ch',v:s[i++]}]}
  function rawArg(){while(s[i]===' ')i++;if(s[i]!=='{')return s[i++]||'';i++;let d=1,o='';while(i<s.length){if(s[i]==='{')d++;if(s[i]==='}'){d--;if(!d)break}o+=s[i++]}i++;return o}
  function sym(n){if(MSYM[n]!==undefined){const v=MSYM[n];return v.length>1&&/^[a-z]+$/.test(v)?{t:'fn',v}:{t:'ch',v,up:true}}return {t:'ch',v:n,up:true}}
  function atom(){const c=s[i];
    if(c==='{'){i++;const g=list('}');i++;return {t:'grp',v:g}}
    if(c==='\\'){const n=cmd();
      if(n==='frac'||n==='dfrac'||n==='tfrac')return {t:'frac',n:arg(),d:arg()};
      if(n==='sqrt'){let idx=null;if(s[i]==='['){i++;let o='';while(s[i]!==']')o+=s[i++];i++;idx=mParse(o)}return {t:'sqrt',v:arg(),idx}}
      if(n==='text'||n==='mathrm'||n==='rm')return {t:'text',v:rawArg()};
      if(n==='vec'||n==='overrightarrow')return {t:'vec',v:arg()};
      if(n==='overline'||n==='bar')return {t:'bar',v:arg()};
      if(n==='hat')return {t:'hat',v:arg()};
      if(n==='left'||n==='right'){let d=s[i++];if(d==='\\')d=cmd()==='{'?'{':'}';return {t:n,v:d==='.'?'':d}}
      if(n==='color'){const c=rawArg();return {t:'color',c,v:arg()}}
      return sym(n)}
    i++;if(c==='-')return {t:'ch',v:'−'};if(c==='*')return {t:'ch',v:'·'};if(c==="'")return {t:'ch',v:'′'};return {t:'ch',v:c}}
  function list(end){const out=[];while(i<s.length&&s[i]!==end){if(s[i]===' '){i++;continue}
      if(s[i]==='^'||s[i]==='_'){const k=s[i++];let base=out.pop()||{t:'ch',v:''};if(base.t!=='sc')base={t:'sc',b:base};const a=arg();if(k==='^')base.sup=a;else base.sub=a;out.push(base);continue}
      out.push(atom())}
    return out}
  return list(undefined)}
// layout → box {w,a,d,draw(g,x,y,fill)}
function mLayout(nodes,S,opt){
  const it=opt.chem?false:true;const items=[];let depth=0;
  const glyph=(v,size,{italic=false,weight=400}={})=>{const w=tw(v,size,weight,MATHF)*(italic?1.02:1);return {w,a:size*.72,d:size*.22,draw(g,x,y,fill){const t=el('text',{x:f2(x),y:f2(y),'font-size':f2(size),'font-family':MATHF,'font-style':italic?'italic':'normal','font-weight':weight,fill},g);t.textContent=v}}};
  const hbox=(bs,pad=0)=>{let w=0,a=0,d=0;bs.forEach(b=>{w+=b.w;a=Math.max(a,b.a);d=Math.max(d,b.d)});return {w:w+pad,a,d,draw(g,x,y,fill){let xx=x;bs.forEach(b=>{b.draw(g,xx,y,fill);xx+=b.w})}}};
  function one(n,size){
    if(n.t==='ch'){const v=n.v;if(MOPS.has(v)){const g=glyph(v,size);const sp=size*(v==='·'?.12:.24);return {w:g.w+2*sp,a:g.a,d:g.d,draw(G,x,y,f){g.draw(G,x+sp,y,f)}}}
      if(BIGOPS.has(v)){const g=glyph(v,size*1.5);return {...g,big:true,a:size*1.05,d:size*.4}}
      const italic=it&&!n.up&&/^[a-zA-Z]$/.test(v);return glyph(v,size,{italic})}
    if(n.t==='fn'){const g=glyph(n.v,size);return {w:g.w+size*.16,a:g.a,d:g.d,draw(G,x,y,f){g.draw(G,x,y,f)}}}
    if(n.t==='text')return glyph(n.v,size);
    if(n.t==='grp')return row(n.v,size);
    if(n.t==='color'){const b=row(n.v,size);return {...b,draw(G,x,y){b.draw(G,x,y,col(n.c))}}}
    if(n.t==='frac'){const s2=size*(depth>0?.78:.86);depth++;const N=row(n.n,s2),D=row(n.d,s2);depth--;const w=Math.max(N.w,D.w)+size*.3,ax=size*.3,gap=size*.14,th=Math.max(1.5,size*.055);
      return {w:w+size*.12,a:ax+gap+N.a+N.d,d:-ax+gap+D.a+D.d,draw(G,x,y,f){N.draw(G,x+size*.06+(w-N.w)/2,y-ax-gap-N.d,f);D.draw(G,x+size*.06+(w-D.w)/2,y-ax+gap+D.a+th,f);el('rect',{x:f2(x+size*.06),y:f2(y-ax-th/2),width:f2(w),height:f2(th),fill:f},G)}}}
    if(n.t==='sqrt'){const B=row(n.v,size),pad=size*.12,h=B.a+B.d+pad*2,rw=size*.55,th=Math.max(1.5,size*.055);const I=n.idx?row(n.idx,size*.55):null;
      return {w:rw+B.w+pad*2,a:B.a+pad*1.6,d:B.d+pad*.4,draw(G,x,y,f){const top=y-B.a-pad*1.4,bot=y+B.d+pad*.3;
        el('path',{d:`M${f2(x)},${f2(y-(B.a)*.35)} L${f2(x+rw*.25)},${f2(y-(B.a)*.45)} L${f2(x+rw*.55)},${f2(bot)} L${f2(x+rw)},${f2(top)} L${f2(x+rw+B.w+pad*2)},${f2(top)}`,fill:'none',stroke:f,'stroke-width':f2(th),'stroke-linejoin':'round'},G);
        if(I)I.draw(G,x,y-B.a*.55,f);B.draw(G,x+rw+pad,y,f)}}}
    if(n.t==='vec'||n.t==='bar'||n.t==='hat'){const B=row(n.v,size);return {w:B.w,a:B.a+size*.28,d:B.d,draw(G,x,y,f){B.draw(G,x,y,f);const yy=y-B.a-size*.12,th=Math.max(1.5,size*.05);
      if(n.t==='bar')el('rect',{x:f2(x+size*.05),y:f2(yy),width:f2(B.w-size*.1),height:f2(th),fill:f},G);
      else if(n.t==='hat')el('path',{d:`M${f2(x+B.w*.2)},${f2(yy+size*.08)} L${f2(x+B.w/2)},${f2(yy-size*.06)} L${f2(x+B.w*.8)},${f2(yy+size*.08)}`,fill:'none',stroke:f,'stroke-width':f2(th)},G);
      else{el('path',{d:`M${f2(x+size*.05)},${f2(yy)} L${f2(x+B.w)},${f2(yy)} M${f2(x+B.w-size*.16)},${f2(yy-size*.09)} L${f2(x+B.w)},${f2(yy)} L${f2(x+B.w-size*.16)},${f2(yy+size*.09)}`,fill:'none',stroke:f,'stroke-width':f2(th),'stroke-linecap':'round'},G)}}}}
    if(n.t==='sc'){const B=one(n.b,size),ss=size*.68;const P=n.sup?row(n.sup,ss):null,Q=n.sub?row(n.sub,ss):null;
      if(B.big){const w=Math.max(B.w,P?P.w:0,Q?Q.w:0);const isInt=/∫|∮|∬/.test(n.b.v);if(isInt){const sw=Math.max(P?P.w:0,Q?Q.w:0);return {w:B.w+sw+size*.1,a:Math.max(B.a,P?B.a*.9+P.a:0),d:Math.max(B.d,Q?B.d*.8+Q.d:0),draw(G,x,y,f){B.draw(G,x,y+size*.12,f);if(P)P.draw(G,x+B.w*.85,y-B.a*.75,f);if(Q)Q.draw(G,x+B.w*.45,y+B.d*.85,f)}}}
        return {w:w+size*.1,a:B.a+(P?P.a+P.d+size*.1:0),d:B.d+(Q?Q.a+Q.d+size*.1:0),draw(G,x,y,f){B.draw(G,x+(w-B.w)/2,y+size*.12,f);if(P)P.draw(G,x+(w-P.w)/2,y-B.a-P.d-size*.05,f);if(Q)Q.draw(G,x+(w-Q.w)/2,y+B.d+Q.a+size*.08,f)}}}
      const up=size*.42,dn=size*.24;return {w:B.w+Math.max(P?P.w:0,Q?Q.w:0)+size*.04,a:Math.max(B.a,P?up+P.a:0),d:Math.max(B.d,Q?dn+Q.d:0),draw(G,x,y,f){B.draw(G,x,y,f);if(P)P.draw(G,x+B.w+size*.02,y-up,f);if(Q)Q.draw(G,x+B.w+size*.02,y+dn,f)}}}
    return glyph('?',size)}
  function row(ns,size){const bs=[];for(let k=0;k<ns.length;k++){const n=ns[k];
      if(n.t==='left'){let j=k+1,dd=1;while(j<ns.length&&dd){if(ns[j].t==='left')dd++;if(ns[j].t==='right')dd--;j++}const inner=row(ns.slice(k+1,j-1),size);const R=ns[j-1]||{v:''};
        const hh=inner.a+inner.d,sc=Math.max(1,hh/(size*.95));const delim=(v)=>{if(!v)return {w:size*.05,a:0,d:0,draw(){}};const g=glyph(v,size);return {w:g.w,a:inner.a,d:inner.d,draw(G,x,y,f){const gg=el('g',{transform:`translate(0 ${f2(y-(inner.a-inner.d)/2)}) scale(1 ${f2(sc)}) translate(0 ${f2(-(y-(inner.a-inner.d)/2)+size*.25/sc*0)})`},G);g.draw(gg,x,y+size*.28-(size*.28)/sc*0,f)}}};
        bs.push(delim(n.v),inner,delim(R.v));k=j-1;continue}
      if(n.t==='right')continue;bs.push(one(n,size))}
    return hbox(bs)}
  return row(nodes,S)}
function mathBox(tex,size,opt={}){return mLayout(mParse(String(tex)),size,opt)}
