import{a as I,b as O,c as Q,d as r,e as q}from"./chunk-FSQ6PWQO.js";import{Ba as c,C as f,Da as S,H as g,Ha as l,I as u,Ia as h,J as y,Ja as T,L as C,Ma as B,Na as G,Oa as M,Qa as b,Ra as H,Sa as D,U as v,Ua as P,Va as W,W as _,Wa as A,gb as F,ma as m,ra as s,sa as x,w as d,za as w}from"./chunk-LSOSAWAZ.js";function z(o,e){o&1&&T(0,"app-chat-history",1),o&2&&c("chatHistory",e)}var Y=(()=>{let e=class e{constructor(){this.promptBox=x.required(r),this.geminiService=v(q),this.prompt=s(""),this.loading=s(!1)}ngOnInit(){this.chatHistory$=I(this.promptBox().askMe).pipe(d(()=>this.prompt()!==""),C(()=>this.loading.set(!0)),y(()=>this.geminiService.generateText(this.prompt()).pipe(f(()=>this.loading.set(!1)))),g((n,t)=>n.concat({prompt:this.prompt(),response:t}),[]),u([]))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=_({type:e,selectors:[["app-generate-text"]],viewQuery:function(t,i){t&1&&B(i.promptBox,r,5),t&2&&G()},standalone:!0,features:[P],decls:5,vars:5,consts:[[3,"promptChange","loading","prompt"],[3,"chatHistory"]],template:function(t,i){if(t&1&&(l(0,"h3"),M(1,"Input a prompt to receive an answer from the Google Gemini AI"),h(),l(2,"app-prompt-box",0),D("promptChange",function(a){return H(i.prompt,a)||(i.prompt=a),a}),h(),w(3,z,1,1,"app-chat-history"),W(4,"async")),t&2){let p;m(2),c("loading",i.loading()),b("prompt",i.prompt),m(),S(3,(p=A(4,3,i.chatHistory$))?3:-1,p)}},dependencies:[O,Q,r,F],styles:["textarea[_ngcontent-%COMP%]{margin-right:.5rem;width:49%;font-size:1rem;padding:.75rem;border-radius:4px}"],changeDetection:0});let o=e;return o})();export{Y as GenerateTextComponent};