import {Flex} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PlayerIcons from './PlayerIcons';
import {usePlayers} from '../../customHooks/usePlayers';

export const Positions = ({relativePositionToTable}) => {
	const {players, currentPlayerId} = usePlayers();
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

export default Positions;
