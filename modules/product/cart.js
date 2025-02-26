// import axios from "axios";
import common from "../../helpers/mixins/common"

export default {
  name: "cart",
  data() {
    return {
      currentProduct: [],
      currentStock: [],
      cartTotal: null,
      token: null,
      valid: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      //If the user is Logged in
      this.token = this.$cookies.get("jwt");
      if (this.token !== undefined) {
        const product = await this.$axios
          .get("/user/cart/products", {
            headers: {
              "Auth-token": this.token,
            },
          })
          .catch((err) => console.log(err));
        this.currentProduct = product.data.product;
        this.currentStock = product.data.stock;

        this.currentProduct.forEach((item) => {
          item.quantity = "1";
          item.stock = [];
          item.quantities = ["1", "2", "3", "4", "5"];
        });

        this.currentStock.forEach((item) => {
          this.currentProduct.forEach((product) => {
            if (item.product_id == product.id) {
              product.stock.push(item.color);
              product.color = product.stock[0];
            }
          });
        });

        await this.$store.dispatch("FETCH_CART_COUNT");
        return;
      }

      //If user is not Logged in
      if (this.sortCookie() === undefined) return;
      else this.currentProduct = this.sortCookie();

      await this.$store.dispatch("FETCH_CART_COUNT");
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
    async removeFromCart(index) {
      // If user is not Logged IN
      if (this.token === undefined) {
        this.currentProduct.splice(index, 1);
        let newArr = [];
        await this.currentProduct.forEach((item) => {
          newArr.push(JSON.stringify(item));
        });

        let joinArr = newArr.join(";");
        this.$cookies.set("product", joinArr + ";");

        if (this.$cookies.get("product") == ";") {
          this.$cookies.remove("product");
        }
        if (this.sortCookie() === undefined) {
          await this.$store.dispatch("FETCH_CART_COUNT", 0);
          return;
        } else this.currentProduct = this.sortCookie();

        await this.$store.dispatch("FETCH_CART_COUNT");

        return;
      }

      //If the user is Logged in
      if (this.token !== undefined) {
        let removedProductId = this.currentProduct[index].id;

        this.$axios
          .delete(`/user/cart/delete/${removedProductId}`, {
            headers: {
              "Auth-token": this.token,
            },
          })
          .catch((err) => console.log(err));

        this.currentProduct.splice(index, 1);
        await this.$store.dispatch("FETCH_CART_COUNT");
      }
    },
    sortCookie() {
      //If user is not logged in
      let existing_cookies = this.$cookies.get("product");

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

        finalCookie.forEach((item) => {
          item.quantity = "1";
          item.quantities = ["1", "2", "3", "4", "5"];
          item.color = item.stock[0];
        });

        return finalCookie;
      }
    },
    continueToOrder() {
      this.$cookies.remove("ordered-products"); //Removing Existing Cookie
      if (this.$cookies.get("ordered-products") === undefined) {
        let finalArr = [];
        this.currentProduct.forEach((item) => {
          let stringed = JSON.stringify(item) + ";";
          finalArr.push(stringed);
        });
        let cookieString = finalArr.join("");
        this.$cookies.set("ordered-products", cookieString);
      }
      if (this.token === undefined) {
        //if the user is not signed in
        this.$router.push(`/user/login`);
      } else {
        this.$router.push(`/order`);
      }
    },
  },
  watch: {
    currentProduct() {
      if (this.currentProduct.length > 0) {
        this.cartTotal = this.currentProduct
          .map((item) => item.final_price)
          .reduce((prev, next) => prev + next);
      }
    },
  },
  mixins:[common]
};
