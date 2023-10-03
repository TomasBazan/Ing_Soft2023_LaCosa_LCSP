// Mocked version of sendPlayerName
const SendPlayerName = async ({player}) => {
	if (player.name === 'userName') {
		return new Promise((resolve) =>
			setTimeout(() => resolve({status: 200, name: 'username', id: 1}), 500),
		);
	} else if (player.name === 'invalidName') {
		return new Promise((resolve) =>
			setTimeout(() => resolve({status: 401, name: null, id: null}), 500),
		);
	} else {
		return new Promise((resolve) =>
			setTimeout(() => resolve({status: 420}), 500),
		);
	}
};
export default SendPlayerName;
