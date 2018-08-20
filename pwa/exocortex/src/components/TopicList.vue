<template lang="html">
  <div class="topic-list">
    <h1 class="title">{{ title }}</h1>
    <div v-for="topic in topics" :key="topic.id" class="box has-ribbon"
        @click="onClick(topic)">
      <h3>{{ topic.title }}</h3>
      <div class="ribbon is-primary is-small">{{topic.score.sum}}</div>
      <p>
        {{ topic.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'topics'],
  methods: {
    onClick (topic) {
      this.$emit('topic-selected', topic)
    }
  }
}
</script>

<style lang="scss">
</style>
