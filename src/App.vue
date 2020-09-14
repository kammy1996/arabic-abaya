<template>
  <v-app>
    <page-header></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
  </v-app>
</template>

<script>
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,700&display=swap");

html,
body {
  font-family: "Raleway", sans-serif;
}

#app {
  font-family: "Raleway", sans-serif;
}
</style>
