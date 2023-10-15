import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	players: [],
	position: 0,
	rol: 0,
	currentPlayer: 0,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setPlayers: (state, action) => {
			state.players = action.payload;
		},
		setPosition: (state, action) => {
			state.position = action.payload;
		},
		setRol: (state, action) => {
			state.rol = action.payload;
		},
		setCurrentPlayer: (state, action) => {
			state.currentPlayer = action.payload;
		},
	},
});

export const {setPlayers, setPosition, setRol, setCurrentPlayer} =
	gameSlice.actions;
export default gameSlice.reducer;
