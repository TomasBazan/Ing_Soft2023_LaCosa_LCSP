import {rest} from 'msw';

export const cardHandlers = [
	// get player's hand
	rest.get('https://localhost:8000/hand', (req, res, ctx) => {
		console.log('Request intercepted:', req);
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				message: '',
				data: {
					hand: [
						{card_token: 'img37.jpg', type: 1},
						{card_token: 'img40.jpg', type: 1},
						{card_token: 'img72.jpg', type: 1},
						{card_token: 'img78.jpg', type: 1},
					],
				},
			}),
		);
	}),

	// pick a card from the deck
	rest.put('https://localhost:8000/hand', (req, res, ctx) => {
		console.log('Request intercepted:', req);
		return res(
			ctx.status(200),
			ctx.json({
				status: 'int',
				message: 'str',
				data: {
					picked_cards: [{card_token: 'img37.jpg', type: 1}],
					next_card_type: 0,
				},
			}),
		);
	}),

	// sent when a card is about to be played
	rest.post('https://localhost:8000/hand/play', (req, res, ctx) => {
		console.log('Request intercepted:', req);
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				detail: '',
				data: {
					user: {
						id: 36,
						name: 'pepe2',
						created_at: '2023-09-30T21:56:36',
						game: null,
						is_alive: true,
						cards: [],
					},
					target_user: {
						id: 36,
						name: 'pepe2',
						created_at: '2023-09-30T21:56:36',
						game: null,
						is_alive: true,
						cards: [],
					},
				},
			}),
		);
	}),
];
