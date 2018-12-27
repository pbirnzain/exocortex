<template lang="pug">
  .edit-topic
    v-container
      topic(:topic="selectedTopic" @topic-changed="onTopicChanged")
      v-btn(flat @click="onDelete") Delete
</template>

<script>
import { VBtn, VContainer } from 'vuetify/lib'
import Topic from '../components/Topic'

export default {
  name: 'app',
  components: {
    Topic,
    VBtn,
    VContainer
  },
  computed: {
    selectedTopic () {
      return this.$store.getters.selectedTopic
    }
  },
  watch: {
    selectedTopic (newSelectedTopic) {
      if (!newSelectedTopic) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.$store.dispatch('selectTopic', this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('selectTopic', to.params.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('selectTopic', undefined)
    next()
  },
  methods: {
    onTopicChanged (topic) {
      this.$store.dispatch('updateTopic', topic)
    },
    onDelete () {
      this.$store.dispatch('deleteTopic', this.selectedTopic)
    }
  }
}
</script>
<style lang="scss">
.edit-topic {
  display: flex;
  flex-direction: column;

  .box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
