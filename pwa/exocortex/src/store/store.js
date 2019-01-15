import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import topicModule from './topics'
import searchModule from './search/search'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
// axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    topics: topicModule,
    search: searchModule
  },
  state: {
    errors: null
  },
  mutations: {
    SET_ERRORS (state, error) {
      state.errors = error
    },
    CLEAR_ERRORS (state) {
      state.errors = null
    }
  },
  actions: {
    frameReceived ({commit}, frame) {
      if (frame.type == 'update_topic') {
        commit('topics/UPSERT_TOPIC', frame.payload)
      } else if (frame.type == 'delete_topic') {
        commit('topics/DELETETOPIC', frame.payload)
      }
    },
    setErrors ({commit}, error) {
      commit('SET_ERRORS', error)
    }
  }
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 403) {
    window.location.href = '/login/'
  } else {
    const desc = error.response.data.slice(0, error.response.data.indexOf('\n'))
    store.dispatch('setErrors', [error.message, desc])
  }
  return Promise.reject(error)
})

export default store
