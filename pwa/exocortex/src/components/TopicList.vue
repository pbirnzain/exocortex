<template lang="pug">
  .topic-list
    v-list(v-if="topics.length > 0")
      v-list-tile(v-for="topic in topics" :key="topic.id" @click="onClick(topic)"
          :color="color(topic)")
        v-list-tile-content
          v-list-tile-title(v-text="topic.title")
          v-list-tile-sub-title(v-if="showText" v-text="topic.text")
    slot(v-if="topics.length === 0")
</template>

<script>
import { VList, VDivider, VListTile, VListTileContent, VListTileTitle, VListTileSubTitle } from 'vuetify/lib'

export default {
  props: ['topics', 'showText'],
  components: {
    VList,
    VDivider,
    VListTile,
    VListTileContent,
    VListTileTitle,
    VListTileSubTitle
  },
  methods: {
    onClick (topic) {
      this.$emit('topic-selected', topic)
    },

    color (topic) {
      if (topic.score.reasons['is overdue']) {
        return 'error'
      }
      if (topic.score.sum > 60) {
        return 'warning'
      }
      if (topic.complete) {
        return 'success'
      }
    }
  }
}
</script>

<style lang="scss">
.topic-list {
  .v-list {
    position: relative;
    padding-bottom: 0;
  }
}
</style>
