<template>
  <div>
    管理员可以为他人注册账号
    <el-input v-model="username"></el-input>
    <el-input v-model="password" type="password"></el-input>
    <el-button type="primary" @click="register">注册</el-button>
    <el-switch v-model="registerAsSuperUser" active-text="注册为管理员" inactive-text="注册为普通用户"></el-switch>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LogIn extends Vue {
  public username = "";
  public password = "";
  public registerAsSuperUser = false;
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
          password: this.password,
          registerAsSuperUser: this.registerAsSuperUser
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(value => {
        const data = value.data;
        if (data.isUserAdded) {
          this.$message(`成功添加用户：${data.username}`);
        } else if (data.userNameExists) {
          this.$message("用户名已存在");
        }
      });
  }
  public created(): void {
    axios.defaults.withCredentials = true;
  }
  public mounted(): void {
    // window.axios = axios;
    axios
      .get("http://127.0.0.1:8000/user_info")
      .then(value => {
        const data = value.data;
        if (!data.isSuperUser) {
          this.$message("只有管理员可以添加账号，即将跳转...");
          setTimeout(() => {
            this.$router.push({
              name: "PersonalHome"
            });
          }, 3000);
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
</script>