<template>
  <v-container>
    <h1>User Profile</h1>
    <div v-for="(man, index) in userInfo" :key="index">
      <h3>{{ man.full_name }}</h3>
      <h3>{{ man.email }}</h3>
      <h3>{{ man.id }}</h3>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import cookies from "js-cookie";
export default {
  name: "userProfile",
  data() {
    return {
      token: null,
      userInfo: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.token = cookies.get("jwt");

      const res = await axios
        .get(`/user/profile`, {
          headers: { "Auth-token": this.token },
        })
        .catch((err) => console.log(err));
      this.userInfo = res.data;
    },
  },
};
</script>
