<template lang="pug">
  #home
    h1 Choose Game
    ul
      li(v-for="game in games")
        a(:href="'#' + game" @click="_openGame(game)") {{ game }}
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Prop} from "vue-property-decorator";

  @Component
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
