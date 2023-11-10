const getGameStatus = (idPlayer, connection) => {
	return new Promise((resolve, reject) => {
		connection.onmessage = function (response) {
			try {
				const json = JSON.parse(response.data);
				const player = json.data.players.find(
					(player) => player.id === idPlayer,
				)?.position;

				const gameStatus = {
					status: json.status_code,
					ok: 1,
					players: json.data.players,
					position: player,
					isFinish: json.data.game_status,
					currentPlayerId: json.data.current_player,
				};

				resolve(gameStatus);
			} catch (error) {
				reject(error);
			}
		};
	});
};

export default getGameStatus;
