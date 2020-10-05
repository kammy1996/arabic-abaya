<template>
  <v-container>
    <div class="text-center">
      <h2>Complete your Order</h2>
      <img src="../../assets/images/title-underline.png" />
      <div class="space-30"></div>
    </div>
    <div class="space-30"></div>

    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Verify Your Email
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Delivery
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          Order Summary
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4">
          Payment
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <p>
            Please Enter your Email address to Verify
          </p>
          <v-row class="pl-20">
            <v-col cols="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="OTP"
                label="Enter OTP"
                required
              ></v-text-field>
              <v-btn color="primary">
                Send OTP
              </v-btn>
            </v-col>
          </v-row>
          <div class="space-30"></div>
          <v-btn color="primary" @click="e1 = 2">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <v-col cols="8">
              <p>Please Enter Your Delivery Address</p>
              <v-text-field
                label="Phone"
                placeholder="Enter Mobile Number"
                outlined
              ></v-text-field>
              <v-text-field
                label="Address"
                placeholder="Enter Complete Address"
                outlined
              ></v-text-field>
              <v-text-field
                label="Pincode"
                placeholder="Enter Pincode"
                outlined
              ></v-text-field>
              <v-select
                v-model="selectedState"
                :items="states"
                menu-props="auto"
                label="Select City"
                hide-details
                prepend-icon="mdi-map"
                single-line
              ></v-select>
              <div class="space-20"></div>
              <v-select
                v-model="selectedState"
                :items="states"
                menu-props="auto"
                label="Select State"
                hide-details
                prepend-icon="mdi-map"
                single-line
              ></v-select>
            </v-col>
          </v-row>
          <div class="space-30"></div>
          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>

          <v-btn @click="e1 = 1">
            Back
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row v-if="orderedProduct.length > 0">
            <v-col col="8">
              <v-card-title>Products({{ orderedProduct.length }})</v-card-title>
              <v-divider></v-divider>
              <div class="product-template">
                <v-row
                  class="pl-10 pr-5 "
                  v-for="(product, index) in orderedProduct"
                  :key="index"
                >
                  <v-col cols="4">
                    <img :src="fetchCartProductImages(product)" width="70%" />
                    <div class="space-30"></div>
                  </v-col>
                  <v-col cols="8">
                    <v-card-title>
                      {{ product.name }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <p><b> Color</b>: {{ product.color }}</p>
                    <p><b> Quantity</b>: {{ product.quantity }}</p>

                    <v-card-title
                      >&#8377; {{ product.final_price }}</v-card-title
                    >
                  </v-col>
                  <v-divider
                    class="ma-5"
                    v-if="orderedProduct.length > 1"
                  ></v-divider>
                </v-row>
              </div>
            </v-col>
            <v-col cols="4">
              <v-card-title>Price</v-card-title>
              <v-divider></v-divider>
              <v-row v-for="(product, index) in orderedProduct" :key="index">
                <v-col cols="7">
                  <p>{{ product.name }} (x 1)</p>
                </v-col>
                <v-col cols="5">
                  <p>&#8377; {{ product.final_price }}</p>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  <p><b>Total Amount</b></p>
                </v-col>
                <v-col>
                  <v-card-title
                    ><b>&#8377; {{ cartTotal }}</b></v-card-title
                  >
                </v-col>
              </v-row>
              <div class="space-30"></div>
              <v-card-title>Shipping Address</v-card-title>

              <v-divider></v-divider>
              <p>
                <b>Address:</b> Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
              <p><b>State:</b> Maharashtra</p>
              <p><b>pincode:</b> 400009</p>
              <p><b>Mobile:</b> +91 9167201957</p>
            </v-col>
          </v-row>

          <div class="space-30"></div>
          <v-btn color="primary" @click="e1 = 4">
            Continue
          </v-btn>

          <v-btn @click="e1 = 2">
            Back
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-btn color="primary" @click="e1 = 1">
            Continue
          </v-btn>

          <v-btn @click="e1 = 3">
            Back
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import order from "../../modules/order/order";

export default order;
</script>
