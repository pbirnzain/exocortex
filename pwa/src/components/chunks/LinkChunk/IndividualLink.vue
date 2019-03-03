<template lang="pug">
  .link(@dragover.prevent="onDragOver" @drop="onDrop")
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
  methods: {
    onDragOver (event) {
    },
    onDrop (event) {
      const source = event.dataTransfer.getData("text/plain");
      console.log(`Move ${source} to topic ${this.link.other.title}`)
    },
    onUnlink (linkId) {
      this.$store.dispatch('topics/links/delete', linkId)
    },
  }
}
</script>

<style lang="styl" scoped>
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
