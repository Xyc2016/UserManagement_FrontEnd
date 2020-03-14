<template>
  <div>
    {{info}}
    <br />只有管理员可以管理账号
    <div v-if="isSuperUser">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <div v-for="(user_info,index) in userInfos" :key="index">
        <!-- {{username_and_id}} -->
        用户名：{{user_info.username}}
        是否为管理员：{{user_info.isSuperUser ? '是':'否'}}
        <el-button size="mini" type="primary" @click="deleteTheUser(index)">删除此用户</el-button>
      </div>
    </div>
    <br />

    <el-button type="primary" @click="logOut">退出登录</el-button>
  </div>
</template>
 

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
interface UserInfo {
  username: string;
  id: number;
  isSuperUser: boolean;
}
@Component
export default class PersonalHome extends Vue {
  public created(): void {
    axios.defaults.withCredentials = true;
    document.body.style.fontFamily = "Microsoft Yahei";
  }
  public addUser(): void {
    this.$router.push({
      name: "Register"
    });
  }
  public logOut(): void {
    axios
      .get("http://127.0.0.1:8000/log_out")
      .then(value => {
        const data = value.data;
        console.log(data);
        if (data.hasLoggedOut) {
          this.$message("已退出登录，即将跳转到登录页面");
          setTimeout(() => {
            this.$router.push({
              name: "LogIn"
            });
          }, 1600);
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }
  public info = "";
  public isSuperUser = false;
  public userInfos: UserInfo[] = [];
  public deleteTheUser(index: number): void {
    const id = this.userInfos[index].id;
    axios
      .post(
        "http://127.0.0.1:8000/delete_user",
        {
          idOfUserToDelete: id
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(value => {
        const data = value.data;
        if (data.idOfDeletedUser === id) {
          this.userInfos.splice(index, 1);
          this.$message("删除成功");
        } else {
          console.log(data);
          this.$message("删除失败");
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }
  public mounted(): void {
    axios
      .get("http://127.0.0.1:8000/user_info")
      .then(value => {
        const data = value.data;
        if (data.hasLoggedIn) {
          this.isSuperUser = data.isSuperUser;
          this.info = `已登录${data.username}（${
            this.isSuperUser ? "作为" : "非"
          }管理员）`;
          if (this.isSuperUser) {
            axios
              .get("http://127.0.0.1:8000/user_infos")
              .then(value => {
                const data = value.data;
                console.log(data);
                this.userInfos = data.userInfos;
              })
              .catch(reason => {
                console.log(reason);
              });
          }
        } else {
          this.info = "未登录";
          this.$router.push({
            name: "/LogIn"
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
    document.body.style.fontFamily = "Microsoft Yahei";
  }
}
</script>