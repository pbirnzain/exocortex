const searchModule = {
  namespaced: true,
  state: {
    searchText: ''
  },
  mutations: {
    SETSEARCHTEXT (state, searchText) {
      state.searchText = searchText || ''
    }
  },
  actions: {
    setSearchText ({commit}, searchText) {
      commit('SETSEARCHTEXT', searchText)
    }
  }
}

export default searchModule
