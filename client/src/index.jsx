import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom';
import styles from './styles/index.css'

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('app'));

