import Vue from 'vue'

import store from './store/store'
import './registerServiceWorker'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

// Websocket config
// HACK: At least move this to a dedicated file
const loc = window.location
var ws_endpoint
if (loc.protocol === 'http:') {
  ws_endpoint = 'ws:'
} else {
  ws_endpoint = 'wss:'
}
ws_endpoint += '//' + loc.host
ws_endpoint += '/api/ws/updates/'

new Vue({
  store,
  router,
  render: h => h(App),
  mounted() {
    this.$ws = new WebSocket(ws_endpoint)
    this.$ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if(msg.type == 'update_topic') {
        this.$store.commit("updateTopic", msg.payload)
      }
    }
  }
}).$mount('#app')
