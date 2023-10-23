import {Avatar, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const PlayerIcons = ({
	relativePositionToTable,
	players = [],
	currentPlayerId = 0,
}) => {
	const myPlayerId = JSON.parse(sessionStorage.getItem('player')).id;

	const renderPlayer = (player) => {
		return (
			<Avatar
				size='lg'
				key={player.id}
				color='white'
				bg={avatarColor(currentPlayerId, player)}
				border={myPlayerId === player.id ? '2px solid blue' : '0px'}
			>
				<Text fontSize='xl'>{player.name}</Text>
			</Avatar>
		);
	};

	if (relativePositionToTable === 0) {
		return <>{players.slice(0, 3).map((player) => renderPlayer(player))}</>;
	} else if (relativePositionToTable === 1) {
		return <>{players.slice(3, 6).map((player) => renderPlayer(player))}</>;
	} else if (relativePositionToTable === 2) {
		return <>{players.slice(6, 9).map((player) => renderPlayer(player))}</>;
	} else if (relativePositionToTable === 3) {
		return <>{players.slice(9, 12).map((player) => renderPlayer(player))}</>;
	}
	return null;
};

const avatarColor = (currentPlayerId, player) => {
	let bgColor = 'gray.900';

	if (currentPlayerId === player.id) {
		bgColor = 'teal.500';
	} else if (!player.is_alive) {
		bgColor = 'red.500';
	}
	return bgColor;
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
