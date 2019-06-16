<template lang="pug">
.settings
  v-toolbar
    router-link(:to="{ name: 'home', params: {}}")
      v-icon(data-e2e="editBack") arrow_back
    v-toolbar-title {{ $t('settings') }}

  v-list(subheader)
    v-subheader {{ $t('thisdevice.header') }}
    v-list-tile(@click="showPrivateTopics = !showPrivateTopics")
      v-list-tile-content
        v-list-tile-title {{ $t('thisdevice.showprivate') }}
      v-list-tile-action
        v-switch(:value="showPrivateTopics")

    v-divider
    v-subheader {{ $t('user') }}
    v-menu
      template(v-slot:activator="{ on }")
        v-list-tile(@click="")
          //- empty click handler to make this a link
          v-list-tile-content(v-on="on")
            v-list-tile-title {{ $t('language') }}
            v-list-tile-sub-title {{ $t('locale.'+$i18n.locale) }}
      v-list
        v-list-tile(v-for="lang in languages" :key="lang" @click="setLocale(lang)")
          v-list-tile-title {{ $t('locale.'+lang) }}

    v-list-tile(disabled)
      v-list-tile-content
        v-list-tile-title {{ $t('changepassword') }}
</template>

<script>
import { VSwitch, VListTileSubTitle } from 'vuetify/lib'
import * as Cookies from 'js-cookie'

export default {
  props: ['chunk'],
  components: {
    VSwitch,
    VListTileSubTitle
  },
  data() {
    return {
      showPrivateTopics: false,
      languages: ['en', 'de']
    }
  },
  watch: {
    showPrivateTopics() {
      Cookies.set('showprivatetopics', this.showPrivateTopics)
    }
  },
  created() {
    this.showPrivateTopics = Cookies.get('showprivatetopics') == 'true'
  },
  methods: {
    setLocale(newLocale) {
      this.$root.$i18n.locale = newLocale
    }
  }
}
</script>

<style lang="sass">
</style>

<i18n lang="yaml">
en:
  settings: 'Settings'
  thisdevice:
    header: 'This device'
    showprivate: 'Show private topics'
  changepassword: 'Change password'
de:
  settings: 'Einstellungen'
  thisdevice:
    header: 'Dieses Endgerät'
    showprivate: 'Private Themen anzeigen'
  changepassword: 'Passwort ändern'
</i18n>
