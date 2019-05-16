import Vue from "vue";
import Router from "vue-router";
import Bots from "@/views/Bots";
import Frame from "@/views/Frame";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import Settings from "@/components/settings/Settings";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "",
      name: "Frame",
      component: Frame,
      children: [
        {
          path: "/",
          name: "Bots",
          component: Bots
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings
        },
        {
          path: "/about",
          name: "About",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
        }
      ]
    }
  ]
});
