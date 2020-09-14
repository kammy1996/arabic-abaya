<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12" lg="3">
          <div class="filters">
            <h4>Categories</h4>
            <hr />
            <v-checkbox hide-details label="All Abayas"></v-checkbox>
            <v-checkbox hide-details label="Occasional"></v-checkbox>
            <v-checkbox hide-details label="Formals"></v-checkbox>
            <v-checkbox hide-details label="Casuals"></v-checkbox>

            <div class="space-50"></div>

            <h4>Price</h4>
            <hr />
            <v-checkbox hide-details label="Below Rs.1000"></v-checkbox>
            <v-checkbox hide-details label="Rs.1000 - 2000"></v-checkbox>
            <v-checkbox hide-details label="Rs.2000 - 4000"></v-checkbox>
            <v-checkbox hide-details label="Above Rs.5000"></v-checkbox>

            <div class="space-50"></div>

            <h4>Colors</h4>
            <hr />
            <v-checkbox hide-details label="Black"></v-checkbox>
            <v-checkbox hide-details label="Brown"></v-checkbox>
            <v-checkbox hide-details label="Purple"></v-checkbox>
            <v-checkbox hide-details label="red"></v-checkbox>
          </div>
        </v-col>

        <v-col cols="12" lg="9">
          <v-row>
            <v-col lg="8">
              <v-combobox
                prepend-icon="search"
                label="Search Abayas..."
              ></v-combobox>
            </v-col>

            <v-col lg="4">
              <v-select
                class="sort-filter"
                :items="items"
                attach
                chips
                label="Sort By Price"
              ></v-select>
            </v-col>
          </v-row>

          <div class="products">
            <v-row>
              <v-col lg="4" v-for="(product, index) in products" :key="index">
                <div class="product-template">
                  <v-card class="mx-auto">
                    <a :href="`product/${product.id}`">
                      <v-img :src="getImagePath(product)"></v-img>
                    </a>

                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on }">
                        <v-card-title class="Product-title" v-on="on">
                          <a
                            :href="`product/${product.id}`"
                            class="product-title-tooltip"
                            >{{ product.name }}</a
                          >
                        </v-card-title>
                      </template>
                      <span>{{ product.name }}</span>
                    </v-tooltip>

                    <h5 class="product-price">
                      &#8377; {{ product.final_price }}
                    </h5>

                    <div class="space-20"></div>
                  </v-card>
                </div>
              </v-col>
            </v-row>
            <div class="space-30"></div>
            <div style="float:right;">
              <v-pagination :length="3"></v-pagination>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import explore from "../../modules/product/explore";

export default explore;
</script>

<style scoped>
.sort-filter {
  margin-top: -7px;
}

/* Custom Image Zoom Effect */
</style>
