(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[103],{5617:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,8173,23)),Promise.resolve().then(s.bind(s,587))},587:(e,t,s)=>{"use strict";s.d(t,{default:()=>tm});var a=s(5155),r=s(4928);function n(e){let{label:t,children:s}=e;return(0,a.jsxs)("div",{className:"px-0 py-6 grid grid-cols-3 gap-4 text-sm",children:[(0,a.jsx)("dt",{className:"flex justify-center items-start pt-2",children:t}),(0,a.jsx)("dd",{className:"col-span-2 text-start",children:s})]})}function l(e){let{children:t,onSubmit:s}=e;return(0,a.jsx)("form",{className:"mt-6 border-t",onSubmit:s,children:(0,a.jsx)("dl",{className:"divide-y",children:t})})}var i=s(7360),d=s(6043);function o(e){if("undefined"==typeof localStorage)return null;let t=localStorage.getItem("modooGame-".concat(e));return t?JSON.parse(t):null}function c(e,t){"undefined"!=typeof localStorage&&localStorage.setItem("modooGame-".concat(e),JSON.stringify(t))}var m=s(1416),x=s(2242),u=s(1094);let f=(0,u.tG)("modooGameOption",{money:2e6,players:[{name:"참가자 1"},{name:"참가자 2"}]}),p=(0,x.$)((e,t)=>{let s=e(j),a=e(g);s&&0>a.findIndex(e=>e.id==s.id)&&t(g,[...a,{id:s.id,started:s.started}])}),h=(0,x.$)(e=>{let t=e(j);t&&c(t.id,t)}),j=(0,u.tx)(void 0),g=(0,u.tG)("modooGames",[]),y=(0,m.eU)([]),b=(0,m.eU)([]),N=(0,m.eU)([]),v=(0,m.eU)([]);var w=s(3312),k=s(2115),C=s(1567);let R=k.forwardRef((e,t)=>{let{className:s,type:r,...n}=e;return(0,a.jsx)("input",{type:r,className:(0,C.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...n})});function S(){let[e,t]=(0,r.fp)(f);return(0,a.jsxs)("div",{className:"text-start grid gap-4",children:[(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsxs)("span",{children:[e.players.length," 명"]}),(0,a.jsxs)(w.$,{type:"button",size:"xs",onClick:function(){t({...e,players:[...e.players,{name:"참여자 ".concat(e.players.length+1)}]})},children:[(0,a.jsx)(i.A,{className:"w-4 h-4"})," 추가"]})]}),e.players.map((s,r)=>(0,a.jsxs)("div",{className:"flex items-center justify-center w-full gap-1",children:[(0,a.jsx)(R,{value:s.name,onChange:s=>(function(s,a){let r=[...e.players];r.splice(s,1,{name:a}),t({...e,players:r})})(r,s.target.value)}),(0,a.jsx)(w.$,{type:"button",size:"sm",variant:"danger",onClick:()=>(function(s){let a=[...e.players];a.splice(s,1),t({...e,players:a})})(r),children:(0,a.jsx)(d.A,{className:"w-4 h-4"})})]},r))]})}function z(e){let{onClick:t}=e;return(0,a.jsx)(w.$,{type:"button",size:"sm",onClick:t,children:"0 원"})}function A(e){let{value:t,onClick:s}=e,r=(0,k.useMemo)(()=>t>0?"+".concat(t.toLocaleString()):t.toLocaleString(),[t]),n=(0,k.useMemo)(()=>t>0?"bg-blue-400 hover:bg-blue-600":"bg-red-400 hover:bg-red-600",[t]);return(0,a.jsxs)(w.$,{type:"button",size:"sm",className:n,onClick:()=>s(t),children:[r,"원"]})}function D(e){let{value:t,onChange:s,usePreset:r=!0,preset:n=[1e5,1e4,1e3,-1e5,-1e4,-1e3]}=e,l=(0,k.useMemo)(()=>Number(t).toLocaleString(),[t]);return(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsxs)("div",{className:"flex w-full items-center",children:[(0,a.jsx)(R,{type:"text",className:"text-xl",tabIndex:-1,value:l,onChange:e=>{s(Number(e.target.value.replaceAll(",","")))}}),(0,a.jsx)("div",{className:"flex justify-center items-center w-14 bg-base-300",children:"원"})]}),r&&(0,a.jsxs)("div",{className:"flex flex-wrap gap-2 mt-4",children:[n.map(e=>(0,a.jsx)(A,{value:e,onClick:a=>s(t+e)},e)),(0,a.jsx)(z,{onClick:()=>s(0)})]})]})}function _(){let[e,t]=(0,r.fp)(f);return(0,a.jsx)(D,{value:e.money,onChange:function(s){t({...e,money:s})},usePreset:!1})}R.displayName="Input";var E=s(5052),F=s(490),I=function(e){return e[e.STARTED=0]="STARTED",e[e.ENDED=1]="ENDED",e}({});function $(e){switch(e){case"green":return"bg-green-700";case"red":return"bg-red-500";case"orange":return"bg-amber-500";case"deep-pink":return"bg-pink-600";case"purple":return"bg-purple-500";case"light-blue":return"bg-blue-400";case"blue":return"bg-blue-600";case"light-green":return"bg-green-500";case"pink":return"bg-pink-400";case"sky":return"bg-blue-300";default:return"bg-slate-600"}}function L(e,t,s){let a=e.findIndex(e=>e.id==t),r=e[a];return e.splice(a,1,{...r,money:r.money+s}),r}function P(e){return e.reduce((e,t)=>e.money>t.money?e:t)}function U(){let e=(0,r.Xr)(j),t=(0,r.md)(f);return(0,a.jsxs)(l,{onSubmit:function(s){s.preventDefault(),e({id:(0,F.Ak)(),started:new Date,option:t,players:t.players.map(e=>({id:(0,F.Ak)(),money:t.money,name:e.name})),histories:[],status:I.STARTED})},children:[(0,a.jsx)(n,{label:"시작금액",children:(0,a.jsx)(_,{})}),(0,a.jsx)(n,{label:"참여자",children:(0,a.jsx)(S,{})}),(0,a.jsx)(n,{children:(0,a.jsxs)(w.$,{type:"submit",className:"w-full",variant:"primary",size:"lg",children:[(0,a.jsx)(E.A,{className:"h-6 w-6"})," 시작하기"]})})]})}var M=s(6102),J=s(2475);function O(e){return J.c9.fromJSDate(e).toFormat("T")}var T=s(9069),V=s(3572);let q=V.bL,G=V.l9,Z=V.ZL,Y=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(V.hJ,{className:(0,C.cn)("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...r,ref:t})});Y.displayName=V.hJ.displayName;let X=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsxs)(Z,{children:[(0,a.jsx)(Y,{}),(0,a.jsx)(V.UC,{ref:t,className:(0,C.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...r})]})});X.displayName=V.UC.displayName;let B=e=>{let{className:t,...s}=e;return(0,a.jsx)("div",{className:(0,C.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...s})};B.displayName="AlertDialogFooter";let H=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(V.hE,{ref:t,className:(0,C.cn)("text-lg font-semibold",s),...r})});H.displayName=V.hE.displayName;let K=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(V.VY,{ref:t,className:(0,C.cn)("text-sm text-muted-foreground",s),...r})});K.displayName=V.VY.displayName;let Q=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(V.rc,{ref:t,className:(0,C.cn)((0,w.r)(),s),...r})});Q.displayName=V.rc.displayName;let W=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(V.ZD,{ref:t,className:(0,C.cn)((0,w.r)({variant:"outline"}),"mt-2 sm:mt-0",s),...r})});function ee(e){let{onRemove:t}=e;return(0,a.jsxs)(V.Lt,{children:[(0,a.jsx)(V.tv,{asChild:!0,children:(0,a.jsx)(w.$,{size:"sm",variant:"danger",children:(0,a.jsx)(T.A,{className:"h-4 w-4"})})}),(0,a.jsxs)(X,{children:[(0,a.jsx)(H,{children:"게임기록을 제거하시겠습니까?"}),(0,a.jsx)(K,{children:"게임기록 제거는 되돌릴 수 없습니다."}),(0,a.jsxs)(B,{children:[(0,a.jsx)(Q,{onClick:t,children:"확인"}),(0,a.jsx)(W,{children:"취소"})]})]})]})}function et(){let[e,t]=(0,r.fp)(g),s=(0,r.Xr)(j);return 0==e.length?(0,a.jsx)(a.Fragment,{}):(0,a.jsx)("div",{className:"my-5 mx-5",children:(0,a.jsx)("ul",{className:"w-full",children:e.toReversed().map(r=>{var n;return(0,a.jsx)("li",{className:"flex justify-between rounded-xl py-6 px-6 text-slate-400 transition-all shadow-lg hover:shadow-neutral-900 mb-4",children:(0,a.jsxs)("div",{className:"flex min-w-0 w-full",children:[(0,a.jsx)("div",{className:"min-w-0 flex-auto grow",children:(0,a.jsxs)("p",{className:"text-xl font-semibold leading-6",children:[(0,a.jsx)("span",{className:"mr-1 text-3xl text-yellow-600",children:(n=new Date(r.started),J.c9.fromJSDate(n).toFormat("yyyy-MM-dd"))}),(0,a.jsx)("span",{className:"text-sm mr-1 text-yellow-700",children:O(new Date(r.started))}),(0,a.jsx)("span",{className:"text-md",children:"에 시작한 게임"})]})}),(0,a.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-2",children:[(0,a.jsx)(w.$,{size:"sm",className:"text-xs",variant:"secondary",onClick:()=>{s(o(r.id))},children:"게임보기"}),(0,a.jsx)(ee,{onRemove:()=>{var s;t([...e].filter(e=>e.id!=r.id)),s=r.id,"undefined"!=typeof localStorage&&localStorage.removeItem("modooGame-".concat(s))}})]})]})},r.id)})})})}W.displayName=V.ZD.displayName;var es=s(6217),ea=s(7365);let er=es.bL,en=es.l9,el=es.ZL;es.bm;let ei=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(es.hJ,{ref:t,className:(0,C.cn)("fixed inset-0 z-50 bg-black/80 backdrop-blur-xs  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...r})});ei.displayName=es.hJ.displayName;let ed=k.forwardRef((e,t)=>{let{className:s,children:r,...n}=e;return(0,a.jsxs)(el,{children:[(0,a.jsx)(ei,{}),(0,a.jsxs)(es.UC,{ref:t,className:(0,C.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...n,children:[r,(0,a.jsxs)(es.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,a.jsx)(ea.MKb,{className:"h-4 w-4"}),(0,a.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});ed.displayName=es.UC.displayName;let eo=e=>{let{className:t,...s}=e;return(0,a.jsx)("div",{className:(0,C.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...s})};eo.displayName="DialogHeader";let ec=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(es.hE,{ref:t,className:(0,C.cn)("text-lg font-semibold leading-none tracking-tight",s),...r})});ec.displayName=es.hE.displayName;let em=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(es.VY,{ref:t,className:(0,C.cn)("text-sm text-muted-foreground",s),...r})});em.displayName=es.VY.displayName;var ex=s(4471);let eu=ex.bL,ef=ex.l9;ex.YJ,ex.ZL,ex.Pb,ex.z6,k.forwardRef((e,t)=>{let{className:s,inset:r,children:n,...l}=e;return(0,a.jsxs)(ex.ZP,{ref:t,className:(0,C.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent",r&&"pl-8",s),...l,children:[n,(0,a.jsx)(ea.vKP,{className:"ml-auto h-4 w-4"})]})}).displayName=ex.ZP.displayName,k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(ex.G5,{ref:t,className:(0,C.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...r})}).displayName=ex.G5.displayName;let ep=k.forwardRef((e,t)=>{let{className:s,sideOffset:r=4,...n}=e;return(0,a.jsx)(ex.ZL,{children:(0,a.jsx)(ex.UC,{ref:t,sideOffset:r,className:(0,C.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...n})})});ep.displayName=ex.UC.displayName;let eh=k.forwardRef((e,t)=>{let{className:s,inset:r,...n}=e;return(0,a.jsx)(ex.q7,{ref:t,className:(0,C.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",r&&"pl-8",s),...n})});function ej(){let[e,t]=(0,k.useState)(!1);return(0,a.jsxs)(er,{open:e,onOpenChange:t,children:[(0,a.jsx)(en,{asChild:!0,children:(0,a.jsxs)(w.$,{size:"xl",variant:"primary",children:[(0,a.jsx)(E.A,{className:"h-6 w-6"})," 새로운 게임 시작하기"]})}),(0,a.jsxs)(ed,{children:[(0,a.jsxs)(eo,{children:[(0,a.jsx)(ec,{children:"새로운 게임 시작하기"}),(0,a.jsx)(em,{children:"새로운 게임을 시작합니다. 시작 옵션을 정해주세요."})]}),(0,a.jsx)(U,{})]})]})}function eg(){let e=(0,k.useRef)(null),[t,s]=(0,r.fp)(g),[n,l]=(0,r.fp)(f);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(eu,{children:[(0,a.jsx)(ef,{asChild:!0,children:(0,a.jsx)(w.$,{variant:"outline",size:"xl",className:"px-1",children:(0,a.jsx)(M.A,{className:"w-6 h-full"})})}),(0,a.jsxs)(ep,{children:[(0,a.jsx)(eh,{onClick:function(){!function(e){let t=window.URL.createObjectURL(new Blob([e],{type:"application/json"})),s=document.createElement("a");s.href=t,s.setAttribute("download","modoo-gamedata.json"),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(t)}(JSON.stringify({list:t,option:n,games:t.map(e=>o(e.id))}))},children:"내보내기"}),(0,a.jsx)(eh,{onClick:()=>{var t;return null===(t=e.current)||void 0===t?void 0:t.click()},children:"가져오기"})]})]}),(0,a.jsx)("div",{className:"fixed top-[-100px]",children:(0,a.jsx)(R,{type:"file",ref:e,onChange:function(e){if(e.preventDefault(),!e.target.files||0==e.target.files.length||!confirm("게임데이터 가져오기를 하면 이전데이터는 모두 삭제되고 가져온 데이터로 대체됩니다. 계속하시겠습니까?"))return;let t=e.target.files[0],a=new FileReader;a.onloadend=()=>{let e=JSON.parse(a.result);l(e.option),s(e.list),e.games.forEach(e=>{c(e.id,e)})},a.readAsText(t),e.target.value=""}})})]})}function ey(){return(0,a.jsxs)("div",{className:"max-w-[640px] mx-auto pb-20",children:[(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"px-10",children:(0,a.jsx)("img",{src:"/modoo/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,a.jsx)("h1",{className:"text-2xl",children:"모두의 마블 점수 계산기"}),(0,a.jsxs)("div",{className:"mt-10 flex justify-center gap-1",children:[(0,a.jsx)(ej,{}),(0,a.jsx)(eg,{})]})]}),(0,a.jsx)(et,{})]})}eh.displayName=ex.q7.displayName,k.forwardRef((e,t)=>{let{className:s,children:r,checked:n,...l}=e;return(0,a.jsxs)(ex.H_,{ref:t,className:(0,C.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",s),checked:n,...l,children:[(0,a.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,a.jsx)(ex.VF,{children:(0,a.jsx)(ea.Srz,{className:"h-4 w-4"})})}),r]})}).displayName=ex.H_.displayName,k.forwardRef((e,t)=>{let{className:s,children:r,...n}=e;return(0,a.jsxs)(ex.hN,{ref:t,className:(0,C.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",s),...n,children:[(0,a.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,a.jsx)(ex.VF,{children:(0,a.jsx)(ea.RiX,{className:"h-4 w-4 fill-current"})})}),r]})}).displayName=ex.hN.displayName,k.forwardRef((e,t)=>{let{className:s,inset:r,...n}=e;return(0,a.jsx)(ex.JU,{ref:t,className:(0,C.cn)("px-2 py-1.5 text-sm font-semibold",r&&"pl-8",s),...n})}).displayName=ex.JU.displayName,k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(ex.wv,{ref:t,className:(0,C.cn)("-mx-1 my-1 h-px bg-muted",s),...r})}).displayName=ex.wv.displayName;var eb=s(7543);function eN(e){let{children:t}=e;return(0,a.jsx)("div",{className:"my-10 mx-5",children:(0,a.jsx)("ul",{className:"px-4 w-full flex flex-col",children:t})})}function ev(e){let{title:t,children:s}=e;return(0,a.jsxs)("li",{className:"grid justify-center items-center shrink-0",style:{fontSize:12,gridTemplateRows:"10px 20px 10px 1fr",gridTemplateColumns:"20px 1fr"},children:[(0,a.jsx)("hr",{style:{height:10,width:"0.25rem"},className:"col-start-1 row-start-1 justify-self-center bg-black opacity-80"}),(0,a.jsx)("div",{className:"col-start-2 row-start-2 p-1",children:t}),(0,a.jsx)("div",{className:"col-start-1 row-start-2",children:(0,a.jsx)(eb.A,{className:"h-5 w-5"})}),(0,a.jsx)("div",{className:"col-start-2 row-start-4 p-1",children:s}),(0,a.jsx)("hr",{style:{height:"100%",width:"0.25rem"},className:"col-start-1 row-start-3 row-end-5 justify-self-center bg-black opacity-80"})]})}let ew=new Intl.NumberFormat;function ek(e){return ew.format(e)}var eC=s(1637);function eR(e){let{amount:t}=e;return(0,a.jsx)("b",{className:t>0?"text-blue-400":"text-red-400",children:ek(t)})}function eS(e){let{history:t}=e,[s,n]=(0,r.fp)(j);return(0,a.jsxs)(q,{children:[(0,a.jsx)(G,{asChild:!0,children:(0,a.jsx)(eC.A,{className:"h-4 w-4 ml-1 cursor-pointer text-foreground/60 hover:text-primary"})}),(0,a.jsxs)(X,{children:[(0,a.jsx)(H,{children:"기록을 되돌리시겠습니까?"}),(0,a.jsxs)(B,{children:[(0,a.jsx)(Q,{onClick:function(){if(!s)return;let e=[...s.players];"bank"!=t.toId&&L(e,t.toId,-t.amount),"bank"!=t.fromId&&L(e,t.fromId,t.amount);let a=[...s.histories];a.shift();let r=P(e);n({...s,players:e,histories:a,topPlayerId:r.id})},children:"확인"}),(0,a.jsx)(W,{children:"취소"})]})]})]})}function ez(){let e=(0,r.md)(j);return e?(0,a.jsx)(eN,{children:e.histories.map((t,s)=>(0,a.jsx)(ev,{title:O(new Date(t.time)),children:(0,a.jsxs)("div",{className:"flex gap-1",children:[(0,a.jsxs)("span",{children:[t.fromName," -> ",t.toName," :"]}),(0,a.jsx)(eR,{amount:t.amount}),e.status!=I.ENDED&&0==s&&(0,a.jsx)(eS,{history:t})]})},s))}):(0,a.jsx)(a.Fragment,{})}var eA=s(1207),eD=s(7018),e_=s(3422),eE=s(520);let eF=eE.bL;eE.YJ;let eI=eE.WT,e$=k.forwardRef((e,t)=>{let{className:s,children:r,...n}=e;return(0,a.jsxs)(eE.l9,{ref:t,className:(0,C.cn)("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",s),...n,children:[r,(0,a.jsx)(eE.In,{asChild:!0,children:(0,a.jsx)(ea.TBE,{className:"h-4 w-4 opacity-50"})})]})});e$.displayName=eE.l9.displayName;let eL=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(eE.PP,{ref:t,className:(0,C.cn)("flex cursor-default items-center justify-center py-1",s),...r,children:(0,a.jsx)(ea.Mtm,{})})});eL.displayName=eE.PP.displayName;let eP=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(eE.wn,{ref:t,className:(0,C.cn)("flex cursor-default items-center justify-center py-1",s),...r,children:(0,a.jsx)(ea.D3D,{})})});eP.displayName=eE.wn.displayName;let eU=k.forwardRef((e,t)=>{let{className:s,children:r,position:n="popper",...l}=e;return(0,a.jsx)(eE.ZL,{children:(0,a.jsxs)(eE.UC,{ref:t,className:(0,C.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===n&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",s),position:n,...l,children:[(0,a.jsx)(eL,{}),(0,a.jsx)(eE.LM,{className:(0,C.cn)("p-1","popper"===n&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:r}),(0,a.jsx)(eP,{})]})})});eU.displayName=eE.UC.displayName,k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(eE.JU,{ref:t,className:(0,C.cn)("px-2 py-1.5 text-sm font-semibold",s),...r})}).displayName=eE.JU.displayName;let eM=k.forwardRef((e,t)=>{let{className:s,children:r,...n}=e;return(0,a.jsxs)(eE.q7,{ref:t,className:(0,C.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",s),...n,children:[(0,a.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,a.jsx)(eE.VF,{children:(0,a.jsx)(ea.Srz,{className:"h-4 w-4"})})}),(0,a.jsx)(eE.p4,{children:r})]})});function eJ(e){let{remain:t}=e;return(0,a.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,a.jsx)("div",{className:"text-center",children:"금액"}),t&&(0,a.jsxs)("div",{className:"text-center text-foreground/60",children:["(",Number(t).toLocaleString()," 원)"]})]})}function eO(e){let{player:t}=e,[s,i]=(0,k.useState)(!1),[d,o]=(0,k.useState)(3e5),[c,m]=(0,k.useState)("bank"),x=(0,r.md)(j),u=d>0,f=(0,e_.yF)((0,k.useCallback)((e,s,a,r)=>{let n;let l=e(j);if(!l){console.log("NO currentGame");return}let i=[...l.players];L(i,t.id,-r),n="bank"!=a?L(i,a,r).name:"은행";let d=[{fromId:t.id,fromName:t.name,toId:a,toName:n,amount:r,time:new Date},...l.histories],o=P(i);s(j,{...l,players:i,histories:d,topPlayerId:o.id})},[t]));return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(er,{open:s,onOpenChange:i,children:[(0,a.jsx)(es.zM,{children:(0,a.jsx)(eA.A,{className:"w-8 h-8 p-1 text-blue-400 hover:text-blue-600"})}),(0,a.jsxs)(ed,{children:[(0,a.jsx)(eo,{children:(0,a.jsxs)(es.L3,{children:[t.name," : 돈 보내기"]})}),(0,a.jsxs)(l,{onSubmit:function(e){e.preventDefault(),f(c,d),i(!1)},children:[(0,a.jsx)(n,{label:"보낼 곳",children:(0,a.jsxs)(eF,{value:c,onValueChange:e=>m(e),children:[(0,a.jsx)(e$,{children:(0,a.jsx)(eE.yv,{placeholder:"보낼 곳"})}),(0,a.jsxs)(eU,{children:[(0,a.jsx)(eM,{value:"bank",children:"은행"}),x&&x.players.filter(e=>e.id!=t.id).map(e=>(0,a.jsx)(eM,{value:e.id,children:e.name},e.id))]})]})}),(0,a.jsx)(n,{label:(0,a.jsx)(eJ,{remain:t.money-d}),children:(0,a.jsx)(D,{value:d,onChange:o})}),(0,a.jsx)(n,{children:(0,a.jsxs)(w.$,{type:"submit",className:"w-full",size:"lg",variant:"primary",disabled:!u,children:[(0,a.jsx)(eA.A,{className:"w-6 h-6"})," 보내기"]})})]})]})]})})}function eT(e){let{player:t}=e,[s,r]=(0,k.useState)(!1),[i,d]=(0,k.useState)(3e5),o=i>0,c=(0,e_.yF)((0,k.useCallback)((e,s)=>{let a=e(j);if(!a){console.log("NO currentGame");return}let r=[...a.players];L(r,t.id,i);let n=[{fromId:"bank",fromName:"은행",toId:t.id,toName:t.name,amount:i,time:new Date},...a.histories],l=P(r);s(j,{...a,players:r,histories:n,topPlayerId:l.id})},[t,i]));return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(er,{open:s,onOpenChange:r,children:[(0,a.jsx)(es.zM,{children:(0,a.jsx)(eD.A,{className:"w-8 h-8 p-1 text-red-400 hover:text-red-600"})}),(0,a.jsxs)(ed,{children:[(0,a.jsx)(eo,{children:(0,a.jsxs)(es.L3,{children:[t.name," : 은행에서 돈 받기"]})}),(0,a.jsxs)(l,{onSubmit:function(e){e.preventDefault(),c(),r(!1)},children:[(0,a.jsx)(n,{label:(0,a.jsx)(eJ,{remain:t.money+i}),children:(0,a.jsx)(D,{value:i,onChange:d})}),(0,a.jsx)(n,{children:(0,a.jsxs)(w.$,{type:"submit",className:"w-full",variant:"primary",size:"lg",disabled:!o,children:[(0,a.jsx)(eD.A,{className:"w-6 h-6"})," 받기"]})})]})]})]})})}eM.displayName=eE.q7.displayName,k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(eE.wv,{ref:t,className:(0,C.cn)("-mx-1 my-1 h-px bg-muted",s),...r})}).displayName=eE.wv.displayName;var eV=s(2428);function eq(e){let{player:t}=e,s=(0,r.md)(j);return s?(0,a.jsxs)("div",{className:"flex min-w-0 gap-x-4 w-full",children:[(0,a.jsxs)("div",{className:"min-w-0 flex-auto grow",children:[(0,a.jsxs)("div",{className:"flex w-full gap-x-2",children:[s.topPlayerId==t.id&&(0,a.jsx)(eV.A,{className:"h-5 w-5 text-red-400"}),(0,a.jsx)("p",{className:"text-xl font-semibold leading-6",children:t.name})]}),(0,a.jsx)("p",{className:"mt-2 truncate text-3xl leading-8 text-yellow-100",children:ek(t.money)})]}),s.status!=I.ENDED&&(0,a.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-1",children:[(0,a.jsx)(eO,{player:t}),(0,a.jsx)(eT,{player:t})]})]}):(0,a.jsx)(a.Fragment,{})}function eG(){let e=(0,r.md)(j);return e?(0,a.jsx)("div",{className:"flex justify-center items-center my-5 mx-5",children:(0,a.jsx)("ul",{className:"divide-y w-full px-4 py-2 rounded-xl border",children:e.players.map(e=>(0,a.jsx)("li",{className:"flex justify-between gap-x-6 py-6",children:(0,a.jsx)(eq,{player:e})},e.id))})}):(0,a.jsx)(a.Fragment,{})}var eZ=s(1027);let eY=(0,eZ.F)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive"}},defaultVariants:{variant:"default"}}),eX=k.forwardRef((e,t)=>{let{className:s,variant:r,...n}=e;return(0,a.jsx)("div",{ref:t,role:"alert",className:(0,C.cn)(eY({variant:r}),s),...n})});eX.displayName="Alert";let eB=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("h5",{ref:t,className:(0,C.cn)("mb-1 font-medium leading-none tracking-tight",s),...r})});eB.displayName="AlertTitle";let eH=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("div",{ref:t,className:(0,C.cn)("text-sm [&_p]:leading-relaxed",s),...r})});eH.displayName="AlertDescription";let eK=k.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("textarea",{className:(0,C.cn)("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...r})});eK.displayName="Textarea";var eQ=s(2466),eW=s(141);function e0(){let[e,t]=(0,k.useState)(!1),s=(0,e_.AY)(j),i=(0,r.md)(j),[d,o]=(0,k.useState)(null==i?void 0:i.topPlayerId),[m,x]=(0,k.useState)("");return i?(0,a.jsxs)(er,{open:e,onOpenChange:function(e){t(e),o(null==i?void 0:i.topPlayerId)},children:[(0,a.jsx)(en,{asChild:!0,children:(0,a.jsxs)(w.$,{type:"button",size:"xl",variant:"primary",children:[(0,a.jsx)(eQ.A,{className:"h-6 w-6"})," 게임 종료"]})}),(0,a.jsxs)(ed,{children:[(0,a.jsx)(eo,{children:(0,a.jsx)(ec,{children:"게임을 종료하시겠습니까?"})}),(0,a.jsxs)(l,{onSubmit:function(e){e.preventDefault(),t(!1),c(i.id,{...i,status:I.ENDED,topPlayerId:d,message:m}),s()},children:[(0,a.jsx)(n,{label:"승리",children:(0,a.jsxs)(eF,{value:d,onValueChange:e=>o(e),children:[(0,a.jsx)(e$,{children:(0,a.jsx)(eI,{placeholder:"승리한 참여자"})}),(0,a.jsx)(eU,{children:i&&i.players.map(e=>(0,a.jsx)(eM,{value:e.id,children:e.name},e.id))})]})}),(0,a.jsx)(n,{label:"설명",children:(0,a.jsx)(eK,{placeholder:"게임에 대해서 설명을 남겨보세요.",value:m,onChange:e=>x(e.target.value)})}),(0,a.jsx)(n,{children:(0,a.jsxs)(w.$,{type:"submit",size:"xl",variant:"primary",className:"w-full",disabled:void 0==d,children:[(0,a.jsx)(eQ.A,{className:"h-6 w-6"})," 게임 종료"]})})]})]})]}):(0,a.jsx)(a.Fragment,{})}function e1(){let e=(0,e_.AY)(j),t=(0,r.md)(j);return t&&t.status==I.ENDED?(0,a.jsxs)(w.$,{type:"button",size:"xl",variant:"primary",onClick:e,children:[(0,a.jsx)(eW.A,{className:"h-6 w-6"})," 처음으로"]}):(0,a.jsx)(e0,{})}function e5(){let e=(0,r.md)(j);return e&&e.status==I.ENDED&&e.message?(0,a.jsxs)(eX,{children:[(0,a.jsx)(eV.A,{className:"h-4 w-4 text-red-400"}),(0,a.jsx)(eB,{children:"종료된 게임입니다"}),(0,a.jsx)(eH,{children:e.message})]}):(0,a.jsx)(a.Fragment,{})}function e2(){return(0,a.jsxs)("div",{className:"mx-5 mb-10",children:[(0,a.jsxs)("div",{className:"flex flex-col items-center",children:[(0,a.jsx)("div",{className:"px-10",children:(0,a.jsx)("img",{src:"/modoo/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,a.jsx)("h1",{className:"text-2xl mt-2",children:"모두의 마블 점수 계산기"})]}),(0,a.jsx)("div",{className:"my-5 flex flex-col items-center",children:(0,a.jsx)(e1,{})}),(0,a.jsx)(e5,{})]})}let e4=(0,eZ.F)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function e6(e){let{className:t,variant:s,...r}=e;return(0,a.jsx)("div",{className:(0,C.cn)(e4({variant:s}),t),...r})}function e3(e,t){return e+t}var e9=s(2651);function e8(e){let{land:t,onSelect:s}=e;return(0,a.jsx)(w.$,{variant:"outline",className:(0,C.cn)("py-1 px-2 shadow-xs rounded text-slate-900",$(t.color)),onClick:()=>s(t),children:t.name})}function e7(e){let{label:t,children:s}=e;return(0,a.jsxs)("div",{className:"grid grid-cols-4 py-1",children:[(0,a.jsx)("div",{className:"pr-4 text-right",children:t}),(0,a.jsx)("div",{className:"col-span-3",children:s})]})}function te(e){let{land:t}=e,s=(0,r.md)(N),[n,l]=(0,r.fp)(v),i=(0,k.useMemo)(()=>s.filter(e=>e.landid==t.id),[t,s]),d=(0,k.useMemo)(()=>{let e=n.filter(e=>e.landid==t.id),s=e.map(e=>e.tollfee).reduce(e3,0);return"city"!=t.type&&(s=e.length>0?e.map(e=>e.tollfee).sort((e,t)=>t-e)[0]:0),{constcost:e.map(e=>e.constcost).reduce(e3,0),tollfee:s,acquisitioncost:e.map(e=>e.acquisitioncost).reduce(e3,0),sellingcost:e.map(e=>e.sellingcost).reduce(e3,0),inacquisitionable:e.findIndex(e=>!e.acquisitionable)>=0}},[t,n]),o=$(t.color);return(0,a.jsxs)("div",{className:(0,C.cn)("rounded shadow-sm bg-opacity-10",o),children:[(0,a.jsx)("div",{className:(0,C.cn)("px-4 py-2 rounded-t text-slate-900 font-bold text-lg",o),children:t.name}),(0,a.jsxs)("div",{className:"rounded-b py-4 px-4",children:[(0,a.jsx)("div",{className:"flex flex-wrap gap-2",children:i.map(e=>(0,a.jsx)(w.$,{variant:n.findIndex(t=>t.id==e.id)>=0?"primary":"outline",onClick:()=>{n.findIndex(t=>t.id==e.id)>=0?l(n.filter(t=>t.id!=e.id)):l([...n,e])},children:e.name},e.id))}),(0,a.jsxs)("div",{className:"my-3",children:[(0,a.jsx)(e7,{label:"건설비용",children:ek(d.constcost)}),(0,a.jsx)(e7,{label:"통행료",children:ek(d.tollfee)}),(0,a.jsx)(e7,{label:"인수비용",children:(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)("span",{children:ek(d.acquisitioncost)}),d.inacquisitionable&&(0,a.jsx)(e6,{variant:"destructive",children:"인수불가"})]})}),(0,a.jsx)(e7,{label:"매각비용",children:ek(d.sellingcost)})]})]})]})}function tt(){let[e,t]=(0,k.useState)(!1),[s,n]=(0,r.fp)(b),l=(0,r.Xr)(N),[i,d]=(0,k.useState)();async function o(){let e=await e9.A.get("/modoo/api/land"),t=await e9.A.get("/modoo/api/building");n(e.data),l(t.data)}return((0,k.useEffect)(()=>{0==s.length&&(t(!0),o().finally(()=>t(!1)))},[]),e)?(0,a.jsx)("div",{className:"flex justify-center items-center py-20",children:(0,a.jsx)(ea.jfu,{className:"animate-spin h-6 w-6 opacity-70"})}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"flex flex-wrap gap-2",children:s.map(e=>(0,a.jsx)(e8,{land:e,onSelect:d},e.id))}),i&&(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsx)(te,{land:i})})]})}function ts(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(er,{children:[(0,a.jsx)(en,{children:(0,a.jsx)(w.$,{size:"xs",variant:"secondary",children:"지역카드"})}),(0,a.jsxs)(ed,{children:[(0,a.jsxs)(eo,{children:[(0,a.jsx)(ec,{children:"지역카드"}),(0,a.jsx)(em,{})]}),(0,a.jsx)(tt,{})]})]})})}function ta(e){let{command:t}=e,[s,r]=(0,k.useState)("hflip"),n=(0,k.useMemo)(()=>{switch(t.type){case"gold":return"bg-linear-to-r from-amber-200 to-yellow-500";case"silver":return"bg-linear-to-r from-slate-300 to-slate-500";case"bronze":return"bg-linear-to-r from-red-500 to-orange-500"}},[t]);return(0,k.useEffect)(()=>{r("hflip"),setTimeout(()=>{r("")},2e3)},[t]),(0,a.jsx)("div",{className:"flex justify-center py-5",children:(0,a.jsxs)("div",{className:(0,C.cn)("rounded-md w-[240px] h-[320px] shadow-lg p-4 relative",n,s),children:[(0,a.jsx)("div",{className:"curved-rectangle absolute top-5 w-[208px] py-3 bg-white bg-opacity-30 text-center rounded shadow-sm",children:(0,a.jsx)("b",{className:"text-lg text-black",children:t.name})}),(0,a.jsx)("img",{src:"/modoo/chance_background.png",className:"opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20"}),(0,a.jsx)("div",{className:"rounded-md py-2 px-5 bg-slate-100 flex justify-center text-center items-center w-[208px] h-[100px] absolute bottom-5 bg-opacity-70 shadow-sm",children:(0,a.jsx)("span",{className:"text-sm text-slate-900",children:t.description})}),t.storable&&(0,a.jsx)(e6,{className:"absolute bottom-3 right-3",children:"보관가능"})]})})}function tr(){let[e,t]=(0,r.fp)(y),[s,n]=(0,k.useState)(),[l,i]=(0,k.useState)(!1);function d(){let t=Math.floor(Math.random()*e.length);n(e[t])}return((0,k.useEffect)(()=>{if(e&&e.length>0){d();return}i(!0),e9.A.get("/modoo/api/command").then(e=>e.data).then(e=>t(e)).finally(()=>i(!1))},[e]),l)?(0,a.jsx)("div",{className:"flex justify-center py-20",children:(0,a.jsx)(ea.jfu,{className:"animate-spin w-6 h-6 opacity-70"})}):(0,a.jsxs)(a.Fragment,{children:[s&&(0,a.jsx)(ta,{command:s}),(0,a.jsxs)(w.$,{variant:"secondary",onClick:()=>d(),children:[(0,a.jsx)(ea.NAP,{})," 다시뽑기"]})]})}function tn(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(er,{children:[(0,a.jsx)(en,{children:(0,a.jsx)(w.$,{variant:"secondary",size:"xs",children:"찬스카드"})}),(0,a.jsxs)(ed,{"aria-description":"","aria-describedby":"",children:[(0,a.jsxs)(eo,{children:[(0,a.jsx)(ec,{children:"찬스카드"}),(0,a.jsx)(em,{})]}),(0,a.jsx)(tr,{})]})]})})}function tl(e){let{value:t}=e,[s,r]=(0,k.useState)("show-".concat(t));return(0,k.useEffect)(()=>{[...Array(6)].forEach((e,t)=>{setTimeout(()=>{r("show-".concat(Math.round(100*Math.random())%6+1))},300*t)})},[t]),(0,a.jsx)("div",{className:"scene mx-auto my-10",children:(0,a.jsxs)("div",{className:(0,C.cn)("cube",s),children:[(0,a.jsx)("div",{className:"cube__face cube__face--front",children:"1"}),(0,a.jsx)("div",{className:"cube__face cube__face--back",children:"2"}),(0,a.jsx)("div",{className:"cube__face cube__face--right",children:"3"}),(0,a.jsx)("div",{className:"cube__face cube__face--left",children:"4"}),(0,a.jsx)("div",{className:"cube__face cube__face--top",children:"5"}),(0,a.jsx)("div",{className:"cube__face cube__face--bottom",children:"6"})]})})}function ti(){let[e,t]=(0,k.useState)(1);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)(tl,{value:e}),(0,a.jsx)(tl,{value:e})]}),(0,a.jsxs)(w.$,{variant:"secondary",onClick:function(){t(Math.random())},children:[(0,a.jsx)(ea.NAP,{})," 다시 던지기"]})]})}function td(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(er,{children:[(0,a.jsx)(en,{children:(0,a.jsx)(w.$,{variant:"secondary",size:"xs",children:"주사위"})}),(0,a.jsxs)(ed,{"aria-description":"","aria-describedby":"",children:[(0,a.jsxs)(eo,{children:[(0,a.jsx)(ec,{children:"주사위 던지기"}),(0,a.jsx)(em,{})]}),(0,a.jsx)(ti,{})]})]})})}function to(){return(0,a.jsxs)("div",{className:"max-w-[640px] md:max-w-full mx-auto pb-20",children:[(0,a.jsx)(e2,{}),(0,a.jsxs)("div",{className:"flex justify-center gap-2 my-5",children:[(0,a.jsx)(ts,{}),(0,a.jsx)(tn,{}),(0,a.jsx)(td,{})]}),(0,a.jsxs)("div",{className:"grid md:grid-cols-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(eG,{}),(0,a.jsx)(ez,{})]}),(0,a.jsxs)("div",{className:"hidden sm:block my-5 mx-5",children:[(0,a.jsx)("div",{className:"border rounded-xl p-4",children:(0,a.jsx)(tt,{})}),(0,a.jsx)("div",{className:"border rounded-xl p-4 mt-4",children:(0,a.jsx)(ti,{})})]})]})]})}function tc(){return((0,r.fp)(h),(0,r.fp)(p),(0,r.md)(j))?(0,a.jsx)(to,{}):(0,a.jsx)(ey,{})}function tm(){return(0,a.jsx)(r.Kq,{children:(0,a.jsx)(tc,{})})}},3312:(e,t,s)=>{"use strict";s.d(t,{$:()=>o,r:()=>d});var a=s(5155),r=s(2115),n=s(2317),l=s(1027),i=s(1567);let d=(0,l.F)("inline-flex items-center gap-1 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",outline:"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",danger:"text-primary-foreground shadow-xs bg-red-500 hover:bg-red-700",primary:"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",accent:"bg-accent text-accent-foreground shadow-xs hover:bg-accent/80"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-sm px-2 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",xl:"h-12 rounded-md px-14",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),o=r.forwardRef((e,t)=>{let{className:s,variant:r,size:l,asChild:o=!1,...c}=e,m=o?n.DX:"button";return(0,a.jsx)(m,{className:(0,i.cn)(d({variant:r,size:l,className:s})),ref:t,...c})});o.displayName="Button"},1567:(e,t,s)=>{"use strict";s.d(t,{cn:()=>n});var a=s(3463),r=s(9795);function n(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,r.QP)((0,a.$)(t))}}},e=>{var t=t=>e(e.s=t);e.O(0,[105,173,490,591,441,517,358],()=>t(5617)),_N_E=e.O()}]);