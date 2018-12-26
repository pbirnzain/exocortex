<template lang="pug">
  .home
    topic-list(:topics="urgentTopics" @topic-selected="onSelect")
</template>

<script>
// @ is an alias to /src
import { VContainer } from 'vuetify/lib'
import TopicList from '@/components/TopicList.vue'

export default {
  name: 'home',
  components: {
    TopicList
  },
  computed: {
    urgentTopics () {
      return this.$store.getters.urgentTopics
    }
  },
  methods: {
    onSelect (topic) {
      this.$router.push(`/edit/${topic.id}`)
    }
  }
}
</script>

<style lang="scss">
.home .v-list__tile {
  overflow: hidden;
}
</style>
