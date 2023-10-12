import './Game.css';

import Deck from '../Deck/Deck.jsx';
import Hand from '../Hand/Hand.jsx';
import PlayArea from '../PlayArea/PlayArea';
import {Grid, Center, Box, GridItem, Flex, Avatar} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import getGameStatus from '../request/getGameStatus';
import {useEffect} from 'react';
import {
	setPlayerInGame,
	setPositionInGame,
	setRolInGame,
} from '../../appActions';

const Game = () => {
	const game = useSelector((state) => state.game);
	const myPlayer = useSelector((state) => state.player);
	const dispatch = useDispatch();
	useEffect(() => {
		async function getDataOfGame(id) {
			try {
				const gameStatus = await getGameStatus(id);
				dispatch(setPlayerInGame(gameStatus.players));
				dispatch(setPositionInGame(gameStatus.position));
				dispatch(setRolInGame(gameStatus.rol));
			} catch (error) {
				if (!error.ok) {
					console.log('Error unexpected fetching data of the game');
				} else {
					console.log('Error in getGameStatus', error);
				}
			}
		}
		getDataOfGame(myPlayer.id);
	}, [dispatch, myPlayer.id]);

	const players = game.players;
	const alivePlayers = players.filter((player) => player.is_alive === true);
	const sortedPlayers = [...alivePlayers].sort(
		(a, b) => a.position - b.position,
	);

	return (
		<Center h='100%' w='100%'>
			<Grid
				h='90vh'
				w='60vw'
				m='0'
				p='0'
				templateRows='repeat(7, 1fr)'
				templateColumns='repeat(5, 1fr)'
				gap={4}
			>
				<GridItem rowSpan={1} colSpan={1} />
				<GridItem rowSpan={1} colSpan={3} bg='blue'>
					<Flex justify='center' justifyContent='space-evenly' direction='row'>
						{sortedPlayers.slice(6, 9).map((player) => (
							<Avatar key={player.name}>{player.name}</Avatar>
						))}
					</Flex>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1} />
				<GridItem rowSpan={3} colSpan={1} bg='green'>
					<Flex
						height='100%'
						direction='column'
						justify='center'
						alignItems='center'
						justifyContent='space-evenly'
					>
						{sortedPlayers.slice(9, 12).map((player) => (
							<Avatar key={player.name}>{player.name}</Avatar>
						))}
					</Flex>
				</GridItem>
				<GridItem rowSpan={3} colSpan={3} bg='red' gap={10}>
					<Flex gap='12px' direction='row' justify='center'>
						<Box w='200px' border='2px' color='black'>
							<Deck />
						</Box>
						<Box w='200px' border='2px' color='black'>
							<PlayArea />
						</Box>
						<Box w='200px' border='2px' color='black'></Box>
					</Flex>
				</GridItem>
				<GridItem rowSpan={3} colSpan={1} bg='violet'>
					<Flex
						height='100%'
						direction='column'
						justify='center'
						alignItems='center'
						justifyContent='space-evenly'
					>
						{sortedPlayers.slice(3, 6).map((player) => (
							<Avatar key={player.name}>{player.name}</Avatar>
						))}
					</Flex>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1} />
				<GridItem rowSpan={1} colSpan={3} bg='black'>
					<Flex justify='center' direction='row' justifyContent='space-evenly'>
						{sortedPlayers.slice(0, 3).map((player) => (
							<Avatar key={player.name}>{player.name}</Avatar>
						))}
					</Flex>
				</GridItem>
				<GridItem rowSpan={2} colSpan={5} bg='yellow'>
					<Flex justify='center' direction='row'>
						<Box maxW='60%'>
							<Hand />
						</Box>
					</Flex>
				</GridItem>
			</Grid>
		</Center>
	);
};
export default Game;
