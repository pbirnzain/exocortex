<template lang="pug">
  .topic-list
    h1(v-if="title") {{ title }}

    v-list
      v-list-tile(v-for="topic in topics" :key="topic.id" @click="onClick(topic)")
        .topic-list-item
          v-list-tile-content
            v-list-tile-title(v-text="topic.title")
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
  methods: {
    onClick (topic) {
      this.$emit('topic-selected', topic)
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
