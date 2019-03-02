<template lang="pug">
  v-card.links(v-if="links")
    h1 References
    .link(v-for="link of links")
      router-link(:to="{ name: 'edit', params: { id: link.other.id}}"
                  :class="{'line-through': link.other.complete}") {{ link.other.title }}
      v-btn(icon small @click.stop="onUnlink(link)")
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
        const links = [...this.topic.links]
        links.sort( (a,b) => {
          if (a.other.score.sum > b.other.score.sum)
            return -1
          else if (a.other.score.sum < b.other.score.sum)
            return 1
          else
            return 0
        })
        return links
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

  a
    margin-right: 16px

  button
    margin-top: -6px
    margin-bottom: -6px

.line-through
  text-decoration: line-through
</style>
