<template lang="pug">
  ol.scores
    ListEntry(
      v-for="(entry, index, key) in entries"
      :username="entry.username"
      :score="entry.score"
      :key="key")
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ListEntry from "./ListEntry.vue";
  import {Score} from "../pages/Game.vue";
  import {Prop} from "vue-property-decorator";

  @Component({ components: { ListEntry } })
  export default class List extends Vue {

    @Prop({ default: [] })
    private entries: Score[];
  }
</script>

<style lang="sass" scoped>

</style>
