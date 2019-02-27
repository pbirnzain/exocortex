<template lang="pug">
  v-card(v-if="links")
    .link(v-for="link of links")
      router-link(:to="{ name: 'edit', params: { id: link.other.id}}") {{ link.other.title }}
      v-btn(icon @click.stop="onUnlink(link)")
        v-icon link_off
</template>

<script>
import { VCard, VBtn, VIcon } from 'vuetify/lib'

export default {
  props: ['topic'],
  components: { VCard, VBtn, VIcon },
  computed: {
    links() {
      if (this.topic && this.topic.links && this.topic.links.length) {
        return this.topic.links
      }
    }
  },
  methods: {
    onUnlink(link) {
      this.$emit('unlink', link.id)
    }
  }
}
</script>

<style lang="styl" scoped>
.link
  display: flex
  align-items: center
  justify-content: space-between

  button
    margin: -6px 0
</style>
