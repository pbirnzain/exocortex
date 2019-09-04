<template lang="pug">
  v-card.topic-metadata-chunk
    .markdown-body
      h1 Metadata
    topic-form(:topic="topic", :disabled="disabled", :hideTitle="true", @topic-changed="onTopicChanged")

    .score-reasons(v-if="topic.score && topic.score.sum")
      span.sum Urgency: {{ topic.score.sum }}
      span(v-for="(value, reason, idx) in topic.score.reasons",
           :key="idx") {{reason}}: {{value}}
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
.markdown-body h1
  margin-bottom: 16px !important

.score-reasons
  display: none
  position: absolute
  top: 4px
  right: 4px

  font-size: 11px
  color: rgba(0,0,0,0.29)

  .sum
    padding-right: 12px

  > *:not(first-child)
    padding-right: 4px

</style>
