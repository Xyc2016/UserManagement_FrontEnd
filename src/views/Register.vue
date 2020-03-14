<template>
  <div>
    <el-input v-model="username"></el-input>
    <el-input v-model="password"></el-input>
    <el-button type="primary" @click="register">注册</el-button>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LogIn extends Vue {
  public username = "theName";
  public password = "thePassword";
  public register(): void {
    if (this.username?.length < 6 || this.password?.length < 6) {
      this.$message("用户名或密码太短");
      return;
    }
    console.log("?");
    axios
      .post(
        "http://127.0.0.1:8000/register",
        {
          username: this.username,
          password: this.password
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(value => {
        console.log(value);
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