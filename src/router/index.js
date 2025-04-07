import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Select from "@/views/Select.vue";
import Result from "@/views/Result.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/select", component: Select },
  { path: "/result", component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
