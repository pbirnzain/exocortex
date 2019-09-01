<template lang="pug">
  .topic-list
    v-list(v-if="topics.length > 0")
      v-list-tile(v-for="topic in topics" :key="topic.id" @click="onClick(topic)"
                  data-e2e="topicListTile")
        v-list-tile-content
          v-list-tile-title(v-text="topic.title" :class="getColor(topic) ? getColor(topic) + '--text' : ''")
        v-list-tile-action(v-if="getIcon(topic)")
          v-icon(:color="getColor(topic)") {{ getIcon(topic) }}
    slot(v-if="topics.length === 0")
</template>

<script>
export default {
  props: ['topics'],
  methods: {
    onClick (topic) {
      this.$emit('topic-selected', topic)
    },
    getIcon (topic) {
      if (topic.score.reasons['is overdue'])
        return 'warning'
      if (topic.pinned)
        return 'place'
      if (topic.score.sum > 50)
        return 'schedule'
    },
    getColor (topic) {
      if (topic.score.reasons['is overdue'])
        return 'overdue'
      if (topic.complete)
        return 'complete'
      if (topic.score.reasons['blocked'])
        return 'inactive'
    }
  }
}
</script>

<style lang="sass">
.topic-list
  position: relative
  .v-list
    position: relative
    padding-bottom: 0

  .v-list__tile__action
    min-width: 36px
</style>
