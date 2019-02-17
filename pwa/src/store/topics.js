import EntityModule from './entity'

const topicModule = {
  namespaced: true,
  modules: { entities: EntityModule('/api/topics/') },
  state: {
    selectedTopicId: undefined,
    loaded: false
  },
  getters: {
    loaded (state) {
      return state.loaded
    },
    topics (state, getters, rootState, rootGetters) {
      return rootGetters['topics/entities/entities']
    },
    selectedTopic (state, getters, rootState, rootGetters) {
      const selectedTopic = rootGetters['topics/entities/entities'][state.selectedTopicId]
      return state.selectedTopicId ? selectedTopic : undefined
    },
    selectedTopicLoaded (state, getters) {
      const id = state.selectedTopicId
      return !id || getters.selectedTopic
    }
  },
  mutations: {
    SELECT (state, id) {
      state.selectedTopicId = id
    },
    INITIALIZED (state) {
      state.loaded = true
    }
  },
  actions: {
    initialize ({dispatch, commit, state}) {
      dispatch('entities/require', null).then(() => {
        if (!state.loaded)
          commit('INITIALIZED')
      })
    },
    select ({commit, dispatch}, id) {
      commit('SELECT', id)
      if (id)
        dispatch('entities/require', { id })
    },
    upsert ({dispatch}, entity) {
      // if a date field has been cleared (set to empty string), send null
      // to tell the server to delete it (required by DRF)
      // TODO: Should this be fixed on the server side?
      // see https://github.com/encode/django-rest-framework/issues/5365
      if (entity.due === '') {
        entity.due = null
      }
      if (entity.ready === '') {
        entity.ready = null
      }

      return dispatch('entities/upsert', entity)
    },
    delete ({state, commit, dispatch}, id) {
      if (state.selectedTopicId == id)
        commit('SELECT', undefined)
      return dispatch('entities/delete', id)
    },
    updated ({dispatch}, topic) {
      dispatch('entities/updated', topic)
    },
    deleted ({state, dispatch, commit}, id) {
      if (state.selectedTopicId == id)
        commit('SELECT', undefined)
      dispatch('entities/deleted', id)
    }
  }
}

export default topicModule
