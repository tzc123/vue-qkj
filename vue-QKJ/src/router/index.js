import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/pages/Home/Home.vue'
import AboutMe from '@/pages/AboutMe/AboutMe.vue'
import MySpace from '@/pages/MySpace/MySpace.vue'
import Discover from '@/pages/Discover/Discover.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/aboutme',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/myspace',
      name: 'MySpace',
      component: MySpace
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
  ]
})
