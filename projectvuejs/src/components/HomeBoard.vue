<template>
  <div class="home-container">
    <h1>Cờ Caro</h1>
    <button @click="startGameWithBot" @mouseover="hover = true" @mouseleave="hover = false" class="hover-button">
      Đánh với máy
      <img v-if="hover" src="@/assets/images/ronaldo.png" alt="Hover Image" class="hover-image">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    };
  },
  methods: {
    startGameWithBot() {
      this.$emit('startGame');    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('@/assets/images/bgr.jpg'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  
}

.hover-button {
  position: relative;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  outline: none;
}
h1 {
  font-size: 3em;
  color: #020202;
}
.hover-image {
  position: absolute;
  top: -300px; /* Adjust based on your layout */
  left: 50%;
  transform: translateX(-50%);
  width: 300px; /* Adjust based on your image size */
  height: auto;
  display: none;
}

.hover-button:hover .hover-image {
  display: block;
}
</style>






