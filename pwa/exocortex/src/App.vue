<template>
  <div id="app">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <a class="navbar-item navbar-brand" href="/static/app">ExoCortex</a>
      </nav>
    </div>
    <div class="content" >
      <div class="container">
        <div class="box">
          <div v-if="selectedTopic">
            <button @click="onBack">Back</button>
            <topic :topic="selectedTopic" @topic-changed="onTopicChanged"/>
          </div>
          <topic-list v-else title="Topics by Urgency" :topics="topics"
            @topic-selected="onSelect" />
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.box {
  padding: 0.5rem;
  border-radius: 0;
  border-style: solid;
  border-width: 1px;
  border-color: #bbb;
  position: relative;
  margin: 0.5rem 0;

  .ribbon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.25em;
    font-family: monospace;
    background-color: #ccc;
    min-width: 1.5rem;
    text-align: center;
  }
}

p {
  margin-bottom: 0;
}

h1, h3 {
  margin: 0;
}

.content {
  //margin: 1rem;
}
.navbar-brand {
  font-size: 180%;
  font-weight: 700;
}

.navbar-item {
  color: black;
  text-decoration: none;
}
</style>
