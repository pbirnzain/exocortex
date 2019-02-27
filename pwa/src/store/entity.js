import Vue from 'vue'
import axios from 'axios'

export default function (endpoint) {
  return {
    endpoint,
    namespaced: true,
    state () {
      return { entities: {} }
    },
    getters: {
      entities (state) {
        return state.entities
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
      }
    },
    actions: {
      require ({state, commit}, filter) {
        if (filter && filter.id && filter.id in state.entities)
          return new Promise((resolve, reject) => { resolve(state.entities[filter.id]) })

        let url
        if (!filter)
          url = endpoint
        else if ('id' in filter)
          url = endpoint + filter.id + '/'
        else if ('query' in filter)
          url = endpoint + `?${filter.query}`

        return axios.get(url).then(response => {
          commit('UPSERT', response.data)
          return new Promise((resolve, reject) => {
            resolve(response.data)
          })
        })
      },
      upsert ({commit, state}, entity) {
        if (entity.id === undefined) {
          return axios.post(endpoint, entity).then(response => {
            commit('UPSERT', response.data)
            return new Promise((resolve, reject) => {
              resolve(response.data)
            })
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
            commit('UPSERT', entity) // optimistic update
            return axios.patch(endpoint + entity.id + '/', delta).then(response => {
              commit('UPSERT', response.data)
              return new Promise((resolve, reject) => {
                resolve(response.data)
              })
            })
          }
        }
      },
      delete ({commit}, id) {
        commit('DELETE', id) // optimistic delete
        axios.delete(endpoint + id + '/').then(response => {
          commit('DELETE', id)
        })
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
