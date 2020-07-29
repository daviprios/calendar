import React, { Component } from 'react';
import './index.css';

export default class Day extends Component {
  constructor(props){
    super(props);
    this.state = {
      isBlank: this.props.isBlank ? "blank" : "day",
      width: this.props.width || this.props.size || "35px",
      height: this.props.height || this.props.size || "35px",
      font: this.props.font || "10px",
      number: this.props.number || "",
    };
  }

  render() {
    return (
      <button className={this.state.isBlank}
      onClick={() => { if(this.state.number > 0 && this.props.remindDate !== undefined) this.props.remindDate(this.state.number) }} 
      style={{width: this.state.width, height: this.state.height, fontSize: this.state.font}}>
        {this.state.number}
      </button>
    )
  }
}
