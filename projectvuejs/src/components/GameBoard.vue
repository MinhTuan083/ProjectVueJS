<template>
  <div class="game-board">
    <div class="menu-button" @mouseover="showMenu = true" @mouseleave="showMenu = false">
      ☰
      <div class="dropdown-menu" v-if="showMenu">
        <div class="dropdown-item" @click="openSettings">Cài đặt</div>
        <div class="dropdown-item" @click="confirmExit">Thoát trò chơi</div>
      </div>
    </div>
    <h1>Go Caro</h1>
    
    <div class="board" :style="borderStyle">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :class="['cell', cell === 'X' ? 'x-cell' : cell === 'O' ? 'o-cell' : '', isWinningCell(rowIndex, colIndex) ? (cell === 'X' ? 'x-win-cell' : 'o-win-cell') : '']"
          @click="makeMove(rowIndex, colIndex)"
        >
          {{ cell }}
        </div>
      </div>
    </div>
    <p v-if="winner">Winner: {{ winner }}</p>
    <div v-if="showExitConfirm" class="exit-confirm">
      <p>Bạn có muốn thoát trò chơi?</p>
      <button @click="exitGame">Yes</button>
      <button @click="cancelExit">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',
  data() {
    return {
      board: Array(20).fill(null).map(() => Array(20).fill(null)),
      currentPlayer: 'X',
      winner: null,
      winningCells: [],
      showMenu: false,
      showExitConfirm: false,
      borderStyle: {},
      colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange'],
      colorIndex: 0,
    };
  },
  mounted() {
    this.changeBorderColor();
  },
  methods: {
    makeMove(row, col) {
      if (!this.board[row][col] && !this.winner && this.currentPlayer === 'X') {
        this.board[row][col] = this.currentPlayer;
        if (this.checkWin(row, col)) {
          this.winner = this.currentPlayer;
          setTimeout(() => {
            alert(`${this.winner} thắng!`);
            this.resetBoard();
          }, 1000);
        } else {
          this.currentPlayer = 'O';
          setTimeout(this.computerMove, 500);
        }
      }
    },
    computerMove() {
      if (!this.winner) {
        let bestMove = this.findBestMove('O'); // Tìm nước đi tốt nhất cho bot
        let blockMove = this.findBestMove('X'); // Tìm nước đi chặn người chơi

        if (blockMove && (!bestMove || blockMove.score > bestMove.score)) {
          bestMove = blockMove; // Ưu tiên chặn người chơi nếu điểm chặn cao hơn
        }

        if (bestMove) {
          const { row, col } = bestMove;
          this.board[row][col] = 'O';
          if (this.checkWin(row, col)) {
            this.winner = 'O';
            setTimeout(() => {
              alert(`${this.winner} thắng!`);
              this.resetBoard();
            }, 1000);
          } else {
            this.currentPlayer = 'X';
          }
        } else {
          this.randomMove(); // Nếu không có nước đi tốt, chọn ngẫu nhiên
        }
      }
    },
    randomMove() {
      let emptyCells = [];
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
          if (!this.board[row][col]) {
            emptyCells.push({ row, col });
          }
        }
      }
      if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.board[row][col] = 'O';
        if (this.checkWin(row, col)) {
          this.winner = 'O';
          setTimeout(() => {
            alert(`${this.winner} thắng!`);
            this.resetBoard();
          }, 1000);
        } else {
          this.currentPlayer = 'X';
        }
      }
    },
    findBestMove(player) {
      let bestMove = null;
      let maxCount = 0;

      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
          if (!this.board[row][col]) {
            let count = this.countThreats(row, col, player);
            if (count > maxCount) {
              maxCount = count;
              bestMove = { row, col, score: count };
            }
          }
        }
      }
      return bestMove;
    },
    countThreats(row, col, player) {
      const directions = [
        { x: 1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, // Vertical
        { x: 1, y: 1 }, // Diagonal \
        { x: 1, y: -1 } // Diagonal /
      ];
      let threatCount = 0;

      for (let { x, y } of directions) {
        let count = 1;

        for (let i = 1; i < 5; i++) {
          const newRow = row + i * y;
          const newCol = col + i * x;
          if (
            newRow >= 0 &&
            newRow < 20 &&
            newCol >= 0 &&
            newCol < 20 &&
            this.board[newRow][newCol] === player
          ) {
            count++;
          } else {
            break;
          }
        }

        for (let i = 1; i < 5; i++) {
          const newRow = row - i * y;
          const newCol = col - i * x;
          if (
            newRow >= 0 &&
            newRow < 20 &&
            newCol >= 0 &&
            newCol < 20 &&
            this.board[newRow][newCol] === player
          ) {
            count++;
          } else {
            break;
          }
        }

        threatCount += this.getScore(count);
      }

      return threatCount;
    },
    getScore(count) {
      switch (count) {
        case 5:
          return 10000; // Winning move
        case 4:
          return 100; // Strong threat
        case 3:
          return 10; // Medium threat
        case 2:
          return 1; // Weak threat
        default:
          return 0;
      }
    },
    checkWin(row, col) {
      const directions = [
        { x: 1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, // Vertical
        { x: 1, y: 1 }, // Diagonal \
        { x: 1, y: -1 } // Diagonal /
      ];
      const current = this.board[row][col];

      for (let { x, y } of directions) {
        let count = 1;
        let winCells = [{ row, col }];

        for (let i = 1; i < 5; i++) {
          const newRow = row + i * y;
          const newCol = col + i * x;
          if (
            newRow >= 0 &&
            newRow < 20 &&
            newCol >= 0 &&
            newCol < 20 &&
            this.board[newRow][newCol] === current
          ) {
            count++;
            winCells.push({ row: newRow, col: newCol });
          } else {
            break;
          }
        }

        for (let i = 1; i < 5; i++) {
          const newRow = row - i * y;
          const newCol = col - i * x;
          if (
            newRow >= 0 &&
            newRow < 20 &&
            newCol >= 0 &&
            newCol < 20 &&
            this.board[newRow][newCol] === current
          ) {
            count++;
            winCells.push({ row: newRow, col: newCol });
          } else {
            break;
          }
        }

        if (count >= 5) {
          this.winningCells = winCells;
          return true;
        }
      }

      return false;
    },
    isWinningCell(row, col) {
      return this.winningCells.some(cell => cell.row === row && cell.col === col);
    },
    goHome() {
      this.$emit('toggleOtherGames', true); // Hiển thị thông tin game khác khi quay về trang chủ
      this.$router.push({ name: 'HomeBoard' });
    },
    confirmExit() {
      this.showExitConfirm = true;
      this.showMenu = false;
    },
    exitGame() {
      this.$emit('toggleOtherGames', true); // Hiển thị thông tin game khác khi quay về trang chủ
      this.$router.push({ name: 'HomeBoard' });
    },
    cancelExit() {
      this.showExitConfirm = false;
    },
    openSettings() {
      alert("Cài đặt sẽ được thêm sau!");
    },
    resetBoard() {
      this.board = Array(20).fill(null).map(() => Array(20).fill(null));
      this.currentPlayer = 'X';
      this.winner = null;
      this.winningCells = [];
    },
    changeBorderColor() {
      setInterval(() => {
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        this.borderStyle = {
          borderImage: `linear-gradient(90deg, ${this.colors[this.colorIndex]}, ${this.colors[(this.colorIndex + 1) % this.colors.length]}) 1`,
          animation: 'border-animate 5s linear infinite'
        };
      }, 5000); // Đổi màu sau mỗi 5 giây
    }
  }
};
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/image/bgrgame.jpg'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

 
}

h1 {
  font-size: 3em;
  color: #007bff;
  text-align: center;
}

.board {
  display: grid;
  grid-template-rows: repeat(20, 25px);
  grid-template-columns: repeat(20, 25px);
  gap: 1px;
  margin: 5px auto;
  border: 10px solid;
  width: max-content;
  border-image-slice: 1;
  
}

@keyframes border-animate {
  0% {
    border-image-source: linear-gradient(90deg, red, yellow);
  }
  100% {
    border-image-source: linear-gradient(90deg, yellow, green);
  }
}

.row {
  display: contents;
}

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #000; /* Black borders between cells */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #d2b48c; /* Light brown background */
  font-size: 24px;
  font-weight: bold;
}

.x-cell {
  color: green;
}

.o-cell {
  color: red;
}

.x-win-cell {
  background-color: lightgreen;
}

.o-win-cell {
  background-color: lightcoral;
}

.cell:hover {
  background-color: #f0f0f0;
}

.menu-button {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: 30px;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 16px; /* Điều chỉnh cỡ chữ ở đây */
  color:#000;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.exit-confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 200;
}

.exit-confirm p {
  margin-bottom: 20px;
}

.exit-confirm button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
