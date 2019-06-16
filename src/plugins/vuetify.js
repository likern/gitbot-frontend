import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

const ICONS = {
  close: "times",
  boxClose: "times-square",
  boxMinus: "minus-square",
  boxEmpty: ["far", "square"],
  boxSelected: "check-square",
  supertest: ["far", "square"]
};

Vue.use(Vuetify, {
  iconfont: "faSvg",
  icons: ICONS
});
