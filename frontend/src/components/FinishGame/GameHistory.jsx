// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Card, Heading, CardBody, Box, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const GameHistory = ({results}) => {
	// Check if the players array inside results is empty
	if (results.players.length === 0) {
		return (
			<Card display='flex'>
				<Heading as='h1' noOfLines={1}>
					Game Over
				</Heading>
				<Heading as='h2' noOfLines={1}>
					Results
				</Heading>
				<CardBody>
					<Box>
						<Heading size='xs'>Invalid Results</Heading>
						<Text>There is no data to show</Text>
					</Box>
				</CardBody>
			</Card>
		);
	}
	// revisar la funcionalidad que checkea que todos estan vivos o muertos
	const allStatusEndGame = results.players.map((player) => player.isAlive);
	const inValidResult = checkAllSameStatus(allStatusEndGame);
	if (!inValidResult) {
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
								<Heading size='xs'>Player {player.name}</Heading>
								<Text>Won the game.</Text>
							</Box>
						) : (
							<Box key={player.id}>
								<Heading size='xs'>Player {player.name}</Heading>
								<Text>Failed to his team.</Text>
							</Box>
						);
					})}
				</CardBody>
			</Card>
		);
	} else {
		return (
			<Card display='flex'>
				<Heading as='h1' noOfLines={1}>
					Game Over
				</Heading>
				<CardBody>
					<Box>
						<Heading size='xs'>Invalid Results</Heading>
						<Text>There is no data to show</Text>
					</Box>
				</CardBody>
			</Card>
		);
	}

	function checkAllSameStatus(status) {
		return status.every((val, arr) => val === arr[0]);
	}
};
GameHistory.propTypes = {
	results: PropTypes.shape({
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
