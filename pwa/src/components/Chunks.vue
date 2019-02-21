<template lang="pug">
.chunks
  v-card(v-for="chunk of chunks")
    v-card-title(primary-title)
      div
        h3.headline.mb-0 {{ chunk.title }}
        div {{ chunk.text }}
</template>

<script>
import { VCard, VCardTitle } from 'vuetify/lib'

export default {
  components: { VCard, VCardTitle },
  props: ['chunks'],
}
</script>

<style lang="styl" scoped>
.chunks
  margin: -8px

  &> *
    margin: 8px

.chunks
  display: flex
  flex-wrap: wrap

  &> *
    flex-grow: 1

</style>
