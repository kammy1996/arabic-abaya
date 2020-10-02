import axios from "axios";

export default {
  name: "Registration",
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        password: "",
        conPassword: "",
      },
      nameRules: [
        (v) => !!v || "Required",
        (v) =>
          (v && v.length >= 8) || "Name must not  be less than 8 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      pwdConfirm: [
        (v) => !!v || "Required",
        (v) => v === this.user.password || "Passwords do not match",
      ],
      pass: false,
      confirmPass: false,
      successMsg: "",
      userAddedSnackBar: false,
      valid: true,
    };
  },
  methods: {
    async addUser() {
      this.$refs.signup.validate();
      if (this.valid == true) {
        let userData = {
          name: this.user.fullName,
          email: this.user.email,
          password: this.user.conPassword,
        };

        const res = await axios
          .post("/user/add", userData)
          .catch((err) => console.log(err));
        this.successMsg = res.data;
        this.userAddedSnackBar = true;

        
        setTimeout(() => {
          this.$router.push('/user/login')
        }, 500);
      }
    },
  },
};
