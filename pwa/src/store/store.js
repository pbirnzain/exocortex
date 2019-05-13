import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import topicModule from './topics'
import searchModule from './search/search'
import errorModule from './error'
import loadingModule from './loading'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.withCredentials = true

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    topics: topicModule,
    search: searchModule,
    error: errorModule,
    loading: loadingModule
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
      } else if (frame.type == 'link_updated') {
        dispatch('topics/links/updated', frame.payload)
      } else if (frame.type == 'link_deleted') {
        dispatch('topics/links/deleted', frame.payload)
      }
    }
  }
})

export default store
