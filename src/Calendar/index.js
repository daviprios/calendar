import React, { Component } from 'react';
import './index.css';

import DayGrid from './DayGrid';
import SearchDate from './SearchDate';
import DateReminder from './Reminder';

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      day: new Date().getUTCDate(),
      month: new Date().getUTCMonth() + 1,
      year: new Date().getUTCFullYear(),
      monthNames: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      remindDates: [],
    };

    this.RawChangeDate = this.RawChangeDate.bind(this);
    this.RemindDate = this.RemindDate.bind(this);
    this.ForgetDate = this.ForgetDate.bind(this);
  }

  componentDidMount(){
    this.RemindDate(new Date().getDate());
  }

  RemindDate(day){
    let date = new Date(this.state.year, this.state.month, day).getTime();
    if(this.state.remindDates.indexOf(date) > -1)
      return;
    this.setState({ remindDates: [...this.state.remindDates, date] });
  }

  ForgetDate(date){
    let item = this.state.remindDates.indexOf(date);
    let remindDates = this.state.remindDates;
    remindDates.splice(item, 1);
    this.setState({ remindDates });
  }

  GetMonthName(){
    return this.state.monthNames[this.state.month];
  }

  RawChangeDate(month, year){
    this.setState({ month, year });
  }

  ChangeDate(isForward){
    let month = 0;
    isForward ? month = this.state.month + 1 : month = this.state.month - 1;
    if(month > 12){
      month -= 12;
      this.setState({ year: this.state.year + 1 });
    }
    else if(month < 1){
      month += 12 ;
      this.setState({ year: this.state.year - 1 });
    }
    this.setState({ month });
  }

  render() {
    return (
      <div className="container">
        <div>
          <SearchDate changeDate={this.RawChangeDate} currentMonth={this.state.month} currentYear={this.state.year} />
        </div>
        <div className="top-container">
          <span className="material-icons button-month-left" onClick={() => this.ChangeDate(false)} >keyboard_arrow_left</span>
          <div className="date">
            <span className="month" >{this.GetMonthName()} - </span>
            <span className="year" >{this.state.year}</span>
          </div>
          <span className="material-icons button-month-right" onClick={() => this.ChangeDate(true)} >keyboard_arrow_right</span>
        </div>
        <div>
          <DayGrid month={this.state.month} year={this.state.year} remindDate={this.RemindDate} />
        </div>
        <div className="reminder-block">
          <div className="reminder-text">
            <span className="reminder-title" >Dates to Remind</span>
            <br/>
            <span className="reminder-tip" >click in some day to remind it</span>
          </div>
          {this.state.remindDates.map(date => {
            let daycode = new Date(date).getTime();
            return <DateReminder key={daycode} date={daycode} removeReminder={this.ForgetDate} changeDate={this.RawChangeDate} />  
          })}
        </div>
      </div>
    )
  }
}