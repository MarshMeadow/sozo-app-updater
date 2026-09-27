import{c as i,r as y,j as o}from"./index-Bs5FRv9-.js";/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};r.node;const u=i(r);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d={name:"circle-question-mark",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["help-circle","circle-help"]};d.node;const x=i(d);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};p.node;const h=i(p);function s(t){const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{document.execCommand("copy")}catch{}document.body.removeChild(e)}function C({text:t,label:e}){const[a,c]=y.useState(!1),l=async()=>{var n;try{(n=navigator.clipboard)!=null&&n.writeText?await navigator.clipboard.writeText(t):s(t),c(!0),window.setTimeout(()=>c(!1),1600)}catch{try{s(t),c(!0),window.setTimeout(()=>c(!1),1600)}catch{}}};return o.jsxs("button",{type:"button",className:`copy-text${a?" is-copied":""}`,onClick:l,title:a?"Copied!":"Tap to copy","aria-label":e??`Copy ${t}`,children:[o.jsx("code",{children:t}),a?o.jsx(u,{size:13,"aria-hidden":"true"}):o.jsx(h,{size:13,"aria-hidden":"true"})]})}export{x as C,C as a};
