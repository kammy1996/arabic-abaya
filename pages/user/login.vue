<template>
  <v-container>
    <div class="text-center">
      <h2>Sign In</h2>
      <img width="10%" src="../../assets/images/title-underline.png" />
      <div class="space-30"></div>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-5 text-left">
            <v-card-title>Sign In</v-card-title>
            <v-card-subtitle>
              Please Fill the Required fields to Create an Account
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-form v-model="valid" ref="signIn">
              <v-text-field
                v-model="user.email"
                prepend-icon="mdi-email"
                :rules="emailRules"
                label="Email Address"
                clearable
                required
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                :rules="genRules"
                prepend-icon="mdi-key"
                :append-icon="pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="pass ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                @click:append="pass = !pass"
              ></v-text-field>

              <div class="my-2">
                <v-btn color="warning" @click="signIn" large dark>
                  Sign In</v-btn
                >
                <v-btn color="warning" @click="access" large dark>
                  Access</v-btn
                >
              </div>
              <v-card-text>
                Not a Member <a href="/user/registration">Sign Up</a>
              </v-card-text>
            </v-form>

            <v-snackbar v-model="userLoginSnackBar">
              {{ loginStatus }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-card>
        </v-col>
        <v-col cols="6"
          >\
          <!-- <v-img width="70%" src="../../assets/images/occasional.jpg"></v-img> -->
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import login from "../../modules/user/login";

export default login;
</script>
