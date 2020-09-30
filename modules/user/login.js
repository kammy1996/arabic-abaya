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
    };
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
        let token = res.data.token;

        if (token === undefined) return;
        else this.$cookies.set("jwt", token, { expires: 7 });
      }
    },
  },
};
