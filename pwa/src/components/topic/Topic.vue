<template lang="pug">
  div(v-if="topic")
    topic-form(:topic="topic" :hideTitle="true"
              @topic-changed="onTopicChanged")
  empty-state(v-else tagline="Topic not found."
              message="Most likely it has been deleted.")
</template>

<script>
import TopicForm from './TopicForm'
import EmptyState from '@/components/EmptyState'

export default {
  props: ['topic', 'disabled', 'hideTitle'],
  components: {
    TopicForm,
    EmptyState
  },
  methods: {
    onTopicChanged (topic) {
      this.$emit('topic-changed', topic)
    }
  }
}
</script>

<style lang="styl">
</style>
