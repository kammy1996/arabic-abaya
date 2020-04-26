<template>
    <v-app>
        <v-content>
            <home />
        </v-content>
    </v-app>
</template>

<script>
import Home from "./components/home";

export default {
    name: "App",

    components: {
        Home
    },

    data: () => ({
        //
    })
};
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,700&display=swap');

html, body {
  font-family: 'Raleway', sans-serif;
}

#app {
  font-family: 'Raleway', sans-serif;
}

</style>
