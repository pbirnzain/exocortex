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

    .v-btn--icon
      margin: 0

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

.e-content
  position: relative
  padding: 16px

  > *:not(:last-child)
    margin-bottom: 16px

.e-container
  display: flex

  margin: 0 auto
  width: 100%
  max-width: 900px

  &> *
    flex-grow: 1

  &.vertical
    flex-direction: column

  &.fullsize
    flex-grow: 1
</style>
