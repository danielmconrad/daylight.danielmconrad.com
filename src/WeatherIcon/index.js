import React, { Component } from 'react';

/*

  CONDITION REFERENCE

*/

class WeatherIcon extends Component {

  static propTypes = {
    icon: React.PropTypes.string,
  }

  getClassFromIcon(icon) {
    switch (true) {
      default:
        return 'wi-rain';
    }
  }

  render() {
    const iconClass = this.getClassFromIcon(this.props.icon);

    return (
      <i className={'wi ' + iconClass} />
    );
  }
}

export default WeatherIcon;
