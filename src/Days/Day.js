import React, { Component } from 'react';
import './Day.css';

export default class Day extends Component {
  constructor(props){
    super(props);
    this.state = {
      isBlank: this.props.isBlank ? "blank" : "day",
    };
  }

  render() {
    return (
      <button className={this.state.isBlank} style={{width: this.props.size, height: this.props.size, fontSize: this.props.font}}>
        {this.props.number}
      </button>
    )
  }
}
