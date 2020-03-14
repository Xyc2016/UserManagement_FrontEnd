<template>
  <div>
    {{info}}
    <el-button type="primary" @click="sendRequest">Send request</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
const url = "http://127.0.0.1:8001/get_and_set_cookie";
@Component
export default class Demo extends Vue {
  public info = "Info";
  public sendRequest(): void {
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
      })
      .catch(reason => {
        console.log(reason);
      });
  }
  public created(): void {
    axios.defaults.withCredentials = true;
  }
}
</script>