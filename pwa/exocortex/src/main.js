import Vue from 'vue'
import store from './store/store'
import router from './router'
import './plugins/vuetify'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
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
  mounted () {
    this.connect()
  },
  methods: {
    connect () {
      this.$ws = new WebSocket(ws_endpoint)
      this.$ws.onmessage = (event) => {
        this.$store.dispatch('frameReceived', JSON.parse(event.data))
      }
      this.$ws.onclose = (e) => {
        console.warn('WebSocket connection closed. Reconnecting in 2s.')
        setTimeout(() => {
          this.connect()
        }, 2000)
      }
      this.$ws.onerror = (e) => {
        console.error('WebSocket Error:', e)
      }
    }
  }
}).$mount('#app')
