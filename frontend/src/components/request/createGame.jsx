const SERVER_URL = 'https://localhost:8000/game';

const createGame = async ({idPlayer, game}) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) =>
			response.json().then((json) =>
				resolve({
					status: response.status,
					ok: response.ok,
					json,
				}),
			),
		);
	};
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({idPlayer, game}),
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
				reject(error);
			});
	});
};
export default createGame;
