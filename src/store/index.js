import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    logout() {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }
});
