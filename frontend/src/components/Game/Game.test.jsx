// eslint-disable-next-line no-unused-vars
import React from 'react';
import Game from './Game';
import {waitFor, screen} from '@testing-library/react';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import {jest} from '@jest/globals';
import userEvent from '@testing-library/user-event';
import {ChakraProvider} from '@chakra-ui/react';

jest.mock('../request/getGameStatus', () => {
	return {
		__esModule: true,
		default: async ({idPlayer}) => {
			idPlayer = 1;
			console.log('getGameStatus');
			return {
				status: 200,
				ok: true,

				detail: 'Game status listed correctly',
				my_position: 2,
				my_rol: 1,
				current_player: 1,
				players: [
					{name: 'Tomas', id: 1, position: 0, is_alive: true},
					{name: 'juan', id: 2, position: 1, is_alive: true},
					{name: 'pedro', id: 3, position: 2, is_alive: false},
					{name: 'pepe', id: 4, position: 3, is_alive: false},
					{name: 'mili', id: 5, position: 4, is_alive: true},
					{name: 'lara', id: 6, position: 5, is_alive: false},
					{name: 'lauti', id: 7, position: 6, is_alive: true},
				],
			};
		},
	};
});

jest.mock('../request/getCard', () => {
	return {
		__esModule: true,
		default: async (idPlayer) => {
			idPlayer = 1;
			console.log('getCard');
			return {
				status: 200,
				ok: true,
				pickedCards: ['img31.jpg'],
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
			console.log('getHand');
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
			console.log('getHand');

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
	it('Should render The Game Layout and pass', async () => {
		/* const user =  */ userEvent.setup();

		renderWithProviders(
			<ChakraProvider>
				<Game />
			</ChakraProvider>,
		);

		await waitFor(async () => {
			// This should be in the screen always
			expect(screen.getByText(/Deck/i)).toBeInTheDocument();
			expect(screen.getByText(/Play/i)).toBeInTheDocument();
			expect(screen.getByText(/Discard/i)).toBeInTheDocument();
			expect(screen.getByTestId('hand')).toBeInTheDocument();
			// This players should be in the screen
			expect(screen.getByText(/Tomas/i)).toBeInTheDocument();
			expect(screen.getByText(/juan/i)).toBeInTheDocument();
			expect(screen.getByText(/mili/i)).toBeInTheDocument();
			// This should not be in the screen
			expect(screen.queryByText(/pedro/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/pepe/i)).not.toBeInTheDocument();
			// user touch the hand
			// const cards = screen.getAllByLabelText('handCard');
			// expect(cards).toHaveLength(4);
		});
	});
	/* 		it('Test actions that can perform the player', async () => {
		userEvent.setup();
		const pantalla = renderWithProviders(
			<ChakraProvider>
				<Game />
			</ChakraProvider>,
		);
		await waitFor(() => {
			user.click(screen.getByRole('button', {name: /img78.jpg/i}));
			
			console.log(pantalla.debug());

			
		} */
});
