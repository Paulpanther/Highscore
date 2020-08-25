<template lang="pug">
  ol
    ListEntry(
      v-for="(entry, index, key) in entries"
      :username="entry.username"
      :score="entry.score"
      :key="key")
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { sortBy } from "lodash";
  import ListEntry from "./ListEntry.vue";

  export interface Entry {
    username: string;
    score: number;
  }

  @Component({ components: { ListEntry } })
  export default class List extends Vue {
    private entries: Entry[] = [];

    public updateEntries(newEntries: Entry[]) {
      this.entries = sortBy(newEntries, entry => entry.score).reverse()
    }
  }
</script>

<style lang="sass" scoped>

</style>
