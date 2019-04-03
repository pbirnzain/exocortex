import Vue from 'vue'
import axios from 'axios'

export default function (endpoint) {
  return {
    endpoint,
    namespaced: true,
    state () {
      return {
        entities: {},
        completedQueries: [],
        requests: 0
      }
    },
    getters: {
      entities (state) {
        return state.entities
      },
      loading (state) {
        return state.requests > 0
      }
    },
    mutations: {
      UPSERT (state, payload) {
        function updateEntity (entity) {
          const current = state.entities[entity.id]
          if (current && entity.modified < current.modified)
            return // don't update to older versions

          Vue.set(state.entities, entity.id, entity)
        }

        if (payload.constructor == Array) {
          for (let entity of payload) {
            updateEntity(entity)
          }
        } else
          updateEntity(payload)
      },
      DELETE (state, id) {
        Vue.delete(state.entities, id)
      },
      REQUEST (state, nRequests) {
        state.requests = state.requests !== null ? state.requests + nRequests : nRequests
      },
      COMPLETEDQUERY (state, query) {
        state.completedQueries.push(query)
      }
    },
    actions: {
      require ({state, commit}, filter) {
        if (filter && filter.id && filter.id in state.entities)
          return Promise.resolve(state.entities[filter.id])

        if (filter && filter.query) {
          if (state.completedQueries.indexOf(filter.query) >= 0) {
            return Promise.resolve([]) // TODO?
          } else {
            commit('COMPLETEDQUERY', filter.query) // TODO
          }
        }

        let url
        if (!filter)
          url = endpoint
        else if ('id' in filter)
          url = endpoint + filter.id + '/'
        else if ('query' in filter)
          url = endpoint + `?${filter.query}`

        commit('REQUEST', 1)
        return axios.get(url)
          .then(response => {
            commit('UPSERT', response.data)
            return Promise.resolve(response.data)
          })
          .finally(() => commit('REQUEST', -1))
      },
      upsert ({commit, state}, entity) {
        if (entity.id === undefined) {
          commit('REQUEST', 1)
          return axios.post(endpoint, entity)
            .then(response => {
              commit('UPSERT', response.data)
              return Promise.resolve(response.data)
            })
            .finally(() => commit('REQUEST', -1))
        } else {
          const oldEntity = state.entities[entity.id]
          const delta = {}
          for (var key in entity) {
            if (oldEntity[key] != entity[key]) {
              delta[key] = entity[key]
            }
          }

          if (Object.keys(delta).length) {
            commit('UPSERT', {...oldEntity, ...entity}) // optimistic update
            commit('REQUEST', 1)
            return axios.patch(endpoint + entity.id + '/', delta)
              .then(response => {
                commit('UPSERT', response.data)
                return Promise.resolve(response.data)
              })
              .finally(() => commit('REQUEST', -1))
          }
        }
      },
      delete ({commit}, id) {
        commit('DELETE', id) // optimistic delete
        commit('REQUEST', 1)
        return axios.delete(endpoint + id + '/')
          .then(response => {
            commit('DELETE', id)
            return Promise.resolve(id)
          })
          .finally(() => commit('REQUEST', -1))
      },
      updated ({commit}, entity) {
        commit('UPSERT', entity)
      },
      deleted ({commit}, id) {
        commit('DELETE', id)
      }
    }
  }
}
