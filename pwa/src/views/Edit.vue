<template lang="pug">
  .edit-topic
    v-toolbar
      router-link(:to="{ name: 'home', params: {}}")
        v-icon(data-e2e="editBack") arrow_back

      template(v-if="selectedTopic")
        v-text-field(ref="tf" :autofocus="true" single-line full-width hide-details
          :value="selectedTopic.title" @change="onTitleChanged" data-e2e="topicTitle")

        v-btn(icon disabled)
          v-icon(data-e2e="editCreatePhoto") add_a_photo
        v-btn(icon @click="onCreateNote")
          v-icon(data-e2e="editCreateNote") note_add
        v-btn(icon @click="onTopicDeleted")
          v-icon(data-e2e="editDelete") delete

    template(v-if="selectedTopicLoaded")
      .e-content.e-container.vertical(v-if="selectedTopic" :class="{fullsize: !selectedTopic}")
        topic(:topic="selectedTopic" :hideTitle="true"
              @topic-changed="onTopicChanged")
        chunks(:chunks="selectedTopic.textchunks" ref="chunks"
               @chunk-changed="onChunkChanged" @chunk-deleted="onChunkDeleted")
      empty-state(v-else tagline="Topic not found."
                  message="Most likely it has been deleted.")

    v-progress-circular(v-else indeterminate color="grey" :size="50" :width="5")
</template>
<script>
import { VBtn, VToolbar, VToolbarTitle, VSpacer, VIcon, VTextField, VProgressCircular } from 'vuetify/lib'
import Topic from '@/components/topic/Topic'
import Chunks from '@/components/chunks/Chunks'
import EmptyState from '@/components/EmptyState'

export default {
  components: {
    VBtn,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VTextField,
    VProgressCircular,
    Topic,
    Chunks,
    EmptyState
  },
  computed: {
    selectedTopic () {
      return this.$store.getters['topics/selectedTopic']
    },
    selectedTopicLoaded () {
      return this.$store.getters['topics/selectedTopicLoaded']
    }
  },
  watch: {
    selectedTopic () {
      const elem = document.querySelector('title')
      if (this.selectedTopic)
        elem.innerHTML = this.selectedTopic.title || 'Exocortex: Edit'
      else
        elem.innerHTML = 'Exocortex'
    }
  },
  mounted () {
    this.$store.dispatch('topics/select', this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('topics/select', to.params.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (this.selectedTopic) {
      // The textfield does not emit a change event when destroyed while still focused
      if (this.$refs.tf.lazyValue !== this.selectedTopic.title)
        this.onTitleChanged(this.$refs.tf.lazyValue)

      this.$store.dispatch('topics/select', undefined)
    }
    next()
  },
  methods: {
    onTitleChanged (title) {
      this.onTopicChanged({...this.selectedTopic, title: title})
    },
    onTopicChanged (topic) {
      this.$store.dispatch('topics/upsert', topic)
    },
    onTopicDeleted () {
      this.$store.dispatch('topics/delete', this.selectedTopic.id)
      this.$router.push('/')
    },
    onCreateNote () {
      const r = this.$store.dispatch('topics/textchunks/upsert',
                                     { topic: this.selectedTopic.id })
      r.then( (chunk) => {
        this.$refs.chunks.focusChunk(chunk.id)
      })
    },
    onChunkChanged (chunk) {
      this.$store.dispatch('topics/textchunks/upsert', chunk)
    },
    onChunkDeleted (chunk) {
      this.$store.dispatch('topics/textchunks/delete', chunk.id)
    }
  }
}
</script>
<style lang="styl">
.edit-topic
  height: 100vh
  width: 100%
  display: flex
  flex-direction: column

  .v-toolbar
    z-index: 10

    .v-input__slot
      padding: 0 16px

  .v-toolbar__title
    margin-left: 20px

  .v-progress-circular
    margin: auto

  .v-card
    padding: 16px

  .e-content
    margin-top: 4px // to make more space for box-shadow of toolbar
</style>
