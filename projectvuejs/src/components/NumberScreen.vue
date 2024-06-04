<template>
  <div class="screen">
    <div class="game-container">
      <div class="grid" tabindex="0" @keydown="handleKeyDown" ref="gridRef">
        <h1>2048</h1>
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="cell"
            :class="{ filled: cell !== 0 }"
            :style="{ backgroundColor: getCellColor(cell) }"
          >
            {{ cell !== 0 ? cell : '' }}
          </div>
        </div>
      </div>
      <button @click="resetGame">Start New Game</button>
      <div v-if="gameOver" class="game-over">
        <h2>{{ gameOverMessage }}</h2>
        <button @click="resetGame">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: [],
      gameOver: false,
      gameOverMessage: '',
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
      this.gameOver = false;
      this.gameOverMessage = '';
    },
    handleKeyDown(event) {
      if (this.gameOver) return;

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

      if (this.checkWin()) {
        this.gameOver = true;
        this.gameOverMessage = 'You win!';
      } else if (this.checkGameOver()) {
        this.gameOver = true;
        this.gameOverMessage = 'Game over!';
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
                if (currentRow > 0 && this.grid[currentRow - 1][col] === this.grid[currentRow][col]) {
                  this.grid[currentRow - 1][col] *= 2;
                  this.grid[currentRow][col] = 0;
                  moved = true;
                }
              }
            }
          }
          break;
        case 'down':
          for (let col = 0; col < 4; col++) {
            for (let row = 2; row >= 0; row--) {
              if (this.grid[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3 && this.grid[currentRow + 1][col] === 0) {
                  this.grid[currentRow + 1][col] = this.grid[currentRow][col];
                  this.grid[currentRow][col] = 0;
                  currentRow++;
                  moved = true;
                }
                if (currentRow < 3 && this.grid[currentRow + 1][col] === this.grid[currentRow][col]) {
                  this.grid[currentRow + 1][col] *= 2;
                  this.grid[currentRow][col] = 0;
                  moved = true;
                }
              }
            }
          }
          break;
        case 'left':
          for (let row = 0; row < 4; row++) {
            for (let col = 1; col < 4; col++) {
              if (this.grid[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && this.grid[row][currentCol - 1] === 0) {
                  this.grid[row][currentCol - 1] = this.grid[row][currentCol];
                  this.grid[row][currentCol] = 0;
                  currentCol--;
                  moved = true;
                }
                if (currentCol > 0 && this.grid[row][currentCol - 1] === this.grid[row][currentCol]) {
                  this.grid[row][currentCol - 1] *= 2;
                  this.grid[row][currentCol] = 0;
                  moved = true;
                }
              }
            }
          }
          break;
        case 'right':
          for (let row = 0; row < 4; row++) {
            for (let col = 2; col >= 0; col--) {
              if (this.grid[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3 && this.grid[row][currentCol + 1] === 0) {
                  this.grid[row][currentCol + 1] = this.grid[row][currentCol];
                  this.grid[row][currentCol] = 0;
                  currentCol++;
                  moved = true;
                }
                if (currentCol < 3 && this.grid[row][currentCol + 1] === this.grid[row][currentCol]) {
                  this.grid[row][currentCol + 1] *= 2;
                  this.grid[row][currentCol] = 0;
                  moved = true;
                }
              }
            }
          }
          break;
      }
      if (moved) {
        this.addRandomCell();
      }
    },
    checkWin() {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (this.grid[row][col] === 2048) {
            return true;
          }
        }
      }
      return false;
    },
    checkGameOver() {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (this.grid[row][col] === 0) {
            return false;
          }
          if (col < 3 && this.grid[row][col] === this.grid[row][col + 1]) {
            return false;
          }
          if (row < 3 && this.grid[row][col] === this.grid[row + 1][col]) {
            return false;
          }
        }
      }
      return true;
    },
    getCellColor(value) {
      if (value === 0) return '#cdc1b7';
      const colors = {
        2: '#696969',
        4: '#FFE4B5',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e',
      };
      return colors[value] || '#3c3a32';
    },
  }
};
</script>
<style lang="css" scoped>
.screen {
  background-color: var(--dark);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
  color: var(--light);
}

.grid {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--light);
  padding: 10px;
  width: max-content;
  position: relative;
  margin-top: 5rem;
}

.row {
  display: flex;
}

.cell {
  width: 100px;
  height: 100px;
  border: 1px solid var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #776e65;
}

.filled {
  color: #f9f6f2;
}

/* Remove outline when focused */
.grid:focus {
  outline: none;
}

.game-over {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 20px;
  margin-top: 20px;
  background: transparent;
  font: var(--font);
  box-shadow: none;
  border: 1px solid var(--light);
  color: var(--light);
  display: flex;
  border-radius: 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.button span:first-child {
  font-size: 2rem;
}

button span:last-child {
  display: block;
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

button:hover {
  background-color: var(--light);
  color: var(--dark);
  transform: scale(1.2);
}
</style>
