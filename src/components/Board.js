import React, { Component } from 'react'
import Square from './Square'
import './Board.css'

let myTime;

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]}/> // need to send onClick (onClick works for div but not component)
    }

    timecounting = () => {
        myTime = setInterval(() => {
            this.props.setTheState({time: this.props.time+1})
        }, 1000)
    }

    boxClick = (id) => { // change the value from null to 'x' at the index number id
        let squaresFromApp = this.props.squares.slice()

        if(squaresFromApp.every(item => item === null)){
            this.timecounting()
        }

        if(this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            return;
        }
        // console.log("squares you got so far is:",squaresFromApp)
        squaresFromApp[id]= this.props.isXNext?'X':'O' // id is from index value
        // console.log("after change:",squaresFromApp)
        // this.setState({squares:squaresFromApp, isXNext:!this.props.isXNext}) // this isn't working to show 'O'

        //check the winner
        const winner = this.calculateWinner(squaresFromApp)

        if(winner && this.props.postScore === false){
            this.postData(); // A. this will post the data
            //this.props.setTheState({postScore: true, win: winner})
            this.setState({status: `Winner: ${winner}`}) 
            clearInterval(myTime)

        }else{
            this.setState({status:`Next player: ${+this.props.isXNext?'X':'O'}`})
        }

        
        // let array = this.props.history.slice()
        // array = array.concat({squares:squaresFromApp,isXNext:!this.props.isXNext})
        this.props.setTheState({
            squares:squaresFromApp, 
            isXNext:!this.props.isXNext, 
            history:[...this.props.history.slice(),{squares:squaresFromApp.slice(),isXNext:!this.props.isXNext}], // this is the current moment to be saved into history
            // score:[...this.props.elapsedTime]
        }) // has ({}) because {} is an object from App.js

        // let startTime = Date.now()





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

    postData = async() => {
        let data = new URLSearchParams(); 
        data.append("player", this.props.username); 
        data.append("score", this.props.time); 
        // console.log("name?",this.props.username)
        // console.log("score?",this.props.time)
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`; 
        const response = await fetch(url, { // A.5 await => need to add async to function // A.7 this is an object--data I want to send; 4 keys (info we must send)
            method: "POST", // A.8 to tell data that this is a post 
            headers: { // A9. need to post header
                "Content-Type": "application/x-www-form-urlencoded" // A.10 just to tell the computer what the content type is
            },
            body: data.toString(), // A.11 actual data you will send // A.13 will change the object to a string--can't send object itself
            json: true // A.12 will send as JSON type (object-text-type)
        });
        console.log("response?",response)
    }

    render() {

       

        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <h2>{this.state.status}</h2>
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
