var se=Object.defineProperty;var re=(t,e,i)=>e in t?se(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var $=(t,e,i)=>re(t,typeof e!="symbol"?e+"":e,i);const oe="modulepreload",ae=function(t){return"/pinyinime/"+t},St={},he=function(e,i,n){let s=Promise.resolve();if(i&&i.length>0){let o=function(y){return Promise.all(y.map(g=>Promise.resolve(g).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=o(i.map(y=>{if(y=ae(y),y in St)return;St[y]=!0;const g=y.endsWith(".css"),d=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${d}`))return;const m=document.createElement("link");if(m.rel=g?"stylesheet":oe,g||(m.as="script"),m.crossOrigin="",m.href=y,c&&m.setAttribute("nonce",c),document.head.appendChild(m),g)return new Promise((E,u)=>{m.addEventListener("load",E),m.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${y}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};var Pt=200;function le(t){const e=new Map;for(const i in t){const n=t[i];if(n)for(const s of n){const r=e.get(s.w);(r===void 0||s.f>r)&&e.set(s.w,s.f)}}return e}function ue(t){const e=t,i=le(e),n=new Set(Object.keys(e).filter(u=>/^[a-z]{1,6}$/.test(u)&&/[aeiouv]/.test(u)));function s(u){const p=new Map;for(const h of u)for(const l of h){const f=p.get(l.w);(f===void 0||l.f>f)&&p.set(l.w,l.f)}return Array.from(p.entries()).sort((h,l)=>l[1]-h[1]).map(([h,l])=>({w:h,f:l}))}function r(u){const p=[],h=e[u];if(h)p.push(h);else for(const l in e)if(l.startsWith(u)){const f=e[l];f&&p.push(f)}return s(p)}function o(u){const p=[];for(const h in e){const l=e[h];l&&l.some(f=>f.w===u)&&p.push(h)}return p}function a(u){const p=new Map,h=l=>{if(l===u.length)return[];const f=p.get(l);if(f!==void 0)return f;for(let _=Math.min(u.length,l+6);_>l;_--){const S=u.substring(l,_);if(!n.has(S))continue;const A=h(_);if(A){const D=[S,...A];return p.set(l,D),D}}return p.set(l,null),null};return h(0)}function c(u,p){if(u.startsWith(p))return p.length;const h=a(p);if(!h)return 0;let l=0;const f=(_,S)=>{if(S>l&&(l=S),_>=h.length||S>=u.length)return;const A=h[_];u.startsWith(A,S)&&f(_+1,S+A.length),u[S]===A[0]&&f(_+1,S+1)};return f(0,0),l}function y(u,p,h,l){const f=p.get(h);if(f===void 0){p.set(h,u.length),u.push({word:h,matchedLength:l});return}l>u[f].matchedLength&&(u[f]={...u[f],matchedLength:l})}function g(u){return i.get(u)??0}function d(u){return[...u].sort((p,h)=>h.matchedLength!==p.matchedLength?h.matchedLength-p.matchedLength:g(h.word)-g(p.word))}function m(u,p,h){const l=p.toLowerCase().replace(/'/g,"");if(!l)return 0;let f=h;const _=o(u);for(const S of _){const A=c(l,S);A>f&&(f=A)}return f}function E(u){if(!u)return{candidates:[]};const p=u.toLowerCase().replace(/'/g,""),h=[],l=new Map,f=r(p);for(const{w:_}of f)y(h,l,_,p.length);if(p.length>=4)for(let _=1;_<p.length;_++){const S=p.substring(0,_);let A=r(S);_===1&&p.length>_&&A.length>Pt&&(A=A.slice(0,Pt));for(const{w:D}of A)y(h,l,D,_)}if(h.length===0)for(let _=p.length-1;_>=1;_--){const S=p.substring(0,_),A=r(S);if(A.length>0){for(const{w:D}of A)y(h,l,D,_);break}}return{candidates:d(h)}}return{getCandidates:E,computeMatchedLength:m}}var mt=5;function Ct(t){return Number.isFinite(t)?Math.min(9,Math.max(1,Math.floor(t))):mt}function xt(t){if(["=",".","-",","].includes(t.key)||t.key==="+"||t.key==="_")return!0;const e=t.code;return e==="Equal"||e==="Minus"||e==="Period"||e==="Comma"||e==="NumpadSubtract"||e==="NumpadAdd"||e==="NumpadDecimal"}function ce(t){if(t.key==="="||t.key==="."||t.key==="+")return!0;const e=t.code;return e==="Equal"||e==="Period"||e==="NumpadAdd"||e==="NumpadDecimal"}function pe(t){if(t.key==="-"||t.key===","||t.key==="_")return!0;const e=t.code;return e==="Minus"||e==="Comma"||e==="NumpadSubtract"}function Tt(t,e){const i=parseInt(t,10);return/^[1-9]$/.test(t)&&i>=1&&i<=e}var de=class{constructor(t){$(this,"options");$(this,"listeners",new Set);$(this,"pinyinInput","");$(this,"pinyinCursorPosition",0);$(this,"candidates",[]);$(this,"page",0);$(this,"pageSize",mt);$(this,"cachedSnapshot",null);this.options=t,this.pageSize=Ct(t.pageSize??mt)}setOptions(t){this.options={...this.options,...t},t.pageSize!==void 0&&(this.pageSize=Ct(t.pageSize),this.page=0),this.recomputeCandidates(),this.emit()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}getSnapshot(){if(this.cachedSnapshot===null){const t=this.candidates.slice(this.page*this.pageSize,(this.page+1)*this.pageSize);this.cachedSnapshot={pinyinInput:this.pinyinInput,pinyinCursorPosition:this.pinyinCursorPosition,candidates:this.candidates,displayCandidates:t,page:this.page,pageSize:this.pageSize,hasActiveComposition:this.pinyinInput.length>0}}return this.cachedSnapshot}emit(){this.cachedSnapshot=null;for(const t of this.listeners)t()}recomputeCandidates(){const t=this.options.getEngine();if(!this.pinyinInput||!t){this.candidates=[],this.page=0;return}this.candidates=t.getCandidates(this.pinyinInput).candidates;const e=Math.max(0,Math.ceil(this.candidates.length/this.pageSize)-1);this.page>e&&(this.page=e)}selectCandidate(t){const e=this.options.getEngine();if(!e)return;this.insertText(t.word);const i=e.computeMatchedLength(t.word,this.pinyinInput,t.matchedLength),n=this.pinyinInput.substring(i),s=n.startsWith("'")?n.substring(1):n;this.pinyinInput=s,this.pinyinCursorPosition=s.length,this.recomputeCandidates(),this.emit()}addPage(t){this.setPage(e=>Math.max(0,e+t))}setPage(t){const e=t(this.page),i=Math.max(0,Math.ceil(this.candidates.length/this.pageSize)-1);this.page=Math.min(i,Math.max(0,e)),this.emit()}insertText(t){const e=this.options.getElement();if(!e)return;const i=e.selectionStart??0,n=e.selectionEnd??i,s=String(this.options.getValue()||""),r=s.substring(0,i)+t+s.substring(n);this.options.onValueChange(r),requestAnimationFrame(()=>{e.selectionStart=e.selectionEnd=i+t.length,e.focus()})}handleBeforeInput(t){if(this.options.enabled===!1||t.inputType==="insertFromPaste"||t.inputType==="insertFromDrop"||t.inputType==="insertCompositionText"||t.inputType==="insertFromComposition"||t.inputType!=="insertText"||!t.data||t.data.length!==1)return;const e=t.data;if(this.pinyinInput.length>0){if(e===" "){t.preventDefault();return}if(Tt(e,this.pageSize)){t.preventDefault();return}if(/^[=\-.,]$/.test(e)){t.preventDefault();return}}/^[a-zA-Z']$/.test(e)&&t.preventDefault()}handleKeyDown(t){var e,i,n,s;if(this.options.enabled===!1){(i=(e=this.options).onKeyDown)==null||i.call(e,t);return}if(this.pinyinInput.length>0&&xt(t)&&(t.preventDefault(),t.stopPropagation()),this.pinyinInput.length>0){if(t.key==="Backspace"){if(t.preventDefault(),this.pinyinCursorPosition>0){const r=this.pinyinInput.substring(0,this.pinyinCursorPosition-1),o=this.pinyinInput.substring(this.pinyinCursorPosition);this.pinyinInput=r+o,this.pinyinCursorPosition-=1,this.recomputeCandidates(),this.emit()}return}if(t.key==="ArrowLeft"){t.preventDefault(),this.pinyinCursorPosition=this.pinyinCursorPosition>0?this.pinyinCursorPosition-1:this.pinyinInput.length,this.emit();return}if(t.key==="ArrowRight"){t.preventDefault(),this.pinyinCursorPosition=this.pinyinCursorPosition<this.pinyinInput.length?this.pinyinCursorPosition+1:0,this.emit();return}if(t.key==="Enter"){t.preventDefault(),this.insertText(this.pinyinInput),this.pinyinInput="",this.pinyinCursorPosition=0,this.recomputeCandidates(),this.emit();return}if(t.key==="Escape"){t.preventDefault(),this.pinyinInput="",this.pinyinCursorPosition=0,this.recomputeCandidates(),this.emit();return}if(t.key===" "){t.preventDefault(),this.candidates.length>0?this.selectCandidate(this.candidates[this.page*this.pageSize]):(this.insertText(this.pinyinInput),this.pinyinInput="",this.pinyinCursorPosition=0,this.recomputeCandidates(),this.emit());return}if(Tt(t.key,this.pageSize)){t.preventDefault();const r=parseInt(t.key,10)-1,o=this.page*this.pageSize+r;o<this.candidates.length&&this.selectCandidate(this.candidates[o]);return}if(ce(t)){(this.page+1)*this.pageSize<this.candidates.length&&this.setPage(r=>r+1);return}if(pe(t)){this.page>0&&this.setPage(r=>r-1);return}}if(/^[a-z']$/i.test(t.key)&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),t.stopPropagation();const r=this.pinyinInput.substring(0,this.pinyinCursorPosition),o=this.pinyinInput.substring(this.pinyinCursorPosition),a=t.key.toLowerCase();this.pinyinInput=r+a+o,this.pinyinCursorPosition+=1,this.recomputeCandidates(),this.emit();return}this.pinyinInput.length>0&&xt(t)||(s=(n=this.options).onKeyDown)==null||s.call(n,t)}},fe=class{get shadowRoot(){return this.__host.__shadowRoot}constructor(e){this.ariaActiveDescendantElement=null,this.ariaAtomic="",this.ariaAutoComplete="",this.ariaBrailleLabel="",this.ariaBrailleRoleDescription="",this.ariaBusy="",this.ariaChecked="",this.ariaColCount="",this.ariaColIndex="",this.ariaColIndexText="",this.ariaColSpan="",this.ariaControlsElements=null,this.ariaCurrent="",this.ariaDescribedByElements=null,this.ariaDescription="",this.ariaDetailsElements=null,this.ariaDisabled="",this.ariaErrorMessageElements=null,this.ariaExpanded="",this.ariaFlowToElements=null,this.ariaHasPopup="",this.ariaHidden="",this.ariaInvalid="",this.ariaKeyShortcuts="",this.ariaLabel="",this.ariaLabelledByElements=null,this.ariaLevel="",this.ariaLive="",this.ariaModal="",this.ariaMultiLine="",this.ariaMultiSelectable="",this.ariaOrientation="",this.ariaOwnsElements=null,this.ariaPlaceholder="",this.ariaPosInSet="",this.ariaPressed="",this.ariaReadOnly="",this.ariaRelevant="",this.ariaRequired="",this.ariaRoleDescription="",this.ariaRowCount="",this.ariaRowIndex="",this.ariaRowIndexText="",this.ariaRowSpan="",this.ariaSelected="",this.ariaSetSize="",this.ariaSort="",this.ariaValueMax="",this.ariaValueMin="",this.ariaValueNow="",this.ariaValueText="",this.role="",this.form=null,this.labels=[],this.states=new Set,this.validationMessage="",this.validity={},this.willValidate=!0,this.__host=e}checkValidity(){return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),!0}reportValidity(){return!0}setFormValue(){}setValidity(){}},x=function(t,e,i,n,s){if(typeof e=="function"?t!==e||!0:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(t,i),i},w=function(t,e,i,n){if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return i==="m"?n:i==="a"?n.call(t):n?n.value:e.get(t)},O,tt,et,V,ut,F,it,L,j,T,nt,Rt,Mt=t=>typeof t=="boolean"?t:(t==null?void 0:t.capture)??!1,rt=0,_t=1,ot=2,vt=3,ge=class{constructor(){this.__eventListeners=new Map,this.__captureEventListeners=new Map}addEventListener(t,e,i){var o;if(e==null)return;const n=Mt(i)?this.__captureEventListeners:this.__eventListeners;let s=n.get(t);if(s===void 0)s=new Map,n.set(t,s);else if(s.has(e))return;const r=typeof i=="object"&&i?i:{};(o=r.signal)==null||o.addEventListener("abort",()=>this.removeEventListener(t,e,i)),s.set(e,r??{})}removeEventListener(t,e,i){if(e==null)return;const n=Mt(i)?this.__captureEventListeners:this.__eventListeners,s=n.get(t);s!==void 0&&(s.delete(e),s.size||n.delete(t))}dispatchEvent(t){const e=[this];let i=this.__eventTargetParent;if(t.composed)for(;i;)e.push(i),i=i.__eventTargetParent;else for(;i&&i!==this.__host;)e.push(i),i=i.__eventTargetParent;let n=!1,s=!1,r=rt,o=null,a=null,c=null;const y=t.stopPropagation,g=t.stopImmediatePropagation;Object.defineProperties(t,{target:{get(){return o??a},...v},srcElement:{get(){return t.target},...v},currentTarget:{get(){return c},...v},eventPhase:{get(){return r},...v},composedPath:{value:()=>e,...v},stopPropagation:{value:()=>{n=!0,y.call(t)},...v},stopImmediatePropagation:{value:()=>{s=!0,g.call(t)},...v}});const d=(h,l,f)=>{typeof h=="function"?h(t):typeof(h==null?void 0:h.handleEvent)=="function"&&h.handleEvent(t),l.once&&f.delete(h)},m=()=>(c=null,r=rt,!t.defaultPrevented),E=e.slice().reverse();o=!this.__host||!t.composed?this:null;const u=h=>{for(a=this;a.__host&&h.includes(a.__host);)a=a.__host};for(const h of E){!o&&(!a||a===h.__host)&&u(E.slice(E.indexOf(h))),c=h,r=h===t.target?ot:_t;const l=h.__captureEventListeners.get(t.type);if(l){for(const[f,_]of l)if(d(f,_,l),s)return m()}if(n)return m()}const p=t.bubbles?e:[this];a=null;for(const h of p){!o&&(!a||h===a.__host)&&u(p.slice(0,p.indexOf(h)+1)),c=h,r=h===t.target?ot:vt;const l=h.__eventListeners.get(t.type);if(l){for(const[f,_]of l)if(d(f,_,l),s)return m()}if(n)return m()}return m()}},me=ge,v={__proto__:null};v.enumerable=!0;Object.freeze(v);var bt=(T=class{constructor(e,i={}){if(O.set(this,!1),tt.set(this,!1),et.set(this,!1),V.set(this,!1),ut.set(this,Date.now()),F.set(this,!1),it.set(this,void 0),L.set(this,void 0),j.set(this,void 0),this.NONE=rt,this.CAPTURING_PHASE=_t,this.AT_TARGET=ot,this.BUBBLING_PHASE=vt,arguments.length===0)throw new Error("The type argument must be specified");if(typeof i!="object"||!i)throw new Error('The "options" argument must be an object');const{bubbles:n,cancelable:s,composed:r}=i;x(this,O,!!s),x(this,tt,!!n),x(this,et,!!r),x(this,it,`${e}`),x(this,L,null),x(this,j,!1)}initEvent(e,i,n){throw new Error("Method not implemented.")}stopImmediatePropagation(){this.stopPropagation()}preventDefault(){x(this,V,!0)}get target(){return w(this,L,"f")}get currentTarget(){return w(this,L,"f")}get srcElement(){return w(this,L,"f")}get type(){return w(this,it,"f")}get cancelable(){return w(this,O,"f")}get defaultPrevented(){return w(this,O,"f")&&w(this,V,"f")}get timeStamp(){return w(this,ut,"f")}composedPath(){return w(this,j,"f")?[w(this,L,"f")]:[]}get returnValue(){return!w(this,O,"f")||!w(this,V,"f")}get bubbles(){return w(this,tt,"f")}get composed(){return w(this,et,"f")}get eventPhase(){return w(this,j,"f")?T.AT_TARGET:T.NONE}get cancelBubble(){return w(this,F,"f")}set cancelBubble(e){e&&x(this,F,!0)}stopPropagation(){x(this,F,!0)}get isTrusted(){return!1}},O=new WeakMap,tt=new WeakMap,et=new WeakMap,V=new WeakMap,ut=new WeakMap,F=new WeakMap,it=new WeakMap,L=new WeakMap,j=new WeakMap,T.NONE=rt,T.CAPTURING_PHASE=_t,T.AT_TARGET=ot,T.BUBBLING_PHASE=vt,T);Object.defineProperties(bt.prototype,{initEvent:v,stopImmediatePropagation:v,preventDefault:v,target:v,currentTarget:v,srcElement:v,type:v,cancelable:v,defaultPrevented:v,timeStamp:v,composedPath:v,returnValue:v,bubbles:v,composed:v,eventPhase:v,cancelBubble:v,stopPropagation:v,isTrusted:v});var Gt=(Rt=class extends bt{constructor(e,i={}){super(e,i),nt.set(this,void 0),x(this,nt,(i==null?void 0:i.detail)??null)}initCustomEvent(e,i,n,s){throw new Error("Method not implemented.")}get detail(){return w(this,nt,"f")}},nt=new WeakMap,Rt);Object.defineProperties(Gt.prototype,{detail:v});var _e=bt,ve=Gt,P;P=class{constructor(){this.STYLE_RULE=1,this.CHARSET_RULE=2,this.IMPORT_RULE=3,this.MEDIA_RULE=4,this.FONT_FACE_RULE=5,this.PAGE_RULE=6,this.NAMESPACE_RULE=10,this.KEYFRAMES_RULE=7,this.KEYFRAME_RULE=8,this.SUPPORTS_RULE=12,this.COUNTER_STYLE_RULE=11,this.FONT_FEATURE_VALUES_RULE=14,this.__parentStyleSheet=null,this.cssText=""}get parentRule(){return null}get parentStyleSheet(){return this.__parentStyleSheet}get type(){return 0}},P.STYLE_RULE=1,P.CHARSET_RULE=2,P.IMPORT_RULE=3,P.MEDIA_RULE=4,P.FONT_FACE_RULE=5,P.PAGE_RULE=6,P.NAMESPACE_RULE=10,P.KEYFRAMES_RULE=7,P.KEYFRAME_RULE=8,P.SUPPORTS_RULE=12,P.COUNTER_STYLE_RULE=11,P.FONT_FEATURE_VALUES_RULE=14;globalThis.Event??(globalThis.Event=_e);globalThis.CustomEvent??(globalThis.CustomEvent=ve);var Lt=new WeakMap,G=t=>{let e=Lt.get(t);return e===void 0&&Lt.set(t,e=new Map),e},ye=class extends me{constructor(){super(...arguments),this.__shadowRootMode=null,this.__shadowRoot=null,this.__internals=null}get attributes(){return Array.from(G(this)).map(([e,i])=>({name:e,value:i}))}get shadowRoot(){return this.__shadowRootMode==="closed"?null:this.__shadowRoot}get localName(){return this.constructor.__localName}get tagName(){var e;return(e=this.localName)==null?void 0:e.toUpperCase()}setAttribute(e,i){G(this).set(e,String(i))}removeAttribute(e){G(this).delete(e)}toggleAttribute(e,i){if(this.hasAttribute(e)){if(i===void 0||!i)return this.removeAttribute(e),!1}else return i===void 0||i?(this.setAttribute(e,""),!0):!1;return!0}hasAttribute(e){return G(this).has(e)}attachShadow(e){const i={host:this};return this.__shadowRootMode=e.mode,e&&e.mode==="open"&&(this.__shadowRoot=i),i}attachInternals(){if(this.__internals!==null)throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");const e=new fe(this);return this.__internals=e,e}getAttribute(e){return G(this).get(e)??null}},Ee=class extends ye{},qt=Ee;globalThis.litServerRoot??(globalThis.litServerRoot=Object.defineProperty(new qt,"localName",{get(){return"lit-server-root"}}));function be(){let t,e;return{promise:new Promise((n,s)=>{t=n,e=s}),resolve:t,reject:e}}var $e=class{constructor(){this.__definitions=new Map,this.__reverseDefinitions=new Map,this.__pendingWhenDefineds=new Map}define(t,e){var i;if(this.__definitions.has(t))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${t}" has already been used with this registry`);if(this.__reverseDefinitions.has(e))throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(e)}`);e.__localName=t,this.__definitions.set(t,{ctor:e,observedAttributes:e.observedAttributes??[]}),this.__reverseDefinitions.set(e,t),(i=this.__pendingWhenDefineds.get(t))==null||i.resolve(e),this.__pendingWhenDefineds.delete(t)}get(t){const e=this.__definitions.get(t);return e==null?void 0:e.ctor}getName(t){return this.__reverseDefinitions.get(t)??null}upgrade(t){throw new Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")}async whenDefined(t){const e=this.__definitions.get(t);if(e)return e.ctor;let i=this.__pendingWhenDefineds.get(t);return i||(i=be(),this.__pendingWhenDefineds.set(t,i)),i.promise}},Ae=$e,we=new Ae,K=globalThis,$t=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kt=Symbol(),It=new WeakMap,Se=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if($t&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=It.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&It.set(e,t))}return t}toString(){return this.cssText}},Yt=t=>new Se(typeof t=="string"?t:t+"",void 0,Kt),Pe=(t,e)=>{if($t)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const n=document.createElement("style"),s=K.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}},Ut=$t||K.CSSStyleSheet===void 0?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const n of e.cssRules)i+=n.cssText;return Yt(i)})(t):t,{is:Ce,defineProperty:xe,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Re,getOwnPropertySymbols:Me,getPrototypeOf:Le}=Object,C=globalThis;C.customElements??(C.customElements=we);var kt=C.trustedTypes,Ie=kt?kt.emptyScript:"",ct=C.reactiveElementPolyfillSupport,Y=(t,e)=>t,yt={toAttribute(t,e){switch(e){case Boolean:t=t?Ie:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},Zt=(t,e)=>!Ce(t,e),Nt={attribute:!0,type:String,converter:yt,reflect:!1,useDefault:!1,hasChanged:Zt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);var z=class extends(globalThis.HTMLElement??qt){static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);n!==void 0&&xe(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=Te(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){const o=n==null?void 0:n.call(this);s==null||s.call(this,r),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Nt}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;const t=Le(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){const e=this.properties,i=[...Re(e),...Me(e)];for(const n of i)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,n]of e)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const n=this._$Eu(e,i);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const n of i)e.unshift(Ut(n))}else t!==void 0&&e.push(Ut(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pe(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const r=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:yt).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){var s,r;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),a=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:yt;this._$Em=n;const c=a.fromAttribute(e,o.type);this[n]=c??((r=this._$Ej)==null?void 0:r.get(n))??c,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){var r;if(t!==void 0){const o=this.constructor;if(n===!1&&(s=this[t]),i??(i=o.getPropertyOptions(t)),!((i.hasChanged??Zt)(s,e)||i.useDefault&&i.reflect&&s===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),s!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[Y("elementProperties")]=new Map,z[Y("finalized")]=new Map,ct==null||ct({ReactiveElement:z}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.1.2");var H=globalThis,Dt=t=>t,at=H.trustedTypes,Ot=at?at.createPolicy("lit-html",{createHTML:t=>t}):void 0,Jt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Xt="?"+M,Ue=`<${Xt}>`,N=H.document===void 0?{createTreeWalker:()=>({})}:document,X=()=>N.createComment(""),Q=t=>t===null||typeof t!="object"&&typeof t!="function",At=Array.isArray,ke=t=>At(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",pt=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zt=/-->/g,Ht=/>/g,I=RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wt=/'/g,Bt=/"/g,Qt=/^(?:script|style|textarea|title)$/i,Ne=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),R=Ne(1),W=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Vt=new WeakMap,U=N.createTreeWalker(N,129);function te(t,e){if(!At(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(e):e}var De=(t,e)=>{const i=t.length-1,n=[];let s,r=e===2?"<svg>":e===3?"<math>":"",o=q;for(let a=0;a<i;a++){const c=t[a];let y,g,d=-1,m=0;for(;m<c.length&&(o.lastIndex=m,g=o.exec(c),g!==null);)m=o.lastIndex,o===q?g[1]==="!--"?o=zt:g[1]!==void 0?o=Ht:g[2]!==void 0?(Qt.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=I):g[3]!==void 0&&(o=I):o===I?g[0]===">"?(o=s??q,d=-1):g[1]===void 0?d=-2:(d=o.lastIndex-g[2].length,y=g[1],o=g[3]===void 0?I:g[3]==='"'?Bt:Wt):o===Bt||o===Wt?o=I:o===zt||o===Ht?o=q:(o=I,s=void 0);const E=o===I&&t[a+1].startsWith("/>")?" ":"";r+=o===q?c+Ue:d>=0?(n.push(y),c.slice(0,d)+Jt+c.slice(d)+M+E):c+M+(d===-2?a:E)}return[te(t,r+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Et=class ee{constructor({strings:e,_$litType$:i},n){let s;this.parts=[];let r=0,o=0;const a=e.length-1,c=this.parts,[y,g]=De(e,i);if(this.el=ee.createElement(y,n),U.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=U.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(Jt)){const m=g[o++],E=s.getAttribute(d).split(M),u=/([.?@])?(.*)/.exec(m);c.push({type:1,index:r,name:u[2],strings:E,ctor:u[1]==="."?ze:u[1]==="?"?He:u[1]==="@"?We:lt}),s.removeAttribute(d)}else d.startsWith(M)&&(c.push({type:6,index:r}),s.removeAttribute(d));if(Qt.test(s.tagName)){const d=s.textContent.split(M),m=d.length-1;if(m>0){s.textContent=at?at.emptyScript:"";for(let E=0;E<m;E++)s.append(d[E],X()),U.nextNode(),c.push({type:2,index:++r});s.append(d[m],X())}}}else if(s.nodeType===8)if(s.data===Xt)c.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(M,d+1))!==-1;)c.push({type:7,index:r}),d+=M.length-1}r++}}static createElement(e,i){const n=N.createElement("template");return n.innerHTML=e,n}};function B(t,e,i=t,n){var o,a;if(e===W)return e;let s=n!==void 0?(o=i._$Co)==null?void 0:o[n]:i._$Cl;const r=Q(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),r===void 0?s=void 0:(s=new r(t),s._$AT(t,i,n)),n!==void 0?(i._$Co??(i._$Co=[]))[n]=s:i._$Cl=s),s!==void 0&&(e=B(t,s._$AS(t,e.values),s,n)),e}var Oe=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=((t==null?void 0:t.creationScope)??N).importNode(e,!0);U.currentNode=n;let s=U.nextNode(),r=0,o=0,a=i[0];for(;a!==void 0;){if(r===a.index){let c;a.type===2?c=new wt(s,s.nextSibling,this,t):a.type===1?c=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(c=new Be(s,this,t)),this._$AV.push(c),a=i[++o]}r!==(a==null?void 0:a.index)&&(s=U.nextNode(),r++)}return U.currentNode=N,n}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},wt=class ie{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,n,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=B(this,e,i),Q(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==W&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ke(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&Q(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){var r;const{values:i,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Et.createElement(te(n.h,n.h[0]),this.options)),n);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(i);else{const o=new Oe(s,this),a=o.u(this.options);o.p(i),this.T(a),this._$AH=o}}_$AC(e){let i=Vt.get(e.strings);return i===void 0&&Vt.set(e.strings,i=new Et(e)),i}k(e){At(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const r of e)s===i.length?i.push(n=new ie(this.O(X()),this.O(X()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(e=this._$AA.nextSibling,i){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,i);e!==this._$AB;){const s=Dt(e).nextSibling;Dt(e).remove(),e=s}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}},lt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(s===void 0)t=B(this,t,e,0),r=!Q(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const o=t;let a,c;for(t=s[0],a=0;a<s.length-1;a++)c=B(this,o[i+a],e,a),c===W&&(c=this._$AH[a]),r||(r=!Q(c)||c!==this._$AH[a]),c===b?t=b:t!==b&&(t+=(c??"")+s[a+1]),this._$AH[a]=c}r&&!n&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ze=class extends lt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}},He=class extends lt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},We=class extends lt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=B(this,t,e,0)??b)===W)return;const i=this._$AH,n=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==b&&(i===b||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},Be=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}},dt=H.litHtmlPolyfillSupport;dt==null||dt(Et,wt),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.3.2");var Ve=(t,e,i)=>{const n=(i==null?void 0:i.renderBefore)??e;let s=n._$litPart$;if(s===void 0){const r=(i==null?void 0:i.renderBefore)??null;n._$litPart$=s=new wt(e.insertBefore(X(),r),r,void 0,i??{})}return s._$AI(t),s},k=globalThis,Z=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ve(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return W}},jt;Z._$litElement$=!0,Z.finalized=!0,(jt=k.litElementHydrateSupport)==null||jt.call(k,{LitElement:Z});var ft=k.litElementPolyfillSupport;ft==null||ft({LitElement:Z});(k.litElementVersions??(k.litElementVersions=[])).push("4.2.2");var Fe=t=>t.strings===void 0,je={CHILD:2},Ge=t=>(...e)=>({_$litDirective$:t,values:e}),qe=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},J=(t,e)=>{var n;const i=t._$AN;if(i===void 0)return!1;for(const s of i)(n=s._$AO)==null||n.call(s,e,!1),J(s,e);return!0},ht=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while((i==null?void 0:i.size)===0)},ne=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),Ze(e)}};function Ke(t){this._$AN!==void 0?(ht(this),this._$AM=t,ne(this)):this._$AM=t}function Ye(t,e=!1,i=0){const n=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(n))for(let r=i;r<n.length;r++)J(n[r],!1),ht(n[r]);else n!=null&&(J(n,!1),ht(n));else J(this,t)}var Ze=t=>{t.type==je.CHILD&&(t._$AP??(t._$AP=Ye),t._$AQ??(t._$AQ=Ke))},Je=class extends qe{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),ne(this),this.isConnected=t._$AU}_$AO(t,e=!0){var i,n;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(n=this.disconnected)==null||n.call(this)),e&&(J(this,t),ht(this))}setValue(t){if(Fe(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}},Xe=()=>new Qe,Qe=class{},gt=new WeakMap,Ft=Ge(class extends Je{render(t){return b}update(t,[e]){var n;const i=e!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=(n=t.options)==null?void 0:n.host,this.rt(this.ct=t.element)),b}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let i=gt.get(e);i===void 0&&(i=new WeakMap,gt.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){var t,e;return typeof this.G=="function"?(t=gt.get(this.ht??globalThis))==null?void 0:t.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),ti=`/**\r
 * 默认样式（无前缀框架）；与 \`defaultPinyinPopupClassNames\` / 输入框默认 class 对应。\r
 * 发布时复制到 \`dist/pinyin-ime.css\`。\r
 * 支持 CSS 变量覆盖：--pinyin-ime-border-color、--pinyin-ime-focus-border 等。\r
 */\r
\r
:host {\r
  --pinyin-ime-border-color: #d4d4d8;\r
  --pinyin-ime-focus-border: #3b82f6;\r
  --pinyin-ime-focus-shadow: rgba(59, 130, 246, 0.25);\r
  --pinyin-ime-popup-bg: #fff;\r
  --pinyin-ime-popup-border: #e4e4e7;\r
  --pinyin-ime-cursor-color: #2563eb;\r
  --pinyin-ime-hover-bg: #f4f4f5;\r
  --pinyin-ime-text-color: #18181b;\r
  --pinyin-ime-muted-color: #71717a;\r
}\r
\r
.pinyin-ime-field-wrap {\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.pinyin-ime-input,\r
.pinyin-ime-textarea {\r
  box-sizing: border-box;\r
  width: 100%;\r
  border: 1px solid var(--pinyin-ime-border-color);\r
  border-radius: 0.375rem;\r
  background: var(--pinyin-ime-popup-bg);\r
  color: var(--pinyin-ime-text-color);\r
  font-size: 0.875rem;\r
  line-height: 1.25rem;\r
  padding: 0.5rem 0.75rem;\r
  outline: none;\r
  transition: box-shadow 0.15s ease, border-color 0.15s ease;\r
}\r
\r
.pinyin-ime-textarea {\r
  min-height: 5rem;\r
  resize: vertical;\r
}\r
\r
.pinyin-ime-input::placeholder,\r
.pinyin-ime-textarea::placeholder {\r
  color: var(--pinyin-ime-muted-color);\r
}\r
\r
.pinyin-ime-input:focus-visible,\r
.pinyin-ime-textarea:focus-visible {\r
  border-color: var(--pinyin-ime-focus-border);\r
  box-shadow: 0 0 0 2px var(--pinyin-ime-focus-shadow);\r
}\r
\r
.pinyin-ime-input:disabled,\r
.pinyin-ime-textarea:disabled {\r
  opacity: 0.5;\r
  cursor: not-allowed;\r
}\r
\r
.pinyin-ime-popup {\r
  position: fixed;\r
  z-index: 9999;\r
  display: flex;\r
  flex-direction: column;\r
  min-width: 8rem;\r
  border-radius: 0.375rem;\r
  border: 1px solid var(--pinyin-ime-popup-border);\r
  background: var(--pinyin-ime-popup-bg);\r
  color: var(--pinyin-ime-text-color);\r
  font-size: 0.75rem;\r
  line-height: 1rem;\r
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\r
  padding: 2px;\r
}\r
\r
.pinyin-ime-pinyin-bar {\r
  flex-shrink: 0;\r
  margin-bottom: 2px;\r
  border-bottom: 1px solid var(--pinyin-ime-popup-border);\r
  background: var(--pinyin-ime-hover-bg);\r
  padding: 2px 4px;\r
  font-family: ui-monospace, monospace;\r
  font-size: 10px;\r
}\r
\r
.pinyin-ime-cursor {\r
  display: inline-block;\r
  height: 0.75rem;\r
  width: 1px;\r
  margin: 0 1px;\r
  vertical-align: middle;\r
  background: var(--pinyin-ime-cursor-color);\r
  animation: pinyin-ime-caret-blink 1s step-end infinite;\r
}\r
\r
@keyframes pinyin-ime-caret-blink {\r
  50% {\r
    opacity: 0;\r
  }\r
}\r
\r
.pinyin-ime-candidate-row {\r
  display: flex;\r
  flex-shrink: 0;\r
  align-items: center;\r
  padding: 4px;\r
  cursor: pointer;\r
  border-radius: 2px;\r
}\r
\r
.pinyin-ime-candidate-row:hover {\r
  background: var(--pinyin-ime-hover-bg);\r
}\r
\r
.pinyin-ime-candidate-index {\r
  margin-right: 4px;\r
  width: 1rem;\r
  flex-shrink: 0;\r
  font-size: 0.75rem;\r
  font-weight: 600;\r
  color: var(--pinyin-ime-muted-color);\r
}\r
\r
.pinyin-ime-candidate-text {\r
  font-size: 11px;\r
}\r
\r
.pinyin-ime-empty,\r
.pinyin-ime-loading {\r
  padding: 4px;\r
  font-size: 10px;\r
  font-style: italic;\r
  color: var(--pinyin-ime-muted-color);\r
}\r
\r
.pinyin-ime-footer {\r
  margin-top: 2px;\r
  display: flex;\r
  flex-shrink: 0;\r
  align-items: center;\r
  justify-content: space-between;\r
  border-top: 1px solid var(--pinyin-ime-popup-border);\r
  padding: 4px;\r
  font-size: 10px;\r
  color: var(--pinyin-ime-muted-color);\r
  user-select: none;\r
}\r
\r
.pinyin-ime-candidate-list {\r
  display: flex;\r
  flex-direction: column;\r
  flex-shrink: 0;\r
}\r
\r
.pinyin-ime-footer-nav {\r
  display: flex;\r
  gap: 0.5rem;\r
}\r
\r
.pinyin-ime-page-link {\r
  cursor: pointer;\r
}\r
\r
.pinyin-ime-page-link:hover {\r
  color: var(--pinyin-ime-text-color);\r
}\r
\r
.pinyin-ime-page-link--disabled {\r
  cursor: default;\r
  opacity: 0.5;\r
}\r
`,ei=new Set(["value","editor-type","page-size","enabled","class"]),st,ii=(st=class extends Z{constructor(){super();$(this,"inputRef",Xe());$(this,"_controller",null);$(this,"_unsub",null);$(this,"_customEngine",null);$(this,"_dictionaryState","idle");$(this,"_position",null);$(this,"_onWinResize",()=>{this._syncPosition(),this.requestUpdate()});this.value="",this.editorType="input",this.enabled=!0,this.pageSize=5}_resolvedEngine(){return this._customEngine}_syncPosition(){var s;const e=this.inputRef.value,i=(s=this._controller)==null?void 0:s.getSnapshot();if(!e||!(i!=null&&i.hasActiveComposition)){this._position=null;return}const n=e.getBoundingClientRect();this._position={top:n.top,left:n.left,width:n.width}}_getPassThroughAttributes(){const e={};for(let i=0;i<this.attributes.length;i++){const n=this.attributes[i];ei.has(n.name)||(e[n.name]=n.value)}return e}_loadDictionary(){this._dictionaryState="loading",this._customEngine=null;const e=()=>Promise.resolve(this.getDictionary()),i=()=>he(()=>import("./dict-CpBL7cx9.js"),[]).then(s=>s.dict);(this.getDictionary?e():i()).then(s=>{const r=ue(s);this._customEngine=r,this._dictionaryState="ready"}).catch(()=>{this._customEngine=null,this._dictionaryState="error"}).finally(()=>{var s;(s=this._controller)==null||s.setOptions({getEngine:()=>this._resolvedEngine()}),this.requestUpdate()})}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._onWinResize),window.addEventListener("scroll",this._onWinResize,!0),this._loadDictionary()}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._unsub)==null||e.call(this),this._unsub=null,this._controller=null,window.removeEventListener("resize",this._onWinResize),window.removeEventListener("scroll",this._onWinResize,!0)}willUpdate(e){e.has("getDictionary")&&this._loadDictionary()}firstUpdated(){const e=this.inputRef.value;e&&(this._controller=new de({getValue:()=>this.value,onValueChange:i=>this._onValueChange(i),getElement:()=>this.inputRef.value??null,getEngine:()=>this._resolvedEngine(),enabled:this.enabled,pageSize:this.pageSize}),this._unsub=this._controller.subscribe(()=>{this._syncPosition(),this.requestUpdate()}),this.requestUpdate(),e.addEventListener("beforeinput",i=>{var n;return(n=this._controller)==null?void 0:n.handleBeforeInput(i)},!0),e.addEventListener("keydown",i=>{var n;return(n=this._controller)==null?void 0:n.handleKeyDown(i)},!0))}_onValueChange(e){this.value=e;const i=this.inputRef.value;i&&(i.value=e),this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0})),this.requestUpdate()}updated(e){var n;(e.has("enabled")||e.has("pageSize")||e.has("value"))&&((n=this._controller)==null||n.setOptions({getValue:()=>this.value,onValueChange:s=>this._onValueChange(s),getElement:()=>this.inputRef.value??null,getEngine:()=>this._resolvedEngine(),enabled:this.enabled,pageSize:this.pageSize}));const i=this.inputRef.value;if(i){i.value!==this.value&&(i.value=this.value);const s=this._getPassThroughAttributes();for(const[r,o]of Object.entries(s))i.setAttribute(r,o)}}_onSelect(e){var i;(i=this._controller)==null||i.selectCandidate(e)}_onPageDelta(e){var i;(i=this._controller)==null||i.addPage(e)}render(){var s;const e=(s=this._controller)==null?void 0:s.getSnapshot(),i=(e==null?void 0:e.hasActiveComposition)&&this._position!=null&&e.pinyinInput.length>0,n=this.editorType==="textarea"?R`<textarea
            ${Ft(this.inputRef)}
            class="pinyin-ime-textarea"
            .value=${this.value}
            @input=${this._onNativeInput}
          ></textarea>`:R`<input
            ${Ft(this.inputRef)}
            class="pinyin-ime-input"
            .value=${this.value}
            @input=${this._onNativeInput}
          />`;return R`
      <div class="pinyin-ime-field-wrap">
        ${n}
        ${i?this._renderPopup():b}
      </div>
    `}_onNativeInput(e){const i=e.target;i.value!==this.value&&this._onValueChange(i.value)}_renderPopup(){const e=this._controller,i=this._position;if(!e||!i)return b;const n=this._dictionaryState==="loading",{pinyinInput:s,pinyinCursorPosition:r,candidates:o,displayCandidates:a,page:c,pageSize:y}=e.getSnapshot(),g=Math.ceil(o.length/y)||1,d=c>0,m=(c+1)*y<o.length;return R`
      <div
        part="popup"
        class="pinyin-ime-popup"
        style="top: ${i.top}px; left: ${i.left}px; width: ${i.width}px; transform: translateY(-100%) translateY(-2px);"
      >
        <div part="pinyin-bar" class="pinyin-ime-pinyin-bar">
          ${s.substring(0,r)}<span
            part="cursor"
            class="pinyin-ime-cursor"
          ></span
          >${s.substring(r)}
        </div>
        <div part="candidate-list" class="pinyin-ime-candidate-list">
          ${n?R`<div part="loading" class="pinyin-ime-loading"
                >加载中…</div
              >`:a.length>0?a.map((E,u)=>R`
                    <div
                      part="candidate-row"
                      class="pinyin-ime-candidate-row"
                      role="option"
                      @mousedown=${p=>{p.preventDefault(),this._onSelect(E)}}
                    >
                      <span part="candidate-index" class="pinyin-ime-candidate-index"
                        >${u+1}.</span
                      >
                      <span part="candidate-text" class="pinyin-ime-candidate-text"
                        >${E.word}</span
                      >
                    </div>
                  `):R`<div part="empty" class="pinyin-ime-empty">无候选词</div>`}
        </div>
        ${!n&&o.length>y?R`
              <div part="footer" class="pinyin-ime-footer">
                <div class="pinyin-ime-footer-nav">
                  <span
                    class="pinyin-ime-page-link ${d?"":"pinyin-ime-page-link--disabled"}"
                    @mousedown=${E=>{E.preventDefault(),d&&this._onPageDelta(-1)}}
                    >&lt; (-)</span
                  >
                  <span
                    class="pinyin-ime-page-link ${m?"":"pinyin-ime-page-link--disabled"}"
                    @mousedown=${E=>{E.preventDefault(),m&&this._onPageDelta(1)}}
                    >(=) &gt;</span
                  >
                </div>
                <span>${c+1} / ${g}</span>
              </div>
            `:b}
      </div>
    `}},$(st,"styles",[Yt(ti)]),$(st,"properties",{value:{type:String},editorType:{type:String,attribute:"editor-type"},pageSize:{type:Number,attribute:"page-size"},enabled:{type:Boolean},getDictionary:{attribute:!1}}),st);customElements.get("pinyin-ime-editor")||customElements.define("pinyin-ime-editor",ii);export{ii as P};
