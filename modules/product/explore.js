import axios from "axios";

export default {
  name: "Explore",
  data: () => ({
    sortByPrice: ["High to Low", "Low to High"],
    sortIndex: null,
    visibleProducts: [],
    totalProducts: [],
    currentPage: 1,
    perPage: 6,
    overlay: false,
    categories: [],
    searchSelected: null,
    searchProducts: "",
    productsBySearch: [],
    priceRanges: [
      {
        name: "Below Rs.1000",
        min: 0,
        max: 1000,
        selected: false,
      },
      {
        name: "Rs.1000 - Rs.10000",
        min: 1001,
        max: 10000,
        selected: false,
      },
      {
        name: "Rs.10000 - Rs.50000",
        min: 10001,
        max: 50000,
        selected: false,
      },
      {
        name: "Above Rs.50000",
        min: 50001,
        max: 1000000,
        selected: false,
      },
    ],
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      await this.$store.dispatch("FETCH_VISIBLE_PRODUCTS", {
        perPage: this.perPage,
        currentPage: this.currentPage,
      });
      this.visibleProducts = this.$store.getters.GET_VISIBLE_PRODUCTS;

      const allProducts = await axios
        .get(`/product/show`)
        .catch((err) => console.log(err));
      this.totalProducts = allProducts.data;

      const AllCategories = await axios
        .get(`/product/category/show`)
        .catch((err) => console.log(err));
      this.categories = AllCategories.data;

      this.categories.forEach((item) => {
        item.selected = false;
      });
    },
    getImagePath(product) {
      return (
        process.env.VUE_APP_HOST_URL +
        "/" +
        product.name +
        "/" +
        product.file_name
      );
    },
    async fetchProductByCategory(index) {
      this.overlay = true;
      let catIndex = this.categories[index].id;

      if (this.categories[index].selected === true) {
        const res = await axios
          .get(`/product/related/${catIndex}`)
          .catch((err) => console.log(err));
        this.visibleProducts = res.data;
      } else {
        await this.$store.dispatch("FETCH_VISIBLE_PRODUCTS", {
          perPage: this.perPage,
          currentPage: this.currentPage,
        });

        this.visibleProducts = this.$store.getters.GET_VISIBLE_PRODUCTS;
      }

      setTimeout(() => {
        this.overlay = false;
      }, 1000);
    },
    async fetchProductByPrice(index) {
      this.overlay = true;
      let priceIndex = this.priceRanges.indexOf(this.priceRanges[index]);

      if (this.priceRanges[priceIndex].selected === true) {
        let min = this.priceRanges[index].min;
        let max = this.priceRanges[index].max;
        const res = await axios
          .get(`/product/client/price/${min}/${max}`)
          .catch((err) => console.log(err));
        this.visibleProducts = res.data;
        console.log("becomes true");
      } else {
        await this.$store.dispatch("FETCH_VISIBLE_PRODUCTS", {
          perPage: this.perPage,
          currentPage: this.currentPage,
        });

        this.visibleProducts = this.$store.getters.GET_VISIBLE_PRODUCTS;
      }
      setTimeout(() => {
        this.overlay = false;
      }, 1000);
    },
    async fetchProductByPriceSort() {
      let sort = this.sortByPrice.indexOf(this.sortIndex);

      const sortPrice = await axios
        .get(`/product/client/sort/price/${sort}`)
        .catch((err) => console.log(err));
      this.visibleProducts = sortPrice.data;
    },
    async fetchProductsBySearch() {},
  },
  watch: {
    async currentPage() {
      this.overlay = true;

      await this.$store.dispatch("FETCH_VISIBLE_PRODUCTS", {
        perPage: this.perPage,
        currentPage: this.currentPage,
      });
      this.visibleProducts = this.$store.getters.GET_VISIBLE_PRODUCTS;

      setTimeout(() => {
        this.overlay = false;
      }, 1000);
    },
    async searchSelected() {
      const res = await axios(
        `/product/client/search/${this.searchSelected}`
      ).catch((err) => console.log(err));
      // console.log(res.data);
      this.productsBySearch = res.data;

      if (this.searchProducts.name == this.searchSelected) {
        this.$router.push(`/product/${this.searchProducts.id}`);
      }
    },
  },
};
