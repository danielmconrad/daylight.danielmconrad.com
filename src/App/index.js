import React, {Component} from 'react';
import {parse as parseSearch} from 'querystring';
import moment from 'moment';

import styles from './index.css';

import DateTime from '../DateTime';
import WeatherConditions from '../WeatherConditions';
import WeatherHourly from '../WeatherHourly';

import conditionsStub from './stubs/conditions';
import hourlyStub from './stubs/hourly';

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const PRECIPITATION_PERCENTAGE_THRESHOLD = 5.0;

const IS_DEV = process.env.NODE_ENV !== 'production';
const WEATHER_API = 'https://api.wunderground.com/api';

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
    if(!this.getToken() && !IS_DEV) return;

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

  getQuery() {
    return parseSearch(this.props.location.search.substring(1));
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
    const location = this.getQuery().zipCode || 'autoip';
    const token = this.getToken();

    return {
      conditions: `${WEATHER_API}/${token}/conditions/q/${location}.json`,
      hourly: `${WEATHER_API}/${token}/hourly/q/${location}.json`,
      history: `${WEATHER_API}/${token}/history_/q/${location}.json`,
    };
  }

  getToken() {
    return this.getQuery().token;
  }

  getUnits() {
    return this.getQuery().units || 'imperial';
  }

  getConditionsClassName() {
    const willPrecipitate = this.getWillPrecipitateSoon();
    const isWeekend = moment().day() === 0 || moment().day() === 6;

    switch (true) {
      case willPrecipitate: return styles.rain;
      case isWeekend: return styles.weekend;
      default: return styles.clear;
    }
  }

  getWillPrecipitateSoon() {
    if (!this.state.hourly) return false;

    let willPrecipitate = false;

    this.state.hourly.hourly_forecast.slice(0, 12).forEach((hour) => {
      if (parseFloat(hour.pop, 10) > PRECIPITATION_PERCENTAGE_THRESHOLD) {
        willPrecipitate = true;
      }
    });

    return willPrecipitate;
  }

  render() {
    const appClassNames = [styles.App, this.getConditionsClassName()];
    const token = this.getToken();
    const units = this.getUnits();
    const {conditions, hourly} = this.state;

    return (
      <div className={appClassNames.join(' ')}>
        {(!token && !IS_DEV) ?
          <p className={styles.noToken}>Where's your token?</p>
          :
          <div className={styles.container}>
            <DateTime
              className={styles.DateTime}
              units={units}
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
