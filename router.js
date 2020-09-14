import Vue from "vue";
import Router from "vue-router";

import home from "./pages/product/home";
import explore from "./pages/product/explore";
import details from "./pages/product/details";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: home,
    },
    {
      path: "/explore",
      name: "Explore",
      component: explore,
    },
    {
      path: "/details",
      name: "Details",
      component: details,
    },
  ],
});
