<template>
  <div class="edit-topic">
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
