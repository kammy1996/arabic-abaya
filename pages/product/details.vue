<template>
  <v-content>
    <div class="space-30"></div>
    <v-container>
      <v-row>
        <v-col lg="5">
          <swiper :options="swiperOption">
            <swiper-slide
              v-for="(image, index) in currentProductImages"
              :key="index"
              ><v-img
                :src="fetchImagesByProductId(currentProduct, image)"
              ></v-img
            ></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
          </swiper>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col lg="6">
          <h3 class="product-title">{{ currentProduct.name }}</h3>
          <p>
            {{ currentProduct.short_description }}
          </p>
          <v-chip class="ma-2" label>
            <v-icon left>mdi-label</v-icon>
            <b>{{ currentCategory }}</b>
          </v-chip>

          <div class="space-20"></div>
          <h3 class="product-price">
            &#8377; {{ currentProduct.final_price }}
          </h3>
          <span class="old-price "> &#8377; {{ currentProduct.price }} </span>
          <v-chip class="ma-2" color="red" text-color="white">
            &#8377; {{ currentProduct.discount }} Off
          </v-chip>

          <hr />
          <v-row>
            <v-col lg="6">
              Available Colors:
              <v-row>
                <v-col lg="4">
                  <div></div>
                  <v-img
                    src="../../assets/images/formals.jpg"
                    width="80%"
                  ></v-img>
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="6">
              Available Length:
              <v-chip-group color="#cd9a2a" column>
                <v-chip>48</v-chip>
                <v-chip>50</v-chip>
                <v-chip>52</v-chip>
                <v-chip>54</v-chip>
                <v-chip>56</v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <div class="space-30"></div>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h5>Size Guide</h5>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
                consequat.</v-expansion-panel-content
              >
            </v-expansion-panel>
          </v-expansion-panels>
          <div class="space-30"></div>
          <v-btn large color="rgba(0,0,0,0.8)" class="ma-2 white--text">
            <v-icon left dark>mdi-cart &nbsp;</v-icon>Add To Cart
          </v-btn>
          <v-btn large color="#cd9a2a" class="ma-2 white--text">
            <v-icon left dark>mdi-play &nbsp;</v-icon>Buy now
          </v-btn>
        </v-col>
      </v-row>

      <div class="space-50"></div>
      <h4>Specifications</h4>
      <v-divider></v-divider>
      <span v-html="currentProduct.specification"></span>
      <div class="space-50"></div>

      <div class="text-center">
        <h4>Related Products</h4>
        <img src="../../assets/images/title-underline.png" />
      </div>
      <div class="space-30"></div>
    </v-container>
  </v-content>
</template>

<script>
import details from "../../modules/product/details";

export default details;
</script>

<style scoped>
.old-price {
  text-decoration: line-through;
}
</style>
