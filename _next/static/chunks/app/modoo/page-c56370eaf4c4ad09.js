(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[151],{8588:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,231,23)),Promise.resolve().then(a.bind(a,3700))},3700:(e,t,a)=>{"use strict";a.d(t,{default:()=>e5});var s,r=a(7437),l=a(3742);function n(e){let{label:t,children:a}=e;return(0,r.jsxs)("div",{className:"px-0 py-6 grid grid-cols-3 gap-4 text-sm",children:[(0,r.jsx)("dt",{className:"flex justify-center items-start pt-2",children:t}),(0,r.jsx)("dd",{className:"col-span-2 text-start",children:a})]})}function i(e){let{children:t,onSubmit:a}=e;return(0,r.jsx)("form",{className:"mt-6 border-t",onSubmit:a,children:(0,r.jsx)("dl",{className:"divide-y",children:t})})}var d=a(5265),o=a(1349);function c(e){if("undefined"==typeof localStorage)return null;let t=localStorage.getItem("modooGame-".concat(e));return t?JSON.parse(t):null}function m(e,t){"undefined"!=typeof localStorage&&localStorage.setItem("modooGame-".concat(e),JSON.stringify(t))}var x=a(7443),u=a(1741);let f=(0,u.O4)("modooGameOption",{money:2e6,players:[{name:"참가자 1"},{name:"참가자 2"}]}),p=(0,x.v)((e,t)=>{let a=e(j),s=e(g);a&&0>s.findIndex(e=>e.id==a.id)&&t(g,[...s,{id:a.id,started:a.started}])}),h=(0,x.v)(e=>{let t=e(j);t&&m(t.id,t)}),j=(0,u.rw)(void 0),g=(0,u.O4)("modooGames",[]);var y=a(2265),N=a(1538),v=a(2218),b=a(4839),w=a(6164);function k(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,w.m6)((0,b.W)(t))}let C=(0,v.j)("inline-flex items-center gap-1 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",danger:"text-primary-foreground shadow-sm bg-red-500 hover:bg-red-700",primary:"bg-primary text-primary-foreground shadow hover:bg-primary/90",accent:"bg-accent text-accent-foreground shadow-sm hover:bg-accent/80"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-sm px-2 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",xl:"h-12 rounded-md px-14",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),D=y.forwardRef((e,t)=>{let{className:a,variant:s,size:l,asChild:n=!1,...i}=e,d=n?N.g7:"button";return(0,r.jsx)(d,{className:k(C({variant:s,size:l,className:a})),ref:t,...i})});D.displayName="Button";let R=y.forwardRef((e,t)=>{let{className:a,type:s,...l}=e;return(0,r.jsx)("input",{type:s,className:k("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",a),ref:t,...l})});function z(){let[e,t]=(0,l.KO)(f);return(0,r.jsxs)("div",{className:"text-start grid gap-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsxs)("span",{children:[e.players.length," 명"]}),(0,r.jsxs)(D,{type:"button",size:"xs",onClick:function(){t({...e,players:[...e.players,{name:"참여자 ".concat(e.players.length+1)}]})},children:[(0,r.jsx)(d.Z,{className:"w-4 h-4"})," 추가"]})]}),e.players.map((a,s)=>(0,r.jsxs)("div",{className:"flex items-center justify-center w-full gap-1",children:[(0,r.jsx)(R,{value:a.name,onChange:a=>(function(a,s){let r=[...e.players];r.splice(a,1,{name:s}),t({...e,players:r})})(s,a.target.value)}),(0,r.jsx)(D,{type:"button",size:"sm",variant:"danger",onClick:()=>(function(a){let s=[...e.players];s.splice(a,1),t({...e,players:s})})(s),children:(0,r.jsx)(o.Z,{className:"w-4 h-4"})})]},s))]})}function S(e){let{onClick:t}=e;return(0,r.jsx)(D,{type:"button",size:"sm",onClick:t,children:"0 원"})}function O(e){let{value:t,onClick:a}=e,s=(0,y.useMemo)(()=>t>0?"+".concat(t.toLocaleString()):t.toLocaleString(),[t]),l=(0,y.useMemo)(()=>t>0?"bg-blue-400 hover:bg-blue-600":"bg-red-400 hover:bg-red-600",[t]);return(0,r.jsxs)(D,{type:"button",size:"sm",className:l,onClick:()=>a(t),children:[s,"원"]})}function E(e){let{value:t,onChange:a,usePreset:s=!0,preset:l=[1e5,1e4,1e3,-1e5,-1e4,-1e3]}=e,n=(0,y.useMemo)(()=>Number(t).toLocaleString(),[t]);return(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsxs)("div",{className:"flex w-full items-center",children:[(0,r.jsx)(R,{type:"text",className:"text-xl",tabIndex:-1,value:n,onChange:e=>{a(Number(e.target.value.replaceAll(",","")))}}),(0,r.jsx)("div",{className:"flex justify-center items-center w-14 bg-base-300",children:"원"})]}),s&&(0,r.jsxs)("div",{className:"flex flex-wrap gap-2 mt-4",children:[l.map(e=>(0,r.jsx)(O,{value:e,onClick:s=>a(t+e)},e)),(0,r.jsx)(S,{onClick:()=>a(0)})]})]})}function I(){let[e,t]=(0,l.KO)(f);return(0,r.jsx)(E,{value:e.money,onChange:function(a){t({...e,money:a})},usePreset:!1})}R.displayName="Input";var Z=a(2126),_=a(2290);function V(e,t,a){let s=e.findIndex(e=>e.id==t),r=e[s];return e.splice(s,1,{...r,money:r.money+a}),r}function F(e){return e.reduce((e,t)=>e.money>t.money?e:t)}function T(){let e=(0,l.b9)(j),t=(0,l.Dv)(f);return(0,r.jsxs)(i,{onSubmit:function(a){a.preventDefault(),e({id:(0,_.x0)(),started:new Date,option:t,players:t.players.map(e=>({id:(0,_.x0)(),money:t.money,name:e.name})),histories:[],status:s.STARTED})},children:[(0,r.jsx)(n,{label:"시작금액",children:(0,r.jsx)(I,{})}),(0,r.jsx)(n,{label:"참여자",children:(0,r.jsx)(z,{})}),(0,r.jsx)(n,{children:(0,r.jsxs)(D,{type:"submit",className:"w-full",variant:"primary",size:"lg",children:[(0,r.jsx)(Z.Z,{className:"h-6 w-6"})," 시작하기"]})})]})}!function(e){e[e.STARTED=0]="STARTED",e[e.ENDED=1]="ENDED"}(s||(s={}));var A=a(1031),U=a(9450);function G(e){return U.ou.fromJSDate(e).toFormat("T")}var P=a(7284),K=a(6669);let L=K.fC,Y=K.xz,J=K.h_,$=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(K.aV,{className:k("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...s,ref:t})});$.displayName=K.aV.displayName;let M=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsxs)(J,{children:[(0,r.jsx)($,{}),(0,r.jsx)(K.VY,{ref:t,className:k("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",a),...s})]})});M.displayName=K.VY.displayName;let B=e=>{let{className:t,...a}=e;return(0,r.jsx)("div",{className:k("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...a})};B.displayName="AlertDialogFooter";let Q=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(K.Dx,{ref:t,className:k("text-lg font-semibold",a),...s})});Q.displayName=K.Dx.displayName;let W=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(K.dk,{ref:t,className:k("text-sm text-muted-foreground",a),...s})});W.displayName=K.dk.displayName;let X=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(K.aU,{ref:t,className:k(C(),a),...s})});X.displayName=K.aU.displayName;let q=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(K.$j,{ref:t,className:k(C({variant:"outline"}),"mt-2 sm:mt-0",a),...s})});function H(e){let{onRemove:t}=e;return(0,r.jsxs)(K.aR,{children:[(0,r.jsx)(K.vW,{asChild:!0,children:(0,r.jsx)(D,{size:"sm",variant:"danger",children:(0,r.jsx)(P.Z,{className:"h-4 w-4"})})}),(0,r.jsxs)(M,{children:[(0,r.jsx)(Q,{children:"게임기록을 제거하시겠습니까?"}),(0,r.jsx)(W,{children:"게임기록 제거는 되돌릴 수 없습니다."}),(0,r.jsxs)(B,{children:[(0,r.jsx)(X,{onClick:t,children:"확인"}),(0,r.jsx)(q,{children:"취소"})]})]})]})}function ee(){let[e,t]=(0,l.KO)(g),a=(0,l.b9)(j);return 0==e.length?(0,r.jsx)(r.Fragment,{}):(0,r.jsx)("div",{className:"my-5 mx-5",children:(0,r.jsx)("ul",{className:"w-full",children:e.toReversed().map(s=>{var l;return(0,r.jsx)("li",{className:"flex justify-between rounded-xl py-6 px-6 text-slate-400 transition-all shadow-lg hover:shadow-neutral-900 mb-4",children:(0,r.jsxs)("div",{className:"flex min-w-0 w-full",children:[(0,r.jsx)("div",{className:"min-w-0 flex-auto grow",children:(0,r.jsxs)("p",{className:"text-xl font-semibold leading-6",children:[(0,r.jsx)("span",{className:"mr-1 text-3xl text-yellow-600",children:(l=new Date(s.started),U.ou.fromJSDate(l).toFormat("yyyy-MM-dd"))}),(0,r.jsx)("span",{className:"text-sm mr-1 text-yellow-700",children:G(new Date(s.started))}),(0,r.jsx)("span",{className:"text-md",children:"에 시작한 게임"})]})}),(0,r.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-2",children:[(0,r.jsx)(D,{size:"sm",className:"text-xs",variant:"secondary",onClick:()=>{a(c(s.id))},children:"게임보기"}),(0,r.jsx)(H,{onRemove:()=>{var a;t([...e].filter(e=>e.id!=s.id)),a=s.id,"undefined"!=typeof localStorage&&localStorage.removeItem("modooGame-".concat(a))}})]})]})},s.id)})})})}q.displayName=K.$j.displayName;var et=a(3304),ea=a(4867);let es=et.fC,er=et.xz,el=et.h_;et.x8;let en=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(et.aV,{ref:t,className:k("fixed inset-0 z-50 bg-black/80 backdrop-blur-sm  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...s})});en.displayName=et.aV.displayName;let ei=y.forwardRef((e,t)=>{let{className:a,children:s,...l}=e;return(0,r.jsxs)(el,{children:[(0,r.jsx)(en,{}),(0,r.jsxs)(et.VY,{ref:t,className:k("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",a),...l,children:[s,(0,r.jsxs)(et.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,r.jsx)(ea.Pxu,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});ei.displayName=et.VY.displayName;let ed=e=>{let{className:t,...a}=e;return(0,r.jsx)("div",{className:k("flex flex-col space-y-1.5 text-center sm:text-left",t),...a})};ed.displayName="DialogHeader";let eo=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(et.Dx,{ref:t,className:k("text-lg font-semibold leading-none tracking-tight",a),...s})});eo.displayName=et.Dx.displayName;let ec=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(et.dk,{ref:t,className:k("text-sm text-muted-foreground",a),...s})});ec.displayName=et.dk.displayName;var em=a(5043);let ex=em.fC,eu=em.xz;em.ZA,em.Uv,em.Tr,em.Ee,y.forwardRef((e,t)=>{let{className:a,inset:s,children:l,...n}=e;return(0,r.jsxs)(em.fF,{ref:t,className:k("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",s&&"pl-8",a),...n,children:[l,(0,r.jsx)(ea.XCv,{className:"ml-auto h-4 w-4"})]})}).displayName=em.fF.displayName,y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(em.tu,{ref:t,className:k("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...s})}).displayName=em.tu.displayName;let ef=y.forwardRef((e,t)=>{let{className:a,sideOffset:s=4,...l}=e;return(0,r.jsx)(em.Uv,{children:(0,r.jsx)(em.VY,{ref:t,sideOffset:s,className:k("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...l})})});ef.displayName=em.VY.displayName;let ep=y.forwardRef((e,t)=>{let{className:a,inset:s,...l}=e;return(0,r.jsx)(em.ck,{ref:t,className:k("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",s&&"pl-8",a),...l})});function eh(){let[e,t]=(0,y.useState)(!1);return(0,r.jsxs)(es,{open:e,onOpenChange:t,children:[(0,r.jsx)(er,{asChild:!0,children:(0,r.jsxs)(D,{size:"xl",variant:"primary",children:[(0,r.jsx)(Z.Z,{className:"h-6 w-6"})," 새로운 게임 시작하기"]})}),(0,r.jsxs)(ei,{children:[(0,r.jsxs)(ed,{children:[(0,r.jsx)(eo,{children:"새로운 게임 시작하기"}),(0,r.jsx)(ec,{children:"새로운 게임을 시작합니다. 시작 옵션을 정해주세요."})]}),(0,r.jsx)(T,{})]})]})}function ej(){let e=(0,y.useRef)(null),[t,a]=(0,l.KO)(g),[s,n]=(0,l.KO)(f);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(ex,{children:[(0,r.jsx)(eu,{asChild:!0,children:(0,r.jsx)(D,{variant:"outline",size:"xl",className:"px-1",children:(0,r.jsx)(A.Z,{className:"w-6 h-full"})})}),(0,r.jsxs)(ef,{children:[(0,r.jsx)(ep,{onClick:function(){!function(e){let t=window.URL.createObjectURL(new Blob([e],{type:"application/json"})),a=document.createElement("a");a.href=t,a.setAttribute("download","modoo-gamedata.json"),document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(t)}(JSON.stringify({list:t,option:s,games:t.map(e=>c(e.id))}))},children:"내보내기"}),(0,r.jsx)(ep,{onClick:()=>{var t;return null===(t=e.current)||void 0===t?void 0:t.click()},children:"가져오기"})]})]}),(0,r.jsx)("div",{className:"fixed top-[-100px]",children:(0,r.jsx)(R,{type:"file",ref:e,onChange:function(e){if(e.preventDefault(),!e.target.files||0==e.target.files.length||!confirm("게임데이터 가져오기를 하면 이전데이터는 모두 삭제되고 가져온 데이터로 대체됩니다. 계속하시겠습니까?"))return;let t=e.target.files[0],s=new FileReader;s.onloadend=()=>{let e=JSON.parse(s.result);n(e.option),a(e.list),e.games.forEach(e=>{m(e.id,e)})},s.readAsText(t),e.target.value=""}})})]})}function eg(){return(0,r.jsxs)("div",{className:"max-w-[640px] mx-auto pb-20",children:[(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("div",{className:"px-10",children:(0,r.jsx)("img",{src:"/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,r.jsx)("h1",{className:"text-2xl",children:"모두의 마블 점수 계산기"}),(0,r.jsxs)("div",{className:"mt-10 flex justify-center gap-1",children:[(0,r.jsx)(eh,{}),(0,r.jsx)(ej,{})]})]}),(0,r.jsx)(ee,{})]})}ep.displayName=em.ck.displayName,y.forwardRef((e,t)=>{let{className:a,children:s,checked:l,...n}=e;return(0,r.jsxs)(em.oC,{ref:t,className:k("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),checked:l,...n,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(em.wU,{children:(0,r.jsx)(ea.nQG,{className:"h-4 w-4"})})}),s]})}).displayName=em.oC.displayName,y.forwardRef((e,t)=>{let{className:a,children:s,...l}=e;return(0,r.jsxs)(em.Rk,{ref:t,className:k("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),...l,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(em.wU,{children:(0,r.jsx)(ea.jXb,{className:"h-4 w-4 fill-current"})})}),s]})}).displayName=em.Rk.displayName,y.forwardRef((e,t)=>{let{className:a,inset:s,...l}=e;return(0,r.jsx)(em.__,{ref:t,className:k("px-2 py-1.5 text-sm font-semibold",s&&"pl-8",a),...l})}).displayName=em.__.displayName,y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(em.Z0,{ref:t,className:k("-mx-1 my-1 h-px bg-muted",a),...s})}).displayName=em.Z0.displayName;var ey=a(4340);function eN(e){let{children:t}=e;return(0,r.jsx)("div",{className:"my-10 mx-5",children:(0,r.jsx)("ul",{className:"px-4 w-full flex flex-col",children:t})})}function ev(e){let{title:t,children:a}=e;return(0,r.jsxs)("li",{className:"grid justify-center items-center flex-shrink-0",style:{fontSize:12,gridTemplateRows:"10px 20px 10px 1fr",gridTemplateColumns:"20px 1fr"},children:[(0,r.jsx)("hr",{style:{height:10,width:"0.25rem"},className:"col-start-1 row-start-1 justify-self-center bg-black opacity-80"}),(0,r.jsx)("div",{className:"col-start-2 row-start-2 p-1",children:t}),(0,r.jsx)("div",{className:"col-start-1 row-start-2",children:(0,r.jsx)(ey.Z,{className:"h-5 w-5"})}),(0,r.jsx)("div",{className:"col-start-2 row-start-4 p-1",children:a}),(0,r.jsx)("hr",{style:{height:"100%",width:"0.25rem"},className:"col-start-1 row-start-3 row-end-5 justify-self-center bg-black opacity-80"})]})}let eb=new Intl.NumberFormat;var ew=a(3915);function ek(e){let{amount:t}=e;return(0,r.jsx)("b",{className:t>0?"text-blue-400":"text-red-400",children:eb.format(t)})}function eC(e){let{history:t}=e,[a,s]=(0,l.KO)(j);return(0,r.jsxs)(L,{children:[(0,r.jsx)(Y,{asChild:!0,children:(0,r.jsx)(ew.Z,{className:"h-4 w-4 ml-1 cursor-pointer text-foreground/60 hover:text-primary"})}),(0,r.jsxs)(M,{children:[(0,r.jsx)(Q,{children:"기록을 되돌리시겠습니까?"}),(0,r.jsxs)(B,{children:[(0,r.jsx)(X,{onClick:function(){if(!a)return;console.log("".concat(t.toName," -> ").concat(t.fromName," : ").concat(t.amount));let e=[...a.players];"bank"!=t.toId&&V(e,t.toId,-t.amount),"bank"!=t.fromId&&V(e,t.fromId,t.amount);let r=[...a.histories];r.shift();let l=F(e);s({...a,players:e,histories:r,topPlayerId:l.id})},children:"확인"}),(0,r.jsx)(q,{children:"취소"})]})]})]})}function eD(){let e=(0,l.Dv)(j);return e?(0,r.jsx)(eN,{children:e.histories.map((t,a)=>(0,r.jsx)(ev,{title:G(new Date(t.time)),children:(0,r.jsxs)("div",{className:"flex gap-1",children:[(0,r.jsxs)("span",{children:[t.fromName," -> ",t.toName," :"]}),(0,r.jsx)(ek,{amount:t.amount}),e.status!=s.ENDED&&0==a&&(0,r.jsx)(eC,{history:t})]})},a))}):(0,r.jsx)(r.Fragment,{})}var eR=a(6493),ez=a(7586),eS=a(7309),eO=a(4429);let eE=eO.fC;eO.ZA;let eI=eO.B4,eZ=y.forwardRef((e,t)=>{let{className:a,children:s,...l}=e;return(0,r.jsxs)(eO.xz,{ref:t,className:k("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",a),...l,children:[s,(0,r.jsx)(eO.JO,{asChild:!0,children:(0,r.jsx)(ea.jnn,{className:"h-4 w-4 opacity-50"})})]})});eZ.displayName=eO.xz.displayName;let e_=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(eO.u_,{ref:t,className:k("flex cursor-default items-center justify-center py-1",a),...s,children:(0,r.jsx)(ea.g8U,{})})});e_.displayName=eO.u_.displayName;let eV=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(eO.$G,{ref:t,className:k("flex cursor-default items-center justify-center py-1",a),...s,children:(0,r.jsx)(ea.v4q,{})})});eV.displayName=eO.$G.displayName;let eF=y.forwardRef((e,t)=>{let{className:a,children:s,position:l="popper",...n}=e;return(0,r.jsx)(eO.h_,{children:(0,r.jsxs)(eO.VY,{ref:t,className:k("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===l&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",a),position:l,...n,children:[(0,r.jsx)(e_,{}),(0,r.jsx)(eO.l_,{className:k("p-1","popper"===l&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:s}),(0,r.jsx)(eV,{})]})})});eF.displayName=eO.VY.displayName,y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(eO.__,{ref:t,className:k("px-2 py-1.5 text-sm font-semibold",a),...s})}).displayName=eO.__.displayName;let eT=y.forwardRef((e,t)=>{let{className:a,children:s,...l}=e;return(0,r.jsxs)(eO.ck,{ref:t,className:k("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),...l,children:[(0,r.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(eO.wU,{children:(0,r.jsx)(ea.nQG,{className:"h-4 w-4"})})}),(0,r.jsx)(eO.eT,{children:s})]})});function eA(e){let{remain:t}=e;return(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)("div",{className:"text-center",children:"금액"}),t&&(0,r.jsxs)("div",{className:"text-center text-foreground/60",children:["(",Number(t).toLocaleString()," 원)"]})]})}function eU(e){let{player:t}=e,[a,s]=(0,y.useState)(!1),[d,o]=(0,y.useState)(3e5),[c,m]=(0,y.useState)("bank"),x=(0,l.Dv)(j),u=d>0,f=(0,eS.lV)((0,y.useCallback)((e,a,s,r)=>{let l;let n=e(j);if(!n){console.log("NO currentGame");return}let i=[...n.players];V(i,t.id,-r),l="bank"!=s?V(i,s,r).name:"은행";let d=[{fromId:t.id,fromName:t.name,toId:s,toName:l,amount:r,time:new Date},...n.histories],o=F(i);a(j,{...n,players:i,histories:d,topPlayerId:o.id})},[t]));return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(es,{open:a,onOpenChange:s,children:[(0,r.jsx)(et.hg,{children:(0,r.jsx)(eR.Z,{className:"w-8 h-8 p-1 text-blue-400 hover:text-blue-600"})}),(0,r.jsxs)(ei,{children:[(0,r.jsx)(ed,{children:(0,r.jsxs)(et.$N,{children:[t.name," : 돈 보내기"]})}),(0,r.jsxs)(i,{onSubmit:function(e){e.preventDefault(),f(c,d),s(!1)},children:[(0,r.jsx)(n,{label:"보낼 곳",children:(0,r.jsxs)(eE,{value:c,onValueChange:e=>m(e),children:[(0,r.jsx)(eZ,{children:(0,r.jsx)(eO.ki,{placeholder:"보낼 곳"})}),(0,r.jsxs)(eF,{children:[(0,r.jsx)(eT,{value:"bank",children:"은행"}),x&&x.players.filter(e=>e.id!=t.id).map(e=>(0,r.jsx)(eT,{value:e.id,children:e.name},e.id))]})]})}),(0,r.jsx)(n,{label:(0,r.jsx)(eA,{remain:t.money-d}),children:(0,r.jsx)(E,{value:d,onChange:o})}),(0,r.jsx)(n,{children:(0,r.jsxs)(D,{type:"submit",className:"w-full",size:"lg",variant:"primary",disabled:!u,children:[(0,r.jsx)(eR.Z,{className:"w-6 h-6"})," 보내기"]})})]})]})]})})}function eG(e){let{player:t}=e,[a,s]=(0,y.useState)(!1),[l,d]=(0,y.useState)(3e5),o=l>0,c=(0,eS.lV)((0,y.useCallback)((e,a)=>{let s=e(j);if(!s){console.log("NO currentGame");return}let r=[...s.players];V(r,t.id,l);let n=[{fromId:"bank",fromName:"은행",toId:t.id,toName:t.name,amount:l,time:new Date},...s.histories],i=F(r);a(j,{...s,players:r,histories:n,topPlayerId:i.id})},[t,l]));return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(es,{open:a,onOpenChange:s,children:[(0,r.jsx)(et.hg,{children:(0,r.jsx)(ez.Z,{className:"w-8 h-8 p-1 text-red-400 hover:text-red-600"})}),(0,r.jsxs)(ei,{children:[(0,r.jsx)(ed,{children:(0,r.jsxs)(et.$N,{children:[t.name," : 은행에서 돈 받기"]})}),(0,r.jsxs)(i,{onSubmit:function(e){e.preventDefault(),c(),s(!1)},children:[(0,r.jsx)(n,{label:(0,r.jsx)(eA,{remain:t.money+l}),children:(0,r.jsx)(E,{value:l,onChange:d})}),(0,r.jsx)(n,{children:(0,r.jsxs)(D,{type:"submit",className:"w-full",variant:"primary",size:"lg",disabled:!o,children:[(0,r.jsx)(ez.Z,{className:"w-6 h-6"})," 받기"]})})]})]})]})})}eT.displayName=eO.ck.displayName,y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(eO.Z0,{ref:t,className:k("-mx-1 my-1 h-px bg-muted",a),...s})}).displayName=eO.Z0.displayName;var eP=a(7788);function eK(e){var t;let{player:a}=e,n=(0,l.Dv)(j);return n?(0,r.jsxs)("div",{className:"flex min-w-0 gap-x-4 w-full",children:[(0,r.jsxs)("div",{className:"min-w-0 flex-auto grow",children:[(0,r.jsxs)("div",{className:"flex w-full gap-x-2",children:[n.topPlayerId==a.id&&(0,r.jsx)(eP.Z,{className:"h-5 w-5 text-red-400"}),(0,r.jsx)("p",{className:"text-xl font-semibold leading-6",children:a.name})]}),(0,r.jsx)("p",{className:"mt-2 truncate text-3xl leading-8 text-yellow-100",children:(t=a.money,eb.format(t))})]}),n.status!=s.ENDED&&(0,r.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-1",children:[(0,r.jsx)(eU,{player:a}),(0,r.jsx)(eG,{player:a})]})]}):(0,r.jsx)(r.Fragment,{})}function eL(){let e=(0,l.Dv)(j);return e?(0,r.jsx)("div",{className:"flex justify-center items-center my-5 mx-5",children:(0,r.jsx)("ul",{className:"divide-y w-full max-w-[640px] px-4 py-2 rounded-xl border",children:e.players.map(e=>(0,r.jsx)("li",{className:"flex justify-between gap-x-6 py-6",children:(0,r.jsx)(eK,{player:e})},e.id))})}):(0,r.jsx)(r.Fragment,{})}let eY=(0,v.j)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive"}},defaultVariants:{variant:"default"}}),eJ=y.forwardRef((e,t)=>{let{className:a,variant:s,...l}=e;return(0,r.jsx)("div",{ref:t,role:"alert",className:k(eY({variant:s}),a),...l})});eJ.displayName="Alert";let e$=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("h5",{ref:t,className:k("mb-1 font-medium leading-none tracking-tight",a),...s})});e$.displayName="AlertTitle";let eM=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:k("text-sm [&_p]:leading-relaxed",a),...s})});eM.displayName="AlertDescription";let eB=y.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("textarea",{className:k("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",a),ref:t,...s})});eB.displayName="Textarea";var eQ=a(9350),eW=a(2068);function eX(){let[e,t]=(0,y.useState)(!1),a=(0,eS.oC)(j),d=(0,l.Dv)(j),[o,c]=(0,y.useState)(null==d?void 0:d.topPlayerId),[x,u]=(0,y.useState)("");return d?(0,r.jsxs)(es,{open:e,onOpenChange:function(e){t(e),c(null==d?void 0:d.topPlayerId)},children:[(0,r.jsx)(er,{asChild:!0,children:(0,r.jsxs)(D,{type:"button",size:"xl",variant:"primary",children:[(0,r.jsx)(eQ.Z,{className:"h-6 w-6"})," 게임 종료"]})}),(0,r.jsxs)(ei,{children:[(0,r.jsx)(ed,{children:(0,r.jsx)(eo,{children:"게임을 종료하시겠습니까?"})}),(0,r.jsxs)(i,{onSubmit:function(e){e.preventDefault(),t(!1),m(d.id,{...d,status:s.ENDED,topPlayerId:o,message:x}),a()},children:[(0,r.jsx)(n,{label:"승리",children:(0,r.jsxs)(eE,{value:o,onValueChange:e=>c(e),children:[(0,r.jsx)(eZ,{children:(0,r.jsx)(eI,{placeholder:"승리한 참여자"})}),(0,r.jsx)(eF,{children:d&&d.players.map(e=>(0,r.jsx)(eT,{value:e.id,children:e.name},e.id))})]})}),(0,r.jsx)(n,{label:"설명",children:(0,r.jsx)(eB,{placeholder:"게임에 대해서 설명을 남겨보세요.",value:x,onChange:e=>u(e.target.value)})}),(0,r.jsx)(n,{children:(0,r.jsxs)(D,{type:"submit",size:"xl",variant:"primary",className:"w-full",disabled:void 0==o,children:[(0,r.jsx)(eQ.Z,{className:"h-6 w-6"})," 게임 종료"]})})]})]})]}):(0,r.jsx)(r.Fragment,{})}function eq(){let e=(0,eS.oC)(j),t=(0,l.Dv)(j);return t&&t.status==s.ENDED?(0,r.jsxs)(D,{type:"button",size:"xl",variant:"primary",onClick:e,children:[(0,r.jsx)(eW.Z,{className:"h-6 w-6"})," 처음으로"]}):(0,r.jsx)(eX,{})}function eH(){let e=(0,l.Dv)(j);return e&&e.status==s.ENDED&&e.message?(0,r.jsxs)(eJ,{children:[(0,r.jsx)(eP.Z,{className:"h-4 w-4 text-red-400"}),(0,r.jsx)(e$,{children:"종료된 게임입니다"}),(0,r.jsx)(eM,{children:e.message})]}):(0,r.jsx)(r.Fragment,{})}function e0(){return(0,r.jsxs)("div",{className:"mx-5 mb-10",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)("div",{className:"px-10",children:(0,r.jsx)("img",{src:"/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,r.jsx)("h1",{className:"text-2xl mt-2",children:"모두의 마블 점수 계산기"})]}),(0,r.jsx)("div",{className:"my-5 flex flex-col items-center",children:(0,r.jsx)(eq,{})}),(0,r.jsx)(eH,{})]})}function e1(){return(0,r.jsxs)("div",{className:"max-w-[640px] mx-auto pb-20",children:[(0,r.jsx)(e0,{}),(0,r.jsx)(eL,{}),(0,r.jsx)(eD,{})]})}function e4(){return((0,l.KO)(h),(0,l.KO)(p),(0,l.Dv)(j))?(0,r.jsx)(e1,{}):(0,r.jsx)(eg,{})}function e5(){return(0,r.jsx)(l.zt,{children:(0,r.jsx)(e4,{})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[310,231,256,130,215,744],()=>t(8588)),_N_E=e.O()}]);