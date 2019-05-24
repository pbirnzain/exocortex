<template lang="pug">
drag-drop.textchunk(ref="card" @drag="onDrag" @drop="onDrop" :draggable="!editing")
  v-card(data-e2e="textChunk" @click.native="focus()")
    markdown-field(:value='this.chunk.text' ref="mdfield"
                   @changed='onChanged' @editing="editing=$event")
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
      editing: false
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
      this.$refs['mdfield'].focus()
    },
    onChanged (newValue) {
      // delete the (now empty) chunk if the text was cleared
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
