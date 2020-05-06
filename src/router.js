import VueRouter from "vue-router";

import Index from "./pages/index.vue";
import AllAbayas from "./pages/all-abayas.vue";
import Details from "./pages/details.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
    },
    {
      path: "/all-abayas",
      name: "all-abayas",
      component: AllAbayas,
    },
    {
      path: "/details",
      name: "details",
      component: Details,
    },
  ],
});
