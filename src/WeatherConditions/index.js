import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WeatherIcon from '../WeatherIcon';
import styles from './index.css';

class WeatherConditions extends Component {

  static propTypes = {
    className: PropTypes.string,
    units: PropTypes.oneOf(['metric', 'imperial']),
    weather: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    units: 'imperial',
    weather: null,
  };

  getTemperature() {
    const { temp_f, temp_c } = this.props.weather.current_observation;
    const temp = this.props.units === 'metric' ? temp_c : temp_f;

    return Math.round(temp);
  }

  getUnits() {
    return this.props.units === 'metric' ? 'C' : 'F';
  }

  render() {
    if (!this.props.weather) return null;

    const {icon, display_location} = this.props.weather.current_observation;

    return (
      <div className={[styles.WeatherConditions, this.props.className].join(' ')}>
        <div className={styles.temperature}>
          <WeatherIcon
            className={styles.icon}
            icon={icon}
          />
          &nbsp;
          {this.getTemperature()}°{this.getUnits()}
          <div className={styles.location}>
            {display_location.full}
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherConditions;
