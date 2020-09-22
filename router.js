import Vue from "vue";
import Router from "vue-router";

import home from "./pages/product/home";
import explore from "./pages/product/explore";
import details from "./pages/product/details";
import cart from "./pages/product/cart"
import registration from "./pages/user/registration"
import login from "./pages/user/login"

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
      path: "/product/:id",
      name: "Details",
      component: details,
    },
    {
      path:"/cart",
      name:"cart",
      component:cart
    },
    {
      path:'/user/registration',
      name:"Registration",
      component:registration
    },
     { 
       path:"/user/login",
       name:"Login",
       component:login
     }

  ],
});
