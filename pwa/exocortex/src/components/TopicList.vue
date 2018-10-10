<template lang="pug">
  .topic-list
    h1(v-if="title") {{ title }}

    md-list
      div(v-for="topic in topics" :key="topic.id")
        md-list-item(@click="onClick(topic)")
          div {{ topic.title }}
          .score {{topic.score.sum}}
        md-divider

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

.topic-list {
  .md-list {
    padding-bottom: 0;
  }

  .md-list-item-content {
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
