export default {
  created() {
    //Setting the page title
    document.title = this.$route.meta.title;
    this.getData();
  },
  methods: {
    fetchProductImages(product) {
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
