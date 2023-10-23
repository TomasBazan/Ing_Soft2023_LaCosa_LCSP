import {Flex} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import PlayerIcons from './PlayerIcons';

export const Positions = ({relativePositionToTable}) => {
	const game = useSelector((state) => state.game);
	const players = getPlayers(game.players);
	const currentPlayerId = game.currentPlayer;

	if (relativePositionToTable === 0 || relativePositionToTable === 2) {
		return (
			<Flex justify='center' justifyContent='space-evenly' direction='row'>
				<PlayerIcons
					relativePositionToTable={relativePositionToTable}
					players={players}
					currentPlayerId={currentPlayerId}
				/>
			</Flex>
		);
	} else {
		return (
			<Flex
				height='100%'
				direction='column'
				justify='center'
				alignItems='center'
				justifyContent='space-evenly'
			>
				<PlayerIcons
					relativePositionToTable={relativePositionToTable}
					players={players}
					currentPlayerId={currentPlayerId}
				/>
			</Flex>
		);
	}
};

Positions.propTypes = {
	relativePositionToTable: PropTypes.number,
	players: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			position: PropTypes.number,
			is_alive: PropTypes.bool,
		}),
	),
	currentPlayerId: PropTypes.number,
};

function getPlayers(players) {
	const sortedPlayers = [...players]?.sort((a, b) => a.position - b.position);
	return sortedPlayers;
}

export default Positions;
