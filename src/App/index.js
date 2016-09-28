import React, { Component } from 'react';

import './index.css';
import DateTime from '../DateTime';
import WeatherNow from '../WeatherNow';
import WeatherChart from '../WeatherChart';

class App extends Component {
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
        <WeatherNow />
        <WeatherChart />
      </div>
    );
  }
}

export default App;
