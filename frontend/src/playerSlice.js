import {createSlice} from '@reduxjs/toolkit';

// Estado inicial para player
const initialState = {
	name: '',
	id: 0,
};

// Cambios de estado para player
const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setPlayerId: (state, action) => {
			state.id = action.payload;
		},
	},
});

export const {setName, setPlayerId} = playerSlice.actions;
export default playerSlice.reducer;
