<template lang="pug">
  v-toolbar.home-toolbar
    template(v-if="!showSearchInput")
      v-toolbar-title {{ filter }}
      v-spacer
      a(@click="showSearchInput = true")
        v-icon search
    template(v-else)
      v-text-field(:value="searchText" @input="onSearchTextChanged"
        ref="search" placeholder="Search")
      a(v-if="searchText" @click="onAdd")
        v-icon add
      a(@click="onClearSearchText")
        v-icon clear
    v-menu
      a(@click="showFilters = true" slot="activator")
        v-icon filter_list
      v-list
        v-list-tile(v-for="filter in filters" :key="filter" @click="onFilterChanged(filter)")
          v-list-tile-title.filter-tile(v-text="filter")
</template>

<script>
import Vue from 'vue'
import { VToolbar, VToolbarTitle, VIcon, VSpacer, VTextField,
  VMenu, VList, VListTile, VListTileTitle } from 'vuetify/lib'
import { filters } from '@/store/search/filter.model'

export default {
  components: {
    VToolbar,
    VToolbarTitle,
    VIcon,
    VSpacer,
    VTextField,
    VMenu,
    VList,
    VListTile,
    VListTileTitle
  },
  data () {
    return {
      showSearchInput: !!this.$store.state.search.searchText,
      showFilters: false
    }
  },
  computed: {
    filter () {
      return this.$store.state.search.filter
    },
    filters () {
      return filters
    },
    searchText () {
      return this.$store.state.search.searchText
    }
  },
  watch: {
    showSearchInput (flag) {
      if (flag) {
        Vue.nextTick(() => {
          this.$refs.search.focus()
        })
      }
    }
  },
  methods: {
    onFilterChanged (filter) {
      this.$store.dispatch('search/setFilter', filter)
    },
    onSearchTextChanged (newSearchText) {
      this.$store.dispatch('search/setSearchText', newSearchText)
    },
    onClearSearchText () {
      this.showSearchInput = false
      this.$store.dispatch('search/setSearchText', '')
    },
    onAdd () {
      this.showSearchInput = false
      const topic = { title: this.searchText, pinned: true }
      this.$store.dispatch('topics/upsertTopic', topic)
      this.$store.dispatch('search/setSearchText', '')
    }
  }
}
</script>

<style lang="scss">
.home-toolbar {
  .v-toolbar__title {
    text-transform: capitalize;
  }
  &.v-toolbar {
    z-index: 2;
  }
  .v-toolbar__content a > .v-icon:not(first-child) {
    margin-left: 10px;
  }
}
.filter-tile {
  text-transform: capitalize;
}
</style>
