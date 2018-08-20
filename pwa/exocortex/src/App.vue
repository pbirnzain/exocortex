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
              <topic v-if="selectedTopic" :topic="selectedTopic" />
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
import axios from 'axios'
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
      topics: [],
      selectedTopic: undefined
    }
  },
  mounted () {
    axios.get('/api/topics').then(response => {
      this.topics = response.data
      this.topics.sort((a, b) => {
        if (a.score.sum < b.score.sum) {
          return 1
        } else if (a.score.sum > b.score.sum) {
          return -1
        } else {
          return 0
        }
      })
    })
  },
  methods: {
    onSelect (topic) {
      this.selectedTopic = topic
    }
  }
}
</script>

<style>
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
