
    
    <template>
  <div id="app">
    <div v-if="showOtherGames" class="other-games">
      <main-screen
        v-if="statusMatch === 'default'"
        @onStart="onHandleBeforeStart($event)"
      />
      <interact-screen v-if="statusMatch === 'match'" />
      <router-view
        v-if="statusMatch !== 'default' && statusMatch !== 'match'"
      />

      <img src="/path/to/other-game-info.png" alt="Other Games Info" />
    </div>
    <router-view @toggleOtherGames="toggleOtherGames" />
  </div>
</template>
  


<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";

export default {
  name: "App",
  data() {
    return {
      statusMatch: "default",
    };
  },
  components: {
    MainScreen,
    InteractScreen,
  },
  methods: {
    onHandleBeforeStart(config) {
      console.log("running handle before start, ", config);
      this.statusMatch = "match";
    },
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
