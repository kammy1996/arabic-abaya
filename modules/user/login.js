import cookies from "js-cookie";

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
      token: "",
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
    };
  },
  methods: {
    async signIn() {
      this.$refs.signIn.validate();
      if (this.valid === true) {
        await this.$store.dispatch("USER_LOGIN", {
          email: this.user.email,
          password: this.user.password,
        });

        this.token = await this.$store.getters.GET_USER_TOKEN;

        if (this.token.length > 10) {
          cookies.set("jwt", this.token, { expires: 7 });
          this.$router.push("/user/profile");
        }
      }
    },
  },
};
