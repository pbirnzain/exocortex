<template lang="pug">
drag-drop.textchunk(ref="card" @drag="onDrag" @drop="onDrop" :draggable="!editing")
  v-card(data-e2e="textChunk" @click.native="focus()")
    markdown-field(v-model='text' ref="mdfield"
                   @focus="onFocus" @blur="onBlur" @change="onChange")
</template>

<script>
import { VCard } from 'vuetify/lib'
import DragDrop from '@/components/DragDrop'
import MarkdownField from '@/components/MarkdownField'

export default {
  props: ['chunk'],
  components: {
    VCard,
    DragDrop,
    MarkdownField
  },
  data () {
    return {
      editing: false,
      text: '',
      oldText: this.chunk.text
    }
  },
  watch: {
    chunk () {
      this.text = this.chunk.text
    }
  },
  mounted () {
    this.text = this.chunk.text
  },
  methods: {
    focus () {
      this.$refs['mdfield'].focus()
    },
    onFocus () {
      this.editing = true
      this.oldText = this.text

      // When editing already filled chunks, keep the card width identical
      // and don't shrink vertically
      const card = this.$refs.card.$el
      card.style.maxWidth = card.offsetWidth + 'px'
      card.style.minWidth = card.offsetWidth + 'px'
      card.style.minHeight = card.offsetHeight + 'px'
    },
    onBlur () {
      this.editing = false

      // delete empty textchunks on blur
      if (!this.oldText && !this.text) {
        this.$emit('deleted', this.chunk)
      }

      // clear styles set in onFocus()
      const card = this.$refs.card.$el
      card.style.maxWidth = null
      card.style.minWidth = null
      card.style.minHeight = null
    },
    onChange (newValue) {
      if (!newValue)
        this.$emit('deleted', this.chunk)

      if (newValue && newValue != this.chunk.text)
        this.$emit('changed', {...this.chunk, text: newValue})
    },
    onDrag (event) {
      // the entire textchunk entity for drop targets within the application
      // (i.e. other textchunks for now, later other reorderable chunk types)
      event.dataTransfer.setData('application/json', JSON.stringify(this.chunk))
      // markdown content as plain text for drop targets outside the application
      event.dataTransfer.setData('text/plain', this.chunk.text)
    },
    onDrop (source) {
      this.$emit('drop', {source, destination: this.chunk})
    }
  }
}
</script>

<style lang="sass">
.dragging .textchunk *
  pointer-events: none

.textchunk
  .v-card
    min-width: 16em
    height: 100%
    padding: 16px 12px

    > *
      height: 100%

</style>
