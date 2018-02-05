import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Components/Board';
import { NewGame, AddSecond } from './actions/index';
import { connect } from 'react-redux'

let mapDispatchToProps = (dispatch) => {
  return {
    newGame: difficulty => dispatch(NewGame(difficulty)),
    addSecond : () => setInterval(() => {
                  dispatch(AddSecond());
                }, 1000)
  }
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {time: null, idInterval: null, isComplete : true}
    //this.handleNewGameEasy = this.handleNewGameEasy.bind(this)
  }

  handleNewGame(difficulty){
    this.props.newGame(difficulty)
    if(this.state.idInterval !== null){
      clearInterval(this.state.idInterval)
    }
    let id = this.props.addSecond()
    this.setState({idInterval:id})
  }

  getTimer(){

    function padleft(val){
      if(val<10) return '0'+val;
      return val
    }

    return padleft(this.props.time.getHours()) + ':' + 
           padleft(this.props.time.getMinutes()) + ':' + 
           padleft(this.props.time.getSeconds())
  }


  renderWinner(){
    return <div className="row containerTablero">
            <div className="col-md-6 col-md-offset-3">
              <div class="alert alert-success">
                <strong>¡Juego Completado en {this.getTimer()}!</strong>
              </div>
            </div>
          </div>
  }

  renderWinner(){
    return <div className="row containerTablero">
            <div className="col-md-6 col-md-offset-3">
              <div class="alert alert-success">
                <strong>¡Juego Completado en {this.getTimer()}!</strong>
              </div>
            </div>
          </div>
  }

  renderBoard(){
    return <div className="row">
            <div className="col-md-12">
              <Board bigcells = {[]}/>
            </div>
          </div>
  }

  renderTimer(){
    return <div className="row">
            <div className="col-md-12">
              <span>{this.getTimer()}</span>
            </div>
          </div>
  }

  renderGame(){
    if(this.props.isComplete)
      return this.renderWinner()
    else if(this.props.isComplete !== null)
      return (
        <div>
          {this.renderBoard()}
          {this.renderTimer()}
        </div>
      )
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4">
            <button type="button" className="btn btn-primary" onClick={(e) => this.handleNewGame('easy')}>
              new easy game</button>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary" onClick={(e) => this.handleNewGame('medium')}>
              new medium game</button>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary" onClick={(e) => this.handleNewGame('hard')}>
              new hard game</button>
          </div>
        </div>
        {this.renderGame()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { time: state.time, isComplete : state.isComplete };
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
