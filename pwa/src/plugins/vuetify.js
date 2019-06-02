import Vue from 'vue'
import Vuetify, { VToolbar, VToolbarTitle, VSpacer, VIcon,
  VTextField, VBtn, VProgressCircular, VContainer } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  // eslint object-property-newline: "off"
  components: {
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VTextField,
    VBtn,
    VProgressCircular,
    VContainer
  },
  customProperties: true,
  iconfont: 'md'
})
