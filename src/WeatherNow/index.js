import React, { Component } from 'react';
import './index.css';

class WeatherNow extends Component {
  render() {
    return (
      <div className="WeatherNow">
        <div className="temperature">
          <i className="wi wi-night-sleet"></i> 73°F
        </div>
      </div>
    );
  }
}

export default WeatherNow;
