const SERVER_URL = 'http://localhost:8000/game/join';
// Should get a object like {idGame, password, idUser}
const joinGame = ({idGame, password = null, idUser}) => {
	const handleJSONParser = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				if (response.ok) {
					return resolve({
						status: response.status_code,
						ok: response.ok,
						players: json.data.players,
						canStart: json.data.can_start,
						detail: json.detail,
					});
				} else {
					return resolve({
						status: response.status,
						ok: response.ok,
						canStart: json.data.can_start,
						detail: json.detail,
					});
				}
			});
		});
	};

	const bodyRequest = {
		idGame,
		password,
		idUser,
	};

	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyRequest),
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
