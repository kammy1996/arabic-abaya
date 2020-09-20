<template>
  <v-container>
    <div class="text-center">
      <h2>Your Cart</h2>
      <img src="../../assets/images/title-underline.png" />
      <div class="space-30"></div>
    </div>
    <v-row>
      <v-col col="8">
        <v-card>
          <v-card-title>Products(0)</v-card-title>
          <v-divider></v-divider>
          <div class="product-template">
            <v-row
              class="pl-10 pr-5 "
              v-for="(product, index) in currentProduct"
              :key="index"
            >
              <v-col cols="4">
                <img :src="fetchCartProductImages(product)" width="70%" />
                <div class="space-30"></div>

                <v-btn class="ma-2" tile outlined color="red">
                  <v-icon left>mdi-close-circle</v-icon> Remove From Cart
                </v-btn>
              </v-col>
              <v-col cols="8">
                <v-card-title>
                  {{ product.name }}
                </v-card-title>
                <v-select
                  :items="product.stock"
                  label="Select Color"
                ></v-select>
                <v-select :items="quantity" label="Select Quantity"></v-select>
                <v-card-title>&#8377; {{ product.final_price }}</v-card-title>
              </v-col>
              <v-divider class="ma-5"></v-divider>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Price</v-card-title>
          <v-divider></v-divider>
          <v-row v-for="(product, index) in currentProduct" :key="index">
            <v-col cols="7">
              <v-card-text>{{ product.name }} (x 1)</v-card-text>
            </v-col>
            <v-col cols="5">
              <v-card-text>&#8377; {{ product.final_price }}</v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <v-card-text><b>Total Amount</b></v-card-text>
            </v-col>
            <v-col>
              <v-card-title
                ><b>&#8377; {{ cartTotal }}</b></v-card-title
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cart from "../../modules/product/cart";

export default cart;
</script>
