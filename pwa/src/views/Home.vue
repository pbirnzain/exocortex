<template lang="pug">
  .home
    v-btn(fab fixed bottom right color="red" @click="onNewTopic()" data-e2e="fabAdd")
      v-icon add

    home-toolbar
    topic-list(v-if="topicsLoaded" :topics="resultingTopics" :showText="showTopicText" @topic-selected="onSelect")
      empty-state(v-if="!searchText && filter === 'urgent'"
        img="/img/empty_state_background.svg"
        tagline="No urgent tasks." message="Go do something fun!")
      empty-state(v-else tagline="No tasks found."
        message="Try using a different filter, search text, or add new topics.")
    v-progress-circular(v-else indeterminate color="grey" :size="50" :width="5")
</template>
<script>
import { VBtn, VIcon, VContent, VProgressCircular } from 'vuetify/lib'
import HomeToolbar from './home/HomeToolbar'
import TopicList from '@/components/topic/TopicList'
import FilterSelection from '@/components/FilterSelection'
import EmptyState from '@/components/EmptyState'

export default {
  name: 'home',
  components: {
    VBtn,
    VContent,
    VIcon,
    HomeToolbar,
    TopicList,
    FilterSelection,
    EmptyState,
    VProgressCircular
  },
  computed: {
    topicsLoaded () {
      return this.$store.getters['search/loaded']
    },
    resultingTopics () {
      return this.$store.getters['search/resultingTopics']
    },
    showTopicText () {
      return this.$store.state.search.searchText != ''
    },
    searchText () {
      return this.$store.state.search.searchText
    },
    filter () {
      return this.$store.state.search.filter
    }
  },
  watch: {
    filter () {
      this.updateTitle()
    }
  },
  created () {
    if (!this.filter)
      this.$store.dispatch('search/setFilter', 'urgent')
  },
  mounted () {
    this.updateTitle()
  },
  methods: {
    onNewTopic () {
      const title = this.searchText
      this.$router.push(`/new/${title || ''}`)
    },
    onSelect (topic) {
      this.$router.push(`/edit/${topic.id}`)
    },
    updateTitle () {
      const elem = document.querySelector('title')
      if (this.filter == 'urgent' && this.resultingTopics.length == 0)
        elem.innerHTML = 'Nothing Urgent'
      else
        elem.innerHTML = `${this.filter[0].toUpperCase() + this.filter.substr(1)}`
    }
  }
}
</script>
<style lang="scss">
.home {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .topic-list {
    flex-grow: 1;
    overflow-y: auto;
  }
  .v-progress-circular {
    margin: auto;
  }
  .v-btn--floating .v-icon {
    color: white;
  }
}
</style>
