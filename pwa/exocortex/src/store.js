import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
// axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    topics: {},
    selectedTopic: undefined
  },
  getters: {
    urgentTopics (state) {
      return Object.values(state.topics).sort((a, b) => {
        if (a.score.sum < b.score.sum) {
          return 1
        } else if (a.score.sum > b.score.sum) {
          return -1
        } else {
          return 0
        }
      })
    },
    selectedTopic (state) {
      return state.selectedTopic
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
      if (state.selectedTopic !== undefined) {
        if (topic.id === state.selectedTopic.id) {
          state.selectedTopic = topic
        }
      }
    },
    selectTopic (state, topic) {
      state.selectedTopic = topic
    },
    deleteTopic (state, id) {
      Vue.delete(state.topics, id)
      if (state.selectedTopic !== undefined) {
        if (state.selectedTopic.id === id) {
          state.selectedTopic = undefined
        }
      }
    },
    SOCKET_ONMESSAGE (state, message) {
      console.log('ws:', message)
    },
    SOCKET_ONOPEN (state, event) {
    },
    SOCKET_ONCLOSE (state, event) {
    },
    SOCKET_ONERROR (state, event) {
      console.error(event)
    }
  },
  actions: {
    initialize ({commit}) {
      axios.get('/api/topics/').then(response => {
        const topics = response.data
        commit('replaceAll', topics)
      })
    },
    updateTopic ({commit}, topic) {
      if (topic.id === undefined) {
        axios.post('/api/topics/', topic).then(response => {
          commit('updateTopic', response.data)
          commit('selectTopic', response.data)
        })
      } else {
        // if a date field has been cleared (set to empty string), send null
        // to tell the server to delete it (required by DRF)
        // TODO: Should this be fixed on the server side?
        // see https://github.com/encode/django-rest-framework/issues/5365
        if (topic.due === '') {
          topic.due = null
        }
        if (topic.ready === '') {
          topic.ready = null
        }

        axios.put('/api/topics/' + topic.id + '/', topic).then(response => {
          commit('updateTopic', response.data)
        })
      }
    },
    selectTopic ({commit}, topic) {
      commit('selectTopic', topic)
    },
    deleteTopic ({commit}, topic) {
      axios.delete('/api/topics/' + topic.id + '/').then(response => {
        commit('deleteTopic', topic.id)
      })
    }
  }
})

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 403) {
      window.location.href = "/login/"
    }
    return Promise.reject(error);
  });
