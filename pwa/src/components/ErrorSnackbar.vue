<template lang="pug">
  v-snackbar(:value="errors" :top="true" :right="true" :auto-height="true" color="error" :timeout="0")
    div
      div(v-for="error in errors") {{ error }}
    v-btn(dark flat @click="clearErrors") Close
</template>

<script>
import { VSnackbar } from 'vuetify/lib'

export default {
  components: { VSnackbar },
  data () {
    return {
      showErrors: false
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors
    }
  },
  methods: {
    clearErrors () {
      this.$store.commit('CLEAR_ERRORS')
    }
  }
}
</script>

<style lang="scss">
</style>
