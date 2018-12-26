<template lang="pug">
  .app
    v-btn(v-if="showAddButton" fab fixed bottom right color="red" @click="onNewTopic")
      v-icon add

    v-app
      v-toolbar(app="")
        v-icon all_inbox
        v-icon memory
        v-toolbar-title
          router-link(class="md-title" :to="{ name: 'home', params: {}}") ExoCortex
        v-spacer
        v-text-field(v-if="showAddButton" :value="searchText" @input="onSearchTextChanged"
          placeholder="Search" prepend-icon="search" :clearable="true")
      v-content(app="")
        router-view
</template>

<script>
import { VApp, VToolbar, VToolbarTitle, VContent, VContainer, VBtn, VIcon, VSpacer, VTextField } from 'vuetify/lib'

export default {
  name: 'app',
  components: {
    VApp,
    VToolbar,
    VToolbarTitle,
    VContent,
    VContainer,
    VBtn,
    VIcon,
    VSpacer,
    VTextField
  },
  data () {
    return {
      showAddButton: false
    }
  },
  computed: {
    searchText () {
      return this.$store.state.search.searchText
    }
  },
  mounted () {
    this.$store.dispatch('initialize')
    this.showAddButton = this.$router.currentRoute.path === '/'
    this.$router.afterEach((to, from) => {
      this.showAddButton = this.$router.currentRoute.path === '/'
    })
  },
  methods: {
    onNewTopic () {
      this.$router.push('/new')
    },
    onSearchTextChanged (newSearchText) {
      this.$store.dispatch('setSearchText', newSearchText)
    }
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
    .v-toolbar {
      .v-icon {
        display: none;
      }
      .v-toolbar__title {
        margin-left: 0;
        overflow: unset;
      }
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
