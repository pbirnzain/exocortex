<template lang="pug">
  .edit-topic
    v-toolbar
      router-link(:to="{ name: 'home', params: {}}")
        v-icon arrow_back
      router-link(:to="{ name: 'home', params: {}}")
        v-toolbar-title Edit

      v-spacer
      a(@click="onDelete")
        v-icon delete

    v-container
      topic(:topic="selectedTopic" @topic-changed="onTopicChanged")
</template>
<script>
import { VBtn, VContainer, VToolbar, VToolbarTitle, VSpacer, VIcon } from 'vuetify/lib'
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
    VIcon
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
      this.$store.dispatch('topics/selectTopic', undefined)
    }
    next()
  },
  methods: {
    onTopicChanged (topic) {
      this.$store.dispatch('topics/upsertTopic', topic)
    },
    onDelete () {
      this.$store.dispatch('topics/deleteTopic', this.selectedTopic)
    }
  }
}
</script>
<style lang="scss">
.edit-topic {
  .v-toolbar__title {
    margin-left: 20px;
  }
}
</style>
