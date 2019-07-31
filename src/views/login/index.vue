<template>
  <div class="login-container">
    <div class="content-wrapper">
      <div class="content-container">
        <div class="img-container"></div>
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Form as ElForm, Input } from 'element-ui'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vuex'
import LoginForm from './components/LoginForm.vue'

@Component({
  name: 'Login',
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {
  // public mounted(): void {}
}
</script>

<style scoped lang="scss">
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;

    .dataForm {
      padding: 20px;
    }

    .content-wrapper {
      background-color: #6CC0FF;
      height: 550px;
      display: flex;
      align-items: center;

      .content-container {
        position: relative;
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        justify-content: space-between;

        .img-container {
          overflow: hidden;
          text-align: center;
          vertical-align: middle;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 60%;
            background-size: 100% auto;
            background-repeat: no-repeat;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
