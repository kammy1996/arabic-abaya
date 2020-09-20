<template>
  <v-content>
    <div class="space-30"></div>
    <v-container>
      <v-row>
        <v-col lg="5">
          <v-carousel hide-delimiters>
            <v-carousel-item
              v-for="(image, index) in imagesByColor"
              :key="index"
            >
              <v-img
                :src="fetchImagesByProductId(currentProduct, image)"
              ></v-img>
            </v-carousel-item>
          </v-carousel>
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
                <v-col
                  lg="4"
                  v-for="(color, index) in currentProductStock"
                  :key="index"
                >
                  <v-tooltip bottom :color="color.color">
                    <template v-slot:activator="{ on }">
                      <v-img
                        style="display:inline-block"
                        v-on="on"
                        @click="showImagesByColor(index)"
                        width="100%"
                        :src="
                          fetchImagesByProductId(currentProduct, color.files[0])
                        "
                      >
                      </v-img>
                    </template>
                    <span>{{ color.color }}</span>
                  </v-tooltip>
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
          <v-btn
            large
            color="rgba(0,0,0,0.8)"
            class="ma-2 white--text"
            @click="addToCart"
          >
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
        <div class="space-30"></div>
        <template>
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide
              v-for="(product, index) in relatedProducts"
              :key="index"
              ><v-card class="mx-auto">
                <a :href="`/product/${product.product_id}`">
                  <v-img
                    :src="fetchImagesByProductId(product, product.file_name)"
                  ></v-img>
                </a>

                <v-tooltip bottom color="black">
                  <template v-slot:activator="{ on }">
                    <v-card-title class="Product-title" v-on="on">
                      <a
                        :href="`/product/${product.product_id}`"
                        class="product-title-tooltip"
                        >{{ product.name }}</a
                      >
                    </v-card-title>
                  </template>
                  <span>{{ product.name }}</span>
                </v-tooltip>

                <h5 class="product-price">&#8377; {{ product.final_price }}</h5>

                <div class="space-20"></div> </v-card
            ></swiper-slide>
            <div
              class="swiper-button-prev swiper-button-black"
              slot="button-prev"
              @click="slidePrev"
            ></div>
            <div
              class="swiper-button-next swiper-button-black"
              slot="button-next"
              @click="slideNext"
            ></div>
          </swiper>
        </template>
        <v-snackbar color="success" v-model="isProductAddedToCart">
          {{ addedToCartMessage }}
        </v-snackbar>

        <v-row>
          <v-col cols="3">
            <div class="product-template"></div>
          </v-col>
        </v-row>

        <div class="swiper-pagination" slot="pagination"></div>
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
