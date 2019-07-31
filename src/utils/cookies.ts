import Cookies from 'js-cookie'

/**
 * token 相关
 */
const TOKEN_KEY = 'ts_adming_access_token'
export const getToken = (): string => Cookies.get(TOKEN_KEY) || ''
export const setToken = (token: string): void => Cookies.set(TOKEN_KEY, token)
export const removeToken = (): void => Cookies.remove(TOKEN_KEY)
