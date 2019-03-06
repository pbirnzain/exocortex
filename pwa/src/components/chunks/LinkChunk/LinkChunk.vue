<template lang="pug">
  v-card.links.markdown-body(v-if="links")
    h1 References
    template(v-for="link of links")
      individual-link(:link="link")
</template>

<script>
import { VCard } from 'vuetify/lib'
import IndividualLink from './IndividualLink'

export default {
  props: ['topic'],
  components: { VCard, IndividualLink },
  computed: {
    links () {
      if (this.topic && this.topic.links && this.topic.links.length) {
        const links = [...this.topic.links]
        links.sort((a, b) => {
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
  }
}
</script>

<style lang="styl">
</style>
