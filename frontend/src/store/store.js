import {configureStore} from '@reduxjs/toolkit';
import playerReducer from '../playerSlice.js';

// configuracion de los estados y sus reducers
const store = configureStore({
	reducer: {
		player: playerReducer.player,
	},
});

export default store;
