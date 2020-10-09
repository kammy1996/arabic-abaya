<template>
  <v-container>
    <div class="text-center">
      <h2>Complete your Order</h2>
      <img src="../../assets/images/title-underline.png" />
      <div class="space-30"></div>
    </div>
    <div class="space-30"></div>

    <v-stepper v-model="currentStep" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1">
          Delivery
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStep > 2" step="2">
          Order Summary
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStep > 3" step="3">
          Payment
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <p>Existing Addresses</p>
          <v-radio-group v-model="selectedAddress">
            <v-col cols="6">
              <v-radio
                v-for="(address, index) in existing_address"
                :key="index"
                :label="
                  `
              ${address.address},
              ${address.city} - ${address.pincode},
              ${address.state} `
                "
              >
              </v-radio>
            </v-col>
          </v-radio-group>

          <v-col class="shrink">
            <v-btn class="ma-2" color="primary" @click="addAddress">
              Add New Address
            </v-btn>
            <v-btn
              class="ma-2"
              color="primary"
              v-if="selectedAddress != null"
              @click="editAddress"
            >
              Edit Address
            </v-btn>

            <v-expand-transition>
              <v-form
                v-show="isAddNewAddress"
                v-model="isValidated"
                ref="delivery"
              >
                <v-row>
                  <v-col cols="8">
                    <p>Please Enter Your Delivery Address</p>

                    <v-text-field
                      label="Email"
                      outlined
                      prepend-icon="mdi-shield-check"
                      :value="userInfo.email"
                      disabled
                    ></v-text-field>

                    <v-text-field
                      label="Phone"
                      placeholder="Enter Phone "
                      outlined
                      v-model="contact.phone"
                      :rules="genRule"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      placeholder="Enter Complete Address"
                      outlined
                      v-model="contact.address"
                      :rules="genRule"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Pincode"
                      placeholder="Enter Pincode"
                      :rules="genRule"
                      outlined
                      v-model="contact.pincode"
                      required
                    ></v-text-field>
                    <v-select
                      v-model="contact.selectedCity"
                      required
                      :items="cities"
                      item-text="city"
                      menu-props="auto"
                      label="Select City"
                      :rules="genRule"
                      hide-details
                      prepend-icon="mdi-map"
                      single-line
                    ></v-select>
                    <div class="space-20"></div>
                    <v-select
                      v-model="contact.selectedState"
                      :rules="genRule"
                      :items="states"
                      item-text="state"
                      menu-props="auto"
                      label="Select State"
                      hide-details
                      prepend-icon="mdi-map"
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
                <div class="space-30"></div>
                <v-btn
                  color="primary"
                  v-if="isEditAddress === false"
                  @click="addNewAddress"
                >
                  Submit
                </v-btn>

                <v-btn v-if="isEditAddress === true" @click="updateAddress">
                  update
                </v-btn>

                <v-dialog
                  v-if="isEditAddress"
                  v-model="isDeleteDialog"
                  persistent
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="red" dark v-bind="attrs" v-on="on">
                      Delete
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Confirm Delete
                    </v-card-title>
                    <v-card-text
                      >Are you sure you want to Delete this Address
                      ?</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="deleteAddress">
                        OK
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="isDeleteDialog = false"
                      >
                        CANCEL
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-form>
            </v-expand-transition>
          </v-col>

          <div class="space-30"></div>
          <v-snackbar
            color="red"
            :timeout="2000"
            v-model="isAddressSelectedSnackbar"
          >
            {{ isAddressSelected }}
          </v-snackbar>
          <v-btn color="primary" @click="continueToSummary">
            Continue
          </v-btn>

          <router-link to="/cart">
            <v-btn>
              Back
            </v-btn>
          </router-link>
        </v-stepper-content>

        <v-stepper-content step="2">
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
                    <img :src="fetchProductImages(product)" width="70%" />
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
              <p><b>Address:</b> {{ contact.address }}</p>
              <p><b>City:</b> {{ contact.selectedCity }}</p>
              <p><b>State:</b> {{ contact.selectedState }}</p>
              <p><b>pincode:</b> {{ contact.pincode }}</p>
              <p><b>Mobile:</b> +91 {{ contact.phone }}</p>
              <p>
                <b>Email:</b>
                {{ userInfo.email }}
                <v-icon small color="green">mdi-shield-check</v-icon>
              </p>
            </v-col>
          </v-row>

          <div class="space-30"></div>
          <v-btn color="primary" @click="currentStep = 3">
            Continue
          </v-btn>

          <v-btn @click="currentStep = 1">
            Back
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-btn color="primary">
            Continue
          </v-btn>

          <v-btn @click="currentStep = 2">
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

<style>
.color {
  color: red;
}
</style>
