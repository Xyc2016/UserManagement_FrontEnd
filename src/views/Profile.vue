<template>
  <div>Profile</div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class Profile extends Vue {
  public created(): void {
    axios.defaults.withCredentials = true;
  }
  public mounted(): void {
    axios
      .get("http://127.0.0.1:8001/user_info")
      .then(value => {
        console.log(value.data);
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
</script>