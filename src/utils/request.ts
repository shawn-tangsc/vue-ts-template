import router from '@/router'
import { UserModule } from '@/store/modules/user'
import { getToken } from '@/utils/cookies'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import extend from 'node.extend'
const service = axios.create({
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})
export interface IResponse {
  code: string,
  message: string,
  data: any
}

export interface IRequest {
  url: string
  method?: string
  headers?: object
  responseType?: string
  params?: object
  data?: object
  baseURL?: string
}

/**
 * request拦截器
 */
service.interceptors.request.use((config) => {
  if (UserModule.token) {
    config.headers.Authorization = getToken()// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // 如果公司的安全部门有put和delete的安全问题挑战，可以用下面的方式来转换，由后端再来转换后处理
  // if (config.method.toLowerCase() === 'put' || config.method.toLowerCase() === 'delete') {
  //   config.headers['X-HTTP-Method-Override'] = config.method.toLowerCase()
  //   config.method = 'post'
  // }
  return config
}, (error) => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
/**
 * respone拦截器
 */
service.interceptors.response.use(
  (response) => {
    if (response.headers && (response.headers['content-type'] === 'application/zip')) {
      // downloadUrl(response.request.responseURL)
      return response
    } else {
      return response
    }
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (router.currentRoute.fullPath !== '/login') {
          Message.error('验证失败,请重新登录')
          UserModule.logout()
          // store.dispatch('FedLogOut').then(() => {
          //   Message.error('验证失败,请重新登录')
          //   router.replace({
          //     path: '/login',
          //     query: { redirect: router.currentRoute.fullPath },
          //   })
          // })
        } else {
          Message({
            message: '登陆失效',
            type: 'error',
            duration: 5 * 1000,
          })
          return Promise.reject(error)
        }

      } else {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000,
        })
        return Promise.reject(error)
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  },
)

const fetch = (config: IRequest): Promise<any> => {
  const defaultParams: IRequest = {
    url: '',
    method: 'get',
    // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    responseType: 'text',
    params: {
      noCacheTimestamp : new Date().getTime(),
    },
    data: {},
    baseURL: process.env.VUE_APP_BASE_API,
  }
  return new Promise((resolve, reject): void => {
    const target = extend(true, defaultParams, config)
    service(target)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default fetch
