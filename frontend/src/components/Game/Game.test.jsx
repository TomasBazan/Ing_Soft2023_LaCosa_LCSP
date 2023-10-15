// eslint-disable-next-line no-unused-vars
import React from 'react';
import Game from './Game';
import {waitFor, screen} from '@testing-library/react';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import {jest, test} from '@jest/globals';
import userEvent from '@testing-library/user-event';
import {ChakraProvider} from '@chakra-ui/react';

jest.mock('../request/getGameStatus', () => {
	return {
		__esModule: true,
		default: async ({idPlayer}) => {
			idPlayer = 1;
			console.log('estoy entrando en el mock getGameStatus');
			console.log(idPlayer);
			return {
				status: 200,
				ok: true,

				detail: 'Game status listed correctly',
				my_position: 2,
				my_rol: 1,
				current_player: 2,
				players: [
					{name: 'Tomas', id: 1, position: 0, is_alive: true},
					{name: 'juan', id: 2, position: 1, is_alive: true},
					{name: 'pedro', id: 3, position: 2, is_alive: true},
					{name: 'pepe', id: 4, position: 3, is_alive: true},
					{name: 'mili', id: 5, position: 4, is_alive: true},
					{name: 'lara', id: 6, position: 5, is_alive: true},
					{name: 'lauti', id: 7, position: 6, is_alive: true},
					{name: 'nico', id: 8, position: 7, is_alive: true},
					{name: 'diego', id: 9, position: 8, is_alive: true},
					{name: 'laura', id: 10, position: 9, is_alive: true},
					{name: 'santi', id: 11, position: 10, is_alive: true},
					{name: 'chun', id: 12, position: 11, is_alive: false},
				],
			};
		},
	};
});

jest.mock('../request/getHand', () => {
	return {
		__esModule: true,
		default: async (idPlayer) => {
			idPlayer = 1;
			console.log('estoy entrando en el mock getCard');
			console.log(idPlayer);
			return {
				status: 200,
				ok: true,
				pickedCards: ['img37.jpg'],
				nextCardType: 0,
				detail: 'Card picked correctly',
			};
		},
	};
});
jest.mock('../request/getHand', () => {
	return {
		__esModule: true,
		default: async (idPlayer) => {
			idPlayer = 1;
			console.log('estoy entrando en el mock getHand');
			console.log(idPlayer);
			return {
				status: 200,
				ok: true,

				detail: 'Card listed correctly',
				card_token: ['img37.jpg', 'img40.jpg', 'img72.jpg', 'img78.jpg'],
			};
		},
	};
});
jest.mock('../request/playCard', () => {
	return {
		__esModule: true,
		default: async (values) => {
			values = {
				idPlayer: 1,
				targetId: 2,
				cardToken: 'img37.jpg',
			};
			console.log('estoy entrando en el mock getHand');

			return {
				status: 200,
				ok: true,
				idPlayer: 1,
				cardToken: 'img37.jpg',
				targetId: 2,
				user: {
					id: 1,
					name: 'Tomas',
					created_at: '2023-09-30T21:56:36',
					game: null,
					is_alive: true,
					cards: ['img37.jpg', 'img40.jpg', 'img72.jpg', 'img78.jpg'],
				},
				targetUser: {
					id: 2,
					name: 'juan',
					created_at: '2023-09-30T21:56:36',
					game: null,
					is_alive: true,
					cards: ['img37.jpg', 'img40.jpg', 'img72.jpg', 'img78.jpg'],
				},
				detail: 'Card played correctly',
				card_token: ['img32.jpg', 'img46.jpg', 'img52.jpg', 'img72.jpg'],
			};
		},
	};
});
describe('Game Layout', () => {
	test('Should render The Game Layout and pass', async () => {
		userEvent.setup();

		renderWithProviders(
			<ChakraProvider>
				<Game />
			</ChakraProvider>,
		);

		await waitFor(() => {
			const playerName = screen.getByText(/Deck/i);
			expect(playerName).toBeInTheDocument();
		});
	});
});
