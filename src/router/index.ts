import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from "../views/NotFound.vue";
import LogIn from "@/views/LogIn.vue";
import PersonalHome from "@/views/PersonalHome.vue";
import Register from "@/views/Register.vue";
import LogOut from "@/views/LogOut.vue";
import Demo from "@/views/Demo.vue";
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
    path: '/log_in',
    name: "LogIn",
    component: LogIn
  },
  {
    path: '/personal_home',
    name: 'PersonalHome',
    component: PersonalHome,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/log_out',
    name: 'LogOut',
    component: LogOut,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
  },
  {
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
