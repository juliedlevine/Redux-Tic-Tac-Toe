import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import gameBoardReducer from './GameBoard.reducer';
import './index.css';

const reducer = Redux.combineReducers({
    gameBoard: gameBoardReducer
})

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
