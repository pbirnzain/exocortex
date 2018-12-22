import VueNativeSock from 'vue-native-websocket'
import './plugins/vuetify'
import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import './registerServiceWorker'
import router from './router'
import VueMaterial from 'vue-material'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.config.productionTip = false

// Websocket config
// HACK: At least move this to a dedicated file
const loc = window.location
var ws_endpoint;
if (loc.protocol === "http:") {
    ws_endpoint = "ws:";
} else {
    ws_endpoint = "wss:";
}
ws_endpoint += "//" + loc.host;
ws_endpoint += "/api/ws/updates/";
Vue.use(VueNativeSock, ws_endpoint, { store: store })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
