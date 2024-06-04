import { createRouter, createWebHistory } from 'vue-router';
import HomeBoard from './components/HomeBoard.vue';
import GameBoard from './components/GameBoard.vue';

const routes = [
  {
    path: '/',
    name: 'HomeBoard',
    component: HomeBoard
  },
  {
    path: '/game',
    name: 'GameBoard',
    component: GameBoard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
