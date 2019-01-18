<template lang="pug">
  .empty-state(slot="empty")
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

<style lang="scss">
.empty-state {
    flex-grow: 1;
    display: flex;

    .content {
      margin: auto;
      max-width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;

      text-align: center;

      img {
        max-width: 15em;
        max-height: 20em;
        margin-bottom: 1rem;
      }
      .tagline {
        font-size: 120%;
        margin-bottom: 0.5rem;
      }
    }
  }
</style>
