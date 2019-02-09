import Vue from 'vue'
import axios from 'axios'

const endpoint = '/api/topics/'

const topicModule = {
  namespaced: true,
  state: {
    topics: {},
    loaded: false,
    selectedTopicId: undefined
  },
  getters: {
    loaded (state) {
      return state.loaded
    },
    selectedTopic (state) {
      return state.selectedTopicId ? state.topics[state.selectedTopicId] : undefined
    },
    selectedTopicLoaded (state) {
      const id = state.selectedTopicId
      return !id || id in state.topics
    }
  },
  mutations: {
    REPLACE_ALL (state, topics) {
      state.loaded = true
      state.topics = {}
      for (let topic of topics) {
        Vue.set(state.topics, topic.id, topic)
      }
    },
    UPSERT (state, topic) {
      const current = state.topics[topic.id]
      if (current && topic.modified < current.modified)
        return // don't update to older versions

      Vue.set(state.topics, topic.id, topic)
    },
    SELECT (state, id) {
      state.selectedTopicId = id
    },
    DELETE (state, id) {
      Vue.delete(state.topics, id)
      if (state.selectedTopicId.id == id) {
        state.selectedTopicId = undefined
      }
    }
  },
  actions: {
    initialize ({state, commit}) {
      if (!state.loaded) {
        axios.get(endpoint).then(response => {
          const topics = response.data
          commit('REPLACE_ALL', topics)
        })
      }
    },
    require ({commit}, id) {
      axios.get(endpoint + id + '/').then(response => {
        commit('UPSERT', response.data)
      })
    },
    upsert ({commit, state}, topic) {
      if (topic.id === undefined) {
        return axios.post(endpoint, topic).then(response => {
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
          return axios.patch(endpoint + topic.id + '/', delta).then(response => {
            commit('UPSERT', response.data)
            return new Promise((resolve, reject) => {
              resolve(response.data)
            })
          })
        }
      }
    },
    delete ({commit}, topic) {
      commit('DELETE', topic.id) // optimistic delete
      axios.delete(endpoint + topic.id + '/').then(response => {
        commit('DELETE', topic.id)
      })
    },
    select ({commit, dispatch, getters}, id) {
      commit('SELECT', id)
      if (!getters.selectedTopicLoaded)
        dispatch('require', id)
    }
  }
}

export default topicModule
