import {v4 as uuidv4} from 'uuid';
const SERVER_URL = 'http://localhost:8000/game/discard_card';

const discardCard = async ({discardedCard, idPlayer}) => {
	console.log('hello from discard card');
	console.log('discardedCard: ', discardedCard);
	const parseJSONResponse = (response) => {
		return new Promise((resolve) =>
			response.json().then((json) => {
				if (response.ok) {
					resolve({
						status: response.status_code,
						ok: response.ok,
						detail: json.detail,
						cards: json.data.hand.map((card) => ({
							id: uuidv4(),
							token: card.card_token,
							type: card.type,
						})),
					});
				} else {
					resolve({
						status: response.status,
						ok: response.ok,
						detail: json.detail,
					});
				}
			}),
		);
	};
	const bodyTosend = {
		id_player: idPlayer,
		card_token: discardedCard.token,
	};

	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyTosend),
	};
	console.log('Discarding card: ', bodyTosend.card_token);
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
export default discardCard;
