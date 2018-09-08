<template>
  <div class="about">
    <div class="box">
      <topic :topic="selectedTopic" @topic-changed="onTopicChanged"/>
      <button @click="onDelete">Delete</button>
    </div>
  </div>
</template>

<script>
import Topic from '../components/Topic'

export default {
  name: 'app',
  components: {
    Topic
  },
  computed: {
    selectedTopic () {
      return this.$store.getters.selectedTopic
    }
  },
  methods: {
    onTopicChanged (topic) {
      this.$store.dispatch('updateTopic', topic)
    },
    onDelete () {
      this.$store.dispatch('deleteTopic', this.selectedTopic)
      this.$router.push('/')
    }
  }
}
</script>
