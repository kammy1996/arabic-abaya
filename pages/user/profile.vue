<template>
  <v-container>
    <h1>User Profile</h1>
    <div v-for="(user, index) in users" :key="index">
      <h3>{{ user.full_name }}</h3>
      <h3>{{ user.email }}</h3>
      <h3>{{ user.id }}</h3>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "userProfile",
  data() {
    return {
      users: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const token = this.$store.getters.GET_USER_TOKEN;
      const res = await axios
        .get(`/user/profile`, {
          headers: { "Auth-token": token },
        })
        .catch((err) => console.log(err));
      this.users = res.data;
    },
  },
};
</script>
