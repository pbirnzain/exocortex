<template lang="pug">
  .topic-list
    h1(v-if="title") {{ title }}

    md-card(v-for="topic in topics" :key="topic.id")
      md-card-header
        a.md-title(@click="onClick(topic)") {{ topic.title }}
        .score {{topic.score.sum}}

      md-card-content(v-if="topic.text") {{ topic.text }}

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

.topic-list .md-card {
  margin-bottom: 8px;

  .md-card-header {
    position: relative;

    .score {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 0.25rem;

      font-size: 82%;
      font-weight: 600;

      background-color: red;
      color: white;
    }
  }
}
</style>
