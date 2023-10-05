// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Card, Heading, CardBody, Box, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';

// import {useSelector} from 'react-redux';

export const GameHistory = ({results}) => {
	// const state = useSelector((state) => state);

	return (
		<Card display='flex'>
			<Heading as='h1' noOfLines={1}>
				Game Over
			</Heading>
			<Heading as='h2' noOfLines={1}>
				Results
			</Heading>
			<CardBody>
				{results.players.map((player) => {
					return player.isAlive ? (
						<Box key={player.id}>
							<Heading size='xs'>Player: {player.name}</Heading>
							<Text>Won the game.</Text>
						</Box>
					) : (
						<Box key={player.id}>
							<Heading size='xs'>{player.name}</Heading>
							<Text>Failed to his team.</Text>
						</Box>
					);
				})}
			</CardBody>
		</Card>
	);
};
export default GameHistory;

GameHistory.propTypes = {
	results: PropTypes.shape({
		players: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				id: PropTypes.number.isRequired,
				isAlive: PropTypes.bool.isRequired,
			}),
		).isRequired,
	}).isRequired,
};
