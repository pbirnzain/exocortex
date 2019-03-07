<template lang="pug">
  .app(:class="{'dragging': dragging}")
    error-snackbar
    v-progress-linear(v-if="loading" indeterminate :height="2")

    v-app
      v-content
        router-view
</template>

<script>
import { VApp, VContent, VProgressLinear } from 'vuetify/lib'
import ErrorSnackbar from '@/components/ErrorSnackbar'

export default {
  name: 'app',
  components: {
    VApp,
    VContent,
    VProgressLinear,
    ErrorSnackbar
  },
  data() {
    return {
      dragging: false,
    }
  },
  computed: {
    loading () {
      return this.$store.getters['loading']
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

<style lang="styl">
@import "./styles/global.styl"

.app
  > .v-progress-linear
    margin: 0
    position: fixed
    z-index: 1000
</style>
