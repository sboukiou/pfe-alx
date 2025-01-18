import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TasksApp from '../views/TasksApp.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksApp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
