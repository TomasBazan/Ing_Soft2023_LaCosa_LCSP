import {configureStore} from '@reduxjs/toolkit';
import handReducer from '../services/handSlice.js';
import playAreaReducer from '../services/playAreaSlice.js';
import discardPileReducer from '../services/discardPileSlice.js';
import gameReducer from '../services/gameSlice.js';
import lobbyReducer from '../services/lobbySlice.js';

// configuracion de los estados y sus reducers
const store = configureStore({
	reducer: {
		hand: handReducer,
		playArea: playAreaReducer,
		discardPile: discardPileReducer,
		lobby: lobbyReducer,
		game: gameReducer,
	},
	devTools: true,
});

export default store;
