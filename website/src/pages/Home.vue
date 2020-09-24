<template lang="pug">
  #home
    .error(v-if="games.length === 0") There are no Games for now :( Come back later!
    .game-grid
      Game(v-for="game in games" :game-data="game" compact @click="_openGame(game.game)")
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
