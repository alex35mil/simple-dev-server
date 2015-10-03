import React from 'react';

import apiCall from '../utils/apiCall';
import App     from '../components/App/App';

React.render(<App apiCall={apiCall} />, document.getElementById('app'));
