(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[151],{577:function(e,t,s){Promise.resolve().then(s.bind(s,3216))},3216:function(e,t,s){"use strict";s.d(t,{default:function(){return eJ}});var a,r,l=s(7437),n=s(3742);function i(e){let{label:t,children:s}=e;return(0,l.jsxs)("div",{className:"px-0 py-6 grid grid-cols-3 gap-4 text-sm",children:[(0,l.jsx)("dt",{className:"flex justify-center items-start pt-2",children:t}),(0,l.jsx)("dd",{className:"col-span-2 text-start",children:s})]})}function d(e){let{children:t,onSubmit:s}=e;return(0,l.jsx)("form",{className:"mt-6 border-t",onSubmit:s,children:(0,l.jsx)("dl",{className:"divide-y",children:t})})}var o=s(5265),c=s(1349);function m(e,t){"undefined"!=typeof localStorage&&localStorage.setItem("modooGame-".concat(e),JSON.stringify(t))}var x=s(7443),u=s(1741);let f=(0,u.O4)("modooGameOption",{money:2e6,players:[{name:"참가자 1"},{name:"참가자 2"}]}),p=(0,x.v)((e,t)=>{let s=e(j),a=e(g);s&&0>a.findIndex(e=>e.id==s.id)&&t(g,[...a,{id:s.id,started:s.started}])}),h=(0,x.v)(e=>{let t=e(j);t&&m(t.id,t)}),j=(0,u.rw)(void 0),g=(0,u.O4)("modooGames",[]);var y=s(2265),N=s(1538),v=s(2218),b=s(4839),w=s(6164);function k(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,w.m6)((0,b.W)(t))}let D=(0,v.j)("inline-flex items-center gap-1 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",danger:"text-primary-foreground shadow-sm bg-red-500 hover:bg-red-700",primary:"bg-primary text-primary-foreground shadow hover:bg-primary/90",accent:"bg-accent text-accent-foreground shadow-sm hover:bg-accent/80"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-sm px-2 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",xl:"h-12 rounded-md px-14",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),C=y.forwardRef((e,t)=>{let{className:s,variant:a,size:r,asChild:n=!1,...i}=e,d=n?N.g7:"button";return(0,l.jsx)(d,{className:k(D({variant:a,size:r,className:s})),ref:t,...i})});C.displayName="Button";let z=y.forwardRef((e,t)=>{let{className:s,type:a,...r}=e;return(0,l.jsx)("input",{type:a,className:k("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...r})});function S(){let[e,t]=(0,n.KO)(f);return(0,l.jsxs)("div",{className:"text-start grid gap-4",children:[(0,l.jsxs)("div",{className:"flex items-center gap-4",children:[(0,l.jsxs)("span",{children:[e.players.length," 명"]}),(0,l.jsxs)(C,{type:"button",size:"xs",onClick:function(){t({...e,players:[...e.players,{name:"참여자 ".concat(e.players.length+1)}]})},children:[(0,l.jsx)(o.Z,{className:"w-4 h-4"})," 추가"]})]}),e.players.map((s,a)=>(0,l.jsxs)("div",{className:"flex items-center justify-center w-full gap-1",children:[(0,l.jsx)(z,{value:s.name,onChange:s=>(function(s,a){let r=[...e.players];r.splice(s,1,{name:a}),t({...e,players:r})})(a,s.target.value)}),(0,l.jsx)(C,{type:"button",size:"sm",variant:"danger",onClick:()=>(function(s){let a=[...e.players];a.splice(s,1),t({...e,players:a})})(a),children:(0,l.jsx)(c.Z,{className:"w-4 h-4"})})]},a))]})}function R(e){let{onClick:t}=e;return(0,l.jsx)(C,{type:"button",size:"sm",onClick:t,children:"0 원"})}function I(e){let{value:t,onClick:s}=e,a=(0,y.useMemo)(()=>t>0?"+".concat(t.toLocaleString()):t.toLocaleString(),[t]),r=(0,y.useMemo)(()=>t>0?"bg-blue-400 hover:bg-blue-600":"bg-red-400 hover:bg-red-600",[t]);return(0,l.jsxs)(C,{type:"button",size:"sm",className:r,onClick:()=>s(t),children:[a,"원"]})}function O(e){let{value:t,onChange:s,usePreset:a=!0,preset:r=[1e5,1e4,1e3,-1e5,-1e4,-1e3]}=e,n=(0,y.useMemo)(()=>Number(t).toLocaleString(),[t]);return(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsxs)("div",{className:"flex w-full items-center",children:[(0,l.jsx)(z,{type:"text",className:"text-xl",tabIndex:-1,value:n,onChange:e=>{s(Number(e.target.value.replaceAll(",","")))}}),(0,l.jsx)("div",{className:"flex justify-center items-center w-14 bg-base-300",children:"원"})]}),a&&(0,l.jsxs)("div",{className:"flex flex-wrap gap-2 mt-4",children:[r.map(e=>(0,l.jsx)(I,{value:e,onClick:a=>s(t+e)},e)),(0,l.jsx)(R,{onClick:()=>s(0)})]})]})}function E(){let[e,t]=(0,n.KO)(f);return(0,l.jsx)(O,{value:e.money,onChange:function(s){t({...e,money:s})},usePreset:!1})}z.displayName="Input";var Z=s(2126),_=s(2290);function V(){let e=(0,n.b9)(j),t=(0,n.Dv)(f);return(0,l.jsxs)(d,{onSubmit:function(s){s.preventDefault(),e({id:(0,_.x0)(),started:new Date,option:t,players:t.players.map(e=>({id:(0,_.x0)(),money:t.money,name:e.name})),histories:[],status:r.STARTED})},children:[(0,l.jsx)(i,{label:"시작금액",children:(0,l.jsx)(E,{})}),(0,l.jsx)(i,{label:"참여자",children:(0,l.jsx)(S,{})}),(0,l.jsx)(i,{children:(0,l.jsxs)(C,{type:"submit",className:"w-full",variant:"primary",size:"lg",children:[(0,l.jsx)(Z.Z,{className:"h-6 w-6"})," 시작하기"]})})]})}(a=r||(r={}))[a.STARTED=0]="STARTED",a[a.ENDED=1]="ENDED";var F=s(9450);function T(e){return F.ou.fromJSDate(e).toFormat("T")}var A=s(7284),G=s(6669);G.fC,G.xz;let P=G.h_,Y=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(G.aV,{className:k("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...a,ref:t})});Y.displayName=G.aV.displayName;let $=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsxs)(P,{children:[(0,l.jsx)(Y,{}),(0,l.jsx)(G.VY,{ref:t,className:k("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...a})]})});$.displayName=G.VY.displayName;let J=e=>{let{className:t,...s}=e;return(0,l.jsx)("div",{className:k("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...s})};J.displayName="AlertDialogFooter";let K=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(G.Dx,{ref:t,className:k("text-lg font-semibold",s),...a})});K.displayName=G.Dx.displayName;let M=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(G.dk,{ref:t,className:k("text-sm text-muted-foreground",s),...a})});M.displayName=G.dk.displayName;let U=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(G.aU,{ref:t,className:k(D(),s),...a})});U.displayName=G.aU.displayName;let L=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(G.$j,{ref:t,className:k(D({variant:"outline"}),"mt-2 sm:mt-0",s),...a})});function B(e){let{onRemove:t}=e;return(0,l.jsxs)(G.aR,{children:[(0,l.jsx)(G.vW,{asChild:!0,children:(0,l.jsx)(C,{size:"sm",variant:"danger",children:(0,l.jsx)(A.Z,{className:"h-4 w-4"})})}),(0,l.jsxs)($,{children:[(0,l.jsx)(K,{children:"게임기록을 제거하시겠습니까?"}),(0,l.jsx)(M,{children:"게임기록 제거는 되돌릴 수 없습니다."}),(0,l.jsxs)(J,{children:[(0,l.jsx)(U,{onClick:t,children:"확인"}),(0,l.jsx)(L,{children:"취소"})]})]})]})}function W(){let[e,t]=(0,n.KO)(g),s=(0,n.b9)(j);return 0==e.length?(0,l.jsx)(l.Fragment,{}):(0,l.jsx)("div",{className:"my-5 mx-5",children:(0,l.jsx)("ul",{className:"w-full",children:e.toReversed().map(a=>{var r;return(0,l.jsx)("li",{className:"flex justify-between rounded-xl py-6 px-6 text-slate-400 transition-all shadow-lg hover:shadow-neutral-900 mb-4",children:(0,l.jsxs)("div",{className:"flex min-w-0 w-full",children:[(0,l.jsx)("div",{className:"min-w-0 flex-auto grow",children:(0,l.jsxs)("p",{className:"text-xl font-semibold leading-6",children:[(0,l.jsx)("span",{className:"mr-1 text-3xl text-yellow-600",children:(r=new Date(a.started),F.ou.fromJSDate(r).toFormat("yyyy-MM-dd"))}),(0,l.jsx)("span",{className:"text-sm mr-1 text-yellow-700",children:T(new Date(a.started))}),(0,l.jsx)("span",{className:"text-md",children:"에 시작한 게임"})]})}),(0,l.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-2",children:[(0,l.jsx)(C,{size:"sm",className:"text-xs",variant:"secondary",onClick:()=>{s(function(e){if("undefined"==typeof localStorage)return null;let t=localStorage.getItem("modooGame-".concat(e));return t?JSON.parse(t):null}(a.id))},children:"게임보기"}),(0,l.jsx)(B,{onRemove:()=>{var s;t([...e].filter(e=>e.id!=a.id)),s=a.id,"undefined"!=typeof localStorage&&localStorage.removeItem("modooGame-".concat(s))}})]})]})},a.id)})})})}L.displayName=G.$j.displayName;var q=s(9405),H=s(4867);let Q=q.fC,X=q.xz,ee=q.h_;q.x8;let et=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(q.aV,{ref:t,className:k("fixed inset-0 z-50 bg-black/80 backdrop-blur-sm  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...a})});et.displayName=q.aV.displayName;let es=y.forwardRef((e,t)=>{let{className:s,children:a,...r}=e;return(0,l.jsxs)(ee,{children:[(0,l.jsx)(et,{}),(0,l.jsxs)(q.VY,{ref:t,className:k("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...r,children:[a,(0,l.jsxs)(q.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,l.jsx)(H.Pxu,{className:"h-4 w-4"}),(0,l.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});es.displayName=q.VY.displayName;let ea=e=>{let{className:t,...s}=e;return(0,l.jsx)("div",{className:k("flex flex-col space-y-1.5 text-center sm:text-left",t),...s})};ea.displayName="DialogHeader";let er=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(q.Dx,{ref:t,className:k("text-lg font-semibold leading-none tracking-tight",s),...a})});er.displayName=q.Dx.displayName;let el=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(q.dk,{ref:t,className:k("text-sm text-muted-foreground",s),...a})});function en(){let[e,t]=(0,y.useState)(!1);return(0,l.jsxs)("div",{className:"max-w-[640px] mx-auto mb-20",children:[(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("div",{className:"px-10",children:(0,l.jsx)("img",{src:"/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,l.jsx)("h1",{className:"text-2xl",children:"모두의 마블 점수 계산기"}),(0,l.jsx)("div",{className:"mt-10",children:(0,l.jsxs)(Q,{open:e,onOpenChange:t,children:[(0,l.jsx)(X,{asChild:!0,children:(0,l.jsxs)(C,{size:"xl",variant:"primary",children:[(0,l.jsx)(Z.Z,{className:"h-6 w-6"})," 새로운 게임 시작하기"]})}),(0,l.jsxs)(es,{children:[(0,l.jsxs)(ea,{children:[(0,l.jsx)(er,{children:"새로운 게임 시작하기"}),(0,l.jsx)(el,{children:"새로운 게임을 시작합니다. 시작 옵션을 정해주세요."})]}),(0,l.jsx)(V,{})]})]})})]}),(0,l.jsx)(W,{})]})}el.displayName=q.dk.displayName;var ei=s(4340);function ed(e){let{children:t}=e;return(0,l.jsx)("div",{className:"my-10 mx-5",children:(0,l.jsx)("ul",{className:"px-4 w-full flex flex-col",children:t})})}function eo(e){let{title:t,children:s}=e;return(0,l.jsxs)("li",{className:"grid justify-center items-center flex-shrink-0",style:{fontSize:12,gridTemplateRows:"10px 20px 10px 1fr",gridTemplateColumns:"20px 1fr"},children:[(0,l.jsx)("hr",{style:{height:10,width:"0.25rem"},className:"col-start-1 row-start-1 justify-self-center bg-black opacity-80"}),(0,l.jsx)("div",{className:"col-start-2 row-start-2 p-1",children:t}),(0,l.jsx)("div",{className:"col-start-1 row-start-2",children:(0,l.jsx)(ei.Z,{className:"h-5 w-5"})}),(0,l.jsx)("div",{className:"col-start-2 row-start-4 p-1",children:s}),(0,l.jsx)("hr",{style:{height:"100%",width:"0.25rem"},className:"col-start-1 row-start-3 row-end-5 justify-self-center bg-black opacity-80"})]})}let ec=new Intl.NumberFormat;function em(e){let{amount:t}=e;return(0,l.jsx)("b",{className:t>0?"text-blue-400":"text-red-400",children:ec.format(t)})}function ex(){let e=(0,n.Dv)(j);return e?(0,l.jsx)(ed,{children:e.histories.map((e,t)=>(0,l.jsxs)(eo,{title:T(new Date(e.time)),children:[e.fromName," -> ",e.toName," : ",(0,l.jsx)(em,{amount:e.amount})]},t))}):(0,l.jsx)(l.Fragment,{})}var eu=s(6493),ef=s(7586),ep=s(7309),eh=s(9561);let ej=eh.fC;eh.ZA;let eg=eh.B4,ey=y.forwardRef((e,t)=>{let{className:s,children:a,...r}=e;return(0,l.jsxs)(eh.xz,{ref:t,className:k("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",s),...r,children:[a,(0,l.jsx)(eh.JO,{asChild:!0,children:(0,l.jsx)(H.jnn,{className:"h-4 w-4 opacity-50"})})]})});ey.displayName=eh.xz.displayName;let eN=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(eh.u_,{ref:t,className:k("flex cursor-default items-center justify-center py-1",s),...a,children:(0,l.jsx)(H.g8U,{})})});eN.displayName=eh.u_.displayName;let ev=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(eh.$G,{ref:t,className:k("flex cursor-default items-center justify-center py-1",s),...a,children:(0,l.jsx)(H.v4q,{})})});ev.displayName=eh.$G.displayName;let eb=y.forwardRef((e,t)=>{let{className:s,children:a,position:r="popper",...n}=e;return(0,l.jsx)(eh.h_,{children:(0,l.jsxs)(eh.VY,{ref:t,className:k("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===r&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",s),position:r,...n,children:[(0,l.jsx)(eN,{}),(0,l.jsx)(eh.l_,{className:k("p-1","popper"===r&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:a}),(0,l.jsx)(ev,{})]})})});eb.displayName=eh.VY.displayName,y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(eh.__,{ref:t,className:k("px-2 py-1.5 text-sm font-semibold",s),...a})}).displayName=eh.__.displayName;let ew=y.forwardRef((e,t)=>{let{className:s,children:a,...r}=e;return(0,l.jsxs)(eh.ck,{ref:t,className:k("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",s),...r,children:[(0,l.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,l.jsx)(eh.wU,{children:(0,l.jsx)(H.nQG,{className:"h-4 w-4"})})}),(0,l.jsx)(eh.eT,{children:a})]})});function ek(e){return e.reduce((e,t)=>e.money>t.money?e:t)}function eD(e){let{player:t}=e,[s,a]=(0,y.useState)(!1),[r,o]=(0,y.useState)(3e5),[c,m]=(0,y.useState)("bank"),x=(0,n.Dv)(j),u=(0,ep.lV)((0,y.useCallback)((e,s,a,r)=>{let l;function n(e,t,s){let a=e.findIndex(e=>e.id==t),r=e[a];return e.splice(a,1,{...r,money:r.money+s}),r}let i=e(j);if(!i){console.log("NO currentGame");return}let d=[...i.players];n(d,t.id,-r),l="bank"!=a?n(d,a,r).name:"은행";let o=[{fromId:t.id,fromName:t.name,toId:a,toName:l,amount:r,time:new Date},...i.histories],c=ek(d);s(j,{...i,players:d,histories:o,topPlayerId:c.id})},[t]));return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(Q,{open:s,onOpenChange:a,children:[(0,l.jsx)(q.hg,{children:(0,l.jsx)(eu.Z,{className:"w-8 h-8 p-1 text-blue-400 hover:text-blue-600"})}),(0,l.jsxs)(es,{children:[(0,l.jsx)(ea,{children:(0,l.jsxs)(q.$N,{children:[t.name," : 돈 보내기"]})}),(0,l.jsxs)(d,{onSubmit:function(e){e.preventDefault(),u(c,r),a(!1)},children:[(0,l.jsx)(i,{label:"보낼 곳",children:(0,l.jsxs)(ej,{value:c,onValueChange:e=>m(e),children:[(0,l.jsx)(ey,{children:(0,l.jsx)(eh.ki,{placeholder:"보낼 곳"})}),(0,l.jsxs)(eb,{children:[(0,l.jsx)(ew,{value:"bank",children:"은행"}),x&&x.players.filter(e=>e.id!=t.id).map(e=>(0,l.jsx)(ew,{value:e.id,children:e.name},e.id))]})]})}),(0,l.jsx)(i,{label:"금액",children:(0,l.jsx)(O,{value:r,onChange:o})}),(0,l.jsx)(i,{children:(0,l.jsxs)(C,{type:"submit",className:"w-full",size:"lg",variant:"primary",children:[(0,l.jsx)(eu.Z,{className:"w-6 h-6"})," 보내기"]})})]})]})]})})}function eC(e){let{player:t}=e,[s,a]=(0,y.useState)(!1),[r,n]=(0,y.useState)(3e5),o=(0,ep.lV)((0,y.useCallback)((e,s)=>{let a=e(j);if(!a){console.log("NO currentGame");return}let l=a.players,n=l.findIndex(e=>e.id==t.id),i=l[n],d=[...l];d.splice(n,1,{...i,money:i.money+r});let o=[{fromId:"bank",fromName:"은행",toId:t.id,toName:t.name,amount:r,time:new Date},...a.histories],c=ek(d);s(j,{...a,players:d,histories:o,topPlayerId:c.id})},[t,r]));return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(Q,{open:s,onOpenChange:a,children:[(0,l.jsx)(q.hg,{children:(0,l.jsx)(ef.Z,{className:"w-8 h-8 p-1 text-red-400 hover:text-red-600"})}),(0,l.jsxs)(es,{children:[(0,l.jsx)(ea,{children:(0,l.jsxs)(q.$N,{children:[t.name," : 은행에서 돈 받기"]})}),(0,l.jsxs)(d,{onSubmit:function(e){e.preventDefault(),o(),a(!1)},children:[(0,l.jsx)(i,{label:"금액",children:(0,l.jsx)(O,{value:r,onChange:n})}),(0,l.jsx)(i,{children:(0,l.jsxs)(C,{type:"submit",className:"w-full",variant:"primary",size:"lg",children:[(0,l.jsx)(ef.Z,{className:"w-6 h-6"})," 받기"]})})]})]})]})})}ew.displayName=eh.ck.displayName,y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)(eh.Z0,{ref:t,className:k("-mx-1 my-1 h-px bg-muted",s),...a})}).displayName=eh.Z0.displayName;var ez=s(7788);function eS(e){var t;let{player:s}=e,a=(0,n.Dv)(j);return a?(0,l.jsxs)("div",{className:"flex min-w-0 gap-x-4 w-full",children:[(0,l.jsxs)("div",{className:"min-w-0 flex-auto grow",children:[(0,l.jsxs)("div",{className:"flex w-full gap-x-2",children:[a.topPlayerId==s.id&&(0,l.jsx)(ez.Z,{className:"h-5 w-5 text-red-400"}),(0,l.jsx)("p",{className:"text-xl font-semibold leading-6",children:s.name})]}),(0,l.jsx)("p",{className:"mt-2 truncate text-3xl leading-8 text-yellow-100",children:(t=s.money,ec.format(t))})]}),a.status!=r.ENDED&&(0,l.jsxs)("div",{className:"shrink-0 flex flex-row items-center gap-x-1",children:[(0,l.jsx)(eD,{player:s}),(0,l.jsx)(eC,{player:s})]})]}):(0,l.jsx)(l.Fragment,{})}function eR(){let e=(0,n.Dv)(j);return e?(0,l.jsx)("div",{className:"flex justify-center items-center my-5 mx-5",children:(0,l.jsx)("ul",{className:"divide-y w-full max-w-[640px] px-4 py-2 rounded-xl border",children:e.players.map(e=>(0,l.jsx)("li",{className:"flex justify-between gap-x-6 py-6",children:(0,l.jsx)(eS,{player:e})},e.id))})}):(0,l.jsx)(l.Fragment,{})}let eI=(0,v.j)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive"}},defaultVariants:{variant:"default"}}),eO=y.forwardRef((e,t)=>{let{className:s,variant:a,...r}=e;return(0,l.jsx)("div",{ref:t,role:"alert",className:k(eI({variant:a}),s),...r})});eO.displayName="Alert";let eE=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)("h5",{ref:t,className:k("mb-1 font-medium leading-none tracking-tight",s),...a})});eE.displayName="AlertTitle";let eZ=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)("div",{ref:t,className:k("text-sm [&_p]:leading-relaxed",s),...a})});eZ.displayName="AlertDescription";let e_=y.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,l.jsx)("textarea",{className:k("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...a})});e_.displayName="Textarea";var eV=s(9350),eF=s(2068);function eT(){let[e,t]=(0,y.useState)(!1),s=(0,ep.oC)(j),a=(0,n.Dv)(j),[o,c]=(0,y.useState)(null==a?void 0:a.topPlayerId),[x,u]=(0,y.useState)("");return a?(0,l.jsxs)(Q,{open:e,onOpenChange:function(e){t(e),c(null==a?void 0:a.topPlayerId)},children:[(0,l.jsx)(X,{asChild:!0,children:(0,l.jsxs)(C,{type:"button",size:"xl",variant:"primary",children:[(0,l.jsx)(eV.Z,{className:"h-6 w-6"})," 게임 종료"]})}),(0,l.jsxs)(es,{children:[(0,l.jsx)(ea,{children:(0,l.jsx)(er,{children:"게임을 종료하시겠습니까?"})}),(0,l.jsxs)(d,{onSubmit:function(e){e.preventDefault(),t(!1),m(a.id,{...a,status:r.ENDED,topPlayerId:o,message:x}),s()},children:[(0,l.jsx)(i,{label:"승리",children:(0,l.jsxs)(ej,{value:o,onValueChange:e=>c(e),children:[(0,l.jsx)(ey,{children:(0,l.jsx)(eg,{placeholder:"승리한 참여자"})}),(0,l.jsx)(eb,{children:a&&a.players.map(e=>(0,l.jsx)(ew,{value:e.id,children:e.name},e.id))})]})}),(0,l.jsx)(i,{label:"설명",children:(0,l.jsx)(e_,{placeholder:"게임에 대해서 설명을 남겨보세요.",value:x,onChange:e=>u(e.target.value)})}),(0,l.jsx)(i,{children:(0,l.jsxs)(C,{type:"submit",size:"xl",variant:"primary",className:"w-full",disabled:void 0==o,children:[(0,l.jsx)(eV.Z,{className:"h-6 w-6"})," 게임 종료"]})})]})]})]}):(0,l.jsx)(l.Fragment,{})}function eA(){let e=(0,ep.oC)(j),t=(0,n.Dv)(j);return t&&t.status==r.ENDED?(0,l.jsxs)(C,{type:"button",size:"xl",variant:"primary",onClick:e,children:[(0,l.jsx)(eF.Z,{className:"h-6 w-6"})," 처음으로"]}):(0,l.jsx)(eT,{})}function eG(){let e=(0,n.Dv)(j);return e&&e.status==r.ENDED&&e.message?(0,l.jsxs)(eO,{children:[(0,l.jsx)(ez.Z,{className:"h-4 w-4 text-red-400"}),(0,l.jsx)(eE,{children:"종료된 게임입니다"}),(0,l.jsx)(eZ,{children:e.message})]}):(0,l.jsx)(l.Fragment,{})}function eP(){return(0,l.jsxs)("div",{className:"mx-5 mb-10",children:[(0,l.jsxs)("div",{className:"flex flex-col items-center",children:[(0,l.jsx)("div",{className:"px-10",children:(0,l.jsx)("img",{src:"/modoo.png",className:"w-full",alt:"모두의 마블"})}),(0,l.jsx)("h1",{className:"text-2xl mt-2",children:"모두의 마블 점수 계산기"})]}),(0,l.jsx)("div",{className:"my-5 flex flex-col items-center",children:(0,l.jsx)(eA,{})}),(0,l.jsx)(eG,{})]})}function eY(){return(0,l.jsxs)("div",{className:"max-w-[640px] mx-auto mb-20",children:[(0,l.jsx)(eP,{}),(0,l.jsx)(eR,{}),(0,l.jsx)(ex,{})]})}function e$(){return((0,n.KO)(h),(0,n.KO)(p),(0,n.Dv)(j))?(0,l.jsx)(eY,{}):(0,l.jsx)(en,{})}function eJ(){return(0,l.jsx)(n.zt,{children:(0,l.jsx)(e$,{})})}}},function(e){e.O(0,[310,949,971,23,744],function(){return e(e.s=577)}),_N_E=e.O()}]);