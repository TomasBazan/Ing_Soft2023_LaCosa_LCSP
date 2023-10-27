// eslint-disable-next-line no-unused-vars
import React from 'react';
import PlayerIcons from './PlayerIcons';
import {waitFor, screen} from '@testing-library/react';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import userEvent from '@testing-library/user-event';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';

const customTheme = extendTheme({
	colors: {
		teal: {
			500: '#319795',
		},
		gray: {
			500: '#2D3748',
		},
		red: {
			500: '#E53E3E',
		},
	},
});

describe('Player Icons tests', () => {
	beforeEach(() => {
		window.sessionStorage.clear();
	});
	const player1 = {
		name: 'player1',
		id: 1,
		loged: true,
	};
	const customInitialState1 = {
		hand: {
			cards: [
				{
					id: 0,
					token: 'img37.jpg',
					type: 1,
				},
				{
					id: 1,
					token: 'img40.jpg',
					type: 1,
				},
				{
					id: 2,
					token: 'img72.jpg',
					type: 1,
				},
				{
					id: 3,
					token: 'img78.jpg',
					type: 1,
				},
			],
			selectedCard: null,
			alreadyPlayed: false,
			alreadyPicked: false,
		},
	};
	const realativePositionToTable1 = 0;
	const currentPlayerId1 = 1;
	const players1 = [
		{
			name: 'player1',
			id: 1,
			position: 0,
			is_alive: true,
		},
		{
			name: 'player2',
			id: 2,
			position: 1,
			is_alive: true,
		},
		{
			name: 'player3',
			id: 3,
			position: 2,
			is_alive: true,
		},
	];
	it('Shoul render the player icons and pass with 1', async () => {
		/* const user =  */ userEvent.setup();
		window.sessionStorage.setItem('player', JSON.stringify(player1));
		window.sessionStorage.setItem('gameId', 1);
		renderWithProviders(
			<ChakraProvider theme={customTheme}>
				<PlayerIcons
					relativePositionToTable={realativePositionToTable1}
					players={players1}
					currentPlayerId={currentPlayerId1}
				/>
			</ChakraProvider>,
			{
				preloadedState: customInitialState1,
			},
		);
		await waitFor(async () => {
			expect(screen.getByText('player1')).toBeInTheDocument();
			expect(screen.getByText('player2')).toBeInTheDocument();
			expect(screen.getByText('player3')).toBeInTheDocument();
			expect(screen.getAllByTestId(/player/i).length).toBe(3);
			expect(screen.getByTestId('player-1')).toHaveStyle(
				'border: 2px solid blue',
			);
			expect(screen.getByTestId('player-1')).toHaveStyle(
				'background-color: teal.500',
			);
			expect(screen.getByTestId('player-2')).toHaveStyle(
				'background-color: gray.900',
			);
			expect(screen.getByTestId('player-3')).toHaveStyle(
				'background-color: gray.900',
			);
		});
	});
});
