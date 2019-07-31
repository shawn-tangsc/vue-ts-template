<template>
  <el-form label-width="40px" class="form-container" autoComplete="on" :model="loginForm"
            ref="loginForm" label-position="left">
    <span class="title">我也不知道什么系统</span>
    <el-form-item prop="username">
      <el-input size="small" name="username" type="text" v-model="loginForm.username"
                autoComplete="on" placeholder="用户名"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                v-model="loginForm.password" autoComplete="on" placeholder="密码"/>
      <span class="show-pwd" @click="showPWD">
        <svg-icon name="eye-off" v-if="pwdType=='password'"/>
        <svg-icon name="eye-on" v-else/>
      </span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ILoginFormType, UserModule } from '@/store/modules/user'
import { IResponse } from '@/utils/request'
import { Form as ElForm, Input } from 'element-ui'
import JsEncrypt from 'jsencrypt/bin/jsencrypt'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vuex'
@Component({
  name: 'LoginForm',
})
export default class LoginForm extends Vue {
  private publicKey = ``

  private pwdType: string = 'password'
  private loading: boolean = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  private loginForm: ILoginFormType = {
    username: '',
    password: '',
  }

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    console.log(route)
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      // this.otherQuery = this.getOtherQuery(query)
    }
  }
  private async handleLogin() {
    const jse = new JsEncrypt()
    jse.setPublicKey(this.publicKey)
    const rsaPassword = jse.encrypt(this.loginForm.password)
    const result: ILoginFormType = {
      username: this.loginForm.username.trim(),
      password: rsaPassword,
    }
    await UserModule.login(result)
    this.$router.push({
      path: '/',
    })
  }
  private showPWD() {
    if (this.pwdType === 'password') {
      this.pwdType = ''
    } else {
      this.pwdType = 'password'
    }
  }
}
</script>

<style scoped lang="scss">
  .form-container {
    width: 380px;
    background-color: #fff;
    padding: 20px 30px 20px 0;
    float: right;
    border-radius: 5px;

    .title {
      font-size: 20px;
      color: #575757;
      font-weight: bold;
      display: block;
      text-align: center;
      margin: 20px 0 20px 20px;
    }

    .el-button {
      background-color: #f9be00;
      border: 1px solid #f9be00;
    }
    .el-form-item {
      position: relative;
    }
    .checkbox {
      text-align: right;
      margin: -20px 0 30px 0;
    }
    .show-pwd {
      position: absolute;
      display: inline-block;
      text-align: right;
      right: 10px;
      top: 5px;
      cursor: pointer;
    }
  }
</style>
