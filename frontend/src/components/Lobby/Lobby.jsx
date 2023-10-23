import getLobbyStatus from '../request/getLobbyStatus';
import {useDispatch, useSelector} from 'react-redux';
import {setCanStart, setLobby} from '../../appActions';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import startGame from '../request/startGame';
import {VStack, OrderedList, ListItem, Text, Button} from '@chakra-ui/react';
import {setFirstDeckCardBack} from '../appActions';

// mock respuestas por ahora 		{user_name: 'toomas', id: 5, is_host: 0},

const Lobby = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const gameId = JSON.parse(sessionStorage.getItem('gameId')).id;
	const userId = JSON.parse(sessionStorage.getItem('player')).id;
	console.log('gameId: ', gameId);
	console.log('userId: ', userId);
	const gameStatus = useSelector((state) => state.lobby);
	const [isHost, setIsHost] = useState(false);

	const onClick = async () => {
		console.log('me clickearon uwu');
		try {
			const resp = await startGame({idPlayer: userId});
			// to be able to render first card back in deck
			dispatch(setFirstDeckCardBack(resp.firstDeckCardBack));
			console.log('la respuesta es', resp);
			navigate(`/Games/${gameId}/play`);
		} catch (error) {
			alert(error.detail);
		}
	};

	console.log(gameStatus);

	const buscarJugadores = async () => {
		try {
			const fetchedresp = await getLobbyStatus(userId);
			console.log('with id ', userId);
			console.log('fetchedresp', fetchedresp);
			dispatch(setLobby(fetchedresp.players));
			dispatch(setCanStart(fetchedresp.canStart)); // Assuming the response key is "can_start"
			console.log('desp de dispatch', gameStatus);
			setIsHost(fetchedresp.isHost);
		} catch (error) {
			// Handle the error here
			alert(error.detail);
			console.error(error);
		}
	};
	function orderPlayers(players) {
		// Create a copy of the players array
		const copyOfPlayers = [...players];
		const sortedPlayers = copyOfPlayers.sort((a, b) => {
			return a.id - b.id;
		});
		return sortedPlayers;
	}

	const playersSort = orderPlayers(gameStatus.players);

	useEffect(() => {
		buscarJugadores();

		// Set up an interval to fetch lobby status every X milliseconds (e.g., every 10 seconds).
		const intervalId = setInterval(() => {
			buscarJugadores();
		}, 1000); // Change the interval as needed

		// Clear the interval when the component unmounts to avoid memory leaks.
		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	console.log('the gamestatus', gameStatus);
	return (
		<VStack spacing={4} align='center' m='4'>
			<Text
				bgGradient='linear(to-r,gray.200,white,gray.200)'
				bgClip='text'
				fontSize='4xl'
				fontWeight='extrabold'
			>
				Players:
			</Text>
			<OrderedList>
				{playersSort.map((player) => (
					// bgGradient: 'linear(to-r, whatsapp.900,black,whatsapp.900)',
					<ListItem
						mt='2'
						bgGradient='linear(to-r,gray.200,white,gray.200)'
						bgClip='text'
						fontSize='2xl'
						key={player.id}
					>
						{player.name}
					</ListItem>
				))}
			</OrderedList>
			{gameStatus.canStart && isHost ? (
				<Button onClick={onClick}>Begin</Button>
			) : null}
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
