import fetch , { IResponse } from '@/utils/request'

export const LOGIN = (data: any): any => {
  return fetch({
    data,
    url: '/user/login',
    method: 'post',
  })
}

export const GET_USER_INFO = (): any => {
  return fetch({
    url: '/user/info',
    method: 'get',
  })
}
