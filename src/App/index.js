import React, { Component } from 'react';

import './index.css';
import DateTime from '../DateTime';
import WeatherCurrent from '../WeatherCurrent';
// import WeatherForecast from '../WeatherForecast';

// import currentStub from './stubs/current';
// import forecastStub from './stubs/forecast';

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = 60 * ONE_MINUTE;

const WEATHER_API = 'https://api.wunderground.com/api';
const WEATHER_TOKEN = 'cc057fa0be3e146f';

class App extends Component {

  constructor() {
    super();
    this.refreshSite = this.refreshSite.bind(this);
    this.setWeather = this.setWeather.bind(this);

    this.state = {
      weather: {
        current: null,
        forecast: null,
      },
    };
  }

  componentDidMount() {
    setInterval(this.refreshSite, 24 * ONE_HOUR);
    setInterval(this.setWeather, 10 * ONE_MINUTE);
    this.setWeather();
  }

  componentWillUnmount() {
    clearInterval(this.setWeather);
  }

  setWeather() {
    // Promise.resolve({ current: currentStub, forecast: forecastStub })
    //   .then((weather) => this.setState({ weather }));
    this.getWeatherRequests()
      .then((weather) => this.setState({ weather }));
  }

  refreshSite() {
    window.location.reload();
  }

  getWeatherRequests() {
    let { token, zipCode } = this.props.location.query;
    token = token || WEATHER_TOKEN;

    // http://api.wunderground.com/api/TOKEN/conditions/q/ZIP.json
    // http://api.wunderground.com/api/TOKEN/forecast/q/ZIP.json
    // http://api.wunderground.com/api/TOKEN/history_YYYYMMDD/q/ZIP.json

    const currentEndpoint = `${WEATHER_API}/${token}/conditions/q/${zipCode}.json`;
    const forecastEndpoint = `${WEATHER_API}/${token}/forecast/q/${zipCode}.json`;
    // const historyEndpoint = `${WEATHER_API}/${token}/history_/q/${zipCode}.json`;

    return Promise.all([
      fetch(new Request(currentEndpoint)),
      fetch(new Request(forecastEndpoint)),
    ])
    .then((requests) => Promise.all(requests.map((req) => req.json()))
    .then(([current]) => ({ current }))); //forecast
  }

  getColorClassName() {
    return 'clear-skies';
  }

  render() {
    let appClassNames = ['App'].concat(this.getColorClassName());

    const { current } = this.state.weather; //forecast
    let { units } = this.props.location.query;

    // <WeatherForecast forecast={forecast} units={units} />

    return (
      <div className={appClassNames.join(' ')}>
        <DateTime />
        <WeatherCurrent current={current} units={units} />
      </div>
    );
  }
}

export default App;
