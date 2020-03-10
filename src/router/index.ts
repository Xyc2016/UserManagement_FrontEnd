import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Demo from "../views/Demo.vue"
import NotFound from "../views/NotFound.vue";
import Left from "../views/Left.vue";
import Right from "../views/Right.vue";

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    path: '/demo',
    component: Demo,
    children: [
      { path: 'left', component: Left },
      { path: 'Right', component: Right },
    ]
  }, {
    path: '*',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
