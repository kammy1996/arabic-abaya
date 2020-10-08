export default {
  name: "order",
  data() {
    return {
      currentStep: 1,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      genRule: [(v) => !!v || "Field is required"],
      orderedProduct: [],
      token: null,
      userInfo: [],
      states: [],
      cities: [],
      contact: {
        phone: "",
        address: "",
        pincode: "",
        selectedState: "",
        selectedCity: "",
      },
      isValidated: false,
      existing_address: [],
      isAddNewAddress: false,
      isEditAddress: false,
      selectedAddress: null,
      isDeleteDialog: false,
      isAddressSelected: "",
      isAddressSelectedSnackbar: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.token = this.$cookies.get("jwt");
      if (this.token === undefined || this.token === null) return;

      //Getting user email
      await this.$store.dispatch("FETCH_LOGGED_IN_INFO", this.token);

      this.userInfo = this.$store.getters.GET_USER_INFO[0];
      this.existing_address = this.$store.getters.GET_USER_ADDRESSES;

      this.orderedProduct = this.sortCookie();

      //Getting states and Cities
      const res = await this.$axios
        .get("/user/location")
        .catch((err) => console.log(err));
      this.states = res.data.states;
      this.cities = res.data.cities;
    },
    sortCookie() {
      //If user is not logged in
      let existing_cookies = this.$cookies.get("ordered-products");

      if (existing_cookies === undefined) return;
      else {
        let splitCookie = existing_cookies.split(";");

        splitCookie.forEach((item) => {
          if (item === "") {
            splitCookie.pop();
          }
        });

        let finalCookie = [];

        splitCookie.forEach((item) => {
          let parsed = JSON.parse(item);
          finalCookie.push(parsed);
        });

        return finalCookie;
      }
    },
    fetchCartProductImages(product) {
      return (
        process.env.VUE_APP_HOST_URL +
        "/" +
        product.name +
        "/" +
        product.file_name
      );
    },
    continueToSummary() {
      if (this.selectedAddress === null || this.selectedAddress === undefined) {
        this.isAddressSelectedSnackbar = true;
        this.isAddressSelected = "Please Select an Address";
      } else {
        this.currentStep = 2;
        this.settingUserDetails();
      }
    },
    addAddress() {
      this.selectedAddress = null;
      this.contact = {};
      this.isAddNewAddress = !this.isAddNewAddress;
      this.isEditAddress = false;
    },
    async addNewAddress() {
      if (this.isAddNewAddress === true) {
        this.$refs.delivery.validate();

        if (this.isValidated === true) {
          let userDetails = {
            phone: this.contact.phone,
            address: this.contact.address,
            pincode: this.contact.pincode,
            city: this.contact.selectedCity,
            state: this.contact.selectedState,
          };

          await this.$axios
            .post("/user/user-details", userDetails, {
              headers: {
                "Auth-token": this.token,
              },
            })
            .catch((err) => console.log(err))
            .then((res) => res);
        }
      }
      this.isAddNewAddress = false;
      this.getData();
    },

    editAddress() {
      if (this.selectedAddress === null) return;

      this.isEditAddress = true;
      this.isAddNewAddress = !this.isAddNewAddress;

      this.settingUserDetails();
    },
    async updateAddress() {
      this.$refs.delivery.validate();
      if (this.isValidated === true) {
        let oldAddress = this.existing_address[this.selectedAddress].address;

        let updatedDetails = {
          phone: this.contact.phone,
          address: this.contact.address,
          pincode: this.contact.pincode,
          city: this.contact.selectedCity,
          state: this.contact.selectedState,
        };

        await this.$axios
          .put(`/user/user-details/update/${oldAddress}`, updatedDetails, {
            headers: {
              "Auth-token": this.token,
            },
          })
          .catch((err) => console.log(err))
          .then((res) => res);
        this.isAddNewAddress = false;

        this.getData();
      }
    },
    async deleteAddress() {
      let oldAddress = {
        oldAddress: this.existing_address[this.selectedAddress].address,
      };

      await this.$axios
        .put(`/user/user-details/delete/`, oldAddress, {
          headers: {
            "Auth-token": this.token,
          },
        })
        .catch((err) => console.log(err))
        .then((res) => res);
      this.isAddNewAddress = false;
      this.isDeleteDialog = false;
      this.getData();
    },
    settingUserDetails() {
      let index = this.selectedAddress;
      let fromDB = this.existing_address[index];

      this.contact.phone = fromDB.phone;
      this.contact.address = fromDB.address;
      this.contact.selectedCity = fromDB.city;
      this.contact.pincode = fromDB.pincode;
      this.contact.selectedState = fromDB.state;
    },
  },
  watch: {
    orderedProduct() {
      if (this.orderedProduct.length > 0) {
        this.cartTotal = this.orderedProduct
          .map((item) => item.final_price)
          .reduce((prev, next) => prev + next);
      }
    },
  },
};
