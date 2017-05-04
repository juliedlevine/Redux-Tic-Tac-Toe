import React from 'react';

export default class ScoreBoard extends React.Component {
    render () {
        return (
            <div className="score">
                <div className="winner-declaration">{this.props.message}</div>
                <div className="scoreBoard">
                    <table>
                        <tbody>
                            <tr>
                                <th>X Wins</th>
                                <th>O Wins</th>
                            </tr>
                            <tr>
                                <td>{this.props.xwins}</td>
                                <td>{this.props.owins}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {this.props.message.length > 3 ? <button onClick={this.props.playAgain}>Play again</button> : <br/>}
            </div>
        );
    }
}
