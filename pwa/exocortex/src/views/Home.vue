<template lang="pug">
  .home
    v-btn(fab fixed bottom right color="red" @click="onNewTopic")
      v-icon add

    home-toolbar
    topic-list(:topics="resultingTopics" :showText="showText" @topic-selected="onSelect")
</template>

<script>
import { VBtn, VIcon, VContent } from 'vuetify/lib'
import HomeToolbar from './home/HomeToolbar'
import TopicList from '@/components/TopicList'
import FilterSelection from '@/components/FilterSelection'

export default {
  name: 'home',
  components: {
    VBtn,
    VContent,
    VIcon,
    HomeToolbar,
    TopicList,
    FilterSelection
  },
  created() {
    this.$store.dispatch('topics/initialize')
  },
  computed: {
    resultingTopics () {
      return this.$store.getters['search/resultingTopics']
    },
    showText () {
      return this.$store.state.search.searchText != ''
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
