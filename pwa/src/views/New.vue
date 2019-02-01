<template lang="pug">
  .new-topic
    v-toolbar

    v-progress-circular(indeterminate color="grey" :size="50" :width="5")
</template>

<script>
import { VToolbar, VContainer, VProgressCircular } from 'vuetify/lib'

export default {
  components: {
    VToolbar,
    VContainer,
    VProgressCircular
  },
  mounted () {
    this.$store.dispatch('topics/upsert', {pinned: true}).then( (topic) => {
      this.$router.push(`/edit/${topic.id}`)
    })
  }
}
</script>
<style lang="scss">
.new-topic {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .v-toolbar__title {
    margin-left: 20px;
  }

  .v-progress-circular {
    margin: auto;
  }
}
</style>
