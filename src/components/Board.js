import React, { Component } from 'react'
import Square from './Square'
import './Board.css'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]}/> // need to send onClick (onClick works for div but not component)
    }

    boxClick = (id) => { // change the value from null to 'x' at the index number id
        let squaresFromApp = this.props.squares.slice()
        if(this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            return;
        }
        // console.log("squares you got so far is:",squaresFromApp)
        squaresFromApp[id]= this.props.isXNext?'X':'O' // id is from index value
        // console.log("after change:",squaresFromApp)
        // this.setState({squares:squaresFromApp, isXNext:!this.props.isXNext}) // this isn't working to show 'O'

        
        // let array = this.props.history.slice()
        // array = array.concat({squares:squaresFromApp,isXNext:!this.props.isXNext})
        this.props.setTheState({
            squares:squaresFromApp, 
            isXNext:!this.props.isXNext, 
            history:[...this.props.history.slice(),{squares:squaresFromApp.slice(),isXNext:!this.props.isXNext}] // this is the current moment to be saved into history
        }) // has ({}) because {} is an object from App.js
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            // create a new array with the same values as each winning combo. i.e. when i = 0 the new array of [a, b, c] is [0, 1, 2]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
        return null;

    }

    render() {
        let status=''
        const winner = this.calculateWinner(this.props.squares)

        if(winner){
            status = `Winner: ${winner}`
        }else{
            status = `Next player: ${+this.props.isXNext?'X':'O'}`
        }

       

        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <h2>{status}</h2>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
