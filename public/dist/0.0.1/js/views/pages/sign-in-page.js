import{a as h}from"../../chunk-B537MLMY.js";import{d as s}from"../../chunk-VTHP63GR.js";import{b as a,c,d as m,e as d}from"../../chunk-H5F775QU.js";import{c as u}from"../../chunk-WSRL3A7G.js";var n=class{node=null;titleElem=null;passwordLabelElem=null;signUpBtn=null;signInBtn=null;cancelBtn=null;authService=null;static get instance(){return n.page||(n.page=new n),n.page}get elem(){return this.node}async init(t,i){let o=await c(t,i,[]);this.node=o.querySelector('[data-page="signin-page"]')||null;let e=this.node?.querySelector(".main-card form");return e?.addEventListener("submit",l=>{l.preventDefault();let g=new FormData(e);console.log("Form submited: ");for(let r of g.entries())console.log(r[0]+":",r[1])}),this.titleElem=this.node?.querySelector('[data-title="main"]')||null,this.passwordLabelElem=e?.querySelector("#password-label")||null,this.signUpBtn=e?.querySelector('[data-button="sign-up"]')||null,this.signUpBtn?.addEventListener("click",l=>a(l,this.signUpBtn)),this.signInBtn=e?.querySelector('[data-button="sign-in"]')||null,this.cancelBtn=e?.querySelector('[data-button="cancel"]')||null,this.cancelBtn?.addEventListener("click",l=>a(l,this.cancelBtn)),this.authService=new h,await this.authService.init(this,i),o}async mount(){await m(this.node)}async unmount(){await d(this.node)}async load(t,i,o){this.titleElem&&(this.titleElem.textContent=window.tr("Sign In")),this.passwordLabelElem&&(this.passwordLabelElem.textContent=window.tr("Password")),this.signUpBtn&&(this.signUpBtn.textContent=window.tr("Sign Up")),this.signInBtn&&(this.signInBtn.textContent=window.tr("Sign In")),this.cancelBtn&&(this.cancelBtn.textContent=window.tr("Cancel")),this.signUpBtn?.setAttribute("href",(t===s?"":`/${t}`)+"/sign-up"),this.cancelBtn?.setAttribute("href",(t===s?"":`/${t}`)+"/"),await this.authService?.load?.(t,i,o)}},p=n;u(p,"page",null);export{p as SignInPage};
