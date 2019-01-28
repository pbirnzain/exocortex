<template lang="pug">
  .home-toolbar

    v-toolbar.mobile-only
      template(v-if="!showSearchInput")
        v-toolbar-title {{ filter }}
        v-spacer
        v-btn(icon @click="showSearchInput = true")
          v-icon search
      template(v-else)
        v-text-field(:value="searchText" @input="onSearchTextChanged"
          ref="search" placeholder="Search")
        v-btn(icon v-if="searchText" @click="onAdd")
          v-icon add
        v-btn(icon @click="onClearSearchText")
          v-icon clear
      v-menu(content-class="filter-menu")
        v-btn(icon @click="showFilters = true" slot="activator")
          v-icon filter_list
        v-list
          v-list-tile(v-for="filter in filters" :key="filter" @click="onFilterChanged(filter)")
            v-list-tile-title(v-text="filter")

    v-toolbar.desktop-only(tabs)
      v-text-field(:value="searchText" @input="onSearchTextChanged" placeholder="Search")
      v-btn(icon v-if="searchText" @click="onAdd")
        v-icon add
      v-btn(icon v-if="searchText" @click="onClearSearchText")
        v-icon clear
      filter-selection.desktop-only(slot="extension" :selection="filter" @selectionChanged="onFilterChanged")
</template>

<script>
import Vue from 'vue'
import { VToolbar, VToolbarTitle, VIcon, VSpacer, VTextField,
  VMenu, VList, VListTile, VListTileTitle, VBtn } from 'vuetify/lib'
import { filters } from '@/store/search/filter.model'
import FilterSelection from '@/components/FilterSelection'

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
    VListTileTitle,
    VBtn,
    FilterSelection
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
  .v-toolbar {
    z-index: 2;
  }
  .v-toolbar__content a > .v-icon:not(first-child) {
    margin-left: 10px;
  }
  .v-tabs__bar {
    background: #f5f5f5;
  }
}

@media(min-width: 461px) {
  .filter-menu {
    display: none;
  }
}

.filter-menu {
 .v-list__tile__title {
   text-transform: capitalize;
 }
}
</style>
