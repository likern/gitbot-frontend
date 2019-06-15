import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import "@fortawesome/fontawesome-pro/css/all.css";

const ICONS = {
  close: "fal fa-times",
  "box-close": "fas fa-times-square",
  "box-minus": "fas fa-minus-square",
  "box-empty": "far fa-square",
  "box-selected": "fas fa-check-square"
};

Vue.use(Vuetify, {
  iconfont: "fa",
  icons: ICONS
});
