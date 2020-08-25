<template lang="pug">
  #game
    h1 Game
    List(:entries="gameData.scores")
</template>

<script lang="ts">
  import Vue from "vue";

  export interface Score {
    username: string;
    score: number;
  }

  export interface GameData {
    title: string;
    scores: Score[];
  }

  import Component from "vue-class-component";
  import List from "../components/List.vue";
  import {Prop} from "vue-property-decorator";

  @Component({ components: { List } })
  export default class Game extends Vue {

    @Prop({ default: {} })
    private gameData: GameData;
  }
</script>

<style lang="sass" scoped>
</style>
