var o=Object.defineProperty;var s=(t,r,e)=>r in t?o(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e;var i=(t,r,e)=>(s(t,typeof r!="symbol"?r+"":r,e),e);function n(t){if(!t)return t;let r=t.split("");return r[0].toUpperCase()+r.slice(1).join("").toLowerCase()}function p(t){return t.split("-").map(e=>n(e)).join("")}export{i as a,p as b};
