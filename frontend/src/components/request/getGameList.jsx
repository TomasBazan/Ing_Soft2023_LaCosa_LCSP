const SERVER_URL = 'http://localhost:8000/game/list';
// Should get a object like {idGame, password, idUser}
const getGameList = () => {
	const handleJSONParser = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				return resolve({
					status: response.status_code,
					ok: response.ok,
					detail: json.detail,
					games: json.data,
				});
			});
		});
	};

	//const bodyRequest = {};

	const config = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
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
export default getGameList;
