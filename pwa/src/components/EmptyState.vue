<template lang="pug">
  .empty-state(slot="empty", data-e2e="emptyState")
    .content
      img(v-if="img" :src="img")
      .tagline {{ tagline }}
      .message {{ message }}
</template>

<script>
export default {
  props: ['img', 'tagline', 'message']
}
</script>

<style lang="sass">
.empty-state
    // https://stackoverflow.com/questions/33636796/chrome-safari-not-filling-100-height-of-flex-parent
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

    display: flex
    background: white

    .content
      margin: auto
      max-width: 80%
      display: flex
      flex-direction: column
      align-items: center

      text-align: center

      img
        max-width: 15em
        max-height: 20em
        margin-bottom: 1rem

      .tagline
        font-size: 120%
        margin-bottom: 0.5rem
</style>
