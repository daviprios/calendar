import React, { Component } from 'react';
import './Calendar.css';

import Days from './Days/Days';
import MonthYearSearch from './Days/MonthYear';

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      day: new Date().getUTCDate(),
      month: new Date().getUTCMonth() + 1,
      year: new Date().getUTCFullYear(),
      monthNames: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    };

    this.RawChangeDate = this.RawChangeDate.bind(this);
  }

  MonthName(){
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

  CheckDate(month, year){
    let AllMonthDays = [0];

    if ((year % 4 === 0 && year % 100 !== 0 ) || (year % 400 === 0)){
      AllMonthDays = [0,31,29,31,30,31,30,31,31,30,31,30,31];
    } else AllMonthDays = [0,31,28,31,30,31,30,31,31,30,31,30,31];

    return AllMonthDays[month];
  }

  GetWeekDay(day, month, year){
    if( isNaN(day) || isNaN(month) || isNaN(year) || day <= 0 || day > 31 || month <= 0 || month > 12 || year <= 0){
      console.log("Invalid Date");
      return;
    }

    //Discovering week day
    let century = year % 400;
    let decade = century;
  
    if(century < 100)
      century = 2;
    else if(century < 200){
      century = 0;
      decade -= 100;
    }
    else if(century < 300){
      century = 5;
      decade -= 200;
    }
    else if(century < 400){
      century = 3;
      decade -= 300;
    }
  
    let division = parseInt(decade / 12);
    let remainder = decade % 12;
    let secondDivision = parseInt(remainder / 4);

    let weekDay = century + division + remainder + secondDivision;

    //Discovering reference doomsday
    switch (month) {
      case 1:
        if ( ( year % 4 === 0 && year % 100 !== 0 ) || (year % 400 === 0) ){
          weekDay -= 4 - day;
          break;
        }
        weekDay -= 3 - day;
        break;
      case 2:
        if ( ( year % 4 === 0 && year % 100 !== 0 ) || (year % 400 === 0) ){
          weekDay -= 29 - day;
          break;
        }
        weekDay -= 28 - day;
        break;
      case 3:
        weekDay -= 14 - day;
        break;
      case 4:
        weekDay -= 4 - day;
        break;    
      case 5:
        weekDay -= 9 - day;
        break;
      case 6:
        weekDay -= 6 - day;
        break;
      case 7:
        weekDay -= 11 - day;
        break;
      case 8:
        weekDay -= 8 - day;
        break;
      case 9:
        weekDay -= 5 - day;
        break;
      case 10:
        weekDay -= 10 - day;
        break;
      case 11:
        weekDay -= 7 - day;
        break;
      case 12:
        weekDay -= 12 - day;
        break;
      default:
        break;
    }

    while(weekDay > 6){
      weekDay -= 7;
    }
  
    return weekDay;
  }

  render() {
    return (
      <div className="container">
        <div>
          <MonthYearSearch changeDate={this.RawChangeDate} currentMonth={this.state.month} currentYear={this.state.year} />
        </div>
        <div className="top-container">
          <span className="material-icons button-month-left" onClick={() => this.ChangeDate(false)} >keyboard_arrow_left</span>
          <div className="date">
            <span className="month" >{this.MonthName()} - </span>
            <span className="year" >{this.state.year}</span>
          </div>
          <span className="material-icons button-month-right" onClick={() => this.ChangeDate(true)} >keyboard_arrow_right</span>
        </div>
        <div>
          <Days dayweek={this.GetWeekDay(1,this.state.month,this.state.year)} monthdays={this.CheckDate(this.state.month, this.state.year)} />
        </div>
      </div>
    )
  }
}