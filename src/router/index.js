import Vue from 'vue'
import VueRouter from 'vue-router'
import AppRecipes from '../components/AppRecipes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppRecipes
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
