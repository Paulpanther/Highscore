<template lang="pug">
  .game
    .header
      span.highscore Highscore
      span.title {{ gameData.game }}
    List(:entries="gameData.scores")
</template>

<script lang="ts">
  import Vue from "vue";

  export interface Score {
    player: string;
    score: number;
  }

  export interface GameData {
    game: string;
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
