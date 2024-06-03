<template>
  <main-screen v-if="statusMatch === 'default'" @onStart="onHandleBeforeStart($event)"/>
  <interact-screen v-if="statusMatch === 'match'" :cardsContext="setting.cardsContext" @onFinish="onGetResult" />
  <result-screen v-if="statusMatch === 'result'" :timer="timer" @onStartAgain="statusMatch = 'default'" />
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";



import { shuffled } from "./utils/array";
import {} from "./utils/array";
export default {
  name: 'App',
  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
    },
  data(){
    return{
      setting: {
        totalOfBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
      statusMatch: "default", 
      timer : 0,
    };
  },

    methods:{
      onHandleBeforeStart(config) {
        console.log("running handle before start, ", config);
        this.setting.totalOfBlocks = config.totalOfBlocks;

        const firstCards = Array.from({ length: this.setting.totalOfBlocks / 2 }, 
        (_, i) => i + 1
      );
       const secondCards = [...firstCards];
       const cards = [...firstCards, ...secondCards];
       
       this.setting.cardsContext = shuffled(shuffled(shuffled(shuffled(cards))));

       this.setting.startedAt = new Date().getTime();



        //data ready
        this.statusMatch = "match";
      },
      onGetResult(){
        //get timer
        this.timer = new Date().getTime() - this.setting.startedAt;
        //switch to result compoment
        this.statusMatch = "result";
      },
    },
};
</script>

<style>

</style>
