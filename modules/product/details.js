import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  name: "Details",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      currentProduct: [],
      currentCategory: null,
      currentProductImages: [],
      currentProductStock: [],
      imagesByColor: null,
      relatedProducts: [],
      isProductAddedToCart: false,
      addedToCartMessage: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const product = await this.$axios
        .get(`/product/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProduct = product.data[0];

      const similar = await this.$axios
        .get(`/product/related/${this.currentProduct.category_id}`)
        .catch((err) => console.log(err));
      this.relatedProducts = similar.data;

      const category = await this.$axios
        .get(`/product/category/show`)
        .catch((err) => console.log(err));
      let categories = category.data;

      categories.forEach((category) => {
        if (this.currentProduct.category_id == category.id) {
          this.currentCategory = category.name;
        }
      });

      const images = await this.$axios
        .get(`/product/fetch/image/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProductImages = images.data;

      const stock = await this.$axios
        .get(`/product/fetch/stock/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProductStock = stock.data;

      this.assignData();
    },
    assignData() {
      this.currentProductStock.forEach((item) => {
        item.files = [];
      });

      this.currentProductImages.forEach((file) => {
        this.currentProductStock.forEach((stock) => {
          if (file.stock_id == stock.id) {
            stock.files.push(file.file_name);
          }
        });
      });

      if (this.imagesByColor === null) {
        this.imagesByColor = this.currentProductStock[0].files;
      }
    },
    showImagesByColor(index) {
      this.imagesByColor = this.currentProductStock[index].files;
    },
    fetchImagesByProductId(product, image) {
      return process.env.VUE_APP_HOST_URL + "/" + product.name + "/" + image;
    },
    slideNext() {
      this.$refs.mySwiper.$swiper.slideNext();
    },
    slidePrev() {
      this.$refs.mySwiper.$swiper.slidePrev();
    },
    async addToCart() {
      let token = this.$cookies.get("jwt");

      //If user is not Logged in
      if (this.$cookies.get("jwt") === undefined) {
        delete this.currentProduct.specification;

        this.currentProduct.stock = [];
        this.currentProductStock.forEach((item) => {
          this.currentProduct.stock.push(item.color);
        });

        let oldCookie = this.$cookies.get("product");

        if (oldCookie === undefined) {
          this.$cookies.set(
            "product",
            JSON.stringify(this.currentProduct) + ";"
          );
        } else if (
          oldCookie.includes(this.$route.params.id) &&
          oldCookie.includes(this.currentProduct.name)
        ) {
          return;
        } else {
          this.$cookies.set(
            "product",
            oldCookie.concat(JSON.stringify(this.currentProduct) + ";")
          );
        }
        await this.$store.dispatch("FETCH_CART_COUNT");

        return;
      }

      //If user is logged in
      let productId = this.$route.params.id;
      const res = await this.$axios
        .post(
          `/user/cart/add`,
          { productId },
          {
            headers: {
              "Auth-token": token,
            },
          }
        )
        .catch((err) => console.log(err));
      console.log(res.data);
      await this.$store.dispatch("FETCH_CART_COUNT");
    },
  },
};
