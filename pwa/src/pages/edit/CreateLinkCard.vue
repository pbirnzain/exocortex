<template lang="pug">
  v-card.create-link-card
    v-card-title
      v-autocomplete(v-model="selection" :items="allowedTopics" ref="otherInput"
                     item-value="id" item-text="title" @change="onLink"
                     prepend-icon="link")
      v-btn(flat @click="onLinkToNew") New Topic
</template>

<script>
import { VBtn, VSpacer, VIcon, VCard, VCardTitle, VCardActions, VAutocomplete } from 'vuetify/lib'

export default {
  props: ['topic'],
  components: { VBtn, VSpacer, VIcon, VCard, VCardTitle, VCardActions, VAutocomplete },
  data () {
    return { selection: undefined }
  },
  computed: {
    allowedTopics () {
      // This *intentionally* includes filtering according to the search field
      const existingLinkIds = new Set(this.topic.links.map(t => t.other.id))
      let result = this.$store.getters['search/allTopics'].filter((t) => {
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
  mounted () {
    this.$store.dispatch('search/requireFilter', 'incomplete')
  },
  methods: {
    focus () {
      this.$refs.otherInput.focus()
    },
    onLink () {
      const link = { from_topic: this.topic.id, to_topic: this.selection }
      this.$emit('link-created', link)
      this.selection = null
    },
    onLinkToNew () {
      this.$emit('link-to-new')
    }
  }
}
</script>
