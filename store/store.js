import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "js-cookie";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    visibleProducts: [],
    cartCount: null,
  },
  mutations: {
    SET_VISIBLE_PRODUCTS(state, payload) {
      state.visibleProducts = payload;
    },
    SET_CART_COUNT_NOT_LOGGED_IN(state, payload) {
      state.cartCount = payload;
    },
  },
  actions: {
    async FETCH_VISIBLE_PRODUCTS({ commit }, payload) {
      const res = await axios
        .get(`/product/show/${payload.perPage}/${payload.currentPage}`)
        .catch((err) => console.log(err));
      commit("SET_VISIBLE_PRODUCTS", res.data);
    },
    FETCH_CART_COUNT_NOT_LOGGED_IN({ commit }, payload) {
      let existing_cookie = cookies.get("product");

      if (existing_cookie === undefined) {
        commit("SET_CART_COUNT_NOT_LOGGED_IN", payload);
        return;
      }
      let cookieIntoArr = existing_cookie.split(";");

      cookieIntoArr.forEach((item) => {
        if (item === "") {
          cookieIntoArr.pop();
        }
      });
      commit("SET_CART_COUNT_NOT_LOGGED_IN", cookieIntoArr.length);
    },
  },
  getters: {
    GET_VISIBLE_PRODUCTS(state) {
      return state.visibleProducts;
    },
    GET_CART_COUNT_NOT_LOGGED_IN(state) {
      return state.cartCount;
    },
  },
});
