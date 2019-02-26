<template lang="pug">
.chunks
  template(v-for="chunk of chunks" )
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
.chunks
  margin: -8px

  &> *
    margin: 8px

.chunks
  display: flex
  flex-wrap: wrap

  &> *
    flex-grow: 1
</style>
