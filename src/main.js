import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "../router";
import axios from "axios";
import { store } from "../store/store";
// If you use Swiper 6.0.0 or higher

// External libraries
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "bootstrap/dist/css/bootstrap.css";

//custom CSS
import "../assets/scss/home.css";
import "../assets/scss/common.css";

axios.defaults.baseURL = "http://localhost:3000/api";

new Vue({
  el: "#app",
  vuetify,
  router,
  store,
  render: (h) => h(App),
});
