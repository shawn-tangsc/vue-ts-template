// 头顶进度条
import { UserModule } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import router from './router'
// import settings from './setting'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()
  next()

  if (UserModule.token && UserModule.token !== 'undefined') {
    console.log(UserModule.token)
    if (to.path === '/login') {
      console.log(to.path)
      next('/')
    } else {
      await UserModule.getUserInfo()
      if (UserModule.roles.length === 0) {
        const role: string[] = UserModule.roles
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
