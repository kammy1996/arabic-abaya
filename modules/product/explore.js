import axios from "axios";

export default {
  name: "Explore",
  data: () => ({
    items: ["High to Low", "Low To High"],
    visibleProducts: [],
    totalProducts: [],
    currentPage: 1,
    perPage: 6,
    overlay: false,
    categories: [],

  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await axios
        .get(`/product/show/${this.perPage}/${this.currentPage}`)
        .catch((err) => console.log(err));
      this.visibleProducts = res.data;

      const allProducts = await axios
        .get(`/product/show`)
        .catch((err) => console.log(err));
      this.totalProducts = allProducts.data;

      const AllCategories = await axios
        .get(`/product/category/show`)
        .catch((err) => console.log(err));
      this.categories = AllCategories.data;
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
      console.log("fetchProductByCategory -> catIndex", catIndex);

      const res = await axios
        .get(`/product/related/${catIndex}`)
        .catch((err) => console.log(err));
      this.visibleProducts = res.data;

      setTimeout(() => {
        this.overlay = false;
      }, 1000);
    },
  },
  watch: {
    async currentPage() {
      this.overlay = true;

      const res = await axios
        .get(`/product/show/${this.perPage}/${this.currentPage}`)
        .catch((err) => console.log(err));
      this.visibleProducts = res.data;
      setTimeout(() => {
        this.overlay = false;
      }, 1000);
    },
  },
};
