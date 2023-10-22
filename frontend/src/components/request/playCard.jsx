const SERVER_URL = 'https://localhost:8000/hand/play';
// Should pass an object with the idPlayer, targetId and cardToken
const playCard = async (values) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				if (response.ok) {
					resolve({
						status: response.status_code,
						ok: response.ok,
						// player info
						idPlayer: json.data.user.id,
						playerName: json.data.user.name,
						playerIsAlive: json.data.user.is_alive,
						playerIsInfected: json.data.user.is_infected,
						playerPosition: json.data.user.my_position,
						// target player info
						idTarget: json.data.user.id,
						targetName: json.data.user.name,
						targetIsAlive: json.data.user.is_alive,
						targetIsInfected: json.data.user.is_infected,
						targetPosition: json.data.user.my_position,
						// game info
						game: json.data.user.game,
						theThingWon: json.data.the_thing_won,
						theHumansWon: json.data.the_humans_won,
					});
				} else {
					resolve({
						status: response.status_code,
						ok: response.ok,
						detail: json.detail,
					});
				}
			});
		});
	};
	const bodyTosend = {
		id_usuario: values.idPlayer,
		target_id: values.targetId,
		card_token: values.cardToken,
	};
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyTosend),
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

export default playCard;
