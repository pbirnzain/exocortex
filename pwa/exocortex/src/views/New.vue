<template lang="pug">
  .edit-topic
    v-container
      topic(:topic="newTopic" @topic-changed="onTopicChanged" :disabled="disabled")
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
  data () {
    return { newTopic: null, disabled: false }
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
      if (!this.disabled) {
        this.$store.dispatch('updateTopic', topic)
        this.disabled = true
      }
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
