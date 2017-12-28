import React from 'react';
import ReactDOM from 'react-dom';
import MainWrapper from './MainWrapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainWrapper />, div);
});
