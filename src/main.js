import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueRouter from "vue-router";

import router from "./router";

// Font libraries
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//bootstrap 4.1
import "bootstrap/dist/css/bootstrap.css";
import "./scss/animate.css";

//Hover.css
import "./scss/hover.css";

//custom CSS
import "./scss/home.css";
import "./scss/common.css";
import "./scss/all-abayas.css";

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);
Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
