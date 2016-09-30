import React from 'react';
import ReactDOM from 'react-dom';
import WeatherCurrent from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeatherCurrent />, div);
});
