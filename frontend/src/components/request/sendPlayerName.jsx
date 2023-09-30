// Recive un objeto con el nombre del jugador y lo envia al servidor
const SendPlayerName = async ({player}) => {
	console.log(player.name);
	const handleResponse = (response) => {
		const newName = response.name;
		const newId = response.playerId;
		const player = {name: newName, id: newId};
		return player;
	};
	// const playerToSend = {name: player.name};
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(player.name),
	};
	return new Promise((resolve, reject) => {
		fetch('https://localhost:8000/player/register', config)
			.then((res) => res.json())
			.then((response) => {
				if (response.ok) {
					return resolve(handleResponse(response));
				}
				return reject(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
export default SendPlayerName;
