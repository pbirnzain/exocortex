<template lang="pug">
.chunks
  .chunk-list
    slot
  .chunk-list
    text-chunk(v-for="(chunk, index) of chunks" :data-index="index"
               :ref="'chunk' + chunk.id" :chunk="chunk"
               @changed="onChunkChanged" @deleted="onChunkDeleted"
               @drop="onDropReceived")
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
    onDropReceived ({source, destination}) {
      if (source.id == destination.id)
        return

      const destinationIndex = this.$refs[`chunk${destination.id}`][0].$attrs['data-index']
      let newWeight
      if (destinationIndex == 0)
        newWeight = destination.weight - 1
      else {
        newWeight = (this.chunks[destinationIndex - 1].weight + this.chunks[destinationIndex].weight) / 2
      }

      this.$store.dispatch('topics/textchunks/upsert', {id: source.id, weight: newWeight})
    },
    focusChunk (id) {
      this.$refs[`chunk${id}`][0].focus()
    }
  }
}
</script>

<style lang="sass">
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
  justify-content: center

  &> *
    flex-grow: 1
</style>
