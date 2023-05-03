<template>
  <div>
    <p class="blue">hello testttt</p>
    <button v-on:click="log">{{ msg }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() public msg!: string;

  log(): void{
    console.log(this.msg);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blue {
    background-color: aqua;
  }
</style>
