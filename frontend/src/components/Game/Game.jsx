import Deck from '../Deck/Deck.jsx';
import Hand from '../Hand/Hand.jsx';
import PlayArea from '../PlayArea/PlayArea';
import Positions from './Positions.jsx';
import {Grid, Center, Box, GridItem, Flex} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import getGameStatus from '../request/getGameStatus';
import {useEffect} from 'react';
import {
	setCurrentPlayerInGame,
	setPlayerInGame,
	setPositionInGame,
	setRolInGame,
} from '../../appActions';

const Game = () => {
	const myPlayer = useSelector((state) => state.player);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getDataOfGame(id) {
			try {
				const gameStatus = await getGameStatus(id);
				dispatch(setPlayerInGame(gameStatus.players));
				dispatch(setPositionInGame(gameStatus.position));
				dispatch(setRolInGame(gameStatus.rol));
				dispatch(setCurrentPlayerInGame(gameStatus.currentPlayerId));
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
					borderRadius='full'
				>
					<Flex gap='12px' direction='row' justify='center'>
						<Box w='200px' border='2px' color='black'>
							Deck
							<Deck />
						</Box>
						<Box w='200px' border='2px' color='black'>
							Play
							<PlayArea />
						</Box>
						<Box w='200px' border='2px' color='black'>
							Discard
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
};
export default Game;
