import React, { Component } from 'react';

import './index.css';
import DateTime from '../DateTime';
import WeatherNow from '../WeatherNow';
import WeatherChart from '../WeatherChart';

import weatherStub from './weather-stub';

// const WEATHER_ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather?APPID=1bfa54cd8bbaba80515c3a7afd5b733b&units=imperial&zip=60618,US';


// http://openweathermap.org/forecast5#5days

class App extends Component {

  constructor() {
    super();
    this.setWeather = this.setWeather.bind(this);

    this.state = {
      weather: null,
    };

    this.setWeather();
  }

  setWeather() {
    this.setState({ weather: weatherStub });
    // fetch(new Request(WEATHER_ENDPOINT)).then((result) => {
    //   console.log(result);
    // });
  }

  componentDidMount() {
    setInterval(this.setWeather, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.setWeather);
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
        <WeatherNow weather={this.state.weather} />
        <WeatherChart weather={this.state.weather} />
      </div>
    );
  }
}

export default App;
