import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import firebase from "firebase";

Vue.config.productionTip = false;

let app = null;
console.log(`call main.js, app: [${app}]`);

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    console.log("Init app");
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
