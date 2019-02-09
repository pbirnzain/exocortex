import EntityModule from './entity'

const entityModule = EntityModule('/api/topics/')
const topicModule = {
  namespaced: true,
  state: {...entityModule.state,
    selectedTopicId: undefined,
    loaded: false
  },
  getters: {
    loaded (state) {
      return state.loaded
    },
    selectedTopic (state) {
      return state.selectedTopicId ? state.entities[state.selectedTopicId] : undefined
    },
    selectedTopicLoaded (state) {
      const id = state.selectedTopicId
      return !id || id in state.entities
    }
  },
  mutations: {...entityModule.mutations,
    SELECT (state, id) {
      state.selectedTopicId = id
    },
    DELETE (state, id) {
      entityModule.mutations.DELETE(state, id)
      if (state.selectedTopicId.id == id)
        state.selectedTopicId = undefined
    },
    INITIALIZED (state) {
      state.loaded = true
    }
  },
  actions: {...entityModule.actions,
    initialize ({dispatch, commit, state}) {
      dispatch('require', null).then(() => {
        if (!state.loaded)
          commit('INITIALIZED')
      })
    },
    select ({commit, dispatch}, id) {
      commit('SELECT', id)
      if (id)
        dispatch('require', { id })
    },
    upsert (context, entity) {
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

      return entityModule.actions.upsert(context, entity)
    }
  }
}

export default topicModule
