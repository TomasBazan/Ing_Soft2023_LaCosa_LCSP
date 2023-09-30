// Recive un objeto con el nombre del jugador y lo envia al servidor
const SERVER_URL = 'http://localhost:8000/register';

const SendPlayerName = async ({player}) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) =>
				resolve({
					status: response.status,
					ok: response.ok,
					json,
				}),
			);
		});
	};
	const playerToSend = {
		name: player.name,
	};
	// const playerToSend = {name: player.name};
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(playerToSend),
	};
	return new Promise((resolve, reject) => {
		fetch(SERVER_URL, config)
			.then(parseJSONResponse)
			.then((json) => {
				if (json.ok) {
					return resolve(json);
				}
				return reject(json);
			})
			.catch((error) => {
				console.log('Error in sendPlayerName: ', {error});
				throw error;
			});
	});
};
export default SendPlayerName;
