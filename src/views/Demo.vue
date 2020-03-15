<template>
  <div>
    {{info}}
    <el-button type="primary" @click="getAndLogData">getAndLogData</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
@Component
export default class Demo extends Vue {
  public info = "";
  // public async getResponseAsync(): Promise<string[]> {
  //   //   const ar = new Array(100).fill(axios.get("/") as Promise<{ data: string }>);
  //   //   const o = await Promise.all<string>(ar);
  //   //   return o;
  // }
  public async getData(): Promise<AxiosResponse<any>[]> {
    const ar: Promise<AxiosResponse<any>>[] = [];
    axios.get("http://127.0.0.1:8000/get_data");
    for (let i = 0; i < 50; i++) {
      ar.push(axios.get("http://127.0.0.1:8000/get_data"));
    }
    return await Promise.all<AxiosResponse<any>>(ar);
  }
  public getAndLogData(): void {
    const begin = new Date();
    console.log(begin, begin.getMilliseconds());
    this.getData().then(ar => {
      ar.map(value => {
        console.log(value.data.dateTime);
      });
      const finish = new Date();
      console.log(finish, finish.getMilliseconds());
    });
  }
  public mounted(): void {
    axios.defaults.withCredentials = true;
  }
}
</script>