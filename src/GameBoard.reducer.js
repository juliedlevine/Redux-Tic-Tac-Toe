const INITIAL_STATE = {
    currentPlayer: 'X',
    board: [null, null, null, null, null, null, null, null, null],
    message: '',
    xwins: 0,
    owins: 0
}
export default function gameBoardReducer(state = INITIAL_STATE, action) {
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

    function checkDraw(board, winner) {
        if (!board.includes(null) && winner === false) {
            return true;
        } else {
            return false;
        }
    }

    // Check for X winner
    if (action.type === 'move') {
        let newBoard = state.board.slice();
        newBoard.splice(action.index, 1, state.currentPlayer);
        let winner = checkWinner(newBoard, state.currentPlayer);
        let draw = checkDraw(newBoard, winner);
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
        } else if (draw) {
            return Object.assign({}, state, {
                board: newBoard,
                message: 'Stalemate!'
            });
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

    } else if (action.type === 'playAgain') {
        return Object.assign({}, state, {
            currentPlayer: 'X',
            board: [null, null, null, null, null, null, null, null, null],
            message: '',
        });
    }
    return state
}
