/* eslint-disable camelcase */
const SERVER_URL = 'http://localhost:8000/hand/play';

const playCard = async (cardToken, idPlayer, targetPlayer) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				if (response.ok) {
					resolve({
						status: response.status_code,
						ok: response.ok,
						idPlayer: json.data.id_player,
						cardToken: json.data.card_token,
						targetId: json.data.target_id,
						user: json.data.user,
						targetUser: json.data.target_user,
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

	const {card_token, id_usuario, target_id} = cardToken;
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			card_token: `${card_token}.jpg`,
			id_usuario,
			target_id,
		}),
	};
	return new Promise((resolve, reject) => {
		console.log(config.body.cardToken);
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
