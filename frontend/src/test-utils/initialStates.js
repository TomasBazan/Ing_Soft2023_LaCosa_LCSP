export const gameStarted = {
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
		selectedCard: '',
		alreadyPlayed: false,
		alreadyPicked: false,
	},
	playArea: {
		card: null,
	},
	discardPile: {
		discardedCard: '',
	},
	game: {
		position: 0,
		isFinish: 1,
		currentPlayer: 0,
		firstDeckCard: -1,
		players: [
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
			{
				name: 'player4',
				id: 4,
				position: 3,
				is_alive: true,
			},
			{
				name: 'player5',
				id: 5,
				position: 4,
				is_alive: true,
			},
			{
				name: 'player6',
				id: 6,
				position: 5,
				is_alive: true,
			},
			{
				name: 'player7',
				id: 7,
				position: 6,
				is_alive: true,
			},
		],
	},
};

export const gameFinish = {
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
		selectedCard: '',
		alreadyPlayed: false,
		alreadyPicked: false,
	},
	playArea: {
		card: null,
	},
	discardPile: {
		discardedCard: '',
	},
	game: {
		position: 0,
		isFinish: 2,
		currentPlayer: 0,
		firstDeckCard: -1,
		players: [
			{
				name: 'player1',
				id: 1,
				position: 0,
				is_alive: false,
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
			{
				name: 'player4',
				id: 4,
				position: 3,
				is_alive: false,
			},
			{
				name: 'player5',
				id: 5,
				position: 4,
				is_alive: true,
			},
			{
				name: 'player6',
				id: 6,
				position: 5,
				is_alive: false,
			},
			{
				name: 'player7',
				id: 7,
				position: 6,
				is_alive: false,
			},
		],
	},
};
