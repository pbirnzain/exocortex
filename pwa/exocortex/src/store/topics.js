import Vue from 'vue'
import axios from 'axios'

const topicModule = {
  namespaced: true,
  state: {
    topics: {},
    selectedTopicId: undefined
  },
  getters: {
    selectedTopic (state) {
      return state.selectedTopicId ? state.topics[state.selectedTopicId] : undefined
    }
  },
  mutations: {
    REPLACE_ALL (state, topics) {
      state.topics = {}
      for (let topic of topics) {
        Vue.set(state.topics, topic.id, topic)
      }
    },
    UPSERT_TOPIC (state, topic) {
      const current = state.topics[topic.id]
      if (current && topic.modified < current.modified) {
        return // don't update to older versions
      }

      Vue.set(state.topics, topic.id, topic)

      if (state.selectedTopic != undefined && topic.id == state.selectedTopic.id) {
        state.selectedTopic = topic
      }
    },
    SELECT_TOPIC (state, id) {
      state.selectedTopicId = id
    },
    DELETE_TOPIC (state, id) {
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
    upsertTopic ({commit, state}, topic) {
      if (topic.id === undefined) {
        axios.post('/api/topics/', topic).then(response => {
          commit('UPSERT_TOPIC', response.data)
          commit('SELECT_TOPIC', response.data.id)
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
          commit('UPSERT_TOPIC', topic) // optimistic update
          axios.patch('/api/topics/' + topic.id + '/', delta).then(response => {
            commit('UPSERT_TOPIC', response.data)
          })
        }
      }
    },
    selectTopic ({commit}, id) {
      commit('SELECT_TOPIC', id)
    },
    deleteTopic ({commit}, topic) {
      axios.delete('/api/topics/' + topic.id + '/').then(response => {
        commit('DELETE_TOPIC', topic.id)
      })
    }
  }
}

export default topicModule
