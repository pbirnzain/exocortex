
const searchModule = {
  namespaced: true,
  state: {
    searchText: '',
    filter: undefined,
    completeLoaded: false,
    incompleteLoaded: false
  },
  getters: {
    loaded (state, getters, rootState, rootGetters) {
      return (state.filter == 'archived' && state.completeLoaded) ||
             (state.filter != 'archived' && state.incompleteLoaded)
    },
    allTopics (state, getters, rootState, rootGetters) {
      return Object.values(rootGetters['topics/topics']).filter(t => t.title)
    },
    matchingTopics (state, getters, rootState) {
      const searchText = state.searchText.toLowerCase()
      const filtered = getters.allTopics.filter(topic => {
        return topic.title.toLowerCase().indexOf(searchText) >= 0
      })
      return filtered
    },
    pinnedTopics (state, getters, rootState) {
      return getters.matchingTopics.filter(topic => topic.pinned)
    },
    urgentTopics (state, getters, rootState) {
      return getters.matchingTopics.filter(topic => topic.score.sum >= 15)
    },
    readyTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.ready &&
        topic.score.sum > 0 && !topic.complete)
    },
    blockedTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.ready && topic.score.sum < 0 && !topic.complete)
    },
    infoTopics (state, getters) {
      return getters.matchingTopics.filter(topic => !topic.ready && !topic.complete)
    },
    openTopics (state, getters) {
      return getters.matchingTopics.filter(topic => !topic.complete)
    },
    archivedTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.complete)
    },
    resultingTopics (state, getters) {
      let result

      if (state.filter === 'pinned') {
        result = getters.pinnedTopics
      } else if (state.filter === 'urgent') {
        result = getters.urgentTopics
      } else if (state.filter === 'ready') {
        result = getters.readyTopics
      } else if (state.filter === 'blocked') {
        result = getters.blockedTopics
      } else if (state.filter === 'info') {
        result = getters.infoTopics
      } else if (state.filter === 'open') {
        result = getters.openTopics
      } else if (state.filter === 'archived') {
        result = getters.archivedTopics
      } else {
        result = getters.matchingTopics
      }

      result = result.sort((a, b) => {
        if (a.score.sum < b.score.sum) {
          return 1
        } else if (a.score.sum > b.score.sum) {
          return -1
        }

        if (a.ready < b.ready) {
          return -1
        } else if (a.ready > b.ready) {
          return 1
        } else {
          return 0
        }
      })

      return result
    }
  },
  mutations: {
    SET_SEARCH_TEXT (state, searchText) {
      state.searchText = searchText || ''
    },
    SET_FILTER (state, filter) {
      state.filter = filter
    },
    LOADED (state, filter) {
      if (filter == 'complete')
        state.completeLoaded = true
      else
        state.incompleteLoaded = true
    }
  },
  actions: {
    setSearchText ({commit}, searchText) {
      commit('SET_SEARCH_TEXT', searchText)
    },
    async setFilter ({state, getters, commit, dispatch}, filter) {
      if (filter) {
        commit('SET_FILTER', filter)
        dispatch('requireFilter', filter)
      } else if (!state.filter) {
        // find optimal filter
        commit('SET_FILTER', 'pinned')
        await dispatch('requireFilter', 'pinned')

        if (getters.resultingTopics.length > 0)
          return

        commit('SET_FILTER', 'urgent')
        await dispatch('requireFilter', 'urgent')
      }
    },
    requireFilter ({commit, dispatch, getters}, filter) {
      // TODO do partial load
      const r = filter == 'archived' ? 'complete' : 'incomplete'
      return dispatch('topics/require', {query: r}, { root: true }).then(
        () => commit('LOADED', r)
      )
    }
  }
}

export default searchModule
