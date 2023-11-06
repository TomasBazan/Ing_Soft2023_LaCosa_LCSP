// eslint-disable-next-line no-unused-vars
import React from 'react';
import FinishGame from './FinishGame';
import {waitFor, screen} from '@testing-library/react';
import {renderWithProviders} from '../services/providerForTest/utils-for-tests';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';
const customInitialState = {
	player: {
		name: 'Player1', // Set the desired initial state values
		id: 1,
		loged: true,
	},
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
		position: 2,
		isFinish: 1,
		currentPlayer: 1,
		firstDeckCardBack: -1,
	},
};

describe('Game Layout', () => {
	const player = {
		name: 'Player1', // Set the desired initial state values
		id: 1,
		loged: true,
	};
	beforeEach(() => {
		window.sessionStorage.clear();
	});
	it('Should render The Game Layout and change the Route', async () => {
		const history = createMemoryHistory();
		const user = userEvent.setup();
		window.sessionStorage.setItem('player', JSON.stringify(player));
		renderWithProviders(
			<MemoryRouter
				initialEntries={['/Games/Partida-Inicial/play']}
				initialIndex={0}
			>
				<FinishGame myPlayerId={customInitialState.player.id} />
			</MemoryRouter>,
			{
				preloadedState: customInitialState,
				history, // Pass the history object
			},
		);

		await waitFor(async () => {
			user.click(screen.getByText('Play Again'));
			expect(history.location.pathname).toBe('/');
		});
	});
});
