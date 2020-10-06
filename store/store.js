import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "js-cookie";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    visibleProducts: [],
    cartCount: null,
    userInitials: null,
    userInfo: null,
  },
  mutations: {
    SET_VISIBLE_PRODUCTS(state, payload) {
      state.visibleProducts = payload;
    },
    SET_CART_COUNT(state, payload) {
      state.cartCount = payload;
    },
    SET_LOGGED_IN_INFO(state, payload) {
      state.userInitials = payload;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    async FETCH_VISIBLE_PRODUCTS({ commit }, payload) {
      const res = await axios
        .get(`/product/show/${payload.perPage}/${payload.currentPage}`)
        .catch((err) => console.log(err));
      commit("SET_VISIBLE_PRODUCTS", res.data);
    },
    async FETCH_CART_COUNT({ commit }, payload) {
      // If the user is Logged in
      let token = cookies.get("jwt");
      if (token !== undefined) {
        const res = await axios
          .get("/user/cart/products", {
            headers: {
              "Auth-token": token,
            },
          })
          .catch((err) => console.log(err));
        commit("SET_CART_COUNT", res.data.product.length);

        return;
      }
      //If the user is Logged out
      let existing_cookie = cookies.get("product");
      if (existing_cookie === undefined) {
        commit("SET_CART_COUNT", payload);
        return;
      }
      let cookieIntoArr = existing_cookie.split(";");
      cookieIntoArr.forEach((item) => {
        if (item === "") {
          cookieIntoArr.pop();
        }
      });
      commit("SET_CART_COUNT", cookieIntoArr.length);
    },
    async FETCH_LOGGED_IN_INFO({ commit }, payload) {
      const res = await axios
        .get("/user/profile", {
          headers: {
            "Auth-token": payload,
          },
        })
        .catch((err) => console.log(err));
      let userInfo = res.data[0];

      //Getting the Initials
      let name = userInfo.full_name;
      let splitName = name.split(" ");
      let firstChar = splitName[0].charAt(0);
      let secondChar = splitName[1].charAt(0);
      let joinedChars = firstChar + secondChar;
      let initials = joinedChars.toUpperCase();

      commit("SET_LOGGED_IN_INFO", initials);
      commit(`SET_USER_INFO`, userInfo);
    },
  },
  getters: {
    GET_VISIBLE_PRODUCTS(state) {
      return state.visibleProducts;
    },
    GET_CART_COUNT(state) {
      return state.cartCount;
    },
    GET_LOGGED_IN_INFO(state) {
      return state.userInitials;
    },
    GET_USER_INFO(state) {
      return state.userInfo;
    },
  },
});
