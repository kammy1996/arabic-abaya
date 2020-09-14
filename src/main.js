import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueAwesomeSwiper from "vue-awesome-swiper";
import router from "../router";

// Font libraries
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//bootstrap 4.1
import "bootstrap/dist/css/bootstrap.css";

//custom CSS
import "../assets/scss/home.css";
import "../assets/scss/common.css";
import "../assets/scss/all-abayas.css";
import "../assets/scss/details.css";


Vue.use(VueAwesomeSwiper);

new Vue({
  el:"#app",
  vuetify,
  router,
  render: (h) => h(App),
})
