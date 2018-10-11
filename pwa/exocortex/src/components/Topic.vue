<template lang="pug">
  .topic
    md-card-header
      input.md-title(v-model="template.title", @change="onChange")
      .md-subhead.score-reasons(v-if="template.score")
        span Score: {{ template.score.sum }}
        span(v-for="(value, reason, idx) in template.score.reasons",:key="idx") ({{reason}}: {{value}})

    md-card-content
      div
        md-checkbox(v-model="template.pinned" @change="onChange") pinned
        md-checkbox(v-model="template.complete" @change="onChange") complete

      md-field
        datepicker(v-if="template" :date="due" @change="onChange")
        span.md-helper-text Due on

      md-field
        datepicker(v-if="template" :date="ready" @change="onChange")
        span.md-helper-text Ready starting on

      md-field
        md-textarea(v-model="template.text" @change="onChange" md-autogrow placeholder="Content")
</template>

<script>
import Datepicker from 'vue-datepicker/vue-datepicker-es6';

export default {
  props: ['topic'],
  components: { datepicker: Datepicker },
  computed: {
    template() {
      return Object.assign({pinned: true}, this.topic)
    },
    due() {
      return { time: this.template.due }
    },
    ready() {
      return { time: this.template.ready }
    }
  },
  methods: {
    onChange (event) {
      this.template.due = this.due.time
      this.template.ready = this.ready.time
      this.$emit('topic-changed', this.template)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/form.scss';

.cov-vue-date {
  width: 100%!important;
  input {
    width: 100%!important;
  }
}

.cov-datepicker {
  color: rgba(0,0,0,0.87)!important;
  box-shadow: none!important;
}

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
