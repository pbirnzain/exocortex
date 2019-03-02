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
@import "./styles/variables.styl"

html
  overflow: auto
  height: 100%

.app
  overflow-wrap: break-word
  word-break: break-word

  > .v-progress-linear
    margin: 0
    position: fixed
    z-index: 1000

@media(max-width: breakpoint)
  .app .v-btn--icon
    margin: 0

.mobile-only
  display: none
  @media(max-width: breakpoint)
    display: inherit

.desktop-only
  @media(max-width: breakpoint)
    display: none

.v-toolbar a
  text-decoration: none

.app .add-button
  position: fixed
  right: 1em
  bottom: 1em

.e-content
  position: relative
  padding: 16px

  > *:not(:last-child)
    margin-bottom: 16px

.e-container
  display: flex

  margin: 0 auto

  &> *
    flex-grow: 1

  &.vertical
    flex-direction: column

  &.fullsize
    flex-grow: 1
</style>
