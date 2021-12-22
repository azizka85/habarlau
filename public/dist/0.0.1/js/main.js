import{a as j,c as L,d as E,e as S}from"./chunk-X4UVQ76S.js";import{a as k,d as x}from"./chunk-VTHP63GR.js";import{c as _,d as H}from"./chunk-AZRE2GJD.js";import{a as D,c as P,d as U}from"./chunk-WL4T72RB.js";var q=D(B=>{var M=class{routes=[];root="/";before;page404;constructor(t){t?.root&&(this.root=t.root==="/"?"/":"/"+this.trimSlashes(t.root)+"/"),typeof t?.before=="function"&&(this.before=t.before),typeof t?.page404=="function"&&(this.page404=t.page404),t?.routes?.length>0&&t.routes.forEach(n=>{this.add(n.rule,n.handler,n.options)})}get fragment(){let t=decodeURI(location.pathname);return this.root!=="/"&&(t=t.replace(this.root,"")),this.trimSlashes(t)}get query(){return this.parseQuery(location.search)}add(t,n,s){return this.routes.push({rule:this.parseRouteRule(t),handler:n,options:s}),this}remove(t){return typeof t=="string"&&(t=this.parseRouteRule(t)),this.routes.some((n,s)=>n.handler===t||n.rule===t?(this.routes.splice(s,1),!0):!1),this}async redirectTo(t,n){let s=this.transformURL(t);return history.replaceState(n,null,this.root+s),await this.processUri(),this}async navigateTo(t,n){let s=this.transformURL(t);return history.pushState(n,null,this.root+s),await this.processUri(),this}refresh(){return this.redirectTo(this.fragment+location.search,history.state)}transformURL(t){if(typeof t!="string")return"";let s=t.trim().split("?"),i="",e="";return s.length===1?i=s[0]:(i=s[0].trim(),e=s[1].trim()),i?(this.root!=="/"&&(i=i.replace(this.root,"")),i=this.trimSlashes(i)):i=this.fragment,e?`${i}?${e}`:i}trimSlashes(t){return typeof t!="string"?"":t.replace(/\/$/,"").replace(/^\//,"")}parseRouteRule(t){if(typeof t!="string")return t;let s=this.trimSlashes(t).replace(/([\\\/\-\_\.])/g,"\\$1").replace(/\{[a-zA-Z]+\}/g,"(:any)").replace(/\:any/g,"[\\w\\-\\_\\.]+").replace(/\:word/g,"[a-zA-Z]+").replace(/\:num/g,"\\d+");return new RegExp("^"+s+"$","i")}parseQuery(t){let n={};return typeof t!="string"||(t[0]==="?"&&(t=t.substr(1)),t.split("&").forEach(s=>{let i=s.split("=");i[0]!==""&&(i[1]===void 0&&(i[1]=!0),n[decodeURIComponent(i[0])]=i[1])})),n}async findRoute(){let t=this.fragment,n=this.query,s=!1;if(!this.before?.({fragment:t,query:n}))for(let e of this.routes){let r=t.match(e.rule);if(r){r.shift();let o={fragment:t,query:n,match:r,options:e.options};await e.handler?.(o),s=!0;break}}return s}async processUri(){let t=this.fragment;await this.findRoute()||this.page404?.(t)}addUriListener(){window.onpopstate=this.processUri.bind(this)}removeUriListener(){window.onpopstate=null}};B.Router=M});var z=D((G,C)=>{(function(){"use strict";var f=function(t,n){return function(){return t.apply(n,arguments)}};(function(t,n){return typeof define=="function"&&define.amd?define([],function(){return t.i18n=n()}):typeof C=="object"&&C.exports?C.exports=n():t.i18n=n()})(typeof self!="undefined"&&self!==null?self:this,function(){var t,n,s;return t=function(){function i(){this.translate=f(this.translate,this),this.data={values:{},contexts:[]},this.globalContext={}}return i.prototype.translate=function(e,r,o,a,l){var p,u,c,h;return l==null&&(l=this.globalContext),c=function(y){var g;return g=typeof y,g==="function"||g==="object"&&!!y},c(r)?(p=null,h=null,u=r,l=o||this.globalContext):typeof r=="number"?(p=null,h=r,u=o,l=a||this.globalContext):(p=r,typeof o=="number"?(h=o,u=a,l=l):(h=null,u=o,l=a||this.globalContext)),c(e)?(c(e.i18n)&&(e=e.i18n),this.translateHash(e,l)):this.translateText(e,h,u,l,p)},i.prototype.add=function(e){var r,o,a,l,p,u,c,h;if(e.values!=null){u=e.values;for(o in u)a=u[o],this.data.values[o]=a}if(e.contexts!=null){for(c=e.contexts,h=[],l=0,p=c.length;l<p;l++)r=c[l],h.push(this.data.contexts.push(r));return h}},i.prototype.setContext=function(e,r){return this.globalContext[e]=r},i.prototype.extend=function(e){return this.extension=e},i.prototype.clearContext=function(e){return this.globalContext[e]=null},i.prototype.reset=function(){return this.resetData(),this.resetContext()},i.prototype.resetData=function(){return this.data={values:{},contexts:[]}},i.prototype.resetContext=function(){return this.globalContext={}},i.prototype.translateHash=function(e,r){var o,a;for(o in e)a=e[o],typeof a=="string"&&(e[o]=this.translateText(a,null,null,r));return e},i.prototype.translateText=function(e,r,o,a,l){var p,u;return a==null&&(a=this.globalContext),this.data==null?this.useOriginalText(l||e,r,o):(p=this.getContextData(this.data,a),p!=null&&(u=this.findTranslation(e,r,o,p.values,l)),u==null&&(u=this.findTranslation(e,r,o,this.data.values,l)),u??this.useOriginalText(l||e,r,o))},i.prototype.findTranslation=function(e,r,o,a,l){var p,u,c,h,y,g,m,d,R,A;if(d=a[e],d==null)return null;if(typeof d=="object"&&!Array.isArray(d))return this.extension&&typeof this.extension=="function"?(d=this.extension(e,r,o,d),d=this.applyNumbers(d,r),this.applyFormatting(d,r,o)):this.useOriginalText(l||e,r,o);if(r==null&&!Array.isArray(d)){if(typeof d=="string")return this.applyFormatting(d,r,o)}else if(d instanceof Array||d.length){for(p=r===null,R=0,A=d.length;R<A;R++)if(m=d[R],u=m[0]===null,c=m[1]===null,h=r>=m[0],y=r<=m[1],p&&u&&c||!p&&(!u&&h&&(c||y)||u&&!c&&y))return g=this.applyFormatting(m[2].replace("-%n",String(-r)),r,o),this.applyFormatting(g.replace("%n",String(r)),r,o)}return null},i.prototype.applyNumbers=function(e,r){return e=e.replace("-%n",String(-r)),e=e.replace("%n",String(r)),e},i.prototype.getContextData=function(e,r){var o,a,l,p,u,c,h,y;if(e.contexts==null)return null;for(h=e.contexts,u=0,c=h.length;u<c;u++){o=h[u],a=!0,y=o.matches;for(l in y)p=y[l],a=a&&p===r[l];if(a)return o}return null},i.prototype.useOriginalText=function(e,r,o){return r==null?this.applyFormatting(e,r,o):this.applyFormatting(e.replace("%n",String(r)),r,o)},i.prototype.applyFormatting=function(e,r,o){var a,l;for(a in o)l=new RegExp("%{"+a+"}","g"),e=e.replace(l,o[a]);return e},i}(),s=new t,n=s.translate,n.translator=s,n.create=function(i){var e;return e=new t,i!=null&&e.add(i),e.translate.create=n.create,e.translate.translator=e,e.translate},n})}).call(G)});var Q=P(q());var b=class{node=null;static get instance(){return b.page||(b.page=new b),b.page}get elem(){return this.node}async init(t,n){let s=t||document.body;return this.node=s.querySelector('[data-page="loader-page"]'),s}async mount(){await _(this.node)}async unmount(){await H(this.node)}},w=b;U(w,"page",null);var I=P(z());var v=class extends j{static get instance(){return v.layout||(v.layout=new v),v.layout}},T=v;U(T,"layout",null);function Z(){document.querySelector(".splash")?.classList.remove("splash--open")}function F(f){let t=T.instance;for(let n of f)if(window.layouts[n]){t=window.layouts[n];break}return t}async function J(f,t,n){let s={};for(let i of f)if(!(i in window.layouts)){let e=await import(`./views/layouts/${i}.js?time=${Date.now()}`);t=await e[L(i)]?.instance?.init?.(t,n),window.layouts[i]=e[L(i)]?.instance,s[i]=!0}return s}async function K(f,t,n,s){let i=[...n].reverse(),e=T.instance;for(let r of i)e.content!==window.layouts[r]&&await e.replaceContent(window.layouts[r]),await window.layouts[r].load?.(f,t,s[r]??!1),e=window.layouts[r];return e}async function $(f,t,n,s,i){window.page=t;let e=null,r=!1;if(!i&&(!(f in window.languages)||!(n in window.pages))){let a=F(s);a.content!==w.instance&&await a.replaceContent(w.instance)}if(!(f in window.languages)){let a=await import(`./locales/${f}.js?time=${Date.now()}`);window.languages[f]=I.default.create(a.default)}if(window.tr=window.languages[f],document.documentElement.lang=f,document.title=window.tr("Habarlau - Application to make a business"),!(n in window.pages)){let a=await import(`./views/pages/${n}.js?time=${Date.now()}`);e=await a[L(n)]?.instance?.init?.(e,i),window.pages[n]=a[L(n)]?.instance,r=!0}let o=await J(s,e,i);if(window.page.fragment===t.fragment){let a=await K(f,t,s,o);a.content!==window.pages[n]&&await a.replaceContent(window.pages[n]),await window.pages[n].load?.(f,t,r)}i&&Z()}window.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{let f=!0;w.instance.init(null,f);let t=new Q.Router({root:k,routes:[{rule:`${E}/?`,async handler(n){await $(S(n.match[0]||x),n,"home-page",["main-layout"],f)},options:{}},{rule:`${E}/?sign-in`,async handler(n){await $(S(n.match[0]||x),n,"sign-in-page",[],f)},options:{}},{rule:`${E}/?sign-up`,async handler(n){await $(S(n.match[0]||x),n,"sign-up-page",[],f)},options:{}}]});window.pages={},window.layouts={},window.languages={},window.router=t,t.addUriListener(),t.processUri().catch(n=>console.error(n)).finally(()=>f=!1)},500)});
