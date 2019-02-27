<template lang="pug">
  v-card
    v-card-title
      v-autocomplete(v-model="selection" :items="allowedTopics"
                     item-value="id" item-text="title" autofocus
                     append-outer-icon="link" @click:append-outer.stop="onLink")
</template>

<script>
import { VBtn, VIcon, VCard, VCardTitle, VCardActions, VAutocomplete } from 'vuetify/lib'

export default {
  props: ['topic'],
  components: { VBtn, VIcon, VCard, VCardTitle, VCardActions, VAutocomplete },
  data() {
    return { selection: undefined }
  },
  computed: {
    allowedTopics() {
      // This *intentionally* includes filtering according to the search field
      const existingLinkIds = new Set(this.topic.links.map( t => t.other.id))
      let result = this.$store.getters['search/matchingTopics'].filter( (t) => {
        return t.id != this.topic.id && !existingLinkIds.has(t.id)
      })
      result = result.sort((a, b) => {
        if (a.score.sum < b.score.sum) {
          return 1
        } else if (a.score.sum > b.score.sum) {
          return -1
        }

        if (a.ready < b.ready) {
          return -1
        } else if (a.ready > b.ready) {
          return 1
        } else {
          return 0
        }
      })
      return result
    }
  },
  mounted() {
    this.$store.dispatch('search/requireFilter', 'incomplete')
  },
  methods: {
    onLink() {
      const link = { from_topic: this.topic.id, to_topic: this.selection }
      this.$emit('link-created', link)
      this.selection = null
    }
  }
}
</script>
