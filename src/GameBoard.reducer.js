const INITIAL_STATE = {
    currentPlayer: 'X',
    board: [null, null, null, null, null, null, null, null, null],
    message: '',
    xwins: 0,
    owins: 0
}
export default function gameBoardReducer(state = INITIAL_STATE, action) {

    // Check for winner function. Takes in current board and current player
    function checkWinner(board, player) {
        let b = board;
        if (player === b[0] && player === b[1] && player === b[2]) {
            return true;
        } else if (player === b[3] && player === b[4] && player === b[5]) {
            return true;
        } else if (player === b[6] && player === b[7] && player === b[8]) {
            return true;
        } else if (player === b[0] && player === b[3] && player === b[6]) {
            return true;
        } else if (player === b[1] && player === b[4] && player === b[7]) {
            return true;
        } else if (player === b[2] && player === b[5] && player === b[8]) {
            return true;
        } else if (player === b[0] && player === b[4] && player === b[8]) {
            return true;
        } else if (player === b[2] && player === b[4] && player === b[6]) {
            return true;
        } else {
            return false;
        }
    }

    // Check for draw - takes in current board and result of check winner function (t / f)
    function checkDraw(board, winner) {
        // If the board has no empty spots and there is no winner, then there is a drw
        if (!board.includes(null) && winner === false) {
            return true;
        } else {
            return false;
        }
    }

    // Player clicks a square
    if (action.type === 'move') {
        // Make a copy of the board using slice
        let newBoard = state.board.slice();
        // Modify the copy to switch out null for the letter of the current player
        newBoard.splice(action.index, 1, state.currentPlayer);
        // Check for winner and check for draw
        let winner = checkWinner(newBoard, state.currentPlayer);
        let draw = checkDraw(newBoard, winner);

        // If there's a winner, update the state accordingly
        if (winner) {
            if (state.currentPlayer === 'X') {
                return Object.assign({}, state, {
                    board: newBoard,
                    message: 'Player ' + state.currentPlayer + ' Wins!',
                    xwins: state.xwins + 1
                });
            } else {
                return Object.assign({}, state, {
                    board: newBoard,
                    message: 'Player ' + state.currentPlayer + ' Wins!',
                    owins: state.owins + 1
                });
            }

        // If there's a draw, update the state accordinlgy
        } else if (draw) {
            return Object.assign({}, state, {
                board: newBoard,
                message: 'Stalemate!'
            });

        // If no winner and no draw, update the board and switch to the other player.
        } else {
            let currentPlayer;
            if (state.currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
            }
            return Object.assign({}, state, {
                board: newBoard,
                currentPlayer: currentPlayer,
            });
        }

    // Play again button click. Reset to inital state except don't update score counts
    } else if (action.type === 'playAgain') {
        return Object.assign({}, state, {
            currentPlayer: 'X',
            board: [null, null, null, null, null, null, null, null, null],
            message: '',
        });
    }

    // Catch all, return state.
    return state
}
