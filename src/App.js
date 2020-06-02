import React, { Component } from 'react'
import './App.css';
import Board from './components/Board.js'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={ // making dynamic array = []
      squares: Array(9).fill(null), // static array (9 squares)
      isXNext: true, // if it's true then X, false then O // also need to send as a prop to <Board>
      histories: [],
      history: [] // {square: square at that moment, isXNext: the value at that moment} // will look like [{},{},{}...]

    };
  }
  // 2. this was in <Board>: squares={this.state.squares} isXNext={this.state.isXNext}
  // 2.1 ^ too long, so we're gonna do {...state}

  setTheState = (obj) => { // this function will set the state all the time // pass object from Board.js
    this.setState(obj)
    // console.log(obj.history.isXNext);
    // let newHistory = this.state.histories.concat([{
    //   squares: this.state.squares,
    //   isXNext: obj.history.isXNext
    // }])
    // this.setState({
    //   squares: obj.squares,
    //   isXNext: obj.isXNext,
    //   histories: newHistory
    // })
  } // then send "setTheState={this.setTheState}" into the <Board>

  // goToIndex = (i) => {
  //   console.log(i);
  //   console.log(this.state.histories.length)
  //   let newHistory = this.state.histories.splice(i+1)
  //   console.log(newHistory.length)
  //   this.setState({
  //     squares: newHistory[newHistory.length-1].squares,
  //     histories: newHistory
  //   })
  // }

  timeTravel = (id) => {
    console.log("back to back",id)
    // set your squares and isXNext value to the previous history (exactly the history you clicked)
    let newHistory = this.state.history.slice(0,id)
    console.log(newHistory.length)
    this.setState({
      squares: newHistory[newHistory.length-1].squares,
      history: newHistory
    })
  }


  render() {

    return (
      <div>
        <div className="row">
          <Board {...this.state} setTheState={this.setTheState}/>
          <div>
            history {this.state.history.map((item,idx) => {
              return <div><button onClick={()=>this.timeTravel(idx)}>Go to Move #{idx+1}
              </button></div>})}
          </div>
          {/* <ul className="history-area">{this.state.histories.map((history,index) => (
             <li><button onClick={(i)=>this.goToIndex(index)}>Move{index.squares} {index.isNext}</button></li>
          ))}</ul> */}
        </div>
      </div>
    )
  }
}
