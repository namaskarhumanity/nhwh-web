import{j as e,N as n,r as i}from"./index-CeK3hHNR.js";import{f as d}from"./index-C2llxLln.js";import{c as s}from"./createLucideIcon-C8cvsOFi.js";import{U as c}from"./users-D7kdOZr2.js";/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=s("Headset",[["path",{d:"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",key:"12oyoe"}],["path",{d:"M21 16v2a4 4 0 0 1-4 4h-5",key:"1x7m43"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=s("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("IndianRupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=s("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=s("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=s("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("UserRoundCheck",[["path",{d:"M2 21a8 8 0 0 1 13.292-6",key:"bjp14o"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]]),g=[{to:"/dashboard",label:"Home",icon:d},{to:"/donations",label:"Donations",icon:p},{to:"/users",label:"Users",icon:c},{to:"/volunteers",label:"Volunteers",icon:u},{to:"/messages",label:"Inbox",icon:b},{to:"/volunteer-email-template",label:"Email Template",icon:y},{to:"/manage-program",label:"Program",icon:x},{to:"/manage-team",label:"Team",icon:m}],j=({isOpen:l,onClose:t})=>e.jsx("aside",{className:`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${l?"translate-x-0":"-translate-x-full"}`,children:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsxs("div",{className:"border-b border-slate-200 px-5 py-4",children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-slate-500",children:"NHWS"}),e.jsx("h2",{className:"mt-1 text-lg font-bold text-slate-800",children:"Admin Dashboard"})]}),e.jsxs("nav",{className:"flex-1 overflow-y-auto px-3 py-4",children:[e.jsx("ul",{className:"space-y-2 font-medium",children:g.map(a=>{const o=a.icon;return e.jsx("li",{children:e.jsxs(n,{to:a.to,onClick:t,className:({isActive:r})=>`group flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${r?"bg-slate-900 text-white":"text-slate-700 hover:bg-slate-100"}`,children:[e.jsx(o,{className:"h-4 w-4"}),e.jsx("span",{className:"ml-3",children:a.label})]})},a.to)})}),e.jsx("div",{className:"mt-6 border-t border-slate-200 pt-4",children:e.jsxs(n,{to:"/",onClick:t,className:"group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100",children:[e.jsx(h,{className:"h-4 w-4"}),e.jsx("span",{className:"ml-3",children:"Go to Home"})]})})]}),e.jsx("div",{className:"border-t border-slate-200 px-4 py-3 text-xs text-slate-500",children:"Manage users, donations and content."})]})}),w=({children:l})=>{const[t,a]=i.useState(!1);return e.jsxs("div",{className:"min-h-screen bg-slate-100",children:[e.jsx(j,{isOpen:t,onClose:()=>a(!1)}),t&&e.jsx("button",{type:"button","aria-label":"Close menu",className:"fixed inset-0 z-30 bg-slate-900/50 lg:hidden",onClick:()=>a(!1)}),e.jsxs("div",{className:"lg:pl-64",children:[e.jsxs("header",{className:"sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden",children:[e.jsx("p",{className:"text-sm font-semibold tracking-wide text-slate-700",children:"Admin Panel"}),e.jsx("button",{type:"button",className:"inline-flex items-center rounded-lg border border-slate-300 bg-white p-2 text-slate-700",onClick:()=>a(!0),"aria-label":"Open menu",children:e.jsx(k,{className:"h-5 w-5"})})]}),e.jsx("main",{className:"px-4 py-5 sm:px-6 sm:py-6 lg:px-8",children:l})]})]})};export{p as I,w as L};
