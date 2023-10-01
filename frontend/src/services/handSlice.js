import {createSlice} from '@reduxjs/toolkit';

// Estado inicial para player
const initialState = {
	cards: [],
};

// Cambios de estado para player
const handSlice = createSlice({
	name: 'hand',
	initialState,
	reducers: {
		setHand: (state, action) => {
			state.cards = action.payload;
		},
		appendToHand: (state, action) => {
			// Append the new card to the existing array of cards
			state.cards = [...state.cards, ...action.payload];
		},
	},
});

// Action creators are generated for each case reducer funcion
export const {setHand, appendToHand} = handSlice.actions;
// return de reducer for game
export default handSlice.reducer;