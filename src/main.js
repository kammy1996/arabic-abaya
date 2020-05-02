import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueAwesomeSwiper from "vue-awesome-swiper";

// Font libraries
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//bootstrap 4.1
import "bootstrap/dist/css/bootstrap.css";
import "./scss/animate.css";

//Hover.css
import "./scss/hover.css";

//fonts
import "./scss/home.css";
import "./scss/common.css";

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
