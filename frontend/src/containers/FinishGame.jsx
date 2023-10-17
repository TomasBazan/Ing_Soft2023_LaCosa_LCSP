// this component is used to finish a game and show who won
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Center, Card, Box} from '@chakra-ui/react';
import {GameHistory} from '../components/FinishGame/GameHistory';
import GoHome from '../components/FinishGame/Footer';
import {PropTypes} from 'prop-types';

export const FinishGame = ({myPlayerId = null}) => {
	return (
		<Center>
			<Card>
				<GameHistory />
				{myPlayerId !== null ? <GoHome /> : <Box>Godbye</Box>}
			</Card>
		</Center>
	);
};

FinishGame.propTypes = {
	myPlayerId: PropTypes.number,
};
export default FinishGame;
