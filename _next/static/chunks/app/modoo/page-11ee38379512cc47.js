(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[151],{9294:function(e,s,n){Promise.resolve().then(n.bind(n,7640))},7640:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return J}});var t=n(7437),l=n(5883);let a=(0,l.cn)({key:"gameStep",default:"step1"}),i=(0,l.cn)({key:"gameOptions",default:{money:2e6,players:[{name:"참가자 1"},{name:"참가자 2"}]}});(0,l.cn)({key:"gameData",default:{players:[]}});let r=(0,l.cn)({key:"gamePlayers",default:[]}),c=(0,l.cn)({key:"gameHistories",default:[]});var m=n(2265);function d(e){let{label:s,children:n}=e;return(0,t.jsxs)("div",{className:"px-0 py-6 grid grid-cols-3 gap-4 text-sm",children:[(0,t.jsx)("dt",{className:"flex justify-center items-center",children:s}),(0,t.jsx)("dd",{className:"col-span-2 text-start",children:n})]})}function o(e){let{children:s,onSubmit:n}=e;return(0,t.jsx)("form",{className:"mt-6 border-t border-gray-900",onSubmit:n,children:(0,t.jsx)("dl",{className:"divide-y divide-gray-900",children:s})})}var x=n(5897),u=n(5594);function j(){let[e,s]=(0,l.FV)(i);return(0,t.jsxs)("div",{className:"text-start grid gap-4",children:[(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsxs)("span",{children:[e.players.length," 명"]}),(0,t.jsxs)("button",{type:"button",className:"btn btn-xs ml-1 btn-primary",onClick:function(){s({...e,players:[...e.players,{name:"참여자 ".concat(e.players.length+1)}]})},children:[(0,t.jsx)(x.Z,{className:"w-5 h-5"})," 추가"]})]}),e.players.map((n,l)=>(0,t.jsxs)("div",{className:"join",children:[(0,t.jsx)("input",{className:"input input-bordered input-sm join-item w-full",value:n.name,onChange:n=>(function(n,t){let l=[...e.players];l.splice(n,1,{name:t}),s({...e,players:l})})(l,n.target.value)}),(0,t.jsx)("button",{type:"button",className:"btn btn-sm btn-error ml-1 join-item",onClick:()=>(function(n){let t=[...e.players];t.splice(n,1),s({...e,players:t})})(l),children:(0,t.jsx)(u.Z,{className:"w-5 h-5"})})]},l))]})}function h(){let[e,s]=(0,l.FV)(i);return(0,t.jsxs)("div",{className:"join",children:[(0,t.jsx)("input",{className:"input input-bordered join-item w-full",type:"number",value:e.money,onChange:n=>{s({...e,money:parseInt(n.target.value)})}}),(0,t.jsx)("div",{className:"join-item flex justify-center items-center w-14 bg-base-300",children:"원"})]})}var p=n(7013);function f(e){let{onFinish:s}=e,[n,i]=(0,l.FV)(a);return(0,t.jsxs)(o,{onSubmit:function(e){e.preventDefault(),i("step2"),s()},children:[(0,t.jsx)(d,{label:"시작금액",children:(0,t.jsx)(h,{})}),(0,t.jsx)(d,{label:"참여자",children:(0,t.jsx)(j,{})}),(0,t.jsx)(d,{children:(0,t.jsxs)("button",{type:"submit",className:"btn btn-primary w-full",children:[(0,t.jsx)(p.Z,{className:"h-6 w-6"})," 시작하기"]})})]})}function N(e){let{open:s,onClose:n,children:l,title:a,subTitle:i}=e,r=(0,m.useMemo)(()=>s?{opacity:1,pointerEvents:"auto"}:{},[s]);return(0,t.jsxs)("dialog",{className:"modal",style:r,children:[(0,t.jsx)("div",{className:"fixed top-0 bottom-0 left-0 right-0 backdrop-blur",onClick:n}),(0,t.jsxs)("div",{className:"modal-box",children:[a&&(0,t.jsxs)("div",{className:"px-4 sm:px-0",children:[(0,t.jsx)("h3",{className:"leading-7",children:a}),i&&(0,t.jsx)("p",{className:"mt-1 leading-6 text-sm text-gray-500",children:i})]}),l]})]})}function b(){let[e,s]=(0,m.useState)(!1);return(0,t.jsx)("div",{className:"hero",children:(0,t.jsx)("div",{className:"hero-content",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:"/modoo.png",className:"w-full"}),(0,t.jsx)("h1",{className:"text-2xl",children:"모두의 마블 점수 계산기"}),(0,t.jsxs)("div",{className:"mt-10",children:[(0,t.jsxs)("button",{className:"btn btn-primary btn-wide",onClick:()=>s(!0),children:[(0,t.jsx)(p.Z,{className:"h-6 w-6"})," 시작하기"]}),(0,t.jsx)(N,{title:"새로운 게임 시작하기",subTitle:"새로운 게임을 시작합니다. 시작 옵션을 정해주세요.",open:e,onClose:()=>s(!1),children:(0,t.jsx)(f,{onFinish:()=>s(!1)})})]})]})})})}var y=n(1872),v=n(5625),g=n(7583);let w=new Intl.NumberFormat;var k=n(432);function C(){let e=(0,l.sJ)(c);return(0,t.jsx)("div",{className:"flex justify-center my-10 mx-5",children:(0,t.jsx)("ul",{className:"timeline timeline-vertical timeline-compact px-4 w-full max-w-[640px]",children:e.map((e,s)=>{var n,l;return(0,t.jsxs)("li",{style:{fontSize:12},children:[(0,t.jsx)("hr",{style:{height:10}}),(0,t.jsx)("div",{className:"timeline-start",children:(n=e.time,g.ou.fromJSDate(n).toFormat("T"))}),(0,t.jsx)("div",{className:"timeline-middle",children:(0,t.jsx)(k.Z,{className:"h-5 w-5"})}),(0,t.jsxs)("div",{className:"timeline-end ",children:[e.fromName," -> ",e.toName," : ",(0,t.jsx)("b",{className:"text-success",children:(l=e.amount,w.format(l))})]}),(0,t.jsx)("hr",{})]},s)})})})}var Z=n(5297),F=n(3953);function S(e){let{player:s}=e,[n,a]=(0,m.useState)(!1),[i,x]=(0,m.useState)("300000"),[u,j]=(0,m.useState)("bank"),[h,p]=(0,l.FV)(r),f=(0,l.Zl)(c),b=(0,l._8)(e=>{let{snapshot:n}=e;return async(e,t)=>{let l;function a(e,s,n){let t=e.findIndex(e=>e.id==s),l=h[t];return e.splice(t,1,{...l,money:l.money+n}),l}let i=[...await n.getPromise(r)];a(i,s.id,-t),l="bank"!=e?a(i,e,t).name:"은행",p(i);let m=await n.getPromise(c);f([{fromId:s.id,fromName:s.name,toId:e,toName:l,amount:t,time:new Date},...m])}});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(Z.Z,{className:"w-8 h-8 p-1 text-primary",onClick:()=>a(!0)}),n&&(0,t.jsx)(N,{title:"".concat(s.name," : 돈 보내기"),open:n,onClose:()=>a(!1),children:(0,t.jsxs)(o,{onSubmit:function(e){e.preventDefault(),b(u,parseInt(i)).then(()=>{console.log("done"),a(!1)})},children:[(0,t.jsx)(d,{label:"보낼 곳",children:(0,t.jsxs)("select",{className:"select select-bordered w-full",value:u,onChange:e=>j(e.target.value),children:[(0,t.jsx)("option",{value:"bank",children:"은행"}),h.filter(e=>e.id!=s.id).map(e=>(0,t.jsx)("option",{value:e.id,children:e.name},e.id))]})}),(0,t.jsx)(d,{label:"금액",children:(0,t.jsxs)("div",{className:"join",children:[(0,t.jsx)("input",{type:"number",className:"input input-bordered join-item w-full",value:i,onChange:e=>x(e.target.value)}),(0,t.jsx)("div",{className:"join-item flex justify-center items-center w-14 bg-base-300",children:"원"})]})}),(0,t.jsx)(d,{children:(0,t.jsxs)("button",{type:"submit",className:"btn btn-primary w-full",children:[(0,t.jsx)(Z.Z,{className:"w-6 h-6"})," 보내기"]})})]})})]})}function I(e){let{player:s}=e,[n,a]=(0,m.useState)(!1),[i,x]=(0,m.useState)("300000"),u=(0,l.Zl)(r),j=(0,l.Zl)(c),h=(0,l._8)(e=>{let{snapshot:n}=e;return async()=>{let e=await n.getPromise(r),t=e.findIndex(e=>e.id==s.id),l=e[t],a=[...e],m=parseInt(i);a.splice(t,1,{...l,money:l.money+m}),u(a);let d=await n.getPromise(c);j([{fromId:"bank",fromName:"은행",toId:s.id,toName:s.name,amount:m,time:new Date},...d])}});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(F.Z,{className:"w-8 h-8 p-1 text-accent",onClick:()=>a(!0)}),n&&(0,t.jsx)(N,{title:"".concat(s.name," : 은행에서 돈 받기"),open:n,onClose:()=>a(!1),children:(0,t.jsxs)(o,{onSubmit:function(e){e.preventDefault(),h(),a(!1)},children:[(0,t.jsx)(d,{label:"금액",children:(0,t.jsxs)("div",{className:"join",children:[(0,t.jsx)("input",{type:"number",className:"input input-bordered join-item w-full",value:i,onChange:e=>x(e.target.value)}),(0,t.jsx)("div",{className:"join-item flex justify-center items-center w-14 bg-base-300",children:"원"})]})}),(0,t.jsx)(d,{children:(0,t.jsxs)("button",{type:"submit",className:"btn btn-primary w-full",children:[(0,t.jsx)(F.Z,{className:"w-6 h-6"})," 받기"]})})]})})]})}function _(e){var s;let{player:n}=e;return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"flex min-w-0 gap-x-4 w-full",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-auto grow",children:[(0,t.jsx)("p",{className:"text-xl font-semibold leading-6",children:n.name}),(0,t.jsx)("p",{className:"mt-2 truncate text-3xl leading-8",children:(s=n.money,w.format(s))})]}),(0,t.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-1",children:[(0,t.jsx)(S,{player:n}),(0,t.jsx)(I,{player:n})]})]})})}function D(){let e=(0,l.sJ)(r);return(0,t.jsx)("div",{className:"flex justify-center items-center my-5 mx-5",children:(0,t.jsx)("ul",{className:"divide-y divide-gray-800 w-full max-w-[640px] px-4 py-2 rounded-xl border border-gray-800",children:e.map(e=>(0,t.jsx)("li",{className:"flex justify-between gap-x-6 py-6",children:(0,t.jsx)(_,{player:e})},e.id))})})}function P(){let[e,s]=(0,l.FV)(a),n=(0,l.sJ)(i),c=(0,l.Zl)(r);return(0,m.useEffect)(()=>{let e=n.money,s=n.players;c(s.map(s=>({id:(0,y.Z)(),name:s.name,money:e})))},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"hero",children:(0,t.jsx)("div",{className:"hero-content",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("img",{src:"/modoo.png",className:"w-full"}),(0,t.jsx)("h1",{className:"text-2xl font-bold",children:"모두의 마블 점수 계산기"}),(0,t.jsx)("div",{className:"mt-10",children:(0,t.jsxs)("button",{className:"btn btn-warning btn-wide",onClick:()=>s("step1"),children:[(0,t.jsx)(v.Z,{className:"h-6 w-6"})," 게임 종료"]})})]})})}),(0,t.jsx)(D,{}),(0,t.jsx)(C,{})]})}function V(){let[e,s]=(0,l.FV)(a);return"step2"===e?(0,t.jsx)(P,{}):(0,t.jsx)(b,{})}function E(){return(0,t.jsx)(l.Wh,{children:(0,t.jsx)(V,{})})}function J(){return(0,t.jsxs)("main",{className:"min-h-screen",children:[(0,t.jsx)("div",{className:"navbar bg-base-100",children:(0,t.jsx)("a",{href:"/",className:"btn btn-ghost test-xl",children:"보드게임 도우미"})}),(0,t.jsx)(E,{})]})}}},function(e){e.O(0,[691,808,971,472,744],function(){return e(e.s=9294)}),_N_E=e.O()}]);