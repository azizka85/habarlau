import{a as u,b as m,c as p}from"../../chunk-DURSSFQP.js";import{c as a,d as r,f as i,g as s,h as c}from"../../chunk-33W33KZV.js";var t=class{node=null;scrollTopBtn=null;currScroll=0;static get instance(){return t.page||(t.page=new t),t.page}get elem(){return this.node}async init(l,e){let o=await i(l,e,["main-layout"]);return this.node=o.querySelector('[data-page="home-page"]')||null,r(this.node),this.scrollTopBtn=this.node?.querySelector('[data-button="scroll-top"]')||null,this.scrollTopBtn?.addEventListener("click",()=>{window.layouts["main-layout"]?.doAction?.(u,null)}),o}async mount(){await s(this.node)}async unmount(){await c(this.node)}async load(l,e){e&&window.layouts["main-layout"]?.listen?.(p,o=>{let n=o.detail;n.currScroll<=0?this.scrollTopBtn?.classList.add("btn-exited"):this.scrollTopBtn?.classList.remove("btn-exited"),this.currScroll=n.currScroll}),window.layouts["main-layout"]?.doAction?.(m,{top:this.currScroll,noSmooth:!0})}},d=t;a(d,"page",null);export{d as HomePage};
