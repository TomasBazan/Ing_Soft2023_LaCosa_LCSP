// this component is used to finish a game and show who won
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Center, Card} from '@chakra-ui/react';
import {GameHistory} from '../components/FinishGame/GameHistory';
import GoHome from '../components/FinishGame/Footer';
const result = {
	players: [
		{name: 'mili', id: 1, isAlive: false},
		{name: 'santi', id: 2, isAlive: false},
		{name: 'martin', id: 3, isAlive: false},
		{name: 'juan', id: 4, isAlive: true},
	],
};
const FinishGame = () => {
	return (
		<Center>
			<Card>
				<GameHistory results={result} />
				<GoHome />
			</Card>
		</Center>
	);
};

export default FinishGame;
