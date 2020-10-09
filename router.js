import Vue from "vue";
import router from "vue-router";

import home from "./pages/product/home";
import explore from "./pages/product/explore";
import details from "./pages/product/details";
import cart from "./pages/product/cart"
import registration from "./pages/user/registration"
import login from "./pages/user/login"
import profile from "./pages/user/profile"
import order from "./pages/order/order"

Vue.use(router);

export default new router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: "/explore",
      name: "Explore",
      component: explore,
      meta: {
        title: 'Explore Products',
      },
    },
    {
      path: "/product/:id",
      name: "Details",
      component: details,
      meta: {
        title: 'Product Details',
      },
    },
    {
      path:"/cart",
      name:"cart",
      component:cart,
      meta: {
        title: 'Your Cart',
      },
    },
    {
      path:'/user/registration',
      name:"Registration",
      component:registration,
      meta: {
        title: 'Sign up',
      },
    },
     { 
       path:"/user/login",
       name:"Login",
       component:login,
       meta: {
        title: 'Sign In',
      },
     },
     {
       path :"/user/profile",
       name:"userProfile",
       component:profile,
       meta: {
        title: 'Profile',
      },
     },
     {
     path:"/order",
     name:"order",
     component:order,
     meta: {
      title: 'Order Checkout',
    },
    }
  ],
});



