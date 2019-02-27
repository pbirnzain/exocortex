import { topicIsEmpty } from '@/store/topic.model'

const searchModule = {
  namespaced: true,
  state: {
    searchText: '',
    filter: undefined
  },
  getters: {
    loaded (state, getters, rootState, rootGetters) {
      return rootGetters['topics/loaded']
    },
    allTopics (state, getters, rootState, rootGetters) {
      return Object.values(rootGetters['topics/topics']).filter(t => !topicIsEmpty(t))
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
      return getters.matchingTopics.filter(topic => topic.score.sum > 55)
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
    incompleteTopics (state, getters) {
      return getters.matchingTopics.filter(topic => !topic.complete)
    },
    completeTopics (state, getters) {
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
      } else if (state.filter === 'complete') {
        result = getters.completeTopics
      } else if (state.filter === 'incomplete') {
        result = getters.incompleteTopics
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
    }
  },
  actions: {
    setSearchText ({commit}, searchText) {
      commit('SET_SEARCH_TEXT', searchText)
    },
    setFilter ({commit, dispatch}, filter) {
      commit('SET_FILTER', filter)
      dispatch('requireFilter', filter)
    },
    requireFilter ({dispatch, getters}, filter) {
      // TODO do partial load
      if (!getters.loaded)
        dispatch('topics/initialize', undefined, { root: true })
    }
  }
}

export default searchModule
