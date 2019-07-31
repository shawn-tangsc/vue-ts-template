import { GET_USER_INFO, LOGIN } from '@/api/users'
import router, { resetRouter } from '@/router'
import store from '@/store'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface IUserState {
  token: string
  name: string
  roles: string[]
}
export interface ILoginFormType {
  username: string
  password: string
}

// 动态注册
@Module({ store, dynamic: true, name: 'user' })
class User extends VuexModule implements IUserState {
  /**
   * 传统的需要从vuex里面获取的数据，在这里定义成public字段就行了
   */
  public token: string = getToken() || ''
  public name: string = ''
  public roles: string[] = []
  @Action
  public async login(userInfo: ILoginFormType): Promise<any> {
    try {
      const data: any = await LOGIN(userInfo)
      const token = data.data.token
      this.set_toekn(token)
      setToken(token)
    } catch (error) {
      console.error(error)
    }
  }

  @Action
  public async getUserInfo(): Promise<any> {
    try {
      const data: any = await GET_USER_INFO()
      const roles: string[] = data.data.roles
      const name: string = data.data.name
      this.set_roles(roles)
      this.set_name(name)
    } catch (error) {
      console.error(error)
    }
  }
  @Action
  public logout(): void {
    console.log('logOut')
    this.set_toekn('')
    removeToken()
    resetRouter()
    this.set_roles([])
  }
  @Mutation
  private set_toekn(token: string): void {
    this.token = token
  }

  @Mutation
  private set_roles(roles: string[]): void {
    this.roles = roles
  }

  @Mutation
  private set_name(name: string): void {
    this.name = name
  }
}

export const UserModule = getModule(User)
