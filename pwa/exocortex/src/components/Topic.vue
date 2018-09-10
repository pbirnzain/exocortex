<template lang="pug">
  .topic
    input(v-model="template.title", @change="onChange")
    .score-reasons(v-if="template.score")
      span Score: {{ template.score.sum }}
      span(v-for="(value, reason, idx) in template.score.reasons",:key="idx") ({{reason}}: {{value}})
    .timestamps(style="display:none;")
      span Added: {{template.added}}
      span Modified: {{template.modified}} */
    .horizontal
      label.checkbox
        input(type="checkbox" v-model="template.pinned" @change="onChange")
        | pinned
    .field
      label Due:
      input(type="date" v-model="template.due" @change="onChange")
    .field
      label Ready:
      input(type="date" v-model="template.ready" @change="onChange")
    textarea(v-model="template.text" @change="onChange", cols=60, lines=4)
</template>

<script>
export default {
  props: ['topic'],
  computed: {
    template() {
      if (this.topic === undefined) {
        return {
          pinned: true,
        }
      } else {
        return Object.assign({}, this.topic);
      }
    }
  },
  methods: {
    onChange (event) {
      this.$emit('topic-changed', this.template)
    },
  }
}
</script>

<style lang="scss">
.score-reasons {
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
  input:not([type="checkbox"]) {
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 4rem;
  }
}
</style>
