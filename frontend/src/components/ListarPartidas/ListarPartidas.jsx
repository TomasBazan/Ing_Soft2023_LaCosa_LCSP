import joinGame from '../request/joinGame';
import {useSelector} from 'react-redux';
import getGameList from '../request/getGameList';
import {useState, useEffect} from 'react';
import {VStack, Button, Box, Text, Center} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

/* const partidas = [
	{nombre: 'Partida-Inicial'},
	// Otras partidas...
]; */

const ListarPartidas = () => {
	const navigate = useNavigate();

	const userId = useSelector((state) => state.player.id);
	const [partidas, setPartidas] = useState([]); // Initialize partidas as an empty array

	useEffect(() => {
		const buscarPartidas = async () => {
			try {
				console.log('el id del usuario es', userId);
				const resp = await getGameList();
				console.log('la respuesta es en try :', resp);
				setPartidas(resp.games);
			} catch (error) {
				console.log('la respuesta es en catch :', error);
				setPartidas([]);
				// alert(error.detail);
			}
		};
		buscarPartidas();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUnirse = async (gameId) => {
		console.log('el id de la partida es', gameId);
		console.log('me clickearon');
		const bodyRequest = {
			idGame: gameId,
			password: null,
			idUser: userId,
		};

		try {
			const resp = await joinGame(bodyRequest);
			alert(resp.detail);
			console.log('la respuesta es', resp);
			navigate(`/Games/${gameId}`);
		} catch (error) {
			console.log('el error es', error);
			// alert(error.detail);
		}
	};
	return (
		<Center h='90vh' w='90vw' bg='green.200'>
			<VStack spacing={4}>
				{partidas.map((partida, index) => (
					<Box key={index} borderWidth='10px' p={10} borderRadius='md'>
						<Text fontWeight='bold'>{partida.name}</Text>
						<Text>
							Players: {partida.player_quantity}/{partida.max_players}
						</Text>
						{partida.player_quantity < partida.max_players && (
							<Button
								colorScheme='teal'
								size='sm'
								onClick={() => handleUnirse(partida.game_id)}
							>
								Unirse
							</Button>
						)}
					</Box>
				))}
			</VStack>
		</Center>
	);
};

export default ListarPartidas;
