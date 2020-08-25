<template lang="pug">
  #app
    Home(v-if="showGame === null" :games="games" @open-game="_setGame")
    Game(v-for="game in games" v-if="showGame === game.title" :game-data="game")
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { sortBy } from "lodash";
  import Game, { GameData } from "./pages/Game.vue";
  import Home from "./pages/Home.vue";

  const server = "ws://localhost:6789";

  @Component({ components: { Home, Game } })
  export default class App extends Vue {

    private showGame: string | null = null;
    private games: GameData[] = [];
    private initialized: boolean = false;

    public mounted() {
      this._setGame();
      this._onNewGames([
        {
          title: "hey",
          scores: [
            {
              username: "Paul",
              score: 900
            }
          ]
        }
      ])
    }

    private _onNewGames(games: GameData[]) {
      this.games = games.map(game => {
        game.scores = sortBy(game.scores, s => s.score).reverse();
        return game;
      });
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