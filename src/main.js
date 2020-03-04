// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

require('dotenv').config()

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

const LOGIN_TOKEN = "X-G5L-Token";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

//Configure apollo privider
Vue.use(VueRouter);

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = window.localStorage.getItem(LOGIN_TOKEN);
  if (authRequired && !loggedIn) {
    window.localStorage.removeItem(LOGIN_TOKEN);
    return next({ path: "/login", query: { returnUrl: to.path } });
  }
  next();
});

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
