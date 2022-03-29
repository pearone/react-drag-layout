var Xt=Object.defineProperty,zt=Object.defineProperties;var qt=Object.getOwnPropertyDescriptors;var et=Object.getOwnPropertySymbols;var Gt=Object.prototype.hasOwnProperty,Jt=Object.prototype.propertyIsEnumerable;var tt=(t,e,o)=>e in t?Xt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,_=(t,e)=>{for(var o in e||(e={}))Gt.call(e,o)&&tt(t,o,e[o]);if(et)for(var o of et(e))Jt.call(e,o)&&tt(t,o,e[o]);return t},ce=(t,e)=>zt(t,qt(e));import{r as C,x as Kt,B as Ee,H as fe,I as de,z as Qt,C as We,j as $,a as mt,J as yt,E as Zt,K as _t,L as ee,R as er,N as tr,O as wt,P as Re,Q as j,T as W,U,V as D,W as bt,X as Ue,Y as He,Z as pe,$ as rt,a0 as Ot,a1 as rr,a2 as or}from"./vendor.f32b2874.js";var ot,nt;function nr(t,e){return lr(t)||sr(t,e)||ar(t,e)||ir()}function ir(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ar(t,e){if(!!t){if(typeof t=="string")return it(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);if(o==="Object"&&t.constructor&&(o=t.constructor.name),o==="Map"||o==="Set")return Array.from(t);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return it(t,e)}}function it(t,e){(e==null||e>t.length)&&(e=t.length);for(var o=0,r=new Array(e);o<e;o++)r[o]=t[o];return r}function sr(t,e){var o=t==null?null:typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(o!=null){var r=[],n=!0,i=!1,s,a;try{for(o=o.call(t);!(n=(s=o.next()).done)&&(r.push(s.value),!(e&&r.length===e));n=!0);}catch(l){i=!0,a=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw a}}return r}}function lr(t){if(Array.isArray(t))return t}function xt(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function Pe(t){return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pe(t)}function I(t){return t?(t.nodeName||"").toLowerCase():null}function N(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function ne(t){var e=N(t).Element;return t instanceof e||t instanceof Element}function L(t){var e=N(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Tt(t){if(typeof ShadowRoot=="undefined")return!1;var e=N(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function ur(t){var e=t.state;Object.keys(e.elements).forEach(function(o){var r=e.styles[o]||{},n=e.attributes[o]||{},i=e.elements[o];!L(i)||!I(i)||(Object.assign(i.style,r),Object.keys(n).forEach(function(s){var a=n[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function cr(t){var e=t.state,o={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,o.popper),e.styles=o,e.elements.arrow&&Object.assign(e.elements.arrow.style,o.arrow),function(){Object.keys(e.elements).forEach(function(r){var n=e.elements[r],i=e.attributes[r]||{},s=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:o[r]),a=s.reduce(function(l,c){return l[c]="",l},{});!L(n)||!I(n)||(Object.assign(n.style,a),Object.keys(i).forEach(function(l){n.removeAttribute(l)}))})}}var pr={name:"applyStyles",enabled:!0,phase:"write",fn:ur,effect:cr,requires:["computeStyles"]};function F(t){return t.split("-")[0]}var te=Math.max,Se=Math.min,ie=Math.round;function ae(t,e){e===void 0&&(e=!1);var o=t.getBoundingClientRect(),r=1,n=1;if(L(t)&&e){var i=t.offsetHeight,s=t.offsetWidth;s>0&&(r=ie(o.width)/s||1),i>0&&(n=ie(o.height)/i||1)}return{width:o.width/r,height:o.height/n,top:o.top/n,right:o.right/r,bottom:o.bottom/n,left:o.left/r,x:o.left/r,y:o.top/n}}function Ne(t){var e=ae(t),o=t.offsetWidth,r=t.offsetHeight;return Math.abs(e.width-o)<=1&&(o=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:t.offsetLeft,y:t.offsetTop,width:o,height:r}}function Ct(t,e){var o=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(o&&Tt(o)){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Y(t){return N(t).getComputedStyle(t)}function fr(t){return["table","td","th"].indexOf(I(t))>=0}function J(t){return((ne(t)?t.ownerDocument:t.document)||window.document).documentElement}function Ae(t){return I(t)==="html"?t:t.assignedSlot||t.parentNode||(Tt(t)?t.host:null)||J(t)}function at(t){return!L(t)||Y(t).position==="fixed"?null:t.offsetParent}function dr(t){var e=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,o=navigator.userAgent.indexOf("Trident")!==-1;if(o&&L(t)){var r=Y(t);if(r.position==="fixed")return null}for(var n=Ae(t);L(n)&&["html","body"].indexOf(I(n))<0;){var i=Y(n);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||e&&i.willChange==="filter"||e&&i.filter&&i.filter!=="none")return n;n=n.parentNode}return null}function me(t){for(var e=N(t),o=at(t);o&&fr(o)&&Y(o).position==="static";)o=at(o);return o&&(I(o)==="html"||I(o)==="body"&&Y(o).position==="static")?e:o||dr(t)||e}function Ve(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function ve(t,e,o){return te(t,Se(e,o))}function vr(t,e,o){var r=ve(t,e,o);return r>o?o:r}function Rt(){return{top:0,right:0,bottom:0,left:0}}function Pt(t){return Object.assign({},Rt(),t)}function St(t,e){return e.reduce(function(o,r){return o[r]=t,o},{})}var hr=function(e,o){return e=typeof e=="function"?e(Object.assign({},o.rects,{placement:o.placement})):e,Pt(typeof e!="number"?e:St(e,Ue))};function gr(t){var e,o=t.state,r=t.name,n=t.options,i=o.elements.arrow,s=o.modifiersData.popperOffsets,a=F(o.placement),l=Ve(a),c=[D,W].indexOf(a)>=0,u=c?"height":"width";if(!(!i||!s)){var d=hr(n.padding,o),m=Ne(i),p=l==="y"?j:D,v=l==="y"?U:W,h=o.rects.reference[u]+o.rects.reference[l]-s[l]-o.rects.popper[u],g=s[l]-o.rects.reference[l],O=me(i),T=O?l==="y"?O.clientHeight||0:O.clientWidth||0:0,y=h/2-g/2,f=d[p],w=T-m[u]-d[v],b=T/2-m[u]/2+y,x=ve(f,b,w),R=l;o.modifiersData[r]=(e={},e[R]=x,e.centerOffset=x-b,e)}}function mr(t){var e=t.state,o=t.options,r=o.element,n=r===void 0?"[data-popper-arrow]":r;n!=null&&(typeof n=="string"&&(n=e.elements.popper.querySelector(n),!n)||!Ct(e.elements.popper,n)||(e.elements.arrow=n))}var yr={name:"arrow",enabled:!0,phase:"main",fn:gr,effect:mr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function se(t){return t.split("-")[1]}var wr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function br(t){var e=t.x,o=t.y,r=window,n=r.devicePixelRatio||1;return{x:ie(e*n)/n||0,y:ie(o*n)/n||0}}function st(t){var e,o=t.popper,r=t.popperRect,n=t.placement,i=t.variation,s=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,u=t.roundOffsets,d=t.isFixed,m=s.x,p=m===void 0?0:m,v=s.y,h=v===void 0?0:v,g=typeof u=="function"?u({x:p,y:h}):{x:p,y:h};p=g.x,h=g.y;var O=s.hasOwnProperty("x"),T=s.hasOwnProperty("y"),y=D,f=j,w=window;if(c){var b=me(o),x="clientHeight",R="clientWidth";if(b===N(o)&&(b=J(o),Y(b).position!=="static"&&a==="absolute"&&(x="scrollHeight",R="scrollWidth")),b=b,n===j||(n===D||n===W)&&i===He){f=U;var E=d&&w.visualViewport?w.visualViewport.height:b[x];h-=E-r.height,h*=l?1:-1}if(n===D||(n===j||n===U)&&i===He){y=W;var S=d&&w.visualViewport?w.visualViewport.width:b[R];p-=S-r.width,p*=l?1:-1}}var P=Object.assign({position:a},c&&wr),B=u===!0?br({x:p,y:h}):{x:p,y:h};if(p=B.x,h=B.y,l){var A;return Object.assign({},P,(A={},A[f]=T?"0":"",A[y]=O?"0":"",A.transform=(w.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",A))}return Object.assign({},P,(e={},e[f]=T?h+"px":"",e[y]=O?p+"px":"",e.transform="",e))}function Or(t){var e=t.state,o=t.options,r=o.gpuAcceleration,n=r===void 0?!0:r,i=o.adaptive,s=i===void 0?!0:i,a=o.roundOffsets,l=a===void 0?!0:a,c={placement:F(e.placement),variation:se(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:n,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,st(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s,roundOffsets:l})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,st(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var xr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Or,data:{}},xe={passive:!0};function Tr(t){var e=t.state,o=t.instance,r=t.options,n=r.scroll,i=n===void 0?!0:n,s=r.resize,a=s===void 0?!0:s,l=N(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return i&&c.forEach(function(u){u.addEventListener("scroll",o.update,xe)}),a&&l.addEventListener("resize",o.update,xe),function(){i&&c.forEach(function(u){u.removeEventListener("scroll",o.update,xe)}),a&&l.removeEventListener("resize",o.update,xe)}}var Cr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Tr,data:{}},Rr={left:"right",right:"left",bottom:"top",top:"bottom"};function Te(t){return t.replace(/left|right|bottom|top/g,function(e){return Rr[e]})}var Pr={start:"end",end:"start"};function lt(t){return t.replace(/start|end/g,function(e){return Pr[e]})}function Fe(t){var e=N(t),o=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:o,scrollTop:r}}function Ie(t){return ae(J(t)).left+Fe(t).scrollLeft}function Sr(t){var e=N(t),o=J(t),r=e.visualViewport,n=o.clientWidth,i=o.clientHeight,s=0,a=0;return r&&(n=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=r.offsetLeft,a=r.offsetTop)),{width:n,height:i,x:s+Ie(t),y:a}}function Er(t){var e,o=J(t),r=Fe(t),n=(e=t.ownerDocument)==null?void 0:e.body,i=te(o.scrollWidth,o.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),s=te(o.scrollHeight,o.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),a=-r.scrollLeft+Ie(t),l=-r.scrollTop;return Y(n||o).direction==="rtl"&&(a+=te(o.clientWidth,n?n.clientWidth:0)-i),{width:i,height:s,x:a,y:l}}function Ye(t){var e=Y(t),o=e.overflow,r=e.overflowX,n=e.overflowY;return/auto|scroll|overlay|hidden/.test(o+n+r)}function Et(t){return["html","body","#document"].indexOf(I(t))>=0?t.ownerDocument.body:L(t)&&Ye(t)?t:Et(Ae(t))}function he(t,e){var o;e===void 0&&(e=[]);var r=Et(t),n=r===((o=t.ownerDocument)==null?void 0:o.body),i=N(r),s=n?[i].concat(i.visualViewport||[],Ye(r)?r:[]):r,a=e.concat(s);return n?a:a.concat(he(Ae(s)))}function Le(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Ar(t){var e=ae(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}function ut(t,e){return e===Ot?Le(Sr(t)):ne(e)?Ar(e):Le(Er(J(t)))}function kr(t){var e=he(Ae(t)),o=["absolute","fixed"].indexOf(Y(t).position)>=0,r=o&&L(t)?me(t):t;return ne(r)?e.filter(function(n){return ne(n)&&Ct(n,r)&&I(n)!=="body"}):[]}function Br(t,e,o){var r=e==="clippingParents"?kr(t):[].concat(e),n=[].concat(r,[o]),i=n[0],s=n.reduce(function(a,l){var c=ut(t,l);return a.top=te(c.top,a.top),a.right=Se(c.right,a.right),a.bottom=Se(c.bottom,a.bottom),a.left=te(c.left,a.left),a},ut(t,i));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function At(t){var e=t.reference,o=t.element,r=t.placement,n=r?F(r):null,i=r?se(r):null,s=e.x+e.width/2-o.width/2,a=e.y+e.height/2-o.height/2,l;switch(n){case j:l={x:s,y:e.y-o.height};break;case U:l={x:s,y:e.y+e.height};break;case W:l={x:e.x+e.width,y:a};break;case D:l={x:e.x-o.width,y:a};break;default:l={x:e.x,y:e.y}}var c=n?Ve(n):null;if(c!=null){var u=c==="y"?"height":"width";switch(i){case Re:l[c]=l[c]-(e[u]/2-o[u]/2);break;case He:l[c]=l[c]+(e[u]/2-o[u]/2);break}}return l}function ge(t,e){e===void 0&&(e={});var o=e,r=o.placement,n=r===void 0?t.placement:r,i=o.boundary,s=i===void 0?or:i,a=o.rootBoundary,l=a===void 0?Ot:a,c=o.elementContext,u=c===void 0?pe:c,d=o.altBoundary,m=d===void 0?!1:d,p=o.padding,v=p===void 0?0:p,h=Pt(typeof v!="number"?v:St(v,Ue)),g=u===pe?rr:pe,O=t.rects.popper,T=t.elements[m?g:u],y=Br(ne(T)?T:T.contextElement||J(t.elements.popper),s,l),f=ae(t.elements.reference),w=At({reference:f,element:O,strategy:"absolute",placement:n}),b=Le(Object.assign({},O,w)),x=u===pe?b:f,R={top:y.top-x.top+h.top,bottom:x.bottom-y.bottom+h.bottom,left:y.left-x.left+h.left,right:x.right-y.right+h.right},E=t.modifiersData.offset;if(u===pe&&E){var S=E[n];Object.keys(R).forEach(function(P){var B=[W,U].indexOf(P)>=0?1:-1,A=[j,U].indexOf(P)>=0?"y":"x";R[P]+=S[A]*B})}return R}function Mr(t,e){e===void 0&&(e={});var o=e,r=o.placement,n=o.boundary,i=o.rootBoundary,s=o.padding,a=o.flipVariations,l=o.allowedAutoPlacements,c=l===void 0?bt:l,u=se(r),d=u?a?rt:rt.filter(function(v){return se(v)===u}):Ue,m=d.filter(function(v){return c.indexOf(v)>=0});m.length===0&&(m=d);var p=m.reduce(function(v,h){return v[h]=ge(t,{placement:h,boundary:n,rootBoundary:i,padding:s})[F(h)],v},{});return Object.keys(p).sort(function(v,h){return p[v]-p[h]})}function jr(t){if(F(t)===wt)return[];var e=Te(t);return[lt(t),e,lt(e)]}function Dr(t){var e=t.state,o=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var n=o.mainAxis,i=n===void 0?!0:n,s=o.altAxis,a=s===void 0?!0:s,l=o.fallbackPlacements,c=o.padding,u=o.boundary,d=o.rootBoundary,m=o.altBoundary,p=o.flipVariations,v=p===void 0?!0:p,h=o.allowedAutoPlacements,g=e.options.placement,O=F(g),T=O===g,y=l||(T||!v?[Te(g)]:jr(g)),f=[g].concat(y).reduce(function(oe,q){return oe.concat(F(q)===wt?Mr(e,{placement:q,boundary:u,rootBoundary:d,padding:c,flipVariations:v,allowedAutoPlacements:h}):q)},[]),w=e.rects.reference,b=e.rects.popper,x=new Map,R=!0,E=f[0],S=0;S<f.length;S++){var P=f[S],B=F(P),A=se(P)===Re,X=[j,U].indexOf(B)>=0,z=X?"width":"height",k=ge(e,{placement:P,boundary:u,rootBoundary:d,altBoundary:m,padding:c}),M=X?A?W:D:A?U:j;w[z]>b[z]&&(M=Te(M));var re=Te(M),K=[];if(i&&K.push(k[B]<=0),a&&K.push(k[M]<=0,k[re]<=0),K.every(function(oe){return oe})){E=P,R=!1;break}x.set(P,K)}if(R)for(var ye=v?3:1,ke=function(q){var ue=f.find(function(be){var Q=x.get(be);if(Q)return Q.slice(0,q).every(function(Be){return Be})});if(ue)return E=ue,"break"},le=ye;le>0;le--){var we=ke(le);if(we==="break")break}e.placement!==E&&(e.modifiersData[r]._skip=!0,e.placement=E,e.reset=!0)}}var Hr={name:"flip",enabled:!0,phase:"main",fn:Dr,requiresIfExists:["offset"],data:{_skip:!1}};function ct(t,e,o){return o===void 0&&(o={x:0,y:0}),{top:t.top-e.height-o.y,right:t.right-e.width+o.x,bottom:t.bottom-e.height+o.y,left:t.left-e.width-o.x}}function pt(t){return[j,W,U,D].some(function(e){return t[e]>=0})}function Lr(t){var e=t.state,o=t.name,r=e.rects.reference,n=e.rects.popper,i=e.modifiersData.preventOverflow,s=ge(e,{elementContext:"reference"}),a=ge(e,{altBoundary:!0}),l=ct(s,r),c=ct(a,n,i),u=pt(l),d=pt(c);e.modifiersData[o]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":d})}var $r={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Lr};function Wr(t,e,o){var r=F(t),n=[D,j].indexOf(r)>=0?-1:1,i=typeof o=="function"?o(Object.assign({},e,{placement:t})):o,s=i[0],a=i[1];return s=s||0,a=(a||0)*n,[D,W].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function Ur(t){var e=t.state,o=t.options,r=t.name,n=o.offset,i=n===void 0?[0,0]:n,s=bt.reduce(function(u,d){return u[d]=Wr(d,e.rects,i),u},{}),a=s[e.placement],l=a.x,c=a.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[r]=s}var Nr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ur};function Vr(t){var e=t.state,o=t.name;e.modifiersData[o]=At({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}var Fr={name:"popperOffsets",enabled:!0,phase:"read",fn:Vr,data:{}};function Ir(t){return t==="x"?"y":"x"}function Yr(t){var e=t.state,o=t.options,r=t.name,n=o.mainAxis,i=n===void 0?!0:n,s=o.altAxis,a=s===void 0?!1:s,l=o.boundary,c=o.rootBoundary,u=o.altBoundary,d=o.padding,m=o.tether,p=m===void 0?!0:m,v=o.tetherOffset,h=v===void 0?0:v,g=ge(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:u}),O=F(e.placement),T=se(e.placement),y=!T,f=Ve(O),w=Ir(f),b=e.modifiersData.popperOffsets,x=e.rects.reference,R=e.rects.popper,E=typeof h=="function"?h(Object.assign({},e.rects,{placement:e.placement})):h,S=typeof E=="number"?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),P=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,B={x:0,y:0};if(!!b){if(i){var A,X=f==="y"?j:D,z=f==="y"?U:W,k=f==="y"?"height":"width",M=b[f],re=M+g[X],K=M-g[z],ye=p?-R[k]/2:0,ke=T===Re?x[k]:R[k],le=T===Re?-R[k]:-x[k],we=e.elements.arrow,oe=p&&we?Ne(we):{width:0,height:0},q=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Rt(),ue=q[X],be=q[z],Q=ve(0,x[k],oe[k]),Be=y?x[k]/2-ye-Q-ue-S.mainAxis:ke-Q-ue-S.mainAxis,Ut=y?-x[k]/2+ye+Q+be+S.mainAxis:le+Q+be+S.mainAxis,Me=e.elements.arrow&&me(e.elements.arrow),Nt=Me?f==="y"?Me.clientTop||0:Me.clientLeft||0:0,Xe=(A=P==null?void 0:P[f])!=null?A:0,Vt=M+Be-Xe-Nt,Ft=M+Ut-Xe,ze=ve(p?Se(re,Vt):re,M,p?te(K,Ft):K);b[f]=ze,B[f]=ze-M}if(a){var qe,It=f==="x"?j:D,Yt=f==="x"?U:W,Z=b[w],Oe=w==="y"?"height":"width",Ge=Z+g[It],Je=Z-g[Yt],je=[j,D].indexOf(O)!==-1,Ke=(qe=P==null?void 0:P[w])!=null?qe:0,Qe=je?Ge:Z-x[Oe]-R[Oe]-Ke+S.altAxis,Ze=je?Z+x[Oe]+R[Oe]-Ke-S.altAxis:Je,_e=p&&je?vr(Qe,Z,Ze):ve(p?Qe:Ge,Z,p?Ze:Je);b[w]=_e,B[w]=_e-Z}e.modifiersData[r]=B}}var Xr={name:"preventOverflow",enabled:!0,phase:"main",fn:Yr,requiresIfExists:["offset"]};function zr(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function qr(t){return t===N(t)||!L(t)?Fe(t):zr(t)}function Gr(t){var e=t.getBoundingClientRect(),o=ie(e.width)/t.offsetWidth||1,r=ie(e.height)/t.offsetHeight||1;return o!==1||r!==1}function Jr(t,e,o){o===void 0&&(o=!1);var r=L(e),n=L(e)&&Gr(e),i=J(e),s=ae(t,n),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(r||!r&&!o)&&((I(e)!=="body"||Ye(i))&&(a=qr(e)),L(e)?(l=ae(e,!0),l.x+=e.clientLeft,l.y+=e.clientTop):i&&(l.x=Ie(i))),{x:s.left+a.scrollLeft-l.x,y:s.top+a.scrollTop-l.y,width:s.width,height:s.height}}function Kr(t){var e=new Map,o=new Set,r=[];t.forEach(function(i){e.set(i.name,i)});function n(i){o.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!o.has(a)){var l=e.get(a);l&&n(l)}}),r.push(i)}return t.forEach(function(i){o.has(i.name)||n(i)}),r}function Qr(t){var e=Kr(t);return tr.reduce(function(o,r){return o.concat(e.filter(function(n){return n.phase===r}))},[])}function Zr(t){var e;return function(){return e||(e=new Promise(function(o){Promise.resolve().then(function(){e=void 0,o(t())})})),e}}function _r(t){var e=t.reduce(function(o,r){var n=o[r.name];return o[r.name]=n?Object.assign({},n,r,{options:Object.assign({},n.options,r.options),data:Object.assign({},n.data,r.data)}):r,o},{});return Object.keys(e).map(function(o){return e[o]})}var ft={placement:"bottom",modifiers:[],strategy:"absolute"};function dt(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function eo(t){t===void 0&&(t={});var e=t,o=e.defaultModifiers,r=o===void 0?[]:o,n=e.defaultOptions,i=n===void 0?ft:n;return function(a,l,c){c===void 0&&(c=i);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},ft,i),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},d=[],m=!1,p={state:u,setOptions:function(O){var T=typeof O=="function"?O(u.options):O;h(),u.options=Object.assign({},i,u.options,T),u.scrollParents={reference:ne(a)?he(a):a.contextElement?he(a.contextElement):[],popper:he(l)};var y=Qr(_r([].concat(r,u.options.modifiers)));return u.orderedModifiers=y.filter(function(f){return f.enabled}),v(),p.update()},forceUpdate:function(){if(!m){var O=u.elements,T=O.reference,y=O.popper;if(!!dt(T,y)){u.rects={reference:Jr(T,me(y),u.options.strategy==="fixed"),popper:Ne(y)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(S){return u.modifiersData[S.name]=Object.assign({},S.data)});for(var f=0;f<u.orderedModifiers.length;f++){if(u.reset===!0){u.reset=!1,f=-1;continue}var w=u.orderedModifiers[f],b=w.fn,x=w.options,R=x===void 0?{}:x,E=w.name;typeof b=="function"&&(u=b({state:u,options:R,name:E,instance:p})||u)}}}},update:Zr(function(){return new Promise(function(g){p.forceUpdate(),g(u)})}),destroy:function(){h(),m=!0}};if(!dt(a,l))return p;p.setOptions(c).then(function(g){!m&&c.onFirstUpdate&&c.onFirstUpdate(g)});function v(){u.orderedModifiers.forEach(function(g){var O=g.name,T=g.options,y=T===void 0?{}:T,f=g.effect;if(typeof f=="function"){var w=f({state:u,name:O,instance:p,options:y}),b=function(){};d.push(w||b)}})}function h(){d.forEach(function(g){return g()}),d=[]}return p}}var to=[Cr,Fr,xr,pr,Nr,Hr,Xr,yr,$r],ro=eo({defaultModifiers:to}),kt=C.exports.createContext(),Bt=C.exports.createContext();function oo(t){var e=t.children,o=C.exports.useState(null),r=o[0],n=o[1],i=C.exports.useRef(!1);C.exports.useEffect(function(){return function(){i.current=!0}},[]);var s=C.exports.useCallback(function(a){i.current||n(a)},[]);return $(kt.Provider,{value:r,children:$(Bt.Provider,{value:s,children:e})})}var Mt=function(e){return Array.isArray(e)?e[0]:e},jt=function(e){if(typeof e=="function"){for(var o=arguments.length,r=new Array(o>1?o-1:0),n=1;n<o;n++)r[n-1]=arguments[n];return e.apply(void 0,r)}},$e=function(e,o){if(typeof e=="function")return jt(e,o);e!=null&&(e.current=o)},vt=function(e){return e.reduce(function(o,r){var n=r[0],i=r[1];return o[n]=i,o},{})},ht=typeof window!="undefined"&&window.document&&window.document.createElement?C.exports.useLayoutEffect:C.exports.useEffect,no=typeof Element!="undefined",io=typeof Map=="function",ao=typeof Set=="function",so=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function Ce(t,e){if(t===e)return!0;if(t&&e&&Pe(t)=="object"&&Pe(e)=="object"){if(t.constructor!==e.constructor)return!1;var o,r,n;if(Array.isArray(t)){if(o=t.length,o!=e.length)return!1;for(r=o;r--!==0;)if(!Ce(t[r],e[r]))return!1;return!0}var i;if(io&&t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(i=t.entries();!(r=i.next()).done;)if(!e.has(r.value[0]))return!1;for(i=t.entries();!(r=i.next()).done;)if(!Ce(r.value[1],e.get(r.value[0])))return!1;return!0}if(ao&&t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(i=t.entries();!(r=i.next()).done;)if(!e.has(r.value[0]))return!1;return!0}if(so&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(e)){if(o=t.length,o!=e.length)return!1;for(r=o;r--!==0;)if(t[r]!==e[r])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(n=Object.keys(t),o=n.length,o!==Object.keys(e).length)return!1;for(r=o;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,n[r]))return!1;if(no&&t instanceof Element)return!1;for(r=o;r--!==0;)if(!((n[r]==="_owner"||n[r]==="__v"||n[r]==="__o")&&t.$$typeof)&&!Ce(t[n[r]],e[n[r]]))return!1;return!0}return t!==t&&e!==e}var lo=function(e,o){try{return Ce(e,o)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}},uo=[],co=function(e,o,r){r===void 0&&(r={});var n=C.exports.useRef(null),i={onFirstUpdate:r.onFirstUpdate,placement:r.placement||"bottom",strategy:r.strategy||"absolute",modifiers:r.modifiers||uo},s=C.exports.useState({styles:{popper:{position:i.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),a=s[0],l=s[1],c=C.exports.useMemo(function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(p){var v=p.state,h=Object.keys(v.elements);l({styles:vt(h.map(function(g){return[g,v.styles[g]||{}]})),attributes:vt(h.map(function(g){return[g,v.attributes[g]]}))})},requires:["computeStyles"]}},[]),u=C.exports.useMemo(function(){var m={onFirstUpdate:i.onFirstUpdate,placement:i.placement,strategy:i.strategy,modifiers:[].concat(i.modifiers,[c,{name:"applyStyles",enabled:!1}])};return lo(n.current,m)?n.current||m:(n.current=m,m)},[i.onFirstUpdate,i.placement,i.strategy,i.modifiers,c]),d=C.exports.useRef();return ht(function(){d.current&&d.current.setOptions(u)},[u]),ht(function(){if(!(e==null||o==null)){var m=r.createPopper||ro,p=m(e,o,u);return d.current=p,function(){p.destroy(),d.current=null}}},[e,o,r.createPopper]),{state:d.current?d.current.state:null,styles:a.styles,attributes:a.attributes,update:d.current?d.current.update:null,forceUpdate:d.current?d.current.forceUpdate:null}},po=function(){},fo=function(){return Promise.resolve(null)},vo=[];function ho(t){var e=t.placement,o=e===void 0?"bottom":e,r=t.strategy,n=r===void 0?"absolute":r,i=t.modifiers,s=i===void 0?vo:i,a=t.referenceElement,l=t.onFirstUpdate,c=t.innerRef,u=t.children,d=C.exports.useContext(kt),m=C.exports.useState(null),p=m[0],v=m[1],h=C.exports.useState(null),g=h[0],O=h[1];C.exports.useEffect(function(){$e(c,p)},[c,p]);var T=C.exports.useMemo(function(){return{placement:o,strategy:n,onFirstUpdate:l,modifiers:[].concat(s,[{name:"arrow",enabled:g!=null,options:{element:g}}])}},[o,n,l,s,g]),y=co(a||d,p,T),f=y.state,w=y.styles,b=y.forceUpdate,x=y.update,R=C.exports.useMemo(function(){return{ref:v,style:w.popper,placement:f?f.placement:o,hasPopperEscaped:f&&f.modifiersData.hide?f.modifiersData.hide.hasPopperEscaped:null,isReferenceHidden:f&&f.modifiersData.hide?f.modifiersData.hide.isReferenceHidden:null,arrowProps:{style:w.arrow,ref:O},forceUpdate:b||po,update:x||fo}},[v,O,o,f,w,x,b]);return Mt(u)(R)}function go(t){var e=t.children,o=t.innerRef,r=C.exports.useContext(Bt),n=C.exports.useCallback(function(i){$e(o,i),jt(r,i)},[o,r]);return C.exports.useEffect(function(){return function(){return $e(o,null)}}),C.exports.useEffect(function(){},[r]),Mt(e)({ref:n})}var Dt=er.createContext({}),V=function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];return function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return o.forEach(function(a){return a&&a.apply(void 0,i)})}},mo=function(){},gt=function(){return!!(typeof window!="undefined"&&window.document&&window.document.createElement)},yo=function(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)},Ht=function(t){yt(e,t);function e(){for(var r,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r=t.call.apply(t,[this].concat(i))||this,r.observer=void 0,r.tooltipRef=void 0,r.handleOutsideClick=function(a){if(r.tooltipRef&&!r.tooltipRef.contains(a.target)){var l=r.context.parentOutsideClickHandler,c=r.props,u=c.hideTooltip,d=c.clearScheduled;d(),u(),l&&l(a)}},r.handleOutsideRightClick=function(a){if(r.tooltipRef&&!r.tooltipRef.contains(a.target)){var l=r.context.parentOutsideRightClickHandler,c=r.props,u=c.hideTooltip,d=c.clearScheduled;d(),u(),l&&l(a)}},r.addOutsideClickHandler=function(){document.body.addEventListener("touchend",r.handleOutsideClick),document.body.addEventListener("click",r.handleOutsideClick)},r.removeOutsideClickHandler=function(){document.body.removeEventListener("touchend",r.handleOutsideClick),document.body.removeEventListener("click",r.handleOutsideClick)},r.addOutsideRightClickHandler=function(){return document.body.addEventListener("contextmenu",r.handleOutsideRightClick)},r.removeOutsideRightClickHandler=function(){return document.body.removeEventListener("contextmenu",r.handleOutsideRightClick)},r.getTooltipRef=function(a){r.tooltipRef=a,yo(r.props.innerRef,a)},r.getArrowProps=function(a){return a===void 0&&(a={}),ee({},a,{style:ee({},a.style,r.props.arrowProps.style)})},r.getTooltipProps=function(a){return a===void 0&&(a={}),ee({},a,r.isTriggeredBy("hover")&&{onMouseEnter:V(r.props.clearScheduled,a.onMouseEnter),onMouseLeave:V(r.props.hideTooltip,a.onMouseLeave)},{style:ee({},a.style,r.props.style)})},r.contextValue={isParentNoneTriggered:r.props.trigger==="none",addParentOutsideClickHandler:r.addOutsideClickHandler,addParentOutsideRightClickHandler:r.addOutsideRightClickHandler,parentOutsideClickHandler:r.handleOutsideClick,parentOutsideRightClickHandler:r.handleOutsideRightClick,removeParentOutsideClickHandler:r.removeOutsideClickHandler,removeParentOutsideRightClickHandler:r.removeOutsideRightClickHandler},r}var o=e.prototype;return o.componentDidMount=function(){var n=this,i=this.observer=new MutationObserver(function(){n.props.update()});if(i.observe(this.tooltipRef,this.props.mutationObserverOptions),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var s=this.context,a=s.removeParentOutsideClickHandler,l=s.removeParentOutsideRightClickHandler;this.addOutsideClickHandler(),this.addOutsideRightClickHandler(),a&&a(),l&&l()}},o.componentDidUpdate=function(){this.props.closeOnReferenceHidden&&this.props.isReferenceHidden&&this.props.hideTooltip()},o.componentWillUnmount=function(){if(this.observer&&this.observer.disconnect(),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var n=this.context,i=n.isParentNoneTriggered,s=n.addParentOutsideClickHandler,a=n.addParentOutsideRightClickHandler;this.removeOutsideClickHandler(),this.removeOutsideRightClickHandler(),this.handleOutsideClick=void 0,this.handleOutsideRightClick=void 0,!i&&s&&s(),!i&&a&&a()}},o.render=function(){var n=this.props,i=n.arrowProps,s=n.placement,a=n.tooltip;return $(Dt.Provider,{value:this.contextValue,children:a({arrowRef:i.ref,getArrowProps:this.getArrowProps,getTooltipProps:this.getTooltipProps,placement:s,tooltipRef:this.getTooltipRef})})},o.isTriggeredBy=function(n){var i=this.props.trigger;return i===n||Array.isArray(i)&&i.includes(n)},e}(C.exports.Component);Ht.contextType=Dt;var wo={childList:!0,subtree:!0},Lt=function(t){yt(e,t);function e(){for(var r,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r=t.call.apply(t,[this].concat(i))||this,r.state={tooltipShown:r.props.defaultTooltipShown},r.hideTimeout=void 0,r.showTimeout=void 0,r.popperOffset=void 0,r.setTooltipState=function(a){var l=function(){return r.props.onVisibilityChange(a.tooltipShown)};r.isControlled()?l():r.setState(a,l)},r.clearScheduled=function(){clearTimeout(r.hideTimeout),clearTimeout(r.showTimeout)},r.showTooltip=function(a){var l=a.pageX,c=a.pageY;r.clearScheduled();var u={tooltipShown:!0};r.props.followCursor&&(u=ee({},u,{pageX:l,pageY:c})),r.showTimeout=window.setTimeout(function(){return r.setTooltipState(u)},r.props.delayShow)},r.hideTooltip=function(){r.clearScheduled(),r.hideTimeout=window.setTimeout(function(){return r.setTooltipState({tooltipShown:!1})},r.props.delayHide)},r.toggleTooltip=function(a){var l=a.pageX,c=a.pageY,u=r.getState()?"hideTooltip":"showTooltip";r[u]({pageX:l,pageY:c})},r.clickToggle=function(a){a.preventDefault();var l=a.pageX,c=a.pageY,u=r.props.followCursor?"showTooltip":"toggleTooltip";r[u]({pageX:l,pageY:c})},r.contextMenuToggle=function(a){a.preventDefault();var l=a.pageX,c=a.pageY,u=r.props.followCursor?"showTooltip":"toggleTooltip";r[u]({pageX:l,pageY:c})},r.getTriggerProps=function(a){return a===void 0&&(a={}),ee({},a,r.isTriggeredBy("click")&&{onClick:V(r.clickToggle,a.onClick),onTouchEnd:V(r.clickToggle,a.onTouchEnd)},r.isTriggeredBy("right-click")&&{onContextMenu:V(r.contextMenuToggle,a.onContextMenu)},r.isTriggeredBy("hover")&&ee({onMouseEnter:V(r.showTooltip,a.onMouseEnter),onMouseLeave:V(r.hideTooltip,a.onMouseLeave)},r.props.followCursor&&{onMouseMove:V(r.showTooltip,a.onMouseMove)}),r.isTriggeredBy("focus")&&{onFocus:V(r.showTooltip,a.onFocus),onBlur:V(r.hideTooltip,a.onBlur)})},r}var o=e.prototype;return o.componentWillUnmount=function(){this.clearScheduled()},o.render=function(){var n=this,i=this.props,s=i.children,a=i.tooltip,l=i.placement,c=i.trigger,u=i.getTriggerRef,d=i.modifiers,m=i.closeOnReferenceHidden,p=i.usePortal,v=i.portalContainer,h=i.followCursor,g=i.getTooltipRef,O=i.mutationObserverOptions,T=Zt(i,["children","tooltip","placement","trigger","getTriggerRef","modifiers","closeOnReferenceHidden","usePortal","portalContainer","followCursor","getTooltipRef","mutationObserverOptions"]),y=$(ho,ce(_({innerRef:g,placement:l,modifiers:[{name:"followCursor",enabled:h,phase:"main",fn:function(w){n.popperOffset=w.state.rects.popper}}].concat(d)},T),{children:function(f){var w=f.ref,b=f.style,x=f.placement,R=f.arrowProps,E=f.isReferenceHidden,S=f.update;if(h&&n.popperOffset){var P=n.state,B=P.pageX,A=P.pageY,X=n.popperOffset,z=X.width,k=X.height,M=B+z>window.pageXOffset+document.body.offsetWidth?B-z:B,re=A+k>window.pageYOffset+document.body.offsetHeight?A-k:A;b.transform="translate3d("+M+"px, "+re+"px, 0"}return $(Ht,{arrowProps:R,closeOnReferenceHidden:m,isReferenceHidden:E,placement:x,update:S,style:b,tooltip:a,trigger:c,mutationObserverOptions:O,clearScheduled:n.clearScheduled,hideTooltip:n.hideTooltip,innerRef:w})}}));return mt(oo,{children:[$(go,{innerRef:u,children:function(f){var w=f.ref;return s({getTriggerProps:n.getTriggerProps,triggerRef:w})}}),this.getState()&&(p?_t.exports.createPortal(y,v):y)]})},o.isControlled=function(){return this.props.tooltipShown!==void 0},o.getState=function(){return this.isControlled()?this.props.tooltipShown:this.state.tooltipShown},o.isTriggeredBy=function(n){var i=this.props.trigger;return i===n||Array.isArray(i)&&i.includes(n)},e}(C.exports.Component);Lt.defaultProps={closeOnReferenceHidden:!0,defaultTooltipShown:!1,delayHide:0,delayShow:0,followCursor:!1,onVisibilityChange:mo,placement:"right",portalContainer:gt()?document.body:null,trigger:"hover",usePortal:gt(),mutationObserverOptions:wo,modifiers:[]};var bo=Lt,H=Kt(1e3)(function(t,e,o){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return e.split("-")[0]===t?o:r}),G=8,Oo=Ee.div({position:"absolute",borderStyle:"solid"},function(t){var e=t.placement,o=0,r=0;switch(!0){case(e.startsWith("left")||e.startsWith("right")):{r=8;break}case(e.startsWith("top")||e.startsWith("bottom")):{o=8;break}}var n="translate3d(".concat(o,"px, ").concat(r,"px, 0px)");return{transform:n}},function(t){var e=t.theme,o=t.color,r=t.placement;return{bottom:"".concat(H("top",r,G*-1,"auto"),"px"),top:"".concat(H("bottom",r,G*-1,"auto"),"px"),right:"".concat(H("left",r,G*-1,"auto"),"px"),left:"".concat(H("right",r,G*-1,"auto"),"px"),borderBottomWidth:"".concat(H("top",r,"0",G),"px"),borderTopWidth:"".concat(H("bottom",r,"0",G),"px"),borderRightWidth:"".concat(H("left",r,"0",G),"px"),borderLeftWidth:"".concat(H("right",r,"0",G),"px"),borderTopColor:H("top",r,e.color[o]||o||e.base==="light"?fe(e.background.app):de(e.background.app),"transparent"),borderBottomColor:H("bottom",r,e.color[o]||o||e.base==="light"?fe(e.background.app):de(e.background.app),"transparent"),borderLeftColor:H("left",r,e.color[o]||o||e.base==="light"?fe(e.background.app):de(e.background.app),"transparent"),borderRightColor:H("right",r,e.color[o]||o||e.base==="light"?fe(e.background.app):de(e.background.app),"transparent")}}),xo=Ee.div(function(t){var e=t.hidden;return{display:e?"none":"inline-block",zIndex:2147483647}},function(t){var e=t.theme,o=t.color,r=t.hasChrome;return r?{background:e.color[o]||o||e.base==="light"?fe(e.background.app):de(e.background.app),filter:`
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,borderRadius:e.appBorderRadius*2,fontSize:e.typography.size.s1}:{}}),$t=function(e){var o=e.placement,r=e.hasChrome,n=e.children,i=e.arrowProps,s=e.tooltipRef,a=e.arrowRef,l=e.color,c=We(e,["placement","hasChrome","children","arrowProps","tooltipRef","arrowRef","color"]);return mt(xo,ce(_({},Object.assign({hasChrome:r,placement:o,ref:s},c,{color:l})),{children:[r&&$(Oo,_({},Object.assign({placement:o,ref:a},i,{color:l}))),n]}))};$t.defaultProps={color:void 0,arrowRef:void 0,tooltipRef:void 0,hasChrome:!0,placement:"top",arrowProps:{}};var De=Qt.document,To=Ee.div(ot||(ot=xt([`
  display: inline-block;
  cursor: `,`;
`])),function(t){return t.mode==="hover"?"default":"pointer"}),Co=Ee.g(nt||(nt=xt([`
  cursor: `,`;
`])),function(t){return t.mode==="hover"?"default":"pointer"}),Wt=function(e){var o=e.svg,r=e.trigger;e.closeOnClick;var n=e.placement,i=e.modifiers,s=e.hasChrome,a=e.tooltip,l=e.children,c=e.tooltipShown,u=e.onVisibilityChange,d=We(e,["svg","trigger","closeOnClick","placement","modifiers","hasChrome","tooltip","children","tooltipShown","onVisibilityChange"]),m=o?Co:To;return $(bo,{placement:n,trigger:r,modifiers:i,tooltipShown:c,onVisibilityChange:u,tooltip:function(v){var h=v.getTooltipProps,g=v.getArrowProps,O=v.tooltipRef,T=v.arrowRef,y=v.placement;return $($t,ce(_({},Object.assign({hasChrome:s,placement:y,tooltipRef:O,arrowRef:T,arrowProps:g()},h())),{children:typeof a=="function"?a({onHide:function(){return u(!1)}}):a}))},children:function(p){var v=p.getTriggerProps,h=p.triggerRef;return $(m,ce(_({},Object.assign({ref:h},v(),d)),{children:l}))}})};Wt.defaultProps={svg:!1,trigger:"hover",closeOnClick:!1,placement:"top",modifiers:[{name:"preventOverflow",options:{padding:8}},{name:"offset",options:{offset:[8,8]}},{name:"arrow",options:{padding:8}}],hasChrome:!0,tooltipShown:!1};var So=function(e){var o=e.startOpen,r=e.onVisibilityChange,n=We(e,["startOpen","onVisibilityChange"]),i=C.exports.useState(o||!1),s=nr(i,2),a=s[0],l=s[1],c=C.exports.useCallback(function(u){r&&r(u)===!1||l(u)},[r]);return C.exports.useEffect(function(){var u=function(){return c(!1)};De.addEventListener("keydown",u,!1);var d=Array.from(De.getElementsByTagName("iframe")),m=[];return d.forEach(function(p){var v=function(){try{p.contentWindow.document&&(p.contentWindow.document.addEventListener("click",u),m.push(function(){try{p.contentWindow.document.removeEventListener("click",u)}catch{}}))}catch{}};v(),p.addEventListener("load",v),m.push(function(){p.removeEventListener("load",v)})}),function(){De.removeEventListener("keydown",u),m.forEach(function(p){p()})}}),$(Wt,_({},Object.assign({},n,{tooltipShown:a,onVisibilityChange:c})))};export{So as WithToolTipState,So as WithTooltip,Wt as WithTooltipPure};
//# sourceMappingURL=WithTooltip-5ca86264.82e329f7.js.map
