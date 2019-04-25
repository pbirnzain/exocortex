<template lang="pug">
  .edit-topic
    v-toolbar
      router-link(:to="{ name: 'home', params: {}}")
        v-icon(data-e2e="editBack") arrow_back

      template(v-if="selectedTopic")
        v-text-field(ref="tf" :autofocus="true" single-line full-width hide-details
          :value="selectedTopic.title" @change="onTitleChanged" data-e2e="topicTitle")

        //v-btn(icon disabled)
          v-icon(data-e2e="editCreatePhoto") add_a_photo
        v-btn(icon @click="onCreateNote")
          v-icon(data-e2e="editCreateNote") note_add
        v-btn(@click.stop="showLinkDialog = true" icon)
          v-icon(data-e2e="editCreateLink") link
        v-dialog(v-model="showLinkDialog" lazy max-width="600px" @keydown="onDialogKeydown")
          create-link-card(ref="linkCard" :topic="selectedTopic"
          @link-created="onLink" @link-to-new="onLinkToNew")
        v-btn(icon @click="onTopicDeleted")
          v-icon(data-e2e="editDelete") delete

    template(v-if="selectedTopicLoaded")
      .e-content.e-container.vertical(v-if="selectedTopic" :class="{fullsize: !selectedTopic}")
        chunks(:chunks="selectedTopic.textchunks" ref="chunks"
               @chunk-changed="onChunkChanged" @chunk-deleted="onChunkDeleted")
          topic(:topic="selectedTopic" :hideTitle="true"
                @topic-changed="onTopicChanged")
          link-chunk(:topic="selectedTopic")
      empty-state(v-else tagline="Topic not found."
                  message="Most likely it has been deleted.")

    v-progress-circular(v-else indeterminate color="grey" :size="50" :width="5")
</template>

<script>
import Vue from 'vue'
import { VBtn, VDialog, VToolbar, VToolbarTitle, VSpacer, VIcon, VTextField, VProgressCircular } from 'vuetify/lib'
import Topic from '@/components/topic/Topic'
import Chunks from '@/components/chunks/Chunks'
import LinkChunk from '@/components/chunks/LinkChunk/LinkChunk'
import CreateLinkCard from './CreateLinkCard'
import EmptyState from '@/components/EmptyState'

export default {
  components: {
    VBtn,
    VDialog,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VTextField,
    VProgressCircular,
    Topic,
    Chunks,
    LinkChunk,
    CreateLinkCard,
    EmptyState
  },
  data () {
    return { showLinkDialog: false }
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
    },
    showLinkDialog () {
      if (this.showLinkDialog)
        Vue.nextTick(() => this.$refs.linkCard.focus())
    }
  },
  mounted () {
    this.$store.dispatch('topics/select', this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('topics/select', to.params.id)
    this.$refs.tf.focus()
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
      const tc = this.selectedTopic.textchunks
      const weight = tc && tc.length && tc[tc.length - 1].weight + 1 || 100
      const r = this.$store.dispatch('topics/textchunks/upsert',
        { topic: this.selectedTopic.id, weight })
      r.then((chunk) => {
        this.$refs.chunks.focusChunk(chunk.id)
      })
    },
    onChunkChanged (chunk) {
      this.$store.dispatch('topics/textchunks/upsert', chunk)
    },
    onChunkDeleted (chunk) {
      this.$store.dispatch('topics/textchunks/delete', chunk.id)
    },
    onLink (link) {
      this.showLinkDialog = false
      this.$store.dispatch('topics/links/upsert', link)
    },
    onLinkToNew () {
      this.showLinkDialog = false
      // FIXME create an endpoint to make this an atomic operation
      // FIXME add error handling
      const newTopic = { pinned: true, title: this.$store.state.search.searchText }
      this.$store.dispatch('topics/upsert', newTopic).then((topic) => {
        const link = { from_topic: this.selectedTopic.id, to_topic: topic.id }
        this.$store.dispatch('topics/links/upsert', link)
        this.$router.push(`/edit/${topic.id}`)
      })
    },
    onDialogKeydown (event) {
      if (event.key == 'Escape')
        this.showLinkDialog = false
    }
  }
}
</script>
<style lang="styl">
.edit-topic
  min-height: 100vh
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

  .e-content
    margin-top: 4px // to make more space for box-shadow of toolbar
</style>
