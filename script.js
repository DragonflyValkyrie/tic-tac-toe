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

    const playRound = (row, col) => {
        const moveSuccess = gameboard.placeToken(row, col, activePlayer.token);
        if (moveSuccess) {
            switchPlayer();
            console.log(Game.gameboard.getBoard());
        }
        // Check if player wins

    };

    const gameboard = Gameboard();

    return { playRound, gameboard };
})();

// Example usage
Game.playRound(0, 0);
