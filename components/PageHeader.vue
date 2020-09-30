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
                <a v-if="token === undefined" href="/user/registration">
                  <img
                    v-bind="attrs"
                    v-on="on"
                    src="https://img.icons8.com/ios/25/000000/person-female.png"
                /></a>
                <v-menu v-else open-on-hover offset-y>
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
                      <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <a href=""
                        ><v-list-item-title @click="userLogout"
                          >Log out</v-list-item-title
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
export default {
  name: "pageHeader",
  data() {
    return {
      token: null,
      userInfo: null,
      initials: null,
    };
  },
  created() {
    this.token = this.$cookies.get("jwt");
    this.getData();
  },
  methods: {
    async getData() {
      if (this.token !== undefined) {
        const res = await this.$axios
          .get("/user/profile", {
            headers: {
              "Auth-token": this.token,
            },
          })
          .catch((err) => console.log(err));
        this.userInfo = res.data[0];

        //Getting the Initials
        let name = this.userInfo.full_name;
        let splitName = name.split(" ");
        let firstChar = splitName[0].charAt(0);
        let secondChar = splitName[1].charAt(0);
        let joinedChars = firstChar + secondChar;
        this.initials = joinedChars.toUpperCase();
      }
      await this.$store.dispatch("FETCH_CART_COUNT_NOT_LOGGED_IN");
    },
    userLogout() {
      this.$cookies.remove("jwt");
      this.$router.push("/user/login");
    },
  },
  computed: {
    cartCount() {
      return this.$store.getters.GET_CART_COUNT_NOT_LOGGED_IN;
    },
  },
};
</script>
