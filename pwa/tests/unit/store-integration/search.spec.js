import searchModule from '@/store/search/search.js'
import { createMockTopics, createMockState } from './search.mock.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function createMockTopicModule () {
  return {
    namespaced: true,
    getters: {
      topics () {
        return createMockTopics()
      }
    }
  }
}

describe('search module', () => {
  var store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        topics: createMockTopicModule(),
        search: { state: createMockState(), ...searchModule }
      }
    })
  })

  describe('getter', () => {
    describe('for all topics', () => {
      it('should list all topics with non-empty titles', () => {
        const all = store.getters['search/allTopics']
        expect(all.length).toEqual(4)
      })
    })

    describe('for pinned topics', () => {
      it('should only list active topics', () => {
        const pinned = store.getters['search/pinnedTopics']

        expect(pinned.length).toEqual(1)
        expect(pinned[0].title).toEqual('pinned topic')
      })
    })

    describe('for archived topics', () => {
      it('should list all archived topics', () => {
        const archived = store.getters['search/archivedTopics']
        const mock = createMockTopics().filter(t => t.complete)

        expect(archived).toEqual(mock)
      })
    })
  })
})
