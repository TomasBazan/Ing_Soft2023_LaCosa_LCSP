const SERVER_URL = 'http://localhost:8000/game';

const getGameStatus = async (idPlayer) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				console.log('json', json);
				if (response.ok) {
					resolve({
						status: response.status,
						ok: response.ok,
						players: json.data.players,
						position: json.data.my_position,
						isFinish: json.data.game_status,
						currentPlayerId: json.data.current_player,
					});
				} else {
					resolve({
						status: response.status,
						ok: response.ok,
						detail: json.detail,
					});
				}
			});
		});
	};
	const config = {
		method: 'GET',
		headers: {
			'id-player': idPlayer,
		},
	};
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
				return reject(error);
			});
	});
};
export default getGameStatus;
