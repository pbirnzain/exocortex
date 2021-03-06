<template lang="pug">
  .topic-form
    v-text-field(v-if="!hideTitle" v-model="template.title",
                 @change="onChange" ref="title" label="title" :disabled="disabled")

    .dates
      .input-fields
        v-text-field(v-model="template.due" :label="$t('topic.dueDate')" @blur="onChange"
                        hide-details :clearable="true" :disabled="disabled")

        .copy-buttons
          a(@click.stop="onCopyUp")
            v-icon expand_less
          a(@click.stop="onCopyDown")
            v-icon expand_more

        v-text-field(v-model="template.ready" hide-details
          :label="$t('topic.readyDate')" :clearable="true" @blur="onChange" :disabled="disabled")

      .buttons
        .due
          v-btn(@click="showDuePicker = true" small flat icon)
            icon-edit-date
          v-btn(@click="setDue()" small flat icon)
            v-icon today
          v-btn(@click="setDue(1)" small flat icon)
            icon-tomorrow

        .ready
          v-btn(@click="showReadyPicker = true" small flat icon)
            icon-edit-date
          v-btn(@click="setReady()" small flat icon)
            v-icon today
          v-btn(@click="setReady(1)" small flat icon)
            icon-tomorrow

    v-dialog(v-model="showDuePicker" lazy width="290px" :disabled="disabled")
      v-date-picker(v-model="template.due" scrollable @change="onChange")
    v-dialog(v-model="showReadyPicker" lazy width="290px" :disabled="disabled")
      v-date-picker(v-model="template.ready" @change="onChange" scrollable)

    .modifiers
      v-slider(v-model="template.importance" always-dirty thumb-label
         hide-details :label="$t('topic.importance') + ':'" :min="-5" :max="5"
         @change="onChange")
      .flags
        v-checkbox(v-model="template.pinned" @change="onChange" hide-details
                   :label="$t('topic.pinned')" :disabled="disabled")
        v-checkbox(v-model="template.complete" @change="onChange" hide-details
                   :label="$t('topic.archived')" :disabled="disabled")
</template>

<script>
import { VDatePicker, VDialog, VCheckbox, VSlider } from 'vuetify/lib'
import IconTomorrow from '@/components/icons/IconTomorrow'
import IconEditDate from '@/components/icons/IconEditDate'

export default {
  props: ['topic', 'disabled', 'hideTitle'],
  components: {
    VDatePicker,
    VDialog,
    VCheckbox,
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
    },
    onCopyUp () {
      this.template.due = this.template.ready
      this.$emit('topic-changed', this.template)
    },
    onCopyDown () {
      this.template.ready = this.template.due
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

<style lang="sass">

@media(max-width: 600px)
  .topic .dates .input-fields
    margin-right: 8px!important

.topic-form
  .modifiers
    display: flex
    flex-wrap: wrap

    margin-top: 8px
    margin-right: -16px

    > *
      margin-right: 16px

    .flags
      flex-grow: 1
      display: flex
      flex-direction: row

      > :not(:last-child)
        margin-right: 8px

  .dates
    display: flex

    .input-fields
      flex-grow: 1
      margin-right: 16px

      & > :first-child
        margin-top: 0

      .date
        flex-grow: 1
        flex-shrink: 1

      .copy-buttons
        display: flex
        justify-content: center
        margin-top: 8px

        a
          height: 24px

    .buttons
      flex-shrink: 0
      display: flex
      flex-direction: column
      justify-content: space-between

      button
        margin-top: 18px
        margin-bottom: 2px

      .due button
        margin-top: 12px
</style>
