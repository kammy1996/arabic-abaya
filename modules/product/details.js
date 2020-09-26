import axios from "axios";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import cookies from "js-cookie";

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
      const product = await axios
        .get(`/product/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProduct = product.data[0];

      const similar = await axios
        .get(`/product/related/${this.currentProduct.category_id}`)
        .catch((err) => console.log(err));
      this.relatedProducts = similar.data;

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

      const stock = await axios
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
      delete this.currentProduct.specification;
      let oldCookie = cookies.get("product");

      //Check if the product already exist in cookie

      if (oldCookie === undefined) {
        cookies.set("product", JSON.stringify(this.currentProduct) + ";");
      } else if (
        oldCookie.includes(this.$route.params.id) &&
        oldCookie.includes(this.currentProduct.name)
      ) {
        return;
      } else {
        cookies.set(
          "product",
          oldCookie.concat(JSON.stringify(this.currentProduct) + ";")
        );
      }
    },
  },
};
