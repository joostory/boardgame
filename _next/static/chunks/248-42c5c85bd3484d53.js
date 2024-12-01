"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[248],{5052:(e,r,t)=>{t.d(r,{A:()=>n});var o=t(2115);let n=o.forwardRef(function(e,r){let{title:t,titleId:n,...l}=e;return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},l),t?o.createElement("title",{id:n},t):null,o.createElement("path",{fillRule:"evenodd",d:"M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z",clipRule:"evenodd"}),o.createElement("path",{d:"M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"}))})},8068:(e,r,t)=>{t.d(r,{s:()=>l,t:()=>n});var o=t(2115);function n(...e){return r=>e.forEach(e=>{"function"==typeof e?e(r):null!=e&&(e.current=r)})}function l(...e){return o.useCallback(n(...e),e)}},2317:(e,r,t)=>{t.d(r,{DX:()=>a,xV:()=>s});var o=t(2115),n=t(8068),l=t(5155),a=o.forwardRef((e,r)=>{let{children:t,...n}=e,a=o.Children.toArray(t),s=a.find(d);if(s){let e=s.props.children,t=a.map(r=>r!==s?r:o.Children.count(e)>1?o.Children.only(null):o.isValidElement(e)?e.props.children:null);return(0,l.jsx)(i,{...n,ref:r,children:o.isValidElement(e)?o.cloneElement(e,void 0,t):null})}return(0,l.jsx)(i,{...n,ref:r,children:t})});a.displayName="Slot";var i=o.forwardRef((e,r)=>{let{children:t,...l}=e;if(o.isValidElement(t)){let e=function(e){let r=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(t=(r=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(t);return o.cloneElement(t,{...function(e,r){let t={...r};for(let o in r){let n=e[o],l=r[o];/^on[A-Z]/.test(o)?n&&l?t[o]=(...e)=>{l(...e),n(...e)}:n&&(t[o]=n):"style"===o?t[o]={...n,...l}:"className"===o&&(t[o]=[n,l].filter(Boolean).join(" "))}return{...e,...t}}(l,t.props),ref:r?(0,n.t)(r,e):e})}return o.Children.count(t)>1?o.Children.only(null):null});i.displayName="SlotClone";var s=({children:e})=>(0,l.jsx)(l.Fragment,{children:e});function d(e){return o.isValidElement(e)&&e.type===s}},1027:(e,r,t)=>{t.d(r,{F:()=>a});var o=t(3463);let n=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=o.$,a=(e,r)=>t=>{var o;if((null==r?void 0:r.variants)==null)return l(e,null==t?void 0:t.class,null==t?void 0:t.className);let{variants:a,defaultVariants:i}=r,s=Object.keys(a).map(e=>{let r=null==t?void 0:t[e],o=null==i?void 0:i[e];if(null===r)return null;let l=n(r)||n(o);return a[e][l]}),d=t&&Object.entries(t).reduce((e,r)=>{let[t,o]=r;return void 0===o||(e[t]=o),e},{});return l(e,s,null==r?void 0:null===(o=r.compoundVariants)||void 0===o?void 0:o.reduce((e,r)=>{let{class:t,className:o,...n}=r;return Object.entries(n).every(e=>{let[r,t]=e;return Array.isArray(t)?t.includes({...i,...d}[r]):({...i,...d})[r]===t})?[...e,t,o]:e},[]),null==t?void 0:t.class,null==t?void 0:t.className)}},3463:(e,r,t)=>{t.d(r,{$:()=>o});function o(){for(var e,r,t=0,o="",n=arguments.length;t<n;t++)(e=arguments[t])&&(r=function e(r){var t,o,n="";if("string"==typeof r||"number"==typeof r)n+=r;else if("object"==typeof r){if(Array.isArray(r)){var l=r.length;for(t=0;t<l;t++)r[t]&&(o=e(r[t]))&&(n&&(n+=" "),n+=o)}else for(o in r)r[o]&&(n&&(n+=" "),n+=o)}return n}(e))&&(o&&(o+=" "),o+=r);return o}},4928:(e,r,t)=>{t.d(r,{Kq:()=>i,Xr:()=>b,fp:()=>m,md:()=>f});var o=t(2115),n=t(1416);let l=(0,o.createContext)(void 0),a=e=>{let r=(0,o.useContext)(l);return(null==e?void 0:e.store)||r||(0,n.zp)()},i=e=>{let{children:r,store:t}=e,a=(0,o.useRef)();return t||a.current||(a.current=(0,n.y$)()),(0,o.createElement)(l.Provider,{value:t||a.current},r)},s=e=>"function"==typeof(null==e?void 0:e.then),d=e=>{e.status="pending",e.then(r=>{e.status="fulfilled",e.value=r},r=>{e.status="rejected",e.reason=r})},c=o.use||(e=>{if("pending"===e.status)throw e;if("fulfilled"===e.status)return e.value;if("rejected"===e.status)throw e.reason;throw d(e),e}),u=new WeakMap,p=e=>{let r=u.get(e);return r||(r=new Promise((t,o)=>{let n=e,l=e=>r=>{n===e&&t(r)},a=e=>r=>{n===e&&o(r)},i=e=>{"onCancel"in e&&"function"==typeof e.onCancel&&e.onCancel(o=>{if(o===e)throw Error("[Bug] p is not updated even after cancelation");s(o)?(u.set(o,r),n=o,o.then(l(o),a(o)),i(o)):t(o)})};e.then(l(e),a(e)),i(e)}),u.set(e,r)),r};function f(e,r){let t=a(r),[[n,l,i],u]=(0,o.useReducer)(r=>{let o=t.get(e);return Object.is(r[0],o)&&r[1]===t&&r[2]===e?r:[o,t,e]},void 0,()=>[t.get(e),t,e]),f=n;(l!==t||i!==e)&&(u(),f=t.get(e));let b=null==r?void 0:r.delay;return((0,o.useEffect)(()=>{let r=t.sub(e,()=>{if("number"==typeof b){let r=t.get(e);s(r)&&d(p(r)),setTimeout(u,b);return}u()});return u(),r},[t,e,b]),(0,o.useDebugValue)(f),s(f))?c(p(f)):f}function b(e,r){let t=a(r);return(0,o.useCallback)(function(){for(var r=arguments.length,o=Array(r),n=0;n<r;n++)o[n]=arguments[n];if(!("write"in e))throw Error("not writable atom");return t.set(e,...o)},[t,e])}function m(e,r){return[f(e,r),b(e,r)]}},1416:(e,r,t)=>{let o;t.d(r,{eU:()=>l,y$:()=>S,zp:()=>C});let n=0;function l(e,r){let t=`atom${++n}`,o={toString(){return this.debugLabel?t+":"+this.debugLabel:t}};return"function"==typeof e?o.read=e:(o.init=e,o.read=a,o.write=i),r&&(o.write=r),o}function a(e){return e(this)}function i(e,r,t){return r(this,"function"==typeof t?t(e(this)):t)}let s=(e,r)=>e.unstable_is?e.unstable_is(r):r===e,d=e=>"init"in e,c=e=>!!e.write,u=new WeakMap,p=e=>{var r;return m(e)&&!(null==(r=u.get(e))?void 0:r[1])},f=(e,r)=>{let t=u.get(e);if(t)t[1]=!0,t[0].forEach(e=>e(r));else throw Error("[Bug] cancelable promise not found")},b=e=>{if(u.has(e))return;let r=[new Set,!1];u.set(e,r);let t=()=>{r[1]=!0};e.then(t,t),e.onCancel=e=>{r[0].add(e)}},m=e=>"function"==typeof(null==e?void 0:e.then),g=e=>"v"in e||"e"in e,h=e=>{if("e"in e)throw e.e;if(!("v"in e))throw Error("[Bug] atom state is not initialized");return e.v},v=(e,r,t)=>{t.p.has(e)||(t.p.add(e),r.then(()=>{t.p.delete(e)},()=>{t.p.delete(e)}))},y=(e,r,t,o,n)=>{var l;if(o===r)throw Error("[Bug] atom cannot depend on itself");t.d.set(o,n.n),p(t.v)&&v(r,t.v,n),null==(l=n.m)||l.t.add(r),e&&k(e,o,r)},w=()=>[new Map,new Map,new Set],x=(e,r,t)=>{e[0].has(r)||e[0].set(r,new Set),e[1].set(r,t)},k=(e,r,t)=>{let o=e[0].get(r);o&&o.add(t)},z=(e,r)=>e[0].get(r),E=(e,r)=>{e[2].add(r)},j=e=>{let r;let t=!1,o=e=>{try{e()}catch(e){t||(r=e,t=!0)}};for(;e[1].size||e[2].size;){e[0].clear();let r=new Set(e[1].values());e[1].clear();let t=new Set(e[2]);e[2].clear(),r.forEach(e=>{var r;return null==(r=e.m)?void 0:r.l.forEach(o)}),t.forEach(o)}if(t)throw r},_=(...[e,r,t,o])=>{let n;n=new Set;let l=(r,t,o)=>{let n="v"in t,l=t.v,a=p(t.v)?t.v:null;if(m(o)){for(let n of(b(o),t.d.keys()))v(r,o,e(n));t.v=o,delete t.e}else t.v=o,delete t.e;n&&Object.is(l,t.v)||(++t.n,a&&f(a,o))},a=(t,o,n)=>{var i;let u,p;let f=e(o);if(g(f)&&(f.m&&!(null==n?void 0:n.has(o))||Array.from(f.d).every(([e,r])=>a(t,e,n).n===r)))return f;f.d.clear();let b=!0;try{let v=r(o,r=>{if(s(o,r)){let t=e(r);if(!g(t)){if(d(r))l(r,t,r.init);else throw Error("no atom init")}return h(t)}let i=a(t,r,n);try{return h(i)}finally{if(b)y(t,o,f,r,i);else{let e=w();y(e,o,f,r,i),C(e,o,f),j(e)}}},{get signal(){return u||(u=new AbortController),u.signal},get setSelf(){return c(o)||console.warn("setSelf function cannot be used with read-only atom"),!p&&c(o)&&(p=(...e)=>{if(b&&console.warn("setSelf function cannot be called in sync"),!b)return S(o,...e)}),p}});if(l(o,f,v),m(v)){null==(i=v.onCancel)||i.call(v,()=>null==u?void 0:u.abort());let e=()=>{if(f.m){let e=w();C(e,o,f),j(e)}};v.then(e,e)}return f}catch(e){return delete f.v,f.e=e,++f.n,f}finally{b=!1}},i=(r,t,o)=>{var n,l;let a=new Map;for(let r of(null==(n=o.m)?void 0:n.t)||[])a.set(r,e(r));for(let r of o.p)a.set(r,e(r));return null==(l=z(r,t))||l.forEach(r=>{a.set(r,e(r))}),a},u=(e,r,t)=>{let[o,n]=function(e,r,t){let o=[],n=new Set,l=new Set,a=[[r,t]];for(;a.length>0;){let[r,t]=a[a.length-1];if(l.has(r)){a.pop();continue}if(n.has(r)){o.push([r,t,t.n]),l.add(r),a.pop();continue}for(let[o,l]of(n.add(r),i(e,r,t)))r===o||n.has(o)||a.push([o,l])}return[o,l]}(e,r,t),l=new Set([r]);for(let r=o.length-1;r>=0;--r){let[t,i,s]=o[r],d=!1;for(let e of i.d.keys())if(e!==t&&l.has(e)){d=!0;break}d&&(a(e,t,n),C(e,t,i),s!==i.n&&(x(e,t,i),l.add(t))),n.delete(t)}},k=(r,o,...n)=>{let i=!0;try{return t(o,e=>h(a(r,e)),(t,...n)=>{let a=e(t);try{if(!s(o,t))return k(r,t,...n);{if(!d(t))throw Error("atom not writable");let e=a.n,o=n[0];l(t,a,o),C(r,t,a),e!==a.n&&(x(r,t,a),u(r,t,a));return}}finally{i||j(r)}},...n)}finally{i=!1}},S=(e,...r)=>{let t=w();try{return k(t,e,...r)}finally{j(t)}},C=(r,t,o)=>{if(o.m&&!p(o.v)){for(let n of o.d.keys())o.m.d.has(n)||(A(r,n,e(n)).t.add(t),o.m.d.add(n));for(let n of o.m.d||[])if(!o.d.has(n)){o.m.d.delete(n);let l=O(r,n,e(n));null==l||l.t.delete(t)}}},A=(r,t,l)=>{if(!l.m){for(let o of(a(r,t),l.d.keys()))A(r,o,e(o)).t.add(t);if(l.m={l:new Set,d:new Set(l.d.keys()),t:new Set},n.add(t),c(t)){let e;let n=l.m,a=(r,o)=>{let n=!0;e=(...e)=>{try{return k(r,t,...e)}finally{n||j(r)}};try{return o()}finally{n=!1}};E(r,()=>{let l=a(r,()=>o(t,(...r)=>e(...r)));l&&(n.u=e=>a(e,l))})}}return l.m},O=(r,t,o)=>{if(o.m&&!o.m.l.size&&!Array.from(o.m.t).some(r=>{var o;return null==(o=e(r).m)?void 0:o.d.has(t)})){let l=o.m.u;for(let a of(l&&E(r,()=>l(r)),delete o.m,n.delete(t),o.d.keys())){let o=O(r,a,e(a));null==o||o.t.delete(t)}return}return o.m},R={get:e=>h(a(void 0,e)),set:S,sub:(r,t)=>{let o=w(),n=e(r),l=A(o,r,n).l;return l.add(t),j(o),()=>{l.delete(t);let e=w();O(e,r,n),j(e)}},unstable_derive:n=>_(...n(e,r,t,o))};return Object.assign(R,{dev4_get_internal_weak_map:()=>({get:r=>{let t=e(r);if(0!==t.n)return t}}),dev4_get_mounted_atoms:()=>n,dev4_restore_atoms:r=>{let t=w();for(let[o,n]of r)if(d(o)){let r=e(o),a=r.n;l(o,r,n),C(t,o,r),a!==r.n&&(x(t,o,r),u(t,o,r))}j(t)}}),R},S=()=>{let e=new WeakMap;return _(r=>{if(!r)throw Error("Atom is undefined or null");let t=e.get(r);return t||(t={d:new Map,p:new Set,n:0},e.set(r,t)),t},(e,...r)=>e.read(...r),(e,...r)=>e.write(...r),(e,...r)=>{var t;return null==(t=e.onMount)?void 0:t.call(e,...r)})},C=()=>(o||(o=S(),globalThis.__JOTAI_DEFAULT_STORE__||(globalThis.__JOTAI_DEFAULT_STORE__=o),globalThis.__JOTAI_DEFAULT_STORE__!==o&&console.warn("Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044")),o)},490:(e,r,t)=>{t.d(r,{Ak:()=>o});let o=(e=21)=>{let r="",t=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)r+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&t[e]];return r}},9795:(e,r,t)=>{t.d(r,{QP:()=>X});let o=e=>{let r=i(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:e=>{let t=e.split("-");return""===t[0]&&1!==t.length&&t.shift(),n(t,r)||a(e)},getConflictingClassGroupIds:(e,r)=>{let n=t[e]||[];return r&&o[e]?[...n,...o[e]]:n}}},n=(e,r)=>{if(0===e.length)return r.classGroupId;let t=e[0],o=r.nextPart.get(t),l=o?n(e.slice(1),o):void 0;if(l)return l;if(0===r.validators.length)return;let a=e.join("-");return r.validators.find(({validator:e})=>e(a))?.classGroupId},l=/^\[(.+)\]$/,a=e=>{if(l.test(e)){let r=l.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},i=e=>{let{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return u(Object.entries(e.classGroups),t).forEach(([e,t])=>{s(t,o,e,r)}),o},s=(e,r,t,o)=>{e.forEach(e=>{if("string"==typeof e){(""===e?r:d(r,e)).classGroupId=t;return}if("function"==typeof e){if(c(e)){s(e(o),r,t,o);return}r.validators.push({validator:e,classGroupId:t});return}Object.entries(e).forEach(([e,n])=>{s(n,d(r,e),t,o)})})},d=(e,r)=>{let t=e;return r.split("-").forEach(e=>{t.nextPart.has(e)||t.nextPart.set(e,{nextPart:new Map,validators:[]}),t=t.nextPart.get(e)}),t},c=e=>e.isThemeGetter,u=(e,r)=>r?e.map(([e,t])=>[e,t.map(e=>"string"==typeof e?r+e:"object"==typeof e?Object.fromEntries(Object.entries(e).map(([e,t])=>[r+e,t])):e)]):e,p=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let r=0,t=new Map,o=new Map,n=(n,l)=>{t.set(n,l),++r>e&&(r=0,o=t,t=new Map)};return{get(e){let r=t.get(e);return void 0!==r?r:void 0!==(r=o.get(e))?(n(e,r),r):void 0},set(e,r){t.has(e)?t.set(e,r):n(e,r)}}},f=e=>{let{separator:r,experimentalParseClassName:t}=e,o=1===r.length,n=r[0],l=r.length,a=e=>{let t;let a=[],i=0,s=0;for(let d=0;d<e.length;d++){let c=e[d];if(0===i){if(c===n&&(o||e.slice(d,d+l)===r)){a.push(e.slice(s,d)),s=d+l;continue}if("/"===c){t=d;continue}}"["===c?i++:"]"===c&&i--}let d=0===a.length?e:e.substring(s),c=d.startsWith("!"),u=c?d.substring(1):d;return{modifiers:a,hasImportantModifier:c,baseClassName:u,maybePostfixModifierPosition:t&&t>s?t-s:void 0}};return t?e=>t({className:e,parseClassName:a}):a},b=e=>{if(e.length<=1)return e;let r=[],t=[];return e.forEach(e=>{"["===e[0]?(r.push(...t.sort(),e),t=[]):t.push(e)}),r.push(...t.sort()),r},m=e=>({cache:p(e.cacheSize),parseClassName:f(e),...o(e)}),g=/\s+/,h=(e,r)=>{let{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:n}=r,l=[],a=e.trim().split(g),i="";for(let e=a.length-1;e>=0;e-=1){let r=a[e],{modifiers:s,hasImportantModifier:d,baseClassName:c,maybePostfixModifierPosition:u}=t(r),p=!!u,f=o(p?c.substring(0,u):c);if(!f){if(!p||!(f=o(c))){i=r+(i.length>0?" "+i:i);continue}p=!1}let m=b(s).join(":"),g=d?m+"!":m,h=g+f;if(l.includes(h))continue;l.push(h);let v=n(f,p);for(let e=0;e<v.length;++e){let r=v[e];l.push(g+r)}i=r+(i.length>0?" "+i:i)}return i};function v(){let e,r,t=0,o="";for(;t<arguments.length;)(e=arguments[t++])&&(r=y(e))&&(o&&(o+=" "),o+=r);return o}let y=e=>{let r;if("string"==typeof e)return e;let t="";for(let o=0;o<e.length;o++)e[o]&&(r=y(e[o]))&&(t&&(t+=" "),t+=r);return t},w=e=>{let r=r=>r[e]||[];return r.isThemeGetter=!0,r},x=/^\[(?:([a-z-]+):)?(.+)\]$/i,k=/^\d+\/\d+$/,z=new Set(["px","full","screen"]),E=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,j=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,_=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,S=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,C=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,A=e=>R(e)||z.has(e)||k.test(e),O=e=>L(e,"length",U),R=e=>!!e&&!Number.isNaN(Number(e)),M=e=>L(e,"number",R),T=e=>!!e&&Number.isInteger(Number(e)),N=e=>e.endsWith("%")&&R(e.slice(0,-1)),P=e=>x.test(e),$=e=>E.test(e),G=new Set(["length","size","percentage"]),W=e=>L(e,G,J),I=e=>L(e,"position",J),D=new Set(["image","url"]),V=e=>L(e,D,q),B=e=>L(e,"",Z),F=()=>!0,L=(e,r,t)=>{let o=x.exec(e);return!!o&&(o[1]?"string"==typeof r?o[1]===r:r.has(o[1]):t(o[2]))},U=e=>j.test(e)&&!_.test(e),J=()=>!1,Z=e=>S.test(e),q=e=>C.test(e);Symbol.toStringTag;let X=function(e,...r){let t,o,n;let l=function(i){return o=(t=m(r.reduce((e,r)=>r(e),e()))).cache.get,n=t.cache.set,l=a,a(i)};function a(e){let r=o(e);if(r)return r;let l=h(e,t);return n(e,l),l}return function(){return l(v.apply(null,arguments))}}(()=>{let e=w("colors"),r=w("spacing"),t=w("blur"),o=w("brightness"),n=w("borderColor"),l=w("borderRadius"),a=w("borderSpacing"),i=w("borderWidth"),s=w("contrast"),d=w("grayscale"),c=w("hueRotate"),u=w("invert"),p=w("gap"),f=w("gradientColorStops"),b=w("gradientColorStopPositions"),m=w("inset"),g=w("margin"),h=w("opacity"),v=w("padding"),y=w("saturate"),x=w("scale"),k=w("sepia"),z=w("skew"),E=w("space"),j=w("translate"),_=()=>["auto","contain","none"],S=()=>["auto","hidden","clip","visible","scroll"],C=()=>["auto",P,r],G=()=>[P,r],D=()=>["",A,O],L=()=>["auto",R,P],U=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],J=()=>["solid","dashed","dotted","double","none"],Z=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],q=()=>["start","end","center","between","around","evenly","stretch"],X=()=>["","0",P],H=()=>["auto","avoid","all","avoid-page","page","left","right","column"],K=()=>[R,P];return{cacheSize:500,separator:":",theme:{colors:[F],spacing:[A,O],blur:["none","",$,P],brightness:K(),borderColor:[e],borderRadius:["none","","full",$,P],borderSpacing:G(),borderWidth:D(),contrast:K(),grayscale:X(),hueRotate:K(),invert:X(),gap:G(),gradientColorStops:[e],gradientColorStopPositions:[N,O],inset:C(),margin:C(),opacity:K(),padding:G(),saturate:K(),scale:K(),sepia:X(),skew:K(),space:G(),translate:G()},classGroups:{aspect:[{aspect:["auto","square","video",P]}],container:["container"],columns:[{columns:[$]}],"break-after":[{"break-after":H()}],"break-before":[{"break-before":H()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...U(),P]}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:_()}],"overscroll-x":[{"overscroll-x":_()}],"overscroll-y":[{"overscroll-y":_()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[m]}],"inset-x":[{"inset-x":[m]}],"inset-y":[{"inset-y":[m]}],start:[{start:[m]}],end:[{end:[m]}],top:[{top:[m]}],right:[{right:[m]}],bottom:[{bottom:[m]}],left:[{left:[m]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",T,P]}],basis:[{basis:C()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",P]}],grow:[{grow:X()}],shrink:[{shrink:X()}],order:[{order:["first","last","none",T,P]}],"grid-cols":[{"grid-cols":[F]}],"col-start-end":[{col:["auto",{span:["full",T,P]},P]}],"col-start":[{"col-start":L()}],"col-end":[{"col-end":L()}],"grid-rows":[{"grid-rows":[F]}],"row-start-end":[{row:["auto",{span:[T,P]},P]}],"row-start":[{"row-start":L()}],"row-end":[{"row-end":L()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",P]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",P]}],gap:[{gap:[p]}],"gap-x":[{"gap-x":[p]}],"gap-y":[{"gap-y":[p]}],"justify-content":[{justify:["normal",...q()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...q(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...q(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[E]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[E]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",P,r]}],"min-w":[{"min-w":[P,r,"min","max","fit"]}],"max-w":[{"max-w":[P,r,"none","full","min","max","fit","prose",{screen:[$]},$]}],h:[{h:[P,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[P,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[P,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[P,r,"auto","min","max","fit"]}],"font-size":[{text:["base",$,O]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",M]}],"font-family":[{font:[F]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",P]}],"line-clamp":[{"line-clamp":["none",R,M]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",A,P]}],"list-image":[{"list-image":["none",P]}],"list-style-type":[{list:["none","disc","decimal",P]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...J(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",A,O]}],"underline-offset":[{"underline-offset":["auto",A,P]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:G()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",P]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",P]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...U(),I]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",W]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},V]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[b]}],"gradient-via-pos":[{via:[b]}],"gradient-to-pos":[{to:[b]}],"gradient-from":[{from:[f]}],"gradient-via":[{via:[f]}],"gradient-to":[{to:[f]}],rounded:[{rounded:[l]}],"rounded-s":[{"rounded-s":[l]}],"rounded-e":[{"rounded-e":[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-ss":[{"rounded-ss":[l]}],"rounded-se":[{"rounded-se":[l]}],"rounded-ee":[{"rounded-ee":[l]}],"rounded-es":[{"rounded-es":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[i]}],"border-w-x":[{"border-x":[i]}],"border-w-y":[{"border-y":[i]}],"border-w-s":[{"border-s":[i]}],"border-w-e":[{"border-e":[i]}],"border-w-t":[{"border-t":[i]}],"border-w-r":[{"border-r":[i]}],"border-w-b":[{"border-b":[i]}],"border-w-l":[{"border-l":[i]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...J(),"hidden"]}],"divide-x":[{"divide-x":[i]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[i]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:J()}],"border-color":[{border:[n]}],"border-color-x":[{"border-x":[n]}],"border-color-y":[{"border-y":[n]}],"border-color-s":[{"border-s":[n]}],"border-color-e":[{"border-e":[n]}],"border-color-t":[{"border-t":[n]}],"border-color-r":[{"border-r":[n]}],"border-color-b":[{"border-b":[n]}],"border-color-l":[{"border-l":[n]}],"divide-color":[{divide:[n]}],"outline-style":[{outline:["",...J()]}],"outline-offset":[{"outline-offset":[A,P]}],"outline-w":[{outline:[A,O]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:D()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[A,O]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",$,B]}],"shadow-color":[{shadow:[F]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...Z(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Z()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[s]}],"drop-shadow":[{"drop-shadow":["","none",$,P]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[c]}],invert:[{invert:[u]}],saturate:[{saturate:[y]}],sepia:[{sepia:[k]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[s]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[c]}],"backdrop-invert":[{"backdrop-invert":[u]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[y]}],"backdrop-sepia":[{"backdrop-sepia":[k]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[a]}],"border-spacing-x":[{"border-spacing-x":[a]}],"border-spacing-y":[{"border-spacing-y":[a]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",P]}],duration:[{duration:K()}],ease:[{ease:["linear","in","out","in-out",P]}],delay:[{delay:K()}],animate:[{animate:["none","spin","ping","pulse","bounce",P]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[x]}],"scale-x":[{"scale-x":[x]}],"scale-y":[{"scale-y":[x]}],rotate:[{rotate:[T,P]}],"translate-x":[{"translate-x":[j]}],"translate-y":[{"translate-y":[j]}],"skew-x":[{"skew-x":[z]}],"skew-y":[{"skew-y":[z]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",P]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",P]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":G()}],"scroll-mx":[{"scroll-mx":G()}],"scroll-my":[{"scroll-my":G()}],"scroll-ms":[{"scroll-ms":G()}],"scroll-me":[{"scroll-me":G()}],"scroll-mt":[{"scroll-mt":G()}],"scroll-mr":[{"scroll-mr":G()}],"scroll-mb":[{"scroll-mb":G()}],"scroll-ml":[{"scroll-ml":G()}],"scroll-p":[{"scroll-p":G()}],"scroll-px":[{"scroll-px":G()}],"scroll-py":[{"scroll-py":G()}],"scroll-ps":[{"scroll-ps":G()}],"scroll-pe":[{"scroll-pe":G()}],"scroll-pt":[{"scroll-pt":G()}],"scroll-pr":[{"scroll-pr":G()}],"scroll-pb":[{"scroll-pb":G()}],"scroll-pl":[{"scroll-pl":G()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",P]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[A,O,M]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}})}}]);