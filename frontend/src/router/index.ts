import { createMemoryHistory, createRouter } from 'vue-router'
import { useUserStore } from '@store/userStore';

import LoginView from '@/views/login/login.vue'


const routes = [
  { path: '/login', component: LoginView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLogin = userStore.isLoggedIn;

  if (to.path === '/login') {
    // 处理访问/login页面的情况
    if (isLogin) {
      next('/home');
    } else {
      next();
    }
  } else if (!isLogin && to.path !== '/login') {
    // 处理非登录页但未登录的情况
    next('/login');
  } else {
    // 处理已登录且访问非登录页的情况
    next();
  }
});


export default router