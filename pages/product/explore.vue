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
              <v-col lg="4">
                <div class="product-template">
                  <v-card class="mx-auto">
                    <div class="img-hover-zoom">
                      <img
                        src="../../assets/images/formals.jpg"
                        height="400px"
                      />
                    </div>

                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on }">
                        <v-card-title class="Product-title" v-on="on">
                          <a href="details" class="product-title-tooltip"
                            >Cream abayas full title with big title</a
                          >
                        </v-card-title>
                      </template>
                      <span>Cream abayas full title with big title</span>
                    </v-tooltip>

                    <h5 class="product-price">&#8377; 3200/-</h5>

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
export default {
  name: "Explore",
  data: () => ({
    items: ["High to Low", "Low To High"],
  }),
};
</script>

<style></style>
