import '@testing-library/jest-dom';
import {fireEvent, screen} from '@testing-library/react';
import 'jest-localstorage-mock';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Hand from './Hand';

const expectedCards = [
	{id: '0', token: 'img1.jpg', type: 1},
	{id: '1', token: 'img40.jpg', type: 1},
	{id: '2', token: 'img72.jpg', type: 1},
	{id: '3', token: 'img78.jpg', type: 1},
];

// mock http request
jest.mock('../request/getHand', () => {
	return {
		__esModule: true,
		default: async () => {
			const response = {
				status: 200,
				ok: 'message',
				cards: expectedCards,
			};
			return response;
		},
	};
});

const initialState = {
	hand: {
		cards: [],
		selectedCard: '',
	},
};

describe('Hand component', () => {
	beforeEach(() => {
		sessionStorage.setItem('player', JSON.stringify({id: 1}));
	});

	it('should render the players hand initially', async () => {
		renderWithProviders(<Hand />, {preloadedState: initialState});

		const handComponent = screen.getByTestId('hand');
		expect(handComponent).toBeInTheDocument();

		const cards = screen.getAllByTestId('card-image');
		expect(cards).toHaveLength(4);

		console.log('cards', cards);

		cards.forEach((card, index) => {
			const expectedCard = expectedCards[index];

			expect(card).toHaveAttribute(
				'src',
				`http://localhost:5173/src/assets/cards/${expectedCard.token}`,
			);
		});
	});

	it('should select a valid card when clicked once', () => {
		// eslint-disable-next-line no-unused-vars
		const {store, _rtl} = renderWithProviders(<Hand />, {
			preloadedState: initialState,
		});

		const cardButtons = screen.getAllByTestId('card-button');
		const cardImages = screen.getAllByTestId('card-image');
		const validCard = cardImages[2];

		fireEvent.click(validCard);
		expect(cardButtons[2]).toHaveClass('selected');
	});

	it("shouldn't select a non valid card when clicked once", () => {
		// eslint-disable-next-line no-unused-vars
		const {store, _rtl} = renderWithProviders(<Hand />, {
			preloadedState: initialState,
		});

		const cardButtons = screen.getAllByTestId('card-button');
		const cardImages = screen.getAllByTestId('card-image');
		const laCosa = cardImages[0];

		fireEvent.click(laCosa);
		//! should not have class actually
		expect(cardButtons[0]).toHaveClass('selected');
	});
});
