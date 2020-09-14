<template>
  <v-content>
    <div class="space-30"></div>
    <v-container>
      <v-row>
        <v-col lg="6">
          <img src="../../assets/images/formals.jpg" width="80%" />
        </v-col>
        <v-col lg="6">
          <h3 class="product-title">Cream abayas full title</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled
          </p>
          <h3 class="product-price">Rs.4500/-</h3>
          <hr />
          <v-row>
            <v-col lg="6">
              Available Colors:
              <v-row>
                <v-col lg="4">
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
export default {
  name: "Details",
};
</script>
