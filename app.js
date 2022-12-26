/* querySelectors */
const vsPlayer = document.querySelector(".vsPlayer");
const vsAI = document.querySelector(".vsAI");
const selectX = document.querySelector(".selectX");
const selectO = document.querySelector(".selectO");
const swap = document.querySelector(".swap");
const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart");
const winnerSign = document.querySelector(".winner");

/* Create player */
const createPlayer = (team, kind) => {
  const Team = team;
  const Kind = kind;
  return { Team, Kind };
};

/* Declarations */
let mode = "vsPlayer";
const player1 = createPlayer("x", "human");
const player2 = createPlayer("o", "ai");
let turn = "x";
let board = Array.from(Array(3), () => Array(3).fill(null));

/* Change color cells */
function colorCells() {
  const redCells = document.querySelectorAll(".cell.red");
  const blueCells = document.querySelectorAll(".cell:not(.red)");
  blueCells.forEach((cell) => {
    cell.classList.add("red");
  });
  redCells.forEach((cell) => {
    cell.classList.remove("red");
  });
}

/* Restart */
function restart() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    board = Array.from(Array(3), () => Array(3).fill(null));
    winnerSign.innerHTML = "";
    winnerSign.classList.remove("end");
    turn = "x";
  });
}

/* Change team */
function swapTeam() {
  colorCells();
  if (player1.Team === "x") {
    player1.Team = "o";
    player2.Team = "x";
    selectX.classList.add("red");
    selectO.classList.remove("red");
  } else {
    player1.Team = "x";
    player2.Team = "o";
    selectX.classList.remove("red");
    selectO.classList.add("red");
  }
}

/* Next turn */
function nextTurn() {
  if (turn === "x") turn = "o";
  else turn = "x";
}

/* Show winner */
function showWinner(team) {
  console.log(team);
  if (team === "draw") winnerSign.innerHTML = `<p>It's a</p><h2>Draw</h2>`;
  else if (team === player1.Team)
    winnerSign.innerHTML = `<p>The winner is</p><h2>Player 1</h2>`;
  else {
    winnerSign.innerHTML = `<p>The winner is</p><h2>Player 2</h2>`;
  }
  winnerSign.classList.add("end");
}

/* Check winner */
function checkWinner() {
  for (let i = 0; i <= 2; i++) {
    // Rows and columns
    if (
      board[i][0] != null &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    )
      showWinner(board[i][0]);
    if (
      board[0][i] != null &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    )
      showWinner(board[0][i]);
  }
  if (
    //  Diagonals
    board[0][0] != null &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  )
    showWinner(board[0][0]);
  if (
    board[2][0] != null &&
    board[2][0] === board[1][1] &&
    board[2][0] === board[0][2]
  )
    showWinner(board[2][0]);
  else {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (board[i][j] === null) return;
      }
    }
    showWinner("draw");
  }
}

/* Add mark */
const addMark = (team, cell) => {
  if (cell.querySelector("span")) return; // check if cell is filled
  const cellNum = cell.id;
  const cellNumSplit = cellNum.split("");
  board[cellNumSplit[0]][cellNumSplit[1]] = team;
  cell.innerHTML = `<span class="drawing">${team}</span>`;
  if (turn === player2.Team) cell.classList.add("red");
  else cell.classList.remove("red");
  checkWinner();
  nextTurn();
};

/* Events */
swap.addEventListener("click", swapTeam);
cells.forEach((cell) => {
  cell.addEventListener("click", () => addMark(turn, cell));
});
restartButton.addEventListener("click", restart);

/* Select Game */
