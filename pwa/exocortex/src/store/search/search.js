const searchModule = {
  namespaced: true,
  state: {
    searchText: '',
    filter: 'urgent'
  },
  getters: {
    matchingTopics (state, getters, rootState) {
      const searchText = state.searchText.toLowerCase()
      const filtered = Object.values(rootState.topics.topics).filter(topic => {
        return topic.title.toLowerCase().indexOf(searchText) >= 0 ||
            topic.text.toLowerCase().indexOf(searchText) >= 0
      })
      return filtered
    },
    urgentTopics (state, getters, rootState) {
      return getters.matchingTopics.filter(topic => topic.score.sum > 0)
    },
    uncriticalTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.score.sum <= 0 && !topic.complete)
    },
    completeTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.complete)
    },
    resultingTopics (state, getters) {
      let result
      if (state.filter === 'all') {
        result = getters.matchingTopics
      } else if (state.filter === 'uncritical') {
        result = getters.uncriticalTopics
      } else if (state.filter === 'complete') {
        result = getters.completeTopics
      } else {
        result = getters.urgentTopics
      }

      return result.sort((a, b) => {
        if (a.score.sum < b.score.sum) {
          return 1
        } else if (a.score.sum > b.score.sum) {
          return -1
        } else {
          return 0
        }
      })
    }
  },
  mutations: {
    SETSEARCHTEXT (state, searchText) {
      state.searchText = searchText || ''
    },
    SETFILTER (state, filter) {
      state.filter = filter || 'urgent'
    }
  },
  actions: {
    setSearchText ({commit}, searchText) {
      commit('SETSEARCHTEXT', searchText)
    },
    setFilter ({commit}, filter) {
      commit('SETFILTER', filter)
    }
  }
}

export default searchModule
