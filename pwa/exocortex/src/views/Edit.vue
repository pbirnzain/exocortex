<template lang="pug">
  .edit-topic(v-if="selectedTopic")
    v-toolbar
      v-btn(icon @click="onBack")
        v-icon arrow_back

      v-text-field(ref="tf" single-line full-width hide-details :value="selectedTopic.title" @change="onTitleChanged")

      v-btn(icon @click="onDelete")
        v-icon delete

    v-container
      topic(:topic="selectedTopic" @topic-changed="onTopicChanged" :hideTitle="true")
</template>
<script>
import { VBtn, VContainer, VToolbar, VToolbarTitle, VSpacer, VIcon, VTextField } from 'vuetify/lib'
import Topic from '../components/Topic'

export default {
  name: 'app',
  components: {
    Topic,
    VBtn,
    VContainer,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VTextField
  },
  computed: {
    selectedTopic () {
      return this.$store.getters['topics/selectedTopic']
    }
  },
  watch: {
    selectedTopic (newSelectedTopic) {
      if (!newSelectedTopic) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.$store.dispatch('topics/selectTopic', this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('topics/selectTopic', to.params.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (this.selectedTopic) {
      // The textfield does not emit a change event when destroyed while still focused
      if (this.$refs.tf.lazyValue !== this.selectedTopic.title)
        this.onTitleChanged(this.$refs.tf.lazyValue)

      this.$store.dispatch('topics/selectTopic', undefined)
    }
    next()
  },
  methods: {
    onTitleChanged (title) {
      this.onTopicChanged({...this.selectedTopic, title: title})
    },
    onTopicChanged (topic) {
      this.$store.dispatch('topics/upsertTopic', topic)
    },
    onBack () {
      this.$router.push('/')
    },
    onDelete () {
      this.$store.dispatch('topics/deleteTopic', this.selectedTopic)
    }
  }
}
</script>
<style lang="scss">
.edit-topic {
  background: white;

  .v-toolbar__title {
    margin-left: 20px;
  }
}
</style>
