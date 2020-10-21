import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "../router";
import axios from "axios";
import cookies from "js-cookie";
import { store } from "../store/store";

// External libraries
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "bootstrap/dist/css/bootstrap.css";

//custom CSS
import "../assets/scss/home.css";
import "../assets/scss/common.css";

axios.defaults.baseURL = process.env.VUE_APP_HOST_URL + '/api';

//Global Variables to use (Please Note : Does not work in store)
Vue.prototype.$axios = axios;
Vue.prototype.$cookies = cookies;

new Vue({
  el: "#app",
  vuetify,
  router, 
  store,
  render: (h) => h(App),
});
