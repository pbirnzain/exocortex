<template lang="pug">
  .app
    error-snackbar

    v-app
      v-content
        router-view
</template>

<script>
import { VApp, VContent } from 'vuetify/lib'
import ErrorSnackbar from '@/components/ErrorSnackbar'

export default {
  name: 'app',
  components: {
    VApp,
    VContent,
    ErrorSnackbar
  },
  mounted () {
    this.$store.dispatch('topics/initialize')
  }
}
</script>

<style lang="styl">
html
  overflow: auto
  height: 100%

@media(max-width: 460px)
  .app
    .score-reasons
      font-size: 11px

.mobile-only
  display: none
  @media(max-width: 460px)
    display: inherit

.desktop-only
  @media(max-width: 460px)
    display: none

.v-toolbar a
  text-decoration: none

.app .add-button
  position: fixed
  right: 1em
  bottom: 1em
</style>
