import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    visibleProducts:[],
  },
  mutations: {
    SET_VISIBLE_PRODUCTS(state,payload){ 
      state.visibleProducts = payload
    }
  },
  actions: {
    async FETCH_VISIBLE_PRODUCTS({commit},payload) { 
      const res = await axios
        .get(`/product/show/${payload.perPage}/${payload.currentPage}`)
        .catch((err) => console.log(err));
      commit('SET_VISIBLE_PRODUCTS', res.data)
    }
  },
  getters: {
    GET_VISIBLE_PRODUCTS(state) { 
      return state.visibleProducts;
    }
  },
});
