<template lang="pug">
v-card(@click.native="onEdit")
  template(v-if="editing")
    v-textarea(v-model="template.text" @blur="onBlur" auto-grow autofocus clearable)
  template(v-else)
    .markdown(v-if="chunk.text" v-html="markdown" @click="onEdit")
</template>

<script>
import { VCard, VTextarea } from 'vuetify/lib'
import marked from 'marked'

export default {
  props: ['chunk'],
  components: {
    VCard,
    VTextarea
  },
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

      if (this.template.text && this.chunk.text != this.template.text)
        this.onChanged()

      if (!this.template.text)
        this.onDelete()
    },
    onEdit () {
      this.editing = true
    },
    onChanged () {
      this.$emit('changed', this.template)
    },
    onDelete () {
      this.$emit('deleted', this.template)
    },
    focus () {
      this.onEdit()
    }
  }
}
</script>

<style lang="styl">
.chunks
  .v-card
    min-width: 16em

    .v-btn
      position: absolute
      right: 0
      top: 0

  .v-input
    height: 100%
    margin: 0
    padding: 0

    *
      height: 100%

    .v-input__slot, .v-input__control
      padding: 0
      margin: 0

</style>

<style lang="styl" scoped>
  .markdown :last-child
    margin-bottom: 0
</style>
