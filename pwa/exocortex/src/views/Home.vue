<template>
  <div class="home">
    <topic-list :topics="urgentTopics"
      @topic-selected="onSelect" />
  </div>
</template>

<script>
// @ is an alias to /src
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
      this.$store.dispatch('selectTopic', topic)
      this.$router.push('/edit')
    }
  }
}
</script>

<style lang="scss">
</style>
