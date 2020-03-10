<template>
  <div>
    Demo
    <br />
    {{msg}}
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