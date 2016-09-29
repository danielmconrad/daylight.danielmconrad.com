import React, { Component } from 'react';

/*

  CONDITION REFERENCE
  https://openweathermap.org/weather-conditions

*/

class WeatherIcon extends Component {

  propTypes: {
    conditionId: React.PropTypes.number,
  }

  getIconFromId(id) {
    switch (true) {
      case (200 <= id && id <= 299):
        return 'wi-thunderstorm';

      case (300 <= id && id <= 399):
        return 'wi-sprinkle';

      case (500 <= id && id <= 599):
        return 'wi-rain';

      case (600 <= id && id <= 699):
        return 'wi-snow';

      case (id === 701): return 'wi-sprinkle';
      case (id === 711): return 'wi-smoke';
      case (id === 721): return 'wi-smog';
      case (id === 731): return 'wi-sandstorm';
      case (id === 741): return 'wi-fog';
      case (id === 751): return 'wi-sandstorm';
      case (id === 761): return 'wi-dust ';
      case (id === 762): return 'wi-volcano';
      case (id === 771): return 'wi-windy';
      case (id === 781): return 'wi-tornado';

      case (801 <= id && id <= 899):
        return 'wi-cloud';

      case (id === 900): return 'wi-tornado';
      case (id === 901): return 'wi-hurricane';
      case (id === 902): return 'wi-hurricane';
      case (id === 903): return 'wi-thermometer';
      case (id === 904): return 'wi-thermometer';
      case (id === 905): return 'wi-windy';
      case (id === 906): return 'wi-hail';

      case (952 <= id && id <= 959):
        return 'wi-windy';

      case (960 <= id && id <= 962):
        return 'wi-thunderstorm';

      default:
        return 'wi-alien';
    }
  }

  render() {
    const iconClass = this.getIconFromId(this.props.conditionId);

    return (
      <i className={'wi ' + iconClass} />
    );
  }
}

export default WeatherIcon;
