import React, { Component } from 'react';

class WeatherIcon extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
  };

  static defaultProps = {
    className: '',
    icon: null,
  };

  getClassFromIcon(icon) {
    switch (icon) {

      // Clear
      case 'clear':           return 'wi-day-sunny';
      case 'sunny':           return 'wi-day-sunny';
      case 'partlysunny':     return 'wi-day-cloudy';
      case 'mostlysunny':     return 'wi-day-cloudy';

      // Rain
      case 'rain':            return 'wi-rain';
      case 'tstorms':         return 'wi-thunderstorm';
      case 'chancerain':      return 'wi-rain';
      case 'chancesleet':     return 'wi-sleet';
      case 'chancetstorms':   return 'wi-thunderstorm';
      case 'sleet':           return 'wi-sleet';

      // Snow
      case 'snow':            return 'wi-snow';
      case 'flurries':        return 'wi-snow-wind';
      case 'chanceflurries':  return 'wi-snow-wind';
      case 'chancesnow':      return 'wi-snow';

      // Cloudy
      case 'cloudy':          return 'wi-cloudy';
      case 'partlycloudy':    return 'wi-cloudy';
      case 'mostlycloudy':    return 'wi-cloudy';

      // Other
      case 'fog':             return 'wi-fog';
      case 'hazy':            return 'wi-day-haze';

      default:
        return 'wi-day-sunny';
    }
  }

  render() {
    let classes = [
      'wi',
      this.getClassFromIcon(this.props.icon),
      this.props.className,
    ];

    return (
      <i className={classes.join(' ')} />
    );
  }
}

export default WeatherIcon;
