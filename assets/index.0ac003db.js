var A=Object.defineProperty,U=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var y=(t,e,r)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,u=(t,e)=>{for(var r in e||(e={}))O.call(e,r)&&y(t,r,e[r]);if(v)for(var r of v(e))j.call(e,r)&&y(t,r,e[r]);return t},S=(t,e)=>U(t,D(e));var f=(t,e,r)=>(y(t,typeof e!="symbol"?e+"":e,r),r);import{c as V,o as C,u as b,a as x,j as T,b as q,d as M,L as _,e as B,R as N,r as d,B as $,f as P,g as k,Q as F,h as Q,i as W,k as J}from"./vendor.a7dbbac3.js";const G=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}};G();const z="modulepreload",R={},K="/starter-fullstack-graphql-rq/",p=function(e,r){return!r||r.length===0?e():Promise.all(r.map(s=>{if(s=`${K}${s}`,s in R)return;R[s]=!0;const o=s.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${i}`))return;const a=document.createElement("link");if(a.rel=o?"stylesheet":z,o||(a.as="script",a.crossOrigin=""),a.href=s,document.head.appendChild(a),o)return new Promise((l,m)=>{a.addEventListener("load",l),a.addEventListener("error",m)})})).then(()=>e())};const H=(t,e)=>({user:null,setUser:r=>t({user:r}),clearUser:()=>{t({user:null})}}),Y=V((t,e)=>u({},H(t)));function w(){return sessionStorage.getItem("jwt")}function L(t){sessionStorage.setItem("jwt",t)}function X(){return sessionStorage.getItem("refreshToken")}function Z(t){sessionStorage.setItem("refreshToken",t)}function E(){localStorage.removeItem("jwt"),localStorage.removeItem("refreshToken")}const ee="https://zkindest-starter-server.herokuapp.com/";class te{constructor(e){f(this,"retryCount");f(this,"currRetryCount");this.retryCount=e,this.currRetryCount=0}isTokenValidOrUndefined(){console.log("isTokenValidOrUndefined");const e=w();if(!e)return!0;const r=C(e),s=r.exp?r.exp*1e3:Number.NEGATIVE_INFINITY,o=new Date;return s>=o.getTime()}async fetch(){var e;try{const r=C(w()||"");console.log("fetchAccessToken jwt:",r);const s=X(),o=(e=r==null?void 0:r["https://hasura.io/jwt/claims"])==null?void 0:e["X-User-Fingerprint"],l=(await(await fetch("https://zkindest-starter-server.herokuapp.com/",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({query:`
                  mutation RefreshJwtToken($data: RefreshTokenInput!) {
                    refreshToken(data: $data) {
                      jwt
                    }
                  }
                `,variables:{data:{refreshToken:s,fingerPrintHash:o}}})})).json()).data.refreshToken.jwt;l?L(l):E()}catch{console.warn("Your refresh token is invalid. Try to reauthenticate."),E()}}async refresh(){this.retryCount!==this.currRetryCount&&(this.isTokenValidOrUndefined()||(this.currRetryCount+=1,await this.fetch()))}}function re(){const t={},e=w();return e&&(t.authorization=`Bearer ${e}`),t["content-type"]="application/json",t}const ne=new te(1),oe=async()=>(await ne.refresh(),{credentials:"include",headers:u({},re())});function h(t,e){return async()=>{const s=await(await fetch(ee,S(u({method:"POST"},await oe()),{body:JSON.stringify({query:t,variables:e})}))).json();if(s.errors){const{message:o,extensions:i}=s.errors[0];throw i&&i.code==="INTERNAL_SERVER_ERROR"?new Error("Something went wrong!"):new Error(o)}return s.data}}const se=`
    mutation SignUp($data: UserCreateWhereInput!) {
  signupUser(data: $data) {
    jwt
    refreshToken
  }
}
    `,Re=t=>x(["SignUp"],e=>h(se,e)(),t),ie=`
    mutation Logout {
  logout {
    ok
  }
}
    `,ae=t=>x(["Logout"],e=>h(ie,e)(),t),ce=`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    jwt
    refreshToken
  }
}
    `,Ee=t=>x(["Login"],e=>h(ce,e)(),t),le=`
    query GetAllUsers {
  allUsers {
    name
    id
  }
}
    `,Ie=(t,e)=>b(t===void 0?["GetAllUsers"]:["GetAllUsers",t],h(le,t),e),ue=`
    query WhoAmI {
  whoami {
    id
    name
  }
}
    `,de=(t,e)=>b(t===void 0?["WhoAmI"]:["WhoAmI",t],h(ue,t),e),n=T.exports.jsx,c=T.exports.jsxs,he=T.exports.Fragment,me=({children:t})=>{var l,m;const{data:e}=de(void 0,{staleTime:3e4}),r=Y(g=>g.clearUser),s=q(),o=M(),{mutate:i}=ae({onSuccess:()=>{try{L(""),Z(""),o.clear(),r(),s("/")}catch(g){console.error(g)}finally{r(),s("/")}}}),a=()=>{i({})};return c(he,{children:[c("header",{className:"py-4 flex item-center justify-between",children:[n(_,{to:"/",children:n("h1",{className:"text-5xl text-black font-font-extrabold underline",children:"Auth Demo"})}),c("div",{className:"flex items-center",children:[c("div",{children:["Profile: ",n("strong",{children:((l=e==null?void 0:e.whoami)==null?void 0:l.name)||"Guest"})]}),((m=e==null?void 0:e.whoami)==null?void 0:m.name)&&n("button",{onClick:a,className:"ml-4 teal-btn",children:"log out"})]})]}),n("main",{className:"min-h-[80vh] ",children:t}),n("footer",{className:"min-h-[5rem] bg-black text-white flex justify-center items-center text-center",children:"Footer"})]})},fe=()=>{const{pathname:t}=B();return c("div",{className:"pt-16 w-[75%] mx-auto text-center rounded-lg bg-light-text-amber-50",children:[c("p",{children:["There was an error in loading this page."," ",n("span",{style:{cursor:"pointer",color:"#0077FF"},onClick:()=>{window.location.reload()},children:"Reload this page"})," "]}),t!=="/"&&n(_,{to:"/",className:"hover:underline",children:"Back Home"})]})};class pe extends N.Component{constructor(){super(...arguments);f(this,"state",{error:null,errorInfo:null,hasError:!1})}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,r){this.setState({errorInfo:r})}render(){return this.state.hasError?n(fe,{}):this.props.children}}function ge(t){return c("svg",S(u({width:"1em",height:"1em",viewBox:"0 0 24 24"},t),{children:[n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",children:n("animate",{attributeName:"r",begin:"0",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(45 12 12)",children:n("animate",{attributeName:"r",begin:"0.125s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(90 12 12)",children:n("animate",{attributeName:"r",begin:"0.25s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(135 12 12)",children:n("animate",{attributeName:"r",begin:"0.375s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(180 12 12)",children:n("animate",{attributeName:"r",begin:"0.5s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(225 12 12)",children:n("animate",{attributeName:"r",begin:"0.625s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(270 12 12)",children:n("animate",{attributeName:"r",begin:"0.75s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})}),n("circle",{cx:"12",cy:"2",r:"0",fill:"currentColor",transform:"rotate(315 12 12)",children:n("animate",{attributeName:"r",begin:"0.875s",calcMode:"spline",dur:"1s",keySplines:"0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",repeatCount:"indefinite",values:"0;2;0;0"})})]}))}const ye=d.exports.lazy(()=>p(()=>import("./Home.c61df5a0.js"),["assets/Home.c61df5a0.js","assets/vendor.a7dbbac3.js"])),Se=d.exports.lazy(()=>p(()=>import("./SignUp.b883952d.js"),["assets/SignUp.b883952d.js","assets/vendor.a7dbbac3.js"])),ke=d.exports.lazy(()=>p(()=>import("./SignIn.5ce27636.js"),["assets/SignIn.5ce27636.js","assets/vendor.a7dbbac3.js"])),we=()=>n($,{basename:"/starter-fullstack-graphql-rq/",children:n(pe,{children:n(me,{children:n(d.exports.Suspense,{fallback:n(ge,{}),children:c(P,{children:[n(k,{path:"/",element:n(ye,{})}),n(k,{path:"/sign-in",element:n(ke,{})}),n(k,{path:"/sign-up",element:n(Se,{})})]})})})})}),xe=t=>{t&&t instanceof Function&&p(()=>import("./web-vitals.64ec7304.js"),[]).then(({getCLS:e,getFID:r,getFCP:s,getLCP:o,getTTFB:i})=>{e(t),r(t),s(t),o(t),i(t)})},I=new F,Te=({children:t})=>(typeof window!="undefined"&&(sessionStorage.length||(console.log("Calling getSessionStorage"),localStorage.setItem("getSessionStorage",String(Date.now()))),window.addEventListener("storage",e=>{if(console.log("storage event",e),e.key=="getSessionStorage")localStorage.setItem("sessionStorage",JSON.stringify(sessionStorage)),localStorage.removeItem("sessionStorage");else if(e.key=="sessionStorage"&&!sessionStorage.length)try{if(e.newValue){const r=JSON.parse(e.newValue);for(const s in r)sessionStorage.setItem(s,r[s])}}catch(r){console.error(r)}})),d.exports.useEffect(()=>{setTimeout(()=>{I.invalidateQueries(["WhoAmI"])},200)},[]),c(Q,{client:I,children:[t,n(W.exports.ReactQueryDevtools,{initialIsOpen:!1})]}));J.render(n(N.StrictMode,{children:n(Te,{children:n(we,{})})}),document.getElementById("root"));xe();export{Ie as a,c as b,Re as c,Z as d,Ee as e,n as j,L as s,de as u};
