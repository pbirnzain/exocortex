<template>
  <div class="edit-topic md-layout">
    <v-container>
      <v-card>
        <v-card-text>
          <topic :topic="selectedTopic" @topic-changed="onTopicChanged"/>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="onDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { VCard, VCardText, VCardActions, VBtn, VContainer } from 'vuetify/lib'
import Topic from '../components/Topic'

export default {
  name: 'app',
  components: {
    Topic,
    VCard,
    VCardText,
    VCardActions,
    VBtn,
    VContainer,
  },
  computed: {
    selectedTopic () {
      return this.$store.getters.selectedTopic
    }
  },
  methods: {
    onTopicChanged (topic) {
      this.$store.dispatch('updateTopic', topic)
    },
    onDelete () {
      this.$store.dispatch('deleteTopic', this.selectedTopic)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.edit-topic {
  margin: 16px 0;

  display: flex;
  flex-direction: column;

  .box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
