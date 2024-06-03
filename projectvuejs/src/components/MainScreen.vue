<template>
    <div class="screen">
        <h1>FRUIT MEMORIES</h1>
        <h3>Select mode to start game</h3>
        <br>
        <div class="actions">
            <button @click="onStart(16)">
                <span>4x4</span>
                <span>Easy</span>
            </button>
            <button @click="onStart(36)">
                <span>6x6</span>
                <span>Normal</span>
            </button>
            <button @click="onStart(64)">
                <span>8x8</span>
                <span>Hard</span>
            </button>
        </div>
    </div>
    
</template>
<script>
export default{
    methods: {
        onStart(totalOfBlocks) {
            this.$emit("onStart", { totalOfBlocks });
        },
    },
};
</script>
<style lang="css" scoped>

.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  background: url("../assets/images/aaa.png") no-repeat center center ;
  background-size: cover; /* This line makes the background image cover the full screen */
}
.screen h1 {
  font-size: 4.5rem;
  text-transform: uppercase;
}

.screen h3 {
  font-size: 2rem;
  margin-top: 10px;
}
    .actions {
        display: flex;
  margin-top: 2rem;
}
.actions button {
  font: var(--font);
  width: 150px;
  height: 150px;
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--light);
  color: var(--light);
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 0 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
.actions button span:first-child {
  font-size: 2rem;
}

.actions button span:last-child {
  display: block;
  font-size: 1.25rem;
  margin-top: 0.5rem;
}
.actions button:hover {
  background-color: var(--light);
  color: var(--dark);
}
</style>