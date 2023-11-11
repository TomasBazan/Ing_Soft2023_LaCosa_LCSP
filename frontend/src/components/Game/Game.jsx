import Deck from '../Deck/Deck';
import Hand from '../Hand/Hand';
import PlayArea from '../PlayArea/PlayArea';
import DiscardPile from '../DiscardPile/DiscardPile';
import Positions from './Positions';
import {Chat} from './Chat';
import {
	Grid,
	Center,
	Box,
	Text,
	GridItem,
	Flex,
	Button,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalContent,
	useDisclosure,
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
	const playerId = JSON.parse(sessionStorage.getItem('player')).id;
	const currentPlayer = useSelector((state) => state.game.currentPlayer);
	const idGame = JSON.parse(sessionStorage.getItem('gameId')).id;
	const dispatch = useDispatch();
	const gameStatus = useSelector((state) => state.game.isFinish);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [displayDefense, setDisplayDefense] = useState(false);
	const [textNotice, setTextNotice] = useState('');
	const [renderModal, setRenderModal] = useState(null);
	useEffect(() => {
		if (!isOpen) {
			setDisplayDefense(false);
		}
		if (displayDefense) {
			onOpen();
		}
	}, [isOpen, onOpen, displayDefense]);

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
				<>
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay
							bg='none'
							backdropFilter='auto'
							backdropInvert='80%'
							backdropBlur='2px'
						/>
						<ModalContent>
							<ModalHeader>{textNotice}</ModalHeader>

							<ModalBody>{renderModal}</ModalBody>

							<ModalFooter>
								<Button colorScheme='red' variant='ghost' onClick={onClose}>
									Resolve
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
				<Grid
					h='90vh'
					w='90vw'
					m='10'
					p=''
					templateRows='repeat(7, 1fr)'
					templateColumns='repeat(9, 1fr)'
					gap={4}
				>
					<GridItem textAlign='center' bg='yellow' rowSpan={7} colSpan={2}>
						<Text>logs</Text>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1} />
					<GridItem rowSpan={1} colSpan={3} paddingTop='40px'>
						<Positions relativePositionToTable={2} />
					</GridItem>
					<GridItem rowSpan={1} colSpan={1} />
					<GridItem bg='yellow' rowSpan={7} colSpan={2}>
						<Chat />
					</GridItem>
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
					<GridItem rowSpan={1} colSpan={1}>
						<Flex
							direction='column'
							p='5px'
							justifyContent='center'
							alignItems='center'
						>
							<Button
								m='10px'
								variant='solid'
								bg={playerId === currentPlayer ? 'teal' : 'gray'}
								aria-label='Call Sage'
								fontSize='20px'
								onClick={() => {
									if (playerId === currentPlayer) {
										finishTurn();
									}
								}}
								disabled={playerId !== currentPlayer}
							>
								Finish Turn
							</Button>
							<Button
								variant='solid'
								bg={playerId === currentPlayer ? 'teal' : 'gray'}
								aria-label='Call Sage'
								fontSize='20px'
								onClick={() => {
									// if (playerId === currentPlayer) { // add assertion when full turn is done
									// }
									setTextNotice('You have to exchange a card');
									setRenderModal(<Hand />);
									onOpen();
								}}
								disabled={playerId !== currentPlayer}
							>
								Exchange card
							</Button>
						</Flex>
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
