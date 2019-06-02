<template lang="pug">
  v-progress-linear(v-if="loading" indeterminate :height="2")
</template>

<script>
import axios from 'axios'
import { VProgressLinear } from 'vuetify/lib'

export default {
  components: {
    VProgressLinear
  },
  data () {
    return {
      nRequests: 0,
      requestInterceptor: undefined,
      responseInterceptor: undefined
    }
  },
  computed: {
    loading () {
      return this.nRequests > 0
    }
  },
  created () {
    this.requestInterceptor = axios.interceptors.request.use(config => {
      this.nRequests += 1
      return config
    }, error => {
      this.nRequests -= 1
      return Promise.reject(error)
    })
    this.responseInterceptor = axios.interceptors.response.use(response => {
      this.nRequests -= 1
      return response
    }, error => {
      this.nRequests -= 1
      return Promise.reject(error)
    })
  },
  beforeDestroy () {
    if (this.requestInterceptor)
      axios.interceptors.request.eject(this.requestInterceptor)
    if (this.responseInterceptor)
      axios.interceptors.response.eject(this.responseInterceptor)
  }
}

</script>

<style lang="sass">
.app
  > .v-progress-linear
    margin: 0
    position: fixed
    z-index: 1000
</style>
