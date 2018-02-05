import React, { Component } from 'react';
import { ChangeValue } from '../actions/index';
import { connect } from 'react-redux'

class Cell extends Component {

  constructor(props){
    super(props)
    this.handleChanged = this.handleChanged.bind(this)
    this.state = {
      cell : this.props.cell,
      value : this.props.cell.val
    }
  }

  componentWillReceiveProps() {    
    this.setState({ cell : this.props.cell, value : this.props.cell.val })
    //console.log("cell changed=>", this.state.cell)
  }

  handleChanged(evt){
    if (evt.target.validity.valid){
      let newCell = this.state.cell
      newCell.val = parseInt(evt.target.value)
      if (isNaN(newCell.val)) newCell.val = null
      this.props.changeCell(newCell)
    }
    
  }

  render() {
    return (
      /*<input 
        className={'cell '+ (this.state.cell.hasConflict ? 'has-error' : '')} id={this.state.cell.indexv+this.state.cell.indexh} 
        type="text" pattern="[0-9]*" onChange={this.handleChanged} readOnly={!this.state.cell.editable}
        value={this.state.value !== null ? this.state.value : '' } maxLength="1"/>*/
        <input 
        className={'cell '+ (this.props.cell.hasConflict ? 'has-error ' : '') + (!this.props.cell.editable ? 'readonly' : '')} id={this.props.cell.indexv+this.props.cell.indexh} 
        type="text" pattern="[0-9]*" onChange={this.handleChanged} readOnly={!this.props.cell.editable}
        value={this.props.cell.val !== null ? this.props.cell.val : '' } maxLength="1"/>
    )
  }
}


export default Cell