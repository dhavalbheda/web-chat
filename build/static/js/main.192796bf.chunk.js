(this["webpackJsonpweb-chat"]=this["webpackJsonpweb-chat"]||[]).push([[0],{104:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n(55),r=n(56),s=n(63),i=n(62),o=n(2),l=n.n(o),u=n(29),d=n.n(u),j=(n(70),n(11)),m=n(20),b=n(10),f=(n(74),n(14)),h=n(108),O=n(58),p=n.n(O),g=n(59),v=n.n(g),x=(n(96),n(97),n(98),n(15)),y=n.n(x),N=n(23),w="USER_FETCH_REQUEST",E="USER_FETCH_SUCCESS",S="USER_FETCH_ERROR",T="USER_LOG_OUT",A="SET_ALERT",C="REMOVE_ALERT",_="TAB_CHANGE",F=n(43);F.a.initializeApp({apiKey:"AIzaSyB3mUGEeVTQn7hbmoxUNncowRjwD-5y2TI",authDomain:"digital-jalebi-ac363.firebaseapp.com",databaseURL:"https://digital-jalebi-ac363-default-rtdb.firebaseio.com",projectId:"digital-jalebi-ac363",storageBucket:"digital-jalebi-ac363.appspot.com",messagingSenderId:"105427663157",appId:"1:105427663157:web:3e564360c7852fb4abb47c",measurementId:"G-M2DJG8HX1P"});var R=F.a,U=R.firestore(),k=R.auth(),P=function(){return{type:w,payload:null}},I=function(e){return{type:E,payload:e}},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:S,payload:e}},H=function(e){return{type:A,payload:e}},D=function(e){return{type:C,payload:e}},M=function(e,t){k.createUserWithEmailAndPassword(e.email,e.password).then((function(n){V(n,e,t)})).catch((function(e){t(H({type:"danger",message:e.message})),setTimeout((function(){return t(D())}),3e3)}))},V=function(e,t,n){var c=t.firstName,a=t.lastName,r=t.email;k.currentUser.updateProfile({firstName:c,lastName:a}).then((function(){U.collection("users").doc(e.user.uid).set({firstName:c,lastName:a,email:r,uid:e.user.uid,isActive:!0,createdAt:new Date}).then((function(){localStorage.setItem("userId",e.user.uid),n(I({firstName:c,lastName:a,email:r,uid:e.user.uid})),n(H({type:"success",message:"User Registerd Successfull"})),setTimeout((function(){return n(D())}),3e3)}))})).catch((function(e){n(H({type:"danger",message:e.message})),setTimeout((function(){return n(D())}),3e3)}))},B=function(e){return function(t){t(P()),U.collection("users").doc(e).update({isActive:!1}).then((function(){k.signOut().then((function(){t({type:T,payload:null}),t(H({type:"success",message:"Logout Successfully"})),setTimeout((function(){return t(D())}),3e3)})).catch((function(e){t(H({type:"danger",message:e.message})),setTimeout((function(){return t(D())}),3e3)}))})).catch((function(e){t(H({type:"danger",message:e.message})),setTimeout((function(){return t(D())}),3e3)}))}},W=function(e){var t=Object(j.c)((function(e){return e.User})).user,n=Object(j.b)();return Object(c.jsxs)("header",{className:"header",children:[Object(c.jsx)("div",{style:{display:"flex"},children:Object(c.jsx)("div",{className:"logo",children:"Digital Jalebi"})}),Object(c.jsx)("div",{style:{margin:"20px 0px",color:"#fff",fontWeight:"bold"},children:"I'm "+t.firstName+" "+t.lastName}),Object(c.jsx)("ul",{className:"menu",children:Object(c.jsx)("li",{children:Object(c.jsx)(m.b,{to:"/signin",onClick:function(){n(B(t.uid))},children:"LogOut"})})})]})},G="CHAT_FETCH_REQUEST",J="CHAT_FETCH_SUCCESS",Q="CHAT_FETCH_ERROR",z="CHAT_SET_ALERT",K="CHAT_REMOVE_ALERT",Y="REQUEST_CONVERSATION",Z="SET_CONVERSATION",q="UPDATE_CONVERSATION",X=R.firestore(),$=R.database(),ee=R.firestore.FieldValue.arrayUnion,te=R.firestore.FieldValue.arrayRemove,ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:Y,payload:e}},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:Z,payload:e}},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:q,payload:e}},re=function(){var e=Object(N.a)(y.a.mark((function e(t){var n,c,a,r;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.uuid,c=t.sender,a=t.receiver,r=t.message,$.ref().child(c+"-"+a).push().set({uuid:n,sender:c,receiver:a,message:r,isSeen:!1,createdAt:R.database.ServerValue.TIMESTAMP}),X.collection("users").doc(c).update({pendding:ee(a)});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(e){var t=e.friends,n=e.selectFriend,a=e.uid,r=e.selectedFriend,s=function(e,t){return e.pendding&&e.pendding.includes(t)?"displayPic pending":"displayPic"};return t.map((function(e,t){return Object(c.jsxs)("div",{style:r.uid===e.uid?{background:"#b1b1b1"}:{},className:"displayName",onClick:function(){return n(e)},children:[Object(c.jsx)("div",{className:s(e,a),children:Object(c.jsx)("img",{src:"https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg",alt:""})}),Object(c.jsxs)("div",{style:{display:"flex",flex:1,justifyContent:"space-between",margin:"0 10px"},children:[Object(c.jsx)("span",{style:{fontWeight:500},children:e.firstName+" "+e.lastName}),Object(c.jsx)("span",{children:e.isActive?"Active":"offline"})]})]},t)}))},ie=function(e){var t=e.conversation,n=e.selectedFriend,a=e.user;return t.sort((function(e,t){return e.createdAt-t.createdAt})),t.map((function(e,t){var r=void 0;if(null!=e.createdAt){r=new Date(e.createdAt).toLocaleString("en",{day:"numeric",month:"short"}),r+=" "+new Date(e.createdAt).toLocaleTimeString([],{timeStyle:"short"})}return e.sender===n.uid&&e.receiver===a.uid||e.sender===a.uid&&e.receiver===n.uid?Object(c.jsx)("div",{style:{textAlign:e.sender===a.uid?"right":"left"},children:Object(c.jsxs)("p",{className:e.sender===a.uid?"messageStyle right-message":"messageStyle left-message",children:[e.message,Object(c.jsx)("br",{}),Object(c.jsx)("span",{className:"message-time",children:r||""}),e.receiver!==a.uid&&Object(c.jsx)("span",{className:"message-status",children:e.isSeen?Object(c.jsx)("i",{className:"far fa-eye"}):Object(c.jsx)("i",{className:"far fa-eye-slash"})})]})},t):Object(c.jsx)(o.Fragment,{},t)}))},oe=function(e){var t=Object(j.c)((function(e){return e.User})).user,n=Object(j.c)((function(e){return e.Chat})).conversation,a=Object(j.c)((function(e){return e.Chat})).friends,r=Object(o.useState)(!1),s=Object(f.a)(r,2),i=s[0],l=s[1],u=Object(o.useState)({}),d=Object(f.a)(u,2),m=d[0],b=d[1],O=Object(o.useState)(""),g=Object(f.a)(O,2),x=g[0],w=g[1],E=Object(o.useState)(!1),S=Object(f.a)(E,2),T=S[0],A=S[1],C=Object(j.b)();Object(o.useEffect)((function(){var e;C((e=t.uid,function(){var t=Object(N.a)(y.a.mark((function t(n){var c;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=X.collection("users").onSnapshot((function(t){var c=[];t.forEach((function(t){t.data().uid!==e&&c.push(t.data())})),n({type:J,payload:c})})),t.abrupt("return",c);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())).then((function(e){return e})).catch((function(e){return console.log(e)}))}),[]),Object(o.useEffect)((function(){return function(){return e=t.uid,n=m.uid,$.ref().child(e+"-"+n).off("child_added"),$.ref().child(e+"-"+n).off("child_changed"),void $.ref().child(n+"-"+e).off("child_added");var e,n}}),[m]);return Object(c.jsxs)(o.Fragment,{children:[Object(c.jsx)(W,{}),Object(c.jsxs)("section",{className:"container-body",children:[Object(c.jsx)("div",{className:"listOfUsers",children:a.length>0&&Object(c.jsx)(se,{uid:t.uid,selectFriend:function(e){m&&m.uid===e.uid||(console.log(e.uid),l(!0),A(!1),w(""),b(e),C(function(e){var t=e.sender,n=e.receiver;return function(){var e=Object(N.a)(y.a.mark((function e(c){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c(ne()),$.ref().child(t+"-"+n).on("child_added",(function(e){c(ce(e.val()))})),$.ref().child(n+"-"+t).on("child_added",(function(e){e.val().isSeen||($.ref().child(n+"-"+t).child(e.key).update({isSeen:!0}),X.collection("users").doc(n).update({pendding:te(t)})),c(ce(e.val()))})),$.ref().child(t+"-"+n).on("child_changed",(function(e){c(ae(e.val()))}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}({sender:t.uid,receiver:e.uid})))},friends:a,selectedFriend:m})}),Object(c.jsxs)("div",{className:"chatArea",children:[Object(c.jsx)("div",{className:"chatHeader",children:i&&m.firstName+" "+m.lastName}),Object(c.jsx)(p.a,{className:T?"messageSections-collaps":"messageSections",children:i&&Object(c.jsx)(ie,{conversation:n,selectedFriend:m,user:t})}),Object(c.jsx)("div",{className:"chatControls",style:T?{height:"45%"}:{height:"5%"},children:i&&Object(c.jsxs)(o.Fragment,{children:[Object(c.jsxs)("div",{class:"control",children:[Object(c.jsx)("textarea",{placeholder:"Enter Text...",value:x,onChange:function(e){return w(e.target.value)}}),Object(c.jsx)("span",{className:"smile-icon",onClick:function(e){return A(!T)},children:Object(c.jsx)("i",{class:"far fa-smile"})}),Object(c.jsx)("span",{className:"send-button-icon",onClick:function(){w("");var e={uuid:Object(h.a)(),sender:t.uid,receiver:m.uid,message:x};re(e)},children:Object(c.jsx)("i",{class:"fas fa-paper-plane"})})]}),Object(c.jsx)("div",{children:Object(c.jsx)(v.a,{onEmojiClick:function(e,t){var n=t.emoji;w(x+n),console.log(n)}})})]})})]})]})]})},le=n(5),ue=n(64),de=function(e){var t=e.Component,n=e.path,a=Object(ue.a)(e,["Component","path"]),r=Object(j.c)((function(e){return e.User})).authenticated;return Object(c.jsx)(o.Fragment,{children:r?Object(c.jsx)(b.b,Object(le.a)(Object(le.a)({exact:!0},a),{},{path:n,render:t})):Object(c.jsx)(b.a,{to:"/signin"})})},je=(n(103),n(104),function(e){var t=e.alert;return Object(c.jsx)(o.Fragment,{children:Object(c.jsx)("div",{className:"alert alert-".concat(t.type," alert-dismissible fade show mt-3"),style:{zIndex:1},role:"alert",children:Object(c.jsxs)("strong",{children:[t.message," !"]})})})}),me=function(){var e=Object(j.c)((function(e){return e.User})),t=e.userAlert,n=e.authenticated,a=Object(o.useState)(""),r=Object(f.a)(a,2),s=r[0],i=r[1],l=Object(o.useState)(""),u=Object(f.a)(l,2),d=u[0],h=u[1],O=Object(j.b)(),p=function(e){var t;e.preventDefault(),O((t={email:s,password:d},function(){var e=Object(N.a)(y.a.mark((function e(n){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:""===t.email||t.password<6?(n(H({type:"warning",message:"Email is required!\n Password Must be more than 6 letter"})),setTimeout((function(){return n(D())}),3e3)):(n(P()),k.signInWithEmailAndPassword(t.email,t.password).then((function(e){U.collection("users").doc(e.user.uid).update({isActive:!0}).then((function(){localStorage.setItem("userId",e.user.uid),n(H({type:"success",message:"Sign In Successfully"})),setTimeout((function(){return n(D())}),3e3)})).catch((function(e){n(H({type:"danger",message:e.message})),setTimeout((function(){return n(D())}),3e3)}))})).catch((function(e){n(H({type:"danger",message:e.message})),setTimeout((function(){return n(D())}),3e3)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))};return Object(c.jsxs)("div",{className:"container",children:[t&&Object(c.jsx)(je,{alert:t}),n&&Object(c.jsx)(b.a,{to:"/"}),Object(c.jsx)("div",{className:"row justify-content-center justify-content-md-start",children:Object(c.jsx)("div",{className:"col-10 col-md-4 login-form ml-md-5 align-self-center",children:Object(c.jsxs)("form",{children:[Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("img",{alt:"signin",src:"https://media.giphy.com/media/kcZlnhiaB1p76tKS6S/giphy.gif"})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"staticEmail",className:"col-sm-2 col-form-label align-self-start ml-md-5",children:"Email"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsxs)("div",{className:"col-sm-10",children:[Object(c.jsx)("input",{type:"text",className:"form-control",id:"staticEmail",placeholder:"email@example.com",value:s,onChange:function(e){return i(e.target.value)}}),";"]})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"inputPassword",className:"col-sm-2 col-form-label ml-md-5",children:"Password"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsx)("div",{className:"col-sm-10",children:Object(c.jsx)("input",{type:"password",className:"form-control",id:"inputPassword",placeholder:"Password",value:d,onChange:function(e){return h(e.target.value)}})})}),Object(c.jsxs)("div",{className:"form-group row justify-content-center",children:[Object(c.jsx)("button",{className:"btn btn-primary m-2",onClick:function(e){return p(e)},children:"Sign In"}),Object(c.jsx)(m.c,{to:"/signup",className:"btn btn-primary m-2",children:"Sign Up"})]})]})})})]})},be=function(){var e=Object(j.c)((function(e){return e.User})),t=e.userAlert,n=e.authenticated,a=Object(o.useState)(""),r=Object(f.a)(a,2),s=r[0],i=r[1],l=Object(o.useState)(""),u=Object(f.a)(l,2),d=u[0],h=u[1],O=Object(o.useState)(""),p=Object(f.a)(O,2),g=p[0],v=p[1],x=Object(o.useState)(""),y=Object(f.a)(x,2),N=y[0],w=y[1],E=Object(o.useState)(""),S=Object(f.a)(E,2),T=S[0],A=S[1],C=Object(j.b)(),_=function(e){e.preventDefault(),C(function(e,t){return function(n){e.password!==t?(n(H({type:"danger",message:"Password and Confirm Password does not match"})),setTimeout((function(){return n(D())}),3e3)):(n(P()),M(e,n))}}({firstName:s,lastName:d,email:g,password:N},T))};return Object(c.jsxs)("div",{className:"container",children:[n&&Object(c.jsx)(b.a,{to:"/"}),t&&Object(c.jsx)(je,{alert:t}),Object(c.jsx)("div",{className:"row justify-content-center justify-content-md-start",children:Object(c.jsx)("div",{className:"col-10 col-md-4 login-form ml-md-5 align-self-center",children:Object(c.jsxs)("form",{children:[Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("img",{alt:"signin",src:"https://media.giphy.com/media/kcZlnhiaB1p76tKS6S/giphy.gif"})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"staticEmail",className:"col col-form-label align-self-start ml-md-5",children:"First Name"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsx)("div",{className:"col-sm-10",children:Object(c.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter First Name",value:s,onChange:function(e){return i(e.target.value)}})})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"staticEmail",className:"col col-form-label align-self-start ml-md-5",children:"Last Name"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsx)("div",{className:"col-sm-10",children:Object(c.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter Last Name",value:d,onChange:function(e){return h(e.target.value)}})})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"staticEmail",className:"col col-form-label align-self-start ml-md-5",children:"Email"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsx)("div",{className:"col-sm-10",children:Object(c.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter Email Id",value:g,onChange:function(e){return v(e.target.value)}})})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"inputPassword",className:"col col-form-label ml-md-5",children:"Password"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsx)("div",{className:"col-sm-10",children:Object(c.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter Password",value:N,onChange:function(e){return w(e.target.value)}})})}),Object(c.jsx)("div",{className:"form-group row",children:Object(c.jsx)("label",{htmlFor:"inputPassword",className:"col col-form-label ml-md-5",children:"Confirm Password"})}),Object(c.jsx)("div",{className:"form-group row justify-content-center mb-4",children:Object(c.jsx)("div",{className:"col-sm-10",children:Object(c.jsx)("input",{type:"password",className:"form-control",placeholder:"Enter Confirm Password",value:T,onChange:function(e){return A(e.target.value)}})})}),Object(c.jsxs)("div",{className:"form-group row justify-content-center",children:[Object(c.jsx)("button",{className:"btn btn-primary m-2",onClick:function(e){return _(e)},children:"Sign Up"}),Object(c.jsx)(m.c,{to:"/signin",className:"btn btn-primary m-2",children:"I Have Account"})]})]})})})]})};window.addEventListener("focus",(function(){console.log("focus")}));var fe=function(){var e=Object(j.b)();return Object(o.useEffect)((function(){e((function(e){k.onAuthStateChanged(function(){var t=Object(N.a)(y.a.mark((function t(n){var c,a,r,s,i,o,l;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=8;break}return c=R.firestore().collection("users").doc(n.uid),t.next=4,c.get();case 4:(a=t.sent).exists?(r=a.data(),s=r.firstName,i=r.lastName,o=r.email,l=r.uid,e(I({firstName:s,lastName:i,email:o,uid:l}))):(e(H({type:"danger",message:"Your Account Terminated, So Please Register With New Email.."})),setTimeout((function(){return e(D())}),3e3),e(L(""))),t.next=11;break;case 8:e(H({type:"warning",message:"You Logged Out Please Login"})),setTimeout((function(){return e(D())}),3e3),e(L(""));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))}),[e]),Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)(m.a,{children:[Object(c.jsx)(b.b,{path:"/signin",component:me}),Object(c.jsx)(b.b,{path:"/signup",component:be}),Object(c.jsx)(de,{exact:!0,path:"/",component:oe})]})})},he=n(22),Oe=n(60),pe=n(61),ge={user:{},authenticated:!1,currentTab:null,loadding:!1,userAlert:null},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ge,t=arguments.length>1?arguments[1]:void 0,n=t.type,c=t.payload;switch(n){case w:return Object(le.a)(Object(le.a)({},e),{},{loadding:!0});case E:return Object(le.a)(Object(le.a)({},e),{},{user:c,loadding:!1,authenticated:!0});case S:case T:return Object(le.a)(Object(le.a)({},e),{},{user:{},loadding:!1,authenticated:!1});case _:return Object(le.a)(Object(le.a)({},e),{},{currentTab:c});case A:return Object(le.a)(Object(le.a)({},e),{},{userAlert:c});case C:return Object(le.a)(Object(le.a)({},e),{},{userAlert:null});default:return e}},xe=n(44),ye={friends:[],conversation:[],loadding:!1,chatAlert:null},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1?arguments[1]:void 0,n=t.type,c=t.payload;switch(n){case G:return Object(le.a)(Object(le.a)({},e),{},{loadding:!0});case J:return Object(le.a)(Object(le.a)({},e),{},{friends:c,loadding:!1});case Q:return Object(le.a)(Object(le.a)({},e),{},{friends:[],loadding:!1});case Y:return Object(le.a)(Object(le.a)({},e),{},{loadding:!0,conversation:[]});case Z:return Object(le.a)(Object(le.a)({},e),{},{conversation:[].concat(Object(xe.a)(e.conversation),[c]),loadding:!1});case q:var a=e.conversation.filter((function(e){return e.uuid!==c.uuid}));return Object(le.a)(Object(le.a)({},e),{},{conversation:[].concat(Object(xe.a)(a),[c]),loadding:!1});case z:return Object(le.a)(Object(le.a)({},e),{},{chatAlert:c});case K:return Object(le.a)(Object(le.a)({},e),{},{chatAlert:null});default:return e}},we=Object(he.combineReducers)({User:ve,Chat:Ne}),Ee=Object(he.createStore)(we,Object(Oe.composeWithDevTools)(Object(he.applyMiddleware)(pe.a))),Se=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"componentDidMount",value:function(){window.addEventListener("beforeunload",(function(){return"show warning"}))}},{key:"render",value:function(){return Object(c.jsx)("div",{})}}]),n}(o.Component);d.a.render(Object(c.jsx)(l.a.StrictMode,{children:Object(c.jsxs)(j.a,{store:Ee,children:[Object(c.jsx)(fe,{}),Object(c.jsx)(Se,{})]})}),document.getElementById("root"))},70:function(e,t,n){},74:function(e,t,n){},96:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.192796bf.chunk.js.map