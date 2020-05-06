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
            <img src="../assets/title-underline.png" class="align-center" alt />
          </div>
          <div class="space-50"></div>

          <carousel :items="4">
            <div class="main-product">
              <img class="product-img" src="../assets/burqa.png" alt />
              <div class="space-20"></div>
              <h4>Cream Pearl Abaya</h4>
              <h4 class="product-price">&#8377; 3200/-</h4>
              <div class="space-10"></div>

              <img class="color-img" src="../assets/colors-avail.png" />
            </div>

            <div class="main-product">
              <img class="product-img" src="../assets/burqa.png" alt />
              <div class="space-20"></div>
              <h4>Cream Pearl Abaya</h4>

              <h4 class="product-price">&#8377; 3200/-</h4>

              <img class="color-img" src="../assets/colors-avail.png" />
            </div>

            <div class="main-product">
              <img class="product-img" src="../assets/burqa.png" alt />
              <div class="space-20"></div>
              <h4>Cream Pearl Abaya</h4>

              <h4 class="product-price">&#8377; 3200/-</h4>

              <img class="color-img" src="../assets/colors-avail.png" />
            </div>

            <div class="main-product">
              <img class="product-img" src="../assets/burqa.png" alt />
              <div class="space-20"></div>
              <h4>Cream Pearl Abaya</h4>

              <h4 class="product-price">&#8377; 3200/-</h4>

              <img class="color-img" src="../assets/colors-avail.png" />
            </div>

            <div class="main-product">
              <img class="product-img" src="../assets/burqa.png" alt />
              <div class="space-20"></div>
              <h4>Cream Pearl Abaya</h4>

              <h4 class="product-price">&#8377; 3200/-</h4>

              <img class="color-img" src="../assets/colors-avail.png" />
            </div>
          </carousel>
        </div>
      </v-container>
      <div class="space-50"></div>

      <div class="website-features text-center">
        <v-container>
          <div class="space-30"></div>
          <v-row>
            <v-col lg="3" md="3" sm="2" xs="1">
              <img src="../assets/shipping.png" width="30%" alt />
              <div class="space-30"></div>
              <h4>FREE SHIPPING</h4>
              <p>We Provide free shipping all over India</p>
            </v-col>
            <v-col lg="3" md="3" sm="2" xs="1">
              <img src="../assets/cash-on-delivery.png" width="25%" alt />
              <div class="space-30"></div>
              <h4>CASH ON DELIVERY</h4>
              <p>Cash on delivery available on our portal</p>
            </v-col>
            <v-col lg="3" md="3" sm="2" xs="1">
              <img src="../assets/security.png" width="25%" alt />
              <div class="space-30"></div>
              <h4>FULLY SECURED</h4>
              <p>Highly Secured Online payment and policies</p>
            </v-col>
            <v-col lg="3" md="3" sm="2" xs="1">
              <img src="../assets/open-allweek.png" width="25%" alt />
              <div class="space-30"></div>
              <h4>OPENING ALL WEEk</h4>
              <p>WE are open all week from 9:00 am to 10:00 pm</p>
            </v-col>
          </v-row>
          <div class="space-30"></div>
        </v-container>
      </div>
      <div class="space-50"></div>
    </div>
  </v-content>
</template>

<script>
import carousel from "vue-owl-carousel";

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
  components: {
    carousel,
  },
};
</script>
<style></style>
