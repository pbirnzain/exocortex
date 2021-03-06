import Vue from 'vue'
import store from './store/store'
import router from './router'
import './plugins/vuetify'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import App from './App.vue'
import { wsEndpoint } from './wsConfig'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),

  created () {
    this.connect()
  },

  i18n,

  methods: {
    connect () {
      this.$ws = new WebSocket(wsEndpoint)
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
