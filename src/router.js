import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tekstit",
      name: "tekstit",
      component: () => import("./components/TekstiLista")
    },
    {
      path: "/tekstit/:id",
      name: "teksti-detaljit",
      component: () => import("./components/Teksti")
    },
    {
      path: "/lisaa",
      name: "lisaa",
      component: () => import("./components/LisaaTeksti")
    }
  ]
});
