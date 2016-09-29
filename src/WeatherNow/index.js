import React, { Component } from 'react';

import WeatherIcon from '../WeatherIcon';
import './index.css';

class WeatherNow extends Component {

  propTypes: {
    now: React.PropTypes.object,
    units: React.PropTypes.string,
  }

  render() {
    if (!this.props.now) return null;

    const { units } = this.props;
    const { main, weather } = this.props.now;

    const temperature = Math.round(main.temp);

    return (
      <div className="WeatherNow">
        <div className="temperature">
          <WeatherIcon conditionId={weather[0].id} /> {temperature}°{units}
        </div>
      </div>
    );
  }
}

export default WeatherNow;
