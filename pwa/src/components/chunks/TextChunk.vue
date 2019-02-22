<template lang="pug">
v-card
  v-card-title(primary-title)
    .headline
      h3.headline.mb-0 {{ chunk.title }}
      v-btn(icon @click="onDelete")
        v-icon delete

    v-textarea(v-if="editing" :value="chunk.text" @blur="onBlur" auto-grow autofocus)
    p(v-else @click="editing = true") {{ chunk.text }}
</template>

<script>
import { VCard, VCardTitle, VCardActions, VTextarea, VMenu, VBtn, VIcon, VList, VListTile, VListTileTitle } from 'vuetify/lib'

export default {
  props: ['chunk'],
  components: { VCard, VCardTitle, VCardActions, VTextarea,
                VMenu, VBtn, VIcon, VList, VListTile, VListTileTitle },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    onBlur (event) {
      const newValue = event.originalTarget.value

      if (newValue != this.chunk.text)
        this.$emit('changed', {...this.chunk, text: newValue})

      this.editing = false
    },
    onDelete () {
      this.$emit('deleted', this.chunk)
    }
  }
}
</script>

<style lang="styl">
.chunks
  .v-card
    min-width: 20em

  .v-card__title
    flex-direction: column
    align-items: stretch
    flex-grow: 1

    .headline
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between

      .v-btn
        margin: 0

  .v-input
    flex-grow: 1

    *
      height: 100%
</style>

<style lang="styl" scoped>
  p
    padding-top: 12px
    margin-top: 4px
</style>
