<template lang="pug">
  .link(@dragover.prevent="onDragOver" @dragenter="onDragEnter"
        @dragleave="onDragLeave" @drop.prevent="onDrop"
        :class="{'can-drop': dragover}")
    router-link(:to="{ name: 'edit', params: { id: link.other.id}}"
                :class="{'line-through': link.other.complete}") {{ link.other.title }}
    v-btn(icon small @click.stop="onUnlink(link)")
      v-icon link_off
</template>

<script>
import { VBtn, VIcon } from 'vuetify/lib'

export default {
  components: { VBtn, VIcon },
  props: ['link'],
  data () {
    return {
      dragover: false
    }
  },
  methods: {
    onDragOver (event) {
    },
    onDragEnter (event) {
      this.dragover = true
    },
    onDragLeave (event) {
      this.dragover = false
    },
    onDrop (event) {
      this.dragover = false
      const source = event.dataTransfer.getData('text/plain')
      const sourceId = parseInt(source.split('-')[1])
      this.$store.dispatch('topics/textchunks/move',
        { sourceId, destinationId: this.link.other.id })
    },
    onUnlink (link) {
      this.$store.dispatch('topics/links/delete', link.id)
    },
  }
}
</script>

<style lang="styl" scoped>
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

    &.can-drop a
      color: red

  .line-through
    text-decoration: line-through
</style>
