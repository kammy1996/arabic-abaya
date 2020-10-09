

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      pass: false,
      loginStatus: null,
      userLoginSnackBar: false,
      valid: false,
      genRules: [
        (v) => !!v || "Required",
        (v) =>
          (v && v.length >= 8) ||
          "password must not  be less than 8 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      token: null,
    };
  },

  created() { 
    document.title = this.$route.meta.title;
  },

  methods: {
    async signIn() {
      this.$refs.signIn.validate();
      if (this.valid === true) {
        let userData = {
          email: this.user.email,
          password: this.user.password,
        };
        const res = await this.$axios
          .post(`/user/login`, userData)
          .catch((err) => console.log(err));
        this.token = res.data.token;
        if (res.data.message) {
          this.loginStatus = res.data.message;
          this.userLoginSnackBar = true;
        }

        if (this.token === undefined || this.token === null) return;
        else this.$cookies.set("jwt", this.token, { expires: 7 });

        await this.$store.dispatch("FETCH_LOGGED_IN_INFO", this.token);
        await this.$store.dispatch("FETCH_CART_COUNT");

        setTimeout(() => {
          this.$router.push(`/cart`);
        }, 500);

        //If there is any previous product in Cookies before log in
        let productId = this.getProductsFromCookies();
        if (productId === undefined) return;
        await this.$axios
          .post(
            `/user/cart/add`,
            { productId },
            {
              headers: {
                "Auth-token": this.token,
              },
            }
          )
          .catch((err) => console.log(err))
          .then((res) => res);
        this.$cookies.remove("product");
        await this.$store.dispatch("FETCH_CART_COUNT");
      }
    },
    getProductsFromCookies() {
      let productsInCookies = this.$cookies.get("product");
      if (productsInCookies === undefined) return;
      let splitCookie = productsInCookies.split(";");

      splitCookie.forEach((item) => {
        if (item === "") {
          splitCookie.pop();
        }
      });

      let productId = [];
      splitCookie.forEach((item) => {
        let parsed = JSON.parse(item);
        productId.push(parsed.id);
      });

      return productId;
    },
  },
};
