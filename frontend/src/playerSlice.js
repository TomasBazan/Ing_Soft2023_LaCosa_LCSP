import {createSlice} from '@reduxjs/toolkit';

// Estado inicial para player
const initialState = {
	name: '',
};

// Cambios de estado para player
const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
	},
});

export const {setName} = playerSlice.actions;
export default playerSlice.reducer;
