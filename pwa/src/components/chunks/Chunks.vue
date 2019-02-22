<template lang="pug">
.chunks
  template(v-for="chunk of chunks" )
    text-chunk(:chunk="chunk" @changed="onChunkChanged" @deleted="onChunkDeleted")
</template>

<script>
import TextChunk from './TextChunk'

export default {
  components: { TextChunk },
  props: ['chunks'],
  methods: {
    onChunkChanged (chunk) {
      console.log(chunk)
    },
    onChunkDeleted (chunk) {
      console.log(chunk.id, 'deleted')
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
