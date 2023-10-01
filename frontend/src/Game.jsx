import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js';

import Deck from './components/Deck/Deck.jsx';
import Hand from './components/Hand/Hand.jsx';

// import './mocks/server.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Deck />
			<Hand />
		</Provider>
	</React.StrictMode>,
);
