/* querySelectors */
const vsPlayer = document.querySelector(".vsPlayer");
const vsAI = document.querySelector(".vsAI");
const selectX = document.querySelector(".selectX");
const selectO = document.querySelector(".selectO");
const swap = document.querySelector(".swap");
const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart");

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
let board = {};

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
    board = {};
  });
}

/* Change team */
function swapTeam() {
  console.log(player2);
  console.log(turn);
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
  console.log(player2);
  console.log(turn);
}

/* Next turn */
function nextTurn() {
  if (turn === "x") turn = "o";
  else turn = "x";
}

/* Check winner */

/* Add mark */
const addMark = (team, cell) => {
  if (cell.querySelector("span")) return; // check if cell is filled
  const cellNum = cell.id;
  board[cellNum] = team;
  cell.innerHTML = `<span class="drawing">${team}</span>`;
  console.log(player2);
  console.log(turn);
  if (turn === player2.Team) cell.classList.add("red");
  else cell.classList.remove("red");
  nextTurn();
  console.log(player2);
  console.log(turn);
};

/* Events */
swap.addEventListener("click", swapTeam);
cells.forEach((cell) => {
  cell.addEventListener("click", () => addMark(turn, cell));
});
restartButton.addEventListener("click", restart);

/* Select Game */
