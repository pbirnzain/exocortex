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
  padding-top: 0.25rem;

  span {
    margin-right: 0.25rem;
  }
}

.topic {
  .md-card-header {
    .md-title{
      margin-top: 0!important;
      width: 100%;
    }
  }
  .md-card-content {
    padding-bottom: 0!important;
  }
  .md-checkbox {
    margin: 0 16px 0 0;
  }
  .md-field {
    margin-top: -4px; // To compensate for padding

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
