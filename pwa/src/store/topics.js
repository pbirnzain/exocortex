import EntityModule from './entity'

const linksModule = EntityModule('/api/links/')

const topicModule = {
  namespaced: true,
  modules: {
    entities: EntityModule('/api/topics/'),
    textchunks: EntityModule('/api/textchunks/'),
    links: linksModule
  },
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
      if (state.selectedTopicId) {
        const selectedTopic = getters['entities/entities'][state.selectedTopicId]

        if (selectedTopic) {
          const textchunks = []
          // TODO expand entity to create a more efficient data structure
          const e = getters['textchunks/entities']
          for (let idx in e) {
            if (e[idx].topic == state.selectedTopicId)
              textchunks.push(e[idx])
          }

          const links = []
          const allLinks = getters['links/entities']
          for (let idx in allLinks) {
            const l = allLinks[idx]
            if (l.from_topic == state.selectedTopicId) {
              const other = getters.topics[l.to_topic]
              if (other)
                links.push({ id: l.id, other })
            } else if (l.to_topic == state.selectedTopicId) {
              const other = getters.topics[l.from_topic]
              if (other)
                links.push({ id: l.id, other })
            }
          }

          return { ...selectedTopic, textchunks, links }
        }

        return selectedTopic
      }
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
      if (id) {
        dispatch('entities/require', { id })
        dispatch('textchunks/require', { query: `topic=${id}` })
        dispatch('links/require', { query: `topic=${id}` }).then(links => {
          for (let l of links) {
            dispatch('entities/require', { id: l.to_topic })
            dispatch('entities/require', { id: l.from_topic })
          }
        })
      }
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
      delete entity.textchunks
      delete entity.links

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
