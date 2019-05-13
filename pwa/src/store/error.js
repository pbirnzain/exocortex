import store from './store'
import axios from 'axios'

const errorModule = {
  namespaced: false,
  state: {
    errors: null
  },
  mutations: {
    SET_ERRORS (state, error) {
      state.errors = error
    },
    CLEAR_ERRORS (state) {
      state.errors = null
    }
  },
  actions: {
    setErrors ({commit}, error) {
      commit('SET_ERRORS', error)
    }
  }
}

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error)
  if (error.response && error.response.status === 403) {
    window.location.href = '/login/'
  } else {
    store.dispatch('setErrors', [error.message])
  }
  return Promise.reject(error)
})

export default errorModule
