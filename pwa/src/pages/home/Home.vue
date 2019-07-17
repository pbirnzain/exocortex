<template lang="pug">
  .home
    v-btn(fab fixed bottom right color="red" @click="onNewTopic()" data-e2e="fabAdd")
      v-icon add

    home-toolbar
    topic-list(v-if="topicsLoaded" :topics="resultingTopics" @topic-selected="onSelect")
      empty-state(v-if="!searchText && filter === 'urgent'"
        img="/img/empty_state_background.svg"
        :tagline="$t('nourgent.tagline')" :message="$t('nourgent.message')")
      empty-state(v-else :tagline="$t('nofilter.tagline')"
        :message="$t('nofilter.message')")
    v-progress-circular(v-else indeterminate color="grey" :size="50" :width="5")
</template>
<script>
import HomeToolbar from './HomeToolbar'
import TopicList from '@/components/topic/TopicList'
import EmptyState from '@/components/EmptyState'

export default {
  name: 'home',
  components: {
    HomeToolbar,
    TopicList,
    EmptyState
  },
  computed: {
    topicsLoaded () {
      return this.$store.getters['search/loaded']
    },
    resultingTopics () {
      return this.$store.getters['search/resultingTopics']
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
    // if no filter has been selected yet, tell the store to load the default
    if (!this.filter)
      this.$store.dispatch('search/setFilter')
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
      elem.innerHTML = `${this.filter[0].toUpperCase() + this.filter.substr(1)}`
    }
  }
}
</script>
<style lang="sass">
.home
  height: 100vh
  width: 100%
  display: flex
  flex-direction: column

  .topic-list
    flex-grow: 1
    overflow-y: auto

  .v-progress-circular
    margin: auto

  .v-btn--floating .v-icon
    color: white
</style>
<i18n>
{
  "en": {
    "nourgent": {
      "tagline": "No urgent topics.",
      "message": "Go do something fun!"
    },
    "nofilter": {
      "tagline": "No topics found.",
      "message": "Try using a different filter, search text, or add new topics."
    }
  },
  "de": {
    "nourgent": {
      "tagline": "Keine dringenden Themen.",
      "message": "Zeit für Entspannung!"
    },
    "nofilter": {
      "tagline": "Keine Themen gefunden.",
      "message": " "
    }
  }
}
</i18n>
