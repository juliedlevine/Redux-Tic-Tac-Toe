import React from 'react';
import classnames from 'classnames';

export default class GameBoard extends React.Component {
    render () {
        return (
            <div className={classnames('container', {'disabled' : this.props.message.length >3})}>

            {/* Loop over board array and add div for each square. Use classnames to add classes conditionally */}
            {this.props.board.map((square, index) =>
                <div key={index}
                    className={classnames('square', {
                        {/* Loop over board array and add div for each square */}
                        'disabled' : this.props.board[index] != null,
                        'xhover' : this.props.currentPlayer === 'X',
                        'ohover' : this.props.currentPlayer === 'O'
                    })}
                    onClick={() => this.props.move(index)}>
                    <p>{this.props.board[index]}</p></div>
                )}
            </div>
        );
    }
}
