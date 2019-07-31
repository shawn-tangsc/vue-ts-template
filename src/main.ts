import '@/icons/components'
import Vue from 'vue'
/**
 * svg 相关
 */
import SvgIcon from 'vue-svgicon'

/**
 * element-ui 相关
 */
/**
 * 全家桶
 */
import '@/routerPermission'
import '@/styles/element-variables.scss'
import ElementUI from 'element-ui'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.component('svg-icon', SvgIcon)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
