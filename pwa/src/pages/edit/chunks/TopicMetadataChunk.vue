<template lang="pug">
  v-card.topic-metadata-chunk
    topic-form(:topic="topic", :disabled="disabled", :hideTitle="true", @topic-changed="onTopicChanged")
</template>

<script>
import { VCard } from 'vuetify/lib'
import TopicForm from '@/components/topic/TopicForm'

export default {
  props: ['topic', 'disabled'],
  components: { VCard, TopicForm },
  methods: {
    onTopicChanged (topic) {
      this.$emit('topic-changed', topic)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
