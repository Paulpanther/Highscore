<template lang="pug">
  #home
    .game-grid
      Game(v-for="game in games" game-data="game")
<!--    ul-->
<!--      li(v-for="game in games")-->
<!--        a(:href="'#' + game.game" @click="_openGame(game.game)") {{ game.game }}-->
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Prop} from "vue-property-decorator";
  import Game from "./Game.vue";

  @Component({ components: { Game } })
  export default class Home extends Vue {

    @Prop({ default: [] })
    private games: string[];

    private _openGame(game: string) {
      this.$emit("open-game", game)
    }
  }
</script>

<style lang="sass" scoped>
</style>
