import './style.css';

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the pages
import App from './components/App.jsx';

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
