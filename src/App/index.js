import React, { Component } from 'react';

import styles from './index.css';

import DateTime from '../DateTime';
import WeatherConditions from '../WeatherConditions';
import WeatherForecast from '../WeatherForecast';

import conditionsStub from './stubs/conditions';
import forecastStub from './stubs/forecast';

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = 60 * ONE_MINUTE;

const IS_DEV = process.env.NODE_ENV !== 'production';
const WEATHER_API = 'https://api.wunderground.com/api';
const WEATHER_TOKEN = IS_DEV ? '899c297f919cf33c' : 'cc057fa0be3e146f';

class App extends Component {

  constructor() {
    super();
    this.refreshSite = this.refreshSite.bind(this);
    this.setConditions = this.setConditions.bind(this);
    this.setForecast = this.setForecast.bind(this);

    this.state = {
      conditions: null,
      forecast: null,
    };
  }

  componentDidMount() {
    setInterval(this.refreshSite, 24 * ONE_HOUR);
    setInterval(this.setConditions, 10 * ONE_MINUTE);
    setInterval(this.setForecast, 4 * ONE_HOUR);

    this.setConditions();
    this.setForecast();
  }

  componentWillUnmount() {
    clearInterval(this.refreshSite);
    clearInterval(this.setConditions);
    clearInterval(this.setForecast);
  }

  refreshSite() {
    window.location.reload();
  }

  setConditions() {
    if (IS_DEV) {
      this.setState({ conditions: conditionsStub });
    } else {
      fetch(this.getWeatherRequests().conditions)
        .then((conditions) => this.setState({ conditions }));
    }
  }

  setForecast() {
    if (IS_DEV) {
      this.setState({ forecast: forecastStub });
    } else {
      fetch(this.getWeatherRequests().forecast)
        .then((forecast) => this.setState({ forecast }));
    }
  }

  getWeatherEndpoints() {
    let { token, zipCode } = this.props.location.query;
    token = token || WEATHER_TOKEN;

    return {
      conditions: `${WEATHER_API}/${token}/conditions/q/${zipCode}.json`,
      forecast: `${WEATHER_API}/${token}/forecast/q/${zipCode}.json`,
      history: `${WEATHER_API}/${token}/history_/q/${zipCode}.json`,
    };
  }

  getColorClassName() {
    if (!this.state.conditions) return styles.clear;

    const { precip_today_metric } = this.state.conditions.current_observation;
    const precip = parseFloat(precip_today_metric);

    if (precip > 0) return styles.rain;

    return styles.clear;
  }

  render() {
    let appClassNames = [styles.App].concat(this.getColorClassName());

    const { conditions, forecast } = this.state;
    const { units } = this.props.location.query;
    // const { orientation } = this.props.params || 'horizontal';

    return (
      <div className={appClassNames.join(' ')}>
        <DateTime
          className={styles.DateTime}
        />
        <WeatherConditions
          className={styles.WeatherConditions}
          units={units}
          weather={conditions}
        />
        <WeatherForecast
          className={styles.WeatherForecast}
          units={units}
          weather={forecast}
        />
      </div>
    );
  }
}

export default App;
