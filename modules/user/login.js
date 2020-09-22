import axios from "axios";
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
        let signInData = {
          email: this.user.email,
          password: this.user.password,
        };
        const res = await axios
          .post(`/user/login`, signInData)
          .catch((err) => console.log(err));
        this.loginStatus = res.data;
        this.userLoginSnackBar = true;
      }
    },
    async access() {
      await axios
        .get(`/user/profile`)
        .catch((err) => console.log(err))
        .then((res) => console.log(res));
    },
  },
};
