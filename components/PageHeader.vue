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
                <a href="/user/registration">
                  <img
                    src="https://img.icons8.com/ios/25/000000/person-female.png"
                  />
                </a>
              </li>
              <li id="bag-icon">
                <a href="/cart">
                  <img
                    src="https://img.icons8.com/carbon-copy/35/000000/shopping-bag.png"
                  />
                </a>
                <v-badge
                  color="pink"
                  v-if="this.$store.state.cartCount != 0"
                  :content="this.$store.getters.GET_CART_COUNT"
                >
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
  created() {
    this.$store.dispatch("FETCH_CART_COUNT");
  },
};
</script>
