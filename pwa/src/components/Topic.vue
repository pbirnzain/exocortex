<template lang="pug">
  .topic
    v-text-field(v-if="!hideTitle" v-model="template.title", @change="onChange" ref="title" label="title" :disabled="disabled")
    .md-subhead.score-reasons(v-if="template.score")
      span Urgency: {{ template.score.sum }}
      span(v-for="(value, reason, idx) in template.score.reasons",:key="idx") ({{reason}}: {{value}})

    .horizontal
      v-checkbox(v-model="template.pinned" @change="onChange" label="pinned" :disabled="disabled")
      v-checkbox(v-model="template.complete" @change="onChange" label="complete" :disabled="disabled")

    .horizontal
      a.v-input__prepend-outer(@click="showDuePicker = true")
        v-icon event
      v-dialog(v-model="showDuePicker" lazy full-width width="290px" :disabled="disabled")
        v-text-field(slot="activator" v-model="template.due" readonly
          label="Due" :clearable="true" @input="onChange" :disabled="disabled")
        v-date-picker(v-model="template.due" scrollable @change="onChange")
    .horizontal
      a.v-input__prepend-outer(@click="showReadyPicker = true")
        v-icon event
      v-dialog(v-model="showReadyPicker" lazy full-width width="290px" :disabled="disabled")
        v-text-field(slot="activator" v-model="template.ready" readonly
          label="Ready" :clearable="true" @input="onChange" :disabled="disabled")
        v-date-picker(v-model="template.ready" @change="onChange" scrollable)

    v-textarea(v-model="template.text" @change="onChange" auto-grow
               label="Content" ref="text" :disabled="disabled" data-e2e="topicDescription")
</template>

<script>
import { VTextField, VTextarea, VDatePicker, VDialog, VCheckbox, VBtn, VIcon } from 'vuetify/lib'

export default {
  props: ['topic', 'disabled', 'hideTitle'],
  components: {
    VTextField,
    VDatePicker,
    VDialog,
    VTextarea,
    VCheckbox,
    VBtn,
    VIcon
  },
  data () {
    return {
      showDuePicker: false,
      showReadyPicker: false
    }
  },
  computed: {
    template () {
      return Object.assign({pinned: true}, this.topic)
    }
  },
  mounted () {
    if (this.$refs.title)
      this.$refs.title.focus()
  },
  methods: {
    onChange () {
      this.showDuePicker = false
      this.showReadyPicker = false
      this.$emit('topic-changed', this.template)
    }
  },
  beforeDestroy () {
    // Emit possible changes in still focused inputs
    // (they don't send change events when destroyed)
    if (this.topic) {
      for (let key in this.template) {
        if (this.template[key] !== this.topic[key]) {
          this.$emit('topic-changed', this.template)
          return
        }
      }
    }
  }
}
</script>

<style lang="scss">
.score-reasons {
  padding-top: 0.25rem;

  span {
    margin-right: 0.25rem;
  }
}

.horizontal {
  display: flex;
}

.topic {
  .v-dialog__container {
    width: 100%;
  }

  a.v-input__prepend-outer {
    margin-top: 0;
  }
}
</style>
