import {createSlice} from '@reduxjs/toolkit';

// Estado inicial para player
const initialState = {
	cards: [],
	selectedCard: '',
	alreadyPlayed: false,
	alreadyPicked: false,
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
		// Remove card from hand and clean selected card
		removeFromHand: (state, action) => {
			state.cards = state.cards.filter((card) => card.id !== action.payload.id);
			state.selectedCard = '';
		},
		selectCard: (state, action) => {
			state.selectedCard = action.payload;
		},
		cleanSelectedCard: (state) => {
			state.selectedCard = '';
		},
		setAlreadyPlayed: (state) => {
			state.alreadyPlayed = true;
		},
		setAlreadyPicked: (state) => {
			state.alreadyPicked = true;
		},
		restoreTurnConditions: (state) => {
			state.alreadyPlayed = false;
			state.alreadyPicked = false;
		},
	},
});

// Action creators are generated for each case reducer funcion
export const {
	setHand,
	appendToHand,
	removeFromHand,
	selectCard,
	cleanSelectedCard,
	setAlreadyPlayed,
	setAlreadyPicked,
	restoreTurnConditions,
} = handSlice.actions;
// return de reducer for game
export default handSlice.reducer;
