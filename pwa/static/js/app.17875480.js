(function(e){function t(t){for(var o,s,c=t[0],a=t[1],l=t[2],u=0,d=[];u<c.length;u++)s=c[u],n[s]&&d.push(n[s][0]),n[s]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);p&&p(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],o=!0,s=1;s<r.length;s++){var c=r[s];0!==n[c]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var o={},s={app:0},n={app:0},i=[];function c(e){return a.p+"js/"+({}[e]||e)+"."+{"chunk-dc34":"f15dd150","chunk-5de8":"631cbbd7","chunk-f9a9":"67de30ca"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.e=function(e){var t=[],r={"chunk-dc34":1,"chunk-5de8":1,"chunk-f9a9":1};s[e]?t.push(s[e]):0!==s[e]&&r[e]&&t.push(s[e]=new Promise(function(t,r){for(var o="css/"+({}[e]||e)+"."+{"chunk-dc34":"ceb2c31d","chunk-5de8":"ed0e9127","chunk-f9a9":"740e68e6"}[e]+".css",s=a.p+o,n=document.getElementsByTagName("link"),i=0;i<n.length;i++){var c=n[i],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===o||l===s))return t()}var u=document.getElementsByTagName("style");for(i=0;i<u.length;i++){c=u[i],l=c.getAttribute("data-href");if(l===o||l===s)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var o=t&&t.target&&t.target.src||s,n=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");n.request=o,r(n)},d.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){s[e]=0}));var o=n[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise(function(t,r){o=n[e]=[t,r]});t.push(o[2]=i);var l,u=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,a.nc&&d.setAttribute("nonce",a.nc),d.src=c(e),l=function(t){d.onerror=d.onload=null,clearTimeout(p);var r=n[e];if(0!==r){if(r){var o=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+s+")");i.type=o,i.request=s,r[1](i)}n[e]=void 0}};var p=setTimeout(function(){l({type:"timeout",target:d})},12e4);d.onerror=d.onload=l,u.appendChild(d)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/static/",a.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var p=u;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"21bb":function(e,t,r){"use strict";var o=r("9fb8"),s=r.n(o);s.a},"2b80":function(e,t,r){},"3d7c":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);var o=r("2b0e"),s=r("2f62"),n=r("bc3a"),i=r.n(n);const c={namespaced:!0,state:{topics:{},selectedTopicId:void 0},getters:{selectedTopic(e){return e.selectedTopicId?e.topics[e.selectedTopicId]:void 0}},mutations:{REPLACE_ALL(e,t){e.topics={};for(let r of t)o["a"].set(e.topics,r.id,r)},UPSERT_TOPIC(e,t){const r=e.topics[t.id];r&&t.modified<r.modified||(o["a"].set(e.topics,t.id,t),void 0!=e.selectedTopic&&t.id==e.selectedTopic.id&&(e.selectedTopic=t))},SELECT_TOPIC(e,t){e.selectedTopicId=t},DELETE_TOPIC(e,t){o["a"].delete(e.topics,t),void 0!==e.selectedTopic&&e.selectedTopic.id==t&&(e.selectedTopic=void 0)}},actions:{initialize({commit:e}){i.a.get("/api/topics/").then(t=>{const r=t.data;e("REPLACE_ALL",r)})},upsertTopic({commit:e,state:t},r){if(void 0===r.id)i.a.post("/api/topics/",r).then(t=>{e("UPSERT_TOPIC",t.data),e("SELECT_TOPIC",t.data.id)});else{""===r.due&&(r.due=null),""===r.ready&&(r.ready=null);const s=t.topics[r.id],n={};for(var o in r)s[o]!=r[o]&&(n[o]=r[o]);Object.keys(n).length&&(e("UPSERT_TOPIC",r),i.a.patch("/api/topics/"+r.id+"/",n).then(t=>{e("UPSERT_TOPIC",t.data)}))}},selectTopic({commit:e},t){e("SELECT_TOPIC",t)},deleteTopic({commit:e},t){i.a.delete("/api/topics/"+t.id+"/").then(r=>{e("DELETE_TOPIC",t.id)})}}};var a=c;const l={namespaced:!0,state:{searchText:"",filter:"urgent"},getters:{matchingTopics(e,t,r){const o=e.searchText.toLowerCase(),s=Object.values(r.topics.topics).filter(e=>{return e.title.toLowerCase().indexOf(o)>=0||e.text.toLowerCase().indexOf(o)>=0});return s},urgentTopics(e,t,r){return t.matchingTopics.filter(e=>e.score.sum>10)},readyTopics(e,t){return t.matchingTopics.filter(e=>e.score.sum<=10&&e.score.sum>0&&!e.complete)},blockedTopics(e,t){return t.matchingTopics.filter(e=>e.score.sum<0&&!e.complete)},uncriticalTopics(e,t){return t.matchingTopics.filter(e=>0==e.score.sum&&!e.complete)},resultingTopics(e,t){let r;return r="all"===e.filter?t.matchingTopics:"ready"===e.filter?t.readyTopics:"blocked"===e.filter?t.blockedTopics:"uncritical"===e.filter?t.uncriticalTopics:t.urgentTopics,r.sort((e,t)=>{return e.score.sum<t.score.sum?1:e.score.sum>t.score.sum?-1:e.ready<t.ready?-1:e.ready>t.ready?1:0})}},mutations:{SET_SEARCH_TEXT(e,t){e.searchText=t||""},SET_FILTER(e,t){e.filter=t||"urgent"}},actions:{setSearchText({commit:e},t){e("SET_SEARCH_TEXT",t)},setFilter({commit:e},t){e("SET_FILTER",t)}}};var u=l;i.a.defaults.xsrfCookieName="csrftoken",i.a.defaults.xsrfHeaderName="X-CSRFTOKEN",i.a.defaults.withCredentials=!0,o["a"].use(s["a"]);const d=new s["a"].Store({strict:!0,modules:{topics:a,search:u},state:{errors:null},mutations:{SET_ERRORS(e,t){e.errors=t},CLEAR_ERRORS(e){e.errors=null}},actions:{frameReceived({commit:e},t){"update_topic"==t.type?e("topics/UPSERT_TOPIC",t.payload):"delete_topic"==t.type&&e("topics/DELETE_TOPIC",t.payload)},setErrors({commit:e},t){e("SET_ERRORS",t)}}});i.a.interceptors.response.use(function(e){return e},function(e){if(403===e.response.status)window.location.href="/login/";else{const t=e.response.data.slice(0,e.response.data.indexOf("\n"));d.dispatch("setErrors",[e.message,t])}return Promise.reject(e)});var p=d,h=r("8c4f"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("v-btn",{attrs:{fab:"",fixed:"",bottom:"",right:"",color:"red"},on:{click:e.onNewTopic}},[r("v-icon",[e._v("add")])],1),r("home-toolbar"),r("div",{staticClass:"topic-list-wrapper"},[r("topic-list",{attrs:{topics:e.resultingTopics,showText:e.showText},on:{"topic-selected":e.onSelect}},[e.searchText||"urgent"!==e.filter?r("empty-state",{attrs:{tagline:"No tasks found.",message:"Try using a different filter, search text, or add new topics."}}):r("empty-state",{attrs:{img:"/img/empty_state_background.svg",tagline:"No urgent tasks.",message:"Go do something fun!"}})],1)],1)],1)},m=[],v=r("8336"),T=r("549c"),g=r("132d"),b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-toolbar",{staticClass:"home-toolbar"},[e.showSearchInput?[r("v-text-field",{ref:"search",attrs:{value:e.searchText,placeholder:"Search"},on:{input:e.onSearchTextChanged}}),e.searchText?r("a",{on:{click:e.onAdd}},[r("v-icon",[e._v("add")])],1):e._e(),r("a",{on:{click:e.onClearSearchText}},[r("v-icon",[e._v("clear")])],1)]:[r("v-toolbar-title",[e._v(e._s(e.filter))]),r("v-spacer"),r("a",{on:{click:function(t){e.showSearchInput=!0}}},[r("v-icon",[e._v("search")])],1)],r("v-menu",[r("a",{attrs:{slot:"activator"},on:{click:function(t){e.showFilters=!0}},slot:"activator"},[r("v-icon",[e._v("filter_list")])],1),r("v-list",e._l(e.filters,function(t){return r("v-list-tile",{key:t,on:{click:function(r){e.onFilterChanged(t)}}},[r("v-list-tile-title",{staticClass:"filter-tile",domProps:{textContent:e._s(t)}})],1)}))],1)],2)},_=[],E=r("71d9"),w=r("2a7f"),S=r("9910"),x=r("2677"),C=r("e449"),k=r("8860"),y=r("ba95"),O=r("5d23");const P=["urgent","ready","uncritical","blocked","all"];var $={components:{VToolbar:E["a"],VToolbarTitle:w["a"],VIcon:g["a"],VSpacer:S["a"],VTextField:x["a"],VMenu:C["a"],VList:k["a"],VListTile:y["a"],VListTileTitle:O["c"]},data(){return{showSearchInput:!!this.$store.state.search.searchText,showFilters:!1}},computed:{filter(){return this.$store.state.search.filter},filters(){return P},searchText(){return this.$store.state.search.searchText}},watch:{showSearchInput(e){e&&o["a"].nextTick(()=>{this.$refs.search.focus()})}},methods:{onFilterChanged(e){this.$store.dispatch("search/setFilter",e)},onSearchTextChanged(e){this.$store.dispatch("search/setSearchText",e)},onClearSearchText(){this.showSearchInput=!1,this.$store.dispatch("search/setSearchText","")},onAdd(){this.showSearchInput=!1;const e={title:this.searchText,pinned:!0};this.$store.dispatch("topics/upsertTopic",e),this.$store.dispatch("search/setSearchText","")}}},L=$,R=(r("d770"),r("2877")),I=Object(R["a"])(L,b,_,!1,null,null,null);I.options.__file="HomeToolbar.vue";var V=I.exports,j=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"topic-list"},[e.title?r("h1",[e._v(e._s(e.title))]):e._e(),e.topics.length>0?r("v-list",e._l(e.topics,function(t){return r("v-list-tile",{key:t.id,attrs:{color:e.color(t)},on:{click:function(r){e.onClick(t)}}},[r("v-list-tile-content",[r("v-list-tile-title",{domProps:{textContent:e._s(t.title)}}),e.showText?r("v-list-tile-sub-title",{domProps:{textContent:e._s(t.text)}}):e._e()],1)],1)})):e._e(),0===e.topics.length?e._t("default"):e._e()],2)},A=[],F=r("ce7e"),N={props:["title","topics","showText"],components:{VList:k["a"],VDivider:F["a"],VListTile:y["a"],VListTileContent:O["a"],VListTileTitle:O["c"],VListTileSubTitle:O["b"]},methods:{onClick(e){this.$emit("topic-selected",e)},color(e){return e.score.reasons["is overdue"]?"error":e.score.sum>60?"warning":e.complete?"success":void 0}}},B=N,H=(r("e0db"),Object(R["a"])(B,j,A,!1,null,null,null));H.options.__file="TopicList.vue";var M=H.exports,U=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-tabs",{attrs:{value:e.selectionIdx,grow:!0},on:{change:e.onSelectionChanged}},e._l(e.filters,function(t){return r("v-tab",[e._v(e._s(t))])}))},D=[],q=r("fe57"),J=r("71a3"),W={props:["selection"],components:{VTabs:q["a"],VTab:J["a"]},computed:{selectionIdx(){return P.indexOf(this.selection)},filters(){return P}},methods:{onSelectionChanged(e){const t=P[e];this.$emit("selectionChanged",t)}}},X=W,z=Object(R["a"])(X,U,D,!1,null,null,null);z.options.__file="FilterSelection.vue";var G=z.exports,K=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"empty-state",attrs:{slot:"empty"},slot:"empty"},[r("div",{staticClass:"content"},[e.img?r("img",{attrs:{src:e.img}}):e._e(),r("div",{staticClass:"tagline"},[e._v(e._s(e.tagline))]),r("div",{staticClass:"message"},[e._v(e._s(e.message))])])])},Q=[],Y={props:["img","tagline","message"]},Z=Y,ee=(r("5915"),Object(R["a"])(Z,K,Q,!1,null,null,null));ee.options.__file="EmptyState.vue";var te=ee.exports,re={name:"home",components:{VBtn:v["a"],VContent:T["a"],VIcon:g["a"],HomeToolbar:V,TopicList:M,FilterSelection:G,EmptyState:te},created(){this.$store.dispatch("topics/initialize")},computed:{resultingTopics(){return this.$store.getters["search/resultingTopics"]},showText(){return""!=this.$store.state.search.searchText},searchText(){return this.$store.state.search.searchText},filter(){return this.$store.state.search.filter}},methods:{onNewTopic(){this.$router.push("/new")},onSelect(e){this.$router.push(`/edit/${e.id}`)}}},oe=re,se=(r("21bb"),Object(R["a"])(oe,f,m,!1,null,null,null));se.options.__file="Home.vue";var ne=se.exports;o["a"].use(h["a"]);var ie=new h["a"]({routes:[{path:"/",name:"home",component:ne},{path:"/new",name:"new",component:()=>Promise.all([r.e("chunk-dc34"),r.e("chunk-5de8")]).then(r.bind(null,"67bf"))},{path:"/edit/:id",name:"edit",component:()=>Promise.all([r.e("chunk-dc34"),r.e("chunk-f9a9")]).then(r.bind(null,"1071"))}]}),ce=r("bb71");r("da64");o["a"].use(ce["a"],{customProperties:!0,iconfont:"md"});var ae=r("9483");Object(ae["a"])("/static/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(){console.log("Content has been cached for offline use.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});r("d5e8");var le=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app"},[r("error-snackbar"),r("v-app",[r("v-content",[r("router-view")],1)],1)],1)},ue=[],de=r("7496"),pe=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-snackbar",{attrs:{value:e.errors,top:!0,right:!0,"auto-height":!0,color:"error",timeout:0}},[r("div",e._l(e.errors,function(t){return r("div",[e._v(e._s(t))])})),r("v-btn",{attrs:{dark:"",flat:""},on:{click:e.clearErrors}},[e._v("Close")])],1)},he=[],fe=r("2db4"),me={components:{VSnackbar:fe["a"],VBtn:v["a"]},data(){return{showErrors:!1}},computed:{errors(){return this.$store.state.errors}},methods:{clearErrors(){this.$store.commit("CLEAR_ERRORS")}}},ve=me,Te=(r("d8f3"),Object(R["a"])(ve,pe,he,!1,null,null,null));Te.options.__file="ErrorSnackbar.vue";var ge=Te.exports,be={name:"app",components:{VApp:de["a"],VContent:T["a"],ErrorSnackbar:ge}},_e=be,Ee=(r("5c0b"),Object(R["a"])(_e,le,ue,!1,null,null,null));Ee.options.__file="App.vue";var we=Ee.exports;const Se=window.location;var xe;xe="http:"===Se.protocol?"ws:":"wss:",xe+="//"+Se.host,xe+="/api/ws/updates/",o["a"].config.productionTip=!1,new o["a"]({store:p,router:ie,render:e=>e(we),created(){this.connect()},methods:{connect(){this.$ws=new WebSocket(xe),this.$ws.onmessage=(e=>{this.$store.dispatch("frameReceived",JSON.parse(e.data))}),this.$ws.onclose=(e=>{console.warn("WebSocket connection closed. Reconnecting in 2s."),setTimeout(()=>{this.connect()},2e3)}),this.$ws.onerror=(e=>{console.error("WebSocket Error:",e)})}}}).$mount("#app")},5915:function(e,t,r){"use strict";var o=r("b9d2"),s=r.n(o);s.a},"5c0b":function(e,t,r){"use strict";var o=r("3d7c"),s=r.n(o);s.a},6773:function(e,t,r){},"9fb8":function(e,t,r){},b9d2:function(e,t,r){},d4ab:function(e,t,r){},d770:function(e,t,r){"use strict";var o=r("6773"),s=r.n(o);s.a},d8f3:function(e,t,r){"use strict";var o=r("d4ab"),s=r.n(o);s.a},e0db:function(e,t,r){"use strict";var o=r("2b80"),s=r.n(o);s.a}});
//# sourceMappingURL=app.17875480.js.map