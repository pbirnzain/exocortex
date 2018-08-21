<template lang="pug">
  .topic(v-if="topic")
    input(:value="topic.title", @change="onTitleChange")
    .score-reasons
      span(v-for="(value, reason, idx) in topic.score.reasons",:key="idx") {{reason}}: {{value}}
    .horizontal
      label.checkbox
        input(type="checkbox" :checked="topic.pinned" @click="onTogglePinned")
        | pinned
    textarea(:value="topic.text" @change="onTextChange", cols=60, lines=4)
</template>

<script>
export default {
  props: ['topic'],
  methods: {
    onTitleChange (event) {
      const topic = Object.assign(this.topic, {title: event.target.value})
      this.$emit('topic-changed', topic)
    },
    onTextChange (event) {
      const topic = Object.assign(this.topic, {text: event.target.value})
      this.$emit('topic-changed', topic)
    },
    onTogglePinned (event) {
      const topic = Object.assign(this.topic, {pinned: !this.topic.pinned})
      this.$emit('topic-changed', topic)
    }
  }
}
</script>

<style lang="scss">
.score-reasons {
  font-size: 68%;
  font-family: monospace;
  padding: 0.25rem 0;

  span {
    margin-right: 1rem;
  }
}

.topic {
   > {
    width: 100%;
    padding: 0.25rem;
  }
  textarea {
    min-height: 4rem;
  }
}
</style>
