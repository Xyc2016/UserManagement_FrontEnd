<template>
  <div>
    {{info}}
    <div v-if="isSuperUser">
      <div v-for="(username_and_id,index) in allUserNameAndIds" :key="index">
        {{username_and_id}}
        <el-button size="mini" type="primary" @click="deleteTheUser(index)">删除此用户</el-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class PersonalHome extends Vue {
  public created(): void {
    axios.defaults.withCredentials = true;
  }
  public info = "";
  public isSuperUser = false;
  public allUserNameAndIds: { id: number; username: string }[] = [];
  public deleteTheUser(index: number): void {
    const id = this.allUserNameAndIds[index].id;
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
          this.allUserNameAndIds.splice(index, 1);
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
          this.info = `${data.username}已登录`;
          axios
            .get("http://127.0.0.1:8000/all_username_and_ids")
            .then(value => {
              const data = value.data;
              this.allUserNameAndIds = data.allUserNameAndIds;
            })
            .catch(reason => {
              console.log(reason);
            });
        } else {
          this.info = "未登录";
          this.$router.push({
            path: "/log_in"
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
</script>