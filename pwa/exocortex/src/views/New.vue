<template lang="pug">
  .edit-topic
    v-toolbar
      router-link(:to="{ name: 'home', params: {}}")
        v-icon arrow_back

      v-text-field(ref="tf" single-line full-width hide-details placeholder="Title"
        v-model="newTopic.title")

      a(@click="onSave")
        v-icon(:disabled="!canSave") save
    v-container
      topic(:topic="newTopic" @topic-changed="onTopicChanged" :disabled="disabled" :hideTitle="true")
</template>

<script>
import { VBtn, VContainer, VToolbar, VToolbarTitle, VIcon, VTextField } from 'vuetify/lib'
import Topic from '../components/Topic'

export default {
  name: 'app',
  components: {
    Topic,
    VBtn,
    VContainer,
    VToolbar,
    VToolbarTitle,
    VIcon,
    VTextField
  },
  data () {
    return { newTopic: {title: '', pinned: true}, disabled: false }
  },
  computed: {
    canSave () {
      return this.newTopic && this.newTopic.title;
    }
  },
  mounted () {
    this.$refs.tf.focus()
  },
  beforeRouteLeave (to, from, next) {
    if (this.canSave) {
      this.save()
    }
    next()
  },
  methods: {
    onTopicChanged (topic) {
      this.newTopic = topic
    },
    onSave () {
      if (this.canSave) {
        this.save()
        this.$router.push('/')
      }
    },
    save () {
      this.$store.dispatch('topics/upsertTopic', this.newTopic)
      this.newTopic = null
    }
  }
}
</script>
<style lang="scss">
.edit-topic {
  display: flex;
  flex-direction: column;
  background: white;

  .box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .v-toolbar__title {
    margin-left: 20px;
  }
}
</style>
