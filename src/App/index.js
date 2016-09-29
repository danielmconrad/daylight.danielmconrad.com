import React, { Component } from 'react';

import './index.css';
import DateTime from '../DateTime';
import WeatherNow from '../WeatherNow';
import WeatherForecast from '../WeatherForecast';

// import nowStub from './stubs/now';
// import forecastStub from './stubs/forecast';

const WEATHER_API = 'http://api.openweathermap.org/data/2.5';

class App extends Component {

  constructor() {
    super();
    this.setWeather = this.setWeather.bind(this);

    this.state = {
      weather: {
        now: null,
        forecast: null,
      },
    };
  }

  componentDidMount() {
    setInterval(this.setWeather, 60000);
    this.setWeather();
  }

  componentWillUnmount() {
    clearInterval(this.setWeather);
  }

  setWeather() {
    // Promise.resolve({ now: nowStub, forecast: forecastStub }).then((weather) => this.setState({ weather }));
    this.getWeatherRequests().then((weather) => this.setState({ weather }));
  }

  getWeatherRequests() {
    const { token, lat, lng } = this.props.location.query;

    const params = `?APPID=${token}&units=imperial&lat=${lat}&lon=${lng}`;
    const nowEndpoint = `${WEATHER_API}/weather${params}`;
    const forecastEndpoint = `${WEATHER_API}/forecast${params}`;

    return Promise.all([
      fetch(new Request(nowEndpoint)),
      fetch(new Request(forecastEndpoint)),
    ])
    .then((requests) => Promise.all(requests.map((req) => req.json()))
    .then(([now, forecast]) => ({ now, forecast })));
  }

  render() {
    let appClassNames = ['App'];

    if (true) {
      appClassNames.push('will-snow');
    } else {
      appClassNames.push('clear-skies');
    }

    return (
      <div className={appClassNames.join(' ')}>
        <DateTime />
        <WeatherNow now={this.state.weather.now} units="F" />
        <WeatherForecast forecast={this.state.weather.forecast} units="F" />
      </div>
    );
  }
}

export default App;
