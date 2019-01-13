<template lang="pug">
  .home
    filter-selection(:selection="filter", @selectionChanged="onFilterChanged")
    topic-list(:topics="resultingTopics" :showText="showText" @topic-selected="onSelect")
</template>

<script>
import TopicList from '@/components/TopicList.vue'
import FilterSelection from '@/components/FilterSelection.vue'

export default {
  name: 'home',
  components: {
    TopicList,
    FilterSelection
  },
  computed: {
    resultingTopics () {
      return this.$store.getters['search/resultingTopics']
    },
    showText () {
      return this.$store.state.search.searchText != ''
    },
    filter () {
      return this.$store.state.search.filter
    }
  },
  methods: {
    onSelect (topic) {
      this.$router.push(`/edit/${topic.id}`)
    },
    onFilterChanged (filter) {
      this.$store.dispatch("search/setFilter", filter)
    }
  }
}
</script>

<style lang="scss">
.home .v-list__tile {
  overflow: hidden;
}
</style>
