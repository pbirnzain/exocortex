import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const searchModule = {
  state: {
    searchText: ''
  },
  mutations: {
    SETSEARCHTEXT (state, searchText) {
      state.searchText = searchText
    }
  },
  actions: {
    setSearchText ({commit}, searchText) {
      commit('SETSEARCHTEXT', searchText)
    }
  }
}

export default searchModule;
