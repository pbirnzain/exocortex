<template lang="pug">
  .link.drop-target(@dragover.prevent="onDragOver" @dragenter="onDragEnter"
                    @dragleave="onDragLeave" @drop.prevent="onDrop"
                    :class="{'drop': dragOver}")
    router-link(:to="{ name: 'edit', params: { id: link.other.id}}"
                :class="{'line-through': link.other.complete}") {{ link.other.title }}
    v-btn(icon small @click.stop="onUnlink(link)")
      v-icon link_off
</template>

<script>
export default {
  props: ['link'],
  data () {
    return {
      dragOver: false
    }
  },
  methods: {
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
      this.$store.dispatch('topics/textchunks/move',
        { sourceId: source.id, destinationId: this.link.other.id })
    },
    onUnlink (link) {
      this.$store.dispatch('topics/links/delete', link.id)
    }
  }
}
</script>

<style lang="sass" scoped>
  .dragging .link *
    pointer-events: none

  .link
    display: flex
    align-items: center
    justify-content: space-between

    a
      margin-right: 16px

    button
      margin-top: -6px
      margin-bottom: -6px

  .line-through
    text-decoration: line-through
</style>
