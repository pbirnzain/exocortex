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
      return Object.values(rootGetters['topics/topics'])
    },
    matchingTopics (state, getters, rootState) {
      const searchText = state.searchText.toLowerCase()
      const filtered = getters.allTopics.filter(topic => {
        return topic.title.toLowerCase().indexOf(searchText) >= 0 ||
            topic.text.toLowerCase().indexOf(searchText) >= 0
      })
      return filtered
    },
    urgentTopics (state, getters, rootState) {
      return getters.matchingTopics.filter(topic => topic.score.sum > 50)
    },
    readyTopics (state, getters) {
      return getters.matchingTopics.filter(topic =>
        topic.score.sum <= 50 && topic.score.sum > 0 && !topic.complete)
    },
    blockedTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.score.sum < 0 && !topic.complete)
    },
    infoTopics (state, getters) {
      return getters.matchingTopics.filter(topic => topic.score.sum == 0 && !topic.complete)
    },
    resultingTopics (state, getters) {
      let result

      if (state.filter === 'all') {
        result = getters.matchingTopics
      } else if (state.filter === 'ready') {
        result = getters.readyTopics
      } else if (state.filter === 'blocked') {
        result = getters.blockedTopics
      } else if (state.filter === 'info') {
        result = getters.infoTopics
      } else {
        result = getters.urgentTopics
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

      return result.filter(t => !topicIsEmpty(t))
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
    setFilter ({commit, state, getters, dispatch}, filter) {
      commit('SET_FILTER', filter)
      if (!getters.loaded)
        dispatch('topics/initialize', undefined, { root: true })
    }
  }
}

export default searchModule
