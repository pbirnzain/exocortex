<template lang="pug">
.chunks
  .chunk-list
    slot
  .chunk-list
    template(v-for="chunk of chunks")
      text-chunk(:ref="'chunk' + chunk.id" :chunk="chunk" @changed="onChunkChanged" @deleted="onChunkDeleted")
</template>

<script>
import TextChunk from './TextChunk'

export default {
  components: { TextChunk },
  props: ['chunks'],
  methods: {
    onChunkChanged (chunk) {
      this.$emit('chunk-changed', chunk)
    },
    onChunkDeleted (chunk) {
      this.$emit('chunk-deleted', chunk)
    },
    focusChunk (id) {
      this.$refs[`chunk${id}`][0].focus()
    }
  }
}
</script>

<style lang="styl">
.chunk-list
  margin: -8px

  &> *
    margin: 8px

  .v-card
    padding: 16px

.chunk-list:not(:last-child)
  margin-bottom: 8px

.chunk-list
  display: flex
  flex-wrap: wrap
  justify-content: center;

  &> *
    flex-grow: 1
</style>
