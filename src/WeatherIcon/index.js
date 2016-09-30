import React, { Component } from 'react';

/*

  CONDITION REFERENCE

*/

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
    switch (true) {
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
