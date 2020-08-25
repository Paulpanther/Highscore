<template lang="pug">
  #app
    Home(v-if="showGame === null" :games="games" @open-game="_setGame")
    Game(v-for="game in games" v-if="showGame === game")
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Game from "./pages/Game.vue";
  import Home from "./pages/Home.vue";

  @Component({ components: { Home, Game } })
  export default class App extends Vue {

    private showGame: string | null = null;
    private games: string[] = [];
    private initialized: boolean = false;

    public mounted() {
      this._setGame();
    }

    private _setGame(game: string = window.location.hash.substr(1)) {
      this.showGame = game.length !== 0 ? game : null;
    }
  }
</script>

<style lang="sass">
</style>

<style lang="sass" scoped>
</style>