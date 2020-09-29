// import axios from "axios";
import cookies from "js-cookie";

export default {
  name: "cart",
  data() {
    return {
      currentProduct: [],
      currentStock: [],
      quantity: ["1", "2", "3", "4", "5"],
      cartTotal: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // const product = await axios
      //   .get("/product/client/cart/fetch")
      //   .catch((err) => console.log(err));
      // this.currentProduct = product.data.product;
      // this.currentStock = product.data.stock;
      // this.currentProduct.forEach((item) => {
      //   item.stock = [];
      // });
      // this.currentStock.forEach((item) => {
      //   this.currentProduct.forEach((product) => {
      //     if (item.product_id == product.id) {
      //       product.stock.push(item.color);
      //     }
      //   });
      // });
      // if (this.currentProduct.length > 0) {
      //   this.cartTotal = this.currentProduct
      //     .map((item) => item.final_price)
      //     .reduce((prev, next) => prev + next);
      // }
      // this.$store.dispatch("FETCH_CART_COUNT");

      //If user is not Logged in
      if (this.sortCookie() === undefined) return;
      else this.currentProduct = this.sortCookie();

      await this.$store.dispatch("FETCH_CART_COUNT_NOT_LOGGED_IN");

      if (this.currentProduct.length > 0) {
        this.cartTotal = this.currentProduct
          .map((item) => item.final_price)
          .reduce((prev, next) => prev + next);
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
    async removeFromCart(index) {
      // If user is not Logged IN
      this.currentProduct.splice(index, 1);
      let newArr = [];
      await this.currentProduct.forEach((item) => {
        newArr.push(JSON.stringify(item));
      });

      let joinArr = newArr.join(";");
      cookies.set("product", joinArr + ";");

      if (cookies.get("product") == ";") {
        cookies.remove("product");
      }

      if (this.sortCookie() === undefined) {
        await this.$store.dispatch("FETCH_CART_COUNT_NOT_LOGGED_IN", 0);
        return;
      } else this.currentProduct = this.sortCookie();

      await this.$store.dispatch("FETCH_CART_COUNT_NOT_LOGGED_IN");
    },
    sortCookie() {
      //If user is not logged in
      let existing_cookies = cookies.get("product");

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
  },
  watch: {
    currentProduct() {
      this.getData();
    },
  },
};
