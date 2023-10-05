import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	players: [],
	canStart: false,
};

const lobbySlice = createSlice({
	name: 'lobby',
	initialState,
	reducers: {
		setLobby: (state, action) => {
			state.players = action.payload;
		},
		appendToLobby: (state, action) => {
			// Append the new card to the existing array of cards
			state.players = [...state.players, ...action.payload];
		},
		setCanStart: (state, action) => {
			state.canStart = action.payload;
		},
	},
});

export const {setLobby, appendToLobby, setCanStart} = lobbySlice.actions;
export default lobbySlice.reducer;
