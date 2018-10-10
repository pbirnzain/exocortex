<template>
  <div class="edit-topic md-layout">
    <md-card>
      <topic :topic="selectedTopic" @topic-changed="onTopicChanged"/>
      <md-card-actions>
        <md-button @click="onDelete">Delete</md-button>
      </md-card-actions>
    </md-card>
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
