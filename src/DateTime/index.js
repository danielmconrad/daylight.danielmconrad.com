import React, { Component } from 'react';
import moment from 'moment';

import './index.css';

class DateTime extends Component {

  constructor() {
    super();
    this.setTime = this.setTime.bind(this);
    this.state = {
      momentTime: moment(),
      isHalfTick: false,
    };
  }

  setTime() {
    this.setState({
      momentTime: moment(),
      isHalfTick: !this.state.isHalfTick,
    });
  }

  componentDidMount() {
    setInterval(this.setTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setTime);
  }

  render() {
    const { momentTime, isHalfTick } = this.state;

    return (
      <div className="DateTime">
        <div className="day">{momentTime.format('dddd')}</div>
        <div className="date">{momentTime.format('MMMM Do')}</div>
        <div className="time">
          {momentTime.format('h')}<span className={isHalfTick ? 'sep hide' : 'sep'}>:</span>{momentTime.format('mm')}
          <span className="period">{momentTime.format('A')}</span></div>
        <h1></h1>
      </div>
    );
  }
}

export default DateTime;
