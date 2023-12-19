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
    
    return { getBoard, placeToken };
};

// Player factory function
const Player = (name, token) => ({ name, token });

// Game control object
const Game = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let activePlayer = player1;
    
    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
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
        const moveSuccess = Game.gameboard.placeToken(row, col, activePlayer.token);
        
        if (moveSuccess) {
            checkWinner(activePlayer);
            switchPlayer();
            logBoard();
            checkDraw();
        }
    };

    const logBoard = () => {
        console.log(Game.gameboard.getBoard());
    };

    const checkDraw = () => {
        if (isBoardFull()) {
            console.log("It's a draw!");
            Game.resetGame();
        }
    };

    const isBoardFull = () => {
        const board = Game.gameboard.getBoard();
        return board.every(row => row.every(cell => cell !== ""));
    };

    const checkWinner = (activePlayer) => {
        const board = Game.gameboard.getBoard();

        for (let condition of winConditions) {
            if (checkCondition(board, condition, activePlayer)) {
                console.log(`${activePlayer.name} wins!`);
                Game.resetGame();
                return;
            }
        }
    };

    const checkCondition = (board, condition, activePlayer) => {
        return condition.every(([row, col]) => board[row][col] === activePlayer.token);
    };

    const gameboard = Gameboard();

    const resetGame = () => {
        Game.gameboard = Gameboard();
    };

    return { playRound, gameboard, resetGame };
})();

// Example usage
Game.playRound(0, 0);


