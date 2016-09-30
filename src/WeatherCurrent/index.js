import React, { Component } from 'react';

// import WeatherIcon from '../WeatherIcon';
import './index.css';

class WeatherCurrent extends Component {

  static propTypes = {
    current: React.PropTypes.object,
    units: React.PropTypes.oneOf(['celcius', 'imperial'])
  }

  static defaultProps = {
    units: 'imperial',
  };

  getTemperature() {
    const { temp_f, temp_c } = this.props.current.current_observation;
    const temp = this.props.units === 'celcius' ? temp_c : temp_f;

    return Math.round(temp);
  }

  getUnits() {
    return this.props.units === 'celcius' ? 'C' : 'F';
  }

  render() {
    if (!this.props.current) return null;

    // const { icon } = this.props.current.current_observation;

    // <WeatherIcon icon={icon} />

    return (
      <div className="WeatherCurrent">
        <div className="temperature">
          {this.getTemperature()}°{this.getUnits()}
        </div>
      </div>
    );
  }
}

export default WeatherCurrent;
