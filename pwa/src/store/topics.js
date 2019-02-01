import Vue from 'vue'
import axios from 'axios'

const topicModule = {
  namespaced: true,
  state: {
    topics: {},
    topicsLoaded: false,
    selectedTopicId: undefined
  },
  getters: {
    selectedTopic (state) {
      return state.selectedTopicId ? state.topics[state.selectedTopicId] : undefined
    },
    topicsLoaded (state) {
      return state.topicsLoaded
    }
  },
  mutations: {
    REPLACE_ALL (state, topics) {
      state.topicsLoaded = true
      state.topics = {}
      for (let topic of topics) {
        Vue.set(state.topics, topic.id, topic)
      }
    },
    UPSERT (state, topic) {
      const current = state.topics[topic.id]
      if (current && topic.modified < current.modified) {
        return // don't update to older versions
      }

      Vue.set(state.topics, topic.id, topic)

      if (state.selectedTopic != undefined && topic.id == state.selectedTopic.id) {
        state.selectedTopic = topic
      }
    },
    SELECT (state, id) {
      state.selectedTopicId = id
    },
    DELETE (state, id) {
      Vue.delete(state.topics, id)
      if (state.selectedTopic !== undefined) {
        if (state.selectedTopic.id == id) {
          state.selectedTopic = undefined
        }
      }
    }
  },
  actions: {
    initialize ({commit}) {
      axios.get('/api/topics/').then(response => {
        const topics = response.data
        commit('REPLACE_ALL', topics)
      })
    },
    upsert ({commit, state}, topic) {
      if (topic.id === undefined) {
        return axios.post('/api/topics/', topic).then(response => {
          commit('UPSERT', response.data)
          commit('SELECT', response.data.id)
          return new Promise((resolve, reject) => {
            resolve(response.data)
          })
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

        const oldTopic = state.topics[topic.id]
        const delta = {}
        for (var key in topic) {
          if (oldTopic[key] != topic[key]) {
            delta[key] = topic[key]
          }
        }

        if (Object.keys(delta).length) {
          commit('UPSERT', topic) // optimistic update
          return axios.patch('/api/topics/' + topic.id + '/', delta).then(response => {
            commit('UPSERT', response.data)
            return new Promise((resolve, reject) => {
              resolve(response.data)
            })
          })
        }
      }
    },
    select ({commit}, id) {
      commit('SELECT', id)
    },
    delete ({commit}, topic) {
      commit('DELETE', topic.id) // optimistic delete
      axios.delete('/api/topics/' + topic.id + '/').then(response => {
        commit('DELETE', topic.id)
      })
    }
  }
}

export default topicModule
