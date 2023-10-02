import {createSlice} from '@reduxjs/toolkit';

// Estado inicial para player
const initialState = {
	players: [],
	position: 0,
	rol: 0,
};

// Cambios de estado para player
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
	},
});

// Action creators are generated for each case reducer funcion
export const {setPlayers, setPosition, setRol} = gameSlice.actions;
// return de reducer for game
export default gameSlice.reducer;
