import {useSelector} from 'react-redux';

export const usePlayers = () => {
	const game = useSelector((state) => state.game);

	const getPlayers = (players) => {
		const sortedPlayers = [...players]?.sort((a, b) => a.position - b.position);
		return sortedPlayers;
	};
	const players = getPlayers(game.players);
	const currentPlayerId = game.currentPlayer;
	return {players, currentPlayerId};
};
