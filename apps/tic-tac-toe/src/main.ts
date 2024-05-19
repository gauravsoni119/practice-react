const ROWS = 3;
const COLS = 3;
function buildBoard(rows: number, cols: number) {
  const board: string[][] = [];
  for (let row = 0; row < rows; row++) {
    board.push([]);
    for (let col = 0; col < cols; col++) {
      board[row].push('');
    }
  }
  return board;
}

const board = buildBoard(ROWS, COLS);

const SCORES = {
  X: 10,
  O: -10,
  tie: 0,
};

const cols = document.querySelectorAll('.col') as NodeListOf<HTMLButtonElement>;
const result = document.querySelector('.result');
const options = document.querySelectorAll(
  "[name='player-option']"
) as NodeListOf<HTMLFormElement>;

let human = 'X';
let ai = 'O';

updateSelector(options[0].value);

options.forEach((option) => {
  option.addEventListener('change', (event) => {
    const { value } = event.target as HTMLFormElement;
    updateSelector(value);
  });
});

cols.forEach((col) => {
  col.addEventListener('click', () => {
    const dataRow = +col.dataset.row;
    const dataCol = +col.dataset.col;
    if (board[dataRow][dataCol] === '') {
      col.textContent = human;
      board[dataRow][dataCol] = human;

      // Bot move
      const botMove = bestMove();

      // if bot can move, then update the board
      if (botMove) {
        board[botMove.row][botMove.col] = ai;
        const botPlace = document.querySelector(
          `[data-row='${botMove.row}'][data-col='${botMove.col}']`
        );
        botPlace.textContent = ai;
      }

      // Get match's result and show it on the dash board
      const outcome = checkWinner();
      if (outcome) {
        if (outcome === 'tie') {
          result.textContent = outcome;
        } else {
          result.textContent = `${outcome} wins`;
        }
      }
    }
  });
});

// AI to make its best turn
function bestMove() {
  let bestScore = -Infinity;
  let move: { row: number; col: number } | undefined;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === '') {
        board[row][col] = ai;
        const score = minimax(board, 0, false);
        board[row][col] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { row, col };
        }
      }
    }
  }
  return move;
}

function minimax(board: string[][], depth: number, isMaximizing: boolean) {
  const result = checkWinner();
  if (result !== null) {
    return SCORES[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        // If the spot available
        if (board[row][col] === '') {
          board[row][col] = ai;
          const score = minimax(board, depth + 1, false);
          board[row][col] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        // If the spot available
        if (board[row][col] === '') {
          board[row][col] = human;
          const score = minimax(board, depth + 1, true);
          board[row][col] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function updateSelector(value: string) {
  if (value === '1') {
    human = 'X';
    ai = 'O';
  } else {
    human = 'O';
    ai = 'X';
  }
  // Update the score based on the selector
  SCORES[human] = -10;
  SCORES[ai] = 10;
}

function isAllEqual(a: string, b: string, c: string) {
  return a === b && b === c && a !== '';
}

function checkWinner() {
  let winner = null;
  // horizontal
  for (let index = 0; index < ROWS; index++) {
    if (isAllEqual(board[index][0], board[index][1], board[index][2])) {
      winner = board[index][0];
    }
  }
  // vertical
  for (let index = 0; index < COLS; index++) {
    if (isAllEqual(board[0][index], board[1][index], board[2][index])) {
      winner = board[0][index];
    }
  }

  // diagonal
  if (isAllEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (isAllEqual(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  // Are still moves left
  let openSpots = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === '') {
        openSpots++;
      }
    }
  }

  if (winner === null && openSpots === 0) {
    return 'tie';
  }
  // console.log(board)
  return winner;
}
