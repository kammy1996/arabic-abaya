<template>
  <v-content>
    <div>
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
          <v-row>
            <v-col cols="12">
              <div class="all-abayas">
                <a href>
                  <p class="cat-title">
                    <span>All Abayas</span>
                  </p>
                </a>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="6" xs="12">
              <div class="casuals">
                <a href>
                  <p class="cat-title">
                    <span>Casuals</span>
                  </p>
                </a>
              </div>
            </v-col>

            <v-col cols="12" lg="4" md="2" sm="6" xs="12">
              <div class="formals">
                <a href>
                  <p class="cat-title">
                    <span>Formals</span>
                  </p>
                </a>
              </div>
            </v-col>

            <v-col cols="12" lg="4" md="4" sm="6" xs="12">
              <div class="occasional">
                <a href>
                  <p class="cat-title">
                    <span>Occasional</span>
                  </p>
                </a>
              </div>
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
            <img
              src="../../assets/images/title-underline.png"
              class="align-center"
              alt
            />
          </div>
          <div class="space-50"></div>
        </div>
      </v-container>
      <div class="space-50"></div>

      <div class="website-features text-center">
        <v-container>
          <div class="space-30"></div>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="2" xs="1">
              <img src="../../assets/images/shipping.png" width="25%" alt />
              <div class="space-30"></div>
              <h4>FREE SHIPPING</h4>
              <p>We Provide free shipping all over India</p>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="2" xs="1">
              <img
                src="../../assets/images/cash-on-delivery.png"
                width="20%"
                alt
              />
              <div class="space-30"></div>
              <h4>CASH ON DELIVERY</h4>
              <p>Cash on delivery available on our portal</p>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="2" xs="1">
              <img src="../../assets/images/security.png" width="20%" alt />
              <div class="space-30"></div>
              <h4>FULLY SECURED</h4>
              <p>Highly Secured Online payment and policies</p>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="2" xs="1">
              <img src="../../assets/images/open-allweek.png" width="20%" alt />
              <div class="space-30"></div>
              <h4>OPENING ALL WEEk</h4>
              <p>WE are open all week from 9:00 am to 10:00 pm</p>
            </v-col>
          </v-row>
          <div class="space-30"></div>
        </v-container>
      </div>
    </div>
  </v-content>
</template>

<script>
export default {
  name: "Home",
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
