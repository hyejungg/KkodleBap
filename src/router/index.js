import { createRouter, createWebHistory } from "vue-router";
import SplashView from "../views/SplashView.vue";
import GameView from "../views/GameView.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "Splash",
      component: SplashView,
    },
    {
      path: "/game",
      name: "Game",
      component: GameView,
    },
  ],
});

export default router;
