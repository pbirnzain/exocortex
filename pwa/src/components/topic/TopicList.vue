<template lang="pug">
  .topic-list
    v-list(v-if="topics.length > 0")
      v-list-tile(v-for="topic in topics" :key="topic.id" @click="onClick(topic)"
                  :color="color(topic)" data-e2e="topicListTile")
        v-list-tile-content
          v-list-tile-title(v-text="topic.title")
        v-list-tile-action(v-if="icon(topic)")
          v-icon(:color="color(topic)") {{ icon(topic) }}
    slot(v-if="topics.length === 0")
</template>

<script>
import { VList, VDivider, VListTile, VListTileContent, VListTileTitle, VListTileAction } from 'vuetify/lib'

export default {
  props: ['topics'],
  components: {
    VList,
    VDivider,
    VListTile,
    VListTileContent,
    VListTileTitle,
    VListTileAction
  },
  methods: {
    onClick (topic) {
      this.$emit('topic-selected', topic)
    },
    icon (topic) {
      if (topic.score.reasons['is overdue'])
        return 'warning'
      if (topic.pinned)
        return 'place'
      if (topic.score.sum > 50)
        return 'schedule'
    },
    color (topic) {
      // if (topic.score.reasons['is overdue'])
      //   return 'error'
      // if (topic.score.sum > 50)
      //   return 'warning'
      if (topic.score.reasons['is overdue'])
        return 'error'
      if (topic.complete)
        return 'success'
      if (topic.score.reasons['blocked'])
        return '#AAA'
    }
  }
}
</script>

<style lang="scss">
.topic-list {
  position: relative;
  .v-list {
    position: relative;
    padding-bottom: 0;
  }
  .v-list__tile__action {
    min-width: 36px;
  }
}
</style>
