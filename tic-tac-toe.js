document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#board div");
  const status = document.getElementById("status");
  let currentPlayer = "X", gameActive = true, gameState = Array(9).fill(null);

  squares.forEach((square, index) => {
    square.classList.add("square");

    // handle click event
    square.onclick = () => {
      if (gameActive && !gameState[index]) {
        gameState[index] = currentPlayer;
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    };

    // handle hover effects
    square.onmouseover = () => !gameState[index] && square.classList.add("hover");
    square.onmouseout = () => square.classList.remove("hover");
  });

  // restart game
  document.querySelector(".btn").onclick = () => {
    gameState.fill(null);
    squares.forEach(square => {
      square.textContent = "";
      square.classList.remove("X", "O", "hover");
    });
    currentPlayer = "X";
    gameActive = true;
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
  };

  // check for the winner
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    const winner = winPatterns.find(pattern => 
      gameState[pattern[0]] && gameState[pattern[0]] === gameState[pattern[1]] && gameState[pattern[0]] === gameState[pattern[2]]
    );

    if (winner) {
      status.textContent = `Congratulations! ${gameState[winner[0]]} is the Winner!`;
      status.classList.add("you-won");
      gameActive = false;
    } else if (!gameState.includes(null)) {
      status.textContent = "It's a draw!";
      gameActive = false;
    }
  }
});
