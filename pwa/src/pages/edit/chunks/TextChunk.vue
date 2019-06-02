<template lang="pug">
drag-drop.textchunk(ref="card" @drag="onDrag" @drop="onDrop" :draggable="!editing")
  v-card(data-e2e="textChunk" @click.native="focus()")
    markdown-field(v-model='text' ref="mdfield" @editing="onEditing")
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
      text: ''
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
    onEditing (editing) {
      this.editing = editing
      if (!editing) {
        this.onEdited(this.text)
      }

      // When editing already filled chunks, keep the card width identical
      // and don't shrink vertically
      const card = this.$refs.card.$el
      if (editing) {
        card.style.maxWidth = card.offsetWidth + 'px'
        card.style.minWidth = card.offsetWidth + 'px'
        card.style.minHeight = card.offsetHeight + 'px'
      } else {
        card.style.maxWidth = null
        card.style.minWidth = null
        card.style.minHeight = null
      }
    },
    onEdited (newValue) {
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
