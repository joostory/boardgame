(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[151],{8588:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,231,23)),Promise.resolve().then(s.bind(s,5089))},5089:(e,t,s)=>{"use strict";s.d(t,{default:()=>tm});var a,r=s(7437),l=s(3742);function n(e){let{label:t,children:s}=e;return(0,r.jsxs)("div",{className:"px-0 py-6 grid grid-cols-3 gap-4 text-sm",children:[(0,r.jsx)("dt",{className:"flex justify-center items-start pt-2",children:t}),(0,r.jsx)("dd",{className:"col-span-2 text-start",children:s})]})}function i(e){let{children:t,onSubmit:s}=e;return(0,r.jsx)("form",{className:"mt-6 border-t",onSubmit:s,children:(0,r.jsx)("dl",{className:"divide-y",children:t})})}var d=s(5265),o=s(1349);function c(e){if("undefined"==typeof localStorage)return null;let t=localStorage.getItem("modooGame-".concat(e));return t?JSON.parse(t):null}function m(e,t){"undefined"!=typeof localStorage&&localStorage.setItem("modooGame-".concat(e),JSON.stringify(t))}var x=s(9910),u=s(7443),f=s(1741);let p=(0,f.O4)("modooGameOption",{money:2e6,players:[{name:"참가자 1"},{name:"참가자 2"}]}),h=(0,u.v)((e,t)=>{let s=e(g),a=e(y);s&&0>a.findIndex(e=>e.id==s.id)&&t(y,[...a,{id:s.id,started:s.started}])}),j=(0,u.v)(e=>{let t=e(g);t&&m(t.id,t)}),g=(0,f.rw)(void 0),y=(0,f.O4)("modooGames",[]),b=(0,x.cn)([]),N=(0,x.cn)([]),v=(0,x.cn)([]);var w=s(2265),k=s(1538),C=s(2218),D=s(4839),R=s(6164);function z(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,R.m6)((0,D.W)(t))}let S=(0,C.j)("inline-flex items-center gap-1 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",danger:"text-primary-foreground shadow-sm bg-red-500 hover:bg-red-700",primary:"bg-primary text-primary-foreground shadow hover:bg-primary/90",accent:"bg-accent text-accent-foreground shadow-sm hover:bg-accent/80"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-sm px-2 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",xl:"h-12 rounded-md px-14",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),O=w.forwardRef((e,t)=>{let{className:s,variant:a,size:l,asChild:n=!1,...i}=e,d=n?k.g7:"button";return(0,r.jsx)(d,{className:z(S({variant:a,size:l,className:s})),ref:t,...i})});O.displayName="Button";let I=w.forwardRef((e,t)=>{let{className:s,type:a,...l}=e;return(0,r.jsx)("input",{type:a,className:z("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...l})});function Z(){let[e,t]=(0,l.KO)(p);return(0,r.jsxs)("div",{className:"text-start grid gap-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsxs)("span",{children:[e.players.length," 명"]}),(0,r.jsxs)(O,{type:"button",size:"xs",onClick:function(){t({...e,players:[...e.players,{name:"참여자 ".concat(e.players.length+1)}]})},children:[(0,r.jsx)(d.Z,{className:"w-4 h-4"})," 추가"]})]}),e.players.map((s,a)=>(0,r.jsxs)("div",{className:"flex items-center justify-center w-full gap-1",children:[(0,r.jsx)(I,{value:s.name,onChange:s=>(function(s,a){let r=[...e.players];r.splice(s,1,{name:a}),t({...e,players:r})})(a,s.target.value)}),(0,r.jsx)(O,{type:"button",size:"sm",variant:"danger",onClick:()=>(function(s){let a=[...e.players];a.splice(s,1),t({...e,players:a})})(a),children:(0,r.jsx)(o.Z,{className:"w-4 h-4"})})]},a))]})}function E(e){let{onClick:t}=e;return(0,r.jsx)(O,{type:"button",size:"sm",onClick:t,children:"0 원"})}function _(e){let{value:t,onClick:s}=e,a=(0,w.useMemo)(()=>t>0?"+".concat(t.toLocaleString()):t.toLocaleString(),[t]),l=(0,w.useMemo)(()=>t>0?"bg-blue-400 hover:bg-blue-600":"bg-red-400 hover:bg-red-600",[t]);return(0,r.jsxs)(O,{type:"button",size:"sm",className:l,onClick:()=>s(t),children:[a,"원"]})}function F(e){let{value:t,onChange:s,usePreset:a=!0,preset:l=[1e5,1e4,1e3,-1e5,-1e4,-1e3]}=e,n=(0,w.useMemo)(()=>Number(t).toLocaleString(),[t]);return(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsxs)("div",{className:"flex w-full items-center",children:[(0,r.jsx)(I,{type:"text",className:"text-xl",tabIndex:-1,value:n,onChange:e=>{s(Number(e.target.value.replaceAll(",","")))}}),(0,r.jsx)("div",{className:"flex justify-center items-center w-14 bg-base-300",children:"원"})]}),a&&(0,r.jsxs)("div",{className:"flex flex-wrap gap-2 mt-4",children:[l.map(e=>(0,r.jsx)(_,{value:e,onClick:a=>s(t+e)},e)),(0,r.jsx)(E,{onClick:()=>s(0)})]})]})}function V(){let[e,t]=(0,l.KO)(p);return(0,r.jsx)(F,{value:e.money,onChange:function(s){t({...e,money:s})},usePreset:!1})}I.displayName="Input";var T=s(2126),A=s(2290);function G(e){switch(e){case"green":return"bg-green-700";case"red":return"bg-red-500";case"orange":return"bg-amber-500";case"deep-pink":return"bg-pink-600";case"purple":return"bg-purple-500";case"light-blue":return"bg-blue-400";case"blue":return"bg-blue-600";case"light-green":return"bg-green-500";case"pink":return"bg-pink-400";case"sky":return"bg-blue-300";default:return"bg-slate-600"}}function P(e,t,s){let a=e.findIndex(e=>e.id==t),r=e[a];return e.splice(a,1,{...r,money:r.money+s}),r}function U(e){return e.reduce((e,t)=>e.money>t.money?e:t)}function K(){let e=(0,l.b9)(g),t=(0,l.Dv)(p);return(0,r.jsxs)(i,{onSubmit:function(s){s.preventDefault(),e({id:(0,A.x0)(),started:new Date,option:t,players:t.players.map(e=>({id:(0,A.x0)(),money:t.money,name:e.name})),histories:[],status:a.STARTED})},children:[(0,r.jsx)(n,{label:"시작금액",children:(0,r.jsx)(V,{})}),(0,r.jsx)(n,{label:"참여자",children:(0,r.jsx)(Z,{})}),(0,r.jsx)(n,{children:(0,r.jsxs)(O,{type:"submit",className:"w-full",variant:"primary",size:"lg",children:[(0,r.jsx)(T.Z,{className:"h-6 w-6"})," 시작하기"]})})]})}!function(e){e[e.STARTED=0]="STARTED",e[e.ENDED=1]="ENDED"}(a||(a={}));var M=s(1031),L=s(9450);function Y(e){return L.ou.fromJSDate(e).toFormat("T")}var q=s(7284),J=s(6669);let $=J.fC,B=J.xz,W=J.h_,X=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(J.aV,{className:z("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...a,ref:t})});X.displayName=J.aV.displayName;let Q=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsxs)(W,{children:[(0,r.jsx)(X,{}),(0,r.jsx)(J.VY,{ref:t,className:z("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...a})]})});Q.displayName=J.VY.displayName;let H=e=>{let{className:t,...s}=e;return(0,r.jsx)("div",{className:z("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...s})};H.displayName="AlertDialogFooter";let ee=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(J.Dx,{ref:t,className:z("text-lg font-semibold",s),...a})});ee.displayName=J.Dx.displayName;let et=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(J.dk,{ref:t,className:z("text-sm text-muted-foreground",s),...a})});et.displayName=J.dk.displayName;let es=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(J.aU,{ref:t,className:z(S(),s),...a})});es.displayName=J.aU.displayName;let ea=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(J.$j,{ref:t,className:z(S({variant:"outline"}),"mt-2 sm:mt-0",s),...a})});function er(e){let{onRemove:t}=e;return(0,r.jsxs)(J.aR,{children:[(0,r.jsx)(J.vW,{asChild:!0,children:(0,r.jsx)(O,{size:"sm",variant:"danger",children:(0,r.jsx)(q.Z,{className:"h-4 w-4"})})}),(0,r.jsxs)(Q,{children:[(0,r.jsx)(ee,{children:"게임기록을 제거하시겠습니까?"}),(0,r.jsx)(et,{children:"게임기록 제거는 되돌릴 수 없습니다."}),(0,r.jsxs)(H,{children:[(0,r.jsx)(es,{onClick:t,children:"확인"}),(0,r.jsx)(ea,{children:"취소"})]})]})]})}function el(){let[e,t]=(0,l.KO)(y),s=(0,l.b9)(g);return 0==e.length?(0,r.jsx)(r.Fragment,{}):(0,r.jsx)("div",{className:"my-5 mx-5",children:(0,r.jsx)("ul",{className:"w-full",children:e.toReversed().map(a=>{var l;return(0,r.jsx)("li",{className:"flex justify-between rounded-xl py-6 px-6 text-slate-400 transition-all shadow-lg hover:shadow-neutral-900 mb-4",children:(0,r.jsxs)("div",{className:"flex min-w-0 w-full",children:[(0,r.jsx)("div",{className:"min-w-0 flex-auto grow",children:(0,r.jsxs)("p",{className:"text-xl font-semibold leading-6",children:[(0,r.jsx)("span",{className:"mr-1 text-3xl text-yellow-600",children:(l=new Date(a.started),L.ou.fromJSDate(l).toFormat("yyyy-MM-dd"))}),(0,r.jsx)("span",{className:"text-sm mr-1 text-yellow-700",children:Y(new Date(a.started))}),(0,r.jsx)("span",{className:"text-md",children:"에 시작한 게임"})]})}),(0,r.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-2",children:[(0,r.jsx)(O,{size:"sm",className:"text-xs",variant:"secondary",onClick:()=>{s(c(a.id))},children:"게임보기"}),(0,r.jsx)(er,{onRemove:()=>{var s;t([...e].filter(e=>e.id!=a.id)),s=a.id,"undefined"!=typeof localStorage&&localStorage.removeItem("modooGame-".concat(s))}})]})]})},a.id)})})})}ea.displayName=J.$j.displayName;var en=s(3304),ei=s(4867);let ed=en.fC,eo=en.xz,ec=en.h_;en.x8;let em=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(en.aV,{ref:t,className:z("fixed inset-0 z-50 bg-black/80 backdrop-blur-sm  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...a})});em.displayName=en.aV.displayName;let ex=w.forwardRef((e,t)=>{let{className:s,children:a,...l}=e;return(0,r.jsxs)(ec,{children:[(0,r.jsx)(em,{}),(0,r.jsxs)(en.VY,{ref:t,className:z("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...l,children:[a,(0,r.jsxs)(en.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,r.jsx)(ei.Pxu,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});ex.displayName=en.VY.displayName;let eu=e=>{let{className:t,...s}=e;return(0,r.jsx)("div",{className:z("flex flex-col space-y-1.5 text-center sm:text-left",t),...s})};eu.displayName="DialogHeader";let ef=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(en.Dx,{ref:t,className:z("text-lg font-semibold leading-none tracking-tight",s),...a})});ef.displayName=en.Dx.displayName;let ep=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(en.dk,{ref:t,className:z("text-sm text-muted-foreground",s),...a})});ep.displayName=en.dk.displayName;var eh=s(5043);let ej=eh.fC,eg=eh.xz;eh.ZA,eh.Uv,eh.Tr,eh.Ee,w.forwardRef((e,t)=>{let{className:s,inset:a,children:l,...n}=e;return(0,r.jsxs)(eh.fF,{ref:t,className:z("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",a&&"pl-8",s),...n,children:[l,(0,r.jsx)(ei.XCv,{className:"ml-auto h-4 w-4"})]})}).displayName=eh.fF.displayName,w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(eh.tu,{ref:t,className:z("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...a})}).displayName=eh.tu.displayName;let ey=w.forwardRef((e,t)=>{let{className:s,sideOffset:a=4,...l}=e;return(0,r.jsx)(eh.Uv,{children:(0,r.jsx)(eh.VY,{ref:t,sideOffset:a,className:z("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...l})})});ey.displayName=eh.VY.displayName;let eb=w.forwardRef((e,t)=>{let{className:s,inset:a,...l}=e;return(0,r.jsx)(eh.ck,{ref:t,className:z("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a&&"pl-8",s),...l})});function eN(){let[e,t]=(0,w.useState)(!1);return(0,r.jsxs)(ed,{open:e,onOpenChange:t,children:[(0,r.jsx)(eo,{asChild:!0,children:(0,r.jsxs)(O,{size:"xl",variant:"primary",children:[(0,r.jsx)(T.Z,{className:"h-6 w-6"})," 새로운 게임 시작하기"]})}),(0,r.jsxs)(ex,{children:[(0,r.jsxs)(eu,{children:[(0,r.jsx)(ef,{children:"새로운 게임 시작하기"}),(0,r.jsx)(ep,{children:"새로운 게임을 시작합니다. 시작 옵션을 정해주세요."})]}),(0,r.jsx)(K,{})]})]})}function ev(){let e=(0,w.useRef)(null),[t,s]=(0,l.KO)(y),[a,n]=(0,l.KO)(p);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(ej,{children:[(0,r.jsx)(eg,{asChild:!0,children:(0,r.jsx)(O,{variant:"outline",size:"xl",className:"px-1",children:(0,r.jsx)(M.Z,{className:"w-6 h-full"})})}),(0,r.jsxs)(ey,{children:[(0,r.jsx)(eb,{onClick:function(){!function(e){let t=window.URL.createObjectURL(new Blob([e],{type:"application/json"})),s=document.createElement("a");s.href=t,s.setAttribute("download","modoo-gamedata.json"),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(t)}(JSON.stringify({list:t,option:a,games:t.map(e=>c(e.id))}))},children:"내보내기"}),(0,r.jsx)(eb,{onClick:()=>{var t;return null===(t=e.current)||void 0===t?void 0:t.click()},children:"가져오기"})]})]}),(0,r.jsx)("div",{className:"fixed top-[-100px]",children:(0,r.jsx)(I,{type:"file",ref:e,onChange:function(e){if(e.preventDefault(),!e.target.files||0==e.target.files.length||!confirm("게임데이터 가져오기를 하면 이전데이터는 모두 삭제되고 가져온 데이터로 대체됩니다. 계속하시겠습니까?"))return;let t=e.target.files[0],a=new FileReader;a.onloadend=()=>{let e=JSON.parse(a.result);n(e.option),s(e.list),e.games.forEach(e=>{m(e.id,e)})},a.readAsText(t),e.target.value=""}})})]})}function ew(){return(0,r.jsxs)("div",{className:"max-w-[640px] mx-auto pb-20",children:[(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"px-10",children:(0,r.jsx)("img",{src:"/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,r.jsx)("h1",{className:"text-2xl",children:"모두의 마블 점수 계산기"}),(0,r.jsxs)("div",{className:"mt-10 flex justify-center gap-1",children:[(0,r.jsx)(eN,{}),(0,r.jsx)(ev,{})]})]}),(0,r.jsx)(el,{})]})}eb.displayName=eh.ck.displayName,w.forwardRef((e,t)=>{let{className:s,children:a,checked:l,...n}=e;return(0,r.jsxs)(eh.oC,{ref:t,className:z("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",s),checked:l,...n,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(eh.wU,{children:(0,r.jsx)(ei.nQG,{className:"h-4 w-4"})})}),a]})}).displayName=eh.oC.displayName,w.forwardRef((e,t)=>{let{className:s,children:a,...l}=e;return(0,r.jsxs)(eh.Rk,{ref:t,className:z("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",s),...l,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(eh.wU,{children:(0,r.jsx)(ei.jXb,{className:"h-4 w-4 fill-current"})})}),a]})}).displayName=eh.Rk.displayName,w.forwardRef((e,t)=>{let{className:s,inset:a,...l}=e;return(0,r.jsx)(eh.__,{ref:t,className:z("px-2 py-1.5 text-sm font-semibold",a&&"pl-8",s),...l})}).displayName=eh.__.displayName,w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(eh.Z0,{ref:t,className:z("-mx-1 my-1 h-px bg-muted",s),...a})}).displayName=eh.Z0.displayName;var ek=s(4340);function eC(e){let{children:t}=e;return(0,r.jsx)("div",{className:"my-10 mx-5",children:(0,r.jsx)("ul",{className:"px-4 w-full flex flex-col",children:t})})}function eD(e){let{title:t,children:s}=e;return(0,r.jsxs)("li",{className:"grid justify-center items-center flex-shrink-0",style:{fontSize:12,gridTemplateRows:"10px 20px 10px 1fr",gridTemplateColumns:"20px 1fr"},children:[(0,r.jsx)("hr",{style:{height:10,width:"0.25rem"},className:"col-start-1 row-start-1 justify-self-center bg-black opacity-80"}),(0,r.jsx)("div",{className:"col-start-2 row-start-2 p-1",children:t}),(0,r.jsx)("div",{className:"col-start-1 row-start-2",children:(0,r.jsx)(ek.Z,{className:"h-5 w-5"})}),(0,r.jsx)("div",{className:"col-start-2 row-start-4 p-1",children:s}),(0,r.jsx)("hr",{style:{height:"100%",width:"0.25rem"},className:"col-start-1 row-start-3 row-end-5 justify-self-center bg-black opacity-80"})]})}let eR=new Intl.NumberFormat;function ez(e){return eR.format(e)}var eS=s(3915);function eO(e){let{amount:t}=e;return(0,r.jsx)("b",{className:t>0?"text-blue-400":"text-red-400",children:ez(t)})}function eI(e){let{history:t}=e,[s,a]=(0,l.KO)(g);return(0,r.jsxs)($,{children:[(0,r.jsx)(B,{asChild:!0,children:(0,r.jsx)(eS.Z,{className:"h-4 w-4 ml-1 cursor-pointer text-foreground/60 hover:text-primary"})}),(0,r.jsxs)(Q,{children:[(0,r.jsx)(ee,{children:"기록을 되돌리시겠습니까?"}),(0,r.jsxs)(H,{children:[(0,r.jsx)(es,{onClick:function(){if(!s)return;let e=[...s.players];"bank"!=t.toId&&P(e,t.toId,-t.amount),"bank"!=t.fromId&&P(e,t.fromId,t.amount);let r=[...s.histories];r.shift();let l=U(e);a({...s,players:e,histories:r,topPlayerId:l.id})},children:"확인"}),(0,r.jsx)(ea,{children:"취소"})]})]})]})}function eZ(){let e=(0,l.Dv)(g);return e?(0,r.jsx)(eC,{children:e.histories.map((t,s)=>(0,r.jsx)(eD,{title:Y(new Date(t.time)),children:(0,r.jsxs)("div",{className:"flex gap-1",children:[(0,r.jsxs)("span",{children:[t.fromName," -> ",t.toName," :"]}),(0,r.jsx)(eO,{amount:t.amount}),e.status!=a.ENDED&&0==s&&(0,r.jsx)(eI,{history:t})]})},s))}):(0,r.jsx)(r.Fragment,{})}var eE=s(6493),e_=s(7586),eF=s(7309),eV=s(4429);let eT=eV.fC;eV.ZA;let eA=eV.B4,eG=w.forwardRef((e,t)=>{let{className:s,children:a,...l}=e;return(0,r.jsxs)(eV.xz,{ref:t,className:z("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",s),...l,children:[a,(0,r.jsx)(eV.JO,{asChild:!0,children:(0,r.jsx)(ei.jnn,{className:"h-4 w-4 opacity-50"})})]})});eG.displayName=eV.xz.displayName;let eP=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(eV.u_,{ref:t,className:z("flex cursor-default items-center justify-center py-1",s),...a,children:(0,r.jsx)(ei.g8U,{})})});eP.displayName=eV.u_.displayName;let eU=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(eV.$G,{ref:t,className:z("flex cursor-default items-center justify-center py-1",s),...a,children:(0,r.jsx)(ei.v4q,{})})});eU.displayName=eV.$G.displayName;let eK=w.forwardRef((e,t)=>{let{className:s,children:a,position:l="popper",...n}=e;return(0,r.jsx)(eV.h_,{children:(0,r.jsxs)(eV.VY,{ref:t,className:z("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===l&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",s),position:l,...n,children:[(0,r.jsx)(eP,{}),(0,r.jsx)(eV.l_,{className:z("p-1","popper"===l&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:a}),(0,r.jsx)(eU,{})]})})});eK.displayName=eV.VY.displayName,w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(eV.__,{ref:t,className:z("px-2 py-1.5 text-sm font-semibold",s),...a})}).displayName=eV.__.displayName;let eM=w.forwardRef((e,t)=>{let{className:s,children:a,...l}=e;return(0,r.jsxs)(eV.ck,{ref:t,className:z("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",s),...l,children:[(0,r.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(eV.wU,{children:(0,r.jsx)(ei.nQG,{className:"h-4 w-4"})})}),(0,r.jsx)(eV.eT,{children:a})]})});function eL(e){let{remain:t}=e;return(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)("div",{className:"text-center",children:"금액"}),t&&(0,r.jsxs)("div",{className:"text-center text-foreground/60",children:["(",Number(t).toLocaleString()," 원)"]})]})}function eY(e){let{player:t}=e,[s,a]=(0,w.useState)(!1),[d,o]=(0,w.useState)(3e5),[c,m]=(0,w.useState)("bank"),x=(0,l.Dv)(g),u=d>0,f=(0,eF.lV)((0,w.useCallback)((e,s,a,r)=>{let l;let n=e(g);if(!n){console.log("NO currentGame");return}let i=[...n.players];P(i,t.id,-r),l="bank"!=a?P(i,a,r).name:"은행";let d=[{fromId:t.id,fromName:t.name,toId:a,toName:l,amount:r,time:new Date},...n.histories],o=U(i);s(g,{...n,players:i,histories:d,topPlayerId:o.id})},[t]));return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(ed,{open:s,onOpenChange:a,children:[(0,r.jsx)(en.hg,{children:(0,r.jsx)(eE.Z,{className:"w-8 h-8 p-1 text-blue-400 hover:text-blue-600"})}),(0,r.jsxs)(ex,{children:[(0,r.jsx)(eu,{children:(0,r.jsxs)(en.$N,{children:[t.name," : 돈 보내기"]})}),(0,r.jsxs)(i,{onSubmit:function(e){e.preventDefault(),f(c,d),a(!1)},children:[(0,r.jsx)(n,{label:"보낼 곳",children:(0,r.jsxs)(eT,{value:c,onValueChange:e=>m(e),children:[(0,r.jsx)(eG,{children:(0,r.jsx)(eV.ki,{placeholder:"보낼 곳"})}),(0,r.jsxs)(eK,{children:[(0,r.jsx)(eM,{value:"bank",children:"은행"}),x&&x.players.filter(e=>e.id!=t.id).map(e=>(0,r.jsx)(eM,{value:e.id,children:e.name},e.id))]})]})}),(0,r.jsx)(n,{label:(0,r.jsx)(eL,{remain:t.money-d}),children:(0,r.jsx)(F,{value:d,onChange:o})}),(0,r.jsx)(n,{children:(0,r.jsxs)(O,{type:"submit",className:"w-full",size:"lg",variant:"primary",disabled:!u,children:[(0,r.jsx)(eE.Z,{className:"w-6 h-6"})," 보내기"]})})]})]})]})})}function eq(e){let{player:t}=e,[s,a]=(0,w.useState)(!1),[l,d]=(0,w.useState)(3e5),o=l>0,c=(0,eF.lV)((0,w.useCallback)((e,s)=>{let a=e(g);if(!a){console.log("NO currentGame");return}let r=[...a.players];P(r,t.id,l);let n=[{fromId:"bank",fromName:"은행",toId:t.id,toName:t.name,amount:l,time:new Date},...a.histories],i=U(r);s(g,{...a,players:r,histories:n,topPlayerId:i.id})},[t,l]));return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(ed,{open:s,onOpenChange:a,children:[(0,r.jsx)(en.hg,{children:(0,r.jsx)(e_.Z,{className:"w-8 h-8 p-1 text-red-400 hover:text-red-600"})}),(0,r.jsxs)(ex,{children:[(0,r.jsx)(eu,{children:(0,r.jsxs)(en.$N,{children:[t.name," : 은행에서 돈 받기"]})}),(0,r.jsxs)(i,{onSubmit:function(e){e.preventDefault(),c(),a(!1)},children:[(0,r.jsx)(n,{label:(0,r.jsx)(eL,{remain:t.money+l}),children:(0,r.jsx)(F,{value:l,onChange:d})}),(0,r.jsx)(n,{children:(0,r.jsxs)(O,{type:"submit",className:"w-full",variant:"primary",size:"lg",disabled:!o,children:[(0,r.jsx)(e_.Z,{className:"w-6 h-6"})," 받기"]})})]})]})]})})}eM.displayName=eV.ck.displayName,w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)(eV.Z0,{ref:t,className:z("-mx-1 my-1 h-px bg-muted",s),...a})}).displayName=eV.Z0.displayName;var eJ=s(7788);function e$(e){let{player:t}=e,s=(0,l.Dv)(g);return s?(0,r.jsxs)("div",{className:"flex min-w-0 gap-x-4 w-full",children:[(0,r.jsxs)("div",{className:"min-w-0 flex-auto grow",children:[(0,r.jsxs)("div",{className:"flex w-full gap-x-2",children:[s.topPlayerId==t.id&&(0,r.jsx)(eJ.Z,{className:"h-5 w-5 text-red-400"}),(0,r.jsx)("p",{className:"text-xl font-semibold leading-6",children:t.name})]}),(0,r.jsx)("p",{className:"mt-2 truncate text-3xl leading-8 text-yellow-100",children:ez(t.money)})]}),s.status!=a.ENDED&&(0,r.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-1",children:[(0,r.jsx)(eY,{player:t}),(0,r.jsx)(eq,{player:t})]})]}):(0,r.jsx)(r.Fragment,{})}function eB(){let e=(0,l.Dv)(g);return e?(0,r.jsx)("div",{className:"flex justify-center items-center my-5 mx-5",children:(0,r.jsx)("ul",{className:"divide-y w-full max-w-[640px] px-4 py-2 rounded-xl border",children:e.players.map(e=>(0,r.jsx)("li",{className:"flex justify-between gap-x-6 py-6",children:(0,r.jsx)(e$,{player:e})},e.id))})}):(0,r.jsx)(r.Fragment,{})}let eW=(0,C.j)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive"}},defaultVariants:{variant:"default"}}),eX=w.forwardRef((e,t)=>{let{className:s,variant:a,...l}=e;return(0,r.jsx)("div",{ref:t,role:"alert",className:z(eW({variant:a}),s),...l})});eX.displayName="Alert";let eQ=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("h5",{ref:t,className:z("mb-1 font-medium leading-none tracking-tight",s),...a})});eQ.displayName="AlertTitle";let eH=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("div",{ref:t,className:z("text-sm [&_p]:leading-relaxed",s),...a})});eH.displayName="AlertDescription";let e0=w.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("textarea",{className:z("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...a})});e0.displayName="Textarea";var e1=s(9350),e2=s(2068);function e5(){let[e,t]=(0,w.useState)(!1),s=(0,eF.oC)(g),d=(0,l.Dv)(g),[o,c]=(0,w.useState)(null==d?void 0:d.topPlayerId),[x,u]=(0,w.useState)("");return d?(0,r.jsxs)(ed,{open:e,onOpenChange:function(e){t(e),c(null==d?void 0:d.topPlayerId)},children:[(0,r.jsx)(eo,{asChild:!0,children:(0,r.jsxs)(O,{type:"button",size:"xl",variant:"primary",children:[(0,r.jsx)(e1.Z,{className:"h-6 w-6"})," 게임 종료"]})}),(0,r.jsxs)(ex,{children:[(0,r.jsx)(eu,{children:(0,r.jsx)(ef,{children:"게임을 종료하시겠습니까?"})}),(0,r.jsxs)(i,{onSubmit:function(e){e.preventDefault(),t(!1),m(d.id,{...d,status:a.ENDED,topPlayerId:o,message:x}),s()},children:[(0,r.jsx)(n,{label:"승리",children:(0,r.jsxs)(eT,{value:o,onValueChange:e=>c(e),children:[(0,r.jsx)(eG,{children:(0,r.jsx)(eA,{placeholder:"승리한 참여자"})}),(0,r.jsx)(eK,{children:d&&d.players.map(e=>(0,r.jsx)(eM,{value:e.id,children:e.name},e.id))})]})}),(0,r.jsx)(n,{label:"설명",children:(0,r.jsx)(e0,{placeholder:"게임에 대해서 설명을 남겨보세요.",value:x,onChange:e=>u(e.target.value)})}),(0,r.jsx)(n,{children:(0,r.jsxs)(O,{type:"submit",size:"xl",variant:"primary",className:"w-full",disabled:void 0==o,children:[(0,r.jsx)(e1.Z,{className:"h-6 w-6"})," 게임 종료"]})})]})]})]}):(0,r.jsx)(r.Fragment,{})}function e4(){let e=(0,eF.oC)(g),t=(0,l.Dv)(g);return t&&t.status==a.ENDED?(0,r.jsxs)(O,{type:"button",size:"xl",variant:"primary",onClick:e,children:[(0,r.jsx)(e2.Z,{className:"h-6 w-6"})," 처음으로"]}):(0,r.jsx)(e5,{})}function e6(){let e=(0,l.Dv)(g);return e&&e.status==a.ENDED&&e.message?(0,r.jsxs)(eX,{children:[(0,r.jsx)(eJ.Z,{className:"h-4 w-4 text-red-400"}),(0,r.jsx)(eQ,{children:"종료된 게임입니다"}),(0,r.jsx)(eH,{children:e.message})]}):(0,r.jsx)(r.Fragment,{})}function e8(){return(0,r.jsxs)("div",{className:"mx-5 mb-10",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)("div",{className:"px-10",children:(0,r.jsx)("img",{src:"/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,r.jsx)("h1",{className:"text-2xl mt-2",children:"모두의 마블 점수 계산기"})]}),(0,r.jsx)("div",{className:"my-5 flex flex-col items-center",children:(0,r.jsx)(e4,{})}),(0,r.jsx)(e6,{})]})}let e3=(0,C.j)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function e9(e){let{className:t,variant:s,...a}=e;return(0,r.jsx)("div",{className:z(e3({variant:s}),t),...a})}function e7(e,t){return e+t}var te=s(8472);function tt(e){let{land:t,onSelect:s}=e;return(0,r.jsx)(O,{variant:"outline",className:z("py-1 px-2 shadow-sm rounded text-slate-900",G(t.color)),onClick:()=>s(t),children:t.name})}function ts(e){let{label:t,children:s}=e;return(0,r.jsxs)("div",{className:"grid grid-cols-4 py-1",children:[(0,r.jsx)("div",{className:"pr-4 text-right",children:t}),(0,r.jsx)("div",{className:"col-span-3",children:s})]})}function ta(e){let{land:t}=e,s=(0,l.Dv)(v),[a,n]=(0,w.useState)([]),i=(0,w.useMemo)(()=>s.filter(e=>e.landid==t.id),[t,s]),d=(0,w.useMemo)(()=>{let e=a.filter(e=>e.landid==t.id),s=e.map(e=>e.tollfee).reduce(e7,0);return"city"!=t.type&&(s=e.length>0?e.map(e=>e.tollfee).sort((e,t)=>t-e)[0]:0),{constcost:e.map(e=>e.constcost).reduce(e7,0),tollfee:s,acquisitioncost:e.map(e=>e.acquisitioncost).reduce(e7,0),sellingcost:e.map(e=>e.sellingcost).reduce(e7,0),inacquisitionable:e.findIndex(e=>!e.acquisitionable)>=0}},[t,a]),o=G(t.color);return(0,r.jsxs)("div",{className:z("rounded shadow bg-opacity-10",o),children:[(0,r.jsx)("div",{className:z("px-4 py-2 rounded-t text-slate-900 font-bold text-lg",o),children:t.name}),(0,r.jsxs)("div",{className:"rounded-b py-4 px-4",children:[(0,r.jsx)("div",{className:"flex flex-wrap gap-2",children:i.map(e=>(0,r.jsx)(O,{variant:a.findIndex(t=>t.id==e.id)>=0?"primary":"outline",onClick:()=>{a.findIndex(t=>t.id==e.id)>=0?n(a.filter(t=>t.id!=e.id)):n([...a,e])},children:e.name},e.id))}),(0,r.jsxs)("div",{className:"my-3",children:[(0,r.jsx)(ts,{label:"건설비용",children:ez(d.constcost)}),(0,r.jsx)(ts,{label:"통행료",children:ez(d.tollfee)}),(0,r.jsx)(ts,{label:"인수비용",children:(0,r.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,r.jsx)("span",{children:ez(d.acquisitioncost)}),d.inacquisitionable&&(0,r.jsx)(e9,{variant:"destructive",children:"인수불가"})]})}),(0,r.jsx)(ts,{label:"매각비용",children:ez(d.sellingcost)})]})]})]})}function tr(){let[e,t]=(0,w.useState)(!1),[s,a]=(0,l.KO)(N),n=(0,l.b9)(v),[i,d]=(0,w.useState)();async function o(){let e=await te.Z.get("/modoo/api/land"),t=await te.Z.get("/modoo/api/building");a(e.data),n(t.data)}return((0,w.useEffect)(()=>{0==s.length&&(t(!0),o().finally(()=>t(!1)))},[]),e)?(0,r.jsx)("div",{className:"flex justify-center items-center py-20",children:(0,r.jsx)(ei.BGW,{className:"animate-spin h-6 w-6 opacity-70"})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex flex-wrap gap-2",children:s.map(e=>(0,r.jsx)(tt,{land:e,onSelect:d},e.id))}),i&&(0,r.jsx)("div",{className:"mt-6",children:(0,r.jsx)(ta,{land:i})})]})}function tl(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(ed,{children:[(0,r.jsx)(eo,{children:(0,r.jsx)(O,{size:"xs",variant:"secondary",children:"지역카드"})}),(0,r.jsxs)(ex,{children:[(0,r.jsxs)(eu,{children:[(0,r.jsx)(ef,{children:"지역카드"}),(0,r.jsx)(ep,{})]}),(0,r.jsx)(tr,{})]})]})})}function tn(e){let{command:t}=e,s=(0,w.useMemo)(()=>{switch(t.type){case"gold":return"bg-gradient-to-r from-amber-200 to-yellow-500";case"silver":return"bg-gradient-to-r from-slate-300 to-slate-500";case"bronze":return"bg-gradient-to-r from-red-500 to-orange-500"}},[t]);return(0,r.jsx)("div",{className:"flex justify-center py-5",children:(0,r.jsxs)("div",{className:z("rounded-md w-[240px] h-[320px] shadow-lg p-4 relative",s),children:[(0,r.jsx)("div",{className:"curved-rectangle absolute top-5 w-[208px] py-3 bg-white bg-opacity-30 text-center rounded shadow",children:(0,r.jsx)("b",{className:"text-lg text-black",children:t.name})}),(0,r.jsx)("img",{src:"/modoo/chance_background.png",className:"opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20"}),(0,r.jsx)("div",{className:"rounded-md py-2 px-5 bg-slate-100 flex justify-center text-center items-center w-[208px] h-[100px] absolute bottom-5 bg-opacity-70 shadow",children:(0,r.jsx)("span",{className:"text-sm text-slate-900",children:t.description})}),t.storable&&(0,r.jsx)(e9,{className:"absolute bottom-3 right-3",children:"보관가능"})]})})}function ti(){let[e,t]=(0,l.KO)(b),[s,a]=(0,w.useState)(),[n,i]=(0,w.useState)(!1);function d(){let t=Math.floor(Math.random()*e.length);a(e[t])}return((0,w.useEffect)(()=>{if(e&&e.length>0){d();return}i(!0),te.Z.get("/modoo/api/command").then(e=>e.data).then(e=>t(e)).finally(()=>i(!1))},[e]),n)?(0,r.jsx)("div",{className:"flex justify-center py-20",children:(0,r.jsx)(ei.BGW,{className:"animate-spin w-6 h-6 opacity-70"})}):(0,r.jsxs)(r.Fragment,{children:[s&&(0,r.jsx)(tn,{command:s}),(0,r.jsxs)(O,{variant:"secondary",onClick:()=>d(),children:[(0,r.jsx)(ei.X5P,{})," 다시뽑기"]})]})}function td(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(ed,{children:[(0,r.jsx)(eo,{children:(0,r.jsx)(O,{variant:"secondary",size:"xs",children:"찬스카드"})}),(0,r.jsxs)(ex,{"aria-description":"","aria-describedby":"",children:[(0,r.jsxs)(eu,{children:[(0,r.jsx)(ef,{children:"찬스카드"}),(0,r.jsx)(ep,{})]}),(0,r.jsx)(ti,{})]})]})})}function to(){return(0,r.jsxs)("div",{className:"max-w-[640px] mx-auto pb-20",children:[(0,r.jsx)(e8,{}),(0,r.jsxs)("div",{className:"flex justify-center gap-2 my-5",children:[(0,r.jsx)(tl,{}),(0,r.jsx)(td,{})]}),(0,r.jsx)(eB,{}),(0,r.jsx)(eZ,{})]})}function tc(){return((0,l.KO)(j),(0,l.KO)(h),(0,l.Dv)(g))?(0,r.jsx)(to,{}):(0,r.jsx)(ew,{})}function tm(){return(0,r.jsx)(l.zt,{children:(0,r.jsx)(tc,{})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[310,231,662,130,215,744],()=>t(8588)),_N_E=e.O()}]);