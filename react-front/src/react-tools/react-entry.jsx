import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';

export default function renderApp(reactPlaceholder) {
	render(<App/>, reactPlaceholder);
}
