import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import tables from "../views/tableView.vue";
import match from "../views/matchesView.vue";
import test from "../components/test";
import fixtures from "../components/fixtures";
import carousel from "../components/carousel";
import store from "../store/index.js";
import admin from "../components/admin";
import editg from "../components/editGuesses";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/tables",
    name: "tables",
    component: tables,
  },
  {
    path: "/carousel",
    name: "carousel",
    component: carousel,
  },

  {
    path: "/test",
    name: "test",
    component: test,
    beforeEnter: (to, from, next) => {
      const user = store.state.clientInfo;
      // console.log(user)
      if (user.admin && to.name === "test") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
    beforeEnter: (to, from, next) => {
      const user = store.state.clientInfo;
      // console.log(user)
      if (user.admin && to.name === "admin") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/editg",
    name: "editg",
    component: editg,
    beforeEnter: (to, from, next) => {
      const user = store.state.clientInfo;
      // console.log(user)
      if (user.admin && to.name === "editg") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/fixtures",
    name: "fixtures",
    component: fixtures,
  },
  {
    // path: "/match/:id",
    path: "/match:id",
    name: "match",
    component: match,
  },
  // {
  //   path: "/about/:id",
  //   name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  routes
})

export default router
