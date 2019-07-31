<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <el-button type="primary" style="width:100%"  @click.native.prevent="handleLogout">登出</el-button>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { UserModule } from '@/store/modules/user'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  private async handleLogout() {
    await UserModule.logout()
  }
}
</script>
