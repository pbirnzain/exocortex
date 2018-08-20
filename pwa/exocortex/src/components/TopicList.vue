<template lang="html">
  <div class="topic-list">
    <h1 class="title">{{ title }}</h1>
    <div v-for="topic in topics" :key="topic.id" class="box"
        @click="onClick(topic)">
      <h3>{{topic.score.sum}}: {{ topic.title }}</h3>
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
.score-reasons {
  margin-top: -1rem;
  font-size: 68%;
  font-family: monospace;

  span {
    margin-right: 1rem;
  }
}

</style>
