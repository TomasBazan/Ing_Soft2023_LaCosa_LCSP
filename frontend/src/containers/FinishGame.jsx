// this component is used to finish a game and show who won
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Center, Card, Box} from '@chakra-ui/react';
import {GameHistory} from '../components/FinishGame/GameHistory';
import GoHome from '../components/FinishGame/Footer';
import {PropTypes} from 'prop-types';
/* 
const result = {
	players: [
		{name: 'mili', id: 1, isAlive: false},
		{name: 'santi', id: 2, isAlive: false},
		{name: 'martin', id: 3, isAlive: false},
		{name: 'juan', id: 4, isAlive: true},
	],
};
const quieroPasar = {
	players: [
		{name: 'mili', id: 1, isAlive: false},
		{name: 'santi', id: 2, isAlive: false},
		{name: 'martin', id: 3, isAlive: false},
		{name: 'juan', id: 4, isAlive: true},
	],
};
 */
export const FinishGame = ({endGameStatus}) => {
	return (
		<Center>
			<Card>
				<GameHistory results={endGameStatus} />
				{endGameStatus.myPlayer.id !== null ? <GoHome /> : <Box>Godbye</Box>}
			</Card>
		</Center>
	);
};

FinishGame.propTypes = {
	endGameStatus: PropTypes.shape({
		myPlayer: PropTypes.shape({
			name: PropTypes.stringisRequired,
			id: PropTypes.number.isRequired,
		}),
		players: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				id: PropTypes.number.isRequired,
				isAlive: PropTypes.bool.isRequired,
			}),
		),
	}),
};
export default FinishGame;
