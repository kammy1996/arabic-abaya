import axios from "axios";

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
      const product = await axios
        .get("/product/client/cart/fetch")
        .catch((err) => console.log(err));
      this.currentProduct = product.data.product;
      this.currentStock = product.data.stock;
      this.currentProduct.forEach((item) => {
        item.stock = [];
      });

      this.currentStock.forEach((item) => {
        this.currentProduct.forEach((product) => {
          if (item.product_id == product.id) {
            product.stock.push(item.color);
          }
        });
      });

      if (this.currentProduct.length > 0) {
        this.cartTotal = this.currentProduct
          .map((item) => item.final_price)
          .reduce((prev, next) => prev + next);
      }

      this.$store.dispatch("FETCH_CART_COUNT");
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
      let productId = this.currentProduct[index].id;
      await axios
        .delete(`/product/client/cart/delete/${productId}`)
        .catch((err) => console.log(err));
    },
  },
  watch: {
    currentProduct() {
      this.getData();
    },
  },
};
