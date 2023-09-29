const SERVER_URL = 'https://localhost:8000/game/join';

const joinGame = (idGame, password, idUser) => {
	const handleJSONParser = (response) => {
		return new Promise((resolve, reject) => {
			response
				.json()
				.then((json) =>
					resolve({
						status: response.status,
						ok: response.ok,
						json,
					}),
				)
				.catch((error) => reject(error));
		});
	};
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({idGame, password, idUser}),
	};
	return new Promise((resolve, reject) => {
		fetch(SERVER_URL, config)
			.then(handleJSONParser)
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
export default joinGame;
