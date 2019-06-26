import Vue from "vue";
import Vuex from "vuex";
import API from "@/api/gitbot";

Vue.use(Vuex);

const toNotify = error => {
  let notify = { message: error.message };
  if (!error.response) {
    notify.level = "error";
  } else {
    notify.message = error.response.statusText;
  }
  return notify;
};

export default new Vuex.Store({
  state: {
    loading: false,
    notification: {
      message: null,
      level: null
    },
    bots: []
  },
  getters: {
    NOTIFICATION: state => state.notification,
    LOADING: state => state.loading,
    BOTS: state => state.bots
  },
  mutations: {
    SET_NOTIFICATION: (state, { message, level = "error" }) => {
      state.notification = { message, level };
    },
    RESET_NOTIFICATION: state => (state.notification = null),
    SET_LOADING: (state, enabled) => (state.loading = enabled),
    SET_BOTS: (state, bots) => (state.bots = bots)
  },
  actions: {
    CREATE_BOT: async ({ commit, dispatch }, payload) => {
      try {
        await API.createBot(payload);
        dispatch("GET_BOTS", { detailed: true });
      } catch (error) {
        commit("SET_NOTIFICATION", toNotify(error));
      }
    },
    GET_BOTS: async ({ commit }, options) => {
      commit("SET_LOADING", true);
      try {
        const { data } = await API.getBots(options);
        commit("SET_BOTS", data.bots);
      } catch (error) {
        commit("SET_NOTIFICATION", toNotify(error));
      } finally {
        commit("SET_LOADING", false);
      }
    }
  }
});
