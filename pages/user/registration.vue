<template>
  <v-container>
    <div class="text-center">
      <h2>Sign up</h2>
      <img width="10%" src="../../assets/images/title-underline.png" />
      <div class="space-30"></div>
      <v-row>
        <v-col cols="6">
          <v-form ref="signup" v-model="valid">
            <v-card class="pa-5 text-left">
              <v-card-title>Create Account</v-card-title>
              <v-card-subtitle>
                Please Fill the Required fields to Create an Account
              </v-card-subtitle>
              <v-divider></v-divider>
              <v-text-field
                :rules="nameRules"
                label="Full Name"
                v-model="user.fullName"
                prepend-icon="mdi-account"
                clearable
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                prepend-icon="mdi-email"
                type="email"
                label="Email Address"
                clearable
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                :rules="nameRules"
                prepend-icon="mdi-key"
                :append-icon="pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="pass ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                @click:append="pass = !pass"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.conPassword"
                :rules="pwdConfirm"
                prepend-icon="mdi-key"
                :append-icon="confirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="confirmPass ? 'text' : 'password'"
                label="Confirm Password"
                hint="At least 8 characters"
                @click:append="confirmPass = !confirmPass"
              ></v-text-field>
              <v-checkbox
                :rules="[(v) => !!v || 'You must agree to continue!']"
              >
                <template v-slot:label>
                  <div>
                    I agree to the
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <a
                          target="_blank"
                          href="http://vuetifyjs.com"
                          @click.stop
                          v-on="on"
                        >
                          Terms & Conditions
                        </a>
                      </template>
                      Opens in new window
                    </v-tooltip>
                    of Arabic Abaya
                  </div>
                </template>
              </v-checkbox>
              <div class="my-2">
                <v-btn color="warning" large dark @click="addUser">
                  Sign up</v-btn
                >
              </div>

              <v-card-text>
                Already a Member <a href="/user/login">Log in</a>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
        <v-col cols="6"
          >\
          <!-- <v-img width="70%" src="../../assets/images/occasional.jpg"></v-img> -->
        </v-col>
        <v-snackbar v-model="userAddedSnackBar">
          {{ successMsg }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import registration from "../../modules/user/registration";

export default registration;
</script>
