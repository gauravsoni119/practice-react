const ROWS = 3;
const COLS = 3;

// We can also use this method instead of minimax algo to randomly choose the next move for computer.
export function randomNextMove(board: string[][]): {
  row: number;
  col: number;
} {
  const emptySpots = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === '') {
        emptySpots.push({ row, col });
      }
    }
  }
  return emptySpots[Math.floor(Math.random() * (emptySpots.length - 1))];
}
