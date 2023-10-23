const SERVER_URL = 'http://localhost:8000/game/start';

// Should be called with an object with the idPartida and idUsuario
const startGame = async ({idPlayer}) => {
	console.log('el id es', idPlayer);
	const parseJSONResponse = (response) => {
		return new Promise((resolve) =>
			response.json().then((json) => {
				resolve({
					status: response.status,
					ok: response.ok,
					detail: json.detail,
					firstDeckCardBack: json.data.first_card_type,
				});
			}),
		);
	};
	const bodyToSend = {
		id_player: idPlayer,
	};
	const config = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyToSend),
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

export default startGame;
