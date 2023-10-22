import {v4 as uuidv4} from 'uuid';

const SERVER_URL = 'http://localhost:8000/hand';

const getHand = async (idPlayer) => {
	const parseJSONResponse = (response) => {
		return new Promise((resolve) => {
			response.json().then((json) => {
				if (response.ok) {
					resolve({
						status: response.status,
						ok: response.ok,
						cards: json.data.hand.map((card) => ({
							id: uuidv4(),
							token: card.card_token,
							type: card.type,
						})),
						detail: json.detail,
					});
				} else {
					resolve({
						status: response.status,
						ok: response.ok,
						detail: json.detail,
					});
				}
			});
		});
	};

	const config = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'id-player': idPlayer,
		},
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

export default getHand;
