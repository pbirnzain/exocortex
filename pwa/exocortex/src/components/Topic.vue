<template lang="pug">
  .topic
    md-card-header
      input.md-title(v-model="template.title", @change="onChange")
      .md-subhead.score-reasons(v-if="template.score")
        span Score: {{ template.score.sum }}
        span(v-for="(value, reason, idx) in template.score.reasons",:key="idx") ({{reason}}: {{value}})

    md-card-content
      .timestamps(style="display:none;")
        span Added: {{template.added}}
        span Modified: {{template.modified}}
      div
        md-checkbox(v-model="template.pinned" @change="onChange") pinned
        md-checkbox(v-model="template.complete" @change="onChange") complete

      md-field
        md-input(type="date" v-model="template.due" @change="onChange")
        span.md-helper-text Due on

      md-field
        md-input(type="date" v-model="template.ready" @change="onChange")
        span.md-helper-text Ready starting on

      md-field
        md-textarea(v-model="template.text" @change="onChange" md-autogrow placeholder="Content")
</template>

<script>
import DatePicker from 'vue-md-date-picker'

export default {
  components: {DatePicker},
  props: ['topic'],
  data() {
    return {
      template: Object.assign({pinned: true}, this.topic)
    }
  },
  methods: {
    onChange (event) {
      this.$emit('topic-changed', this.template)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/form.scss';

.score-reasons {
  font-family: monospace;
  padding: 0.25rem 0;

  span {
    margin-right: 1rem;
  }
}

.topic {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  > {
    width: 100%;
    padding: 0.25rem;
  }
  input:not([type="checkbox"]) {
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    flex-grow: 1;
    box-sizing: border-box;
    width: 100%;
    resize: vertical;
  }
}
</style>
