import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	discardedCard: '',
};

const discardPileSlice = createSlice({
	name: 'discardPile',
	initialState,
	reducers: {
		addToDiscardPile: (state, action) => {
			console.log('Dicarded card: ', action.payload);
			state.discardedCard = action.payload;
		},
		cleanDiscardPile: (state) => {
			state.discardedCard = '';
		},
	},
});

export const {addToDiscardPile, cleanDiscardPile} = discardPileSlice.actions;
export default discardPileSlice.reducer;
