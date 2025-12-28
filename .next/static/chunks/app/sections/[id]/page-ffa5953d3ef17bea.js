(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[693],{2898:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(2265),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),c=(e,t)=>{let n=(0,r.forwardRef)(({color:n="currentColor",size:c=24,strokeWidth:a=2,absoluteStrokeWidth:u,className:l="",children:o,...d},h)=>(0,r.createElement)("svg",{ref:h,...i,width:c,height:c,stroke:n,strokeWidth:u?24*Number(a)/Number(c):a,className:["lucide",`lucide-${s(e)}`,l].join(" "),...d},[...t.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(o)?o:[o]]));return n.displayName=`${e}`,n}},1798:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(2898).Z)("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]])},6539:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(2898).Z)("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]])},1295:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(2898).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},6142:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(2898).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},2741:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(2898).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])},3039:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(2898).Z)("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]])},2564:function(e,t,n){Promise.resolve().then(n.bind(n,3032))},3032:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(7437),i=n(2265),s=n(9008),c=n(2201),a=n(1396),u=n.n(a);function l(e){let{params:t}=e,{id:n}=t,[a,l]=(0,i.useState)(null),[o,d]=(0,i.useState)(!0),h=async()=>{d(!0);try{let e=await fetch("/api/sections"),t=await e.json(),r=Array.isArray(t)?t.find(e=>String(e.id)===String(n)):null;l(r||null)}catch(e){l(null)}finally{d(!1)}};return(0,i.useEffect)(()=>{function e(e){"sectionsSync"===e.key&&h()}return h(),window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[n]),(0,r.jsxs)("main",{className:"min-h-screen bg-white pt-16",children:[(0,r.jsx)(s.default,{}),(0,r.jsx)("section",{className:"py-20",children:(0,r.jsx)("div",{className:"max-w-4xl mx-auto px-4",children:o?(0,r.jsx)("div",{className:"py-20 text-center",children:"Memuat..."}):a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h1",{className:"text-3xl font-bold mb-6",children:a.name}),(0,r.jsx)("div",{className:"prose",children:(0,r.jsx)("p",{children:a.content})})]}):(0,r.jsxs)("div",{className:"py-20 text-center",children:["Section tidak ditemukan. ",(0,r.jsx)(u(),{href:"/admin",children:"Kembali ke admin"})]})})}),(0,r.jsx)(c.default,{})]})}}},function(e){e.O(0,[176,135,971,938,744],function(){return e(e.s=2564)}),_N_E=e.O()}]);