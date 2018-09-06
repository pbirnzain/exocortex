import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
//axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true;

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    topics: {},
    selectedTopic: undefined,
  },
  getters: {
    urgentTopics (state) {
      return Object.values(state.topics).sort((a, b) =>
      {
        if (a.score.sum < b.score.sum) {
          return 1
        } else if (a.score.sum > b.score.sum) {
          return -1
        } else {
          return 0
        }
      });
    },
    selectedTopic (state) {
      return state.selectedTopic;
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
      if (topic.id === state.selectedTopic.id) {
        state.selectedTopic = topic;
      }
    },
    selectTopic (state, topic) {
      state.selectedTopic = topic;
    }
  },
  actions: {
    initialize ({commit}) {
      axios.get('/api/topics').then(response => {
        const topics = response.data
        commit('replaceAll', topics)
      })
    },
    updateTopic ({commit}, topic) {
      axios.put("/api/topics/" + topic.id + "/", topic).then(response => {
        commit('updateTopic', response.data)
      })
    },
    selectTopic ({commit}, topic) {
      commit('selectTopic', topic)
    }
  }
})
