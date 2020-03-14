<template>
  <div>{{info}}</div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class Demo extends Vue {
  public info = "";
  public async getResponseAsync(): Promise<string[]> {
    const ar = new Array(100).fill(axios.get("/") as Promise<{ data: string }>);
    const o = await Promise.all<string>(ar);
    return o;
  }
  public mounted(): void {
    axios.defaults.withCredentials = true;
    this.getResponseAsync().then(value => {
      console.log(value);
    });
  }
}
</script>