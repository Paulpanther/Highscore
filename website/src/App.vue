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
          title: "Super nice Game",
          scores: [
            {
              username: "Voldemord",
              score: 900
            },
            {
              username: "Tom Riddle",
              score: 800
            },
            {
              username: "Hermine",
              score: 750
            },
            {
              username: "Harry Potter",
              score: 600
            },
            {
              username: "Ron",
              score: 530
            },
            {
              username: "Mario Mario",
              score: 420
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
  html
    font-size: 16px

  body
    margin: 0
    padding: 0

    font-size: 62.5%
</style>

