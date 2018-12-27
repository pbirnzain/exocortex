<template lang="pug">
  .edit-topic
    v-container
      topic(:topic="selectedTopic" @topic-changed="onTopicChanged")
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
      if (newSelectedTopic) {
        this.$router.push('/edit/' + newSelectedTopic.id)
      }
    }
  },
  methods: {
    onTopicChanged (topic) {
      this.$store.dispatch('updateTopic', topic)
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
