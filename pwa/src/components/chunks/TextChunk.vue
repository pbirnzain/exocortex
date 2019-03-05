<template lang="pug">
v-card.textchunk(@click.native="onEdit" draggable="true" @dragstart="onDragStart")
  template(v-if="editing")
    v-textarea(v-model="template.text" @blur="onBlur" auto-grow autofocus clearable)
  template(v-else)
    .markdown-body(v-if="chunk.text" v-html="markdown" @click="onEdit")
</template>

<script>
import { VCard, VTextarea } from 'vuetify/lib'
import marked from 'marked'

export default {
  props: ['chunk'],
  components: {
    VCard,
    VTextarea
  },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    template () {
      return Object.assign({}, this.chunk)
    },
    markdown () {
      const html = marked(this.template.text, { breaks: true })
      return html.replace(/<a /g, '<a target="_blank" ')
    }
  },
  methods: {
    onBlur () {
      this.editing = false

      if (this.template.text && this.chunk.text != this.template.text)
        this.onChanged()

      if (!this.template.text)
        this.onDelete()
    },
    onEdit () {
      this.editing = true
    },
    onChanged () {
      this.$emit('changed', this.template)
    },
    onDelete () {
      this.$emit('deleted', this.template)
    },
    onDragStart (event) {
      event.dataTransfer.setData('text/plain', `textchunk-${this.template.id}`)
    },
    focus () {
      this.onEdit()
    }
  }
}
</script>

<style lang="styl">
@import "../../assets/github-markdown.css"

.textchunk
  .v-card
    min-width: 16em

  .v-input
    height: 100%
    margin: 0
    padding: 0

    *
      height: 100%

    .v-input__slot, .v-input__control
      padding: 0
      margin: 0

.markdown-body
  font-size: 14px

  code::before, code::after
    content: none
  code
    box-shadow: none
</style>
