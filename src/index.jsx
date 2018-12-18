import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function Board (props) {
    const status = `Next Turn: ${props.turn}`
    function renderSquare(i) {
        return (
            <Square value={props.squares[i]}
                    onClick={() => props.onClick(i)}/>
        )
    }
    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            history: [Array(9).fill(null)],
            turn: 'X'
        }
    }

    getCurrentSquares() {
        const current = this.state.history[this.state.history.length -1 ]
        console.log('Current state', current)
        return current
    }
    changeTurn(){
        console.log('History', this.state.history)
        this.setState({turn: this.state.turn === 'X' ? 'O' : 'X'})
    }
    handleClick(i){
        const newSquares = {...this.getCurrentSquares()}
        newSquares[i] = this.state.turn
        console.log('Index', i)

        this.setState({history: this.state.history.concat(newSquares)})
        this.changeTurn()
        console.log('push', i, this.state.turn)
    }

    render() {
        const current = this.getCurrentSquares()
        const winner = null
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current} turn={this.state.turn} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{ /* Status */}</div>
                    <div>{/* TODO */}</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Game/>, document.getElementById('root'))
