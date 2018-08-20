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
      <h1 class="title">Topic list</h1>
      <div v-for="topic in topics" :key="topic.id" class="box">
        <a href="{% url 'topic-detail' pk=topic.id %}"><h3>{{topic.score.sum}}: {{ topic.title }}</h3></a>
        <p>
          <span v-for="(value, reason, idx) in topic.score.reasons" :key="idx">
            ({{reason}}: {{value}})
          </span>
        </p>
        <p>
          {{ topic.text }}
        </p>
        <!-- <p>
          {% for rel in topic.related.all %}
            <a href="{% url 'topic-detail' pk=rel.id%}">
              <span class="tag is-link">{{rel}}</span>
            </a>
          {% endfor %}
        </p> -->
      </div>
    </div>
  </div>
</div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      topics: 'No topics.'
    }
  },
  mounted () {
    axios.get('/api/topics').then(response => {
      this.topics = response.data
    })
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
