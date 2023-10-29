import {useSelector} from 'react-redux/es/hooks/useSelector';

export const usePlayers = () => {
	const game = useSelector((state) => state.game);

	const getPlayers = (players) => {
		const sortedPlayers = [...players]?.sort((a, b) => a.position - b.position);
		return sortedPlayers;
	};
	const players = getPlayers(game.players);
	const currentPlayer = game.currentPlayer;
	return {players, currentPlayer};
};
