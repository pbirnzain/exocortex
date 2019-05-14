<template lang="pug">
  .app(:class="{'dragging': dragging}")
    error-snackbar
    global-loading-indicator

    v-app
      v-content
        router-view
</template>

<script>
import { VApp, VContent } from 'vuetify/lib'
import ErrorSnackbar from '@/components/ErrorSnackbar'
import GlobalLoadingIndicator from '@/components/GlobalLoadingIndicator'

export default {
  name: 'app',
  components: {
    VApp,
    VContent,
    ErrorSnackbar,
    GlobalLoadingIndicator
  },
  data () {
    return {
      dragging: false
    }
  },
  mounted () {
    this.start = () => { this.dragging = true }
    this.end = () => { this.dragging = false }
    window.addEventListener('dragstart', this.start)
    window.addEventListener('dragend', this.end)
    window.addEventListener('drop', this.end) // workaround for bug in chrome <= 71
  },
  beforeDestroy () {
    window.removeEventListener('dragstart', this.start)
    window.removeEventListener('dragend', this.end)
    window.addEventListener('drop', this.end)
  }
}
</script>

<style lang="sass">
@import ./styles/global.sass
</style>
