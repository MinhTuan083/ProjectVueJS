<template>
    <div class="screen">
        <h1>Congratulation</h1>
        <p>{{ Math.round(timer / 1000) }} seconds</p>
        <button @click="onStartAgain">Start Again</button>
    </div>
    </template>

    <script>
    export default { 
        props: {
            timer:{
                type: Number,
                required: true,
            },
        },
        methods: {
            onStartAgain() {
                this.$emit("onStartAgain");
            }
        }
    }
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
  color:rgb(255, 221, 0);
}

.screen p {
  font-size: 2rem;
  margin-top: 10px;
}
.screen button{
    padding: 20px;
    margin-top: 20px;
  font: var(--font);
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--light);
  color: var(--light);
  display: flex;
  border-radius: 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
.screen button span:first-child {
  font-size: 2rem;
}

.screen button span:last-child {
  display: block;
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

.screen button:hover {
  background-color: var(--light);
  color: var(--dark);
  transform: scale(1.2);
}




</style>