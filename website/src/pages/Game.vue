<template lang="pug">
  .game(:class="[ compact ]")
    .back(@click="$emit('back')")
    .header
      span.highscore Highscore
      span.title(@click="$emit('click')") {{ gameData.game }}
    List(:entries="gameData.scores" :compact="compact")
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

    @Prop({ default: false })
    private compact: boolean;
  }
</script>

<style lang="sass" scoped>
</style>
