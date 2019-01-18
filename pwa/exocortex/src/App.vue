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

<style lang="scss">
html {
  height: 100%;
}

@media(max-width: 460px) {
  .app {
    .score-reasons {
      font-size: 11px!important;
    }
    .md-card-header .md-title {
      font-size: 20px;
      line-height: initial;
    }
    .v-toolbar__content > .v-icon {
      display: none;
    }
    .v-toolbar__content .v-input__prepend-outer {
      display: none;
    }
    .v-toolbar__title {
      margin: 0 16px 0 0;
      overflow: unset;
    }
  }
}

.v-toolbar a {
  color: black;
  text-decoration: none;
}

.app, .md-app {
  height: 100vh;
}

.app .md-card-header .md-title {
  padding: 0.25rem 0 0 0.25rem;
}

.app .md-content {
  padding: 0;
  height: auto;
}

.app .add-button {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
