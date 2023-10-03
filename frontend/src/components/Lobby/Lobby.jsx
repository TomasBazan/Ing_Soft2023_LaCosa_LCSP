import {
	VStack,
	Button,
	OrderedList,
	ListItem,
	// ChakraProvider,
} from '@chakra-ui/react';
import getLobbyStatus from '../request/getLobbyStatus';
import {useDispatch, useSelector} from 'react-redux';
import {setCanStart, setLobby} from '../../appActions';
import {useEffect} from 'react';

// mock respuestas por ahora 		{user_name: 'toomas', id: 5, is_host: 0},

/* const resp1 = {
	players: [
		{user_name: 'pepe', id: 1, is_host: 1},
		{user_name: 'papa', id: 2, is_host: 0},
		{user_name: 'pupu', id: 3, is_host: 0},
		{user_name: 'pipi', id: 4, is_host: 0},
		{user_name: 'toomas', id: 5, is_host: 0},
	],
	can_start: 1,
}; */

const Lobby = () => {
	const onClick = async () => {
		console.log('me clickearon uwu');
	};

	const dispatch = useDispatch();

	const userId = useSelector((state) => state.player.id);
	const gameStatus = useSelector((state) => state.lobby);

	console.log(
		'ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	);
	console.log(gameStatus);

	// const userId = 1;

	useEffect(() => {
		const buscarJugadores = async () => {
			try {
				const fetchedresp = await getLobbyStatus(userId);
				console.log('with id ', userId);
				console.log('fetchedresp', fetchedresp);
				dispatch(setLobby(fetchedresp.players));
				dispatch(setCanStart(fetchedresp.canStart)); // Assuming the response key is "can_start"
				console.log('desp de dispatch', gameStatus);
			} catch (error) {
				// Handle the error here
				alert(error.detail);
				console.error(error);
			}
		};

		buscarJugadores();
	}, [dispatch, gameStatus, userId]); // Empty dependency array to ensure it runs only once

	console.log('the gamestatus', gameStatus);

	return (
		<VStack spacing={4}>
			<h2>Players:</h2>

			<OrderedList>
				{gameStatus.players.map((player) => (
					<div key={player.id}>
						<ListItem>{player.name}</ListItem>
					</div>
				))}
			</OrderedList>
			{gameStatus.canStart ? (
				// <Link to='/Games/Partida-inicial/play'>
				<Button onClick={onClick}>Begin</Button>
			) : // </Link>
			null}
		</VStack>
	);
};

export default Lobby;

/* const Lobby = () => {
	const dispatch = useDispatch();
	const gameStatus = useSelector((state) => state.game);
	const userId = 1; // Replace with the actual user ID

	useEffect(() => {
		const buscarJugadores = async () => {
			try {
				const fetchedresp = await getLobbyStatus(userId);
				dispatch(setLobby(fetchedresp.players));
				dispatch(setCanStart(fetchedresp.can_start)); // Assuming the response key is "can_start"
			} catch (error) {
				// Handle the error here
				console.error(error);
			}
		};

		buscarJugadores();
	}, []); // Empty dependency array to ensure it runs only once

	const onClick = async () => {
		console.log('me clickearon uwu');
	};

	return (
		<VStack spacing={4}>
			<h2>Players:</h2>
			<OrderedList>
				{gameStatus.players.map((player) => (
					<div key={player.id}>
						<ListItem>{player.name}</ListItem>{' '}
						{/* Change "name" to "user_name" if necessary }
				</div>
				))}
			</OrderedList>
			{gameStatus.can_start ? <Button onClick={onClick}>Begin</Button> : null}
		</VStack>
	);
};

export default Lobby; */
