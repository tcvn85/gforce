import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const base = "/";

export default new Router({
  mode: "history",
  base,
  routes: [
    {
      path: "/",
      name: "BookList",
      //meta: { layout: "default" },
      component: require("@/pages/BookList.vue").default
    },
    {
      path: "/book/:id",
      name: "BookDetail",
      component: () => import("@/pages/BookDetail.vue")
    },
    {
      path: "*",
      name: "404*",
      component: require("@/pages/404.vue").default 
    }
  ]
});