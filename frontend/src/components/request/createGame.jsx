const SERVER_URL = 'http://localhost:8000/game';

export const CreateGame = async ({game}) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) =>
			response.json().then((json) => {
				if (json.ok) {
					resolve({
						status: response.status,
						ok: response.ok,
						detail: response.detail,
						gameId: response.data.gameId,
					});
				} else {
					resolve({
						status: response.status,
						ok: response.ok,
						detail: response.detail,
					});
				}
			}),
		);
	};

	/* const gameToSend = {
		id_player: game.id_player,
		name: game.name,
		min_players: game.min_players,
		max_players: game.max_players,
		password: game.password,
	}; */
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(game),
	};
	console.log('game to seeeend', {game});
	return new Promise((resolve, reject) => {
		fetch(SERVER_URL, config)
			.then(parseJSONResponse)
			.then((response) => {
				if (response.ok) {
					return resolve(response);
				}
				return reject(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
//export default CreateGame;
