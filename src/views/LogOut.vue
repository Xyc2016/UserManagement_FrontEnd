<template>
  <div>
    <el-button type="primary" @click="logOut">退出登录</el-button>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LogIn extends Vue {
  public logOut(): void {
    axios
      .get("http://127.0.0.1:8000/log_out")
      .then(value => {
        const data = value.data;
        console.log(data);
        if (data.hasLoggedOut) {
          this.$router.push({
            path: "/log_in"
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }
  public created(): void {
    axios.defaults.withCredentials = true;
  }
  public mounted(): void {
    window.axios = axios;
  }
}
</script>