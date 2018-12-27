import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import topicModule from './topics'
import searchModule from './search'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
// axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    topics: topicModule,
    search: searchModule
  },
  actions: {
    frameReceived ({commit}, frame) {
      if (frame.type == 'update_topic') {
        commit('updateTopic', frame.payload)
      } else if (frame.type == 'delete_topic') {
        commit('deleteTopic', frame.payload)
      }
    }
  }
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 403) {
    window.location.href = '/login/'
  }
  return Promise.reject(error)
})
