import React, { Component } from 'react';
import './App.css';
import Calendar from './Calendar';

export default class App extends Component{
  render(){
    return (
      <div className="main">
        <Calendar />
      </div>
    );
  }
}
