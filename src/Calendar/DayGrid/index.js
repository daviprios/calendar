import React, { Component } from 'react';
import './index.css';

import Day from '../Day';

export default class Days extends Component {
  constructor(props){
    super(props);
    this.state = {
      offset: [],
      days: [],
      restset: [],
      weekname: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentFirstDay: 0,
      monthDays: 1,
    };
  }

  componentDidMount(){
    this.setState({ monthDays: this.CheckDate(this.props.month, this.props.year),
      currentFirstDay: this.GetWeekDay(1, this.props.month, this.props.year),
    },
    () => this.setState({ offset: this.Offset(this.state.currentFirstDay),
      days: this.Present(this.state.monthDays),
      restset: this.OffsetRight(this.state.monthDays, this.state.currentFirstDay) })
    );
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({ monthDays: this.CheckDate(this.props.month, this.props.year),
        currentFirstDay: this.GetWeekDay(1, this.props.month, this.props.year),
      },
      () => this.setState({ offset: this.Offset(this.state.currentFirstDay),
        days: this.Present(this.state.monthDays),
        restset: this.OffsetRight(this.state.monthDays, this.state.currentFirstDay) })
      );  
    }
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
    let centuryDoomsday = year % 400;
    let decade = centuryDoomsday;
  
    if(centuryDoomsday < 100)
      centuryDoomsday = 2;
    else if(centuryDoomsday < 200){
      centuryDoomsday = 0;
      decade -= 100;
    }
    else if(centuryDoomsday < 300){
      centuryDoomsday = 5;
      decade -= 200;
    }
    else if(centuryDoomsday < 400){
      centuryDoomsday = 3;
      decade -= 300;
    }
  
    let decadeDivision = parseInt(decade / 12);
    let decadeRemainder = decade % 12;
    let secondDivision = parseInt(decadeRemainder / 4);

    let weekDay = centuryDoomsday + decadeDivision + decadeRemainder + secondDivision;

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

    while(weekDay > 6)  
      weekDay -= 7;
    
    while(weekDay < 0)
      weekDay += 7;

    return weekDay;
  }

  Offset(dayweek){
    let offset = [];
    for (let x = 0; x < dayweek; x++) {
      offset.push(x);
    }
    return offset;
  }

  Present(monthdays){
    let days = [];
    for (let x = 1; x <= monthdays; x++) {
      days.push(x);
    }
    return days;
  }

  OffsetRight(monthdays, dayweek){
    let offset = 0;
    let comparison = monthdays + dayweek;

    if (comparison > 28 && comparison < 35)
      offset = 35 - comparison;
    else if (comparison > 35 && comparison < 42)
      offset = 42 - comparison;

    let restset = [];
    for (let x = 1; x <= offset; x++) {
      restset.push(x);
    }
    return restset;
  }

  render() {
    return (
      <>
        <div className="calendar-grid">
          {this.state.weekname.map(week => {
            return <Day key={week} isBlank height="15px" number={week} />;
          })}
          {this.state.offset.map(days => {
            return <Day key={days + 40} isBlank />;
          })}
          {this.state.days.map(day => {
            return <Day key={day} number={day} remindDate={this.props.remindDate} />;
          })}
          {this.state.restset.map(days => {
            return <Day key={days + 50} isBlank />;
          })}
        </div>
      </>
    )
  }
}
