<template>
  <div id="app">
    <div v-if="showOtherGames" class="other-games">
      <img src="/path/to/other-game-info.png" alt="Other Games Info" />
    </div>
    <router-view @toggleOtherGames="toggleOtherGames" />
    <div>
      <home-screen v-if="statusMatch === 'home'" @startFruitGame="startFruitGame" @startNumberGame="startNumberGame" @startCaroGame="startCaroGame"/>
      <main-screen v-if="statusMatch === 'default'" @onStart="onHandleBeforeStart($event)" />
      <interact-screen v-if="statusMatch === 'match'" :cardsContext="setting.cardsContext" @onFinish="onGetResult" />
      <result-screen v-if="statusMatch === 'result'" :timer="timer" @onStartAgain="resetGame" />
      <number-screen v-if="statusMatch === 'number2048'" />
      <home-board v-if="statusMatch === 'caro'" @startGame="startGame"/>
      <game-board v-if="statusMatch === 'playcaro'" @exitGameConfirmed="exitGameConfirmed" />
      <audio ref="backgroundMusic" src="soundgame.mp3" type="audio/mp3" loop></audio>
    </div>
  </div>

</template>



<script>
import HomeScreen from "./components/HomeScreen.vue";
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";
import NumberScreen from "./components/NumberScreen.vue";
import { shuffled } from "./utils/array";
import HomeBoard from "./components/HomeBoard.vue";
import GameBoard from "./components/GameBoard.vue";

export default {
  name: 'App',
  components: {
    HomeScreen,
    MainScreen,
    InteractScreen,
    ResultScreen,
    NumberScreen,
    HomeBoard,
    GameBoard,
  },
  data() {
    return {
      setting: {
        totalOfBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
      statusMatch: "home", // Ban đầu hiển thị trang chủ
      timer: 0,
    };
  },
  mounted() {
    this.playBackgroundMusic();
  },
  methods: {
    onHandleBeforeStart(config) {
      console.log("running handle before start, ", config);
      this.statusMatch = "match";
      this.setting.totalOfBlocks = config.totalOfBlocks;

      const firstCards = Array.from({ length: this.setting.totalOfBlocks / 2 }, (_, i) => i + 1);
      const secondCards = [...firstCards];
      const cards = [...firstCards, ...secondCards];

      this.setting.cardsContext = shuffled(cards);

      this.setting.startedAt = new Date().getTime();

      // Play background music
      this.playBackgroundMusic();

      // data ready
      this.statusMatch = "match";
      
    },
    exitGame() {
    this.statusMatch = "home"; // Switch back to the home screen
    this.showOtherGames = true; // Show other games info
  },
    onGetResult() {
      // get timer
      this.timer = new Date().getTime() - this.setting.startedAt;
      // switch to result component
      this.statusMatch = "result";
    },
    playBackgroundMusic() {
      const music = this.$refs.backgroundMusic;
      if (music) {
        music.play().catch(error => {
          console.log('Auto-play was prevented:', error);
          window.addEventListener('click', () => {
            music.play();
          }, { once: true });
        });
      }
    },
    resetGame() {
      this.statusMatch = "default";
      this.timer = 0;
    },
    startFruitGame() {
      this.statusMatch = "default"; // Chuyển sang trò chơi Card Fruit
    },
    startNumberGame() {
      this.statusMatch = "number2048"; // Chuyển sang trò chơi 2048
    },
    startCaroGame() {
      this.statusMatch = "caro"; // Chuyển sang trò chơi 2048
    },
    finishNumberGame() {
      this.statusMatch = "home"; // Quay lại trang chủ sau khi kết thúc trò chơi Kéo Búa Bao
    },
    startGame() {
      this.statusMatch = "playcaro"; // Chuyển sang màn hình GameBoard khi bắt đầu trò chơi Caro
    },
    exitGameConfirmed() {
      this.$emit('home'); // Emitting an event to the parent component
  }
  },

};
</script>


<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
</style>
