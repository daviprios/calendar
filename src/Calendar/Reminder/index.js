import React, { Component } from 'react';
import './index.css';

export default class DateReminder extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
    };
  }

  render() {
    let month = new Date(this.state.date).getUTCMonth();
    if(month === 0) month = 12;

    return (
      <div className="datereminder-container">
        <span className="date-name" >{new Date(this.state.date).getUTCDate()}/{month}/{new Date(this.state.date).getUTCFullYear()}</span>
        <button className="remove" onClick={() => this.props.removeReminder(this.state.date)} >Remove</button>
        <button className="goto" onClick={() => this.props.changeDate(month, new Date(this.state.date).getUTCFullYear())} >Go to</button>
      </div>
    )
  }
}
