<template lang="pug">
  #game
    h1 Game
    List(ref="highscore")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import List from "../components/List.vue";

@Component({ components: { List } })
export default class Game extends Vue {

  $refs!: {
    highscore: List
  };

  public get highscore() {
    return this.$refs.highscore
  }

  public mounted() {
    this.highscore.updateEntries([{
      username: "Paul",
      score: 9000
    }, {
      username: "Micha",
      score: 5000
    }, {
      username: "Bernt",
      score: 9042
    }]);
  }
}
</script>

<style lang="sass" scoped>
</style>
