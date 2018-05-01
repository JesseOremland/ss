import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Team from './Team';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Team />, document.getElementById('Team'));
registerServiceWorker();
