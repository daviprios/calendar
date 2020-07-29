import React, { Component } from 'react';
import './index.css';

export default class MonthYearSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      month: this.props.currentMonth,
      year: this.props.currentYear,
    };

    this.eventHandler = this.eventHandler.bind(this);
    this.Verify = this.Verify.bind(this);
  }

  Verify(event){
    if(this.state.month > 12 || this.state.month < 1 || this.state.year === 0 || this.state.year < 100){
      alert("Invalid Date\nAccepts only date between 1-12/100-9999");
      event.preventDefault();
      return;
    }
    this.props.changeDate(this.state.month, this.state.year);
    event.preventDefault();
  }

  eventHandler(event){
    if(isNaN(Number(event.target.value)) || String(event.target.value).length > 4)
      return;
    this.setState({ [event.target.id]: Number(event.target.value) });
  }

  render() {
    return (
      <div className="form-container">
        <form className="form-grid" onSubmit={this.Verify}>
          <span className="label" >Month:</span>
          <input className="input" id="month" type="text" onChange={this.eventHandler} value={this.state.month} ></input>
          <span className="label" >Year:</span>
          <input className="input" id="year" type="text" onChange={this.eventHandler} value={this.state.year} ></input>
          <button className="button" type="submit">GO!</button>
        </form>
      </div>
    )
  }
}
