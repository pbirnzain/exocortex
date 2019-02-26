<template lang="pug">
  v-card.topic
    v-text-field(v-if="!hideTitle" v-model="template.title",
                 @change="onChange" ref="title" label="title" :disabled="disabled")
    .score-reasons(v-if="template.score")
      span.sum Urgency: {{ template.score.sum }}
      span(v-for="(value, reason, idx) in template.score.reasons",
           :key="idx") ({{reason}}: {{value}})

    .modifiers.horizontal
      v-checkbox(v-model="template.pinned" @change="onChange" hide-details
                 label="pinned" :disabled="disabled")
      v-checkbox(v-model="template.complete" @change="onChange" hide-details
                 label="complete" :disabled="disabled")
      v-slider(v-model="template.importance" always-dirty thumb-label
               hide-details label="Importance:" :min="-5" :max="5"
               @change="onChange")

    .horizontal
      v-dialog(v-model="showDuePicker" lazy width="290px" :disabled="disabled")
        v-date-picker(v-model="template.due" scrollable @change="onChange")
      v-text-field(v-model="template.due" label="Due" @blur="onChange"
                    :clearable="true" :disabled="disabled")
      v-btn(@click="showDuePicker = true" small flat icon)
        icon-edit-date
      v-btn(@click="setDue()" small flat icon)
        v-icon today
      v-btn(@click="setDue(1)" small flat icon)
        icon-tomorrow

    .horizontal
      v-dialog(v-model="showReadyPicker" lazy width="290px" :disabled="disabled")
        v-date-picker(v-model="template.ready" @change="onChange" scrollable)
      v-text-field(v-model="template.ready"
        label="Ready" :clearable="true" @blur="onChange" :disabled="disabled")
      v-btn(@click="showReadyPicker = true" small flat icon)
        icon-edit-date
      v-btn(@click="setReady()" small flat icon)
        v-icon today
      v-btn(@click="setReady(1)" small flat icon)
        icon-tomorrow
</template>

<script>
import { VCard, VTextField, VDatePicker, VDialog, VCheckbox, VBtn, VIcon, VSlider } from 'vuetify/lib'
import IconTomorrow from '@/components/icons/IconTomorrow'
import IconEditDate from '@/components/icons/IconEditDate'

export default {
  props: ['topic', 'disabled', 'hideTitle'],
  components: {
    VCard,
    VTextField,
    VDatePicker,
    VDialog,
    VCheckbox,
    VBtn,
    VIcon,
    VSlider,
    IconTomorrow,
    IconEditDate
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
    },
    setDue (offset = 0) {
      const date = new Date()
      date.setDate(date.getDate() + offset)
      this.template.due = date.toISOString().split('T')[0]
      this.onChange()
    },
    setReady (offset = 0) {
      const date = new Date()
      date.setDate(date.getDate() + offset)
      this.template.ready = date.toISOString().split('T')[0]
      this.onChange()
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
  position: absolute;
  top: 0px;
  right: 2px;

  font-size: 11px;
  color: rgba(0,0,0,0.54);

  .sum {
    padding-right: 4px;
  }
}

.horizontal {
  display: flex;
  align-items: center;
}

.topic {
  .horizontal > .v-text-field:first-child {
    margin-right: 8px;
  }
  .modifiers {
    flex-wrap: wrap;
    align-items: center;

    * {
      margin: 0;
      padding: 0;
    }

    > * {
      padding: 0 8px 8px 0;
    }
  }
}
</style>
