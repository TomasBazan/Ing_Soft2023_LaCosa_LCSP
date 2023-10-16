import {Avatar} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const PlayerIcons = ({
	relativePositionToTable,
	players = [],
	currentPlayerId = 0,
}) => {
	if (relativePositionToTable === 0) {
		return (
			<>
				{players.slice(0, 3).map((player) => (
					<Avatar
						key={player.id}
						color='black'
						bg={currentPlayerId === player.id ? 'green' : 'gray.300'}
					>
						{player.name}
					</Avatar>
				))}
			</>
		);
	} else if (relativePositionToTable === 1) {
		return (
			<>
				{players.slice(3, 6).map((player) => (
					<Avatar
						key={player.id}
						color='black'
						bg={currentPlayerId === player.id ? 'green' : 'gray.300'}
					>
						{player.name}
					</Avatar>
				))}
			</>
		);
	} else if (relativePositionToTable === 2) {
		return (
			<>
				{players.slice(6, 9).map((player) => (
					<Avatar
						key={player.id}
						color='black'
						bg={currentPlayerId === player.id ? 'green' : 'gray.300'}
					>
						{player.name}
					</Avatar>
				))}
			</>
		);
	} else if (relativePositionToTable === 3) {
		return (
			<>
				{players.slice(9, 12).map((player) => (
					<Avatar
						key={player.id}
						color='black'
						bg={currentPlayerId === player.id ? 'green' : 'gray.300'}
					>
						{player.name}
					</Avatar>
				))}
			</>
		);
	}
	return null;
};

PlayerIcons.propTypes = {
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
export default PlayerIcons;
