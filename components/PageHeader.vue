<template>
  <div class="d-none d-lg-block d-md-block">
    <div class="topbar">
      <v-container>
        <v-row>
          <v-col cols="7"></v-col>
          <v-col cols="5">
            <p>
              <v-icon dark>mdi-whatsapp</v-icon>+91 9167201957 |
              &nbsp;&nbsp;&nbsp;&nbsp; <b>Store Timing:</b> 10 am to 9am, All
              days.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container>
      <nav class="navbar navbar-expand-sm">
        <!-- Brand/logo -->
        <v-row>
          <v-col cols="4">
            <a href="/">
              <img
                class="main-logo"
                src="../assets/images/main-logo.png"
                width="70%"
              />
            </a>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="6">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Occasional</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Casual</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Formals</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/explore">All Abayas</a>
              </li>
              <li id="user-icon">
                <v-menu v-if="token === undefined" open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar
                      v-bind="attrs"
                      v-on="on"
                      size="27"
                      class="white--text"
                    >
                      <img
                        src="https://img.icons8.com/ios/25/000000/person-female.png"
                    /></v-avatar>
                  </template>
                  <v-list>
                    <a href="/user/registration">
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon large small color="black">
                            mdi-account-plus
                          </v-icon>
                          &nbsp;&nbsp;&nbsp; Register</v-list-item-title
                        >
                      </v-list-item>
                    </a>

                    <router-link to="/user/login">
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon large small color="black">
                            mdi-login
                          </v-icon>
                          &nbsp;&nbsp;&nbsp;Login</v-list-item-title
                        >
                      </v-list-item>
                    </router-link>
                  </v-list>
                </v-menu>
                <v-menu v-else-if="token !== undefined" open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar
                      v-bind="attrs"
                      v-on="on"
                      color="#CC9726"
                      size="30"
                      class="white--text"
                      ><b>{{ initials }}</b></v-avatar
                    >
                  </template>

                  <v-list>
                    <v-list-item>
                      <a href="/user/profile">
                        <v-list-item-title>
                          <v-icon large small color="black">
                            mdi-account-box
                          </v-icon>
                          &nbsp;&nbsp;&nbsp;Profile</v-list-item-title
                        >
                      </a>
                    </v-list-item>

                    <v-list-item>
                      <a href="#">
                        <v-list-item-title>
                          <v-icon large small color="black">
                            mdi-package
                          </v-icon>
                          &nbsp;&nbsp;&nbsp;My Orders</v-list-item-title
                        >
                      </a>
                    </v-list-item>

                    <v-list-item>
                      <a href="#">
                        <v-list-item-title>
                          <v-icon large small color="black">
                            mdi-cog
                          </v-icon>
                          &nbsp;&nbsp;&nbsp;Settings</v-list-item-title
                        >
                      </a>
                    </v-list-item>

                    <v-list-item>
                      <a href="#"
                        ><v-list-item-title @click="userLogout">
                          <v-icon large small color="black">
                            mdi-logout-variant
                          </v-icon>
                          &nbsp;&nbsp;&nbsp; Log out</v-list-item-title
                        >
                      </a>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </li>
              <li id="bag-icon">
                <a href="/cart">
                  <img
                    src="https://img.icons8.com/carbon-copy/35/000000/shopping-bag.png"
                  />
                </a>
                <v-badge color="pink" v-if="cartCount > 0" :content="cartCount">
                </v-badge>
              </li>
            </ul>
          </v-col>
        </v-row>

        <!-- Links -->
      </nav>
    </v-container>
    <hr style="margin-top:-7px;" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import common from "../helpers/mixins/common";
export default {
  name: "pageHeader",
  data() {
    return {
      token: null,
    };
  },

  methods: {
    async getData() {
      this.token = this.$cookies.get("jwt");
      await this.$store.dispatch("FETCH_CART_COUNT");
      if (this.token === undefined || this.token === null) return;
      //If User is Logged in
      await this.$store.dispatch("FETCH_LOGGED_IN_INFO", this.token);
      await this.$store.dispatch("FETCH_CART_COUNT");
    },
    userLogout() {
      this.$cookies.remove("jwt"); // removing token
      this.$cookies.remove("ordered-products");
      this.getData();
      this.$router.push(`/user/login`);
      this.$router.go();
    },
  },
  computed: {
    ...mapGetters({
      cartCount: "GET_CART_COUNT",
      initials: "GET_LOGGED_IN_INFO",
    }),
  },
  watch: {
    initials() {
      this.getData();
    },
    token() {
      this.getData();
    },
  },
  mixins: [common],
};
</script>
