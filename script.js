// Gameboard factory function
const Gameboard = () => {
    const board = [["", "", ""], ["", "", ""], ["", "", ""]];
    const getBoard = () => board;
    const placeToken = (row, col, player) => {
        if (board[row][col] === "") {
            board[row][col] = player;
            return true;
        } else {
            return false;
        }
    };
    return { getBoard, placeToken };
};

// Player factory function
const Player = (name, token) => {
    return { name, token };
};

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
        const moveSuccess = gameboard.placeToken(row, col, activePlayer.token);

        checkWinner(activePlayer);

        if (moveSuccess) {
            switchPlayer();
            console.log(Game.gameboard.getBoard());

            if (isBoardFull()) {
                console.log("It's a draw!");
            }
        }
    };

    const isBoardFull = () => {
        const board = Game.gameboard.getBoard();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === "") {
                    return false; // There is an empty cell, the board is not full
                }
            }
        }

        return true; // No empty cells found, the board is full
    };

    const checkWinner = (activePlayer) => {
        const board = Game.gameboard.getBoard();

        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i];
            const [a, b, c] = condition;
            const [rowA, colA] = a;
            const [rowB, colB] = b;
            const [rowC, colC] = c;

            if (
                board[rowA][colA] === activePlayer.token &&
                board[rowB][colB] === activePlayer.token &&
                board[rowC][colC] === activePlayer.token
            ) {
                console.log(`${activePlayer.name} wins!`);
                return;
            }
        }
    };

    const gameboard = Gameboard();

    return { playRound, gameboard };
})();

// Example usage
Game.playRound(0, 0);
