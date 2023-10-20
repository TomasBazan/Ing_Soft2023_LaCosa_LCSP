import {rest} from 'msw';

export const gameHandlers = [
	rest.get('http://localhost:8000/game', (req, res, ctx) => {
		console.log('getGameStatus:', req);
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				detail: 'Some detail mocked',
				data: {
					my_position: 0,
					game_status: 2,
					current_player: 1,
					players: [
						{name: 'tomas', id: 1, position: 0, is_alive: true},
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
				},
			}),
		);
	}),
	rest.post('http://localhost:8000/game/next_turn', (req, res, ctx) => {
		console.log('endTurn:', req);
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				detail: 'Finished turn',
				data: {
					current_turn: 1,
					player_id: 2,
				},
			}),
		);
	}),
];
