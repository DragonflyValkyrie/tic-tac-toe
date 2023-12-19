// Gameboard factory function
const Gameboard = () => {
    const board = [
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
    ];
    
    const getBoard = () => board;
    
    const placeToken = (row, col, player) => {
        if (board[row][col] === "") {
            board[row][col] = player;
            return true;
        }
        return false;
    };
    
    return {getBoard, placeToken};
};

// Player factory function
const Player = (name, token) => ({name, token});

// gameController control object
const gameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let activePlayer = player1;
    
    const switchPlayer = () => {
        //console.log("Before switch:", activePlayer);
        gameController.activePlayer = gameController.activePlayer === player1 ? player2 : player1;
        //console.log("After switch:", activePlayer);
    };

    const winConditions = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    const playRound = (row, col) => {
        const moveSuccess = gameController.gameboard.placeToken(row, col, activePlayer.token);
        
        if (moveSuccess) {
            checkWinner(activePlayer);
            switchPlayer();
            logBoard();
            checkDraw();
        }
    };

    const logBoard = () => {
        console.log(gameController.gameboard.getBoard());
    };

    const checkDraw = () => {
        if (isBoardFull()) {
            console.log(`It"s a draw!`);
            gameController.endGame(true, activePlayer);
        }
    };

    const isBoardFull = () => {
        const board = gameController.gameboard.getBoard();
        return board.every(row => row.every(cell => cell !== ""));
    };

    const checkWinner = (activePlayer) => {
        const board = gameController.gameboard.getBoard();

        for (let condition of winConditions) {
            if (checkCondition(board, condition, activePlayer)) {
                console.log(`${activePlayer.name} wins!`);
                gameController.endGame(false, activePlayer);
                
                return;
            }
        }
    };

    const checkCondition = (board, condition, activePlayer) => {
        return condition.every(([row, col]) => board[row][col] === activePlayer.token);
    };

    const gameboard = Gameboard();

    const resetGame = () => {
        gameController.gameboard = Gameboard();
    };

    const endGame = (isDraw, activePlayer) => {
        if (isDraw) {
            const drawMessage = "It's a draw!";
            winningMessageTextElement.innerText = drawMessage;
        } else {
            winningMessageTextElement.innerText = `${activePlayer.name} wins!`;
        }
        winningMessageElement.classList.add("show");
        resetGame();
    };

    return {playRound, gameboard, resetGame, activePlayer, switchPlayer, checkWinner, logBoard, checkDraw, endGame};
})();

const restartButton = document.getElementById("restartButton");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const cellElements = document.querySelectorAll("[data-cell]");
const gameboard = document.getElementById("game-board");

// Add event listeners to each cell
cellElements.forEach(cell => {
    cell.addEventListener("click", handleCellClick, {once: true});
});

function handleCellClick(event) {
    const clickedCell = event.target;
    const row = parseInt(clickedCell.getAttribute("data-row"));
    const col = parseInt(clickedCell.getAttribute("data-col"));

    if (gameController.gameboard.placeToken(row, col, gameController.activePlayer.token)) {
        
        // Place player"s tokens to display
        const tokenElement = clickedCell.querySelector(".token");
        //console.log(tokenElement)
        tokenElement.textContent = gameController.activePlayer.token;
        //console.log(tokenElement.textContent);

        clickedCell.textContent = gameController.activePlayer.token;

        gameController.checkWinner(gameController.activePlayer);
        gameController.switchPlayer();
        gameController.logBoard();
        gameController.checkDraw();
    } else {
        console.log("Cell is already occupied!");
    }
}

// Example usage
//gameController.playRound(0, 0);