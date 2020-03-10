<template>
  <div>
    <!-- Demo
    <br />
    {{msg}}
    Nested routers:
    <router-link to="/demo/left">Left</router-link>|
    <router-link to="/demo/right">Right</router-link>
    <router-view />-->
    ??????
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Demo extends Vue {
  public msg = "";
  public created(): void {
    console.log(this.$route.params);
  }
}
</script>