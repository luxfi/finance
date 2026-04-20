import{bE as fn,bF as ge,bx as dn,bG as hn,bH as pn,_ as vn,bu as mn}from"./index-a9dcc3b6.js";function ae(){}const Wt=e=>e;function gn(e,t){for(const n in t)e[n]=t[n];return e}function $t(e){return e()}function kt(){return Object.create(null)}function ke(e){e.forEach($t)}function Ue(e){return typeof e=="function"}function Ce(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function bn(e){return Object.keys(e).length===0}function Xt(e,t,n,s){if(e){const i=Yt(e,t,n,s);return e[0](i)}}function Yt(e,t,n,s){return e[1]&&s?gn(n.ctx.slice(),e[1](s(t))):n.ctx}function Jt(e,t,n,s){if(e[2]&&s){const i=e[2](s(n));if(t.dirty===void 0)return i;if(typeof i=="object"){const p=[],f=Math.max(t.dirty.length,i.length);for(let d=0;d<f;d+=1)p[d]=t.dirty[d]|i[d];return p}return t.dirty|i}return t.dirty}function Qt(e,t,n,s,i,p){if(i){const f=Yt(t,n,s,p);e.p(f,i)}}function Zt(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let s=0;s<n;s++)t[s]=-1;return t}return-1}const Kt=typeof window<"u";let wn=Kt?()=>window.performance.now():()=>Date.now(),gt=Kt?e=>requestAnimationFrame(e):ae;const Fe=new Set;function en(e){Fe.forEach(t=>{t.c(e)||(Fe.delete(t),t.f())}),Fe.size!==0&&gt(en)}function yn(e){let t;return Fe.size===0&&gt(en),{promise:new Promise(n=>{Fe.add(t={c:e,f:n})}),abort(){Fe.delete(t)}}}function k(e,t){e.appendChild(t)}function Be(e,t,n){const s=bt(e);if(!s.getElementById(t)){const i=C("style");i.id=t,i.textContent=n,tn(s,i)}}function bt(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function _n(e){const t=C("style");return tn(bt(e),t),t.sheet}function tn(e,t){return k(e.head||e,t),t.sheet}function V(e,t,n){e.insertBefore(t,n||null)}function H(e){e.parentNode&&e.parentNode.removeChild(e)}function et(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function C(e){return document.createElement(e)}function se(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function J(e){return document.createTextNode(e)}function G(){return J(" ")}function nn(){return J("")}function ue(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function O(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function kn(e){return Array.from(e.childNodes)}function Ee(e,t){t=""+t,e.data!==t&&(e.data=t)}function dt(e,t,n,s){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,s?"important":"")}function Ye(e,t,n){for(let s=0;s<e.options.length;s+=1){const i=e.options[s];if(i.__value===t){i.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function Et(e){const t=e.querySelector(":checked");return t&&t.__value}function de(e,t,n){e.classList[n?"add":"remove"](t)}function En(e,t,{bubbles:n=!1,cancelable:s=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,n,s,t),i}const tt=new Map;let nt=0;function xn(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}function An(e,t){const n={stylesheet:_n(t),rules:{}};return tt.set(e,n),n}function xt(e,t,n,s,i,p,f,d=0){const w=16.666/s;let y=`{
`;for(let I=0;I<=1;I+=w){const T=t+(n-t)*p(I);y+=I*100+`%{${f(T,1-T)}}
`}const x=y+`100% {${f(n,1-n)}}
}`,S=`__svelte_${xn(x)}_${d}`,M=bt(e),{stylesheet:N,rules:A}=tt.get(M)||An(M,e);A[S]||(A[S]=!0,N.insertRule(`@keyframes ${S} ${x}`,N.cssRules.length));const B=e.style.animation||"";return e.style.animation=`${B?`${B}, `:""}${S} ${s}ms linear ${i}ms 1 both`,nt+=1,S}function On(e,t){const n=(e.style.animation||"").split(", "),s=n.filter(t?p=>p.indexOf(t)<0:p=>p.indexOf("__svelte")===-1),i=n.length-s.length;i&&(e.style.animation=s.join(", "),nt-=i,nt||Sn())}function Sn(){gt(()=>{nt||(tt.forEach(e=>{const{ownerNode:t}=e.stylesheet;t&&H(t)}),tt.clear())})}let wt;function Ve(e){wt=e}const Re=[],rt=[];let He=[];const ht=[],Nn=Promise.resolve();let pt=!1;function zn(){pt||(pt=!0,Nn.then(rn))}function ze(e){He.push(e)}function At(e){ht.push(e)}const st=new Set;let je=0;function rn(){if(je!==0)return;const e=wt;do{try{for(;je<Re.length;){const t=Re[je];je++,Ve(t),Ln(t.$$)}}catch(t){throw Re.length=0,je=0,t}for(Ve(null),Re.length=0,je=0;rt.length;)rt.pop()();for(let t=0;t<He.length;t+=1){const n=He[t];st.has(n)||(st.add(n),n())}He.length=0}while(Re.length);for(;ht.length;)ht.pop()();pt=!1,st.clear(),Ve(e)}function Ln(e){if(e.fragment!==null){e.update(),ke(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ze)}}function Pn(e){const t=[],n=[];He.forEach(s=>e.indexOf(s)===-1?t.push(s):n.push(s)),n.forEach(s=>s()),He=t}let Ge;function Cn(){return Ge||(Ge=Promise.resolve(),Ge.then(()=>{Ge=null})),Ge}function lt(e,t,n){e.dispatchEvent(En(`${t?"intro":"outro"}${n}`))}const Ze=new Set;let Oe;function Bn(){Oe={r:0,c:[],p:Oe}}function Mn(){Oe.r||ke(Oe.c),Oe=Oe.p}function xe(e,t){e&&e.i&&(Ze.delete(e),e.i(t))}function Le(e,t,n,s){if(e&&e.o){if(Ze.has(e))return;Ze.add(e),Oe.c.push(()=>{Ze.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}else s&&s()}const Tn={duration:0};function ot(e,t,n,s){const i={direction:"both"};let p=t(e,n,i),f=s?0:1,d=null,w=null,y=null;function x(){y&&On(e,y)}function S(N,A){const B=N.b-f;return A*=Math.abs(B),{a:f,b:N.b,d:B,duration:A,start:N.start,end:N.start+A,group:N.group}}function M(N){const{delay:A=0,duration:B=300,easing:I=Wt,tick:T=ae,css:E}=p||Tn,te={start:wn()+A,b:N};N||(te.group=Oe,Oe.r+=1),d||w?w=te:(E&&(x(),y=xt(e,f,N,B,A,I,E)),N&&T(0,1),d=S(te,B),ze(()=>lt(e,N,"start")),yn(X=>{if(w&&X>w.start&&(d=S(w,B),w=null,lt(e,d.b,"start"),E&&(x(),y=xt(e,f,d.b,d.duration,0,I,p.css))),d){if(X>=d.end)T(f=d.b,1-f),lt(e,d.b,"end"),w||(d.b?x():--d.group.r||ke(d.group.c)),d=null;else if(X>=d.start){const K=X-d.start;f=d.a+d.d*I(K/d.duration),T(f,1-f)}}return!!(d||w)}))}return{run(N){Ue(p)?Cn().then(()=>{p=p(i),M(N)}):M(N)},end(){x(),d=w=null}}}function Ot(e,t,n){const s=e.$$.props[t];s!==void 0&&(e.$$.bound[s]=n,n(e.$$.ctx[s]))}function Ke(e){e&&e.c()}function We(e,t,n,s){const{fragment:i,after_update:p}=e.$$;i&&i.m(t,n),s||ze(()=>{const f=e.$$.on_mount.map($t).filter(Ue);e.$$.on_destroy?e.$$.on_destroy.push(...f):ke(f),e.$$.on_mount=[]}),p.forEach(ze)}function $e(e,t){const n=e.$$;n.fragment!==null&&(Pn(n.after_update),ke(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function In(e,t){e.$$.dirty[0]===-1&&(Re.push(e),zn(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Me(e,t,n,s,i,p,f,d=[-1]){const w=wt;Ve(e);const y=e.$$={fragment:null,ctx:[],props:p,update:ae,not_equal:i,bound:kt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(w?w.$$.context:[])),callbacks:kt(),dirty:d,skip_bound:!1,root:t.target||w.$$.root};f&&f(y.root);let x=!1;if(y.ctx=n?n(e,t.props||{},(S,M,...N)=>{const A=N.length?N[0]:M;return y.ctx&&i(y.ctx[S],y.ctx[S]=A)&&(!y.skip_bound&&y.bound[S]&&y.bound[S](A),x&&In(e,S)),M}):[],y.update(),x=!0,ke(y.before_update),y.fragment=s?s(y.ctx):!1,t.target){if(t.hydrate){const S=kn(t.target);y.fragment&&y.fragment.l(S),S.forEach(H)}else y.fragment&&y.fragment.c();t.intro&&xe(e.$$.fragment),We(e,t.target,t.anchor,t.customElement),rn()}Ve(w)}class Te{$destroy(){$e(this,1),this.$destroy=ae}$on(t,n){if(!Ue(n))return ae;const s=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(t){this.$$set&&!bn(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function it(e,{delay:t=0,duration:n=400,easing:s=Wt}={}){const i=+getComputedStyle(e).opacity;return{delay:t,duration:n,easing:s,css:p=>`opacity: ${p*i}`}}var Dn=`
  <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6569 1.75736L7.41429 6L11.6569 10.2426L10.2427 11.6569L6.00008 7.41421L1.75744 11.6569L0.343227 10.2426L4.58587 6L0.343227 1.75736L1.75744 0.343146L6.00008 4.58579L10.2427 0.343146L11.6569 1.75736Z" fill="currentColor"/>
  </svg>
`;function jn(e){Be(e,"svelte-1jp3yas",".close-button.svelte-1jp3yas.svelte-1jp3yas{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;height:2rem;width:2rem;border-radius:2rem;cursor:pointer;color:var(--onboard-close-button-color, inherit)}.close-button.svelte-1jp3yas.svelte-1jp3yas:hover::before{opacity:0.2}.close-button.svelte-1jp3yas:hover .svg-box.svelte-1jp3yas{opacity:1}.close-button.svelte-1jp3yas.svelte-1jp3yas::before{content:'';position:absolute;height:inherit;width:inherit;opacity:0.1;background:currentColor;transition:300ms ease-in-out opacity}.svg-box.svelte-1jp3yas.svelte-1jp3yas{display:flex;position:absolute;height:14px;width:14px;opacity:0.6;transition:300ms ease-in-out opacity}")}function Rn(e){let t,n,s;return{c(){t=C("div"),n=C("div"),s=C("div"),O(s,"class","svg-box svelte-1jp3yas"),O(n,"class","close-button svelte-1jp3yas"),O(t,"class","close-button-container")},m(i,p){V(i,t,p),k(t,n),k(n,s),s.innerHTML=Dn},p:ae,i:ae,o:ae,d(i){i&&H(t)}}}class Fn extends Te{constructor(t){super(),Me(this,t,null,Rn,Ce,{},jn)}}var Hn=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,at=Math.ceil,we=Math.floor,me="[BigNumber Error] ",St=me+"Number primitive has more than 15 significant digits: ",_e=1e14,D=14,ct=9007199254740991,ut=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],Ne=1e7,le=1e9;function on(e){var t,n,s,i=E.prototype={constructor:E,toString:null,valueOf:null},p=new E(1),f=20,d=4,w=-7,y=21,x=-1e7,S=1e7,M=!1,N=1,A=0,B={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},I="0123456789abcdefghijklmnopqrstuvwxyz",T=!0;function E(r,o){var l,v,u,a,b,c,h,g,m=this;if(!(m instanceof E))return new E(r,o);if(o==null){if(r&&r._isBigNumber===!0){m.s=r.s,!r.c||r.e>S?m.c=m.e=null:r.e<x?m.c=[m.e=0]:(m.e=r.e,m.c=r.c.slice());return}if((c=typeof r=="number")&&r*0==0){if(m.s=1/r<0?(r=-r,-1):1,r===~~r){for(a=0,b=r;b>=10;b/=10,a++);a>S?m.c=m.e=null:(m.e=a,m.c=[r]);return}g=String(r)}else{if(!Hn.test(g=String(r)))return s(m,g,c);m.s=g.charCodeAt(0)==45?(g=g.slice(1),-1):1}(a=g.indexOf("."))>-1&&(g=g.replace(".","")),(b=g.search(/e/i))>0?(a<0&&(a=b),a+=+g.slice(b+1),g=g.substring(0,b)):a<0&&(a=g.length)}else{if(Z(o,2,I.length,"Base"),o==10&&T)return m=new E(r),$(m,f+m.e+1,d);if(g=String(r),c=typeof r=="number"){if(r*0!=0)return s(m,g,c,o);if(m.s=1/r<0?(g=g.slice(1),-1):1,E.DEBUG&&g.replace(/^0\.0*|\./,"").length>15)throw Error(St+r)}else m.s=g.charCodeAt(0)===45?(g=g.slice(1),-1):1;for(l=I.slice(0,o),a=b=0,h=g.length;b<h;b++)if(l.indexOf(v=g.charAt(b))<0){if(v=="."){if(b>a){a=h;continue}}else if(!u&&(g==g.toUpperCase()&&(g=g.toLowerCase())||g==g.toLowerCase()&&(g=g.toUpperCase()))){u=!0,b=-1,a=0;continue}return s(m,String(r),c,o)}c=!1,g=n(g,o,10,m.s),(a=g.indexOf("."))>-1?g=g.replace(".",""):a=g.length}for(b=0;g.charCodeAt(b)===48;b++);for(h=g.length;g.charCodeAt(--h)===48;);if(g=g.slice(b,++h)){if(h-=b,c&&E.DEBUG&&h>15&&(r>ct||r!==we(r)))throw Error(St+m.s*r);if((a=a-b-1)>S)m.c=m.e=null;else if(a<x)m.c=[m.e=0];else{if(m.e=a,m.c=[],b=(a+1)%D,a<0&&(b+=D),b<h){for(b&&m.c.push(+g.slice(0,b)),h-=D;b<h;)m.c.push(+g.slice(b,b+=D));b=D-(g=g.slice(b)).length}else b-=h;for(;b--;g+="0");m.c.push(+g)}}else m.c=[m.e=0]}E.clone=on,E.ROUND_UP=0,E.ROUND_DOWN=1,E.ROUND_CEIL=2,E.ROUND_FLOOR=3,E.ROUND_HALF_UP=4,E.ROUND_HALF_DOWN=5,E.ROUND_HALF_EVEN=6,E.ROUND_HALF_CEIL=7,E.ROUND_HALF_FLOOR=8,E.EUCLID=9,E.config=E.set=function(r){var o,l;if(r!=null)if(typeof r=="object"){if(r.hasOwnProperty(o="DECIMAL_PLACES")&&(l=r[o],Z(l,0,le,o),f=l),r.hasOwnProperty(o="ROUNDING_MODE")&&(l=r[o],Z(l,0,8,o),d=l),r.hasOwnProperty(o="EXPONENTIAL_AT")&&(l=r[o],l&&l.pop?(Z(l[0],-le,0,o),Z(l[1],0,le,o),w=l[0],y=l[1]):(Z(l,-le,le,o),w=-(y=l<0?-l:l))),r.hasOwnProperty(o="RANGE"))if(l=r[o],l&&l.pop)Z(l[0],-le,-1,o),Z(l[1],1,le,o),x=l[0],S=l[1];else if(Z(l,-le,le,o),l)x=-(S=l<0?-l:l);else throw Error(me+o+" cannot be zero: "+l);if(r.hasOwnProperty(o="CRYPTO"))if(l=r[o],l===!!l)if(l)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))M=l;else throw M=!l,Error(me+"crypto unavailable");else M=l;else throw Error(me+o+" not true or false: "+l);if(r.hasOwnProperty(o="MODULO_MODE")&&(l=r[o],Z(l,0,9,o),N=l),r.hasOwnProperty(o="POW_PRECISION")&&(l=r[o],Z(l,0,le,o),A=l),r.hasOwnProperty(o="FORMAT"))if(l=r[o],typeof l=="object")B=l;else throw Error(me+o+" not an object: "+l);if(r.hasOwnProperty(o="ALPHABET"))if(l=r[o],typeof l=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(l))T=l.slice(0,10)=="0123456789",I=l;else throw Error(me+o+" invalid: "+l)}else throw Error(me+"Object expected: "+r);return{DECIMAL_PLACES:f,ROUNDING_MODE:d,EXPONENTIAL_AT:[w,y],RANGE:[x,S],CRYPTO:M,MODULO_MODE:N,POW_PRECISION:A,FORMAT:B,ALPHABET:I}},E.isBigNumber=function(r){if(!r||r._isBigNumber!==!0)return!1;if(!E.DEBUG)return!0;var o,l,v=r.c,u=r.e,a=r.s;e:if({}.toString.call(v)=="[object Array]"){if((a===1||a===-1)&&u>=-le&&u<=le&&u===we(u)){if(v[0]===0){if(u===0&&v.length===1)return!0;break e}if(o=(u+1)%D,o<1&&(o+=D),String(v[0]).length==o){for(o=0;o<v.length;o++)if(l=v[o],l<0||l>=_e||l!==we(l))break e;if(l!==0)return!0}}}else if(v===null&&u===null&&(a===null||a===1||a===-1))return!0;throw Error(me+"Invalid BigNumber: "+r)},E.maximum=E.max=function(){return X(arguments,-1)},E.minimum=E.min=function(){return X(arguments,1)},E.random=function(){var r=9007199254740992,o=Math.random()*r&2097151?function(){return we(Math.random()*r)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(l){var v,u,a,b,c,h=0,g=[],m=new E(p);if(l==null?l=f:Z(l,0,le),b=at(l/D),M)if(crypto.getRandomValues){for(v=crypto.getRandomValues(new Uint32Array(b*=2));h<b;)c=v[h]*131072+(v[h+1]>>>11),c>=9e15?(u=crypto.getRandomValues(new Uint32Array(2)),v[h]=u[0],v[h+1]=u[1]):(g.push(c%1e14),h+=2);h=b/2}else if(crypto.randomBytes){for(v=crypto.randomBytes(b*=7);h<b;)c=(v[h]&31)*281474976710656+v[h+1]*1099511627776+v[h+2]*4294967296+v[h+3]*16777216+(v[h+4]<<16)+(v[h+5]<<8)+v[h+6],c>=9e15?crypto.randomBytes(7).copy(v,h):(g.push(c%1e14),h+=7);h=b/7}else throw M=!1,Error(me+"crypto unavailable");if(!M)for(;h<b;)c=o(),c<9e15&&(g[h++]=c%1e14);for(b=g[--h],l%=D,b&&l&&(c=ut[D-l],g[h]=we(b/c)*c);g[h]===0;g.pop(),h--);if(h<0)g=[a=0];else{for(a=-1;g[0]===0;g.splice(0,1),a-=D);for(h=1,c=g[0];c>=10;c/=10,h++);h<D&&(a-=D-h)}return m.e=a,m.c=g,m}}(),E.sum=function(){for(var r=1,o=arguments,l=new E(o[0]);r<o.length;)l=l.plus(o[r++]);return l},n=function(){var r="0123456789";function o(l,v,u,a){for(var b,c=[0],h,g=0,m=l.length;g<m;){for(h=c.length;h--;c[h]*=v);for(c[0]+=a.indexOf(l.charAt(g++)),b=0;b<c.length;b++)c[b]>u-1&&(c[b+1]==null&&(c[b+1]=0),c[b+1]+=c[b]/u|0,c[b]%=u)}return c.reverse()}return function(l,v,u,a,b){var c,h,g,m,_,z,P,F,U=l.indexOf("."),ee=f,j=d;for(U>=0&&(m=A,A=0,l=l.replace(".",""),F=new E(v),z=F.pow(l.length-U),A=m,F.c=o(Ae(be(z.c),z.e,"0"),10,u,r),F.e=F.c.length),P=o(l,v,u,b?(c=I,r):(c=r,I)),g=m=P.length;P[--m]==0;P.pop());if(!P[0])return c.charAt(0);if(U<0?--g:(z.c=P,z.e=g,z.s=a,z=t(z,F,ee,j,u),P=z.c,_=z.r,g=z.e),h=g+ee+1,U=P[h],m=u/2,_=_||h<0||P[h+1]!=null,_=j<4?(U!=null||_)&&(j==0||j==(z.s<0?3:2)):U>m||U==m&&(j==4||_||j==6&&P[h-1]&1||j==(z.s<0?8:7)),h<1||!P[0])l=_?Ae(c.charAt(1),-ee,c.charAt(0)):c.charAt(0);else{if(P.length=h,_)for(--u;++P[--h]>u;)P[h]=0,h||(++g,P=[1].concat(P));for(m=P.length;!P[--m];);for(U=0,l="";U<=m;l+=c.charAt(P[U++]));l=Ae(l,g,c.charAt(0))}return l}}(),t=function(){function r(v,u,a){var b,c,h,g,m=0,_=v.length,z=u%Ne,P=u/Ne|0;for(v=v.slice();_--;)h=v[_]%Ne,g=v[_]/Ne|0,b=P*h+g*z,c=z*h+b%Ne*Ne+m,m=(c/a|0)+(b/Ne|0)+P*g,v[_]=c%a;return m&&(v=[m].concat(v)),v}function o(v,u,a,b){var c,h;if(a!=b)h=a>b?1:-1;else for(c=h=0;c<a;c++)if(v[c]!=u[c]){h=v[c]>u[c]?1:-1;break}return h}function l(v,u,a,b){for(var c=0;a--;)v[a]-=c,c=v[a]<u[a]?1:0,v[a]=c*b+v[a]-u[a];for(;!v[0]&&v.length>1;v.splice(0,1));}return function(v,u,a,b,c){var h,g,m,_,z,P,F,U,ee,j,R,Q,Se,Ie,De,ce,re,oe=v.s==u.s?1:-1,q=v.c,W=u.c;if(!q||!q[0]||!W||!W[0])return new E(!v.s||!u.s||(q?W&&q[0]==W[0]:!W)?NaN:q&&q[0]==0||!W?oe*0:oe/0);for(U=new E(oe),ee=U.c=[],g=v.e-u.e,oe=a+g+1,c||(c=_e,g=ye(v.e/D)-ye(u.e/D),oe=oe/D|0),m=0;W[m]==(q[m]||0);m++);if(W[m]>(q[m]||0)&&g--,oe<0)ee.push(1),_=!0;else{for(Ie=q.length,ce=W.length,m=0,oe+=2,z=we(c/(W[0]+1)),z>1&&(W=r(W,z,c),q=r(q,z,c),ce=W.length,Ie=q.length),Se=ce,j=q.slice(0,ce),R=j.length;R<ce;j[R++]=0);re=W.slice(),re=[0].concat(re),De=W[0],W[1]>=c/2&&De++;do{if(z=0,h=o(W,j,ce,R),h<0){if(Q=j[0],ce!=R&&(Q=Q*c+(j[1]||0)),z=we(Q/De),z>1)for(z>=c&&(z=c-1),P=r(W,z,c),F=P.length,R=j.length;o(P,j,F,R)==1;)z--,l(P,ce<F?re:W,F,c),F=P.length,h=1;else z==0&&(h=z=1),P=W.slice(),F=P.length;if(F<R&&(P=[0].concat(P)),l(j,P,R,c),R=j.length,h==-1)for(;o(W,j,ce,R)<1;)z++,l(j,ce<R?re:W,R,c),R=j.length}else h===0&&(z++,j=[0]);ee[m++]=z,j[0]?j[R++]=q[Se]||0:(j=[q[Se]],R=1)}while((Se++<Ie||j[0]!=null)&&oe--);_=j[0]!=null,ee[0]||ee.splice(0,1)}if(c==_e){for(m=1,oe=ee[0];oe>=10;oe/=10,m++);$(U,a+(U.e=m+g*D-1)+1,b,_)}else U.e=g,U.r=+_;return U}}();function te(r,o,l,v){var u,a,b,c,h;if(l==null?l=d:Z(l,0,8),!r.c)return r.toString();if(u=r.c[0],b=r.e,o==null)h=be(r.c),h=v==1||v==2&&(b<=w||b>=y)?Qe(h,b):Ae(h,b,"0");else if(r=$(new E(r),o,l),a=r.e,h=be(r.c),c=h.length,v==1||v==2&&(o<=a||a<=w)){for(;c<o;h+="0",c++);h=Qe(h,a)}else if(o-=b,h=Ae(h,a,"0"),a+1>c){if(--o>0)for(h+=".";o--;h+="0");}else if(o+=a-c,o>0)for(a+1==c&&(h+=".");o--;h+="0");return r.s<0&&u?"-"+h:h}function X(r,o){for(var l,v,u=1,a=new E(r[0]);u<r.length;u++)v=new E(r[u]),(!v.s||(l=Pe(a,v))===o||l===0&&a.s===o)&&(a=v);return a}function K(r,o,l){for(var v=1,u=o.length;!o[--u];o.pop());for(u=o[0];u>=10;u/=10,v++);return(l=v+l*D-1)>S?r.c=r.e=null:l<x?r.c=[r.e=0]:(r.e=l,r.c=o),r}s=function(){var r=/^(-?)0([xbo])(?=\w[\w.]*$)/i,o=/^([^.]+)\.$/,l=/^\.([^.]+)$/,v=/^-?(Infinity|NaN)$/,u=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(a,b,c,h){var g,m=c?b:b.replace(u,"");if(v.test(m))a.s=isNaN(m)?null:m<0?-1:1;else{if(!c&&(m=m.replace(r,function(_,z,P){return g=(P=P.toLowerCase())=="x"?16:P=="b"?2:8,!h||h==g?z:_}),h&&(g=h,m=m.replace(o,"$1").replace(l,"0.$1")),b!=m))return new E(m,g);if(E.DEBUG)throw Error(me+"Not a"+(h?" base "+h:"")+" number: "+b);a.s=null}a.c=a.e=null}}();function $(r,o,l,v){var u,a,b,c,h,g,m,_=r.c,z=ut;if(_){e:{for(u=1,c=_[0];c>=10;c/=10,u++);if(a=o-u,a<0)a+=D,b=o,h=_[g=0],m=we(h/z[u-b-1]%10);else if(g=at((a+1)/D),g>=_.length)if(v){for(;_.length<=g;_.push(0));h=m=0,u=1,a%=D,b=a-D+1}else break e;else{for(h=c=_[g],u=1;c>=10;c/=10,u++);a%=D,b=a-D+u,m=b<0?0:we(h/z[u-b-1]%10)}if(v=v||o<0||_[g+1]!=null||(b<0?h:h%z[u-b-1]),v=l<4?(m||v)&&(l==0||l==(r.s<0?3:2)):m>5||m==5&&(l==4||v||l==6&&(a>0?b>0?h/z[u-b]:0:_[g-1])%10&1||l==(r.s<0?8:7)),o<1||!_[0])return _.length=0,v?(o-=r.e+1,_[0]=z[(D-o%D)%D],r.e=-o||0):_[0]=r.e=0,r;if(a==0?(_.length=g,c=1,g--):(_.length=g+1,c=z[D-a],_[g]=b>0?we(h/z[u-b]%z[b])*c:0),v)for(;;)if(g==0){for(a=1,b=_[0];b>=10;b/=10,a++);for(b=_[0]+=c,c=1;b>=10;b/=10,c++);a!=c&&(r.e++,_[0]==_e&&(_[0]=1));break}else{if(_[g]+=c,_[g]!=_e)break;_[g--]=0,c=1}for(a=_.length;_[--a]===0;_.pop());}r.e>S?r.c=r.e=null:r.e<x&&(r.c=[r.e=0])}return r}function ne(r){var o,l=r.e;return l===null?r.toString():(o=be(r.c),o=l<=w||l>=y?Qe(o,l):Ae(o,l,"0"),r.s<0?"-"+o:o)}return i.absoluteValue=i.abs=function(){var r=new E(this);return r.s<0&&(r.s=1),r},i.comparedTo=function(r,o){return Pe(this,new E(r,o))},i.decimalPlaces=i.dp=function(r,o){var l,v,u,a=this;if(r!=null)return Z(r,0,le),o==null?o=d:Z(o,0,8),$(new E(a),r+a.e+1,o);if(!(l=a.c))return null;if(v=((u=l.length-1)-ye(this.e/D))*D,u=l[u])for(;u%10==0;u/=10,v--);return v<0&&(v=0),v},i.dividedBy=i.div=function(r,o){return t(this,new E(r,o),f,d)},i.dividedToIntegerBy=i.idiv=function(r,o){return t(this,new E(r,o),0,1)},i.exponentiatedBy=i.pow=function(r,o){var l,v,u,a,b,c,h,g,m,_=this;if(r=new E(r),r.c&&!r.isInteger())throw Error(me+"Exponent not an integer: "+ne(r));if(o!=null&&(o=new E(o)),c=r.e>14,!_.c||!_.c[0]||_.c[0]==1&&!_.e&&_.c.length==1||!r.c||!r.c[0])return m=new E(Math.pow(+ne(_),c?r.s*(2-Je(r)):+ne(r))),o?m.mod(o):m;if(h=r.s<0,o){if(o.c?!o.c[0]:!o.s)return new E(NaN);v=!h&&_.isInteger()&&o.isInteger(),v&&(_=_.mod(o))}else{if(r.e>9&&(_.e>0||_.e<-1||(_.e==0?_.c[0]>1||c&&_.c[1]>=24e7:_.c[0]<8e13||c&&_.c[0]<=9999975e7)))return a=_.s<0&&Je(r)?-0:0,_.e>-1&&(a=1/a),new E(h?1/a:a);A&&(a=at(A/D+2))}for(c?(l=new E(.5),h&&(r.s=1),g=Je(r)):(u=Math.abs(+ne(r)),g=u%2),m=new E(p);;){if(g){if(m=m.times(_),!m.c)break;a?m.c.length>a&&(m.c.length=a):v&&(m=m.mod(o))}if(u){if(u=we(u/2),u===0)break;g=u%2}else if(r=r.times(l),$(r,r.e+1,1),r.e>14)g=Je(r);else{if(u=+ne(r),u===0)break;g=u%2}_=_.times(_),a?_.c&&_.c.length>a&&(_.c.length=a):v&&(_=_.mod(o))}return v?m:(h&&(m=p.div(m)),o?m.mod(o):a?$(m,A,d,b):m)},i.integerValue=function(r){var o=new E(this);return r==null?r=d:Z(r,0,8),$(o,o.e+1,r)},i.isEqualTo=i.eq=function(r,o){return Pe(this,new E(r,o))===0},i.isFinite=function(){return!!this.c},i.isGreaterThan=i.gt=function(r,o){return Pe(this,new E(r,o))>0},i.isGreaterThanOrEqualTo=i.gte=function(r,o){return(o=Pe(this,new E(r,o)))===1||o===0},i.isInteger=function(){return!!this.c&&ye(this.e/D)>this.c.length-2},i.isLessThan=i.lt=function(r,o){return Pe(this,new E(r,o))<0},i.isLessThanOrEqualTo=i.lte=function(r,o){return(o=Pe(this,new E(r,o)))===-1||o===0},i.isNaN=function(){return!this.s},i.isNegative=function(){return this.s<0},i.isPositive=function(){return this.s>0},i.isZero=function(){return!!this.c&&this.c[0]==0},i.minus=function(r,o){var l,v,u,a,b=this,c=b.s;if(r=new E(r,o),o=r.s,!c||!o)return new E(NaN);if(c!=o)return r.s=-o,b.plus(r);var h=b.e/D,g=r.e/D,m=b.c,_=r.c;if(!h||!g){if(!m||!_)return m?(r.s=-o,r):new E(_?b:NaN);if(!m[0]||!_[0])return _[0]?(r.s=-o,r):new E(m[0]?b:d==3?-0:0)}if(h=ye(h),g=ye(g),m=m.slice(),c=h-g){for((a=c<0)?(c=-c,u=m):(g=h,u=_),u.reverse(),o=c;o--;u.push(0));u.reverse()}else for(v=(a=(c=m.length)<(o=_.length))?c:o,c=o=0;o<v;o++)if(m[o]!=_[o]){a=m[o]<_[o];break}if(a&&(u=m,m=_,_=u,r.s=-r.s),o=(v=_.length)-(l=m.length),o>0)for(;o--;m[l++]=0);for(o=_e-1;v>c;){if(m[--v]<_[v]){for(l=v;l&&!m[--l];m[l]=o);--m[l],m[v]+=_e}m[v]-=_[v]}for(;m[0]==0;m.splice(0,1),--g);return m[0]?K(r,m,g):(r.s=d==3?-1:1,r.c=[r.e=0],r)},i.modulo=i.mod=function(r,o){var l,v,u=this;return r=new E(r,o),!u.c||!r.s||r.c&&!r.c[0]?new E(NaN):!r.c||u.c&&!u.c[0]?new E(u):(N==9?(v=r.s,r.s=1,l=t(u,r,0,3),r.s=v,l.s*=v):l=t(u,r,0,N),r=u.minus(l.times(r)),!r.c[0]&&N==1&&(r.s=u.s),r)},i.multipliedBy=i.times=function(r,o){var l,v,u,a,b,c,h,g,m,_,z,P,F,U,ee,j=this,R=j.c,Q=(r=new E(r,o)).c;if(!R||!Q||!R[0]||!Q[0])return!j.s||!r.s||R&&!R[0]&&!Q||Q&&!Q[0]&&!R?r.c=r.e=r.s=null:(r.s*=j.s,!R||!Q?r.c=r.e=null:(r.c=[0],r.e=0)),r;for(v=ye(j.e/D)+ye(r.e/D),r.s*=j.s,h=R.length,_=Q.length,h<_&&(F=R,R=Q,Q=F,u=h,h=_,_=u),u=h+_,F=[];u--;F.push(0));for(U=_e,ee=Ne,u=_;--u>=0;){for(l=0,z=Q[u]%ee,P=Q[u]/ee|0,b=h,a=u+b;a>u;)g=R[--b]%ee,m=R[b]/ee|0,c=P*g+m*z,g=z*g+c%ee*ee+F[a]+l,l=(g/U|0)+(c/ee|0)+P*m,F[a--]=g%U;F[a]=l}return l?++v:F.splice(0,1),K(r,F,v)},i.negated=function(){var r=new E(this);return r.s=-r.s||null,r},i.plus=function(r,o){var l,v=this,u=v.s;if(r=new E(r,o),o=r.s,!u||!o)return new E(NaN);if(u!=o)return r.s=-o,v.minus(r);var a=v.e/D,b=r.e/D,c=v.c,h=r.c;if(!a||!b){if(!c||!h)return new E(u/0);if(!c[0]||!h[0])return h[0]?r:new E(c[0]?v:u*0)}if(a=ye(a),b=ye(b),c=c.slice(),u=a-b){for(u>0?(b=a,l=h):(u=-u,l=c),l.reverse();u--;l.push(0));l.reverse()}for(u=c.length,o=h.length,u-o<0&&(l=h,h=c,c=l,o=u),u=0;o;)u=(c[--o]=c[o]+h[o]+u)/_e|0,c[o]=_e===c[o]?0:c[o]%_e;return u&&(c=[u].concat(c),++b),K(r,c,b)},i.precision=i.sd=function(r,o){var l,v,u,a=this;if(r!=null&&r!==!!r)return Z(r,1,le),o==null?o=d:Z(o,0,8),$(new E(a),r,o);if(!(l=a.c))return null;if(u=l.length-1,v=u*D+1,u=l[u]){for(;u%10==0;u/=10,v--);for(u=l[0];u>=10;u/=10,v++);}return r&&a.e+1>v&&(v=a.e+1),v},i.shiftedBy=function(r){return Z(r,-ct,ct),this.times("1e"+r)},i.squareRoot=i.sqrt=function(){var r,o,l,v,u,a=this,b=a.c,c=a.s,h=a.e,g=f+4,m=new E("0.5");if(c!==1||!b||!b[0])return new E(!c||c<0&&(!b||b[0])?NaN:b?a:1/0);if(c=Math.sqrt(+ne(a)),c==0||c==1/0?(o=be(b),(o.length+h)%2==0&&(o+="0"),c=Math.sqrt(+o),h=ye((h+1)/2)-(h<0||h%2),c==1/0?o="5e"+h:(o=c.toExponential(),o=o.slice(0,o.indexOf("e")+1)+h),l=new E(o)):l=new E(c+""),l.c[0]){for(h=l.e,c=h+g,c<3&&(c=0);;)if(u=l,l=m.times(u.plus(t(a,u,g,1))),be(u.c).slice(0,c)===(o=be(l.c)).slice(0,c))if(l.e<h&&--c,o=o.slice(c-3,c+1),o=="9999"||!v&&o=="4999"){if(!v&&($(u,u.e+f+2,0),u.times(u).eq(a))){l=u;break}g+=4,c+=4,v=1}else{(!+o||!+o.slice(1)&&o.charAt(0)=="5")&&($(l,l.e+f+2,1),r=!l.times(l).eq(a));break}}return $(l,l.e+f+1,d,r)},i.toExponential=function(r,o){return r!=null&&(Z(r,0,le),r++),te(this,r,o,1)},i.toFixed=function(r,o){return r!=null&&(Z(r,0,le),r=r+this.e+1),te(this,r,o)},i.toFormat=function(r,o,l){var v,u=this;if(l==null)r!=null&&o&&typeof o=="object"?(l=o,o=null):r&&typeof r=="object"?(l=r,r=o=null):l=B;else if(typeof l!="object")throw Error(me+"Argument not an object: "+l);if(v=u.toFixed(r,o),u.c){var a,b=v.split("."),c=+l.groupSize,h=+l.secondaryGroupSize,g=l.groupSeparator||"",m=b[0],_=b[1],z=u.s<0,P=z?m.slice(1):m,F=P.length;if(h&&(a=c,c=h,h=a,F-=a),c>0&&F>0){for(a=F%c||c,m=P.substr(0,a);a<F;a+=c)m+=g+P.substr(a,c);h>0&&(m+=g+P.slice(a)),z&&(m="-"+m)}v=_?m+(l.decimalSeparator||"")+((h=+l.fractionGroupSize)?_.replace(new RegExp("\\d{"+h+"}\\B","g"),"$&"+(l.fractionGroupSeparator||"")):_):m}return(l.prefix||"")+v+(l.suffix||"")},i.toFraction=function(r){var o,l,v,u,a,b,c,h,g,m,_,z,P=this,F=P.c;if(r!=null&&(c=new E(r),!c.isInteger()&&(c.c||c.s!==1)||c.lt(p)))throw Error(me+"Argument "+(c.isInteger()?"out of range: ":"not an integer: ")+ne(c));if(!F)return new E(P);for(o=new E(p),g=l=new E(p),v=h=new E(p),z=be(F),a=o.e=z.length-P.e-1,o.c[0]=ut[(b=a%D)<0?D+b:b],r=!r||c.comparedTo(o)>0?a>0?o:g:c,b=S,S=1/0,c=new E(z),h.c[0]=0;m=t(c,o,0,1),u=l.plus(m.times(v)),u.comparedTo(r)!=1;)l=v,v=u,g=h.plus(m.times(u=g)),h=u,o=c.minus(m.times(u=o)),c=u;return u=t(r.minus(l),v,0,1),h=h.plus(u.times(g)),l=l.plus(u.times(v)),h.s=g.s=P.s,a=a*2,_=t(g,v,a,d).minus(P).abs().comparedTo(t(h,l,a,d).minus(P).abs())<1?[g,v]:[h,l],S=b,_},i.toNumber=function(){return+ne(this)},i.toPrecision=function(r,o){return r!=null&&Z(r,1,le),te(this,r,o,2)},i.toString=function(r){var o,l=this,v=l.s,u=l.e;return u===null?v?(o="Infinity",v<0&&(o="-"+o)):o="NaN":(r==null?o=u<=w||u>=y?Qe(be(l.c),u):Ae(be(l.c),u,"0"):r===10&&T?(l=$(new E(l),f+u+1,d),o=Ae(be(l.c),l.e,"0")):(Z(r,2,I.length,"Base"),o=n(Ae(be(l.c),u,"0"),10,r,v,!0)),v<0&&l.c[0]&&(o="-"+o)),o},i.valueOf=i.toJSON=function(){return ne(this)},i._isBigNumber=!0,i[Symbol.toStringTag]="BigNumber",i[Symbol.for("nodejs.util.inspect.custom")]=i.valueOf,e!=null&&E.set(e),E}function ye(e){var t=e|0;return e>0||e===t?t:t-1}function be(e){for(var t,n,s=1,i=e.length,p=e[0]+"";s<i;){for(t=e[s++]+"",n=D-t.length;n--;t="0"+t);p+=t}for(i=p.length;p.charCodeAt(--i)===48;);return p.slice(0,i+1||1)}function Pe(e,t){var n,s,i=e.c,p=t.c,f=e.s,d=t.s,w=e.e,y=t.e;if(!f||!d)return null;if(n=i&&!i[0],s=p&&!p[0],n||s)return n?s?0:-d:f;if(f!=d)return f;if(n=f<0,s=w==y,!i||!p)return s?0:!i^n?1:-1;if(!s)return w>y^n?1:-1;for(d=(w=i.length)<(y=p.length)?w:y,f=0;f<d;f++)if(i[f]!=p[f])return i[f]>p[f]^n?1:-1;return w==y?0:w>y^n?1:-1}function Z(e,t,n,s){if(e<t||e>n||e!==we(e))throw Error(me+(s||"Argument")+(typeof e=="number"?e<t||e>n?" out of range: ":" not an integer: ":" not a primitive number: ")+String(e))}function Je(e){var t=e.c.length-1;return ye(e.e/D)==t&&e.c[t]%2!=0}function Qe(e,t){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(t<0?"e":"e+")+t}function Ae(e,t,n){var s,i;if(t<0){for(i=n+".";++t;i+=n);e=i+e}else if(s=e.length,++t>s){for(i=n,t-=s;--t;i+=n);e+=i}else t<s&&(e=e.slice(0,t)+"."+e.slice(t));return e}var Un=on();function vt(e){return new Un(e).div(1e18).toString(10)}function qn(e){Be(e,"svelte-1u0a3bu",`table.svelte-1u0a3bu.svelte-1u0a3bu{border-spacing:0px}table.svelte-1u0a3bu thead.svelte-1u0a3bu{box-shadow:0px 1px 0px rgba(0, 0, 0, 0.1);background:var(--account-select-background-color, var(--foreground-color))}th.svelte-1u0a3bu.svelte-1u0a3bu,td.svelte-1u0a3bu.svelte-1u0a3bu{text-align:left;padding:0.4rem 0.5rem}td.svelte-1u0a3bu.svelte-1u0a3bu{font-size:var(
      --account-select-font-size-6,
      var(--onboard-font-size-6, var(--font-size-6))
    );line-height:var(
      --account-select-font-line-height-1,
      var(--onboard-font-line-height-1, var(--font-line-height-1))
    )}tbody.svelte-1u0a3bu tr.svelte-1u0a3bu{box-shadow:0px 1px 0px rgba(0, 0, 0, 0.1)}tbody.svelte-1u0a3bu tr.svelte-1u0a3bu:hover{background:var(
      --account-select-primary-100,
      var(--onboard-primary-100, var(--primary-100))
    );color:var(--account-select-text-color, var(--onboard-black, var(--black)))}.address-table.svelte-1u0a3bu.svelte-1u0a3bu{min-height:4.5rem;max-height:14rem;overflow:auto}.selected-row.svelte-1u0a3bu.svelte-1u0a3bu,.selected-row.svelte-1u0a3bu.svelte-1u0a3bu:hover{background:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );color:var(
      --account-select-primary-100,
      var(--onboard-primary-100, var(--primary-100))
    )}.asset-td.svelte-1u0a3bu.svelte-1u0a3bu{font-weight:bold}.w-100.svelte-1u0a3bu.svelte-1u0a3bu{width:100%}.pointer.svelte-1u0a3bu.svelte-1u0a3bu{cursor:pointer}@media all and (min-width: 768px){.address-table.svelte-1u0a3bu.svelte-1u0a3bu{max-height:27rem}td.svelte-1u0a3bu.svelte-1u0a3bu{font-size:var(
        --account-select-font-size-5,
        var(--onboard-font-size-5, var(--font-size-5))
      )}th.svelte-1u0a3bu.svelte-1u0a3bu,td.svelte-1u0a3bu.svelte-1u0a3bu{padding:0.5rem 0.5rem}}`)}function Nt(e,t,n){const s=e.slice();return s[6]=t[n],s}function zt(e){let t,n=e[1],s=[];for(let i=0;i<n.length;i+=1)s[i]=Lt(Nt(e,n,i));return{c(){for(let i=0;i<s.length;i+=1)s[i].c();t=nn()},m(i,p){for(let f=0;f<s.length;f+=1)s[f]&&s[f].m(i,p);V(i,t,p)},p(i,p){if(p&7){n=i[1];let f;for(f=0;f<n.length;f+=1){const d=Nt(i,n,f);s[f]?s[f].p(d,p):(s[f]=Lt(d),s[f].c(),s[f].m(t.parentNode,t))}for(;f<s.length;f+=1)s[f].d(1);s.length=n.length}},d(i){et(s,i),i&&H(t)}}}function Lt(e){let t,n,s=e[6].address+"",i,p,f,d=e[6].derivationPath+"",w,y,x,S=vt(e[6].balance.value.toString())+"",M,N,A=e[6].balance.asset+"",B,I,T,E;function te(){return e[5](e[6])}return{c(){t=C("tr"),n=C("td"),i=J(s),p=G(),f=C("td"),w=J(d),y=G(),x=C("td"),M=J(S),N=G(),B=J(A),I=G(),dt(n,"font-family","'Courier New', Courier, monospace"),O(n,"class","svelte-1u0a3bu"),O(f,"class","svelte-1u0a3bu"),O(x,"class","asset-td svelte-1u0a3bu"),O(t,"class","pointer svelte-1u0a3bu"),de(t,"selected-row",e[0]&&e[0].address===e[6].address)},m(X,K){V(X,t,K),k(t,n),k(n,i),k(t,p),k(t,f),k(f,w),k(t,y),k(t,x),k(x,M),k(x,N),k(x,B),k(t,I),T||(E=ue(t,"click",te),T=!0)},p(X,K){e=X,K&2&&s!==(s=e[6].address+"")&&Ee(i,s),K&2&&d!==(d=e[6].derivationPath+"")&&Ee(w,d),K&2&&S!==(S=vt(e[6].balance.value.toString())+"")&&Ee(M,S),K&2&&A!==(A=e[6].balance.asset+"")&&Ee(B,A),K&3&&de(t,"selected-row",e[0]&&e[0].address===e[6].address)},d(X){X&&H(t),T=!1,E()}}}function Gn(e){let t,n,s,i,p,f,d,w=e[1]&&e[1].length&&zt(e);return{c(){t=C("div"),n=C("table"),s=C("colgroup"),s.innerHTML=`<col style="width: 50%;"/> 
      <col style="width: 28%;"/> 
      <col style="width: 22%;"/>`,i=G(),p=C("thead"),p.innerHTML=`<tr><th class="svelte-1u0a3bu">Address</th> 
        <th class="svelte-1u0a3bu">DPATH</th> 
        <th class="svelte-1u0a3bu">Asset</th></tr>`,f=G(),d=C("tbody"),w&&w.c(),O(p,"class"," svelte-1u0a3bu"),O(d,"class","svelte-1u0a3bu"),O(n,"class","w-100 svelte-1u0a3bu"),O(t,"class","address-table svelte-1u0a3bu")},m(y,x){V(y,t,x),k(t,n),k(n,s),k(n,i),k(n,p),k(n,f),k(n,d),w&&w.m(d,null)},p(y,[x]){y[1]&&y[1].length?w?w.p(y,x):(w=zt(y),w.c(),w.m(d,null)):w&&(w.d(1),w=null)},i:ae,o:ae,d(y){y&&H(t),w&&w.d()}}}function Vn(e,t,n){let s,{accountsListObject:i}=t,{accountSelected:p=void 0}=t,{showEmptyAddresses:f}=t;const d=y=>{n(0,p=y)},w=y=>d(y);return e.$$set=y=>{"accountsListObject"in y&&n(3,i=y.accountsListObject),"accountSelected"in y&&n(0,p=y.accountSelected),"showEmptyAddresses"in y&&n(4,f=y.showEmptyAddresses)},e.$$.update=()=>{e.$$.dirty&24&&n(1,s=f?i&&i.all:i&&i.filtered)},[p,s,d,i,f,w]}class Wn extends Te{constructor(t){super(),Me(this,t,Vn,Gn,Ce,{accountsListObject:3,accountSelected:0,showEmptyAddresses:4},qn)}}function $n(e){Be(e,"svelte-14p0oc3",".loading-container.svelte-14p0oc3.svelte-14p0oc3{display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:inherit;font-size:inherit;color:inherit;margin-left:auto}span.svelte-14p0oc3.svelte-14p0oc3{font-family:inherit;font-size:0.889em;margin-top:1rem}.loading.svelte-14p0oc3.svelte-14p0oc3{display:inline-block;position:relative}.loading.svelte-14p0oc3 div.svelte-14p0oc3{box-sizing:border-box;font-size:inherit;display:block;position:absolute;border:3px solid;border-radius:50%;animation:svelte-14p0oc3-bn-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:currentColor transparent transparent transparent}.loading.svelte-14p0oc3 .loading-first.svelte-14p0oc3{animation-delay:-0.45s}.loading.svelte-14p0oc3 .loading-second.svelte-14p0oc3{animation-delay:-0.3s}.loading.svelte-14p0oc3 .loading-third.svelte-14p0oc3{animation-delay:-0.15s}@keyframes svelte-14p0oc3-bn-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}")}function Pt(e){let t,n;return{c(){t=C("span"),n=J(e[0]),O(t,"class","svelte-14p0oc3")},m(s,i){V(s,t,i),k(t,n)},p(s,i){i&1&&Ee(n,s[0])},d(s){s&&H(t)}}}function Xn(e){let t,n,s,i,p,f,d,w,y,x,S,M,N=e[0]&&Pt(e);return{c(){t=C("div"),n=C("div"),s=C("div"),p=G(),f=C("div"),w=G(),y=C("div"),M=G(),N&&N.c(),O(s,"class","loading-first svelte-14p0oc3"),O(s,"style",i=`height: ${e[1]}; width: ${e[1]};`),O(f,"class","loading-second svelte-14p0oc3"),O(f,"style",d=`height: ${e[1]}; width: ${e[1]};`),O(y,"class","loading-third svelte-14p0oc3"),O(y,"style",x=`height: ${e[1]}; width: ${e[1]};`),O(n,"class","loading svelte-14p0oc3"),O(n,"style",S=`height: ${e[1]}; width: ${e[1]};`),O(t,"class","loading-container svelte-14p0oc3")},m(A,B){V(A,t,B),k(t,n),k(n,s),k(n,p),k(n,f),k(n,w),k(n,y),k(t,M),N&&N.m(t,null)},p(A,[B]){B&2&&i!==(i=`height: ${A[1]}; width: ${A[1]};`)&&O(s,"style",i),B&2&&d!==(d=`height: ${A[1]}; width: ${A[1]};`)&&O(f,"style",d),B&2&&x!==(x=`height: ${A[1]}; width: ${A[1]};`)&&O(y,"style",x),B&2&&S!==(S=`height: ${A[1]}; width: ${A[1]};`)&&O(n,"style",S),A[0]?N?N.p(A,B):(N=Pt(A),N.c(),N.m(t,null)):N&&(N.d(1),N=null)},i:ae,o:ae,d(A){A&&H(t),N&&N.d()}}}function Yn(e,t,n){let{description:s=""}=t,{size:i="2rem"}=t;return e.$$set=p=>{"description"in p&&n(0,s=p.description),"size"in p&&n(1,i=p.size)},[s,i]}class Jn extends Te{constructor(t){super(),Me(this,t,Yn,Xn,Ce,{description:0,size:1},$n)}}function Qn(e){Be(e,"svelte-1t799sf",`button.svelte-1t799sf{align-items:center;padding:0.5rem 0.5rem;color:var(--account-select-white, var(--onboard-white, var(--white)));border-radius:1.5rem;font-family:var(
      --account-select-font-family-normal,
      var(--font-family-normal, var(--font-family-normal))
    );font-style:normal;font-weight:bold;font-size:var(
      --account-select-font-size-6,
      var(--onboard-font-size-6, var(--font-size-6))
    );line-height:var(
      --account-select-font-line-height-1,
      var(--onboard-line-height-1, var(--line-height-1))
    );border:none;width:8rem}.scan-accounts-btn.svelte-1t799sf{background:var(--account-select-gray-500, var(--action-color));color:var(--account-select-primary-100, inherit);display:flex;justify-content:center;align-items:center;cursor:pointer}input.svelte-1t799sf:hover{border-color:var(
      --account-select-primary-500,
      var(--onboard-primary-300, var(--primary-300))
    )}input.svelte-1t799sf:focus{border-color:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );box-shadow:0 0 1px 1px
      var(
        --account-select-primary-500,
        var(--onboard-primary-500, var(--primary-500))
      );box-shadow:0 0 0 1px -moz-mac-focusring;outline:none}input.svelte-1t799sf:disabled{background:var(
      --account-select-accent-background-color,
      var(--onboard-gray-100, var(--gray-100))
    )}input[type='checkbox'].svelte-1t799sf{-webkit-appearance:none;width:auto;background:var(--account-select-background-color, var(--onboard-white, var(--white)));border:1px solid
      var(--account-select-gray-300, var(--onboard-gray-300, var(--gray-300)));padding:0.5em;border-radius:3px;display:flex;justify-content:center;align-items:center;position:relative;cursor:pointer;height:0.5rem;width:0.5rem}input[type='checkbox'].svelte-1t799sf:hover{border-color:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    )}input[type='checkbox'].svelte-1t799sf:checked{background:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );border-color:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );color:var(--account-select-white, var(--onboard-white, var(--white)))}input[type='checkbox'].svelte-1t799sf:checked:after{content:url("data:image/svg+xml,%3Csvg width='0.885em' height='0.6em' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 6L5 11L14 2L12.59 0.58L5 8.17L1.41 4.59L0 6Z' fill='white'/%3E%3C/svg%3E");font-size:var(
      --account-select-font-size-7,
      var(--onboard-font-size-7, var(--font-size-7))
    );position:absolute;color:var(--account-select-white, var(--onboard-white, var(--white)))}.checkbox-container.svelte-1t799sf{display:flex;align-items:center;position:absolute;top:238px;left:14px;font-size:14px}.checkbox-input.svelte-1t799sf{margin-right:0.5rem}.error-msg.svelte-1t799sf{color:var(
      --account-select-danger-500,
      var(--onboard-danger-500, var(--danger-500))
    );font-size:var(--account-select-font-size-7, var(--font-size-7));max-width:15rem;line-height:1;position:absolute;top:260px;left:18px}.table-controls.svelte-1t799sf{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0.5rem;border-radius:0.4rem 0.4rem 0 0;background:var(--account-select-accent-background-color, var(--border-color))}.cursor-pointer.svelte-1t799sf{cursor:pointer}@media all and (min-width: 768px){.checkbox-container.svelte-1t799sf{display:flex;align-items:center;position:unset;top:unset;left:unset;font-size:unset}.checkbox-input.svelte-1t799sf{margin-right:0.75rem}.error-msg.svelte-1t799sf{position:unset;top:unset;left:unset}.table-controls.svelte-1t799sf{height:3.5rem;justify-content:space-between}input[type='checkbox'].svelte-1t799sf{height:1.5rem;width:1.5rem}button.svelte-1t799sf{padding:0.75rem 1.5rem;font-size:var(
        --account-select-font-size-5,
        var(--onboard-font-size-5, var(--font-size-5))
      );width:unset}}@media all and (max-width: 326px){.checkbox-container.svelte-1t799sf{top:328px}.error-msg.svelte-1t799sf{top:350px}}`)}function Ct(e){let t,n;return{c(){t=C("span"),n=J(e[3]),O(t,"class","error-msg svelte-1t799sf")},m(s,i){V(s,t,i),k(t,n)},p(s,i){i&8&&Ee(n,s[3])},d(s){s&&H(t)}}}function Bt(e){let t,n,s;return n=new Jn({props:{size:"1.5rem"}}),{c(){t=J(`Scanning...
      `),Ke(n.$$.fragment)},m(i,p){V(i,t,p),We(n,i,p),s=!0},i(i){s||(xe(n.$$.fragment,i),s=!0)},o(i){Le(n.$$.fragment,i),s=!1},d(i){i&&H(t),$e(n,i)}}}function Mt(e){let t;return{c(){t=J("Scan Accounts")},m(n,s){V(n,t,s)},d(n){n&&H(t)}}}function Zn(e){let t,n,s,i,p,f,d,w,y,x,S,M,N=e[3]&&Ct(e),A=e[2]&&Bt(),B=!e[2]&&Mt();return{c(){t=C("div"),n=C("div"),s=C("input"),i=G(),p=C("label"),p.textContent="Show Empty Addresses",f=G(),N&&N.c(),d=G(),w=C("button"),A&&A.c(),y=G(),B&&B.c(),O(s,"id","show-empty-addresses"),O(s,"type","checkbox"),O(s,"class","checkbox-input svelte-1t799sf"),O(p,"for","show-empty-addresses"),O(p,"class","ml2 cursor-pointer font-5 svelte-1t799sf"),O(n,"class","checkbox-container svelte-1t799sf"),O(w,"class","scan-accounts-btn svelte-1t799sf"),O(w,"id","scan-accounts"),O(t,"class","table-controls svelte-1t799sf")},m(I,T){V(I,t,T),k(t,n),k(n,s),s.checked=e[0],k(n,i),k(n,p),k(t,f),N&&N.m(t,null),k(t,d),k(t,w),A&&A.m(w,null),k(w,y),B&&B.m(w,null),x=!0,S||(M=[ue(s,"change",e[4]),ue(w,"click",e[5])],S=!0)},p(I,[T]){T&1&&(s.checked=I[0]),I[3]?N?N.p(I,T):(N=Ct(I),N.c(),N.m(t,d)):N&&(N.d(1),N=null),I[2]?A?T&4&&xe(A,1):(A=Bt(),A.c(),xe(A,1),A.m(w,y)):A&&(Bn(),Le(A,1,1,()=>{A=null}),Mn()),I[2]?B&&(B.d(1),B=null):B||(B=Mt(),B.c(),B.m(w,null))},i(I){x||(xe(A),x=!0)},o(I){Le(A),x=!1},d(I){I&&H(t),N&&N.d(),A&&A.d(),B&&B.d(),S=!1,ke(M)}}}function Kn(e,t,n){let{scanAccounts:s}=t,{loadingAccounts:i}=t,{showEmptyAddresses:p}=t,{errorFromScan:f}=t;function d(){p=this.checked,n(0,p)}const w=async()=>await s();return e.$$set=y=>{"scanAccounts"in y&&n(1,s=y.scanAccounts),"loadingAccounts"in y&&n(2,i=y.loadingAccounts),"showEmptyAddresses"in y&&n(0,p=y.showEmptyAddresses),"errorFromScan"in y&&n(3,f=y.errorFromScan)},[p,s,i,f,d,w]}class er extends Te{constructor(t){super(),Me(this,t,Kn,Zn,Ce,{scanAccounts:1,loadingAccounts:2,showEmptyAddresses:0,errorFromScan:3},Qn)}}function tr(e){Be(e,"svelte-1vabcrr",`select.svelte-1vabcrr{display:block;margin:0;-moz-appearance:none;-webkit-appearance:none;appearance:none;font-family:inherit;background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23242835%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, transparent 0%, transparent 100%);background-repeat:no-repeat, repeat;background-position:right 1rem top 1rem, 0 0;background-size:0.65em auto, 100%;scrollbar-width:none;width:100%;padding:0.5rem 1.8rem 0.5rem 1rem;border-radius:8px;font-size:var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );transition:all 200ms ease-in-out;border:2px solid var(--account-select-gray-200, var(--border-color));box-sizing:border-box;height:3rem;-ms-overflow-style:none}select.svelte-1vabcrr::-webkit-scrollbar,input.svelte-1vabcrr::-webkit-scrollbar{display:none}select.svelte-1vabcrr::-ms-expand,input.svelte-1vabcrr::-ms-expand{display:none}input[type='text'].svelte-1vabcrr{display:block;margin:0;-moz-appearance:none;-webkit-appearance:none;appearance:none;scrollbar-width:none;width:100%;padding:0.5rem 2.6rem 0.5rem 1rem;border-radius:8px;font-size:var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );line-height:var(
      --account-select-font-line-height-1,
      var(--onboard-font-line-height-1, var(--font-line-height-1))
    );color:var(
      --account-select-gray-600,
      var(--onboard-gray-600, var(--gray-600))
    );transition:all 200ms ease-in-out;border:2px solid
      var(--account-select-gray-200, var(--onboard-gray-200, var(--gray-200)));box-sizing:border-box;height:3rem;-ms-overflow-style:none}button.svelte-1vabcrr{align-items:center;padding:0.75rem 1.5rem;color:var(--account-select-white, var(--onboard-white, var(--white)));border-radius:1.5rem;font-family:var(
      --account-select-font-family-normal,
      var(--onboard-font-family-normal, var(--font-family-normal))
    );font-style:normal;font-weight:bold;font-size:var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );line-height:var(
      --account-select-font-line-height-1,
      var(--onboard-line-height-1, var(--line-height-1))
    );border:none}.connect-btn.svelte-1vabcrr:disabled{background:var(
      --account-select-primary-300,
      var(--onboard-primary-300, var(--primary-300))
    );cursor:default}.connect-btn.svelte-1vabcrr{background:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );cursor:pointer}.dismiss-action.svelte-1vabcrr{color:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );cursor:pointer;margin-left:var(
      --account-select-margin-4,
      var(--onboard-margin-4, var(--margin-4))
    )}select.svelte-1vabcrr:hover,input.svelte-1vabcrr:hover{border-color:var(
      --account-select-primary-300,
      var(--onboard-primary-300, var(--primary-300))
    )}select.svelte-1vabcrr:focus,input.svelte-1vabcrr:focus{border-color:var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );box-shadow:0 0 1px 1px
      var(
        --account-select-primary-500,
        var(--onboard-primary-500, var(--primary-500))
      );box-shadow:0 0 0 1px -moz-mac-focusring;outline:none}select.svelte-1vabcrr:disabled{background:var(
      --account-select-accent-background-color,
      var(--onboard-gray-100, var(--gray-100))
    )}option.svelte-1vabcrr{font-weight:300}.close.svelte-1vabcrr{cursor:pointer;padding:0.5rem}.container.svelte-1vabcrr{font-family:var(--onboard-font-family-normal, var(--font-family-normal));color:var(--account-select-text-color, var(--text-color));position:fixed;top:0;right:0;z-index:var(
      --onboard-account-select-modal-z-index,
      var(--account-select-modal-z-index)
    );display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);background:var(--account-select-background-color, rgba(0, 0, 0, 0.2))}.fixed.svelte-1vabcrr{position:fixed}.h-w-100.svelte-1vabcrr{width:100vw;height:100vh}.hardware-connect-modal.svelte-1vabcrr{width:100%;flex-flow:column;display:flex;max-height:51.75rem;background:var(--account-select-background-color, var(--background-color));box-shadow:var(
      --account-select-shadow,
      var(--onboard-shadow-1, var(--shadow-1))
    );border-radius:1.5rem}.account-select-modal-position.svelte-1vabcrr{position:absolute;top:var(
      --onboard-account-select-modal-top,
      var(--account-select-modal-top)
    );bottom:var(
      --onboard-account-select-modal-bottom,
      var(--account-select-modal-bottom)
    );left:var(
      --onboard-account-select-modal-left,
      var(--account-select-modal-left)
    );right:var(
      --onboard-account-select-modal-right,
      var(--account-select-modal-right)
    );max-height:100vh;overflow:scroll;scrollbar-width:none;-ms-overflow-style:none}.account-select-modal-position.svelte-1vabcrr::-webkit-scrollbar{display:none}.connect-wallet-header.svelte-1vabcrr{position:relative;border-bottom:1px solid var(--border-color, transparent);border-radius:1.5rem 1.5rem 0 0;display:flex;justify-content:space-between;align-items:center;width:100%}.modal-controls.svelte-1vabcrr{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;padding:1rem;padding-top:0}.control-label.svelte-1vabcrr{font-style:normal;font-weight:bold;font-size:var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );line-height:var(
      --account-select-font-line-height-1,
      var(--onboard-font-line-height-1, var(--font-line-height-1))
    );margin-top:var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    );margin-bottom:var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    );color:var(--account-select-gray-700, inherit)}.asset-select.svelte-1vabcrr{width:6rem}.network-select.svelte-1vabcrr{min-width:12rem}.w-100.svelte-1vabcrr{width:100%}.base-path-container.svelte-1vabcrr{position:relative;margin-right:var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    )}.hidden-input-select.svelte-1vabcrr{position:absolute;top:2.7rem;right:0.2rem;width:2.5rem;height:2.5rem;background:transparent;cursor:pointer}.asset-container.svelte-1vabcrr{margin-right:var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    )}.table-section.svelte-1vabcrr{max-height:31.8rem;padding:1rem;margin-top:2rem}.table-container.svelte-1vabcrr{border:2px solid var(--account-select-gray-200, var(--border-color));box-sizing:border-box;border-radius:0.5rem}.address-found-count.svelte-1vabcrr{padding:0 2rem}@media all and (min-width: 768px){.hardware-connect-modal.svelte-1vabcrr{width:50rem;display:table;flex-flow:unset}.modal-controls.svelte-1vabcrr{flex-wrap:nowrap}.base-path-select.svelte-1vabcrr{min-width:20rem}.table-section.svelte-1vabcrr{margin-top:unset}.account-select-modal-position.svelte-1vabcrr{max-height:unset;overflow:unset}}`)}function Tt(e,t,n){const s=e.slice();return s[26]=t[n],s}function It(e,t,n){const s=e.slice();return s[29]=t[n],s}function Dt(e,t,n){const s=e.slice();return s[32]=t[n],s}function nr(e){let t,n,s,i,p=e[7],f=[];for(let w=0;w<p.length;w+=1)f[w]=jt(Dt(e,p,w));let d=e[10]&&or();return{c(){t=C("select");for(let w=0;w<f.length;w+=1)f[w].c();n=nn(),d&&d.c(),O(t,"class","base-path-select svelte-1vabcrr")},m(w,y){V(w,t,y);for(let x=0;x<f.length;x+=1)f[x]&&f[x].m(t,null);k(t,n),d&&d.m(t,null),s||(i=ue(t,"change",e[12]),s=!0)},p(w,y){if(y[0]&128){p=w[7];let x;for(x=0;x<p.length;x+=1){const S=Dt(w,p,x);f[x]?f[x].p(S,y):(f[x]=jt(S),f[x].c(),f[x].m(t,n))}for(;x<f.length;x+=1)f[x].d(1);f.length=p.length}},d(w){w&&H(t),et(f,w),d&&d.d(),s=!1,i()}}}function rr(e){let t,n,s,i,p;return{c(){t=C("input"),n=G(),s=C("span"),O(t,"type","text"),O(t,"class","base-path-select svelte-1vabcrr"),O(t,"placeholder","type/your/custom/path..."),O(s,"class","hidden-input-select svelte-1vabcrr")},m(f,d){V(f,t,d),V(f,n,d),V(f,s,d),i||(p=[ue(t,"change",e[14]),ue(s,"click",e[13])],i=!0)},p:ae,d(f){f&&H(t),f&&H(n),f&&H(s),i=!1,ke(p)}}}function jt(e){let t,n=e[32].label+"",s,i,p=e[32].value+"",f,d;return{c(){t=C("option"),s=J(n),i=J(" - "),f=J(p),d=G(),t.__value=e[32].value,t.value=t.__value,O(t,"class","svelte-1vabcrr")},m(w,y){V(w,t,y),k(t,s),k(t,i),k(t,f),k(t,d)},p:ae,d(w){w&&H(t)}}}function or(e){let t;return{c(){t=C("option"),t.textContent="Custom Derivation Path",t.__value="customPath",t.value=t.__value,O(t,"class","svelte-1vabcrr")},m(n,s){V(n,t,s)},d(n){n&&H(t)}}}function Rt(e){let t,n=e[29].label+"",s,i;return{c(){t=C("option"),s=J(n),i=G(),t.__value=e[29],t.value=t.__value,O(t,"class","svelte-1vabcrr")},m(p,f){V(p,t,f),k(t,s),k(t,i)},p:ae,d(p){p&&H(t)}}}function Ft(e){let t,n=e[26].label+"",s,i;return{c(){t=C("option"),s=J(n),i=G(),t.__value=e[26].id,t.value=t.__value,O(t,"class","svelte-1vabcrr")},m(p,f){V(p,t,f),k(t,s),k(t,i)},p:ae,d(p){p&&H(t)}}}function Ht(e){let t=(e[0]&&e[0].all.length||0)+"",n,s,i=e[0]&&e[0].all.length!==1?"es":"",p,f;return{c(){n=J(t),s=J(" total address"),p=J(i),f=J(" found")},m(d,w){V(d,n,w),V(d,s,w),V(d,p,w),V(d,f,w)},p(d,w){w[0]&1&&t!==(t=(d[0]&&d[0].all.length||0)+"")&&Ee(n,t),w[0]&1&&i!==(i=d[0]&&d[0].all.length!==1?"es":"")&&Ee(p,i)},d(d){d&&H(n),d&&H(s),d&&H(p),d&&H(f)}}}function Ut(e){let t=(e[0]&&e[0].filtered.length||0)+"",n,s,i=e[0]&&e[0].filtered.length!==1?"es":"",p,f;return{c(){n=J(t),s=J(` total
          address`),p=J(i),f=J(" found")},m(d,w){V(d,n,w),V(d,s,w),V(d,p,w),V(d,f,w)},p(d,w){w[0]&1&&t!==(t=(d[0]&&d[0].filtered.length||0)+"")&&Ee(n,t),w[0]&1&&i!==(i=d[0]&&d[0].filtered.length!==1?"es":"")&&Ee(p,i)},d(d){d&&H(n),d&&H(s),d&&H(p),d&&H(f)}}}function ir(e){let t,n,s,i,p,f,d,w,y,x,S,M,N,A,B,I,T,E,te,X,K,$,ne,r,o,l,v,u,a,b,c,h,g,m,_,z,P,F,U,ee,j,R,Q,Se,Ie;d=new Fn({});function De(L,ie){if(L[2])return rr;if(!L[2])return nr}let ce=De(e),re=ce&&ce(e),oe=e[8],q=[];for(let L=0;L<oe.length;L+=1)q[L]=Rt(It(e,oe,L));let W=e[9],fe=[];for(let L=0;L<W.length;L+=1)fe[L]=Ft(Tt(e,W,L));function cn(L){e[22](L)}let yt={scanAccounts:e[15],loadingAccounts:e[4],errorFromScan:e[5]};e[3]!==void 0&&(yt.showEmptyAddresses=e[3]),l=new er({props:yt}),rt.push(()=>Ot(l,"showEmptyAddresses",cn));function un(L){e[23](L)}let _t={accountsListObject:e[0],showEmptyAddresses:e[3]};e[1]!==void 0&&(_t.accountSelected=e[1]),a=new Wn({props:_t}),rt.push(()=>Ot(a,"accountSelected",un));let he=e[3]&&Ht(e),pe=!e[3]&&Ut(e);return{c(){t=C("div"),n=C("div"),s=C("header"),i=C("div"),p=G(),f=C("div"),Ke(d.$$.fragment),w=G(),y=C("section"),x=C("div"),S=C("h4"),S.textContent="Select Base Path",M=G(),re&&re.c(),N=G(),A=C("div"),B=C("h4"),B.textContent="Asset",I=G(),T=C("select");for(let L=0;L<q.length;L+=1)q[L].c();E=G(),te=C("div"),X=C("h4"),X.textContent="Network",K=G(),$=C("select");for(let L=0;L<fe.length;L+=1)fe[L].c();ne=G(),r=C("section"),o=C("div"),Ke(l.$$.fragment),u=G(),Ke(a.$$.fragment),c=G(),h=C("section"),g=C("div"),he&&he.c(),m=G(),pe&&pe.c(),_=G(),z=C("div"),P=C("div"),P.textContent="Dismiss",F=G(),U=C("button"),ee=J("Connect"),O(f,"class","close svelte-1vabcrr"),O(s,"class","connect-wallet-header svelte-1vabcrr"),O(S,"class","control-label svelte-1vabcrr"),O(x,"class","w-100 base-path-container svelte-1vabcrr"),O(B,"class","control-label svelte-1vabcrr"),O(T,"class","asset-select svelte-1vabcrr"),e[6].asset===void 0&&ze(()=>e[20].call(T)),O(A,"class","asset-container svelte-1vabcrr"),O(X,"class","control-label svelte-1vabcrr"),O($,"class","network-select svelte-1vabcrr"),e[6].chainId===void 0&&ze(()=>e[21].call($)),O(te,"class","network-container"),O(y,"class","modal-controls svelte-1vabcrr"),O(o,"class","w-100 table-container svelte-1vabcrr"),O(r,"class","table-section svelte-1vabcrr"),O(g,"class","address-found-count svelte-1vabcrr"),O(P,"class","dismiss-action svelte-1vabcrr"),O(P,"id","dismiss-account-select"),O(U,"class","connect-btn svelte-1vabcrr"),O(U,"id","connect-accounts"),U.disabled=j=!e[1],O(z,"class","modal-controls svelte-1vabcrr"),O(n,"class","hardware-connect-modal svelte-1vabcrr"),de(n,"account-select-modal-position",!e[11]),O(t,"class","container svelte-1vabcrr"),de(t,"h-w-100",!e[11]),de(t,"fixed",!e[11])},m(L,ie){V(L,t,ie),k(t,n),k(n,s),k(s,i),k(s,p),k(s,f),We(d,f,null),k(n,w),k(n,y),k(y,x),k(x,S),k(x,M),re&&re.m(x,null),k(y,N),k(y,A),k(A,B),k(A,I),k(A,T);for(let ve=0;ve<q.length;ve+=1)q[ve]&&q[ve].m(T,null);Ye(T,e[6].asset,!0),k(y,E),k(y,te),k(te,X),k(te,K),k(te,$);for(let ve=0;ve<fe.length;ve+=1)fe[ve]&&fe[ve].m($,null);Ye($,e[6].chainId,!0),k(n,ne),k(n,r),k(r,o),We(l,o,null),k(o,u),We(a,o,null),k(n,c),k(n,h),k(h,g),he&&he.m(g,null),k(g,m),pe&&pe.m(g,null),k(h,_),k(h,z),k(z,P),k(z,F),k(z,U),k(U,ee),Q=!0,Se||(Ie=[ue(f,"click",e[17]),ue(T,"change",e[20]),ue($,"change",e[21]),ue(P,"click",e[17]),ue(U,"click",e[16])],Se=!0)},p(L,ie){if(ce===(ce=De(L))&&re?re.p(L,ie):(re&&re.d(1),re=ce&&ce(L),re&&(re.c(),re.m(x,null))),ie[0]&256){oe=L[8];let Y;for(Y=0;Y<oe.length;Y+=1){const qe=It(L,oe,Y);q[Y]?q[Y].p(qe,ie):(q[Y]=Rt(qe),q[Y].c(),q[Y].m(T,null))}for(;Y<q.length;Y+=1)q[Y].d(1);q.length=oe.length}if(ie[0]&320&&Ye(T,L[6].asset),ie[0]&512){W=L[9];let Y;for(Y=0;Y<W.length;Y+=1){const qe=Tt(L,W,Y);fe[Y]?fe[Y].p(qe,ie):(fe[Y]=Ft(qe),fe[Y].c(),fe[Y].m($,null))}for(;Y<fe.length;Y+=1)fe[Y].d(1);fe.length=W.length}ie[0]&320&&Ye($,L[6].chainId);const ve={};ie[0]&16&&(ve.loadingAccounts=L[4]),ie[0]&32&&(ve.errorFromScan=L[5]),!v&&ie[0]&8&&(v=!0,ve.showEmptyAddresses=L[3],At(()=>v=!1)),l.$set(ve);const Xe={};ie[0]&1&&(Xe.accountsListObject=L[0]),ie[0]&8&&(Xe.showEmptyAddresses=L[3]),!b&&ie[0]&2&&(b=!0,Xe.accountSelected=L[1],At(()=>b=!1)),a.$set(Xe),L[3]?he?he.p(L,ie):(he=Ht(L),he.c(),he.m(g,m)):he&&(he.d(1),he=null),L[3]?pe&&(pe.d(1),pe=null):pe?pe.p(L,ie):(pe=Ut(L),pe.c(),pe.m(g,null)),(!Q||ie[0]&2&&j!==(j=!L[1]))&&(U.disabled=j)},i(L){Q||(xe(d.$$.fragment,L),xe(l.$$.fragment,L),xe(a.$$.fragment,L),ze(()=>{Q&&(R||(R=ot(n,it,{},!0)),R.run(1))}),Q=!0)},o(L){Le(d.$$.fragment,L),Le(l.$$.fragment,L),Le(a.$$.fragment,L),R||(R=ot(n,it,{},!1)),R.run(0),Q=!1},d(L){L&&H(t),$e(d),re&&re.d(),et(q,L),et(fe,L),$e(l),$e(a),he&&he.d(),pe&&pe.d(),L&&R&&R.end(),Se=!1,ke(Ie)}}}function sr(e,t,n){let{selectAccountOptions:s}=t,{accounts$:i}=t;const{basePaths:p,assets:f,chains:d,scanAccounts:w,supportsCustomPath:y=!0,containerElement:x}=s;let S,M,N=!1,A=!0,B=!1,I="",T={derivationPath:p[0]&&p[0].value||"",chainId:d[0].id||"",asset:f[0]||null};const E=a=>{let b=a.target.value;if(b==="customPath")return n(2,N=!0);n(6,T.derivationPath=b,T)},te=()=>{n(2,N=!1),n(6,T.derivationPath=p[0].value,T)},X=a=>{let b=a.target.value;n(6,T.derivationPath=b,T)},K=async()=>{try{n(5,I=""),n(4,B=!0);const a=await w(T);n(0,S={all:a,filtered:a.filter(b=>parseFloat(vt(b.balance.value.toString()))>0)}),n(4,B=!1)}catch(a){const{message:b}=a;typeof b=="string"&&b.includes("could not detect network")?n(5,I="There was an error detecting connected network from RPC endpoint"):n(5,I=b||"There was an error scanning for accounts"),n(4,B=!1)}},$=()=>{M&&(i.next([M]),r())},ne=()=>{i.next([]),r()},r=()=>{n(1,M=void 0),n(0,S=void 0),n(3,A=!0),n(6,T.derivationPath=p[0]&&p[0].value||"",T)};function o(){T.asset=Et(this),n(6,T),n(8,f)}function l(){T.chainId=Et(this),n(6,T),n(8,f)}function v(a){A=a,n(3,A)}function u(a){M=a,n(1,M)}return e.$$set=a=>{"selectAccountOptions"in a&&n(18,s=a.selectAccountOptions),"accounts$"in a&&n(19,i=a.accounts$)},[S,M,N,A,B,I,T,p,f,d,y,x,E,te,X,K,$,ne,s,i,o,l,v,u]}class lr extends Te{constructor(t){super(),Me(this,t,sr,ir,Ce,{selectAccountOptions:18,accounts$:19},tr,[-1,-1])}}const ft=new fn,ar=ge.object({label:ge.string().required(),value:ge.string().required()}),cr=ge.array().items(ar),ur=ge.array().items(dn),fr=ge.object({label:ge.string().required(),address:ge.string()}),dr=ge.array().items(fr),hr=ge.object({basePaths:cr,assets:dr,chains:ur,scanAccounts:ge.function().arity(1).required(),supportsCustomPath:ge.bool(),consecutiveEmptyAccountThreshold:ge.number(),containerElement:ge.string()}),pr=e=>mn(hr,e),Br=async e=>{if(e){const n=pr(e);if(n)throw n}const t=vr(e,ft);return ft.pipe(hn(1)).subscribe(()=>{t.$destroy()}),pn(ft)},vr=(e,t)=>{class n extends HTMLElement{constructor(){super()}}customElements.get("account-select")||customElements.define("account-select",n);const s=document.createElement("account-select"),i=s.attachShadow({mode:"open"});s.style.all="initial",i.innerHTML=`
    <style>
      :host {
        /* COLORS */
        --white: white;
        --black: black;
        --primary-100: #eff1fc;
        --primary-200: #d0d4f7;
        --primary-300: #b1b8f2;
        --primary-500: #6370e5;
        --primary-600: #454ea0;
        --gray-100: #ebebed;
        --gray-200: #c2c4c9;
        --gray-300: #999ca5;
        --gray-500: #33394b;
        --gray-700: #1a1d26;
        --danger-500: #ff4f4f;

        /* FONTS */
        --font-family-normal: var(--w3o-font-family, Inter, sans-serif);
        --font-size-5: 1rem;
        --font-size-6: .875rem;
        --font-size-7: .75rem;
        --font-line-height-1: 24px;

        /* SPACING */
        --margin-4: 1rem;
        --margin-5: 0.5rem;

        /* MODAL POSITION */
        --account-select-modal-z-index: 20;
        --account-select-modal-top: unset;
        --account-select-modal-right: unset;
        --account-select-modal-bottom: unset;
        --account-select-modal-left: unset;

        /* SHADOWS */
        --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);

        /* THEMING */
        --background-color: var(--w3o-background-color, #FFF);
        --foreground-color: var(--w3o-foreground-color);
        --text-color: var(--w3o-text-color, inherit);
        --border-color: var(--w3o-border-color, var(--gray-200));
        --action-color: var(--w3o-action-color, var(--primary-500));
      }
    </style>
  `;const p=e.containerElement||"body",f=document.querySelector(p);if(!f)throw new Error(`Element with query ${p} does not exist.`);return f.appendChild(s),new lr({target:i,props:{selectAccountOptions:e,accounts$:t}})};function mr(e){Be(e,"svelte-xcex94","aside.svelte-xcex94{display:flex;font-family:'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;justify-content:center;align-items:center;position:fixed;font-size:16px;top:0;left:0;width:100vw;height:100vh;background:rgba(0, 0, 0, 0.3);z-index:var(--onboard-common-modal-index, 20)}@media screen and (max-width: 420px){aside.svelte-xcex94{font-size:14px}}section.svelte-xcex94{display:block;box-sizing:content-box;background:#ffffff;border-radius:10px;box-shadow:0 1px 5px 0 rgba(0, 0, 0, 0.1);font-family:inherit;font-size:inherit;padding:1.33em;position:relative;overflow:hidden;max-width:37em;color:#4a4a4a}div.svelte-xcex94{height:0.66em;position:absolute;padding:0.25em;top:1.33em;right:1.33em;font-size:inherit;font-family:inherit;border-radius:5px;transition:background 200ms ease-in-out;display:flex;justify-content:center;align-items:center}div.svelte-xcex94:hover{cursor:pointer;background:#eeeeee}svg.svelte-xcex94{width:10px;height:10px}")}function qt(e){let t,n,s,i,p,f,d,w,y,x,S,M,N,A,B,I,T,E,te,X,K,$;return{c(){t=C("div"),n=se("svg"),s=se("g"),i=se("path"),p=se("g"),f=se("g"),d=se("g"),w=se("g"),y=se("g"),x=se("g"),S=se("g"),M=se("g"),N=se("g"),A=se("g"),B=se("g"),I=se("g"),T=se("g"),E=se("g"),te=se("g"),O(i,"d",`M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
              c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
              C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
              s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z`),O(n,"xmlns","http://www.w3.org/2000/svg"),O(n,"xmlns:xlink","http://www.w3.org/1999/xlink"),O(n,"x","0px"),O(n,"y","0px"),O(n,"viewBox","0 0 47.971 47.971"),dt(n,"enable-background","new 0 0 47.971 47.971"),dt(n,"transition","fill 150ms ease-in-out"),O(n,"fill",X=e[2]?"#4a4a4a":"#9B9B9B"),O(n,"xml:space","preserve"),O(n,"class","svelte-xcex94"),O(t,"class","bn-onboard-custom bn-onboard-modal-content-close svelte-xcex94")},m(ne,r){V(ne,t,r),k(t,n),k(n,s),k(s,i),k(n,p),k(n,f),k(n,d),k(n,w),k(n,y),k(n,x),k(n,S),k(n,M),k(n,N),k(n,A),k(n,B),k(n,I),k(n,T),k(n,E),k(n,te),K||($=[ue(t,"click",function(){Ue(e[0])&&e[0].apply(this,arguments)}),ue(t,"mouseenter",e[5]),ue(t,"mouseleave",e[6])],K=!0)},p(ne,r){e=ne,r&4&&X!==(X=e[2]?"#4a4a4a":"#9B9B9B")&&O(n,"fill",X)},d(ne){ne&&H(t),K=!1,ke($)}}}function gr(e){let t,n,s,i,p,f,d;const w=e[4].default,y=Xt(w,e,e[3],null);let x=e[1]&&qt(e);return{c(){t=C("aside"),n=C("section"),y&&y.c(),s=G(),x&&x.c(),O(n,"class","bn-onboard-custom bn-onboard-modal-content svelte-xcex94"),O(t,"class","bn-onboard-custom bn-onboard-modal svelte-xcex94")},m(S,M){V(S,t,M),k(t,n),y&&y.m(n,null),k(n,s),x&&x.m(n,null),p=!0,f||(d=[ue(n,"click",br),ue(t,"click",function(){Ue(e[0])&&e[0].apply(this,arguments)})],f=!0)},p(S,[M]){e=S,y&&y.p&&(!p||M&8)&&Qt(y,w,e,e[3],p?Jt(w,e[3],M,null):Zt(e[3]),null),e[1]?x?x.p(e,M):(x=qt(e),x.c(),x.m(n,null)):x&&(x.d(1),x=null)},i(S){p||(xe(y,S),ze(()=>{p&&(i||(i=ot(t,it,{},!0)),i.run(1))}),p=!0)},o(S){Le(y,S),i||(i=ot(t,it,{},!1)),i.run(0),p=!1},d(S){S&&H(t),y&&y.d(S),x&&x.d(),S&&i&&i.end(),f=!1,ke(d)}}}const br=e=>e.stopPropagation();function wr(e,t,n){let{$$slots:s={},$$scope:i}=t,{closeModal:p=()=>{}}=t,{closeable:f=!0}=t,d;const w=()=>n(2,d=!0),y=()=>n(2,d=!1);return e.$$set=x=>{"closeModal"in x&&n(0,p=x.closeModal),"closeable"in x&&n(1,f=x.closeable),"$$scope"in x&&n(3,i=x.$$scope)},[p,f,d,i,s,w,y]}class yr extends Te{constructor(t){super(),Me(this,t,wr,gr,Ce,{closeModal:0,closeable:1},mr)}}function _r(e){Be(e,"svelte-3sw9wd","button.svelte-3sw9wd{outline:none;background:inherit;font-size:0.889em;font-family:inherit;padding:0.55em 1.4em;cursor:pointer;color:#4a90e2;font-family:inherit;transition:background 150ms ease-in-out;line-height:1.15;opacity:1;transition:opacity 200ms}button.svelte-3sw9wd:focus{outline:none}.bn-onboard-prepare-button-right.svelte-3sw9wd{position:absolute;right:0}.bn-onboard-prepare-button-left.svelte-3sw9wd{position:absolute;left:0}.disabled.svelte-3sw9wd{cursor:inherit;pointer-events:none;opacity:0.4}.cta.svelte-3sw9wd{outline:1px solid #4a90e2;border-radius:40px}.cta.svelte-3sw9wd:hover{background:#ecf3fc}")}function kr(e){let t,n,s,i;const p=e[5].default,f=Xt(p,e,e[4],null);return{c(){t=C("button"),f&&f.c(),t.disabled=e[2],O(t,"class","bn-onboard-custom bn-onboard-prepare-button svelte-3sw9wd"),de(t,"disabled",e[2]),de(t,"cta",e[3]),de(t,"bn-onboard-prepare-button-right",e[1]==="right"),de(t,"bn-onboard-prepare-button-left",e[1]==="left"),de(t,"bn-onboard-prepare-button-center",e[1]!=="left"&&e[1]!=="right")},m(d,w){V(d,t,w),f&&f.m(t,null),n=!0,s||(i=ue(t,"click",function(){Ue(e[0])&&e[0].apply(this,arguments)}),s=!0)},p(d,[w]){e=d,f&&f.p&&(!n||w&16)&&Qt(f,p,e,e[4],n?Jt(p,e[4],w,null):Zt(e[4]),null),(!n||w&4)&&(t.disabled=e[2]),(!n||w&4)&&de(t,"disabled",e[2]),(!n||w&8)&&de(t,"cta",e[3]),(!n||w&2)&&de(t,"bn-onboard-prepare-button-right",e[1]==="right"),(!n||w&2)&&de(t,"bn-onboard-prepare-button-left",e[1]==="left"),(!n||w&2)&&de(t,"bn-onboard-prepare-button-center",e[1]!=="left"&&e[1]!=="right")},i(d){n||(xe(f,d),n=!0)},o(d){Le(f,d),n=!1},d(d){d&&H(t),f&&f.d(d),s=!1,i()}}}function Er(e,t,n){let{$$slots:s={},$$scope:i}=t,{onclick:p=()=>{}}=t,{position:f=""}=t,{disabled:d=!1}=t,{cta:w=!0}=t;return e.$$set=y=>{"onclick"in y&&n(0,p=y.onclick),"position"in y&&n(1,f=y.position),"disabled"in y&&n(2,d=y.disabled),"cta"in y&&n(3,w=y.cta),"$$scope"in y&&n(4,i=y.$$scope)},[p,f,d,w,i,s]}class xr extends Te{constructor(t){super(),Me(this,t,Er,kr,Ce,{onclick:0,position:1,disabled:2,cta:3},_r)}}const mt="handlePinPress",Gt="#EBEBED",Ar="#33394B",sn=(e,t,n="64px",s="64px")=>`
  <button
    class="pin-button"
    style="width: ${n}; height: ${s};"
    type="button"
    onclick="window.${mt}(${e})">
      ${t||`<svg class="pin-button-dot" viewBox="0 0 18 18" width="18" height="18">
          <circle cx="9" cy="9" r="9" ></circle>
        </svg>`}
      <div class="pin-button-bg">
  </button>
`,Or=`
  <div class="pin-pad-buttons">
    ${[7,8,9,4,5,6,1,2,3].map(e=>sn(e)).join("")}
  </div>
`,Sr='<svg class="del-button-icon" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi" aria-hidden="true"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>',ln=e=>`
<form id="pin-phrase-form" class="pin-phrase-input-container">
  <input
    id="pin-phrase-input"
    placeholder="${e==="pin"?"PIN":""}"
    type="password"
    autocomplete="current-password"
  />
  ${e==="pin"?` <div class="del-button-wrapper">
            ${sn(-1,Sr,"38px","38px")}
          </div>`:""}
</form>
`,an=`
  .keepkey-modal {
    max-width: 22rem;
    padding: 20px 10px;
  }
  .pin-phrase-input-container {
    display: flex;
    position: relative;
    align-items: center;
    margin: 20px 0;
    width: 100%;
  }
  #pin-phrase-input {
    background: inherit;
    font-size: 0.889em;
    font-family: inherit;
    border-width: 1px;
    border-style: solid;
    border-color: #242835;
    border-radius: 4px;
    padding-left: 0.5rem;
    padding-right: 4.1rem;
    transition: opacity 150ms ease-in-out;
    height: 42px;
    width: 100%;
    opacity: 0.6;
    outline: none;
  }
  #pin-phrase-input:hover, #pin-phrase-input:focus {
    opacity: 1;
  }
  .unlock-button {
    height: 26px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  
  /* Overrides the branding on the modal*/
  .keepkey-modal + .bn-branding { visibility: hidden !important; }
  .keepkey-modal .bn-onboard-prepare-button {
    width: 100%;
  }
`,Nr=`
  #entry {
    align-items: center;
    display: flex;
    flex-flow: column;
    padding: 20px;
  }
  .pin-pad-buttons {
    display: grid;
    grid-template-columns: repeat(3, 75px);
    grid-template-rows: repeat(3, 75px);
    align-items: center;
    justify-items: center;
    margin-bottom: 15px;
  }
  .pin-button {
    align-items: center;
    border-radius: 6px;
    border: 1px solid ${Gt};
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 18px;
    overflow: hidden;
    padding: 0;
    background-color: unset;
    overflow: hidden;
  }
  .pin-button-bg {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background-color: ${Gt};
    transition: opacity 100ms ease-in;
  }
  .pin-button-bg:hover {
    opacity: .2;
  }
  .pin-button-dot {
    fill: ${Ar};
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }
  .del-button-wrapper {
    position: absolute;
    height: 42px;
    width: 42px;
    right: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .del-button-wrapper > .pin-button {
    border: none;
  }
  .del-button-icon {
    position: absolute;
    width: 20px;
    z-index: 2;
    pointer-events: none;
  }
  .del-button-icon + div {
    opacity: .5;
  }
  .del-button-icon + div:hover {
    opacity: 1;
  }
`,zr=`
  .keepkey-modal {
    padding: 40px 30px;
  }
`,Lr=`
    <style>${an}${Nr}</style>
    <h2>Enter Your Pin</h2>
    <p>
      Use PIN layout shown on your device to find the location to press on this pin pad.
    </p>
    <div id="entry" class="bn-onboard-custom">
      ${Or}
      ${ln("pin")}
    </div>
  `,Pr=`
  <style>${an}${zr}</style>
  <h2 style="margin-bottom: 35px">Enter Your Passphrase</h2>
  <div id="entry" class="bn-onboard-custom">
    ${ln("passphrase")}
  </div>
`,Mr=(e,t,n,s)=>{const i=e==="pin"?Lr:Pr,p=()=>document.getElementById("pin-phrase-input"),f=()=>{delete window[mt]};e==="pin"&&(window[mt]=A=>{const B=p();B.value=A===-1?B.value.slice(0,-1):B.value+A});const d=s||"body",w=document.querySelector(d);if(!w)throw new Error(`Element with query ${d} does not exist.`);const y=document.createElement("div");y.innerHTML=i,y.className="keepkey-modal";const x=new yr({target:w,props:{closeModal:()=>{n(),f(),x.$destroy()},$$slots:Vt(y),$$scope:{}}}),S=async()=>{const A=p().value;t(A),x.$destroy()},M=document.getElementById("pin-phrase-form");M&&M.addEventListener("submit",A=>{A.preventDefault(),S()});const N=document.getElementById("entry");if(N){const A=document.createElement("span");A.innerHTML="Unlock",A.className="unlock-button",new xr({target:N,props:{onclick:async()=>{S(),f()},$$slots:Vt(A),$$scope:{}}})}};function Vt(e){return{default:[function(){return{c:ae,m:function(n,s){V(n,e,s)},d:function(n){n&&H(e)},l:ae}}]}}const Tr=async({customNetwork:e,chainId:t})=>{const{default:n,Hardfork:s}=await vn(()=>import("./index-d6e06bc1.js").then(d=>d.i),["./index-d6e06bc1.js","./index-a9dcc3b6.js","./index-cbf8e771.css","./crc32-1da997d2.js","./index-c89338ac.js","./elliptic-97681d12.js"],import.meta.url),i=n.default||n,p={hardfork:s.Berlin,eips:[1559]};let f;try{f=new i({chain:e||t,...p})}catch(d){if(d.message&&/Chain.*not supported/.test(d.message))f=i.custom({chainId:t},p);else throw d}return f},Ir=e=>Object.keys(e).reduce((t,n)=>({...t,...t[n].toHexString?{[n]:t[n].toHexString()}:{}}),e),Dr=e=>({request:({method:t,params:n})=>fetch(e(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:"42",method:t,params:n})}).then(async s=>{const i=await s.json();if("error"in i)throw i.error;return i.result})});export{Br as accountSelect,Ir as bigNumberFieldsToStrings,Mr as entryModal,Tr as getCommon,Dr as getHardwareWalletProvider};
