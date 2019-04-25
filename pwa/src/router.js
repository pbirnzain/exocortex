import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('./pages/New.vue')
    },
    {
      path: '/new/:title',
      name: 'new_title',
      component: () => import('./pages/New.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('./pages/Edit.vue')
    }
  ]
})
