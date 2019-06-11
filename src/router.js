import Vue from "vue";
import Router from "vue-router";
// import Bots from "@/views/Bots";
import BotGrid from "@/components/bot/BotGrid";
import Frame from "@/views/Frame";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import CreateBotTest from "@/components/bot/CreateBotTest";
import Settings from "@/components/settings/Settings";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
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
      component: Frame,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: "", component: BotGrid },
        {
          path: "/",
          name: "Bots",
          component: BotGrid
        },
        {
          path: "/bot/new",
          name: "BotSettings",
          component: CreateBotTest
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if (!user) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
