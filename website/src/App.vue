<template lang="pug">
  #app
    Home(v-if="showGame === null" :games="games" @open-game="_setGame")
    Game(v-for="game in games" v-if="showGame === game.game" :game-data="game" @back="_back")
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { sortBy } from "lodash";
  import io from "socket.io-client";
  import Game, {GameData} from "./pages/Game.vue";
  import Home from "./pages/Home.vue";

  @Component({ components: { Home, Game } })
  export default class App extends Vue {

    private showGame: string | null = null;
    private games: GameData[] = [];

    public mounted() {
      this._setGame();
      const url = process.env.SOCKET_URL;
      const socket = url ? io(url) : io();
      socket.on("games", (games: any) => this._onNewGames(games));
      socket.on("new_score", (game: any) => this._onNewScore(game));
    }

    private _onNewGames(games: GameData[]) {
      this.games = games.map(game => {
        game.scores = sortBy(game.scores, s => s.score).reverse();
        return game;
      });
    }

    private _onNewScore(game: GameData) {
      const i = this.games.findIndex(g => g.game === game.game);
      if (i === -1) {
        this.games.push(game);
      } else {
        this.$set(this.games, i, game);
      }
    }

    private _setGame(game: string = decodeURIComponent(window.location.hash.substr(1))) {
      console.log(game);
      this.showGame = game.length !== 0 ? game : null;
      window.location.hash = encodeURIComponent(game);
    }

    private _back() {
      this.showGame = null;
      window.location.hash = "";
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

