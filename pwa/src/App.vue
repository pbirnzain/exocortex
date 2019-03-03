<template lang="pug">
  .app
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
  computed: {
    loading () {
      return this.$store.getters['loading']
    }
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
