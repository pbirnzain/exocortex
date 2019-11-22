import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home/Home.vue'
import Search from './pages/Search.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
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
      component: () => import('./pages/edit/Edit.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./pages/settings/Settings.vue')
    }
  ]
})
