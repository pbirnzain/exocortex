<template>
  <div id="app">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="{% url 'topic-list' %}">ExoCortex</a>
        </div>
      </nav>
    </div>
    <div class="content" >
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child box">
              <div v-if="selectedTopic">
                <button @click="onBack">Back</button>
                <topic :topic="selectedTopic" @topic-changed="onTopicChanged"/>
              </div>
              <topic-list v-else title="Urgent Topics" :topics="topics"
                @topic-selected="onSelect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopicList from './components/TopicList'
import Topic from './components/Topic'

export default {
  name: 'app',
  components: {
    TopicList,
    Topic
  },
  data () {
    return {
      selectedTopic: undefined
    }
  },
  computed: {
    topics () {
      return this.$store.getters.topics
    }
  },
  mounted () {
    this.$store.dispatch('initialize')
  },
  methods: {
    onSelect (topic) {
      this.selectedTopic = topic
    },
    onBack () {
      this.selectedTopic = undefined;
    },
    onTopicChanged (topic) {
      this.$store.dispatch('updateTopic', topic)
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/bulma.sass";
@import "./bulma-ribbon.sass";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h3 {
  font-size: 130%;
}
.content {
  margin: 1rem;
}
.navbar-brand {
  font-size: 130%;
  font-weight: 700;
}
</style>
