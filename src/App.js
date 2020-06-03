import React, { Component } from 'react'
import './App.css';
import Board from './components/Board.js'
import FacebookLogin from 'react-facebook-login';
import TimeCounting from './components/TimeCounting.js'

// const fbAppId = process.env.FB_LOGIN_APP_ID
const fbAppId = "709973209815221"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { // making dynamic array = []
      squares: Array(9).fill(null), // static array (9 squares)
      isXNext: true, // if it's true then X, false then O // also need to send as a prop to <Board>
      histories: [],
      history: [], // {square: square at that moment, isXNext: the value at that moment} // will look like [{},{},{}...]
      topRank: [], // A.21 add empty array here
      isLogIn: false, // A.22 if no user, will ask for FB login
      username: "",
      time: 0,
      postScore: false,
      win: null
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
    console.log("back to back", id)
    // set your squares and isXNext value to the previous history (exactly the history you clicked)
    let newHistory = this.state.history.slice(0, id)
    console.log(newHistory.length)
    this.setState({
      squares: newHistory[newHistory.length - 1].squares,
      history: newHistory
    })
  }

  getData = async () => {
    let url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data = await fetch(url)
    let result = await data.json()
    this.setState({ ...this.state, topRank: result.items }) // A.20 items is the key of the object
    console.log("what is the result?", result)
  }

  componentDidMount() { // A.18 not using "getEffect" bc this is class component
    this.getData();
  }  // A.19 now have to show on page via setState

  responseFacebook = (response) => {
    console.log("FB response",response.name)
    this.setState({ isLogIn: true })
    this.setState({...this.state,username:response.name})
    // if(user === null){
    //   return (facebook login) // need to add facebook login here. also need to make duration data
  }


  render() {

    return (
      <div>
      <div className="App">
        {this.state.isLogIn ? <div>{this.state.username}</div> : <FacebookLogin
          autoLoad={false}
          appId={fbAppId}
          fields="name,email,picture"
          callback={this.responseFacebook} />}
      </div>
      <div className="row">
        <Board {...this.state} setTheState={this.setTheState} />
        <TimeCounting abc={this.state.time}/>
        <div>
          <h1>History</h1> 
          {this.state.history.map((item, idx) => {
            return <div><button onClick={() => this.timeTravel(idx)}>Go to Move #{idx + 1}
            </button></div>
          })}
        </div>
      </div>    
        <div>
          <h3>Top rank data</h3>
          <div>{this.state.topRank.map(item => { return <div>{item.player}:{item.score}</div> })}
          </div>
        </div>

        {/* <ul className="history-area">{this.state.histories.map((history,index) => (
             <li><button onClick={(i)=>this.goToIndex(index)}>Move{index.squares} {index.isNext}</button></li>
          ))}</ul> */}
      </div>
      // </div>
    );
  }
}