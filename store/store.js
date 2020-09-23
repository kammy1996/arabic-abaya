import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    visibleProducts: [],
    cartCount: null,
    userToken:null,
  },
  mutations: {
    SET_VISIBLE_PRODUCTS(state, payload) {
      state.visibleProducts = payload;
    },
    SET_CART_COUNT(state, payload) {
      state.cartCount = payload;
    },
    SET_USER_TOKEN(state,payload) { 
      state.userToken = payload
    }
  },
  actions: {
    async FETCH_VISIBLE_PRODUCTS({ commit }, payload) {
      const res = await axios
        .get(`/product/show/${payload.perPage}/${payload.currentPage}`)
        .catch((err) => console.log(err));
      commit("SET_VISIBLE_PRODUCTS", res.data);
    },
    async FETCH_CART_COUNT({ commit }) {
      const res = await axios
        .get("/product/client/cart/count")
        .catch((err) => console.log(err));
      commit("SET_CART_COUNT", res.data[0]["COUNT(id)"]);
    },
    async USER_LOGIN({commit},payload) { 
      const res = await axios
      .post(`/user/login`, payload)
      .catch((err) => console.log(err));
      commit("SET_USER_TOKEN",res.data.token)

    }
  },
  getters: {
    GET_VISIBLE_PRODUCTS(state) {
      return state.visibleProducts;
    },
    GET_CART_COUNT(state) {
      return state.cartCount;
    },
    GET_USER_TOKEN(state){ 
      return state.userToken
    }
  },
});
