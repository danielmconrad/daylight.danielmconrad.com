import React, { Component } from 'react';

import WeatherIcon from '../WeatherIcon';
import styles from './index.css';

class WeatherConditions extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    units: React.PropTypes.oneOf(['celcius', 'imperial']),
    weather: React.PropTypes.object,
  };

  static defaultProps = {
    className: '',
    units: 'imperial',
    weather: null,
  };

  getTemperature() {
    const { temp_f, temp_c } = this.props.weather.current_observation;
    const temp = this.props.units === 'celcius' ? temp_c : temp_f;

    return Math.round(temp);
  }

  getUnits() {
    return this.props.units === 'celcius' ? 'C' : 'F';
  }

  render() {
    if (!this.props.weather) return null;

    return (
      <div className={[styles.WeatherConditions, this.props.className].join(' ')}>
        <div className={styles.temperature}>
          <WeatherIcon
            className={styles.icon}
            icon={this.props.weather.current_observation.icon}
          />
          &nbsp;
          {this.getTemperature()}°{this.getUnits()}
        </div>
      </div>
    );
  }
}

export default WeatherConditions;
