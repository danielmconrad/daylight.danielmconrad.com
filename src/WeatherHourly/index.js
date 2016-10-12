import React, { Component } from 'react';
import moment from 'moment';

import styles from './index.css';

const LEGEND_LINE_PX = 235;
const TEMP_WIDTH = 160;
const TEMP_TOP = 100;
const TEMP_BOTTOM = 200;
const PRECIP_WIDTH = 40;
const PRECIP_TOP = 150;
const PRECIP_BOTTOM = LEGEND_LINE_PX;

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
    if(!this.props.weather || !this.props.weather.hourly_forecast) return [];

    const isCelcius = this.props.units === 'celcius';
    const unitFormat = isCelcius ? 'C' : 'F';
    const unitKey = isCelcius ? 'metric' : 'english';

    return this.props.weather.hourly_forecast.map((hour, index) => {
      const temp = parseInt(hour.temp[unitKey], 10);
      const precip = parseFloat(hour.pop, 10);
      const mDate = moment(parseInt(hour.FCTTIME.epoch + '000', 10));

      return {
        mDate: mDate,
        temp: temp,
        tempString: `${temp}°${unitFormat}`,
        precip: precip,
        icon: hour.icon,
      };
    });
  }

  getTemperatures() {
    let hours = [];

    this.getHours().forEach((hour, i) => {
      if (i % 2 === 0 && hours.length < 7) hours.push(hour);
    });

    return this.getRollingHours(hours, 'temp', TEMP_WIDTH, TEMP_TOP, TEMP_BOTTOM);
  }

  getPrecipitations() {
    let hours = this.getHours().slice(0, 24);

    return this.getRollingHours(hours, 'precip', PRECIP_WIDTH, PRECIP_TOP, PRECIP_BOTTOM, 0, 100);
  }

  getRollingHours(hours, metricKey, xWidth, yTop, yBottom, min, max) {
    max = max == null ? -Infinity : max;
    min = min == null ? Infinity : min;

    hours.forEach((hour) => {
      if (min > hour[metricKey]) min = hour[metricKey];
      if (max < hour[metricKey]) max = hour[metricKey];
    });

    let spread = Math.max(max - min, 1);

    return hours.map((hour, index) => {
      const metric = hour[metricKey];
      const x = index * xWidth;
      const xPrev = (index === 0 ? hour.x : hours[index - 1].x);
      const y = Math.ceil(((metric - min) / spread) * (yTop - yBottom) + yBottom);
      const yPrev = (index === 0 ? y : hours[index - 1].y);
      const height = Math.max(Math.ceil(yBottom - y) - 1, 0);

      return Object.assign(hour, { x, xPrev, y, yPrev, height });
    });
  }

  render() {
    const temperatures = this.getTemperatures();
    const precipitations = this.getPrecipitations();

    if (!temperatures && !precipitations) return null;

    return (
      <svg className={[styles.WeatherHourly, this.props.className].join(' ')}
        viewBox="-40 0 1040 330"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* LEGEND */}
        <g className={styles.legend}>
          <line
            id="bottom-line"
            x1="-20"
            x2="980"
            y1={LEGEND_LINE_PX}
            y2={LEGEND_LINE_PX}
          />
          {temperatures.map(({ x, y, mDate }, i) => {
            return <text
              key={i}
              x={x}
              y={LEGEND_LINE_PX + 60}
              textAnchor="middle"
            >
              {mDate.format('h')}
              <tspan className={styles.small}>{mDate.format('A')}</tspan>
            </text>
          })}
        </g>

        {/* PRECIPITATION */}
        <g className={styles.precipitation}>
          {precipitations.map(({ x, y, height }, i) => {
            return <g key={i}>
              <rect x={x} width={PRECIP_WIDTH} y={y} height={height} />
            </g>
          })}
        </g>

        {/* TEMPERATURES */}
        <g className={styles.temps}>
          {temperatures.map(({ x, xPrev, y, yPrev, tempString}, i) => {
            return <g key={i}>
              <text
                x={x}
                y={y - 50}
                textAnchor="middle"
              >
                {tempString}
              </text>
              <line x1={xPrev} x2={x} y1={yPrev} y2={y} />
            </g>;
          })}
        </g>
      </svg>
    );
  }
}

export default WeatherHourly;
