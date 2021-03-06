<template lang="pug">
  .home-toolbar

    v-toolbar.mobile-only
      template(v-if="!showSearchInput")
        v-toolbar-title {{ $t('filter.' + filter) }}
        v-spacer
        a(@click="showSearchInput = true")
          v-icon search
      template(v-else)
        v-text-field(:value="searchText" @input="onSearchTextChanged"
          ref="search" :placeholder="$t('search')")
        a(@click="onClearSearchText")
          v-icon clear
      v-menu(content-class="filter-menu")
        a(slot="activator")
          v-icon filter_list
        v-list
          v-list-tile(v-for="filter in filters" :key="filter"
                      @click="onFilterChanged(filter)")
            v-list-tile-title(v-text="$t('filter.' + filter)")

    v-toolbar.desktop-only(tabs)
      v-text-field(:value="searchText" @input="onSearchTextChanged"
                   :placeholder="$t('search')" data-e2e="searchText")
      a(v-if="searchText" @click="onClearSearchText")
        v-icon clear
      filter-selection.desktop-only(slot="extension" :selection="filter"
        @selectionChanged="onFilterChanged")
</template>

<script>
import Vue from 'vue'
import { VMenu, VList, VListTile, VListTileTitle } from 'vuetify/lib'
import { filters } from '@/store/search/filter.model'
import FilterSelection from './FilterSelection'

export default {
  components: {
    VMenu,
    VList,
    VListTile,
    VListTileTitle,
    FilterSelection
  },
  data () {
    return {
      showSearchInput: !!this.$store.state.search.searchText
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
    searchText () {
      if (this.searchText && !this.showSearchInput) {
        this.showSearchInput = true
      }
    },
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
      this.$emit('new-topic', this.searchText)

      this.showSearchInput = false
      this.$store.dispatch('search/setSearchText', '')
    }
  }
}
</script>

<style lang="sass">
@import ../../styles/variables.sass

.home-toolbar
  .v-toolbar__title
    text-transform: capitalize

  .v-toolbar
    z-index: 2

  .v-toolbar__content a > .v-icon:not(first-child)
    margin-left: 10px

  .v-tabs__bar
    background: #f5f5f5

.filter-menu
  display: none

@media(max-width: $breakpoint)
  .filter-menu
    display: inline-block

.filter-menu
 .v-list__tile__title
   text-transform: capitalize
</style>

<i18n>
{
  "en": {
    "search": "Search"
  },
  "de": {
    "search": "Suche"
  }
}
</i18n>
