<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <router-link class="navbar-item navbar-brand" :to="{ name: 'home', params: {}}">ExoCortex</router-link>
      </div>
    </nav>
    <div class="content">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('initialize')
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

.navbar {
  margin-bottom: 1rem;
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

.container {
  max-width: 960px;
  margin: auto;
}

.box:last-child {
  margin-bottom: 0;
}

p {
  margin: 0.25rem 0;
}
@media (max-width: 480px) {
  body {
    font-size: 80%;
  }

  p {
  margin: 0;
  }
  h1, h3 {
    margin: 0;
  }
}

h1, h3 {
  margin: 0.25rem 0 0 0;
}

h3 {
  font-size: 140%;
}
h1 {
  font-size: 160%;
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
