import axios from 'axios'

export default {
  name: "Explore",
  data: () => ({
    items: ["High to Low", "Low To High"],
    products: null,
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await axios.get(`/product/show`)
      .catch((err) => console.log(err))
      this.products = res.data
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
  },
};
