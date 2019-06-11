import Vue from 'vue'
import axios from 'axios'
import store from './store'

// this function creates a vuex module for an API model / entity.
// it can transparently handle retrieval, local storage and synchronisation

// TODO
// Features to implement:
// [x] API integration
// [x] caching
// [x] loading status
// [ ] offline storage
// [ ] background sync

export default function (endpoint, modulePath) {
  // vuex module
  const module = {
    endpoint,
    namespaced: true,
    state () {
      return {
        entities: {},
        completedQueries: [],
        pendingRequests: 0
      }
    },
    getters: {
      entities (state) {
        return state.entities
      },
      loading (state) {
        return state.pendingRequests > 0
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
        state.pendingRequests = state.pendingRequests !== null ? state.pendingRequests + nRequests : nRequests
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

        return axios.get(url)
          .then(response => {
            commit('UPSERT', response.data)
            return Promise.resolve(response.data)
          })
      },
      // call to persist a given entity
      upsert ({commit, state}, entity) {
        if (entity.id === undefined) {
          return axios.post(endpoint, entity)
            .then(response => {
              commit('UPSERT', response.data)
              return Promise.resolve(response.data)
            })
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

            return axios.patch(endpoint + entity.id + '/', delta)
              .then(response => {
                commit('UPSERT', response.data)
                return Promise.resolve(response.data)
              })
          }
        }
      },
      delete ({commit, state}, id) {
        // trying to delete nonexistent entities
        if (state.entities[id] === undefined) {
          console.warn(`${endpoint}: trying to delete unknown entity with id ${id}`)
          return
        }

        commit('DELETE', id) // optimistic delete
        return axios.delete(endpoint + id + '/')
      },
      // call this when a newer, already persisted version of an entity has become
      // available, e.g. via websocket, or while querying another endpoint
      updated ({commit}, entity) {
        commit('UPSERT', entity)
      },
      deleted ({commit}, id) {
        commit('DELETE', id)
      }
    }
  }

  // axios interceptors
  function changePendingRequestCounter (path, delta) {
    if (modulePath && path.startsWith(endpoint)) {
      store.commit(modulePath + '/REQUEST', delta)
    }
  }

  axios.interceptors.request.use(function (config) {
    changePendingRequestCounter(new URL(config.url, 'https://dummy').pathname, +1)
    return config
  }, function (error) {
    changePendingRequestCounter(new URL(error.url, 'https://dummy').pathname, -1)
    return Promise.reject(error)
  })

  axios.interceptors.response.use(function (response) {
    changePendingRequestCounter(new URL(response.request.responseURL).pathname, -1)
    return response
  }, function (error) {
    changePendingRequestCounter(new URL(error.request.responseURL).pathname, -1)
    return Promise.reject(error)
  })

  return module
}
