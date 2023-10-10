import './Game.css';

import Deck from '../Deck/Deck.jsx';
import Hand from '../Hand/Hand.jsx';
import PlayArea from '../PlayArea/PlayArea';
import {Grid, Center, Box, GridItem, Flex, Avatar} from '@chakra-ui/react';

const Game = async () => {
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
						<Avatar></Avatar>
						<Avatar></Avatar>
						<Avatar></Avatar>
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
						<Avatar></Avatar>
						<Avatar></Avatar>
						<Avatar></Avatar>
					</Flex>
				</GridItem>
				<GridItem rowSpan={3} colSpan={3} bg='red' gap={10}>
					{/* BOx with a Deck component that aling in the center right */}
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
						<Avatar></Avatar>
						<Avatar></Avatar>
						<Avatar></Avatar>
					</Flex>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1} />
				<GridItem rowSpan={1} colSpan={3} bg='black'>
					<Flex justify='center' direction='row' justifyContent='space-evenly'>
						<Avatar></Avatar>
						<Avatar></Avatar>
						<Avatar></Avatar>
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
