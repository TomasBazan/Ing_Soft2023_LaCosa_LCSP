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
import {useEffect} from 'react';
import {
	setCurrentPlayerInGame,
	setPlayerInGame,
	setPositionInGame,
	setIsFinish,
} from '../../appActions';
import {endTurn} from '../request/endTurn';
import {FinishGame} from '../../containers/FinishGame';
const Game = () => {
	const playerId = JSON.parse(sessionStorage.getItem('player')).id;
	const idGame = sessionStorage.getItem('idGame');
	const dispatch = useDispatch();
	const gameStatus = useSelector((state) => state.game.isFinish);

	useEffect(() => {
		async function getDataOfGame() {
			try {
				const gameStatus = await getGameStatus(playerId);
				dispatch(setPlayerInGame(gameStatus.players));
				dispatch(setPositionInGame(gameStatus.position));
				dispatch(setIsFinish(gameStatus.isFinish));
				dispatch(setCurrentPlayerInGame(gameStatus.currentPlayerId));
			} catch (error) {
				if (!error.ok) {
					console.log('Error unexpected fetching data of the game');
				} else {
					console.log('Error in getGameStatus', error);
				}
			}
		}

		const intervalId = setInterval(() => {
			getDataOfGame();
		}, 1000);
		return () => clearInterval(intervalId);
	}, [dispatch, playerId]);

	async function finishTurn() {
		try {
			const response = await endTurn(idGame);
			dispatch(setCurrentPlayerInGame(response.idPlayerTurn));
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
							bg='teal'
							aria-label='Call Sage'
							fontSize='20px'
							onClick={() => {
								finishTurn();
							}}
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
