<template lang="pug">
drag-drop.textchunk(ref="card" @drag="onDrag" @drop="onDrop" :draggable="!editing")
  v-card(data-e2e="textChunk" @click.native="onEdit")
    template(v-if="editing")
      v-textarea(v-model="template.text" @blur="onBlur" auto-grow autofocus clearable)
    template(v-else)
      a.markdown-body(v-if="chunk.text" v-html="markdown" @click="onEdit")
</template>

<script>
import { VCard, VTextarea } from 'vuetify/lib'
import marked from 'marked'
import DragDrop from '@/components/DragDrop'

export default {
  props: ['chunk'],
  components: {
    VCard,
    VTextarea,
    DragDrop
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
  watch: {
    editing () {
      // When editing already filled chunks, keep the card width identical
      // and don't shrink vertically
      if (this.editing) {
        this.$refs.card.$el.style.maxWidth = this.$refs.card.$el.offsetWidth + "px"
        this.$refs.card.$el.style.minWidth = this.$refs.card.$el.offsetWidth + "px"
        this.$refs.card.$el.style.minHeight = this.$refs.card.$el.offsetHeight + "px"
      } else {
        this.$refs.card.$el.style.maxWidth = null
        this.$refs.card.$el.style.minWidth = null
        this.$refs.card.$el.style.minHeight = null
      }
    }
  },
  methods: {
    focus () {
      this.onEdit()
    },
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
    onDrag (event) {
      // the entire textchunk entity for drop targets within the application
      // (i.e. other textchunks for now, later other reorderable chunk types)
      event.dataTransfer.setData('application/json', JSON.stringify(this.template))
      // markdown content as plain text for drop targets outside the application
      event.dataTransfer.setData('text/plain', this.template.text)
    },
    onDrop (source) {
      this.$emit('drop', {source, destination: this.chunk})
    }
  }
}
</script>

<style lang="sass">
@import "../../../assets/github-markdown.css"
.dragging .textchunk *
  pointer-events: none

.textchunk
  .v-card
    min-width: 16em
    height: 100%
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
