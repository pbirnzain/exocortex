<template lang="pug">
  v-tabs(:value="selectionIdx" @change="onSelectionChanged" :grow="true")
    v-tab(v-for="filter in filters" :key="filter" :data-e2e="'filter' + filter") {{ filter }}
</template>

<script>
import { VTabs, VTab } from 'vuetify/lib'
import { filters } from '@/store/search/filter.model'

export default {
  props: ['selection'],
  components: {
    VTabs,
    VTab
  },
  computed: {
    selectionIdx () {
      return filters.indexOf(this.selection)
    },
    filters () {
      return filters
    }
  },
  methods: {
    onSelectionChanged (idx) {
      const newSelection = filters[idx]
      this.$emit('selectionChanged', newSelection)
    }
  }
}
</script>
