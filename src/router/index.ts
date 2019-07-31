import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: (): any => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: (): any => import('@/views/error-page/404.vue'),
    meta: { hidden: true },
  },
  {
    path: '/401',
    component: (): any => import('@/views/error-page/401.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    component: (): any => import('@/views/Home.vue'),
  },
]

const createRouter = (): any => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition): any => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.VUE_APP_BASE_API,
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7
export function resetRouter(): void {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
  location.reload() // 强制刷新
}

export default router
