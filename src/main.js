import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GIconTest from "@/components/GIcon/GIconTest";
import "./registerServiceWorker";
import firebase from "firebase";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import Tailwind CSS
import "@/assets/css/tailwind.css";

// Add Font Awesome Pro version
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";

library.add(far, fal, fas);
Vue.component("g-icon", FontAwesomeIcon);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("g-icon-test", GIconTest);

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
