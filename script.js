const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const pvpBtn = document.getElementById("pvp");
const cpuBtn = document.getElementById("cpu");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = false;
let mode = null;

let xScore = 0;
let oScore = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleMove));
restartBtn.addEventListener("click", resetBoard);

pvpBtn.onclick = () => startGame("pvp");
cpuBtn.onclick = () => startGame("cpu");

function startGame(selectedMode) {
  mode = selectedMode;
  resetBoard();
  gameActive = true;
  statusText.textContent = "Player X's turn";
}

function handleMove(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index] !== "") return;

  makeMove(index, currentPlayer);

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins 🎉`;
    updateScore(currentPlayer);
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Draw 😐";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (mode === "cpu" && currentPlayer === "O") {
    statusText.textContent = "Computer thinking…";
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let empty = board
    .map((v,i) => v === "" ? i : null)
    .filter(v => v !== null);

  let move = empty[Math.floor(Math.random() * empty.length)];
  makeMove(move, "O");

  if (checkWinner("O")) {
    statusText.textContent = "Computer wins 🤖";
    updateScore("O");
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Draw 😐";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add("taken");
}

function checkWinner(player) {
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === player)
  );
}

function isDraw() {
  return !board.includes("");
}

function updateScore(player) {
  if (player === "X") {
    xScore++;
    xScoreEl.textContent = xScore;
  } else {
    oScore++;
    oScoreEl.textContent = oScore;
  }
}

function resetBoard() {
  board = ["","","","","","","","",""];
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}