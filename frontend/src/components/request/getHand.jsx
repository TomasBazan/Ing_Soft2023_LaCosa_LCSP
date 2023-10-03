const SERVER_URL = 'https://localhost:8000/hand';

const getHand = async (idPlayer) => {
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

	const config = {
		method: 'GET',
		header: {
			'Content-Type': 'application/json',
		},
		// body: JSON.stringify(idPlayer),
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
