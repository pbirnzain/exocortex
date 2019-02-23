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
  strict: process.env.NODE_ENV !== 'production',
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
    frameReceived ({dispatch}, frame) {
      if (frame.type == 'topic_updated') {
        dispatch('topics/updated', frame.payload)
      } else if (frame.type == 'topic_deleted') {
        dispatch('topics/deleted', frame.payload)
      } else if (frame.type == 'textchunk_updated') {
        dispatch('topics/textchunks/updated', frame.payload)
      } else if (frame.type == 'textchunk_deleted') {
        dispatch('topics/textchunks/deleted', frame.payload)
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
  console.log(error)
  if (error.response.status === 403) {
    window.location.href = '/login/'
  } else {
    store.dispatch('setErrors', [error.message])
  }
  return Promise.reject(error)
})

export default store
