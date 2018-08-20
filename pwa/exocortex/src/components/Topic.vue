<template lang="pug">
  .topic(v-if="topic")
    h3 {{topic.title}}
    p.score-reasons
      span(v-for="(value, reason, idx) in topic.score.reasons",:key="idx") {{reason}}: {{value}}
      p {{topic.text}}

</template>

<script>
export default {
  props: ['topic']
}
</script>

<style lang="scss">
</style>
