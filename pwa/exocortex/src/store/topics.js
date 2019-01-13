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
    REPLACEALL (state, topics) {
      state.topics = {}
      for (let topic of topics) {
        Vue.set(state.topics, topic.id, topic)
      }
    },
    UPDATETOPIC (state, topic) {
      Vue.set(state.topics, topic.id, topic)
      if (state.selectedTopic !== undefined) {
        if (topic.id == state.selectedTopic.id) {
          state.selectedTopic = topic
        }
      }
    },
    SELECTTOPIC (state, id) {
      state.selectedTopicId = id
    },
    DELETETOPIC (state, id) {
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
        commit('REPLACEALL', topics)
      })
    },
    updateTopic ({commit, state}, topic) {
      if (topic.id === undefined) {
        axios.post('/api/topics/', topic).then(response => {
          commit('UPDATETOPIC', response.data)
          commit('SELECTTOPIC', response.data.id)
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
          commit('UPDATETOPIC', topic) // optimistic update
          axios.patch('/api/topics/' + topic.id + '/', delta).then(response => {
            commit('UPDATETOPIC', response.data)
          })
        }
      }
    },
    selectTopic ({commit}, id) {
      commit('SELECTTOPIC', id)
    },
    deleteTopic ({commit}, topic) {
      axios.delete('/api/topics/' + topic.id + '/').then(response => {
        commit('DELETETOPIC', topic.id)
      })
    }
  }
}

export default topicModule
