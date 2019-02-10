<template lang="pug">
  .edit-topic
    v-toolbar
      router-link(:to="{ name: 'home', params: {}}")
        v-icon(data-e2e="editBack") arrow_back

      template(v-if="selectedTopic")
        v-text-field(ref="tf" :autofocus="true" single-line full-width hide-details
          :value="selectedTopic.title" @change="onTitleChanged" data-e2e="topicTitle")
        a(@click="onDelete")
          v-icon(data-e2e="editDelete") delete

    .e-content.e-container(v-if="selectedTopicLoaded")
      topic(:topic="selectedTopic" :hideTitle="true"
            @topic-changed="onTopicChanged")
    v-progress-circular(v-else indeterminate color="grey" :size="50" :width="5")
</template>
<script>
import { VBtn, VToolbar, VToolbarTitle, VSpacer, VIcon, VTextField, VProgressCircular } from 'vuetify/lib'
import Topic from '@/components/topic/Topic'

export default {
  components: {
    Topic,
    VBtn,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VTextField,
    VProgressCircular
  },
  computed: {
    selectedTopic () {
      return this.$store.getters['topics/selectedTopic']
    },
    selectedTopicLoaded () {
      return this.$store.getters['topics/selectedTopicLoaded']
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
    onDelete () {
      this.$store.dispatch('topics/delete', this.selectedTopic)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.edit-topic {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;

  .v-toolbar {
    z-index: 10;

    .v-input__slot {
      padding: 0 16px;
    }
  }
  .v-toolbar__title {
    margin-left: 20px;
  }
  .v-progress-circular {
    margin: auto;
  }
}
</style>
