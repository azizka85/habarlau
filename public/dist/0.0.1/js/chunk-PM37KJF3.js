var c="/",u=5;var s=class{content=null;async replaceContent(t){await this.content?.unmount?.(),this.content?.elem?.replaceWith(t.elem||""),await t.mount?.(),this.content=t}};function o(e){let t=[];for(let n of Object.keys(e))t.push(`${n}=${e[n]}`);return t.join("&")}function i(e,t,n){let r={...e};return r[t]=n,o(r)}function g(e,t){let n={...e};return t in n?(delete n[t],o(n)):i(n,t,"1")}function a(e){if(!e)return e;let t=e.split("");return t[0].toUpperCase()+t.slice(1).join("").toLowerCase()}function f(e){return e.split("-").map(n=>a(n)).join("")}export{c as a,u as b,s as c,g as d,f as e};