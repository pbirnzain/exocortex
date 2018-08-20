import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    topics: undefined
  },
  getters: {
    topics (state) {
      if (state.topics) {
        return Array.from(state.topics.values())
      }
      return []
    }
  },
  mutations: {
    replaceAll (state, topics) {
      state.topics = new Map()
      for (let topic of topics) {
        state.topics.set(topic.id, topic)
      }
    },
    updateTopic (state, topic) {
      state.topics.set(topic.id, topic)
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
        commit('updateTopic', topic)
      })
    }
  }
})
