import React, { Component } from 'react';
import moment from 'moment';

import styles from './index.css';

import DateTime from '../DateTime';
import WeatherConditions from '../WeatherConditions';
import WeatherHourly from '../WeatherHourly';

import conditionsStub from './stubs/conditions';
import hourlyStub from './stubs/hourly';

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = 60 * ONE_MINUTE;

const IS_DEV = process.env.NODE_ENV !== 'production';
const WEATHER_API = 'https://api.wunderground.com/api';
const WEATHER_TOKEN = IS_DEV ? '899c297f919cf33c' : null;

class App extends Component {

  constructor() {
    super();
    this.refreshSite = this.refreshSite.bind(this);
    this.setConditions = this.setConditions.bind(this);
    this.setHourly = this.setHourly.bind(this);

    this.state = {
      conditions: null,
      hourly: null,
    };
  }

  componentDidMount() {
    if(!this.getToken()) return;

    setInterval(this.refreshSite, 24 * ONE_HOUR);
    setInterval(this.setConditions, 10 * ONE_MINUTE);
    setInterval(this.setHourly, 1 * ONE_HOUR);

    this.setConditions();
    this.setHourly();
  }

  componentWillUnmount() {
    clearInterval(this.refreshSite);
    clearInterval(this.setConditions);
    clearInterval(this.setHourly);
  }

  refreshSite() {
    window.location.reload();
  }

  setConditions() {
    if (IS_DEV) {
      this.setState({ conditions: conditionsStub });
    } else {
      fetch(this.getWeatherEndpoints().conditions)
        .then((response) => response.json())
        .then((conditions) => this.setState({ conditions }));
    }
  }

  setHourly() {
    if (IS_DEV) {
      this.setState({ hourly: hourlyStub });
    } else {
      fetch(this.getWeatherEndpoints().hourly)
        .then((response) => response.json())
        .then((hourly) => this.setState({ hourly }));
    }
  }

  getWeatherEndpoints() {
    const location = this.props.location.query.zipCode || 'autoip';
    const token = this.getToken();

    return {
      conditions: `${WEATHER_API}/${token}/conditions/q/${location}.json`,
      hourly: `${WEATHER_API}/${token}/hourly/q/${location}.json`,
      history: `${WEATHER_API}/${token}/history_/q/${location}.json`,
    };
  }

  getToken() {
    let token = this.props.params.token || this.props.location.query.token;

    if (IS_DEV && !token) token = WEATHER_TOKEN;

    return token;
  }

  getUnits() {
    return this.props.location.query.units || 'imperial';
  }

  getConditionsClassName() {
    const willPrecipitate = this.getWillPrecipSoon();
    const isWeekend = moment().day() === 0 || moment().day() === 6;

    switch (true) {
      case willPrecipitate: return styles.rain;
      case isWeekend: return styles.weekend;
      default: return styles.clear;
    }
  }

  getWillPrecipSoon() {
    if (!this.state.hourly) return false;

    let willPrecipitate = false;

    this.state.hourly.hourly_forecast.slice(0, 12).forEach((hour) => {
      if (parseFloat(hour.qpf.metric) > 0) willPrecipitate = true;
    });

    return willPrecipitate;
  }

  render() {
    const conditionsClass = this.getConditionsClassName();
    const appClassNames = [styles.App, conditionsClass];

    const token = this.getToken();
    const units = this.getUnits();

    const { conditions, hourly } = this.state;

    return (
      <div className={appClassNames.join(' ')}>
        {!token &&
          <p className={styles.noToken}>Where's your token?</p>
        }
        {token &&
          <div className={styles.container}>
            <DateTime
              className={styles.DateTime}
            />
            <WeatherConditions
              className={styles.WeatherConditions}
              units={units}
              weather={conditions}
            />
            <WeatherHourly
              className={styles.WeatherHourly}
              units={units}
              weather={hourly}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
