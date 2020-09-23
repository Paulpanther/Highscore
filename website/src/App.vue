<template lang="pug">
  #app
    Home(v-if="showGame === null" :games="games" @open-game="_setGame")
    Game(v-for="game in games" v-if="showGame === game.game" :game-data="game")
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { sortBy } from "lodash";
  import io from "socket.io-client";
  import Game, {GameData} from "./pages/Game.vue";
  import Home from "./pages/Home.vue";
  import Socket = SocketIOClient.Socket;

  const server = "localhost:3000";

  @Component({ components: { Home, Game } })
  export default class App extends Vue {

    private showGame: string | null = null;
    private games: GameData[] = [];

    private socket: Socket;

    public mounted() {
      this._setGame();
      this.socket = io(server);
      this.socket.on("games", games => this._onNewGames(games));
      this.socket.on("new_score", game => this._onNewScore(game));
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

