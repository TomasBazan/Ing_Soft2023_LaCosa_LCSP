import Deck from '../Deck/Deck';
import Hand from '../Hand/Hand';
import PlayArea from '../PlayArea/PlayArea';
import DiscardPile from '../DiscardPile/DiscardPile';
import Positions from './Positions.jsx';
import {
	Grid,
	Center,
	Box,
	Text,
	GridItem,
	Flex,
	Button,
} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import getGameStatus from '../request/getGameStatus';
import {useEffect, useState} from 'react';
import {
	setCurrentPlayerInGame,
	setPlayerInGame,
	setPositionInGame,
	setIsFinish,
	restoreTurnConditions,
} from '../../appActions';
import {endTurn} from '../request/endTurn';
import {FinishGame} from '../../containers/FinishGame';
export const Game = () => {
	const idPlayer = JSON.parse(sessionStorage.getItem('player')).id;
	const currentPlayer = useSelector((state) => state.game.currentPlayer);
	const idGame = JSON.parse(sessionStorage.getItem('gameId')).id;
	const dispatch = useDispatch();
	const gameStatus = useSelector((state) => state.game.isFinish);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const connection = new WebSocket('ws://localhost:8000/ws/game_status'); // testearlo al ws o http.
		setSocket(connection);
		console.log(connection);
		console.log('***CREATED WEBSOCKET');

		connection.onopen = () => {
			console.log('***ONOPEN id=', idPlayer);
			// send the playerid

			const idToSend = {type: 'game_status', content: {id_player: idPlayer}};
			console.log('sending ', JSON.stringify(idToSend));
			console.log('on the web socket');
			connection.send(JSON.stringify(idToSend)); // event: game_status.
		};

		const idToSend = {content: {id_player: idPlayer}};

		/* 		connection.addEventListener('game_status', (response) => {
			console.log('im listening the event');
			console.log('the response is');
			console.log(response.data);
		}); */

		async function getDataOfGame() {
			const gameStatus = await getGameStatus(idPlayer, socket);
			console.log('THE gameStatus is ');
			console.log(gameStatus);
			dispatch(setPlayerInGame(gameStatus.players));
			dispatch(setPositionInGame(gameStatus.position));
			dispatch(setIsFinish(gameStatus.isFinish));
			dispatch(setCurrentPlayerInGame(gameStatus.currentPlayerId));
		}

		getDataOfGame();
		return () => {
			//connection.close();
			connection.onmessage = null;
			console.log('on return');
		};
	}, [idPlayer, dispatch]);

	async function finishTurn() {
		try {
			const response = await endTurn(idGame);
			dispatch(setCurrentPlayerInGame(response.idPlayerTurn));
			dispatch(restoreTurnConditions()); // so that player can pick and play again
		} catch (error) {
			alert('Failed to finish turn, try again');
			console.log(error);
		}
	}

	if (gameStatus === 2) {
		return <FinishGame />;
	} else {
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
					<GridItem rowSpan={1} colSpan={3} paddingTop='40px'>
						<Positions relativePositionToTable={2} />
					</GridItem>
					<GridItem rowSpan={1} colSpan={1} />
					<GridItem rowSpan={3} colSpan={1} paddingLeft='160px'>
						<Positions relativePositionToTable={3} />
					</GridItem>
					<GridItem
						boxShadow='2xl'
						rowSpan={3}
						colSpan={3}
						bgImage='/src/assets/table_board.png'
						gap={5}
						borderRadius='lg'
					>
						<Flex gap='12px' direction='row' justify='center'>
							<Box w='200px' border='2px' color='gray.800' mt='5'>
								<Text textAlign='center' color='white'>
									DECK
								</Text>
								<Deck />
							</Box>
							<Box w='200px' border='2px' color='gray.800' mt='5'>
								<Text textAlign='center' color='white'>
									PLAY
								</Text>
								<PlayArea />
							</Box>
							<Box w='200px' border='2px' color='gray.800' mt='5'>
								<Text textAlign='center' color='white'>
									DISCARD
								</Text>
								<DiscardPile />
							</Box>
						</Flex>
					</GridItem>
					<GridItem rowSpan={3} colSpan={1} paddingRight='160px'>
						<Positions relativePositionToTable={1} />
					</GridItem>
					<GridItem rowSpan={1} colSpan={1} />
					<GridItem rowSpan={1} colSpan={3} paddingBottom='60px'>
						<Positions relativePositionToTable={0} />
					</GridItem>
					<GridItem
						display='flex'
						justifyContent='center'
						alignItems='center'
						rowSpan={1}
						colSpan={1}
					>
						<Button
							variant='solid'
							bg={idPlayer === currentPlayer ? 'teal' : 'gray'}
							aria-label='Call Sage'
							fontSize='20px'
							onClick={() => {
								if (idPlayer === currentPlayer) {
									finishTurn();
								}
							}}
							disabled={idPlayer !== currentPlayer}
						>
							Finish Turn
						</Button>
					</GridItem>
					<GridItem rowSpan={2} colSpan={5}>
						<Flex justify='center' direction='row'>
							<Box maxW='60%'>
								<Hand />
							</Box>
						</Flex>
					</GridItem>
				</Grid>
			</Center>
		);
	}
};
export default Game;
