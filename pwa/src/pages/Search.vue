<template lang="pug">
</template>

<script>
export default {
  mounted () {
    const searchText = this.$route.query.text
    if (searchText) {
      this.$store.dispatch('search/setSearchText', searchText)
      this.$store.dispatch('search/setFilter', 'open')
    }

    this.$router.push(`/`)
  }
}
</script>

<style lang="css" scoped>
</style>
