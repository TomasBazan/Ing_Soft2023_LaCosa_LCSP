import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	players: [],
	position: 0,
	rol: 0,
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
	},
});

export const {setPlayers, setPosition, setRol} = gameSlice.actions;
export default gameSlice.reducer;
