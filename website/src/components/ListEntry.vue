<template lang="pug">
  li
    span.username {{ username }}
    span.score {{ score }}
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  @Component
  export default class ListEntry extends Vue {

    @Prop({ default: "No Name" })
    private username: string;

    @Prop({ default: 0 })
    private score: number;
  }
</script>

<style lang="sass" scoped>

</style>