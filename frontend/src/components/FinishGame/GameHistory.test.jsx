// eslint-disable-next-line no-unused-vars
import React from 'react';
import {GameHistory} from './GameHistory';
import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
// Mocking the redux toolkit slice to get a state
// Create a custom initial state for the player slice
const customInitialState = {
	game: {
		players: [
			{name: 'Player1', id: 1, position: 0, is_alive: true},
			{name: 'Player2', id: 2, position: 1, is_alive: true},
			{name: 'Player3', id: 3, position: 2, is_alive: false},
			{name: 'Player4', id: 4, position: 3, is_alive: false},
			{name: 'Player5', id: 5, position: 4, is_alive: true},
			{name: 'Player6', id: 6, position: 5, is_alive: false},
			{name: 'Player7', id: 7, position: 6, is_alive: true},
		],
		my_position: 2,
		my_rol: 1,
		current_player: 1,
	},
};
const customInitialState2 = {
	game: {
		players: [
			{name: 'Player1', id: 1, position: 0, is_alive: false},
			{name: 'Player2', id: 2, position: 1, is_alive: false},
			{name: 'Player3', id: 3, position: 2, is_alive: false},
			{name: 'Player4', id: 4, position: 3, is_alive: false},
			{name: 'Player5', id: 5, position: 4, is_alive: false},
			{name: 'Player6', id: 6, position: 5, is_alive: false},
			{name: 'Player7', id: 7, position: 6, is_alive: false},
		],
		my_position: 2,
		my_rol: 1,
		current_player: 1,
	},
};
const customInitialState3 = {
	game: {
		players: [],
		my_position: 2,
		my_rol: 1,
		current_player: 1,
	},
};
describe('Game History principal scenario', () => {
	it('should render the Game History and pass', async () => {
		renderWithProviders(<GameHistory />, {
			preloadedState: customInitialState,
		});
		await waitFor(async () => {
			expect(screen.getByText(/Game Over*/i)).toBeInTheDocument();
			expect(screen.getByText('Results')).toBeInTheDocument();
			expect(screen.getAllByText(/Player*/i)).toHaveLength(7);
			expect(screen.getAllByText(/Won/i)).toHaveLength(4);
			expect(screen.getAllByText(/Failed/i)).toHaveLength(3);
		});
	});
	it('should render bad Game History and pass', async () => {
		renderWithProviders(<GameHistory />, {
			preloadedState: customInitialState2,
		});
		await waitFor(async () => {
			expect(screen.getByText(/Game Over*/i)).toBeInTheDocument();
			expect(screen.getByText('Invalid Results')).toBeInTheDocument();
			expect(screen.getByText('There is no data to show')).toBeInTheDocument();
		});
	});
	it('should render empty Game History state and pass', async () => {
		renderWithProviders(<GameHistory />, {
			preloadedState: customInitialState3,
		});
		await waitFor(async () => {
			expect(screen.getByText(/Game Over*/i)).toBeInTheDocument();
			expect(screen.getByText('Results')).toBeInTheDocument();
			expect(screen.getByText('There is no data to show')).toBeInTheDocument();
		});
	});
});
