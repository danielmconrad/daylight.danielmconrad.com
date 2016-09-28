import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chart />, div);
});
