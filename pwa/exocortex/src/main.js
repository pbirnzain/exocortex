import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

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
