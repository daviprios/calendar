import React, { Component } from 'react';
import './Days.css';

import Day from './Day';

export default class Days extends Component {
  constructor(props){
    super(props);
    this.state = {
      offset: [],
      days: [],
      restset: [],
    };
  }

  componentDidMount(){
    this.Offset();
    this.Present();
    this.OffsetRight();
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.Offset();
      this.Present();
      this.OffsetRight();
    }
  }

  Offset(){
    let offsetlet = [];
    for (let x = 0; x < this.props.dayweek; x++) {
      offsetlet.push(x);
    }
    this.setState({ offset: offsetlet });
  }

  Present(){
    let dias = [];
    for (let x = 1; x <= this.props.monthdays; x++) {
      dias.push(x);
    }
    this.setState({ days: dias });
  }

  OffsetRight(){
    let offset = 0;
    let comparison = this.props.monthdays + this.props.dayweek;

    if (comparison > 28 && comparison < 35)
      offset = 35 - comparison;
    else if (comparison > 35 && comparison < 42)
      offset = 42 - comparison;

    let offsetright = [];
    for (let x = 1; x <= offset; x++) {
      offsetright.push(x);
    }
    this.setState({ restset: offsetright });
  }

  render() {
    return (
      <>
        <div className="calendar-grid">
          {this.state.offset.map(days => {
            return <Day key={days + 40} isBlank size="35px" number="" font="10px" />;
          })}
          {this.state.days.map(day => {
            return <Day key={day} size="35px" number={day} font="10px" />;
          })}
          {this.state.restset.map(days => {
            return <Day key={days + 50} isBlank size="35px" number="" font="10px" />;
          })}
        </div>
      </>
    )
  }
}
