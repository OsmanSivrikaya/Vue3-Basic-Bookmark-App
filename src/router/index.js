import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store/IndexStore.js'

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    name: "NewBookmarkPage",
    path: "/register",
    component: () => import("@/views/NewBookmark.vue"),
  },
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  const authoRequiredRoutes = ["HomePage"];
  const authNotRequiredRoutes =  ["LoginPage", "RegisterPage"];
  const _isAuthenticated = store.getters._isAuthenticated;

  if(authNotRequiredRoutes.indexOf(to.name) && _isAuthenticated) next(false);
  if(authoRequiredRoutes.indexOf(to.name)> - 1){
    if(_isAuthenticated) next();
    else next({name:"LoginPage"});
  }
  else{
    next();
  }
})

export default router;