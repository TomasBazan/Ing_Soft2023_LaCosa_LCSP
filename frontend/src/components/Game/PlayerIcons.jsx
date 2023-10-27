import {Avatar, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {addToPlayArea} from '../../appActions';

export const PlayerIcons = ({
	relativePositionToTable,
	players = [],
	currentPlayerId = 0,
}) => {
	const myPlayerId = JSON.parse(sessionStorage.getItem('player')).id;
	const selectedCard = useSelector((state) => state.hand.selectedCard);
	const dispatch = useDispatch();

	/* returns true if target is adjacent to current player, false otherwise  */
	const validTarget = (player) => {
		const currentPlayerPosition = getPlayerPosition(players, currentPlayerId);
		return (
			player.position === currentPlayerPosition + 1 ||
			player.position === currentPlayerPosition - 1
		);
	};

	const renderPlayer = (player) => {
		/* if a player is clicked with a card selected the card is sent to the
		play area with the player clicked as the target */
		const handleClick = (player) => {
			if (selectedCard && validTarget(player)) {
				dispatch(addToPlayArea({card: selectedCard, target: player.id}));
			}
		};

		return (
			<button
				onClick={() => {
					handleClick(player);
				}}
			>
				<Avatar
					size='lg'
					key={player.id}
					color='white'
					data-testid={'player-' + player.id}
					bg={avatarColor(currentPlayerId, player)}
					border={myPlayerId === player.id ? '2px solid blue' : '0px'}
				>
					<Text fontSize='xl'>{player.name}</Text>
				</Avatar>
			</button>
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

/* search for a player with id targetId in the players array */
function getPlayerPosition(players, targetId) {
	for (let i = 0; i < players.length; i++) {
		if (players[i].id === targetId) {
			return players[i].position;
		}
	}
	return null; // if player not found
}

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
