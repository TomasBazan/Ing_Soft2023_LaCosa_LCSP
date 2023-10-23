const SERVER_URL = 'http://localhost:8000/game/join';
// Should recieve an Object {idUser}
const getLobbyStatus = (idUser) => {
	const handleJSONParser = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				console.log('en request la resp es', {response});
				if (response.ok) {
					resolve({
						status: response.status,
						ok: response.ok,
						players: json.data.players,
						canStart: json.data.can_start,
						isHost: json.data.is_host,
						detail: json.detail,
						statusGame: json.data.game_status,
					});
				}
				resolve({
					status: response.status,
					ok: response.ok,
					canStart: false,
					detail: json.detail,
				});
			});
		});
	};
	const config = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'id-player': idUser,
		},
	};
	console.log('In getLobbyStatus', {config});
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
export default getLobbyStatus;
