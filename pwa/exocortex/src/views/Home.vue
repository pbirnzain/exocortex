<template>
  <div class="home">
    <div class="add-btn" @click="onNew">
      <div>
        +
      </div>
    </div>
    <topic-list title="Topics by Urgency" :topics="urgentTopics"
      @topic-selected="onSelect" />
  </div>
</template>

<script>
// @ is an alias to /src
import TopicList from '@/components/TopicList.vue'

export default {
  name: 'home',
  components: {
    TopicList
  },
  computed: {
    urgentTopics () {
      return this.$store.getters.urgentTopics
    }
  },
  methods: {
    onSelect (topic) {
      this.$store.dispatch('selectTopic', topic)
      this.$router.push('/edit')
    },
    onNew () {
      this.$store.dispatch('selectTopic', undefined)
      this.$router.push('/edit')
    }
  }
}
</script>

<style lang="scss">
.add-btn {
  position: fixed;
  right: 5px;
  bottom: 5px;
  height: 3rem;
  width: 3rem;
  background-color: red;
  border-radius: 300em;
  display: flex;

  div {
    margin: auto;
  }
}
</style>
