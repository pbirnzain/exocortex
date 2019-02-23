<template lang="pug">
v-card
  v-card-title(primary-title)
    .headline
      v-text-field(v-model="template.title" @change="onChanged" single-line full-width hide-details autofocus)
      v-btn(icon @click="onEdit")
        v-icon edit
      v-btn(icon @click="onDelete")
        v-icon delete

    v-textarea(v-if="editing" v-model="template.text" @blur="onBlur" auto-grow autofocus)
    template(v-else)
      .markdown(v-if="chunk.text" @click="onEdit" v-html="markdown")
</template>

<script>
import { VCard, VCardTitle, VCardActions, VTextarea, VTextField, VMenu, VBtn, VIcon, VList, VListTile, VListTileTitle } from 'vuetify/lib'
import marked from 'marked'

export default {
  props: ['chunk'],
  components: { VCard,
    VCardTitle,
    VCardActions,
    VTextarea,
    VTextField,
    VMenu,
    VBtn,
    VIcon,
    VList,
    VListTile,
    VListTileTitle },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    template () {
      return Object.assign({}, this.chunk)
    },
    markdown () {
      const html = marked(this.template.text, { breaks: true })
      return html.replace(/<a /, '<a target="_blank" ')
    }
  },
  methods: {
    onBlur () {
      this.editing = false

      if (this.chunk.text != this.template.text)
        this.$emit('changed', this.template)

      this.onChanged()
    },
    onEdit () {
      this.editing = true
    },
    onChanged () {
      this.$emit('changed', this.template)
    },
    onDelete () {
      this.$emit('deleted', this.template)
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
        margin-top: 0
        margin-bottom: 0

  .v-input
    flex-grow: 1

    *
      height: 100%

    .v-input__slot
      padding-left: 0
    .v-input__control
      padding: 0

</style>

<style lang="styl" scoped>
  .markdown
    padding-top: 12px
    margin-top: 4px
</style>
