import{a as u}from"../../chunk-UIK76GEC.js";import{d as o}from"../../chunk-VTHP63GR.js";import{a as r,b as a,c,d as m}from"../../chunk-AZRE2GJD.js";import{c as s}from"../../chunk-WSRL3A7G.js";var l=class{node=null;titleElem=null;passwordLabelElem=null;signUpBtn=null;signInBtn=null;cancelBtn=null;authService=null;signUpBtnClickHandler;cancelBtnClickHandler;formSubmitHandler;static get instance(){return l.page||(l.page=new l),l.page}constructor(){this.formSubmitHandler=t=>{t.preventDefault();let n=this.node?.querySelector(".main-card form"),i=new FormData(n);console.log("Form submited: ");for(let e of i.entries())console.log(e[0]+":",e[1])},this.signUpBtnClickHandler=t=>r(t,this.signUpBtn),this.cancelBtnClickHandler=t=>r(t,this.cancelBtn)}get elem(){return this.node}async init(t,n){let i=await a(t,n,[]);this.node=i.querySelector('[data-page="signin-page"]')||null;let e=this.node?.querySelector(".main-card form");return this.titleElem=this.node?.querySelector('[data-title="main"]')||null,this.passwordLabelElem=e?.querySelector("#password-label")||null,this.signUpBtn=e?.querySelector('[data-button="sign-up"]')||null,this.signInBtn=e?.querySelector('[data-button="sign-in"]')||null,this.cancelBtn=e?.querySelector('[data-button="cancel"]')||null,this.authService=new u,await this.authService.init(this,n),i}async mount(){this.node?.querySelector(".main-card form")?.addEventListener("submit",this.formSubmitHandler),this.signUpBtn?.addEventListener("click",this.signUpBtnClickHandler),this.cancelBtn?.addEventListener("click",this.cancelBtnClickHandler),await c(this.node)}async unmount(){this.node?.querySelector(".main-card form")?.removeEventListener("submit",this.formSubmitHandler),this.signUpBtn?.removeEventListener("click",this.signUpBtnClickHandler),this.cancelBtn?.removeEventListener("click",this.cancelBtnClickHandler),await m(this.node)}async load(t,n,i){this.titleElem&&(this.titleElem.textContent=window.tr("Sign In")),this.passwordLabelElem&&(this.passwordLabelElem.textContent=window.tr("Password")),this.signUpBtn&&(this.signUpBtn.textContent=window.tr("Sign Up")),this.signInBtn&&(this.signInBtn.textContent=window.tr("Sign In")),this.cancelBtn&&(this.cancelBtn.textContent=window.tr("Cancel")),this.signUpBtn?.setAttribute("href",(t===o?"":`/${t}`)+"/sign-up"),this.cancelBtn?.setAttribute("href",(t===o?"":`/${t}`)+"/"),await this.authService?.load?.(t,n,i)}},d=l;s(d,"page",null);export{d as SignInPage};
