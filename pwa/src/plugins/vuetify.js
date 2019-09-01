import Vue from 'vue'
import Vuetify, { VToolbar, VToolbarTitle, VSpacer, VIcon,
  VTextField, VBtn, VProgressCircular, VContainer } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

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
  iconfont: 'md',
  theme: {
    inactive: colors.grey.darken1,
    overdue: colors.red,
    complete: colors.green
  }
})
