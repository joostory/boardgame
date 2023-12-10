(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[151],{2601:function(e,t,n){"use strict";var r,l;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(l=n.g.process)?void 0:l.env)?n.g.process:n(8960)},9294:function(e,t,n){Promise.resolve().then(n.bind(n,9743))},9743:function(e,t,n){"use strict";let r;n.r(t),n.d(t,{default:function(){return U}});var l=n(7437),s=n(5883);let a=(0,s.cn)({key:"gameStep",default:"step1"}),i=(0,s.cn)({key:"gameOptions",default:{money:2e6,players:[{name:"참가자 1"},{name:"참가자 2"}]}});(0,s.cn)({key:"gameData",default:{players:[]}});let c=(0,s.cn)({key:"gamePlayers",default:[]});var o=n(2265);function u(e){let{label:t,children:n}=e;return(0,l.jsxs)("div",{className:"px-0 py-6 grid grid-cols-3 gap-4 text-sm",children:[(0,l.jsx)("dt",{className:"flex justify-center items-center",children:t}),(0,l.jsx)("dd",{className:"col-span-2 text-start",children:n})]})}function d(e){let{children:t,onSubmit:n}=e;return(0,l.jsx)("form",{className:"mt-6 border-t border-gray-900",onSubmit:n,children:(0,l.jsx)("dl",{className:"divide-y divide-gray-900",children:t})})}let m=o.forwardRef(function({title:e,titleId:t,...n},r){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:r,"aria-labelledby":t},n),e?o.createElement("title",{id:t},e):null,o.createElement("path",{fillRule:"evenodd",d:"M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z",clipRule:"evenodd"}))}),f=o.forwardRef(function({title:e,titleId:t,...n},r){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:r,"aria-labelledby":t},n),e?o.createElement("title",{id:t},e):null,o.createElement("path",{fillRule:"evenodd",d:"M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z",clipRule:"evenodd"}))});function h(){let[e,t]=(0,s.FV)(i);return(0,l.jsxs)("div",{className:"text-start grid gap-4",children:[(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsxs)("span",{children:[e.players.length," 명"]}),(0,l.jsxs)("button",{type:"button",className:"btn btn-xs ml-1 btn-primary",onClick:function(){t({...e,players:[...e.players,{name:"참여자 ".concat(e.players.length+1)}]})},children:[(0,l.jsx)(m,{className:"w-5 h-5"})," 추가"]})]}),e.players.map((n,r)=>(0,l.jsxs)("div",{className:"join",children:[(0,l.jsx)("input",{className:"input input-bordered input-sm join-item w-full",value:n.name,onChange:n=>(function(n,r){let l=[...e.players];l.splice(n,1,{name:r}),t({...e,players:l})})(r,n.target.value)}),(0,l.jsx)("button",{type:"button",className:"btn btn-sm btn-error ml-1 join-item",onClick:()=>(function(n){let r=[...e.players];r.splice(n,1),t({...e,players:r})})(r),children:(0,l.jsx)(f,{className:"w-5 h-5"})})]},r))]})}function p(){let[e,t]=(0,s.FV)(i);return(0,l.jsxs)("div",{className:"join",children:[(0,l.jsx)("input",{className:"input input-bordered join-item w-full",type:"number",value:e.money,onChange:n=>{t({...e,money:parseInt(n.target.value)})}}),(0,l.jsx)("div",{className:"join-item flex justify-center items-center w-14 bg-base-300",children:"원"})]})}let x=o.forwardRef(function({title:e,titleId:t,...n},r){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:r,"aria-labelledby":t},n),e?o.createElement("title",{id:t},e):null,o.createElement("path",{fillRule:"evenodd",d:"M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z",clipRule:"evenodd"}),o.createElement("path",{d:"M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"}))});function j(e){let{onFinish:t}=e,[n,r]=(0,s.FV)(a);return(0,l.jsxs)(d,{onSubmit:function(e){e.preventDefault(),r("step2"),t()},children:[(0,l.jsx)(u,{label:"시작금액",children:(0,l.jsx)(p,{})}),(0,l.jsx)(u,{label:"참여자",children:(0,l.jsx)(h,{})}),(0,l.jsx)(u,{children:(0,l.jsxs)("button",{type:"submit",className:"btn btn-primary w-full",children:[(0,l.jsx)(x,{className:"h-6 w-6"})," 시작하기"]})})]})}function v(e){let{open:t,onClose:n,children:r,title:s,subTitle:a}=e,i=(0,o.useMemo)(()=>t?{opacity:1,pointerEvents:"auto"}:{},[t]);return(0,l.jsxs)("dialog",{className:"modal",style:i,children:[(0,l.jsx)("div",{className:"fixed top-0 bottom-0 left-0 right-0 backdrop-blur",onClick:n}),(0,l.jsxs)("div",{className:"modal-box",children:[s&&(0,l.jsxs)("div",{className:"px-4 sm:px-0",children:[(0,l.jsx)("h3",{className:"leading-7",children:s}),a&&(0,l.jsx)("p",{className:"mt-1 leading-6 text-sm text-gray-500",children:a})]}),r]})]})}function b(){let[e,t]=(0,o.useState)(!1);return(0,l.jsx)("div",{className:"hero",children:(0,l.jsx)("div",{className:"hero-content",children:(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("img",{src:"/modoo.png",className:"w-full"}),(0,l.jsx)("h1",{className:"text-2xl",children:"모두의 마블 점수 계산기"}),(0,l.jsxs)("div",{className:"mt-10",children:[(0,l.jsxs)("button",{className:"btn btn-primary btn-wide",onClick:()=>t(!0),children:[(0,l.jsx)(x,{className:"h-6 w-6"})," 시작하기"]}),(0,l.jsx)(v,{title:"새로운 게임 시작하기",subTitle:"새로운 게임을 시작합니다. 시작 옵션을 정해주세요.",open:e,onClose:()=>t(!1),children:(0,l.jsx)(j,{onFinish:()=>t(!1)})})]})]})})})}let y=o.forwardRef(function({title:e,titleId:t,...n},r){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:r,"aria-labelledby":t},n),e?o.createElement("title",{id:t},e):null,o.createElement("path",{fillRule:"evenodd",d:"M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z",clipRule:"evenodd"}))}),g=o.forwardRef(function({title:e,titleId:t,...n},r){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:r,"aria-labelledby":t},n),e?o.createElement("title",{id:t},e):null,o.createElement("path",{fillRule:"evenodd",d:"M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z",clipRule:"evenodd"}))});function w(e){let{player:t}=e,[n,r]=(0,o.useState)(!1),[a,i]=(0,o.useState)("300000"),[m,f]=(0,o.useState)("bank"),[h,p]=(0,s.FV)(c),x=(0,s._8)(e=>{let{snapshot:n}=e;return async(e,r)=>{function l(e,t,n){let r=e.findIndex(e=>e.id==t),l=h[r];e.splice(r,1,{...l,money:l.money+n})}let s=[...await n.getPromise(c)];l(s,t.id,-r),"bank"!=e&&l(s,e,r),p(s)}});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{className:"btn btn-sm btn-primary",onClick:()=>r(!0),children:(0,l.jsx)(y,{className:"w-6 h-6"})}),n&&(0,l.jsx)(v,{title:"".concat(t.name," : 돈 보내기"),open:n,onClose:()=>r(!1),children:(0,l.jsxs)(d,{onSubmit:function(e){e.preventDefault(),x(m,parseInt(a)).then(()=>{console.log("done"),r(!1)})},children:[(0,l.jsx)(u,{label:"보낼 곳",children:(0,l.jsxs)("select",{className:"select select-bordered w-full",value:m,onChange:e=>f(e.target.value),children:[(0,l.jsx)("option",{value:"bank",children:"은행"}),h.filter(e=>e.id!=t.id).map(e=>(0,l.jsx)("option",{value:e.id,children:e.name},e.id))]})}),(0,l.jsx)(u,{label:"금액",children:(0,l.jsxs)("div",{className:"join",children:[(0,l.jsx)("input",{type:"number",className:"input input-bordered join-item w-full",value:a,onChange:e=>i(e.target.value)}),(0,l.jsx)("div",{className:"join-item flex justify-center items-center w-14 bg-base-300",children:"원"})]})}),(0,l.jsx)(u,{children:(0,l.jsxs)("button",{type:"submit",className:"btn btn-primary w-full",children:[(0,l.jsx)(y,{className:"w-6 h-6"})," 보내기"]})})]})})]})}function N(e){let{player:t}=e,[n,r]=(0,o.useState)(!1),[a,i]=(0,o.useState)("300000"),m=(0,s.Zl)(c),f=(0,s._8)(e=>{let{snapshot:n}=e;return async()=>{let e=await n.getPromise(c),r=e.findIndex(e=>e.id==t.id),l=[...e];l.splice(r,1,{...e[r],money:e[r].money+parseInt(a)}),m(l)}});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{className:"btn btn-sm btn-accent",onClick:()=>r(!0),children:(0,l.jsx)(g,{className:"w-6 h-6"})}),n&&(0,l.jsx)(v,{title:"".concat(t.name," : 은행에서 돈 받기"),open:n,onClose:()=>r(!1),children:(0,l.jsxs)(d,{onSubmit:function(e){e.preventDefault(),f(),r(!1)},children:[(0,l.jsx)(u,{label:"금액",children:(0,l.jsxs)("div",{className:"join",children:[(0,l.jsx)("input",{type:"number",className:"input input-bordered join-item w-full",value:a,onChange:e=>i(e.target.value)}),(0,l.jsx)("div",{className:"join-item flex justify-center items-center w-14 bg-base-300",children:"원"})]})}),(0,l.jsx)(u,{children:(0,l.jsxs)("button",{type:"submit",className:"btn btn-primary w-full",children:[(0,l.jsx)(g,{className:"w-6 h-6"})," 받기"]})})]})})]})}let E=new Intl.NumberFormat,k="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var C={randomUUID:k};let R=new Uint8Array(16),_=[];for(let e=0;e<256;++e)_.push((e+256).toString(16).slice(1));var T=function(e,t,n){if(C.randomUUID&&!t&&!e)return C.randomUUID();e=e||{};let l=e.random||(e.rng||function(){if(!r&&!(r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(R)})();if(l[6]=15&l[6]|64,l[8]=63&l[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=l[e];return t}return function(e,t=0){return _[e[t+0]]+_[e[t+1]]+_[e[t+2]]+_[e[t+3]]+"-"+_[e[t+4]]+_[e[t+5]]+"-"+_[e[t+6]]+_[e[t+7]]+"-"+_[e[t+8]]+_[e[t+9]]+"-"+_[e[t+10]]+_[e[t+11]]+_[e[t+12]]+_[e[t+13]]+_[e[t+14]]+_[e[t+15]]}(l)};let V=o.forwardRef(function({title:e,titleId:t,...n},r){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:r,"aria-labelledby":t},n),e?o.createElement("title",{id:t},e):null,o.createElement("path",{fillRule:"evenodd",d:"M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z",clipRule:"evenodd"}))});function O(e){var t;let{player:n}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"flex min-w-0 gap-x-4 w-full",children:[(0,l.jsxs)("div",{className:"min-w-0 flex-auto grow",children:[(0,l.jsx)("p",{className:"text-xl font-semibold leading-6",children:n.name}),(0,l.jsx)("p",{className:"mt-5 truncate text-3xl leading-8",children:(t=n.money,E.format(t))})]}),(0,l.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-2",children:[(0,l.jsx)(w,{player:n}),(0,l.jsx)(N,{player:n})]})]})})}function S(){let e=(0,s.sJ)(c);return(0,l.jsx)("div",{className:"flex justify-center items-center my-20",children:(0,l.jsx)("ul",{className:"divide-y divide-gray-800 w-full max-w-[640px] px-4 py-2 rounded-xl border border-gray-800",children:e.map(e=>(0,l.jsx)("li",{className:"flex justify-between gap-x-6 py-6",children:(0,l.jsx)(O,{player:e})},e.id))})})}function F(){let[e,t]=(0,s.FV)(a),n=(0,s.sJ)(i),r=(0,s.Zl)(c);return(0,o.useEffect)(()=>{let e=n.money,t=n.players;r(t.map(t=>({id:T(),name:t.name,money:e})))},[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"hero",children:(0,l.jsx)("div",{className:"hero-content",children:(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("img",{src:"/modoo.png",className:"w-full"}),(0,l.jsx)("h1",{className:"text-2xl font-bold",children:"모두의 마블 점수 계산기"}),(0,l.jsx)("div",{className:"mt-10",children:(0,l.jsxs)("button",{className:"btn btn-warning btn-wide",onClick:()=>t("step1"),children:[(0,l.jsx)(V,{className:"h-6 w-6"})," 게임 종료"]})})]})})}),(0,l.jsx)(S,{})]})}function I(){let[e,t]=(0,s.FV)(a);return"step2"===e?(0,l.jsx)(F,{}):(0,l.jsx)(b,{})}function z(){return(0,l.jsx)(s.Wh,{children:(0,l.jsx)(I,{})})}function U(){return(0,l.jsxs)("main",{className:"min-h-screen",children:[(0,l.jsx)("div",{className:"navbar bg-base-100",children:(0,l.jsx)("a",{href:"/",className:"btn btn-ghost test-xl",children:"보드게임 도우미"})}),(0,l.jsx)(z,{})]})}},8960:function(e){!function(){var t={229:function(e){var t,n,r,l=e.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c=[],o=!1,u=-1;function d(){o&&r&&(o=!1,r.length?c=r.concat(c):u=-1,c.length&&m())}function m(){if(!o){var e=i(d);o=!0;for(var t=c.length;t;){for(r=c,c=[];++u<t;)r&&r[u].run();u=-1,t=c.length}r=null,o=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function h(){}l.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new f(e,t)),1!==c.length||o||i(m)},f.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=h,l.addListener=h,l.once=h,l.off=h,l.removeListener=h,l.removeAllListeners=h,l.emit=h,l.prependListener=h,l.prependOnceListener=h,l.listeners=function(e){return[]},l.binding=function(e){throw Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw Error("process.chdir is not supported")},l.umask=function(){return 0}}},n={};function r(e){var l=n[e];if(void 0!==l)return l.exports;var s=n[e]={exports:{}},a=!0;try{t[e](s,s.exports,r),a=!1}finally{a&&delete n[e]}return s.exports}r.ab="//";var l=r(229);e.exports=l}()},622:function(e,t,n){"use strict";var r=n(2265),l=Symbol.for("react.element"),s=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,n){var r,s={},o=null,u=null;for(r in void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,r)&&!c.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===s[r]&&(s[r]=t[r]);return{$$typeof:l,type:e,key:o,ref:u,props:s,_owner:i.current}}t.Fragment=s,t.jsx=o,t.jsxs=o},7437:function(e,t,n){"use strict";e.exports=n(622)}},function(e){e.O(0,[691,971,472,744],function(){return e(e.s=9294)}),_N_E=e.O()}]);