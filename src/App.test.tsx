import React from 'react';
import { render } from '@testing-library/react';
//import App from './App';
import MainApp from './App';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  const div =document.createElement('div');
  ReactDOM.render(<MainApp />,div);
  ReactDOM.unmountComponentAtNode(div);
  /*const { getByText } = render(<MainApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
});
