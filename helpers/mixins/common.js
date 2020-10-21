export default {
  created() {
    //Setting the page title
    document.title = this.$route.meta.title;
    this.getData();
  },
  methods: {
    fetchProductImages(product) {
      let name = product.name.toLowerCase();
    
      return (
        process.env.VUE_APP_HOST_URL +
        "/" +
        name +
        "/" +
        product.file_name
      );
    },
  },
};
