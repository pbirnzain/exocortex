<template lang="pug">
v-card.textchunk(@click.native="onEdit" draggable="true" @dragstart="onDragStart"
                 @dragover.prevent="onDragOver" @dragenter="onDragEnter"
                 @dragleave="onDragLeave" @drop.prevent="onDrop"
                 :class="{'drop-before': dropBefore, 'drop-after': dropAfter}")
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
      editing: false,
      dragover: false
    }
  },
  computed: {
    template () {
      return Object.assign({}, this.chunk)
    },
    markdown () {
      const html = marked(this.template.text, { breaks: true })
      return html.replace(/<a /g, '<a target="_blank" ')
    },
    dropBefore () {
      return this.dragover
    },
    dropAfter () {
      return this.dragover
    },
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
      event.dataTransfer.setData('application/json', JSON.stringify(this.template))
      event.dataTransfer.setData('text/plain', this.template.text)
    },
    onDragOver (event) {
    },
    onDragEnter (event) {
      this.dragover = true
    },
    onDragLeave (event) {
      this.dragover = false
    },
    onDrop (event) {
      this.dragover = false
      const source = JSON.parse(event.dataTransfer.getData('application/json'))
      this.$emit('drop', {source, destination: this.chunk})
    },
    focus () {
      this.onEdit()
    }
  }
}
</script>

<style lang="styl">
@import "../../assets/github-markdown.css"
.dragging .textchunk *
  pointer-events: none

.textchunk
  &.v-card
    min-width: 16em
    padding: 16px 12px;
    border-left: 4px solid rgba(0,0,0,0)
    border-right: 4px solid rgba(0,0,0,0)

    &.drop-before
      border-left: 4px solid blue

    &.drop-after
      border-right: 4px solid blue

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
