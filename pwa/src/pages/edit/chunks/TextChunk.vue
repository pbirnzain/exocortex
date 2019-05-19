<template lang="pug">
drag-drop.textchunk(ref="card" @drag="onDrag" @drop="onDrop" :draggable="!editing")
  v-card(data-e2e="textChunk" @click.native="onEdit")
    template(v-if="editing")
      //- textarea for editing markdown
      v-textarea(v-model="template.text" @blur="onEditComplete"
                 auto-grow autofocus clearable)
    template(v-else)
      //- rendered markdown
      a.markdown-body(v-if="chunk.text" :id="markdownId"
                      v-html="markdown" @click="onEdit")
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
    },
    markdownId () {
      return `md-${this.chunk.id}`
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
  mounted () {
    this.attachMarkdownCheckboxListeners()
  },
  updated () {
    this.attachMarkdownCheckboxListeners()
  },
  methods: {
    attachMarkdownCheckboxListeners () {
      const checkboxElems = document.querySelectorAll(`#${this.markdownId} input[type="checkbox"]`)
      for (const [idx, checkbox] of checkboxElems.entries()) {
        checkbox.removeAttribute('disabled')
        checkbox.onclick = (event) => {
          event.stopPropagation()
          this.toggleCheckbox(idx)
        }
      }
    },
    toggleCheckbox (idx) {
      const text = this.template.text
      let pos = 0
      for (var i = 0; i < idx+1; i++) {
        pos = text.indexOf('- [', pos)+3
      }

      this.template.text = text.substring(0, pos) +
                           (text.charAt(pos) === ' ' ? 'X' : ' ') +
                           text.substring(pos+1)
      this.onChanged()
    },
    focus () {
      this.onEdit()
    },
    onEdit () {
      this.editing = true
    },
    onEditComplete () {
      this.editing = false

      // delete the (now empty) chunk if the text was cleared
      if (!this.template.text)
        this.onDelete()

      if (this.template.text && this.chunk.text != this.template.text)
        this.onChanged()
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
