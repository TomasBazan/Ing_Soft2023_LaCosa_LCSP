const SERVER_URL = 'http://localhost:8000/game/join';
// Should get a object like {idGame, password, idUser}
const joinGame = ({idGame, password = null, idUser}) => {
	const handleJSONParser = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				return resolve({
					status: response.status_code,
					ok: response.ok,
					detail: json.detail,
				});
			});
		});
	};

	const bodyRequest = {
		id_game: idGame,
		password: password,
		id_player: idUser,
	};

	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyRequest),
	};
	return new Promise((resolve, reject) => {
		console.log('config', config);
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
