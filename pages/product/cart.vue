<template>
  <v-container>
    <div class="text-center">
      <h2>Your Cart</h2>
      <img src="../../assets/images/title-underline.png" />
      <div class="space-30"></div>
    </div>

    <v-form v-model="valid" ref="form">
      <v-row v-if="currentProduct.length > 0">
        <v-col col="8">
          <v-card>
            <v-card-title>Products({{ currentProduct.length }})</v-card-title>
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

                  <v-btn
                    class="ma-2"
                    tile
                    outlined
                    color="red"
                    @click="removeFromCart(index)"
                  >
                    <v-icon left>mdi-close-circle</v-icon> Remove From Cart
                  </v-btn>
                </v-col>
                <v-col cols="8">
                  <v-card-title>
                    {{ product.name }}
                  </v-card-title>
                  <v-select
                    :items="product.stock"
                    :rules="[(v) => !Array.isArray(v) || 'Color is required']"
                    v-model="product.stock"
                    label="Select Color"
                    required
                  ></v-select>
                  <v-select
                    :items="product.quantity"
                    v-model="product.quantity"
                    :rules="[
                      (v) => !Array.isArray(v) || 'Quantity is required',
                    ]"
                    required
                    label="Select Quantity"
                  ></v-select>
                  <v-card-title>&#8377; {{ product.final_price }}</v-card-title>
                </v-col>
                <v-divider
                  class="ma-5"
                  v-if="currentProduct.length > 1"
                ></v-divider>
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
      <v-img v-else src="../../assets/images/empty-cart.jpg"></v-img>
      <div v-if="currentProduct.length > 0" class="my-2 text-right">
        <v-btn color="warning" @click="continueToOrder" large dark
          >CONTINUE <v-icon dark>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </v-form>
  </v-container>
</template>

<script>
import cart from "../../modules/product/cart";

export default cart;
</script>
