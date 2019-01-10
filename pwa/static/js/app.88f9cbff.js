(function(e){function t(t){for(var s,n,r=t[0],c=t[1],l=t[2],p=0,u=[];p<r.length;p++)n=r[p],i[n]&&u.push(i[n][0]),i[n]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);d&&d(t);while(u.length)u.shift()();return a.push.apply(a,l||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],s=!0,r=1;r<o.length;r++){var c=o[r];0!==i[c]&&(s=!1)}s&&(a.splice(t--,1),e=n(n.s=o[0]))}return e}var s={},i={app:0},a=[];function n(t){if(s[t])return s[t].exports;var o=s[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=s,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/static/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=c;a.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"0927":function(e,t,o){"use strict";var s=o("97c5"),i=o.n(s);i.a},"1b9b":function(e,t,o){"use strict";var s=o("2eb2"),i=o.n(s);i.a},"21bb":function(e,t,o){"use strict";var s=o("9fb8"),i=o.n(s);i.a},"2b80":function(e,t,o){},"2eb2":function(e,t,o){},3734:function(e,t,o){"use strict";var s=o("df66"),i=o.n(s);i.a},"3d7c":function(e,t,o){},"56d7":function(e,t,o){"use strict";o.r(t);var s=o("2b0e"),i=o("2f62"),a=o("bc3a"),n=o.n(a);const r={namespaced:!0,state:{topics:{},selectedTopicId:void 0},getters:{filteredTopics(e,t,o){const s=o.search.searchText.toLowerCase(),i=Object.values(e.topics).filter(e=>{return e.title.toLowerCase().indexOf(s)>=0||e.text.toLowerCase().indexOf(s)>=0});return i},urgentTopics(e,t,o){const s=t.filteredTopics;return s.sort((e,t)=>{return e.score.sum<t.score.sum?1:e.score.sum>t.score.sum?-1:0})},selectedTopic(e){return e.selectedTopicId?e.topics[e.selectedTopicId]:void 0}},mutations:{REPLACEALL(e,t){e.topics={};for(let o of t)s["a"].set(e.topics,o.id,o)},UPDATETOPIC(e,t){s["a"].set(e.topics,t.id,t),void 0!==e.selectedTopic&&t.id==e.selectedTopic.id&&(e.selectedTopic=t)},SELECTTOPIC(e,t){e.selectedTopicId=t},DELETETOPIC(e,t){s["a"].delete(e.topics,t),void 0!==e.selectedTopic&&e.selectedTopic.id==t&&(e.selectedTopic=void 0)}},actions:{initialize({commit:e}){n.a.get("/api/topics/").then(t=>{const o=t.data;e("REPLACEALL",o)})},updateTopic({commit:e,state:t},o){if(void 0===o.id)n.a.post("/api/topics/",o).then(t=>{e("UPDATETOPIC",t.data),e("SELECTTOPIC",t.data.id)});else{""===o.due&&(o.due=null),""===o.ready&&(o.ready=null);const i=t.topics[o.id],a={};for(var s in o)i[s]!=o[s]&&(a[s]=o[s]);Object.keys(a).length&&(e("UPDATETOPIC",o),n.a.patch("/api/topics/"+o.id+"/",a).then(t=>{e("UPDATETOPIC",t.data)}))}},selectTopic({commit:e},t){e("SELECTTOPIC",t)},deleteTopic({commit:e},t){n.a.delete("/api/topics/"+t.id+"/").then(o=>{e("DELETETOPIC",t.id)})}}};var c=r;const l={namespaced:!0,state:{searchText:""},mutations:{SETSEARCHTEXT(e,t){e.searchText=t||""}},actions:{setSearchText({commit:e},t){e("SETSEARCHTEXT",t)}}};var d=l;n.a.defaults.xsrfCookieName="csrftoken",n.a.defaults.xsrfHeaderName="X-CSRFTOKEN",n.a.defaults.withCredentials=!0,s["a"].use(i["a"]);const p=new i["a"].Store({strict:!0,modules:{topics:c,search:d},state:{errors:null},mutations:{SET_ERRORS(e,t){e.errors=t},CLEAR_ERRORS(e){e.errors=null}},actions:{frameReceived({commit:e},t){"update_topic"==t.type?e("topics/UPDATETOPIC",t.payload):"delete_topic"==t.type&&e("topics/DELETETOPIC",t.payload)},setErrors({commit:e},t){e("SET_ERRORS",t)}}});n.a.interceptors.response.use(function(e){return e},function(e){if(403===e.response.status)window.location.href="/login/";else{const t=e.response.data.slice(0,e.response.data.indexOf("\n"));p.dispatch("setErrors",[e.message,t])}return Promise.reject(e)});var u=p,h=o("8c4f"),m=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[o("topic-list",{attrs:{topics:e.urgentTopics},on:{"topic-selected":e.onSelect}})],1)},f=[],v=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"topic-list"},[e.title?o("h1",[e._v(e._s(e.title))]):e._e(),o("v-list",e._l(e.topics,function(t){return o("v-list-tile",{key:t.id,attrs:{color:e.color(t)},on:{click:function(o){e.onClick(t)}}},[o("v-list-tile-content",[o("v-list-tile-title",{domProps:{textContent:e._s(t.title)}}),e.showText?o("v-list-tile-sub-title",{domProps:{textContent:e._s(t.text)}}):e._e()],1)],1)}))],1)},b=[],T=o("8860"),g=o("ce7e"),w=o("ba95"),_=o("5d23"),x={props:["title","topics"],components:{VList:T["a"],VDivider:g["a"],VListTile:w["a"],VListTileContent:_["a"],VListTileTitle:_["c"],VListTileSubTitle:_["b"]},computed:{showText(){return""!=this.$store.state.search.searchText}},methods:{onClick(e){this.$emit("topic-selected",e)},color(e){return e.score.reasons["is overdue"]?"error":e.score.sum>60?"warning":e.complete?"success":void 0}}},C=x,E=(o("e0db"),o("2877")),k=Object(E["a"])(C,v,b,!1,null,null,null);k.options.__file="TopicList.vue";var $=k.exports,y={name:"home",components:{TopicList:$},computed:{urgentTopics(){return this.$store.getters["topics/urgentTopics"]}},methods:{onSelect(e){this.$router.push(`/edit/${e.id}`)}}},O=y,P=(o("21bb"),Object(E["a"])(O,m,f,!1,null,null,null));P.options.__file="Home.vue";var S=P.exports,R=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"edit-topic"},[o("v-container",[o("topic",{attrs:{topic:e.selectedTopic},on:{"topic-changed":e.onTopicChanged}}),o("v-btn",{attrs:{flat:""},on:{click:e.onDelete}},[e._v("Delete")])],1)],1)},V=[],L=o("8336"),A=o("a523"),j=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"topic"},[o("v-text-field",{ref:"title",attrs:{disabled:e.disabled},on:{input:e.onInput},model:{value:e.template.title,callback:function(t){e.$set(e.template,"title",t)},expression:"template.title"}}),e.template.score?o("div",{staticClass:"md-subhead score-reasons"},[o("span",[e._v("Urgency: "+e._s(e.template.score.sum))]),e._l(e.template.score.reasons,function(t,s,i){return o("span",{key:i},[e._v("("+e._s(s)+": "+e._s(t)+")")])})],2):e._e(),o("div",{staticClass:"horizontal"},[o("v-checkbox",{attrs:{label:"pinned",disabled:e.disabled},on:{change:e.onChange},model:{value:e.template.pinned,callback:function(t){e.$set(e.template,"pinned",t)},expression:"template.pinned"}}),o("v-checkbox",{attrs:{label:"complete",disabled:e.disabled},on:{change:e.onChange},model:{value:e.template.complete,callback:function(t){e.$set(e.template,"complete",t)},expression:"template.complete"}})],1),o("v-dialog",{attrs:{lazy:"","full-width":"",width:"290px",disabled:e.disabled},model:{value:e.showDuePicker,callback:function(t){e.showDuePicker=t},expression:"showDuePicker"}},[o("v-text-field",{attrs:{slot:"activator",readonly:"",label:"Due","prepend-icon":"event",clearable:!0,disabled:e.disabled},on:{input:e.onChange},slot:"activator",model:{value:e.template.due,callback:function(t){e.$set(e.template,"due",t)},expression:"template.due"}}),o("v-date-picker",{attrs:{scrollable:""},on:{change:e.onChange},model:{value:e.template.due,callback:function(t){e.$set(e.template,"due",t)},expression:"template.due"}})],1),o("v-dialog",{attrs:{lazy:"","full-width":"",width:"290px",disabled:e.disabled},model:{value:e.showReadyPicker,callback:function(t){e.showReadyPicker=t},expression:"showReadyPicker"}},[o("v-text-field",{attrs:{slot:"activator",readonly:"",label:"Ready","prepend-icon":"event",clearable:!0,disabled:e.disabled},on:{input:e.onChange},slot:"activator",model:{value:e.template.ready,callback:function(t){e.$set(e.template,"ready",t)},expression:"template.ready"}}),o("v-date-picker",{attrs:{scrollable:""},on:{change:e.onChange},model:{value:e.template.ready,callback:function(t){e.$set(e.template,"ready",t)},expression:"template.ready"}})],1),o("v-textarea",{attrs:{"auto-grow":"",label:"Content",disabled:e.disabled},on:{input:e.onInput},model:{value:e.template.text,callback:function(t){e.$set(e.template,"text",t)},expression:"template.text"}})],1)},D=[],I=o("2677"),B=o("2e4b"),N=o("169a"),U=o("a844"),z=o("ac7c"),F=o("2ef0"),H={props:["topic","disabled"],components:{VTextField:I["a"],VDatePicker:B["a"],VDialog:N["a"],VTextarea:U["a"],VCheckbox:z["a"],VBtn:L["a"]},data(){return{showDuePicker:!1,showReadyPicker:!1}},computed:{template(){return Object.assign({pinned:!0},this.topic)},dirty(){return!this.topic&&(""!=this.template.title&&void 0!=this.template.title)}},mounted(){this.$refs.title.focus()},methods:{onInput:Object(F["debounce"])(function(){this.onChange()},500),onChange(){this.showDuePicker=!1,this.showReadyPicker=!1,this.$emit("topic-changed",this.template)}},beforeDestroy(){this.dirty&&this.$emit("topic-changed",this.template)}},M=H,J=(o("3734"),Object(E["a"])(M,j,D,!1,null,null,null));J.options.__file="Topic.vue";var W=J.exports,X={name:"app",components:{Topic:W,VBtn:L["a"],VContainer:A["a"]},computed:{selectedTopic(){return this.$store.getters["topics/selectedTopic"]}},watch:{selectedTopic(e){e||this.$router.push("/")}},mounted(){this.$store.dispatch("topics/selectTopic",this.$route.params.id)},beforeRouteUpdate(e,t,o){this.$store.dispatch("topics/selectTopic",e.params.id),o()},beforeRouteLeave(e,t,o){this.selectedTopic&&this.$store.dispatch("topics/selectTopic",void 0),o()},methods:{onTopicChanged(e){this.$store.dispatch("topics/updateTopic",e)},onDelete(){this.$store.dispatch("topics/deleteTopic",this.selectedTopic)}}},q=X,K=(o("1b9b"),Object(E["a"])(q,R,V,!1,null,null,null));K.options.__file="Edit.vue";var G=K.exports,Q=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"edit-topic"},[o("v-container",[o("topic",{attrs:{topic:e.newTopic,disabled:e.disabled},on:{"topic-changed":e.onTopicChanged}})],1)],1)},Y=[],Z={name:"app",components:{Topic:W,VBtn:L["a"],VContainer:A["a"]},data(){return{newTopic:null,disabled:!1}},computed:{selectedTopic(){return this.$store.getters["topics/selectedTopic"]}},watch:{selectedTopic(e){e&&this.$router.push("/edit/"+e.id)}},methods:{onTopicChanged(e){this.disabled||(this.$store.dispatch("topics/updateTopic",e),this.disabled=!0)}}},ee=Z,te=(o("0927"),Object(E["a"])(ee,Q,Y,!1,null,null,null));te.options.__file="New.vue";var oe=te.exports;s["a"].use(h["a"]);var se=new h["a"]({routes:[{path:"/",name:"home",component:S},{path:"/new",name:"new",component:oe},{path:"/edit/:id",name:"edit",component:G}]}),ie=o("bb71");o("da64");s["a"].use(ie["a"],{customProperties:!0,iconfont:"md"});var ae=o("9483");Object(ae["a"])("/static/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(){console.log("Content has been cached for offline use.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});o("d5e8");var ne=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app"},[e.showAddButton?o("v-btn",{attrs:{fab:"",fixed:"",bottom:"",right:"",color:"red"},on:{click:e.onNewTopic}},[o("v-icon",[e._v("add")])],1):e._e(),o("error-snackbar"),o("v-app",[o("v-toolbar",{attrs:{app:""}},[o("v-icon",[e._v("all_inbox")]),o("v-icon",[e._v("memory")]),o("v-toolbar-title",[o("router-link",{staticClass:"md-title",attrs:{to:{name:"home",params:{}}}},[e._v("ExoCortex")])],1),o("v-spacer"),e.showAddButton?o("v-text-field",{attrs:{value:e.searchText,placeholder:"Search","prepend-icon":"search",clearable:!0},on:{input:e.onSearchTextChanged}}):e._e()],1),o("v-content",{attrs:{app:""}},[o("router-view")],1)],1)],1)},re=[],ce=o("7496"),le=o("71d9"),de=o("2a7f"),pe=o("549c"),ue=o("132d"),he=o("9910"),me=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-snackbar",{attrs:{value:e.errors,top:!0,right:!0,"auto-height":!0,color:"error",timeout:0}},[o("div",e._l(e.errors,function(t){return o("div",[e._v(e._s(t))])})),o("v-btn",{attrs:{dark:"",flat:""},on:{click:e.clearErrors}},[e._v("Close")])],1)},fe=[],ve=o("2db4"),be={components:{VSnackbar:ve["a"],VBtn:L["a"]},data(){return{showErrors:!1}},computed:{errors(){return this.$store.state.errors}},methods:{clearErrors(){this.$store.commit("CLEAR_ERRORS")}}},Te=be,ge=(o("d8f3"),Object(E["a"])(Te,me,fe,!1,null,null,null));ge.options.__file="ErrorSnackbar.vue";var we=ge.exports,_e={name:"app",components:{VApp:ce["a"],VToolbar:le["a"],VToolbarTitle:de["a"],VContent:pe["a"],VContainer:A["a"],VBtn:L["a"],VIcon:ue["a"],VSpacer:he["a"],VTextField:I["a"],ErrorSnackbar:we},data(){return{showAddButton:!1}},computed:{searchText(){return this.$store.state.search.searchText}},mounted(){this.$store.dispatch("topics/initialize"),this.showAddButton="/"===this.$router.currentRoute.path,this.$router.afterEach((e,t)=>{this.showAddButton="/"===this.$router.currentRoute.path})},methods:{onNewTopic(){this.$router.push("/new")},onSearchTextChanged(e){this.$store.dispatch("search/setSearchText",e)}}},xe=_e,Ce=(o("5c0b"),Object(E["a"])(xe,ne,re,!1,null,null,null));Ce.options.__file="App.vue";var Ee=Ce.exports;s["a"].config.productionTip=!1;const ke=window.location;var $e;$e="http:"===ke.protocol?"ws:":"wss:",$e+="//"+ke.host,$e+="/api/ws/updates/",new s["a"]({store:u,router:se,render:e=>e(Ee),mounted(){this.connect()},methods:{connect(){this.$ws=new WebSocket($e),this.$ws.onmessage=(e=>{this.$store.dispatch("frameReceived",JSON.parse(e.data))}),this.$ws.onclose=(e=>{console.warn("WebSocket connection closed. Reconnecting in 2s."),setTimeout(()=>{this.connect()},2e3)}),this.$ws.onerror=(e=>{console.error("WebSocket Error:",e)})}}}).$mount("#app")},"5c0b":function(e,t,o){"use strict";var s=o("3d7c"),i=o.n(s);i.a},"97c5":function(e,t,o){},"9fb8":function(e,t,o){},d4ab:function(e,t,o){},d8f3:function(e,t,o){"use strict";var s=o("d4ab"),i=o.n(s);i.a},df66:function(e,t,o){},e0db:function(e,t,o){"use strict";var s=o("2b80"),i=o.n(s);i.a}});
//# sourceMappingURL=app.88f9cbff.js.map