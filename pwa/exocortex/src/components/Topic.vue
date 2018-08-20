<template lang="pug">
  .topic(v-if="topic")
    h3 {{topic.title}}
    p.score-reasons
      span(v-for="(value, reason, idx) in topic.score.reasons",:key="idx") {{reason}}: {{value}}
      textarea(:value="topic.text" @change="onTextChange", cols=60, lines=4)

</template>

<script>
export default {
  props: ['topic'],
  methods: {
    onTextChange (event) {
      const topic = Object.assign(this.topic, {text: event.target.value})
      this.$emit('topic-changed', topic)
    }
  }
}
</script>

<style lang="scss">
.topic textarea {
  padding: 0.25rem;
  min-height: 4rem;
}
</style>
