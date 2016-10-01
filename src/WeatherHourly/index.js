import React, { Component } from 'react';
import moment from 'moment';

import styles from './index.css';

class WeatherHourly extends Component {

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

  getHours() {
    let hours = [];

    const { hourly_forecast } = this.props.weather;

    for (let i = 0; i < hourly_forecast.length; i += 4) {
      hours.push(hourly_forecast[i]);
    }

    let maxTemp = -Infinity;
    let minTemp = Infinity;

    hours = hours.map((hour, index) => {
      const { english, metric } = hour.temp;
      const temp = parseInt(this.props.units === 'imperial' ? english : metric, 10);

      if (minTemp > temp) minTemp = temp;
      if (maxTemp < temp) maxTemp = temp;

      return {
        mDate: moment(parseInt(hour.FCTTIME.epoch + '000', 10)),
        temp: temp,
        icon: hour.icon,
        x: index * 160,
        xPrev: Math.max((index - 1) * 160, 0),
      };
    });

    let spreadTemp = maxTemp - minTemp;

    return hours.map((hour, i) => {
      const y = (((hour.temp - minTemp) / spreadTemp) * 80) + 100;

      return Object.assign(hour, {
        y: y,
        yPrev: (i === 0 ? y : hours[i-1].y),
      });
    }).slice(0, 7);
  }

  render() {
    if (!this.props.weather) return null;

    const unitFormat = this.props.units === 'celcius' ? 'C' : 'F';
    const hours = this.getHours();

    // <line className={styles.timeMarker} x1="280" x2="280" y1="210" y2="260" />

    return (
      <div className={[styles.WeatherHourly, this.props.className].join(' ')}>
        <svg className={styles.svg} viewBox="-40 0 1040 330" xmlns="http://www.w3.org/2000/svg">
          <g className={styles.legend}>
            <line id="bottom-line" x1="0" x2="960" y1="235" y2="235" />
            {hours.map((hour, i) => {
              return <text key={i} x={hour.x} y="295" textAnchor="middle">{hour.mDate.format('hh')}
                <tspan className={styles.small}>{hour.mDate.format('A')}</tspan>
              </text>
            })}
          </g>

          {/*
          <g className={styles.precipitation}>
            {hours.map((hour, i) => {
              return <g key={i}>
                <rect x="40" width="40" y="225" height="10" />
                <rect x="80" width="40" y="215" height="20" />
              </g>
            })}
          </g>
          */}
          <g className={styles.temps}>
            {hours.map((hour, i) => {
              return <g key={i}>
                <text x={hour.x} y={hour.y - 80} textAnchor="middle">{hour.temp}°{unitFormat}</text>
                <line x1={hour.xPrev} x2={hour.x} y1={hour.yPrev} y2={hour.y} />
              </g>;
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default WeatherHourly;
