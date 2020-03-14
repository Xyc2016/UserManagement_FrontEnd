<template>
  <div>
    <el-input v-model="username"></el-input>
    <el-input v-model="password" type="password"></el-input>
    <el-button type="primary" @click="logIn">Log In</el-button>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LogIn extends Vue {
  public username = "";
  public password = "";
  public logIn(): void {
    axios
      .post(
        "http://127.0.0.1:8000/log_in",
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
        const data = value.data;
        console.log(data);
        if (data.hasLoggedIn) {
          this.$router.push({
            name: "PersonalHome"
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
    // window.axios = axios;
  }
}
</script>