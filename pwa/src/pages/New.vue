<template lang="pug">
  .new-topic
    v-toolbar

    v-progress-circular(indeterminate color="grey" :size="50" :width="5")
</template>

<script>
export default {
  mounted () {
    const elem = document.querySelector('title')
    elem.innerHTML = 'Exocortex: New'
    let newTopic = { pinned: true }
    if (this.$route.params.title) {
      newTopic.title = this.$route.params.title
    }

    this.$store.dispatch('topics/upsert', newTopic).then((topic) => {
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
