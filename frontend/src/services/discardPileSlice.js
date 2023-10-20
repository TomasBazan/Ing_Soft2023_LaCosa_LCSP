import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	discardedCard: '',
};

const discardPileSlice = createSlice({
	name: 'discardPile',
	initialState,
	reducers: {
		addToDiscardPile: (state, action) => {
			state.discardedCard = action.payload;
		},
		cleanDiscardPile: (state) => {
			state.discardedCard = '';
		},
	},
});

export const {addToDiscardPile, cleanDiscardPile} = discardPileSlice.actions;
export default discardPileSlice.reducer;
