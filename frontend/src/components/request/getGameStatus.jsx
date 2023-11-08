// import {json} from 'react-router-dom';

// const SERVER_URL = 'http://localhost:8000/game';

const getGameStatus = async (idPlayer, connection) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				console.log('json', json);
				console.log(idPlayer);
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

	// chequear que onda el async en WS
	connection.addEventListener('getGameStatus', async (response) => {
		console.log(response.data);
		const promise = await parseJSONResponse(response.data);

		if (!promise.ok) {
			const error = {status: promise.status, detail: promise.detail};
			throw error;
		} else {
			return promise;
		}
	});
};
export default getGameStatus;
