import {configureStore} from '@reduxjs/toolkit';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import React from 'react';
import playerReducer, {setName} from './playerSlice';

// Helper function to render a component with Redux store
function renderWithRedux(
	component,
	store = configureStore({reducer: {player: playerReducer}}),
) {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	};
}

// Test cases
describe('playerSlice', () => {
	it('should set the player name correctly', () => {
		const {store} = renderWithRedux(<div>Test Component</div>);

		// Dispatch the setName action with a payload
		store.dispatch(setName('pepe'));

		// Get the current state from the store
		const state = store.getState().player;

		// Check if the name in the state matches the dispatched payload
		expect(state.name).toBe('pepe');
	});
});
