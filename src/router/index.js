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
    path: "/new",
    component: () => import("@/views/NewBookmark.vue"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    meta: {
      componentName: "app-bookmark-list"
    },
    component: () => import("@/views/AccountPage.vue"),
  },
  {
    name: "Likes",
    path: "/likes",
    meta: {
      componentName: "app-bookmark-list"
    },
    component: () => import("@/views/AccountPage.vue"),
  },
  {
    name: "Settings",
    path: "/settings",
    meta: {
      componentName: "user-settings"
    },
    component: () => import("@/views/AccountPage.vue"),
  },
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
});


router.beforeEach((to, from, next) => {
  
  const _isAuthenticated = store.getters._isAuthenticated;

  const authNotRequiredRoutes =  ["LoginPage", "RegisterPage"];
  // eğer kişi authenticated ise logine sayfalarına giremesin
  if(authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

  const authoRequiredRoutes = ["HomePage"];
  if(authoRequiredRoutes.indexOf(to.name)> -1){
    _isAuthenticated ? next() : next({name: "LoginPage"});
  }
  else{
    next();
  }
})

export default router;