<template>
    <div class="home-screen">
      <h1>Welcome to Game Selection</h1>
      <div class="game-buttons">
        <button @click="startFruitGame">Fruit Memory Game</button>
        <button @click="startNumberGame">2048</button>
        <button @click="startCaroGame">Play Caro Game</button> <!-- Thêm nút để gọi HomeBoard -->

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
      startNumberGame() {
        this.$emit('startNumberGame'); // Gửi sự kiện bắt đầu trò chơi Rock Paper Scissors
      },
      startCaroGame() {
        this.$emit('startCaroGame'); //
      },
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
    background: url("../assets/images/bgg.png") no-repeat center center ;
  background-size: cover; /* This line makes the background image cover the full screen */    
  }
  .home-screen h1{
    font-size: 4rem;
  }
  .game-buttons {
    margin-top: 20px;
  }
  
  .game-buttons button {
    margin-left: 2rem;
    padding: 10px 20px;
    font-size: 18px;
    border: 2px solid var(--light);
    color: var(--light);
    border-radius: 5px;
    outline: none;
    background: transparent;
    cursor: pointer;
  transition: background 0.3s ease-in-out;
  }
  
  .game-buttons button:hover {
    background-color: var(--light);
  color: var(--dark);
  transform: scale(1.2);
  }
  
  </style>