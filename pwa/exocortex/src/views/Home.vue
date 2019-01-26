<template lang="pug">
  .home
    v-btn(fab fixed bottom right color="red" @click="onNewTopic")
      v-icon add

    home-toolbar
    topic-list(v-if="topicsLoaded" :topics="resultingTopics" :showText="showTopicText" @topic-selected="onSelect")
      empty-state(v-if="!searchText && filter === 'urgent'"
        img="/img/empty_state_background.svg"
        tagline="No urgent tasks." message="Go do something fun!")
      empty-state(v-else tagline="No tasks found."
        message="Try using a different filter, search text, or add new topics.")
    v-progress-circular(v-else indeterminate color="grey" size="50" width="5")
</template>
<script>
import { VBtn, VIcon, VContent, VProgressCircular } from 'vuetify/lib'
import HomeToolbar from './home/HomeToolbar'
import TopicList from '@/components/TopicList'
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
      return this.$store.state.topics.topicsLoaded
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
  methods: {
    onNewTopic () {
      this.$router.push('/new')
    },
    onSelect (topic) {
      this.$router.push(`/edit/${topic.id}`)
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
    display: flex;
    overflow-y: auto;
  }
  .v-list {
    width: 100%;
    height: 100%;
  }
  .v-progress-circular {
    margin: auto;
  }
}
</style>
