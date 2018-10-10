<template lang="pug">
  .app
    <md-button v-if="showAddButton" class="add-button md-icon-button md-raised md-accent md-dense md-fab" @click="onNewTopic">
      <md-icon>add</md-icon>
    </md-button>

    md-app
      md-app-toolbar.md-primary
        <router-link class="md-title" :to="{ name: 'home', params: {}}">ExoCortex</router-link>

      md-app-content
        router-view
</template>

<script>
//

export default {
  name: 'app',
  data() {
    return {
      showAddButton: false,
    }
  },
  mounted () {
    this.$store.dispatch('initialize')
    this.$router.afterEach((to, from) => {
      this.showAddButton = this.$router.currentRoute.path === "/"
    })
  },
  methods: {
    onNewTopic () {
      this.$store.dispatch('selectTopic', undefined)
      this.$router.push('/edit')
    }
  }
}
</script>

<style lang="scss">
.app .md-content {
  padding: 0;
}

.app .add-button {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
