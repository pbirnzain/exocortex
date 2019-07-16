<template lang="pug">
.markdown-field
  template(v-if="editing")
    //- textarea for editing markdown
    v-textarea(:value="text" @input="onInput"
               @focus="onFocus" @blur="onBlur"
               auto-grow autofocus hide-details
               :append-icon="appendIcon" @click:append="onAppendIconClick")
  template(v-else)
    //- rendered markdown
    a.markdown-body(v-if="text" :id="markdownId"
                    v-html="markdown" @click="focus()")
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
      text: '',
      initialText: this.value,
      undoText: null
    }
  },
  computed: {
    markdown () {
      const renderer = new marked.Renderer()
      renderer.checkbox = function (checked) {
        return '<i aria-hidden="true" class="v-icon material-icons theme--light accent--text">' +
               (checked ? 'check_box' : 'check_box_outline_blank') +
               '</i>'
      }
      renderer.listitem = function (text, task, checked) {
        return '<li>' + text + '</li>'
      }
      renderer.link = function (href, title, text) {
        return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
      }
      return marked(this.text, { breaks: true, renderer })
    },
    markdownId () {
      return `md-${this._uid}`
    },
    appendAction () {
      if (this.initialText && !this.text)
        return 'undo'
      if (this.text)
        return 'clear'
    },
    appendIcon () {
      return this.appendAction
    }
  },
  watch: {
    value () {
      this.text = this.value
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
      const checkboxElems = document.querySelectorAll(`#${this.markdownId} li i`)
      for (const [idx, checkbox] of checkboxElems.entries()) {
        checkbox.removeAttribute('disabled')
        checkbox.onclick = (event) => {
          event.stopPropagation()
          this.onToggleCheckbox(idx)
        }
      }
    },
    onToggleCheckbox (idx) {
      // FIXME POC; surely there is some unhandled corner case
      let pos = 0
      for (var i = 0; i < idx + 1; i++) {
        pos = this.text.indexOf('- [', pos) + 3
      }

      this.text = this.text.substring(0, pos) +
                           (this.text.charAt(pos) === ' ' ? 'X' : ' ') +
                           this.text.substring(pos + 1)
      this.onInput(this.text)
      this.onChange(this.text)
    },
    focus () {
      this.editing = true // triggers autofocus
      this.$emit('focus')
    },
    onFocus () {
      this.editing = true
      this.initialText = this.text
    },
    onBlur () {
      this.editing = false

      if (this.initialText != this.text)
        this.onChange(this.text)

      this.$emit('blur')
    },
    onInput (newText) {
      this.text = newText
      this.$emit('input', newText)
    },
    onChange (newText) {
      this.$emit('change', newText)
    },
    onAppendIconClick () {
      if (this.appendAction == 'undo')
        this.onUndo()
      else if (this.appendAction == 'clear')
        this.onClear()
    },
    onClear () {
      this.undoText = this.text
      this.onInput('')
    },
    onUndo () {
      this.onInput(this.undoText)
    },
  }
}
</script>

<style lang="sass">
@import "../styles/markdown.sass"

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

  // to align the rewritten checkboxes; use only within this component
  .markdown-body
    ul li
      i
        margin-right: 8px
        transform: translateY(4px)
</style>
