<template lang="pug">
v-card.textchunk.drop-target(ref="card" data-e2e="textChunk"
      @click.native="onEdit" :draggable="!editing"
      @dragstart="onDragStart" @dragend="onDragEnd"
      @dragover.prevent="onDragOver" @drop.prevent="onDrop"
      @dragenter="onDragEnter" @dragleave="onDragLeave"
      :class="{'drop': dragOver, 'being-dragged': beingDragged}")
  template(v-if="editing")
    v-textarea(v-model="template.text" @blur="onBlur" auto-grow autofocus clearable)
  template(v-else)
    a.markdown-body(v-if="chunk.text" v-html="markdown" @click="onEdit")
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
      dragOver: false,
      beingDragged: false
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
  watch: {
    editing () {
      // When editing already filled chunks, keep the card width identical
      // and don't shrink vertically
      if (this.editing) {
        this.$refs.card.$el.style.width = this.$refs.card.$el.offsetWidth + "px"
        this.$refs.card.$el.style.minHeight = this.$refs.card.$el.offsetHeight + "px"
      } else {
        this.$refs.card.$el.style.width = null
        this.$refs.card.$el.style.minHeight = null
      }
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
      event.dataTransfer.setData('application/json', JSON.stringify(this.template))
      event.dataTransfer.setData('text/plain', this.template.text)
      this.beingDragged = true
    },
    onDragEnd (event) {
      this.beingDragged = false
    },
    onDragOver (event) {
    },
    onDragEnter (event) {
      this.dragOver = true
    },
    onDragLeave (event) {
      this.dragOver = false
    },
    onDrop (event) {
      this.dragOver = false
      const source = JSON.parse(event.dataTransfer.getData('application/json'))
      this.$emit('drop', {source, destination: this.chunk})
    },
    focus () {
      this.onEdit()
    }
  }
}
</script>

<style lang="sass">
@import "../../../assets/github-markdown.css"
.dragging .textchunk *
  pointer-events: none

.textchunk
  &.v-card
    min-width: 16em
    padding: 16px 12px

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
  font-family: Roboto,sans-serif

  code::before, code::after
    content: none
  code
    box-shadow: none
</style>
