(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{21968:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,37237,23)),Promise.resolve().then(r.bind(r,25416)),Promise.resolve().then(r.t.bind(r,35786,23)),Promise.resolve().then(r.t.bind(r,24665,23))},24665:()=>{},25416:(e,t,r)=>{"use strict";r.d(t,{BoardgameThemeProvider:()=>b});var n=r(95155),s=r(12115),a=(e,t,r,n,s,a,o,l)=>{let i=document.documentElement,m=["light","dark"];function c(t){var r;(Array.isArray(e)?e:[e]).forEach(e=>{let r="class"===e,n=r&&a?s.map(e=>a[e]||e):s;r?(i.classList.remove(...n),i.classList.add(a&&a[t]?a[t]:t)):i.setAttribute(e,t)}),r=t,l&&m.includes(r)&&(i.style.colorScheme=r)}if(n)c(n);else try{let e=localStorage.getItem(t)||r,n=o&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;c(n)}catch(e){}},o=["light","dark"],l="(prefers-color-scheme: dark)",i=s.createContext(void 0),m=e=>s.useContext(i)?s.createElement(s.Fragment,null,e.children):s.createElement(d,{...e}),c=["light","dark"],d=e=>{let{forcedTheme:t,disableTransitionOnChange:r=!1,enableSystem:n=!0,enableColorScheme:a=!0,storageKey:m="theme",themes:d=c,defaultTheme:b=n?"system":"light",attribute:p="data-theme",value:v,children:g,nonce:S,scriptProps:E}=e,[k,w]=s.useState(()=>h(m,b)),[C,T]=s.useState(()=>"system"===k?f():k),P=v?Object.values(v):d,_=s.useCallback(e=>{let t=e;if(!t)return;"system"===e&&n&&(t=f());let s=v?v[t]:t,l=r?y(S):null,i=document.documentElement,m=e=>{"class"===e?(i.classList.remove(...P),s&&i.classList.add(s)):e.startsWith("data-")&&(s?i.setAttribute(e,s):i.removeAttribute(e))};if(Array.isArray(p)?p.forEach(m):m(p),a){let e=o.includes(b)?b:null,r=o.includes(t)?t:e;i.style.colorScheme=r}null==l||l()},[S]),L=s.useCallback(e=>{let t="function"==typeof e?e(k):e;w(t);try{localStorage.setItem(m,t)}catch(e){}},[k]),A=s.useCallback(e=>{T(f(e)),"system"===k&&n&&!t&&_("system")},[k,t]);s.useEffect(()=>{let e=window.matchMedia(l);return e.addListener(A),A(e),()=>e.removeListener(A)},[A]),s.useEffect(()=>{let e=e=>{e.key===m&&(e.newValue?w(e.newValue):L(b))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[L]),s.useEffect(()=>{_(null!=t?t:k)},[t,k]);let N=s.useMemo(()=>({theme:k,setTheme:L,forcedTheme:t,resolvedTheme:"system"===k?C:k,themes:n?[...d,"system"]:d,systemTheme:n?C:void 0}),[k,L,t,C,n,d]);return s.createElement(i.Provider,{value:N},s.createElement(u,{forcedTheme:t,storageKey:m,attribute:p,enableSystem:n,enableColorScheme:a,defaultTheme:b,value:v,themes:d,nonce:S,scriptProps:E}),g)},u=s.memo(e=>{let{forcedTheme:t,storageKey:r,attribute:n,enableSystem:o,enableColorScheme:l,defaultTheme:i,value:m,themes:c,nonce:d,scriptProps:u}=e,h=JSON.stringify([n,r,i,t,c,m,o,l]).slice(1,-1);return s.createElement("script",{...u,suppressHydrationWarning:!0,nonce:"",dangerouslySetInnerHTML:{__html:"(".concat(a.toString(),")(").concat(h,")")}})}),h=(e,t)=>{let r;try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t},y=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},f=e=>(e||(e=window.matchMedia(l)),e.matches?"dark":"light");function b(e){let{children:t,...r}=e;return(0,n.jsx)(m,{...r,children:t})}},35786:()=>{},37237:e=>{e.exports={style:{fontFamily:"'Poor Story', 'Poor Story Fallback'",fontWeight:400,fontStyle:"normal"},className:"__className_7d2e33"}}},e=>{var t=t=>e(e.s=t);e.O(0,[936,730,441,684,358],()=>t(21968)),_N_E=e.O()}]);