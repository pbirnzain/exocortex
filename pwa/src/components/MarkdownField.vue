<template lang="pug">
.markdown-field
  template(v-if="editing")
    //- textarea for editing markdown
    v-textarea(:value="text" @blur="onEditingComplete" @input="onInput"
               auto-grow autofocus clearable hide-details)
  template(v-else)
    //- rendered markdown
    a.markdown-body(v-if="text" :id="markdownId"
                    v-html="markdown" @click="onEdit")
</template>

<script>
import { VTextarea } from 'vuetify/lib'
import marked from 'marked'

export default {
  props: ['value'],
  components: { VTextarea },
  data () {
    return {
      editing: false,
      text: ''
    }
  },
  computed: {
    markdown () {
      const html = marked(this.text, { breaks: true })
      return html.replace(/<a /g, '<a target="_blank" ')
    },
    markdownId () {
      return `md-${this._uid}`
    }
  },
  watch: {
    value () {
      this.text = this.value
    },
    editing () {
      this.$emit('editing', this.editing)
    }
  },
  mounted () {
    this.text = this.value
    this.attachMarkdownCheckboxListeners()
  },
  updated () {
    this.attachMarkdownCheckboxListeners()
  },
  methods: {
    attachMarkdownCheckboxListeners () {
      const checkboxElems = document.querySelectorAll(`#${this.markdownId} input[type="checkbox"]`)
      for (const [idx, checkbox] of checkboxElems.entries()) {
        checkbox.removeAttribute('disabled')
        checkbox.onclick = (event) => {
          event.stopPropagation()
          this.toggleCheckbox(idx)
        }
      }
    },
    toggleCheckbox (idx) {
      // FIXME POC; surely there is some unhandled corner case
      let pos = 0
      for (var i = 0; i < idx+1; i++) {
        pos = this.text.indexOf('- [', pos)+3
      }

      this.text = this.text.substring(0, pos) +
                           (this.text.charAt(pos) === ' ' ? 'X' : ' ') +
                           this.text.substring(pos+1)
      this.onInput(this.text)
      this.emitChanges()
    },
    focus () {
      this.onEdit()
    },
    onInput (newText) {
      this.text = newText
      this.$emit('input', newText)
    },
    onEdit () {
      this.editing = true
    },
    onEditingComplete () {
      this.editing = false
      this.emitChanges()
    },
    emitChanges () {
      if (this.text !== this.value)
        this.$emit('changed', this.text)
    }
  }
}
</script>

<style lang="sass">
@import "../assets/github-markdown.css"

.markdown-field
  .v-input
    height: 100%
    margin: 0
    padding: 0

    *
      height: 100%

    .v-input__slot, .v-input__control
      padding: 0
      margin: 0

.markdown-body
  font-size: 14px
  font-family: Roboto,sans-serif

  code::before, code::after
    content: none
  code
    box-shadow: none
</style>
