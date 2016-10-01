import React from 'react';
import ReactDOM from 'react-dom';
import WeatherHourly from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeatherHourly />, div);
});
