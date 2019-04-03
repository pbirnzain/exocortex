import axios from 'axios'
import EntityModule from './entity'

const topicModule = {
  namespaced: true,
  modules: {
    entities: EntityModule('/api/topics/'),
    textchunks: EntityModule('/api/textchunks/'),
    links: EntityModule('/api/links/')
  },
  state: {
    selectedTopicId: undefined
  },
  getters: {
    loading (state, getters, rootState, rootGetters) {
      return getters['entities/loading'] ||
             getters['textchunks/loading'] ||
             getters['links/loading']
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
          textchunks.sort((a, b) => a.weight - b.weight)

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
    }
  },
  actions: {
    require ({dispatch, commit, state}, filter) {
      return dispatch('entities/require', filter)
    },
    select ({commit, dispatch}, id) {
      commit('SELECT', id)
      if (id) {
        return Promise.all([
          dispatch('entities/require', { id }).catch(() => commit('SELECT', null)),
          dispatch('textchunks/require', { query: `topic=${id}` }),
          dispatch('links/require', { query: `topic=${id}` }).then(async links => {
            // TODO get links from state instead
            let promises = []
            for (let l of links) {
              promises.push(dispatch('entities/require', { id: l.to_topic }))
              promises.push(dispatch('entities/require', { id: l.from_topic }))
            }
            return Promise.all(promises)
          })
        ])
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

const textchunkModule = topicModule.modules.textchunks
const moveTextChunk = ({commit}, {sourceId, destinationId}) => {
  commit('REQUEST', 1)
  return axios.patch(textchunkModule.endpoint + sourceId + '/', {topic: destinationId}).then(response => {
    commit('UPSERT', response.data)
    return new Promise((resolve, reject) => {
      resolve(response.data)
    })
  }).finally(() => commit('REQUEST', -1))
}

textchunkModule.actions.move = moveTextChunk
export default topicModule
