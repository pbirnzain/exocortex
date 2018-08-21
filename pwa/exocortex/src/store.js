import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    topics: {}
  },
  getters: {
    topics (state) {
      return Object.values(state.topics)
    }
  },
  mutations: {
    replaceAll (state, topics) {
      state.topics = {}
      for (let topic of topics) {
        Vue.set(state.topics, topic.id, topic)
      }
    },
    updateTopic (state, topic) {
      Vue.set(state.topics, topic.id, topic)
    }
  },
  actions: {
    initialize ({commit}) {
      axios.get('/api/topics').then(response => {
        const topics = response.data
        topics.sort((a, b) => {
          if (a.score.sum < b.score.sum) {
            return 1
          } else if (a.score.sum > b.score.sum) {
            return -1
          } else {
            return 0
          }
        })
        commit('replaceAll', topics)
      })
    },
    updateTopic ({commit}, topic) {
      axios.put("/api/topics/" + topic.id + "/", topic).then(response => {
        commit('updateTopic', response.data)
      })
    }
  }
})
