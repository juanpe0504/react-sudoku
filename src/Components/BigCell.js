import React, { Component } from 'react';
import Cell from './Cell'

const BigCell = (props) => 
                    <div className="containerBigCells">
                      {
                        props.bigcell.map(
                          (cell,index) => {
                            return (<Cell cell={cell} key={index} changeCell={props.changeCell}/>)
                          }
                        ) 
                      }
                    </div>

export default BigCell;
