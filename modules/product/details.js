import axios from "axios";
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
      swiperOption: {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
      currentProduct: [],
      currentCategory: null,
      currentProductImages: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const product = await axios
        .get(`/product/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProduct = product.data[0];

      const category = await axios
        .get(`/product/category/show`)
        .catch((err) => console.log(err));
      let categories = category.data;

      categories.forEach((category) => {
        if (this.currentProduct.category_id == category.id) {
          this.currentCategory = category.name;
        }
      });

      const images = await axios
        .get(`/product/fetch/image/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProductImages = images.data;
    },
    fetchImagesByProductId(product, image) {
      return (
        process.env.VUE_APP_HOST_URL +
        "/" +
        product.name +
        "/" +
        image.file_name
      );
    },
  },
};
