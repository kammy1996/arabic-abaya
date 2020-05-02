<template>
  <div>
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
            <img class="main-logo" src="../assets/main-logo.png" width="70%" />
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
                <a class="nav-link" href="#">All Abayas</a>
              </li>
              <li id="user-icon">
                <a href>
                  <img
                    src="https://img.icons8.com/ios/25/000000/person-female.png"
                  />
                </a>
              </li>
              <li id="bag-icon">
                <a href>
                  <img
                    src="https://img.icons8.com/carbon-copy/35/000000/shopping-bag.png"
                  />
                </a>
              </li>
            </ul>
          </v-col>
        </v-row>
        <!-- Links -->
      </nav>
    </v-container>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <div class="space-50"></div>

    <div class="abaya-cat">
      <v-container>
        <v-row no-gutters>
          <v-col lg="3" md="3" sm="2" xs="1">
            <v-hover>
              <template v-slot:default="{ hover }">
                <div class="all-abayas">
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      opacity="0.1"
                      absolute
                      color="#cd9a2a"
                    >
                      <a href>
                        <h3>All Abayas</h3>
                      </a>
                    </v-overlay>
                  </v-fade-transition>
                </div>
              </template>
            </v-hover>
          </v-col>

          <v-col lg="3" md="3" sm="2" xs="1">
            <v-hover>
              <template v-slot:default="{ hover }">
                <div class="formals">
                  <v-overlay
                    v-if="hover"
                    opacity="0.1"
                    absolute
                    color="#cd9a2a"
                  >
                    <a href>
                      <h3>Casuals</h3>
                    </a>
                  </v-overlay>
                </div>
              </template>
            </v-hover>
          </v-col>

          <v-col lg="3" md="3" sm="3" xs="1">
            <v-hover>
              <template v-slot:default="{ hover }">
                <div class="occasional">
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      opacity="0.1"
                      absolute
                      color="#cd9a2a"
                    >
                      <a href>
                        <h3>Occasional</h3>
                      </a>
                    </v-overlay>
                  </v-fade-transition>
                </div>
              </template>
            </v-hover>
          </v-col>

          <v-col lg="3" md="3" sm="2" Xs="1">
            <v-hover>
              <template v-slot:default="{ hover }">
                <div class="casuals">
                  <v-overlay
                    v-if="hover"
                    opacity="0.1"
                    absolute
                    color="#cd9a2a"
                  >
                    <a href>
                      <h3>Casuals</h3>
                    </a>
                  </v-overlay>
                </div>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="space-50"></div>

    <div class="parallex-area"></div>

    <div class="space-50"></div>

    <v-container>
      <div class="new-arrivals">
        <div class="text-center">
          <h2>New Arrivals</h2>
          <img src="../assets/title-underline.png" alt="" />
        </div>
      </div>
    </v-container>

    <v-container>
      <div class="website-features">
        <v-row>
          <v-col lg="3" md="3" sm="2" xs="1"> </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      overlay: false,
    };
  },
};
</script>
<style></style>
