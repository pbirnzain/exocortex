<template lang="pug">
  .topic-list
    h1(v-if="title") {{ title }}

    v-list
      v-list-tile(v-for="topic in topics" :key="topic.id" @click="onClick(topic)"
          :color="color(topic)")
        .topic-list-item
          v-list-tile-content
            v-list-tile-title(v-text="topic.title")
            v-list-tile-sub-title(v-if="showText" v-text="topic.text")
        .score {{topic.score.sum}}
</template>

<script>
import { VList, VDivider, VListTile, VListTileContent, VListTileTitle } from 'vuetify/lib'

export default {
  props: ['title', 'topics'],
  components: {
    VList,
    VDivider,
    VListTile,
    VListTileContent,
    VListTileTitle,
  },
  computed: {
    showText() {
      return this.$store.state.search.searchText != ""
    }
  },
  methods: {
    onClick (topic) {
      this.$emit('topic-selected', topic)
    },

    color(topic) {
      if (topic.score.reasons['is overdue']) {
        return 'error'
      }
      if (topic.score.sum > 60) {
        return 'warning'
      }
    }
  }
}
</script>

<style lang="scss">

.topic-list {
  .v-list {
    padding-bottom: 0;
  }

  .v-list {
    position: relative;

    .score {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 0.25rem;

      font-size: 82%;
      font-weight: 600;

      background-color: red;
      color: white;
    }
  }
}
</style>
