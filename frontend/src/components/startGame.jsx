const SERVER_URL = 'https://localhost:8000/game/start';

const startGame = async ({idPartida, idUsuario}) => {
	const config = {
		method: 'PUT',
		header: {},
		body: JSON.stringify({idPartida, idUsuario}),
	};
	const parseJSONResponse = (response) => {
		return new Promise((resolve) =>
			response.json().then((json) => {
				resolve({
					status: response.status,
					ok: response.ok,
					json,
				});
			}),
		);
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
