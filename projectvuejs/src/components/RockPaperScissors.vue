<template>
    <div>
      <h1>2048</h1>
      <div class="grid" tabindex="0" @keydown="handleKeyDown" ref="gridRef">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="cell"
            :class="{ filled: cell !== 0 }"
          >
            {{ cell !== 0 ? cell : '' }}
          </div>
        </div>
      </div>
      <button @click="resetGame">Start New Game</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        grid: [],
      };
    },
    created() {
      this.initializeGrid();
      this.addRandomCell();
      this.addRandomCell();
    },
    methods: {
      initializeGrid() {
        this.grid = Array(4).fill().map(() => Array(4).fill(0));
      },
      addRandomCell() {
        const availableCells = [];
        this.grid.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (cell === 0) {
              availableCells.push({ row: rowIndex, col: colIndex });
            }
          });
        });
        if (availableCells.length > 0) {
          const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
          this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
      },
      resetGame() {
        this.initializeGrid();
        this.addRandomCell();
        this.addRandomCell();
      },
      handleKeyDown(event) {
        switch (event.key) {
          case 'ArrowUp':
            this.moveCells('up');
            break;
          case 'ArrowDown':
            this.moveCells('down');
            break;
          case 'ArrowLeft':
            this.moveCells('left');
            break;
          case 'ArrowRight':
            this.moveCells('right');
            break;
        }
      },
      moveCells(direction) {
  let moved = false;
  switch (direction) {
    case 'up':
      for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
          if (this.grid[row][col] !== 0) {
            let currentRow = row;
            while (currentRow > 0 && this.grid[currentRow - 1][col] === 0) {
              this.grid[currentRow - 1][col] = this.grid[currentRow][col];
              this.grid[currentRow][col] = 0;
              currentRow--;
              moved = true;
            }
          }
        }
      }
      break;
    case 'down':
      // Code to move cells down
      break;
    case 'left':
      // Code to move cells left
      break;
    case 'right':
      // Code to move cells right
      break;
  }
  if (moved) {
    // If any cells were moved, add a new random cell
    this.addRandomCell();
  }
}
    }
  };
  </script>
  
  <style scoped>
  .grid {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 10px;
    width: max-content;
  }
  
  .row {
    display: flex;
  }
  
  .cell {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .filled {
    background-color: lightgray;
  }
  
  /* Remove outline when focused */
  .grid:focus {
    outline: none;
  }
  </style>
  