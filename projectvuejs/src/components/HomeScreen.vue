<template>
    <div class="home-screen">
      <h1>Welcome to Game Selection</h1>
      <div class="game-buttons">
        <button @click="startFruitGame">Fruit Memory Game</button>
        <button @click="startRockPaperScissorsGame">Rock Paper Scissors</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeScreen',
    methods: {
      startFruitGame() {
        this.$emit('startFruitGame'); // Gửi sự kiện bắt đầu trò chơi Card Fruit
      },
      startRockPaperScissorsGame() {
        this.$emit('startRockPaperScissorsGame'); // Gửi sự kiện bắt đầu trò chơi Rock Paper Scissors
      }
    }
  };
  </script>
  
  <style scoped>
  .home-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .game-buttons {
    margin-top: 20px;
  }
  
  .game-buttons button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    outline: none;
  }
  
  .game-buttons button:hover {
    background-color: #45a049;
  }
  </style>