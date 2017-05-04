import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import gameBoardReducer from './GameBoard.reducer';
import './index.css';

// Add reducer - one reducer for this game
const reducer = Redux.combineReducers({
    gameBoard: gameBoardReducer
})

// Add the store
const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Game Board container component
const GameBoardContainer = ReactRedux.connect(
    state => ({
        currentPlayer: state.gameBoard.currentPlayer,
        board: state.gameBoard.board,
        message: state.gameBoard.message
    }),
    dispatch => ({
        move: (index) => dispatch({
            type: 'move',
            index: index
        })
    })
)(GameBoard)

// Score container component
const ScoreBoardContainer = ReactRedux.connect(
    state => ({
        xwins: state.gameBoard.xwins,
        owins: state.gameBoard.owins,
        message: state.gameBoard.message
    }),
    dispatch => ({
        playAgain: () => dispatch({
            type: 'playAgain'
        })
    })
)(ScoreBoard)

// Render both compoenets to the dom, wrap in provider and connect to store
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <div>
            <div className="header">TIc Tac Toe</div>
            <GameBoardContainer />,
            <ScoreBoardContainer />
        </div>
    </ReactRedux.Provider>,
    document.getElementById('root')
);
