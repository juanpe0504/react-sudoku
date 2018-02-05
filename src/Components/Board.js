import React, { Component } from 'react';
import BigCell from './BigCell'
import { connect } from 'react-redux'
import storeApp from '../store/index';
import { ChangeValue } from '../actions/index';

const mapStateToProps = state => {
  return { bigcells: state.actualGame };
}

let mapDispatchToProps = (dispatch) => {
  return {
    changeCell: cell => dispatch(ChangeValue(cell))
  }
}

class Board extends Component {
 
  constructor(props){
    super(props)
    this.state = {
      bigcells : this.props.bigcells
    }
  }

  componentWillReceiveProps() {    
    this.setState({ bigcells : this.props.bigcells })
  }


  render() {
    return (
      <div className="containerTablero">
        {
          this.props.bigcells.map(
            (bigcell, index) => {
              return (<BigCell bigcell={bigcell} key={index} changeCell={this.props.changeCell}/>)
            }
          ) 
        }
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
